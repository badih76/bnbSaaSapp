'use client'

import { useCountries } from '@/data/getWorldCountries'
import { getFlagURL } from '@/lib/utilsCode'
import Link from 'next/link'
import React, { useState } from 'react'
import AddToFavoriteButton, { RemoveFromFavoriteButton } from '../AddToFavoriteButton'
import { addToFavorites, removeFromFavorites } from '@/app/actions/actions'
import DeleteHomeListing from './deleteHomeListing'
import EnableHomeListing from './enableHomeListing'
import EditHome from '@/app/myHomes/EditHome'
import { IHomeImages } from '@/lib/thumnailsInterface'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent } from '@/components/ui/card'
import { EListingCardMode } from '@/lib/interfaces'

const supabaseUrl = process.env.SUPABASE_URL ?? '';
const supabaseStorageBucketName = process.env.SUPABASE_STORAGE_BUCKET_NAME ?? '';

interface IReservationDetails {
    startDate: string,
    endDate: string,
    rate: number,
    guests: number
}

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
    enableButton?: boolean,
    enabled?: boolean,
    deleted?: boolean,
    editButton?: boolean,
    reservationDetails?: IReservationDetails,
    mode?: EListingCardMode
}


// const useAPI = process.env.USE_API === "1" ? true : false;

const getTotalReservationCharge = (reservationDetails: IReservationDetails) => {
    // console.log('Res Details: ', reservationDetails);
    const nightsCount = Math.round((new Date(reservationDetails.endDate).getTime() - new Date(reservationDetails.startDate).getTime()) 
        / (1000 * 3600 * 24));
    return reservationDetails.rate * nightsCount;

}

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
    enableButton,
    editButton,
    enabled,
    deleted,
    reservationDetails,
    mode = EListingCardMode.Home 
}: IListingData) {
    const { getCountryByValue } = useCountries();
    const cntry = getCountryByValue(country);

    const [ imageFiles ] = useState<IHomeImages[]>(JSON.parse(imagePath));
    const [ imgNumber ] = useState<number>(0);

    const classAttributes = !deleted ? 
        'flex flex-col border-2 rounded-lg border-2 border-teal-200 p-3 flex-shrink-0 justify-between' 
        : 'relative flex flex-col border-2 rounded-lg border-2 border-teal-200 p-3 flex-shrink-0 justify-between bg-gray-300' 
        
// 'flex flex-col border-2 rounded-lg border-gray-300 p-3 flex-shrink-0 justify-between'

  return (
    <div className={classAttributes}>
        {
            deleted ? 
                <div className='absolute top-[50%] left-[25%] text-red-500 font-bold text-3xl z-50 -rotate-45'>DELETED</div>
                : null
        }
        <div className='relative h-56'>
            { userId && (
                <div className='z-10 absolute right-0'>
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

            <div className='w-full flex flex-col justify-center items-center'>
                <Carousel
                    opts={{
                        align: "start",
                        loop: true
                    }}
                    plugins={ process.env.USE_IMAGE_ROTATOR === "1" ? [
                        Autoplay({
                            delay: 4000,
                        }),
                    ] : []}
                    className="w-[224px] max-w-xs"
                >
                    <Link href={`/home/${homeId}`} key={imageFiles[imgNumber].thumbnailImagePath}>
                        <CarouselContent>
                            {imageFiles.map((img, index) => (
                            <CarouselItem key={index} 
                                // className="md:basis-1/2 lg:basis-1/2"
                            >
                                <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-2">
                                        <img src={`${supabaseUrl}/storage/v1/object/public/${supabaseStorageBucketName}/thumbnails/${homeId}/${img.thumbnailImagePath}`} 
                                        alt={`Image ${index}`}
                                        className='h-full w-auto' />
                                    </CardContent>
                                </Card>
                                </div>
                            </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Link>
                    {
                        process.env.USE_IMAGE_ROTATOR !== "1" 
                            ? (
                                <>
                                    <div className="absolute top-1/2 left-[-12px] flex items-center justify-center">
                                        <CarouselPrevious className="relative left-0 translate-x-0 hover:translate-x-0 hover:bg-primary/90" />
                                    </div>
                                    <div className="absolute top-1/2 right-[-12px] flex items-center justify-center">
                                        <CarouselNext className="relative right-0 translate-x-0 hover:translate-x-0 hover:bg-primary/90" />
                                    </div>
                                </>
                            ) : null
                        
                    }
                </Carousel>
            </div>
            {/* </Link> */}
            
        </div>

        <Link href={`/home/${homeId}`}>
            <div className='flex flex-col justify-between'>
                <h3 className='font-medium text-base mt-2 p-2'>
                    {
                        <div className='w-full flex flex-row gap-2 text-primary text-sm'>
                            <div className='flex flex-col justify-center items-center'>
                                <img  
                                    src={getFlagURL(country)}
                                    width="20"  
                                    height="8"  
                                    alt={"Country Flag"} /> 
                            </div>
                            { cntry?.label } 
                            {/* + " / " + cntry?.region  */}
                        </div>
                    }
                </h3>
            </div>
            {
                mode == EListingCardMode.Home ? (
                    <>
                        <p className='text-muted-foreground text-xs line-clamp-3'>
                            {description}
                        </p>
                        <div className='flex flex-col justify-between mt-5'>
                            <div className='flex flex-col'>
                                <p className='text-muted-foreground'>
                                    {<span className='font-medium text-black'>{"AUD " + price}</span>} {" per night"}
                                </p>
                            </div>
                        </div>
                    </>

                ) : (
                    <div className='flex flex-col justify-between'>
                        <div className='flex flex-col'>
                            <p className='text-muted-foreground'>
                                {
                                    reservationDetails ? (
                                        <span className='font-medium text-black'>
                                            {`Total Charge: $${getTotalReservationCharge(reservationDetails).toFixed(2)}`}
                                        </span>
                                    ) : (
                                        null
                                    )
                                }
                            </p>                            
                            <div className='flex flex-col'>
                                <p className='text-muted-foreground text-xs'>
                                    {<span className='font-medium text-black'>{"$" + price}</span>} {" per night"}
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col mt-2'>
                            <p className='text-muted-foreground text-xs'>
                                {<span className='font-medium text-black'>{"Start Date: "}</span>} {new Date(reservationDetails!.startDate!).toLocaleDateString()}
                            </p>
                            <p className='text-muted-foreground text-xs'>
                                {<span className='font-medium text-black'>{"End Date: "}</span>} {new Date(reservationDetails!.endDate!).toLocaleDateString()}
                            </p>
                            <p className='text-muted-foreground text-xs'>
                                {<span className='font-medium text-black'>{"Nights: "}</span>} 
                                {Math.round((new Date(reservationDetails!.endDate).getTime() 
                                    - new Date(reservationDetails!.startDate).getTime())
                                    / (1000 * 3600 * 24))}
                            </p>
                            <p className='text-muted-foreground text-xs'>
                                {<span className='font-medium text-black'>{"Guests: "}</span>} 
                                {reservationDetails!.guests}
                            </p>
                        </div>
                    </div>
                )
            }
        </Link>
        <div className='flex flex-row justify-between mt-5'>
            {
                enableButton ? (
                    <EnableHomeListing userId={userId!} homeId={homeId} checked={enabled!} />

                ) : null 
            }
            {
                editButton ? (
                    <EditHome homeId={homeId} />

                ) : null 
            }
            {
                !deleted ?
                    deleteButton ? (
                            <DeleteHomeListing userId={userId!} homeId={homeId} />
                        ) : null
                    : null
            }
        </div>
    </div>
  )
}

export default ListingCard

