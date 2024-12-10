import prisma from "@/data/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log("Using API Calls");
    // const formData = await req.formData();
    const { userId, accessToken } = await req.json();
    
    const { getUser
        // , getIdToken, getAccessToken 
    } = getKindeServerSession();
    const user = await getUser();

    if((!user || !user.id) && !accessToken) {
        return NextResponse.json({ Error: "User not found or no user logged in." }, { status: 200 })
    }
    
    const data = await prisma.reservations.findMany({
        where: {
            userId: userId
        },
        select: {
            Home: {
                select: {
                    id: true,
                    country: true,
                    photo: true,
                    description: true,
                    price: true,
                    Favorites: {
                        where: {
                            userId: userId
                        }
                    }
                }
            }
        }
    });

    return NextResponse.json({
        data: data
    }, { status: 200 });
}