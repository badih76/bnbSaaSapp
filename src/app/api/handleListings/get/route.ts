
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache'
import { Favorites, Homes } from "@/drizzle/schema";
import { eq, and, not, or } from "drizzle-orm";
import { ELogLevel, ILogObject } from "@/loggerServices/loggerInterfaces";
import { Logger } from "@/loggerServices/logger";
import { redirect } from "next/navigation";
import { db } from "@/drizzle";

export async function POST(req: NextRequest) {
    noStore();

    console.log("Using API Calls");

    try {
        const { userId, accessToken, withDeleted } = await req.json();
        
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
                    module: "api/handleListings/get",
                    category: "User Authentication",
                }};
            Logger.log(logObj);
            
            return NextResponse.json({ Error: "User not found or no user logged in. This action cannot be performed." }, 
                { status: 500 })
        }
        
        const data = await db.select({
                id: Homes.id,
                photo: Homes.photo,
                price: Homes.price,
                country: Homes.country,
                description: Homes.description,
                deleted: Homes.deleted,
                enabled: Homes.enabled,
                favId: Favorites.id
            }).from (Homes).leftJoin(Favorites, eq(Homes.id, Favorites.homeId))        
            .where(and(eq(Homes.userId, userId), Homes.addedCategory, 
                Homes.addedDescription, Homes.addedLocation, 
                !withDeleted ? not(Homes.deleted) : or(Homes.deleted, not(Homes.deleted))))
    
        const logObj: ILogObject = {
            level: ELogLevel.Info,
            message: `User listings selected for userId: ${userId}.`,
            metaData: {
                service: "ESM-bnb-14",
                module: "api/handleListings/get",
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
              module: "api/handleListings/get",
              category: "API Call",
              stackdump: (ex as Error).stack,
            },
          };
        Logger.log(logObj);

        return redirect("/Error");
    }
}