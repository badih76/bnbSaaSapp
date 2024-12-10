import prisma from "@/data/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log("Using API Calls");
    // console.log("Request ****: ", req)
    const formData = await req.formData()
    
    const { getUser
        // , getIdToken, getAccessToken 
    } = getKindeServerSession();
    const user = await getUser();

    if(!user || !user.id) {
        return NextResponse.json({ Error: "User not found or no user logged in." }, { status: 500 })
    }

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
    console.log("Path: ", pathName);
    // return redirect(pathName);
    revalidatePath(pathName);

    return NextResponse.json({
        message: "successful"
    }, { status: 200 });
}