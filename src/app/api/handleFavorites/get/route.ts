import prisma from "@/data/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log("Using API Calls");
    // const formData = await req.formData();
    const { userId, accessToken } = await req.json();

    console.log({
        userId, accessToken
    })
    
    const { getUser
        // , getIdToken, getAccessToken 
    } = getKindeServerSession();
    const user = await getUser();

    if((!user || !user.id) && !accessToken) {
        return NextResponse.json({ Error: "User not found or no user logged in." }, { status: 200 })
    }

    // const data = await prisma.reservations.findMany({
    //     where: {
    //         userId: userId
    //     }
    // })
    
    const data = await prisma.favorites.findMany({
        where: {
            userId: userId
        },
        select: {
            Home: {
                select: {
                    photo: true,
                    id: true,
                    Favorites: true,
                    price: true,
                    country: true,
                    description: true
                }
            }
        }
    });

    console.log("Data in API: ", data);

    return NextResponse.json({
        data: data
    }, { status: 200 });
}