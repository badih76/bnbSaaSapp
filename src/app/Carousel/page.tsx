import React from 'react'
import HomeImagesCarousel from '../my-components/HomeImagesCarousel'
import prisma from '@/data/db';
import { IHomeImages } from '@/lib/thumnailsInterface';

const getData = async () => {
    const data = await prisma.home.findFirst({
        select: {
            photo: true
        }
    });

    return data;
}

async function Carousel() {
    const data = await getData();
    const imgFiles: string[] = [];
    const photos: IHomeImages[] = data ?  JSON.parse(data.photo!) : [];

    photos.map(d => {
        imgFiles.push(d.thumbnailImagePath);
    })

  return (
    <div className='w-full flex justify-center'>
        <HomeImagesCarousel images={imgFiles} />

    </div>
  )
}

export default Carousel