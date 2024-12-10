import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache'

export async function GET() {
    noStore();

    const { getUser, getIdToken, getAccessToken } = getKindeServerSession();
    const user = await getUser();
    const token = await getIdToken();
    const accessToken = await getAccessToken()

    console.log(user)

    return NextResponse.json({
        user: user,
        token: token,
        accessToken: accessToken
    })
}