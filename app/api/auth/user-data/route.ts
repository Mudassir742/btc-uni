import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"
import { unsealData } from "iron-session";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
    const cookieStore = req.cookies;
    const cookieName = process.env.SESSION_COOKIE_NAME as string;
    const found = cookieStore.get(cookieName);


    if (!found) {
        return NextResponse.json({ message: "No User Found!" }, {
            status: 400
        })
    }

    const { user } = await unsealData(found.value, {
        password: process.env.SECRET_COOKIE_PASSWORD as string,
    });

    return NextResponse.json(user)
}

// export const runtime = "edge"