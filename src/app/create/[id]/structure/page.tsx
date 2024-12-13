'use client'

import { createCategory } from "@/app/actions/actions";
import CreateScreenBottomBar from "@/app/my-components/CreateScreenBottomBar";
import SelectCategory from "@/app/my-components/SelecteCategory";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useState } from "react";

const useAPI = process.env.USE_API === "1" ? true : false;

export default function StructureRoute({ params }: { params: { id: string } } ) {
    const { getUser } = useKindeBrowserClient();
    const user = getUser();

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