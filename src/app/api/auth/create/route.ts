import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import prisma from "../../../../data/db";

export async function GET() {
    const { getUser } = getKindeServerSession();
    const returnUrl = process.env.KINDE_SITE_URL;
    
    const user = await getUser();
    if(!user || user === null || !user.id) {
        return NextResponse.json({
            status: 200,
            error: "User Not Found!"
        })
    } else {
        let dbUser = await prisma.user.findUnique({
            where: {
                id: user!.id!
            }
        });
    
        if(!dbUser) {
    
            dbUser = await prisma.user.create({
                data: {
                    email: user.email ? user.email : "",
                    firstName: user.given_name ? user.given_name : "",
                    lastName: user.family_name ? user.family_name : "",
                    id: user.id,
                    profileImage: user.picture ? user.picture : `https://avatar.vercel.sh/${user.given_name}`
                }
            })
        }
        // else { console.log('User was found.'); }
    
        return NextResponse.redirect(returnUrl!);

    }

}