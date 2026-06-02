// src/app/api/storage/signed-url/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export async function POST(req: Request) {
    try {
        const { path, expires = 60 * 60 } = await req.json(); // path: 'catalogues/file.pdf'
        if (!path) {
            return NextResponse.json({ error: "Missing path" }, {
                status: 400,
            });
        }

        const { data, error } = await supabaseAdmin.storage
            .from("catalogues") // nom du bucket
            .createSignedUrl(path, expires);

        if (error) {
            console.error("createSignedUrl error:", error);
            return NextResponse.json({ error: "Could not create signed url" }, {
                status: 500,
            });
        }

        return NextResponse.json({ url: data.signedUrl });
    } catch (err) {
        console.error("signed-url error:", err);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
