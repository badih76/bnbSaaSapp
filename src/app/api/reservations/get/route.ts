
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache'
import { Favorites, Homes, Reservations } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { ELogLevel, ILogObject } from "@/loggerServices/loggerInterfaces";
import { Logger } from "@/loggerServices/logger";
import { redirect } from "next/navigation";
import { db } from "@/drizzle";

export async function POST(req: NextRequest) {
    noStore();

    console.log("Using API Calls");

    try {
        const { userId, accessToken } = await req.json();
        
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
                    module: "api/reservations/get",
                    category: "User Authentication",
                }};
            Logger.log(logObj);
            
            return NextResponse.json({ Error: "User not found or no user logged in. This action cannot be performed." }, 
                { status: 500 })
        }
    
        const data = await db.select({
                id: Reservations.id,
                homeId: Homes.id,
                country: Homes.country,
                photo: Homes.photo,
                description: Homes.description,
                price: Homes.price,
                deleted: Homes.deleted,
                favId: Favorites.id,
                rate: Reservations.rate,
                startDate: Reservations.startDate,
                endDate: Reservations.endDate,
                guests: Reservations.guests
            }).from(Reservations)
            .innerJoin(Homes, eq(Homes.id, Reservations.homeId))
            .leftJoin(Favorites, and(eq(Homes.id, Favorites.homeId), eq(Favorites.userId, userId)))
            .where(eq(Reservations.userId, userId))
            .orderBy(Reservations.startDate, Reservations.endDate);
    
        const logObj: ILogObject = {
            level: ELogLevel.Info,
            message: `Reservations selected for userId: ${userId}.`,
            metaData: {
                service: "ESM-bnb-14",
                module: "api/reservations/get",
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
              module: "api/reservations/get",
              category: "API Call",
              stackdump: (ex as Error).stack,
            },
          };
        Logger.log(logObj);

        return redirect("/Error");
    }
}