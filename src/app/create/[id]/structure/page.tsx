'use client'

import { createCategory, log } from "@/app/actions/actions";
import CreateScreenBottomBar from "@/app/my-components/CreateScreenBottomBar";
import SelectCategory from "@/app/my-components/SelecteCategory";
import { ELogLevel, ILogObject } from "@/loggerServices/loggerInterfaces";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { redirect } from "next/navigation";
import { useState } from "react";

const useAPI = process.env.USE_API === "1" ? true : false;

export default function StructureRoute({ params }: { params: { id: string } } ) {
    const { getUser } = useKindeBrowserClient();
    let user: KindeUser<Record<string, string>> | null = null

    try {
        user = getUser();
        if(!user || !user.id) redirect("api/auth/login?");

    } catch(ex) {
        console.log('ERROR: ', ex);
        
        const logObj: ILogObject = {
            level: ELogLevel.Error,
            message: `Error: ${(ex as Error).message}`,
            metaData: {
                service: "ESM-bnb-14",
                module: "New Home Listing Creation - structure",
                category: "Home Listing",
                stackdump: (ex as Error).stack,
        },
        };
        log(logObj);
    }

    const [ enableButton, setEnableButton ] = useState(false);

    return (
        <>
            <div className="w-3/5 mx-auto">
                <h2 className="text-xl font-semibold tracking-tight transition-colors text-primary lg:text-3xl">
                    Which of these best describes your home?
                </h2>
            </div>

            <form action={useAPI ? "/api/createHome/addHomeCategory" : createCategory} method="POST">
                <input type="hidden" name="homeId" value={params.id} />
                <SelectCategory  setEnabled={setEnableButton} />

                <CreateScreenBottomBar homeId={params.id} userId={user?.id} enabled={enableButton} />
            </form>
        </>
    )
}