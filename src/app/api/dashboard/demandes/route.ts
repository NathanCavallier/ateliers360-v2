// src/app/api/dashboard/demandes/route.ts
// Gère TOUTES les demandes : contact, structure, entreprises, devis
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

// Types de demandes disponibles
const REQUEST_TYPES = [
    "contact_form",
    "structure_requests",
    "company_requests",
    "quotes",
] as const;
type RequestType = typeof REQUEST_TYPES[number];

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const type = searchParams.get("type") || "contact_form";
        const status = searchParams.get("status");
        const limit = searchParams.get("limit")
            ? parseInt(searchParams.get("limit")!)
            : 100;
        const offset = searchParams.get("offset")
            ? parseInt(searchParams.get("offset")!)
            : 0;

        // Valider le type
        if (!REQUEST_TYPES.includes(type as RequestType)) {
            return NextResponse.json(
                {
                    error: `Invalid type. Must be one of: ${
                        REQUEST_TYPES.join(", ")
                    }`,
                },
                { status: 400 },
            );
        }

        let query = supabaseAdmin.from(type as RequestType).select("*");

        if (status) {
            query = query.eq("status", status);
        }

        const { data, error, count } = await query
            .order("created_at", { ascending: false })
            .range(offset, offset + limit - 1);

        if (error) {
            console.error(`Error fetching ${type}:`, error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            type,
            data,
            count,
            total: count,
        });
    } catch (err) {
        console.error("GET /api/dashboard/demandes error:", err);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
