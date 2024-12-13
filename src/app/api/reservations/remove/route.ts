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

    const userId = formData.get("userId") as string;
    const homeId = formData.get("homeId") as string;
    const reservationId = formData.get("reservationId") as string;

    const data = await prisma.reservations.delete({
        where: {
            id: reservationId,
            userId: userId,
            homeId: homeId
        }
    })

    console.log(data);
    
    return redirect("/reservations");
}