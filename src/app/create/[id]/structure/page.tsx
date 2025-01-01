'use client'

import { createCategory, log } from "@/app/actions/actions";
import CreateScreenBottomBar from "@/app/my-components/CreateScreenBottomBar";
import SelectCategory from "@/app/my-components/SelecteCategory";
import { ELogLevel, ILogObject } from "@/loggerServices/loggerInterfaces";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { useState } from "react";
import StructurePageLoading from "./loading";

const useAPI = process.env.USE_API === "1" ? true : false;

export default function StructureRoute({ params }: { params: { id: string } } ) {

    const { isAuthenticated, user, isLoading
        // , getToken 
    } = useKindeBrowserClient();
    const [ enableButton, setEnableButton ] = useState(false);

    try {
        if(!isLoading) {
            if(isAuthenticated) {
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
            } else {
                if(!user || !user.id) return redirect("/api/auth/login?");

            }

        } else {
            return (
                <>
                    <StructurePageLoading />
                </>
            )

        }

    } catch(ex) {
        if(isRedirectError(ex)) throw ex;
        
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

    
}