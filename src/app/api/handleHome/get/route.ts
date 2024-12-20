import prisma from "@/data/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache'

export async function POST(req: NextRequest) {
    noStore();

    console.log("Using API Calls");
    // const formData = await req.formData();
    const { userId, accessToken, homeId } = await req.json();
    
    const { getUser
        // , getIdToken, getAccessToken 
    } = getKindeServerSession();
    const user = await getUser();

    if((!user || !user.id) && !accessToken) {
        return NextResponse.json({ Error: "User not found or no user logged in." }, { status: 200 })
    }
    
    const data = await prisma.home.findUnique({
        where: {
            id: homeId,
            userId: userId,
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

    return NextResponse.json({
        data: data
    }, { status: 200 });
}