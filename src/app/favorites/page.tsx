import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'
import NoItemsFound from '../my-components/NoItemsFound';
import ListingCard from '../my-components/ListingCard';
import { unstable_noStore as noStore } from 'next/cache'
import { drizzle } from 'drizzle-orm/mysql2';
import { Favorites, Homes } from '@/drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { ELogLevel, ILogObject } from '@/loggerServices/loggerInterfaces';
import { Logger } from '@/loggerServices/logger';

const db = drizzle({ connection: { uri: process.env.DATABASE_URL }});

const useAPI = process.env.USE_API === "1" ? true : false;

const getFavoritesData = async (userId: string, accessToken: Object | undefined) => {
    noStore();

    if(useAPI) {
        console.log("Using API calling from favorite page")

        try {
            const domain = process.env.KINDE_SITE_URL //getDomainName();
    
            const res = await fetch(domain + '/api/handleFavorites/get',
                {
                  method: 'post',
                  cache: "no-cache",
                  body: JSON.stringify({ userId, accessToken })
                });
    
            const data = await res.json();

            const logObj: ILogObject = {
                level: ELogLevel.Info,
                message: `Favorites fetched for userId: ${userId}`,
                metaData: {
                  service: "ESM-bnb-14",
                  module: "Favorites Page",
                  category: "Favorites",
                },
              };
            Logger.log(logObj);

            return data.data;
                
        } catch(err) {
            const logObj: ILogObject = {
                level: ELogLevel.Error,
                message: `Error: ${(err as Error).message}`,
                metaData: {
                    service: "ESM-bnb-14",
                    module: "Favorites Page",
                    category: "Favorites",
                    stackdump: (err as Error).stack,
            }};
            Logger.log(logObj);

            return {};
        }
    } else {
        try {
            const data = await db.select({
                    photo: Homes.photo,
                    id: Homes.id,
                    favId: Favorites.id,
                    price: Homes.price,
                    country: Homes.country,
                    description: Homes.description,
                    deleted: Homes.deleted,
                    enabled: Homes.enabled
                })
                .from(Favorites)
                .innerJoin(Homes, and(eq(Homes.id, Favorites.homeId), eq(Favorites.userId, userId)))
                .where(eq(Favorites.userId, userId))
    
            const logObj: ILogObject = {
                level: ELogLevel.Info,
                message: `Favorites fetched for userId: ${userId}`,
                metaData: {
                    service: "ESM-bnb-14",
                    module: "Favorites Page",
                    category: "Favorites",
                }};
            Logger.log(logObj);
    
            return data;

        } catch(ex) {
            const logObj: ILogObject = {
                level: ELogLevel.Error,
                message: `Error: ${(ex as Error).message}`,
                metaData: {
                    service: "ESM-bnb-14",
                    module: "Favorites Page",
                    category: "Favorites",
                    stackdump: (ex as Error).stack,
            }};
            Logger.log(logObj);

            return [];
        }

    }    
    
}

async function FavoritesRoute() {
    const { getUser, getAccessToken } = getKindeServerSession();
    const user = await getUser();
    const accessToken = await getAccessToken();

    // if(!user) return redirect("/");
    if(!user || !user.id) redirect("api/auth/login?");

    const data = await getFavoritesData(user?.id, accessToken);
    // console.log("Data: !!!", data);


  return (
    <section className='container mx-auto px-5 lg:px-10 mt-10'>
        <h2 className='text-3xl font-semibold tracking-tight text-primary'>My Favorites</h2>

        {
            data.length === 0 ? (
                <NoItemsFound />
            ) : (
                <div className='grid xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-3 md-grid-cols-3 gap-8 mt-8'>
                    {
                        data.map((item: any) => {
                            const { id, photo, description, country, price, favId } = item;
                            return (
                                <ListingCard 
                                    key={id}
                                    imagePath={photo as string} 
                                    id={id!} 
                                    price={price as number} 
                                    description={description as string} 
                                    country={country as string} 
                                    userId={user.id} 
                                    isInFavoriteList={favId !== null ? true : false}
                                    favoriteId={favId} 
                                    homeId={id as string} 
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

export default FavoritesRoute