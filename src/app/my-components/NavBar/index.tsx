import Image from "next/image";
import Link from "next/link";
import DeskTopLogo from "@/../public/Logo3.png";
// import MobileTopLogo from "@/../public/airbnb-mobile.webp";
import { UserNave } from "../UserNav";
import SearchModalComponent from "../SearchComponent";

export function NavBar() {
    return (
        <nav className="w-full border-b">
            <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
                <Link href={"/"}>
                    <Image src={DeskTopLogo} 
                        alt="Desktop Logo" 
                        className="w-20 h-16 hidden lg:block" />

                    <Image src={DeskTopLogo} 
                        alt="Mobile Logo" 
                        className="block lg:hidden w-12" />
                </Link>
                
                <SearchModalComponent />

                <UserNave />
            </div>
        </nav>
    )
}