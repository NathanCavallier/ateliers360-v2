// src/app/api/dashboard/ateliers/[id]/reservations/route.ts
// Récupère toutes les réservations pour un atelier
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
    try {
        const { id } = await params;
        const atelierIdNum = Number(id);

        if (Number.isNaN(atelierIdNum)) {
            return NextResponse.json({ error: "Invalid id" }, { status: 400 });
        }

        const { data, error } = await supabaseAdmin
            .from("reservations")
            .select("*")
            .eq("atelier_id", atelierIdNum);

        if (error) {
            console.error("Error fetching reservations:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data || []);
    } catch (err) {
        console.error(
            "GET /api/dashboard/ateliers/[id]/reservations error:",
            err,
        );
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
