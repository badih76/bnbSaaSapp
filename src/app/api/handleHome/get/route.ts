
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache'
import { drizzle } from "drizzle-orm/mysql2";
import { Homes } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { ELogLevel, ILogObject } from "@/loggerServices/loggerInterfaces";
import { Logger } from "@/loggerServices/logger";
import { redirect } from "next/navigation";

const db = drizzle({ connection: { uri: process.env.DATABASE_URL }});

export async function POST(req: NextRequest) {
    noStore();

    console.log("Using API Calls");

    try { 
        const { userId, accessToken, homeId } = await req.json();
        
        const { getUser
            // , getIdToken, getAccessToken 
        } = getKindeServerSession();
        const user = await getUser();
    
        if((!user || !user.id) && !accessToken) {
            const logObj: ILogObject = {
                level: ELogLevel.Info,
                message: `User not found or no user logged in. This action cannot be performed.`,
                metaData: {
                    service: "ESM-bnb-14",
                    module: "api/handleHome/get",
                    category: "User Authentication",
                }};
            Logger.log(logObj);
            
            return NextResponse.json({ Error: "User not found or no user logged in. This action cannot be performed." }, 
                { status: 500 })
        }
    
        const data = await db.select().from(Homes)
            .where(and(eq(Homes.id, homeId), eq(Homes.userId, userId)));

        const logObj: ILogObject = {
            level: ELogLevel.Info,
            message: `Home detailes selected for homeId: ${homeId} and userId: ${userId}.`,
            metaData: {
                service: "ESM-bnb-14",
                module: "api/handleHome/get",
                category: "API Call",
            }};
        Logger.log(logObj);
    
        return NextResponse.json({
            data: data
        }, { status: 200 });

    } catch(ex) {
        const logObj: ILogObject = {
            level: ELogLevel.Error,
            message: `Error: ${(ex as Error).message}`,
            metaData: {
              service: "ESM-bnb-14",
              module: "api/handleHome/get",
              category: "API Call",
              stackdump: (ex as Error).stack,
            },
          };
        Logger.log(logObj);

        return redirect("/Error");
    }
    
}