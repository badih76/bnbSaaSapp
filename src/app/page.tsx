import { Suspense } from "react";
import ListingCard from "./my-components/ListingCard";
import MapFilterItems from "./my-components/MapFilterItesm";
import SkeletonLoading from "./my-components/SkeletonCard";
import NoItemsFound from "./my-components/NoItemsFound";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from 'next/cache'
import { drizzle } from "drizzle-orm/mysql2";
import { Favorites, Homes, Reservations } from "@/drizzle/schema";
import { and, eq, gte, like, lte, not, gt } from "drizzle-orm";
import { Logger } from "@/loggerServices/logger";
import { ELogLevel, ILogObject } from "@/loggerServices/loggerInterfaces";
// import { redirect } from "next/navigation";

const db = drizzle({ connection: { uri: process.env.DATABASE_URL }});

async function getListingsData({
  userId, searchParams }: {
   userId: string | undefined,  
   searchParams?: { 
    filter? : string,
    country?: string,
    guests?: string,
    rooms?: string,
    bathrooms?: string,
    startDate?: Date,
    endDate?: Date
  }
 }) {
  const { filter, country, rooms, bathrooms, guests } = searchParams!;
  noStore();

  try {
    const data = await db.select()
      .from(Homes)
      .leftJoin(Favorites, and(eq(Homes.id, Favorites.homeId), eq(Favorites.userId, userId!)))
      .where(and(Homes.addedCategory, 
          Homes.addedDescription,
          Homes.addedLocation,
          like(Homes.category, filter ?? '%%'),
          like(Homes.country, country ?? '%%'),
          rooms ? eq(Homes.bedrooms, parseInt(rooms)) : gt(Homes.bedrooms, 0),
          bathrooms ? eq(Homes.bathrooms, parseInt(bathrooms)) : gt(Homes.bathrooms, 0),
          guests ? eq(Homes.guests, parseInt(guests)) : gt(Homes.guests, 0),
          not(Homes.deleted)
      ))

    const logObj: ILogObject = {
        level: ELogLevel.Info,
        message: `All Homes Listings retrieved.`,
        metaData: {
          service: "ESM-bnb-14",
          module: "Main Page - getListingsData",
          category: "Home Details",
        },
      };
    Logger.log(logObj);
  
    if(searchParams?.startDate) {
      const filteredData = data.filter(async d => {
  
        const resData = await db.select({ 
            id: Reservations.id,
            startDate: Reservations.startDate,
            endDate: Reservations.endDate
          })
          .from(Reservations)        
          .where(and(eq(Reservations.homeId, d.homes.id),
            lte(Reservations.startDate, new Date(searchParams.startDate!)),
            gte(Reservations.endDate, new Date(searchParams.endDate!))
          ))
  
  
        return resData.length == 0;
      });
  
      const logObj: ILogObject = {
        level: ELogLevel.Info,
        message: `Homes Listings filtered.`,
        metaData: {
          service: "ESM-bnb-14",
          module: "Main Page - getListingsData",
          category: "Home Details",
        },
      };
      Logger.log(logObj);

      return filteredData;
  
    } else {

      return data;

    }

  } catch(ex) {

    const logObj: ILogObject = {
      level: ELogLevel.Error,
      message: `Error: ${(ex as Error).message}`,
      metaData: {
        service: "ESM-bnb-14",
        module: "Main Page - getListingsData",
        category: "Home Details",
        stackdump: (ex as Error).stack,
      },
      };
    Logger.log(logObj);

    // return redirect('/Error');
    return [];
  }

}

export default function Home({
   searchParams }: {
    searchParams?: 
    { 
      filter? : string,
      country?: string,
      guests?: string,
      rooms?: string,
      bathrooms?: string,
      startDate?: Date,
      endDate?: Date
    }
  }
) {

  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />

      <Suspense key={ searchParams?.filter } fallback={ <SkeletonLoading /> }>
        <ShowItems searchParams={ searchParams }/>
      </Suspense>
    </div>
  );
}

async function ShowItems({
  searchParams }: {
   searchParams?: 
   {  
      filter? : string,
      country?: string,
      guests?: string,
      rooms?: string,
      bathrooms?: string,
      startDate?: Date,
      endDate?: Date
   }
 }) {
  
  const { getUser } = getKindeServerSession() 
  const user = await getUser();
  const data = await getListingsData({ searchParams: searchParams, userId: user?.id });

  try {
    return (
        
          <>
            {data.length === 0 ? (
              <NoItemsFound />
            ) : (
            <div className="grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-3 gap-8 mt-8 pb-52 border-red-600">
              {data.map(item => {
                return (
                  <ListingCard 
                    key={item.homes.id}
                    description={item.homes.description as string}
                    imagePath={item.homes.photo as string}
                    country={item.homes.country as string}
                    price={item.homes.price as number} 
                    id={item.homes.id} 
                    userId={user?.id}
                    favoriteId={item.favorites !== null ? item.favorites!.id! : ''}
                    isInFavoriteList={item.favorites !== null ? true : false}
                    homeId={item.homes.id}
                    pathName="/"
                  />
                )
              })}
            </div>
            )}
          </>
    )

  } catch(ex) {
    const logObj: ILogObject = {
      level: ELogLevel.Error,
      message: `Error: ${(ex as Error).message}`,
      metaData: {
        service: "ESM-bnb-14",
        module: "Main Page - ShowItems",
        category: "Home Details",
        stackdump: (ex as Error).stack,
      },
      };
    Logger.log(logObj);

    return (
  
      <NoItemsFound />
    )

  }
  
}

