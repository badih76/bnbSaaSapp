"use server"

import prisma from "@/data/db"
import { supabase } from "@/data/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBnbSiteHome({ userId}: { userId: string }) {
    const data = await prisma.home.findFirst({
        where: {
            userId: userId
        },
        orderBy: {
            createdAT: 'desc'
        }
    });

    console.log("Data: ", data);

    if(data === null) {
        console.log('Data is null')
        const data = await prisma.home.create({
            data: {
                userId: userId
            }
        });
        
        return redirect(`/create/${data.id}/structure`);
        
    } else if(!data.addedCategory && !data.addedDescription && !data.addedLocation){
        return redirect(`/create/${data.id}/structure`);
    } else if(data.addedCategory && !data.addedDescription){
        return redirect(`/create/${data.id}/description`);
    } else if(data.addedCategory && data.addedDescription && !data.addedLocation) {
        return redirect(`/create/${data.id}/addressEx`);
    } else if(data.addedCategory && data.addedDescription && data.addedLocation) {
        const data = await prisma.home.create({
            data: {
                userId: userId
            }
        });

        return redirect(`/create/${data.id}/structure`);
    }
    
}

export async function createCategory(formData: FormData) {
    const categoryName = formData.get("categoryName") as string;
    const homeId = formData.get("homeId") as string;

    console.log("I'm called from somewhere!!!!!!!!!!!");

    const data = await prisma.home.update({
        where: {
            id: homeId
        },
        data: {
            categoryName: categoryName,
            addedCategory: true
        }
    });

    console.log(data);

    return redirect(`/create/${homeId}/description`);
}

export async function CreateDescription(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price");
    const imageFile = formData.get("image") as File;
    const guestsCount = formData.get("guests") as string;
    const roomsCount = formData.get("rooms") as string;
    const bathroomsCount = formData.get("bathrooms") as string;
    const homeId = formData.get("homeId") as string;

    console.log("Type: ", imageFile.type)
    const { data: imageData } = await supabase.storage
        .from('esm-bnb-images')
        .upload(`${imageFile.name}`, imageFile,
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

export async function createLocation(formData: FormData) {
    const homeId = formData.get('homeId') as string;
    const countryValue = formData.get('countryValue') as string;
    const address = formData.get('addressValue') as string;

    const data = await prisma.home.update({
        where: {
            id: homeId
        },
        data: {
            addedLocation: true,
            country: countryValue,
            address: address
        }      
    });

    console.log(data);

    return redirect("/myHomes");
}

export async function addToFavorites(formData: FormData) {

    const homeId = formData.get("homeId") as string;
    const userId = formData.get("userId") as string;
    const pathName = formData.get("pathName") as string;

    const data = await prisma.favorites.create({
        data: {
            homeId: homeId,
            userId: userId
        }
    })

    console.log(data);

    revalidatePath(pathName);
}

export async function removeFromFavorites(formData: FormData) {

    const favoriteId = formData.get("favoriteId") as string;
    const userId = formData.get("userId") as string;
    const pathName = formData.get("pathName") as string;

    const data = await prisma.favorites.delete({
        where: {
            id: favoriteId,
            userId: userId
        }
    })

    console.log(data);

    revalidatePath(pathName);
}

export async function createReservation(formData: FormData) {
    const userId = formData.get("userId") as string;
    const homeId = formData.get("homeId") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;

    const data = await prisma.reservations.create({
        data: {
            userId: userId,
            homeId: homeId,
            startDate: startDate,
            endDate: endDate
        }
    })

    console.log(data);
    
    return redirect("/reservations");
}

export async function removeFromHomeListing(formData: FormData) {

    const homeId = formData.get("homeId") as string;
    const userId = formData.get("userId") as string;
    // const pathName = formData.get("pathName") as string;

    const data = await prisma.home.delete({
        where: {
            id: homeId,
            userId: userId
        }
    })

    console.log(data);

    return redirect(`/myHomes`);
}

export async function removeFromCompleteHomeListing(formData: FormData) {

    const homeId = formData.get("homeId") as string;
    const userId = formData.get("userId") as string;

    const data = await prisma.home.delete({
        where: {
            id: homeId,
            userId: userId
        }
    })

    console.log(data);

    revalidatePath("/myHomes");
}