
import { supabase } from "@/data/supabase";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache'
import { IFilesUploadType, IHomeImages } from "@/lib/thumnailsInterface";
import { dataURItoBlob } from "@/lib/utilsCode";
import { drizzle } from "drizzle-orm/mysql2";
import { Homes } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
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
    
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const price = formData.get("price");
        const guestsCount = parseInt(formData.get("guests") as string);
        const roomsCount = parseInt(formData.get("rooms") as string);
        const bathroomsCount = parseInt(formData.get("bathrooms") as string);
        const homeId = formData.get("homeId") as string;
        const selectedFacilities = formData.get("selectedFacilities") as string;
        
        // get the uploaded images count
        const imagesCount = parseInt(formData.get('imagesCount') as string);
    
        //get the passed uploaded images formData params and push them into an array
        const uploadedFilesParsed: IFilesUploadType[] = [];
    
        for(let n=0; n<imagesCount; n++) {
            const imgFileStringified = formData.get('image'+(n+1).toString().trim()) as string;
    
            const imgFileParsed = JSON.parse(imgFileStringified);
    
            uploadedFilesParsed.push(imgFileParsed);
        }
    
        const homeImages: IHomeImages[] = [];
        let stringifiedHomeImages = '';
    
        // upload the files to storage
        await Promise.all(uploadedFilesParsed.map(async (rip) => {
            const riBlob: Blob | null = dataURItoBlob(rip.srcThumbnail);
            const oiBlob: Blob | null = dataURItoBlob(rip.srcOriginal);
    
            if(!riBlob || !oiBlob) return redirect("/Error");

            const thumbArrayBuffer = await riBlob.arrayBuffer();
            const originArrayBuffer = await oiBlob.arrayBuffer();
    
            const fileName = rip.fileName;
            
            // upload thumbnail
            const { data: thumbImageData } = await supabase.storage
            .from(`esm-bnb-images/thumbnails/${homeId}`)
            .upload(`${fileName}`, thumbArrayBuffer,
                {
                    cacheControl: '86400',      // one day
                    contentType: rip.fileType
                    
                });
    
            // upload original image
            const { data: originImageData } = await supabase.storage
            .from(`esm-bnb-images/${homeId}`)
            .upload(`${fileName}`, originArrayBuffer,
                {
                    cacheControl: '86400',      // one day
                    contentType: rip.fileType
                    
                });
                
            // save images paths
            homeImages.push({ thumbnailImagePath: thumbImageData ? thumbImageData.path : '', 
                    originalImagePath: originImageData ? originImageData.path : '' });
    
            stringifiedHomeImages = JSON.stringify(homeImages);
            console.log(stringifiedHomeImages);
        }));

        let logObj: ILogObject = {
            level: ELogLevel.Info,
            message: `New Home Listing images & thumbnails uploaded.`,
            metaData: {
                service: "ESM-bnb-14",
                module: "api/createHome/addHomeDescription",
                category: "API Call",
            }};
        Logger.log(logObj);
    
        await db.update(Homes)
            .set({
                title: title,
                description: description,
                price: parseFloat(price as string),
                guests: guestsCount,
                bedrooms: roomsCount,
                bathrooms: bathroomsCount,
                photo: stringifiedHomeImages, //imageData?.path,
                addedDescription: true,
                facilities: selectedFacilities
            })
            .where(eq(Homes.id, homeId));

        logObj = {
            level: ELogLevel.Info,
            message: `New Home Listing description updated.`,
            metaData: {
                service: "ESM-bnb-14",
                module: "api/createHome/addHomeDescription",
                category: "API Call",
            }};
        Logger.log(logObj);
    
        // console.log(data);
    
        return redirect(`/create/${homeId}/addressEx`);

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