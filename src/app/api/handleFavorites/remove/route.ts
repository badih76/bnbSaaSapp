
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache'
import { drizzle } from "drizzle-orm/mysql2";
import { Favorites } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { ELogLevel, ILogObject } from "@/loggerServices/loggerInterfaces";
import { Logger } from "@/loggerServices/logger";
import { redirect } from "next/navigation";

const db = drizzle({ connection: { uri: process.env.DATABASE_URL }});

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
                    module: "api/handleFavorites/remove",
                    category: "User Authentication",
                }};
            Logger.log(logObj);
            
            return NextResponse.json({ Error: "User not found or no user logged in. This action cannot be performed." }, 
                { status: 500 })
        }
    
        const favoriteId = formData.get("favoriteId") as string;
        const userId = formData.get("userId") as string;
        const pathName = formData.get("pathName") as string;
    
        await db.delete(Favorites).where(and(eq(Favorites.userId, userId), eq(Favorites.id, favoriteId)));
    
        const logObj: ILogObject = {
            level: ELogLevel.Info,
            message: `Home removed from Favorites.`,
            metaData: {
              service: "ESM-bnb-14",
              module: "api/handleFavorites/remove",
              category: "API Call",
            },
          };
        Logger.log(logObj);

        // return redirect(pathName);
        revalidatePath(pathName);
    
        return NextResponse.json({
            message: "successful"
        }, { status: 200 });

    } catch(ex) {
        const logObj: ILogObject = {
            level: ELogLevel.Error,
            message: `Error: ${(ex as Error).message}`,
            metaData: {
              service: "ESM-bnb-14",
              module: "api/handleFavorites/remove",
              category: "API Call",
              stackdump: (ex as Error).stack,
            },
          };
        Logger.log(logObj);

        return redirect("/Error");
    }
    
}