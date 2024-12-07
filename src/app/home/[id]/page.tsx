import { createReservation } from '@/app/actions/actions';
import SelectCalender from '@/app/my-components/SelectCalender';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import prisma from '@/data/db'
import { useCountries } from '@/data/getWorldCountries';
import { FlagSize, getFlagURL } from '@/lib/utilsCode';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Bed, ShowerHead, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import HomeMap from './HomeMap';
import CategoryShowCase from './CategoryShowCase';

const getHomeData = (homeId: string) => {
    const data = prisma.home.findUnique({
        where: {
            id: homeId
        },
        select: {
            id: true,
            description: true,
            title: true,
            price: true,
            country: true,
            address: true,
            guests: true,
            bedrooms: true,
            bathrooms: true,
            photo: true,
            categoryName: true,
            createdAT: true,
            Reservations: {
                where: {
                    homeId: homeId
                }
            },

            User: {
                select: {
                    profileImage: true,
                    firstName: true,
                    lastName: true
                }
            }
        }
    });

    return data;
}

async function HomeRoute({ params }: { params: { id: string }}) {
    const data = await getHomeData(params.id);
    const { getCountryByValue } = useCountries();
    const country = getCountryByValue(data?.country!);
    const { getUser } = getKindeServerSession();
    const user = await getUser();

  return (
    <div className='w-[75%] mx-auto mt-10 mb-32 '>
        <h1 className='font-medium text-2xl mb-5'>{ data?.title }</h1>

        <div className='relative h-[550px]'>
            <Image 
                alt={data?.title!}
                src={`https://vihbisloauhjiimyfhfu.supabase.co/storage/v1/object/public/esm-bnb-images/${data?.photo}`}
                fill
                className='rounded-lg h-full object-cover w-full'
            />
        </div>

        <div className='flex justify-between gap-x-24 mt-8'>
            <div className='w-2/3'>
                <div className='w-full flex flex-row gap-5'>
                    <img  
                        src={getFlagURL(country?.value!, FlagSize.FS36x27)}
                        width="5%"  
                        height="5%"  
                        alt={country?.label} /> 
                    
                    <h3 className='text-xl font-medium'>{ country?.label + " / " + country?.region }</h3>

                </div>

                <div className='flex flex-row gap-x-7 text-muted-foreground mt-5'>
                    <div className='flex flex-row gap-x-1'>
                        <Users />{ data?.guests }
                    </div>
                    <div className='flex flex-row gap-x-1'>
                        <Bed />{ data?.bedrooms }
                    </div>
                    <div className='flex flex-row gap-x-1'>
                        <ShowerHead />{ data?.bathrooms }
                    </div>
                </div>

                <div className='w-full mt-5'>
                    <CategoryShowCase categoryName={data?.categoryName as string} />
                </div>

                <div className='flex flex-row mt-5'>
                    <div className="rounded-full border px-2 py-2 lg:px-4 lg-py-2 flex items-center gap-x-3">
                        <img src={ data?.User?.profileImage ?? "https://cdn-icons-png.flaticon.com/512/149/149071.png" }
                            alt="User Image Icon"
                            className="rounded-full h8 w-12 hidden lg:block" 
                            referrerPolicy={'no-referrer'}
                        />
                        <div className='flex flex-col'>
                            <div>
                                <h3 className='font-medium'>{ "Hosted by " + data?.User?.firstName }</h3>
                            </div>
                            <div>
                                <h3 className='text-sm'>{ "Hosted since " + data?.createdAT.toLocaleDateString() }</h3>
                            </div>
                        </div>

                    </div>
                </div>

                <Separator className='my-7 w-full' />     

                <p>{ data?.description as string }</p>      

                <Separator className='my-7 w-full' /> 

                <HomeMap locationValue={ country?.value as string } />
                    
            </div>
            <form action={createReservation}>
                <input type='hidden' name="homeId" value={params.id} />
                <input type='hidden' name="userId" value={user?.id} />

                <SelectCalender reservation={data?.Reservations} />
                {
                    user?.id ? (
                        <Button className='w-full' type='submit'>
                            Make a Reservation
                        </Button>
                    ) : (
                        <Button className='w-full' asChild>
                            <Link href="/api/auth/login">
                                Make a Reservation
                            </Link>
                        </Button>
                    )
                }

            </form>
        </div>
            

    </div>
  )
}

export default HomeRoute

