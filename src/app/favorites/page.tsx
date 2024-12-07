import prisma from '@/data/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'
import NoItemsFound from '../my-components/NoItemsFound';
import ListingCard from '../my-components/ListingCard';
import Home from '../page';

const getFavoritesData = async (userId: string) => {
    const data = prisma.favorites.findMany({
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

async function FavoritesRoute() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if(!user) return redirect("/");

    const data = await getFavoritesData(user?.id);

  return (
    <section className='container mx-auto px-5 lg:px-10 mt-10'>
        <h2 className='text-3xl font-semibold tracking-tight'>My Favorites</h2>

        {
            data.length === 0 ? (
                <NoItemsFound />
            ) : (
                <div className='grid lg:grid-cols-5 sm:grid-cols-3 md-grid-cols-3 gap-8 mt-8'>
                    {
                        data.map((item) => {
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