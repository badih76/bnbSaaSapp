import prisma from '@/data/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'
import NoItemsFound from '../my-components/NoItemsFound';
import ListingCard from '../my-components/ListingCard';
import { unstable_noStore as noStore } from 'next/cache'

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

            return data.data;
                
        } catch(err) {
            console.log("Error: ", (err as any).message);
            return {};
        }
    } else {
        const data = await prisma.favorites.findMany({
            where: {
                userId: userId
            },
            select: {
                Home: {
                    select: {
                        photo: true,
                        id: true,
                        Favorites: true,
                        price: true,
                        country: true,
                        description: true
                    }
                }
            }
        });

        return data;

    }    
    
}

async function FavoritesRoute() {
    const { getUser, getAccessToken } = getKindeServerSession();
    const user = await getUser();
    const accessToken = await getAccessToken();

    if(!user) return redirect("/");

    const data = await getFavoritesData(user?.id, accessToken);
    // console.log("Data: !!!", data);


  return (
    <section className='container mx-auto px-5 lg:px-10 mt-10'>
        <h2 className='text-3xl font-semibold tracking-tight text-primary'>My Favorites</h2>

        {
            data.length === 0 ? (
                <NoItemsFound />
            ) : (
                <div className='grid lg:grid-cols-5 sm:grid-cols-3 md-grid-cols-3 gap-8 mt-8'>
                    {
                        data.map((item: any) => {
                            const { id, photo, description, country, price, Favorites } = item.Home!;
                            return (
                                <ListingCard 
                                    key={id}
                                    imagePath={photo as string} 
                                    id={id!} 
                                    price={price as number} 
                                    description={description as string} 
                                    country={country as string} 
                                    userId={user.id} 
                                    isInFavoriteList={Favorites.length > 0 ? true : false}
                                    favoriteId={Favorites[0].id as string} 
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