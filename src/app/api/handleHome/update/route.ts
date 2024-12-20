import prisma from "@/data/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache'
import { redirect } from "next/navigation";
import { KindeAccessToken } from "@kinde-oss/kinde-auth-nextjs/types";

export async function POST(req: NextRequest) {
    noStore();

    const formData = await req.formData();
    const homeId = formData.get("homeId") as string;
    const userId = formData.get("userId") as string;
    const accessToken: KindeAccessToken = JSON.parse(formData.get("accessToken") as string);
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
    
    // console.log({ homeId, categoryName, title, description, price, guests, bedrooms, bathrooms, facilities, country, address });

    console.log("Using API Calls");    
    const { getUser
        // , getIdToken, getAccessToken 
    } = getKindeServerSession();
    const user = await getUser();

    console.log(user.id, userId, accessToken, homeId);


    if((!user || !user.id)) {
        return NextResponse.json({ Error: "User not found or no user logged in." }, { status: 200 })
    }
    
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