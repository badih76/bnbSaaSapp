import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { createBnbSiteHome } from "@/app/actions/actions";
import UserIcon from "../UserIcon";
import { redirect } from "next/navigation";
import { ELogLevel, ILogObject } from "@/loggerServices/loggerInterfaces";
import { Logger } from "@/loggerServices/logger";

export async function UserNave() {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        const userPicture = user?.picture ?? "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    
        const createHomewithId = createBnbSiteHome.bind(null, {
            userId: user?.id as string
        });
    
        const useAPI = process.env.USE_API === "1" ? true : false;
    
        return (
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <UserIcon userPicture={userPicture} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[175px] text-primary font-medium">
                    { user ? 
                        <>
                            <DropdownMenuItem asChild>
                                {/* <form action={createHomewithId} className="w-full"> */}
                                <form 
                                    action={useAPI ? "/api/createHome/addHomeData" : createHomewithId} method="POST" className="w-full">
                                    <button type="submit" className="w-full text-start">
                                        ESM-bnb Your Home
                                    </button>
                                </form>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="mx-1 border-2" />
                            <DropdownMenuItem asChild>
                                <Link href="/messages" className="w-full">
                                    My Messages
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/myHomes" className="w-full">
                                    My Listings
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/favorites" className="w-full">
                                    My Favorites
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/reservations" className="w-full">
                                    My Reservations
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="mx-1 border-2" />
                            <DropdownMenuItem asChild>
                                <LogoutLink className="w-full">Logout</LogoutLink>
                            </DropdownMenuItem>
                        </>
                        :
                        <>
                            <DropdownMenuItem asChild>
                                <RegisterLink className="w-full">Register</RegisterLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <LoginLink className="w-full">Login</LoginLink>
                            </DropdownMenuItem>
                        </>
                    }
                    
                </DropdownMenuContent>
            </DropdownMenu>
        )

    } catch(ex) {
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
        Logger.log(logObj);
        return redirect("/Error");
    }
}