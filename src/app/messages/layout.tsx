import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import ChatBlock from "./ChatBlock";
import { ReactNode } from "react";

export default async function MyHomesLayout({
    children,
    }: Readonly<{
        children: ReactNode
}>) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    // if(!user) return redirect("/");
    if(!user || !user.id) redirect("api/auth/login?");
    
    return (
        <div>
            <section className='container mx-auto px-5 lg:px-10 mt-10 mb-10'>
                <h2 className='text-3xl font-semibold tracking-tight text-primary'>My Messages</h2>                
                {children}
                <ChatBlock userId={user.id} />
            </section>
        </div>
    )
}