import React from 'react'
import HomeImagesCarousel from '../my-components/HomeImagesCarousel'
import { IHomeImages } from '@/lib/thumnailsInterface';
import { Homes } from '@/drizzle/schema';
import { db } from '@/drizzle';

const getData = async () => {
    const data = await db.select({ photo: Homes.photo }).from(Homes).limit(1)

    return data;
}

async function Carousel() {
    const data = await getData();
    const imgFiles: string[] = [];
    const photos: IHomeImages[] = data ?  JSON.parse(data[0].photo!) : [];

    photos.map(d => {
        imgFiles.push(d.thumbnailImagePath);
    })

  return (
    <div className='w-full flex justify-center'>
        <HomeImagesCarousel images={imgFiles} homeId=''/>

    </div>
  )
}

export default Carousel