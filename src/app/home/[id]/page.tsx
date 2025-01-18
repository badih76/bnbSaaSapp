import SelectCalender from '@/app/my-components/SelectCalender';
import { Separator } from '@/components/ui/separator';
import { getCountryByValue } from '@/data/getWorldCountries';
import { FlagSize, getFlagURL } from '@/lib/utilsCode';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Bed, ShowerHead, Users } from 'lucide-react';
import React from 'react'
import HomeMap from './HomeMap';
import CategoryShowCase from './CategoryShowCase';
import { unstable_noStore as noStore } from 'next/cache'
import FacilitiesBlock from './FacilitiesBlock';
import { IHomeImages } from '@/lib/thumnailsInterface';
import HomeImagesCarousel from '@/app/my-components/HomeImagesCarousel';
import { Homes, Reservations, Users as tblUsers } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import NoItemsFound from '@/app/my-components/NoItemsFound';
import { ELogLevel, ILogObject } from '@/loggerServices/loggerInterfaces';
import { Logger } from '@/loggerServices/logger';
import { db } from '@/drizzle';
import { uuid4 } from '@/lib/utils';
import ContactHost from './ContactHost';

const getHomeData = async (homeId: string) => {
    noStore();

    try {

        const data = await db.select()
            .from(Homes)
            .leftJoin(Reservations, eq(Homes.id, Reservations.homeId))
            .innerJoin(tblUsers, eq(Homes.userId, tblUsers.id))
            .where(eq(Homes.id, homeId))
    
        const logObj: ILogObject = {
            level: ELogLevel.Info,
            message: `Home details fetched for homeId: ${homeId}.`,
            metaData: {
                service: "ESM-bnb-14",
                module: "Home Details Page",
                category: "Home Details",
            }};
        Logger.log(logObj);

        if(data.length > 0) {
            const home = data[0].homes;
            const user = data[0].users;
            const reservations: typeof Reservations.$inferInsert[] = [];
    
            data.map(d => {
                reservations.push(d.reservations!)
            })
    
            return { home, user, reservations }
        } else {
            
            return null;
        }

    } catch(ex) {
        const logObj: ILogObject = {
            level: ELogLevel.Error,
            message: `Error: ${(ex as Error).message}`,
            metaData: {
                service: "ESM-bnb-14",
                module: "Home Details Page",
                category: "Home Details",
                stackdump: (ex as Error).stack,
            }};
        Logger.log(logObj);

    }

}

async function HomeRoute({ params }: { params: { id: string }}) {
    const data = await getHomeData(params.id);
    
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const reservationToken = uuid4();


    if (data) {
        const country = getCountryByValue(data.home.country!);        // data?.country!
        const facilities: number[] = data.home.facilities ? JSON.parse(data.home.facilities) : [];
    
        const imgFiles: string[] = [];
        const photos: IHomeImages[] = JSON.parse(data.home.photo!);
    
        photos.map(d => {
            imgFiles.push(d.thumbnailImagePath);
        })

        return (
          <div className='w-[75%] mx-auto mt-10 pb-10'>
              <h1 className='font-bold text-2xl mb-5 text-primary'>{ data.home.title }</h1>
                  
              <HomeImagesCarousel images={imgFiles} homeId={params.id} />
      
              <Separator />
      
              <div className='flex flex-col lg:flex-row justify-between gap-x-24 mt-8'>
                  <div className='w-full lg:w-2/3'>
                      <div className='w-full flex flex-row gap-0 lg:gap-5'>
                          <div className='flex justify-center items-center w-10 mr-5'>
                              <img  
                                  src={getFlagURL(country!.value!, FlagSize.FS36x27)}
                                  width="100%"  
                                  height="5%"  
                                  alt={country?.label} /> 
      
                          </div>
                          <div className='flex justify-center items-center'>
                              <h3 className='text-xl font-medium'>{ country?.label + " / " + country?.region }</h3>
      
                          </div>
                          
      
                      </div>
      
                      <div className='flex flex-row gap-x-7 text-muted-foreground mt-5'>
                          <div className='flex flex-row gap-x-1'>
                              <Users />{ data.home.guests }
                          </div>
                          <div className='flex flex-row gap-x-1'>
                              <Bed />{ data.home.bedrooms }
                          </div>
                          <div className='flex flex-row gap-x-1'>
                              <ShowerHead />{ data.home.bathrooms }
                          </div>
                      </div>
      
                      <div className='w-full mt-5'>
                          <CategoryShowCase categoryName={data.home.category as string} />
                      </div>
      
                      <FacilitiesBlock facilities={facilities} />
                      
                      <div className='flex flex-row mt-5'>
                          <div className="rounded-full border px-2 py-2 lg:px-4 lg-py-2 flex items-center gap-x-3">
                              <img src={ data.user.profileImage ?? "https://cdn-icons-png.flaticon.com/512/149/149071.png" }
                                  alt="User Image Icon"
                                  className="rounded-full h8 w-12 hidden lg:block" 
                                  referrerPolicy={'no-referrer'}
                              />
                              <div className='flex flex-col'>
                                  <div>
                                      <h3 className='font-medium'>{ "Hosted by " + data.user.firstName }</h3>
                                  </div>
                                  <div>
                                      <h3 className='text-sm'>{ "Hosted since " + data.home.createdAt!.toLocaleDateString() }</h3>
                                  </div>
                              </div>
      
                          </div>
                      </div>
      
                      <Separator className='my-7 w-full' />     
      
                      <p className='w-fill'>{ data.home.description as string }</p>      
      
                      <Separator className='my-7 w-full' /> 
      
                      <ContactHost uid={user.id} hostId={data.user.id} />

                      <Separator className='my-7 w-full' /> 
                      
                      <HomeMap locationValue={ country?.value as string } defaultValue={data.home.address} zoom={13} />

                          
                  </div>
                  {/* <form action={createReservation} className='flex flex-col items-center mt-5 lg:mt-0'> */}
                  <form action={"/ReservePage"} className='flex flex-col items-center mt-5 lg:mt-0'>
                      <input type='hidden' name="homeId" value={params.id} />
                      <input type='hidden' name="userId" value={user?.id} />
                      <input type='hidden' name="rate" value={data.home.price?.toString()} />
                      <input type='hidden' name='resToken' value={reservationToken} />
       
                      <SelectCalender reservation={data.reservations} userId={user.id} />
      
                  </form>
              </div>
                  
      
          </div>
        )
    } else {
        return (
            <NoItemsFound />
        )
    }


}

export default HomeRoute

