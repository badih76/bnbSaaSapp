
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache'
import { Reservations } from "@/drizzle/schema";
import { ELogLevel, ILogObject } from "@/loggerServices/loggerInterfaces";
import { Logger } from "@/loggerServices/logger";
import { db } from "@/drizzle";

export async function POST(req: NextRequest) {
    noStore();

    console.log("Using API Calls");

    try {
        const formData = await req.formData();
        
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
                    module: "api/reservations/add",
                    category: "User Authentication",
                }};
            Logger.log(logObj);
            
            return NextResponse.json({ Error: "User not found or no user logged in. This action cannot be performed." }, 
                { status: 500 })
        }
    
        const userId = formData.get("userId") as string;
        const homeId = formData.get("homeId") as string;
        const startDate = formData.get("startDate") as string;
        const endDate = formData.get("endDate") as string;
    
        await db.insert(Reservations).values({
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            userId: userId,
            homeId,
        })

        const logObj: ILogObject = {
            level: ELogLevel.Info,
            message: `Reservation create for homeId: ${homeId} and userId: ${userId}, startDate: ${startDate}, endDate: ${endDate}.`,
            metaData: {
                service: "ESM-bnb-14",
                module: "api/reservations/add",
                category: "API Call",
            }};
        Logger.log(logObj);
            
        return redirect("/reservations");

    } catch(ex) {
        const logObj: ILogObject = {
            level: ELogLevel.Error,
            message: `Error: ${(ex as Error).message}`,
            metaData: {
              service: "ESM-bnb-14",
              module: "api/reservations/add",
              category: "API Call",
              stackdump: (ex as Error).stack,
            },
          };
        Logger.log(logObj);

        return redirect("/Error");
    }
    
}