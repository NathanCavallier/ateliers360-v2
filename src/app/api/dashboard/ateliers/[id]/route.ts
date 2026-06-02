// src/app/api/ateliers/[id]/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server"; // ou tes helpers supabase
import { z } from "zod";

const workshopPatchSchema = z.object({
  titre: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  objectifs: z.array(z.string()).optional(),
  public_cible: z.string().optional(),
  duree_heures: z.number().optional(),
  tarif_eur: z.number().optional(),
  materiel: z.string().optional().nullable(),
  categorie: z.string().optional().nullable(),
  type: z.enum(["workshop", "module", "pack"]).optional().nullable(),
  sequence_order: z.number().optional().nullable(),
  tags: z.array(z.string()).optional().nullable(),
  image_url: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  shortdescription: z.string().optional().nullable(),
  longdescription: z.string().optional().nullable(),
  learningobjectives: z.array(z.string()).optional().nullable(),
  targetaudience: z.string().optional().nullable(),
  agegroup: z.string().optional().nullable(),
  duration: z.string().optional().nullable(),
  price: z.number().optional().nullable(),
  materials: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  categorycolor: z.string().optional().nullable(),
  discipline: z.string().optional().nullable(),
  format: z.string().optional().nullable(),
});

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(req: Request, { params }: RouteContext) {
  try {
    const { id: rawId } = await params;
    const id = Number(rawId);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("ateliers")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("GET atelier error:", error);
      return NextResponse.json({ error: error.message || "Not found" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error("GET atelier unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    const { id: rawId } = await params;
    const id = Number(rawId);
    if (Number.isNaN(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const body = await req.json();
    const updates = workshopPatchSchema.parse(body);

    const { data, error } = await supabaseAdmin
      .from("ateliers")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("PATCH atelier error:", error);
      return NextResponse.json({ error: error.message || "Update failed" }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("PATCH atelier unexpected:", err);
    return NextResponse.json({ error: err.message || "Invalid data" }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: RouteContext) {
  try {
    const { id: rawId } = await params;
    const id = Number(rawId);
    if (Number.isNaN(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const { data, error } = await supabaseAdmin
      .from("ateliers")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("DELETE atelier error:", error);
      return NextResponse.json({ error: error.message || "Delete failed" }, { status: 500 });
    }
    return NextResponse.json({ ok: true, deleted: data });
  } catch (err) {
    console.error("DELETE atelier unexpected:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
