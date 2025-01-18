'use client'

import { CreateDescription, log } from "@/app/actions/actions";
import Counter from "@/app/my-components/Counter";
import CreateScreenBottomBar from "@/app/my-components/CreateScreenBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SelectFacilities from "./facilities";
import ThumnailsComponent from "@/app/my-components/ThumbnailsComponent";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { redirect } from "next/navigation";
import { ELogLevel, ILogObject } from "@/loggerServices/loggerInterfaces";
import DescriptionPageLoading from "./loading";
import { isRedirectError } from "next/dist/client/components/redirect";
import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, 
    // DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { checkProfane } from "@/lib/utils";

const useAPI = process.env.USE_API === "1" ? true : false;

export default function Decription (
    {params}: {params: {id: string}}
) {
    const { isLoading, isAuthenticated, user
        // , getToken 
    } = useKindeBrowserClient();

    const refDescription = useRef<HTMLTextAreaElement>(null);
    const refTitle = useRef<HTMLInputElement>(null);

    const [ openProfaneWarning, setOpenProfaneWarning ] = useState<boolean>(false);

    try {
        if(!isLoading) {
            if(isAuthenticated) {
                return (
                    <>
                        <div className="w-full mx-auto">
                            <form action={useAPI ? "/api/createHome/addHomeDescription" : CreateDescription} 
                                className="w-full text-primary" method="POST"
                                encType={useAPI ? "multipart/form-data" : "application/x-www-form-urlencoded"}>
                            {/* <form action={CreateDescription} className="text-primary" method="POST"> */}
                                <input type="hidden" name="homeId" value={params.id} />
                                <div className="w-3/5 mx-auto">
                                    <h2 className="text-xl font-semibold text-primary tracking-tight transaction-colors lg:text-3xl">
                                        Please, describe your home as good as you can
                                    </h2>
                                    <div className="mx-auto w-full mt-10 flex flex-col gap-y-5 pb-16 ">
                                        <div className="flex flex-col gap-y-2">
                                            <Label>Title</Label>
                                            <Input name="title" ref={refTitle}
                                                onChange={(e) => checkProfane(e.currentTarget.value, setOpenProfaneWarning)}
                                                required 
                                                placeholder="Short and simple..."
                                            />
                                        </div>
                                        <div className="flex flex-col gap-y-2">
                                            <Label>Description</Label>
                                            <Textarea ref={refDescription}
                                                onChange={(e) => checkProfane(e.currentTarget.value, setOpenProfaneWarning)}
                                                name="description"
                                                required
                                                placeholder="Please describe your home..." 
                                            />
                                        </div>
                                        <div className="flex flex-col gap-y-2">
                                            <Label>Price</Label>
                                            <Input name="price" 
                                                type="number" min={10} step="0.01"
                                                required 
                                                placeholder="Price per night in USD..."
                                            />
                                        </div>
                                        <div className="flex flex-col gap-y-2">
                                            <Label>Image</Label>                           
                                            <ThumnailsComponent />
                                        </div>
                                        
                                        <Card>
                                            <CardHeader 
                                                className="flex flex-col gap-y-5">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <h3 className="underline font-medium">
                                                            Guests:</h3>
                                                        <p
                                                            className="hidden lg:block text-muted-forground text-sm">
                                                            How many guests for this property?</p>
                                                    </div>
                                                    <div>
                                                        <Counter name="guests" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <h3 className="underline font-medium">
                                                            Rooms:</h3>
                                                        <p
                                                            className="hidden lg:block text-muted-forground text-sm">
                                                            How many rooms in this property?</p>
                                                    </div>
                                                    <div>
                                                        <Counter name="rooms" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <h3 className="underline font-medium">
                                                            Bathrooms:</h3>
                                                        <p
                                                            className="hidden lg:block text-muted-forground text-sm">
                                                            How many bathrooms in this property?</p>
                                                    </div>
                                                    <div>
                                                        <Counter name="bathrooms" />
                                                    </div>
                                                </div>
                                            </CardHeader>
                                        </Card>
                                        <SelectFacilities />
                                    </div>
                                </div>
                            <CreateScreenBottomBar homeId={params.id} userId={user?.id} enabled={true} />
                            </form>
                        </div>
                        <Dialog open={openProfaneWarning} onOpenChange={setOpenProfaneWarning}>
                            {/* <DialogTrigger asChild>
                                <Button variant="outline">Edit Profile</Button>
                            </DialogTrigger> */}
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                <DialogTitle>Warning: Inappropriate Language Detected 🚫</DialogTitle>
                                    <DialogDescription>
                                        <>
                                            <p>Please note that the use of offensive or profane language is prohibited on this website.</p>
                                            <p>Your text will not be accepted until it is cleaned.</p>
                                            <p>Let&lsquos keep our community positive and respectful for everyone. Thank you for your understanding!</p>
                                        </>
                                    </DialogDescription>
                                </DialogHeader>                                
                                <DialogFooter>
                                    <Button type="button" onClick={() => setOpenProfaneWarning(false) }>Ok</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </>
                )

            } else {
                if(!user || !user.id) redirect("api/auth/login?");

            } 

        } else { 
            return (
                <div className="">
                    <DescriptionPageLoading />
                </div>
            )

        }

    } catch(ex) {
        if(isRedirectError(ex)) throw ex;
        else {
            const logObj: ILogObject = {
            level: ELogLevel.Error,
            message: `Error: ${(ex as Error).message}`,
            metaData: {
                service: "ESM-bnb-14",
                module: "New Home Listing Creation - description",
                category: "Home Listing",
                stackdump: (ex as Error).stack,
            },
            };
            log(logObj);

            return redirect("/Error");
        }
    }

    
}

