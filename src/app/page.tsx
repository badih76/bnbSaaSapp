import { Suspense } from "react";
import ListingCard from "./my-components/ListingCard";
import MapFilterItems from "./my-components/MapFilterItesm";
import prisma from '@/data/db';
import SkeletonLoading from "./my-components/SkeletonCard";
import NoItemsFound from "./my-components/NoItemsFound";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from 'next/cache'

async function getListingsData({
  searchParams, userId }: {
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

  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: filter ?? undefined,
      country: country ?? undefined,
      bedrooms: rooms ? parseInt(rooms) : undefined,
      bathrooms: bathrooms ? parseInt(bathrooms) : undefined,
      guests: guests ? parseInt(guests) : undefined,
      deleted: false
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      deleted: false,
      enabled: true,
      Favorites: {
        where: {
          userId: userId ?? undefined
        }
      }
    }
  });

  if(searchParams?.startDate) {
    const filteredData = data.filter(async d => {
      const resData = await prisma.reservations.findMany({
        where: {
          homeId: d.id,
          startDate: {
            lte: new Date(searchParams.startDate!)
          },
          endDate: {
            gte: new Date(searchParams.endDate!)
          }
        },
        select: {
          id: true,
          startDate: true,
          endDate: true
        }
      })


      return resData.length == 0;
    });

    return filteredData;

  } else {
    return data;

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

  return (
      
        <>
          {data.length === 0 ? (
            <NoItemsFound />
          ) : (
          <div className="grid grid-cols-3 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-3 gap-8 mt-8 pb-52 border-red-600">
            {data.map(item => {
              return (
                <ListingCard 
                  key={item.id}
                  description={item.description as string}
                  imagePath={item.photo as string}
                  country={item.country as string}
                  price={item.price as number} 
                  id={item.id} 
                  userId={user?.id}
                  favoriteId={item.Favorites[0]?.id}
                  isInFavoriteList={item.Favorites.length > 0 ? true : false}
                  homeId={item.id}
                  pathName="/"
                />
              )
            })}
          </div>
          )}
        </>
  )
  
}

