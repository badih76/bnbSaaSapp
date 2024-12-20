import prisma from "@/data/db";
import { supabase } from "@/data/supabase";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache'

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
    const imageFile = formData.get("image") as File;
    const imageBlob = formData.get("image") as Blob;
    const guestsCount = parseInt(formData.get("guests") as string);
    const roomsCount = parseInt(formData.get("rooms") as string);
    const bathroomsCount = parseInt(formData.get("bathrooms") as string);
    const homeId = formData.get("homeId") as string;
    const selectedFacilities = formData.get("selectedFacilities") as string;

    const arrayBuffer = await imageBlob.arrayBuffer();

    // console.log("ImageFile: ", imageFile.name, imageFile.type);
    const fileName = homeId + '_' + imageFile.name;

    // console.log("Type: ", imageFile.type)
    const { data: imageData } = await supabase.storage
        .from('esm-bnb-images')
        .upload(`${fileName}`, arrayBuffer,
            {
                cacheControl: '86400',      // one day
                contentType: imageFile.type
                
            });

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
            photo: imageData?.path,
            addedDescription: true,
            facilities: selectedFacilities
        }
    });

    console.log(data);

    return redirect(`/create/${homeId}/addressEx`);
}