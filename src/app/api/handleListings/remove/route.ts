
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache'
import { Homes } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { ELogLevel, ILogObject } from "@/loggerServices/loggerInterfaces";
import { Logger } from "@/loggerServices/logger";
import { db } from "@/drizzle";

export async function POST(req: NextRequest) {
    noStore();

    console.log("Using API Calls");

    try {
        const formData = await req.formData()
    
        const { getUser
            // , getIdToken, getAccessToken 
        } = getKindeServerSession();
        const user = await getUser();
    
        if(!user || !user.id) {
            const logObj: ILogObject = {
                level: ELogLevel.Info,
                message: `User not found or no user logged in. This action cannot be performed.`,
                metaData: {
                    service: "ESM-bnb-14",
                    module: "api/handleListings/remove",
                    category: "User Authentication",
                }};
            Logger.log(logObj);
            
            return NextResponse.json({ Error: "User not found or no user logged in. This action cannot be performed." }, 
                { status: 500 })
        }
    
        
        const homeId = formData.get("homeId") as string;
        const userId = formData.get("userId") as string;
        
        if(!homeId) {
            return NextResponse.json({ Error: "No Home ID specified!" }, { status: 500 })
        }
    
        console.log({ userId, homeId });
    
        await db.update(Homes)
            .set({ deleted: true })
            .where(eq(Homes.id, homeId));

        const logObj: ILogObject = {
            level: ELogLevel.Info,
            message: `User listing removed for userId: ${userId}.`,
            metaData: {
                service: "ESM-bnb-14",
                module: "api/handleListings/remove",
                category: "API Call",
            }};
        Logger.log(logObj);
    
        return redirect("/myHomes");

    } catch(ex) {
        const logObj: ILogObject = {
            level: ELogLevel.Error,
            message: `Error: ${(ex as Error).message}`,
            metaData: {
              service: "ESM-bnb-14",
              module: "api/handleListings/remove",
              category: "API Call",
              stackdump: (ex as Error).stack,
            },
          };
        Logger.log(logObj);
        
        return redirect("/Error");
    }
}