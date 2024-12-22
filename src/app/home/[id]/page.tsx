import { createReservation } from '@/app/actions/actions';
import SelectCalender from '@/app/my-components/SelectCalender';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import prisma from '@/data/db'
import { getCountryByValue } from '@/data/getWorldCountries';
import { FlagSize, getFlagURL } from '@/lib/utilsCode';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Bed, ShowerHead, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import HomeMap from './HomeMap';
import CategoryShowCase from './CategoryShowCase';
import { unstable_noStore as noStore } from 'next/cache'
import FacilitiesBlock from './FacilitiesBlock';
import { IHomeImages } from '@/lib/thumnailsInterface';
import HomeImagesCarousel from '@/app/my-components/HomeImagesCarousel';

const getHomeData = async (homeId: string) => {
    noStore();

    const data = await prisma.home.findUnique({
        where: {
            id: homeId
        },
        select: {
            id: true,
            description: true,
            title: true,
            price: true,
            country: true,
            address: true,
            guests: true,
            bedrooms: true,
            bathrooms: true,
            photo: true,
            categoryName: true,
            createdAT: true,
            facilities: true,
            Reservations: {
                where: {
                    homeId: homeId
                }
            },

            User: {
                select: {
                    profileImage: true,
                    firstName: true,
                    lastName: true
                }
            }
        }
    });

    return data;
}

async function HomeRoute({ params }: { params: { id: string }}) {
    const data = await getHomeData(params.id);

    // const { getCountryByValue } = useCountries();
    const country = getCountryByValue(data ? data.country! : "");        // data?.country!
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const facilities: number[] = data ? data?.facilities ? JSON.parse(data.facilities) : [] : [];

    const imgFiles: string[] = [];
    const photos: IHomeImages[] = data ? JSON.parse(data.photo!) : [];

    photos.map(d => {
        imgFiles.push(d.thumbnailImagePath);
    })

  return (
    <div className='w-[75%] mx-auto mt-10 pb-10'>
        <h1 className='font-bold text-2xl mb-5 text-primary'>{ data?.title }</h1>

        {/* <div className='relative h-[75vw] w-[75vw] lg:h-[550px]'>
            <Image 
                alt={ data!.title! }
                src={`https://vihbisloauhjiimyfhfu.supabase.co/storage/v1/object/public/esm-bnb-images/${data?.photo}`}
                fill
                className='rounded-lg  h-full object-cover w-full'
            />
        </div> */}
        <HomeImagesCarousel images={imgFiles} />

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
                        <Users />{ data?.guests }
                    </div>
                    <div className='flex flex-row gap-x-1'>
                        <Bed />{ data?.bedrooms }
                    </div>
                    <div className='flex flex-row gap-x-1'>
                        <ShowerHead />{ data?.bathrooms }
                    </div>
                </div>

                <div className='w-full mt-5'>
                    <CategoryShowCase categoryName={data?.categoryName as string} />
                </div>

                <FacilitiesBlock facilities={facilities} />
                
                <div className='flex flex-row mt-5'>
                    <div className="rounded-full border px-2 py-2 lg:px-4 lg-py-2 flex items-center gap-x-3">
                        <img src={ data?.User?.profileImage ?? "https://cdn-icons-png.flaticon.com/512/149/149071.png" }
                            alt="User Image Icon"
                            className="rounded-full h8 w-12 hidden lg:block" 
                            referrerPolicy={'no-referrer'}
                        />
                        <div className='flex flex-col'>
                            <div>
                                <h3 className='font-medium'>{ "Hosted by " + data?.User?.firstName }</h3>
                            </div>
                            <div>
                                <h3 className='text-sm'>{ "Hosted since " + data?.createdAT.toLocaleDateString() }</h3>
                            </div>
                        </div>

                    </div>
                </div>

                <Separator className='my-7 w-full' />     

                <p className='w-fill'>{ data?.description as string }</p>      

                <Separator className='my-7 w-full' /> 

                <HomeMap locationValue={ country?.value as string } defaultValue={data ? data.address : null} zoom={13} />
                    
            </div>
            <form action={createReservation} className='flex flex-col items-center mt-5 lg:mt-0'>
                <input type='hidden' name="homeId" value={params.id} />
                <input type='hidden' name="userId" value={user?.id} />

                <SelectCalender reservation={data?.Reservations} />
                {
                    user?.id ? (
                        <Button className='w-full' type='submit'>
                            Make a Reservation
                        </Button>
                    ) : (
                        <Button className='w-full' asChild>
                            <Link href="/api/auth/login">
                                Make a Reservation
                            </Link>
                        </Button>
                    )
                }

            </form>
        </div>
            

    </div>
  )
}

export default HomeRoute

