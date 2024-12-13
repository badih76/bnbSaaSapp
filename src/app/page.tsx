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
    bathrooms?: string
  }
 }) {
  noStore();

  const data = prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      bedrooms: searchParams?.rooms ?? undefined,
      bathrooms: searchParams?.bathrooms ?? undefined,
      guests: searchParams?.guests ?? undefined
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favorites: {
        where: {
          userId: userId ?? undefined
        }
      }
    }
  });

  return data;
}

export default function Home({
   searchParams }: {
    searchParams?: 
    { 
      filter? : string,
      country?: string,
      guests?: string,
      rooms?: string,
      bathrooms?: string
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
      bathrooms?: string
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
          <div className="grid xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-3 md-grid-cols-3 gap-8 mt-8 mb-20">
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

