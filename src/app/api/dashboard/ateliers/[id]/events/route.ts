// src/app/api/dashboard/ateliers/[id]/events/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const atelierId = Number(id);

    if (Number.isNaN(atelierId)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("events")
      .select("*");

    if (error) {
      console.error("GET atelier events error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const events = (data || []).filter((event: any) => {
      const linkedWorkshopId =
        event.atelier_id ??
        event.workshop_id ??
        event.atelierId ??
        event.workshopId ??
        null;

      return Number(linkedWorkshopId) === atelierId;
    });

    return NextResponse.json(events);
  } catch (err) {
    console.error("GET /api/dashboard/ateliers/[id]/events error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
