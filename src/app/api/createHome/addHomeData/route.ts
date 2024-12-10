import prisma from "@/data/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST() {
    console.log("Using API Calls");
    
    const { getUser
        // , getIdToken, getAccessToken 
    } = getKindeServerSession();
    const user = await getUser();

    if(!user || !user.id) {
        return NextResponse.json({ Error: "createHome - Add Data: User not found or no user logged in." }, { status: 500 })
    }
    
    const data = await prisma.home.findFirst({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAT: 'desc'
        }
    });
    
    // console.log("Data: ", data);
    
    if(data === null) {
        // console.log('Data is null')
        const data = await prisma.home.create({
            data: {
                userId: user.id
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
                userId: user.id
            }
        });
    
        return redirect(`/create/${data.id}/structure`);
    }
 
}