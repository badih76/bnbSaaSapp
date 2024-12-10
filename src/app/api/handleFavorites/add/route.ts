import prisma from "@/data/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { revalidatePath } from "next/cache";
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

    return redirect(pathName);
}