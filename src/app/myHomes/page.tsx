import prisma from '@/data/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'
import NoItemsFound from '../my-components/NoItemsFound';
import ListingCard from '../my-components/ListingCard';
import { unstable_noStore as noStore } from 'next/cache'
// import GetFacilityIconById from '../my-components/getFacilityIcon';

const useAPI = process.env.USE_API === "1" ? true : false;

const getMyHomesData = async (userId: string, accessToken: Object | undefined) => {
    noStore();

    // return data;
    if(useAPI) {
        console.log("Using API calling from favorite page")

        try {
            const domain = process.env.KINDE_SITE_URL //getDomainName();
    
            const res = await fetch(domain + '/api/handleListings/get',
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
        const data = await prisma.home.findMany({
            where: {
                userId: userId,
                addedCategory: true,
                addedDescription: true,
                addedLocation: true,
                deleted: false,
                
            },
            select: {
                photo: true,
                id: true,
                Favorites: {
                    where: {
                        userId: userId
                    }
                },
                price: true,
                country: true,
                description: true,
                deleted: true,
                enabled: true
            },
            orderBy: {
                createdAT: "desc"
            }
        });

        return data;

    }    
}

async function MyHomes() {
    const { getUser, getAccessToken } = getKindeServerSession();
    const user = await getUser();
    const accessToken = await getAccessToken();
    
    if(!user) return redirect("/");

    const data = await getMyHomesData(user?.id, accessToken);

  return (
    <section className='container mx-auto px-5 lg:px-10 mt-10 mb-10'>
        <h2 className='text-3xl font-semibold tracking-tight text-primary'>My Homes</h2>

        {
            data.length === 0 ? (
                <NoItemsFound />
            ) : (
                <div className='grid xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-3 md-grid-cols-3 gap-8 mt-8'>
                    {
                        data.map((item: any) => {
                            const { id, photo, description, country, price, Favorites, enabled } = item;
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
                                    favoriteId={Favorites[0]?.id as string} 
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
        {/* <div className='flex flex-row justify-between w-full'>
            <div>
                <GetFacilityIconById facilityIconId={1} />
            </div>
            <div>
                <GetFacilityIconById facilityIconId={2} />
            </div>
            <div>
                <GetFacilityIconById facilityIconId={3} />
            </div>
            <div>
                <GetFacilityIconById facilityIconId={4} />
            </div>
            <div>
                <GetFacilityIconById facilityIconId={5} />
            </div>
            <div>
                <GetFacilityIconById facilityIconId={6} />
            </div>
            <div>
                <GetFacilityIconById facilityIconId={7} />
            </div>
            <div>
                <GetFacilityIconById facilityIconId={8} />
            </div>
            <div>
                <GetFacilityIconById facilityIconId={9} />
            </div>
        </div> */}
    </section>
  )
}

export default MyHomes