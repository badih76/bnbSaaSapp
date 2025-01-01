
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache'
import { Reservations } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
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
                    module: "api/reservations/remove",
                    category: "User Authentication",
                }};
            Logger.log(logObj);
            
            return NextResponse.json({ Error: "User not found or no user logged in. This action cannot be performed." }, 
                { status: 500 })
        }
    
        const userId = formData.get("userId") as string;
        const homeId = formData.get("homeId") as string;
        const reservationId = formData.get("reservationId") as string;
    
        await db.update(Reservations)
            .set({
                deleted: true,
                deleteDate: new Date()
            })
            .where(and(eq(Reservations.id, reservationId), eq(Reservations.userId, userId), eq(Reservations.homeId, homeId)));

        const logObj: ILogObject = {
            level: ELogLevel.Info,
            message: `Reservation removed for reservationId: ${reservationId}, userId: ${userId}, homeId: ${homeId}.`,
            metaData: {
                service: "ESM-bnb-14",
                module: "api/reservations/removed",
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
              module: "api/reservations/remove",
              category: "API Call",
              stackdump: (ex as Error).stack,
            },
          };
        Logger.log(logObj);

        return redirect("/Error");
    }
    
}