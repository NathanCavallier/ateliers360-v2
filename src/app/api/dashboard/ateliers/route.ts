// src/app/api/dashboard/ateliers/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import {
    createWorkshopServer,
    duplicateWorkshopServer,
} from "@/lib/supabase-server-actions";
import { z } from "zod";

const workshopPayloadSchema = z.object({
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

export async function GET(req: Request) {
    const url = new URL(req.url);
    const idQuery = url.searchParams.get("id");
    try {
        if (idQuery) {
            const id = Number(idQuery);
            if (Number.isNaN(id)) {
                return NextResponse.json({ error: "Invalid id" }, { status: 400 });
            }
            const { data, error } = await supabaseAdmin
                .from("ateliers")
                .select("*")
                .eq("id", id)
                .single();
            if (error) {
                console.error("GET atelier by id error:", error);
                return NextResponse.json({ error: error.message || "Not found" }, { status: 404 });
            }
            return NextResponse.json(data);
        }
        const { data, error } = await supabaseAdmin.from("ateliers").select("*")
            .order("created_at", { ascending: false });
        if (error) throw error;
        return NextResponse.json(data);
    } catch (err: any) {
        console.error("GET /api/dashboard/ateliers error:", err);
        return NextResponse.json({ error: err.message || "Server error" }, {
            status: 500,
        });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        // si action=duplicate, déléguer
        if (body?.action === "duplicate") {
            const schema = z.object({ id: z.number() });
            const { id } = schema.parse(body);
            const duplicated = await duplicateWorkshopServer(id);
            return NextResponse.json(duplicated, { status: 201 });
        }

        // création normale
        const payload = workshopPayloadSchema.extend({
            titre: z.string(),
            slug: z.string(),
        }).parse(body);
        const created = await createWorkshopServer(payload);
        return NextResponse.json(created, { status: 201 });
    } catch (err: any) {
        console.error("POST /api/dashboard/ateliers error:", err);
        return NextResponse.json({ error: err.message || "Invalid data" }, {
            status: 400,
        });
    }
}
