import { useCountries } from '@/data/getWorldCountries'
import { getFlagURL } from '@/lib/utilsCode'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AddToFavoriteButton, { RemoveFromFavoriteButton } from '../AddToFavoriteButton'
import { addToFavorites, removeFromFavorites } from '@/app/actions/actions'
import { Trash2 } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

interface IListingData {
    imagePath: string,
    id: string,
    price: number,
    description: string,
    country: string,
    userId: string | undefined,
    isInFavoriteList: boolean,
    favoriteId: string,
    homeId: string,
    pathName: string,
    deleteButton?: boolean,
    enableButton?: boolean
}

// const useAPI = process.env.USE_API === "1" ? true : false;

function ListingCard({ 
    imagePath, 
    price, 
    description, 
    country,
    userId,
    favoriteId,
    isInFavoriteList,
    homeId,
    pathName,
    deleteButton,
    enableButton
}: IListingData) {
    const { getCountryByValue } = useCountries();
    const cntry = getCountryByValue(country);

  return (
    <div className='flex flex-col border-2 rounded-lg border-gray-300 p-3 flex-shrink-0'>
        <div className='relative h-56'>
            <Image src={`https://vihbisloauhjiimyfhfu.supabase.co/storage/v1/object/public/esm-bnb-images/${imagePath}`} 
                alt={description} fill 
                className='rounded-lg h-full object-cover mb-3'/>

            { userId && (
                <div className='z-10 absolute top-2 right-2'>
                    {
                        isInFavoriteList ? (
                            // <form action={useAPI ? "/api/handleFavorites/remove" : removeFromFavorites}
                            //     method={useAPI ? "POST" : "GET"}>
                            <form action={removeFromFavorites}>
                                <input type='hidden' name="favoriteId" value={favoriteId} />
                                <input type='hidden' name="userId" value={userId} />
                                <input type='hidden' name="pathName" value={pathName} />
                                <RemoveFromFavoriteButton />
                            </form>
                        ) : (
                            // <form action={useAPI ? "/api/handleFavorites/add" : addToFavorites}
                            //     method={useAPI ? "POST" : "GET"}>
                            <form action={addToFavorites}>
                                <input type='hidden' name="homeId" value={homeId} />
                                <input type='hidden' name="userId" value={userId} />
                                <input type='hidden' name="pathName" value={pathName} />
                                <AddToFavoriteButton />
                            </form>
                        )
                    }
                </div>
            )}
        </div>

        <Link href={`/home/${homeId}`}>
            <h3 className='font-medium text-base mt-2 p-2'>
                {
                    <div className='w-full flex flex-row gap-2'>
                        <div className='flex flex-col justify-center items-center'>
                            <img  
                                src={getFlagURL(country)}
                                width="20"  
                                height="8"  
                                alt={"Country Flag"} /> 
                        </div>
                        { cntry?.label + " / " + cntry?.region }
                    </div>
                }
            </h3>
            <p className='text-muted-foreground text-xs line-clamp-3'>
                {description}
            </p>
            <div className='flex flex-col justify-between mt-5'>
                <div className='flex flex-col'>
                    <p className='text-muted-foreground'>
                        {<span className='font-medium text-black'>{"AUD " + price}</span>} {" per night"}
                    </p>
                </div>
                <div className='flex flex-row justify-between mt-5'>
                    {
                        enableButton ? (
                            <div className='flex flex-col justify-center items-center'>
                                <Switch checked={true} />
                            </div>
                        ) : null 
                    }
                    {
                        deleteButton ? (
                            <div className='flex flex-col justify-center items-center text-red-500'>
                                <Trash2 />
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </Link>
    </div>
  )
}

export default ListingCard