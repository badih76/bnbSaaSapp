'use server'

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache'
import { Homes } from "@/drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { ELogLevel, ILogObject } from "@/loggerServices/loggerInterfaces";
import { Logger } from "@/loggerServices/logger";
import { isRedirectError } from "next/dist/client/components/redirect";
import { db } from "@/drizzle";

export async function POST() {
    noStore();

    console.log("Using API Calls");

    let redirectPath = '';

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

            redirectPath = `/create/${newHome[0].id}/structure`;
            
        } else if(!data[0].addedCategory && !data[0].addedDescription && !data[0].addedLocation){
            redirectPath = `/create/${data[0].id}/structure`;
            
        } else if(data[0].addedCategory && !data[0].addedDescription){
            redirectPath = `/create/${data[0].id}/description`;

        } else if(data[0].addedCategory && data[0].addedDescription && !data[0].addedLocation) {
            redirectPath = `/create/${data[0].id}/addressEx`;

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
    
            redirectPath = `/create/${newHome[0].id}/structure`;
        }

        return NextResponse.redirect(new URL("http://localhost:3000/"+redirectPath));

    } catch(ex) {
        
        if(isRedirectError(ex)) throw ex;

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

        redirectPath = "/Error";
        
        return NextResponse.redirect("http://localhost:3000/"+redirectPath);

    }     
 
}