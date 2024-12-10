import prisma from "@/data/db";
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

    return redirect("/");
}