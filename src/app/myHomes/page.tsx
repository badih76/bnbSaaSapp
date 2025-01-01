import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'
import NoItemsFound from '../my-components/NoItemsFound';
import ListingCard from '../my-components/ListingCard';
import { unstable_noStore as noStore } from 'next/cache'
import DashboardBarChart from '../my-components/DashboardBarChart';
import { Homes } from '@/drizzle/schema';
import { and, eq, not, desc } from 'drizzle-orm';
import { getReservationsStatistics } from '../actions/actions';
import { ELogLevel, ILogObject } from '@/loggerServices/loggerInterfaces';
import { Logger } from '@/loggerServices/logger';
import { db } from '@/drizzle';
  

const useAPI = process.env.USE_API === "1" ? true : false;

const getStatistics = async (userId: string) => {
    noStore();

    try {
        const reservationsStatistics = await getReservationsStatistics(userId);
    
        const chartData: {monthyear: string, count: number}[] = reservationsStatistics.map(r => {
            return { monthyear: r.month as string, count: r.resCount }
        })
    
        return chartData;

    } catch(ex) {
        const logObj: ILogObject = {
            level: ELogLevel.Error,
            message: `Error: ${(ex as Error).message}`,
            metaData: {
                service: "ESM-bnb-14",
                module: "My Home Page - getReservationsStatistics",
                category: "My Home",
                stackdump: (ex as Error).stack,
        }};
        Logger.log(logObj);

        return [];
    }
   
}

const getMyHomesData = async (userId: string, accessToken: Object | undefined) => {
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
                      body: JSON.stringify({ userId, accessToken })
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
                    not(Homes.deleted)))
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

async function MyHomes() {
    const { getUser, getAccessToken } = getKindeServerSession();
    const user = await getUser();
    const accessToken = await getAccessToken();
    
    // if(!user) return redirect("/");
    if(!user || !user.id) redirect("api/auth/login?");
    
    const data = await getMyHomesData(user?.id, accessToken);

    const reservationsStatistics = await getStatistics(user.id)
    // console.log(reservationsStatistics);


  return (
    <section className='container mx-auto px-5 lg:px-10 mt-10 mb-10'>
        <h2 className='text-3xl font-semibold tracking-tight text-primary'>My Homes</h2>

        <div className='grid grid-flow-row grid-cols-3 gap-2
            border-2 rounded-lg border-gray-300 
            p-3 mt-5 min-h-[10vh]'>

            <div className='border border-gray-300 rounded-lg w-auto p-2 min-h-[10vh]'>
                <h2 className='text-md font-semibold tracking-tight text-primary'>Listings</h2>
            </div>
            
            <div className='border border-gray-300 rounded-lg w-auto p-2 min-h-[10vh]'>
                <h2 className='text-md font-semibold tracking-tight text-primary'>Upcoming Reservations</h2>
            </div>

            <DashboardBarChart chartData={reservationsStatistics}/>
            
        </div>

        {
            data.length === 0 ? (
                <NoItemsFound />
            ) : (
                <div className='grid xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-3 md-grid-cols-3 gap-8 mt-8'>
                    {
                        data.map((item: any) => {
                            const { id, photo, description, country, price, enabled } = item;
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

export default MyHomes