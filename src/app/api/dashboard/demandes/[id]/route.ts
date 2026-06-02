// src/app/api/dashboard/demandes/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

const REQUEST_TYPES = [
    "contact_form",
    "structure_requests",
    "company_requests",
    "quotes",
] as const;
type RequestType = typeof REQUEST_TYPES[number];

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
    try {
        const { id } = await params;
        const type = request.nextUrl.searchParams.get("type") || "contact_form";

        if (!REQUEST_TYPES.includes(type as RequestType)) {
            return NextResponse.json(
                { error: "Invalid type" },
                { status: 400 },
            );
        }

        const { data, error } = await supabaseAdmin
            .from(type as RequestType)
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            console.error(`Error fetching ${type}:`, error);
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        return NextResponse.json({ type, data });
    } catch (err) {
        console.error("GET /api/dashboard/demandes/[id] error:", err);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { type, status, ...updates } = body;

        if (!type || !REQUEST_TYPES.includes(type as RequestType)) {
            return NextResponse.json(
                { error: "Invalid type" },
                { status: 400 },
            );
        }

        if (!status) {
            return NextResponse.json(
                { error: "Missing status" },
                { status: 400 },
            );
        }

        const { data, error } = await supabaseAdmin
            .from(type as RequestType)
            .update({
                status,
                updated_at: new Date().toISOString(),
                ...updates,
            })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            console.error(`Error updating ${type}:`, error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ ok: true, data });
    } catch (err) {
        console.error("PATCH /api/dashboard/demandes/[id] error:", err);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { type } = body;

        if (!type || !REQUEST_TYPES.includes(type as RequestType)) {
            return NextResponse.json(
                { error: "Invalid type" },
                { status: 400 },
            );
        }

        const { error } = await supabaseAdmin
            .from(type as RequestType)
            .delete()
            .eq("id", id);

        if (error) {
            console.error(`Error deleting ${type}:`, error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("DELETE /api/dashboard/demandes/[id] error:", err);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
