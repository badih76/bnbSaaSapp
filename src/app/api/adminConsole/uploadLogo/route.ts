import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache'
import { sql } from "drizzle-orm";
import { ELogLevel, ILogObject } from "@/loggerServices/loggerInterfaces";
import { Logger } from "@/loggerServices/logger";
import { db } from "@/drizzle";

export async function POST(req: NextRequest) {
    noStore();
    console.log('In the API call');

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
                    module: "api/createHome/addHomeDescription",
                    category: "User Authentication",
                },
                };
            Logger.log(logObj);
            
            return NextResponse.json({ Error: "User not found or no user logged in. This action cannot be performed." }, { status: 500 })
        }

        // get the uploaded images count
        const imagesCount = parseInt(formData.get('imagesCount') as string);
        console.log('Images Count: ', imagesCount);
    
        const imgFileStringified = formData.get('image1'.toString().trim()) as string;
    
        console.log('Image File: ', imgFileStringified.length);

        // await db.update(Settings)
        //     .set({
        //         setLogo: imgFileStringified
        //     })
        //     .where(eq(Settings.id, 'ed8c2a47-0abe-418b-8d21-b6e1722d1640'));
        await db.execute(sql`UPDATE settings SET setLogo = ${imgFileStringified} WHERE id='ed8c2a47-0abe-418b-8d21-b6e1722d1640'`);

        let logObj: ILogObject = {
            level: ELogLevel.Info,
            message: `New Home Listing description updated.`,
            metaData: {
                service: "ESM-bnb-14",
                module: "api/createHome/addHomeDescription",
                category: "API Call",
            }};
        Logger.log(logObj);
        
        // return redirect(`/create/${homeId}/addressEx`);
        return NextResponse.json({ message: 'Successful upload.', status: 200 });

    } catch(ex) {
        const logObj: ILogObject = {
            level: ELogLevel.Error,
            message: `Error: ${(ex as Error).message}`,
            metaData: {
              service: "ESM-bnb-14",
              module: "api/createHome/addHomeDescription",
              category: "API Call",
              stackdump: (ex as Error).stack,
            },
          };
        Logger.log(logObj);

        return redirect("/Error");
    }

}