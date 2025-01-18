'use client'

import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useState } from 'react';

const supabaseUrl = process.env.SUPABASE_URL ?? '';
const supabaseStorageBucketName = process.env.SUPABASE_STORAGE_BUCKET_NAME ?? '';


function HomeImagesCarousel({ images, homeId } : {
    images: string[],
    homeId: string
}) {
    const [ selectedImage, setSelectedImage ] = useState(images[0]);

  return (
    <div className='w-full flex flex-col justify-center items-center mb-5'>
        <div className='relative h-[60vw] w-[60vw] lg:h-[550px]'>
            <Image 
                alt={ selectedImage }
                src={`${supabaseUrl}/storage/v1/object/public/${supabaseStorageBucketName}/${homeId}/${selectedImage}`}
                fill
                className='rounded-lg  h-full object-cover w-full'
            />
        </div>
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full"
        >
            <CarouselContent>
                {images.map((img, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/6">
                    <div className="p-1">
                    <Card onClick={() => {
                        setSelectedImage(img);
                    }}>
                        <CardContent className="flex aspect-square items-center justify-center p-2">
                        {/* <span className="text-3xl font-semibold">{index + 1}</span> */}
                            <img src={`https://vihbisloauhjiimyfhfu.supabase.co/storage/v1/object/public/esm-bnb-images/thumbnails/${homeId}/${img}`} 
                            alt={`Image ${index}`} />
                        </CardContent>
                    </Card>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </div>
  )
}

export default HomeImagesCarousel