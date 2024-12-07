import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";

import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { createBnbSiteHome } from "@/app/actions/actions";
import UserIcon from "../UserIcon";

export async function UserNave() {
    const { getUser, getAccessToken } = getKindeServerSession();
    const user = await getUser();
    const token = user ? await getAccessToken() : null;
    const userPicture = user?.picture ?? "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    console.log("pricture: ", user ? user.picture : null);
    console.log("token: ", token);

    const createHomewithId = createBnbSiteHome.bind(null, {
        userId: user?.id as string
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {/* <div className="rounded-full border px-2 py-2 lg:px-4 lg-py-2 flex items-center gap-x-3">
                    <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />

                    <img src={ user?.picture ?? "https://cdn-icons-png.flaticon.com/512/149/149071.png" }
                        alt="User Image Icon"
                        className="rounded-full h8 w-8 hidden lg:block" />
                </div> */}
                <UserIcon userPicture={userPicture} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px">
                { user ? 
                    <>
                        <DropdownMenuItem>
                            <form action={createHomewithId} className="w-full">
                                <button type="submit" className="w-full text-start">
                                    ESM-bnb Your Home
                                </button>
                            </form>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/myHomes" className="w-full">
                                My Listings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/favorites" className="w-full">
                                My Favorites
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/reservations" className="w-full">
                                My Reservations
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="mx-1 border-2" />
                        <DropdownMenuItem>
                            <LogoutLink className="w-full">Logout</LogoutLink>
                        </DropdownMenuItem>
                    </>
                    :
                    <>
                        <DropdownMenuItem>
                            <RegisterLink className="w-full">Register</RegisterLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LoginLink className="w-full">Login</LoginLink>
                        </DropdownMenuItem>
                    </>
                }
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}