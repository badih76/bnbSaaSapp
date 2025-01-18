import { Homes, Reservations, Users as tblUsers } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { ELogLevel, ILogObject } from '@/loggerServices/loggerInterfaces';
import { Logger } from '@/loggerServices/logger';
import { db } from '@/drizzle';
import { unstable_noStore as noStore } from 'next/cache'


export const getHomeData = async (homeId: string) => {
    noStore();

    try {

        const data = await db.select()
            .from(Homes)
            .leftJoin(Reservations, eq(Homes.id, Reservations.homeId))
            .innerJoin(tblUsers, eq(Homes.userId, tblUsers.id))
            .where(eq(Homes.id, homeId))
    
        const logObj: ILogObject = {
            level: ELogLevel.Info,
            message: `Home details fetched for homeId: ${homeId}.`,
            metaData: {
                service: "ESM-bnb-14",
                module: "Home Details Page",
                category: "Home Details",
            }};
        Logger.log(logObj);

        if(data.length > 0) {
            const home = data[0].homes;
            const user = data[0].users;
            const reservations: typeof Reservations.$inferInsert[] = [];
    
            data.map(d => {
                reservations.push(d.reservations!)
            })
    
            return { home, user, reservations }
        } else {
            
            return null;
        }

    } catch(ex) {
        const logObj: ILogObject = {
            level: ELogLevel.Error,
            message: `Error: ${(ex as Error).message}`,
            metaData: {
                service: "ESM-bnb-14",
                module: "Home Details Page",
                category: "Home Details",
                stackdump: (ex as Error).stack,
            }};
        Logger.log(logObj);

    }

}