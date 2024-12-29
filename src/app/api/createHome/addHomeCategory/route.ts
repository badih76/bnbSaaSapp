import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache'
import { drizzle } from "drizzle-orm/mysql2";
import { Homes } from "@/drizzle/schema";
import { ELogLevel, ILogObject } from "@/loggerServices/loggerInterfaces";
import { Logger } from "@/loggerServices/logger";

const db = drizzle({ connection: { uri: process.env.DATABASE_URL }});

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
          console.log('ERROR: No User Found!!!');

            const logObj: ILogObject = {
                level: ELogLevel.Info,
                message: `User not found or no user logged in. This action cannot be performed.`,
                metaData: {
                  service: "ESM-bnb-14",
                  module: "api/createHome/addHomeCategory",
                  category: "User Authentication",
                },
              };
            Logger.log(logObj);
            
            return NextResponse.json({ Error: "User not found or no user logged in. This action cannot be performed." }, { status: 500 })
        }
        
        // console.log("Data: ", data);
        
        const categoryName = formData.get("categoryName") as string;
        const homeId = formData.get("homeId") as string;
    
        await db.update(Homes).set({
            category: categoryName,
            addedCategory: true
        })
    
        const logObj: ILogObject = {
            level: ELogLevel.Info,
            message: `New Home category updated.`,
            metaData: {
              service: "ESM-bnb-14",
              module: "api/createHome/addHomeCategory",
              category: "API Call",
            },
          };
        Logger.log(logObj);
        
        return redirect(`/create/${homeId}/description`);

    } catch(ex) {

      console.log('ERROR: ', ex);

        const logObj: ILogObject = {
            level: ELogLevel.Error,
            message: `Error: ${(ex as Error).message}`,
            metaData: {
              service: "ESM-bnb-14",
              module: "api/createHome/addHomeCategory",
              category: "API Call",
              stackdump: (ex as Error).stack,
            },
          };
        Logger.log(logObj);

        return redirect("/Error");
    }
}