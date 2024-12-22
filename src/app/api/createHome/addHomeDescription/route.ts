import prisma from "@/data/db";
import { supabase } from "@/data/supabase";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache'
import { IFilesUploadType, IHomeImages } from "@/lib/thumnailsInterface";
import { dataURItoBlob } from "@/lib/utilsCode";

export async function POST(req: NextRequest) {
    noStore();

    console.log("Using API Calls");
    const formData = await req.formData();
    
    const { getUser
        // , getIdToken, getAccessToken 
    } = getKindeServerSession();
    const user = await getUser();

    if(!user || !user.id) {
        return NextResponse.json({ Error: "User not found or no user logged in." }, { status: 500 })
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price");
    const guestsCount = parseInt(formData.get("guests") as string);
    const roomsCount = parseInt(formData.get("rooms") as string);
    const bathroomsCount = parseInt(formData.get("bathrooms") as string);
    const homeId = formData.get("homeId") as string;
    const selectedFacilities = formData.get("selectedFacilities") as string;
    
    // get the uploaded images count
    const imagesCount = parseInt(formData.get('imagesCount') as string);

    //get the passed uploaded images formData params and push them into an array
    const uploadedFilesParsed: IFilesUploadType[] = [];

    for(let n=0; n<imagesCount; n++) {
        const imgFileStringified = formData.get('image'+(n+1).toString().trim()) as string;

        const imgFileParsed = JSON.parse(imgFileStringified);

        uploadedFilesParsed.push(imgFileParsed);
    }

    const homeImages: IHomeImages[] = [];
    let stringifiedHomeImages = '';

    // upload the files to storage
    await Promise.all(uploadedFilesParsed.map(async (rip) => {
        const riBlob: Blob = dataURItoBlob(rip.srcThumbnail);
        const oiBlob: Blob = dataURItoBlob(rip.srcOriginal);

        const thumbArrayBuffer = await riBlob.arrayBuffer();
        const originArrayBuffer = await oiBlob.arrayBuffer();

        const fileName = rip.fileName;
        
        // upload thumbnail
        const { data: thumbImageData } = await supabase.storage
        .from('esm-bnb-images/thumbnails')
        .upload(`${fileName}`, thumbArrayBuffer,
            {
                cacheControl: '86400',      // one day
                contentType: rip.fileType
                
            });

        // upload original image
        const { data: originImageData } = await supabase.storage
        .from('esm-bnb-images')
        .upload(`${fileName}`, originArrayBuffer,
            {
                cacheControl: '86400',      // one day
                contentType: rip.fileType
                
            });
            
        // save images paths
        homeImages.push({ thumbnailImagePath: thumbImageData ? thumbImageData.path : '', 
                originalImagePath: originImageData ? originImageData.path : '' });

        stringifiedHomeImages = JSON.stringify(homeImages);
        console.log(stringifiedHomeImages);
    }));

    const data = await prisma.home.update({
        where: {
            id: homeId
        },
        data: {
            title: title,
            description: description,
            price: parseFloat(price as string),
            guests: guestsCount,
            bedrooms: roomsCount,
            bathrooms: bathroomsCount,
            photo: stringifiedHomeImages, //imageData?.path,
            addedDescription: true,
            facilities: selectedFacilities
        }
    });

    console.log(data);

    return redirect(`/create/${homeId}/addressEx`);
}