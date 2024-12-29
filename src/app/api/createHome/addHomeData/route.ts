import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache'
import { drizzle } from "drizzle-orm/mysql2";
import { Homes } from "@/drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { ELogLevel, ILogObject } from "@/loggerServices/loggerInterfaces";
import { Logger } from "@/loggerServices/logger";

const db = drizzle({ connection: { uri: process.env.DATABASE_URL }});

export async function POST() {
    noStore();

    console.log("Using API Calls");

    try {
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
                    module: "api/createHome/addHomeData",
                    category: "User Authentication",
                },
                };
            Logger.log(logObj);
            
            return NextResponse.json({ Error: "User not found or no user logged in. This action cannot be performed." }, { status: 500 })
        }
        
        const data = await db.select().from(Homes).where(eq(Homes.userId, user.id)).orderBy(desc(Homes.createdAt)).limit(1);
        
        // console.log("Data: ", data);
        
        if(data.length === 0) {
            
            const newHome = await db.insert(Homes).values({ userId: user.id, title: "" }).$returningId();

            const logObj: ILogObject = {
                level: ELogLevel.Info,
                message: `New Home listing added. homeId: ${newHome[0]}`,
                metaData: {
                  service: "ESM-bnb-14",
                  module: "api/createHome/addHomeData",
                  category: "API Call",
                },
              };
            Logger.log(logObj);
            
            return redirect(`/create/${newHome[0].id}/structure`);
            
        } else if(!data[0].addedCategory && !data[0].addedDescription && !data[0].addedLocation){
            return redirect(`/create/${data[0].id}/structure`);
        } else if(data[0].addedCategory && !data[0].addedDescription){
            return redirect(`/create/${data[0].id}/description`);
        } else if(data[0].addedCategory && data[0].addedDescription && !data[0].addedLocation) {
            return redirect(`/create/${data[0].id}/addressEx`);
        } else if(data[0].addedCategory && data[0].addedDescription && data[0].addedLocation) {
            
            const newHome = await db.insert(Homes).values({ userId: user.id, title: "" }).$returningId();

            const logObj: ILogObject = {
                level: ELogLevel.Info,
                message: `New Home listing added. homeId: ${newHome[0]}`,
                metaData: {
                  service: "ESM-bnb-14",
                  module: "api/createHome/addHomeData",
                  category: "API Call",
                },
              };
            Logger.log(logObj);
    
            return redirect(`/create/${newHome[0].id}/structure`);
        }

    } catch(ex) {
        console.log('ERROR: ', ex);

        const logObj: ILogObject = {
            level: ELogLevel.Error,
            message: `Error: ${(ex as Error).message}`,
            metaData: {
              service: "ESM-bnb-14",
              module: "api/createHome/addHomeData",
              category: "API Call",
              stackdump: (ex as Error).stack,
            },
          };
        Logger.log(logObj);

        return redirect("/Error");
    }
    
 
}