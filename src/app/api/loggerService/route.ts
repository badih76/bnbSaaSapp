import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache'
import { drizzle } from "drizzle-orm/mysql2";
import { Logger } from "@/loggerServices/logger";
import { Logs } from "@/drizzle/schema";
import { ELogLevel, ILogObject } from "@/loggerServices/loggerInterfaces";

const db = drizzle({ connection: { uri: process.env.DATABASE_URL }});

export async function POST(req: NextRequest) {
    noStore();

    console.log('Im in loggerService API - POST')

    const r = await req.json();
    console.log(r);
    try {
        await db.insert(Logs).values({
            level: r.level,
            message: r.message,
            dateTimeStamp: new Date(r.timestamp),
            component: r.module ?? '',
            moreinfo: r.moreinfo ?? '',
            stackdump: r.stackdump ?? '',
            category: r.category ?? ''
        })

    } catch(ex) {
        console.log('Error: ', (ex as Error).message);
        const logObj: ILogObject = {
            level: ELogLevel.Error,
            message: `Error: ${(ex as Error).message}`,
            metaData: {
              service: "ESM-bnb-14",
              module: "Server Actions - createCategory",
              category: "Home Details",
              stackdump: (ex as Error).stack,
            },
          };
          Logger.log(logObj);
    }

    return NextResponse.json({
        message: 'Testing'
    }, { status: 200 });
}
