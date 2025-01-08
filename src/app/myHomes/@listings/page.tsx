import React from 'react'
import NoItemsFound from '@/app/my-components/NoItemsFound';
import ListingCard from '@/app/my-components/ListingCard';
import { unstable_noStore as noStore } from 'next/cache'
// import DashboardBarChart from '../my-components/DashboardBarChart';
import { Homes } from '@/drizzle/schema';
import { and, eq, not, desc, or } from 'drizzle-orm';
import { ELogLevel, ILogObject } from '@/loggerServices/loggerInterfaces';
import { Logger } from '@/loggerServices/logger';
import { db } from '@/drizzle';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { getUserSettings } from '@/app/actions/actions';
import { IUserSettings } from '@/lib/interfaces';
  

const useAPI = process.env.USE_API === "1" ? true : false;


const getMyHomesData = async (userId: string, accessToken: Object | undefined, withDeleted: boolean)  => {
    noStore();

    try { 
        if(useAPI) {
            console.log("Using API calling from My Home page")
    
            try {
                const domain = process.env.KINDE_SITE_URL //getDomainName();
        
                const res = await fetch(domain + '/api/handleListings/get',
                    {
                      method: 'post',
                      cache: "no-cache",
                      body: JSON.stringify({ userId, accessToken, withDeleted })
                    });
        
                const data = await res.json();

                const logObj: ILogObject = {
                    level: ELogLevel.Info,
                    message: `My Home Details fetched for userId: ${userId}`,
                    metaData: {
                        service: "ESM-bnb-14",
                        module: "My Home Page - getMyHomesData",
                        category: "My Home",
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
                        module: "My Home Page - getMyHomesData",
                        category: "My Home",
                        stackdump: (ex as Error).stack,
                }};
                Logger.log(logObj);
        
                return [];
            }
        } else {
            const data = await db.select({
                    photo: Homes.photo,
                    id: Homes.id,
                    price: Homes.price,
                    country: Homes.country,
                    description: Homes.description,
                    deleted: Homes.deleted,
                    enabled: Homes.enabled
                }).from(Homes)
                .where(and(eq(Homes.userId, userId), 
                    Homes.addedCategory, 
                    Homes.addedDescription, 
                    Homes.addedLocation, 
                    !withDeleted ? not(Homes.deleted) : or(Homes.deleted, not(Homes.deleted))))
                .orderBy(desc(Homes.createdAt))

            const logObj: ILogObject = {
                level: ELogLevel.Info,
                message: `My Home Details fetched for userId: ${userId}`,
                metaData: {
                    service: "ESM-bnb-14",
                    module: "My Home Page - getMyHomesData",
                    category: "My Home",
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
                module: "My Home Page - getMyHomesData",
                category: "My Home",
                stackdump: (ex as Error).stack,
        }};
        Logger.log(logObj);

        return [];
    }
    
}

async function Listings() {
    const { getUser, getAccessToken } = getKindeServerSession();
    const user = await getUser();
    const accessToken = await getAccessToken();
    
    // // if(!user) return redirect("/");
    if(!user || !user.id) redirect("api/auth/login?");
    
    const userSettings: IUserSettings = await getUserSettings(user.id);

    const data: {
        photo: string | null;
        id: string;
        price: number | null;
        country: string | null;
        description: string | null;
        deleted: boolean | null;
        enabled: boolean | null;
    }[] = await getMyHomesData(user.id, accessToken, !userSettings.hideDeletedListings);

    return (
        <>
            {
                data.length === 0 ? (
                    <NoItemsFound />
                ) : (
                    <div className='grid xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-3 md-grid-cols-3 gap-8 mt-8'>
                        {
                            data.map((item: any) => {
                                const { id, photo, description, country, price, enabled, deleted } = item;
                                return (
                                    <ListingCard 
                                        key={id}
                                        imagePath={photo as string} 
                                        id={id!} 
                                        price={price as number} 
                                        description={description as string} 
                                        country={country as string} 
                                        userId={user.id} 
                                        isInFavoriteList={false}
                                        favoriteId={''} 
                                        enabled={enabled as boolean}
                                        homeId={id as string} 
                                        pathName={'/favorites'}
                                        deleteButton={true} 
                                        enableButton={true}
                                        editButton={true}
                                        deleted={deleted}
                                    />
                                )
                            })
                        }
                    </div>
                )
            }
        </>
  )
}

export default Listings