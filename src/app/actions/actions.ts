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
    const guestsCount = parseInt(formData.get("guests") as string);
    const roomsCount = parseInt(formData.get("rooms") as string);
    const bathroomsCount = parseInt(formData.get("bathrooms") as string);
    const homeId = formData.get("homeId") as string;
    const selectedFacilities = formData.get("selectedFacilities") as string;

    // console.log("Image Name: ", imageFile.name);
    // console.log("Type: ", imageFile.type)

    const fileName = homeId + '_' + imageFile.name;

    const { data: imageData } = await supabase.storage
        .from('esm-bnb-images')
        .upload(`${fileName}`, imageFile,
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
    console.log('Delet home', homeId, userId);
    
    const data = await prisma.home.update({
        data: {
            deleted: true
        },
        where: {
            id: homeId,
            userId: userId
        }
    })

    console.log(data);

    revalidatePath("/myHomes");
}

export async function enableDisableCompleteHomeListing(formData: FormData) {
    const homeId = formData.get("homeId") as string;
    const userId = formData.get("userId") as string;
    const checked = formData.get("checked") as string;
    
    const data = await prisma.home.update({
        data: {
            enabled: checked == "1" ? false : true
        },
        where: {
            id: homeId,
            userId: userId
        }
    })

    console.log(data);

    revalidatePath("/myHomes");
}

export async function getHomeDetailsSSF(homeId: string) {
    const data = await prisma.home.findUnique({
        where: {
            id: homeId,
        },
        select: {
            categoryName: true,
            title: true,
            photo: true,
            id: true,
            price: true,
            country: true,
            description: true,
            deleted: true,
            enabled: true,
            guests: true,
            bedrooms: true,
            bathrooms: true,
            facilities: true,
            address: true
        }
    });

    return data;

}

export async function updateHomeDetails(formData: FormData) {
    const homeId = formData.get("homeId") as string;
    const categoryName = formData.get("categoryName") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const guests = formData.get("guests") as string;
    const bedrooms = formData.get("bedrooms") as string;
    const bathrooms = formData.get("bathrooms") as string;
    const country = formData.get("countryValue") as string;
    const address = formData.get("addressValue") as string;
    const facilities = formData.get("selectedFacilities") as string;

    const data = await prisma.home.update({
        data: {
            categoryName, 
            title, 
            description, 
            price: parseFloat(price), 
            guests: parseInt(guests), 
            bedrooms: parseInt(bedrooms), 
            bathrooms: parseInt(bathrooms), 
            facilities, 
            country, 
            address 
        },
        where: {
            id: homeId
        }
    });

    console.log(data);

    return redirect(`/home/${homeId}`);
}
