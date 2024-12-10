import prisma from "@/data/db";
import { supabase } from "@/data/supabase";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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
    const guestsCount = formData.get("guests") as string;
    const roomsCount = formData.get("rooms") as string;
    const bathroomsCount = formData.get("bathrooms") as string;
    const homeId = formData.get("homeId") as string;

    const arrayBuffer = await imageBlob.arrayBuffer();

    console.log("ImageFile: ", imageFile, imageFile.type);

    // console.log("Type: ", imageFile.type)
    const { data: imageData } = await supabase.storage
        .from('esm-bnb-images')
        .upload(`${imageFile.name}`, arrayBuffer,
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
            addedDescription: true
        }
    });

    console.log(data);

    return redirect(`/create/${homeId}/addressEx`);
}