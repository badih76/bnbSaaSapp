import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

import DashboardAccordion from '@/app/my-components/DashboardAccordion';

async function Dashboard() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    // const accessToken = await getAccessToken();
    
    // // if(!user) return redirect("/");
    if(!user || !user.id) redirect("api/auth/login?");
    
    return (
        <>
            <DashboardAccordion />
        </>
    )
}

export default Dashboard