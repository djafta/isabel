import { NextRequest } from "next/server";

const AUTH_CODE = String(process.env.AUTH_CODE);

export async function POST(request: NextRequest) {
    const { code } = await request.json();

    if (code === AUTH_CODE) {
        return Response.json({ ok: true });
    } else {
        return Response.json({ ok: false }, {
            status: 401
        })
    }
}
