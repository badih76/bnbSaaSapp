import React from 'react'
import HomeImagesCarousel from '../my-components/HomeImagesCarousel'
import { IHomeImages } from '@/lib/thumnailsInterface';
import { drizzle } from 'drizzle-orm/mysql2';
import { Homes } from '@/drizzle/schema';

const db = drizzle({ connection: { uri: process.env.DATABASE_URL }});

const getData = async () => {
    const data = await db.select({ photo: Homes.photo }).from(Homes).limit(1)

    return data;
}

async function Carousel() {
    const data = await getData();
    const imgFiles: string[] = [];
    let photos: IHomeImages[] = [];

    if(data && data.length > 0) {
      try {
        photos = JSON.parse(data[0].photo!);
        
      } catch(ex) {
        console.log(ex);
        
        photos = [];
      } 

    }

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