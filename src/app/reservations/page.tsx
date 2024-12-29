import React from 'react'
import NoItemsFound from '../my-components/NoItemsFound';
import ListingCard from '../my-components/ListingCard';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache'
import { drizzle } from 'drizzle-orm/mysql2';
import { Favorites, Homes, Reservations as tblReservations } from '@/drizzle/schema';
import { eq, and } from 'drizzle-orm'
import { ELogLevel, ILogObject } from '@/loggerServices/loggerInterfaces';
import { Logger } from '@/loggerServices/logger';

const useAPI = process.env.USE_API === "1" ? true : false;
const db = drizzle({ connection: { uri: process.env.DATABASE_URL }});

async function getData(userId: string, accessToken: Object | undefined) {
    noStore();

    try {
        if(useAPI) {
            console.log("Using API calling from Reservations page")
    
            try {
                const domain = process.env.KINDE_SITE_URL //getDomainName();
        
                const res = await fetch(domain + '/api/reservations/get',
                    {
                      method: 'post',
                      cache: "no-cache",
                      body: JSON.stringify({ userId, accessToken })
                    });
        
                const data = await res.json();
                
                const logObj: ILogObject = {
                    level: ELogLevel.Info,
                    message: `Reservations fetched for userId: ${userId}`,
                    metaData: {
                        service: "ESM-bnb-14",
                        module: "Reservations Page - getData",
                        category: "Reservations",
                    },
                };
                Logger.log(logObj);
                
                return data.data;
                
            } catch(ex) {
                const logObj: ILogObject = {
                    level: ELogLevel.Error,
                    message: `Error: ${(ex as Error).message}`,
                    metaData: {
                        service: "ESM-bnb-14",
                        module: "Reservations Page - getData",
                        category: "Reservations",
                        stackdump: (ex as Error).stack,
                }};
                Logger.log(logObj);
        
                return [];
            }
        } else {
            
            const data = await db.select({
                    id: tblReservations.id,
                    homeId: Homes.id,
                    country: Homes.country,
                    photo: Homes.photo,
                    description: Homes.description,
                    price: Homes.price,
                    deleted: Homes.deleted,
                    favId: Favorites.id
                }).from(tblReservations)
                .innerJoin(Homes, eq(Homes.id, tblReservations.homeId))
                .leftJoin(Favorites, and(eq(Homes.id, Favorites.homeId), eq(Favorites.userId, userId)))
                .where(eq(tblReservations.userId, userId))

            const logObj: ILogObject = {
                level: ELogLevel.Info,
                message: `Reservations fetched for userId: ${userId}`,
                metaData: {
                    service: "ESM-bnb-14",
                    module: "Reservations Page - getData",
                    category: "Reservations",
                },
            };
            Logger.log(logObj);
    
            return data;
        }

    } catch(ex) {
        const logObj: ILogObject = {
            level: ELogLevel.Error,
            message: `Error: ${(ex as Error).message}`,
            metaData: {
                service: "ESM-bnb-14",
                module: "Reservations Page - getData",
                category: "Reservations",
                stackdump: (ex as Error).stack,
        }};
        Logger.log(logObj);

        return [];
    }

}

async function Reservations() {

    const { getUser, getAccessToken } = getKindeServerSession();
    const user = await getUser();
    const accessToken = await getAccessToken();
    
    if(!user || !user.id) redirect("api/auth/login?");

    const data = await getData(user?.id, accessToken);

  return (
    <section className='container mx-auto px-5 lg:px-10 mt-10'>
        <h2 className='text-3xl font-semibold tracking-tight text-primary'>My Reservations</h2>

        {
            data.length === 0 ? (
                <NoItemsFound />
            ) : (
                <div className='grid xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-3 md-grid-cols-3 gap-8 mt-8'>
                    {
                        data.map((item: any) => {
                            const { id, homeId, photo, description, country, price, favId } = item!;
                            console.log("Photo: ", JSON.parse(photo));

                            return (
                                <ListingCard 
                                    key={id}
                                    imagePath={photo} 
                                    id={id} 
                                    price={price as number} 
                                    description={description as string} 
                                    country={country as string} 
                                    userId={user.id} 
                                    isInFavoriteList={favId !== null ? true : false}
                                    favoriteId={favId as string} 
                                    homeId={homeId} 
                                    pathName={'/favorites'} 
                                />
                            )
                        })
                    }
                </div>
            )
        }
    </section>
  )
}

export default Reservations