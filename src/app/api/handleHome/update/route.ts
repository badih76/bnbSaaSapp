
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache'
import { redirect } from "next/navigation";
import { KindeAccessToken } from "@kinde-oss/kinde-auth-nextjs/types";
import { Homes } from "@/drizzle/schema";
import { ELogLevel, ILogObject } from "@/loggerServices/loggerInterfaces";
import { Logger } from "@/loggerServices/logger";
import { db } from "@/drizzle";

export async function POST(req: NextRequest) {
    noStore();

    console.log("Using API Calls");    

    try {
        const formData = await req.formData();
        const homeId = formData.get("homeId") as string;
        const userId = formData.get("userId") as string;
        const accessToken: KindeAccessToken = JSON.parse(formData.get("accessToken") as string);
        const categoryName = formData.get("categoryName") as string;
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const price = formData.get("price") as string;
        const guests = formData.get("guests") as string;
        const bedrooms = formData.get("bedrooms") as string;
        const bathrooms = formData.get("bathrooms") as string;
        const country = formData.get("countryValue") as string;
        const address = formData.get("addressValue") as string;
        const facilities = formData.get("selectedFacilities") as string;
        
    
        const { getUser
            // , getIdToken, getAccessToken 
        } = getKindeServerSession();
        const user = await getUser();
    
        console.log(user.id, userId, accessToken, homeId);
    
    
        if((!user || !user.id)) {
            const logObj: ILogObject = {
                level: ELogLevel.Info,
                message: `User not found or no user logged in. This action cannot be performed.`,
                metaData: {
                    service: "ESM-bnb-14",
                    module: "api/handleHome/update",
                    category: "User Authentication",
                }};
            Logger.log(logObj);
            
            return NextResponse.json({ Error: "User not found or no user logged in. This action cannot be performed." }, 
                { status: 500 })
        }
    
        await db.update(Homes)
            .set({
                category: categoryName,
                title,
                description,
                price: parseFloat(price),
                guests: parseInt(guests), 
                bedrooms: parseInt(bedrooms), 
                bathrooms: parseInt(bathrooms), 
                facilities,
                country,
                address
            })  
    
        const logObj: ILogObject = {
            level: ELogLevel.Info,
            message: `Home detailes updated for homeId: ${homeId} and userId: ${userId}.`,
            metaData: {
                service: "ESM-bnb-14",
                module: "api/handleHome/update",
                category: "API Call",
            }};
        Logger.log(logObj);

        return redirect(`/home/${homeId}`);

    } catch(ex) {
        const logObj: ILogObject = {
            level: ELogLevel.Error,
            message: `Error: ${(ex as Error).message}`,
            metaData: {
              service: "ESM-bnb-14",
              module: "api/handleHome/update",
              category: "API Call",
              stackdump: (ex as Error).stack,
            },
          };
        Logger.log(logObj);

        return redirect("/Error");
    }
}