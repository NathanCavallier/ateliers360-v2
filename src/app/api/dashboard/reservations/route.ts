// src/app/api/dashboard/reservations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const status = searchParams.get("status");
        const limit = searchParams.get("limit")
            ? parseInt(searchParams.get("limit")!)
            : 100;
        const offset = searchParams.get("offset")
            ? parseInt(searchParams.get("offset")!)
            : 0;

        // Récupérer les réservations avec filtrage optionnel
        let query = supabaseAdmin
            .from("reservations")
            .select("*, ateliers(id, titre, slug, tarif_eur, categorie, type)");

        if (status) {
            query = query.eq("status", status);
        }

        const { data, error, count } = await query
            .order("created_at", { ascending: false })
            .range(offset, offset + limit - 1);

        if (error) {
            console.error("Error fetching reservations:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            data,
            count,
            total: count,
        });
    } catch (err) {
        console.error("GET /api/dashboard/reservations error:", err);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json(
                { error: "Missing id or status" },
                { status: 400 },
            );
        }

        if (
            !["pending", "confirmed", "paid", "completed", "cancelled"]
                .includes(status)
        ) {
            return NextResponse.json(
                { error: "Invalid status" },
                { status: 400 },
            );
        }

        const { data, error } = await supabaseAdmin
            .from("reservations")
            .update({
                status,
                updated_at: new Date().toISOString(),
            })
            .eq("id", id)
            .select("*, ateliers(id, titre)")
            .single();

        if (error) {
            console.error("Error updating reservation:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ ok: true, data });
    } catch (err) {
        console.error("PATCH /api/dashboard/reservations error:", err);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json(
                { error: "Missing id" },
                { status: 400 },
            );
        }

        const { error } = await supabaseAdmin
            .from("reservations")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Error deleting reservation:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("DELETE /api/dashboard/reservations error:", err);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
