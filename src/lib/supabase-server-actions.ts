// src/lib/supabase-server-actions.ts
import { supabaseAdmin } from "./supabase-server";
import type { Database } from "./types"; // si tu as un type Database

async function getNextWorkshopId() {
  const { data, error } = await supabaseAdmin
    .from("ateliers")
    .select("id")
    .order("id", { ascending: false })
    .limit(1)
    .single();

  if (error) throw error;
  return (data?.id || 0) + 1;
}

export async function createWorkshopServer(payload: Partial<any>) {
  const { data, error } = await supabaseAdmin
    .from("ateliers")
    .insert(payload)
    .select()
    .single();

  if (error?.code === "23505" && String(error.message).includes("ateliers_pkey")) {
    const { data: retryData, error: retryError } = await supabaseAdmin
      .from("ateliers")
      .insert({
        ...payload,
        id: await getNextWorkshopId(),
      })
      .select()
      .single();

    if (retryError) throw retryError;
    return retryData;
  }

  if (error) throw error;
  return data;
}

export async function updateWorkshopServer(id: number, updates: Partial<any>) {
  const { data, error } = await supabaseAdmin
    .from("ateliers")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteWorkshopServer(id: number) {
  const { data, error } = await supabaseAdmin
    .from("ateliers")
    .delete()
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function duplicateWorkshopServer(id: number) {
  // Récupère l'original
  const { data: original, error: fetchErr } = await supabaseAdmin
    .from("ateliers")
    .select("*")
    .eq("id", id)
    .single();
  if (fetchErr) throw fetchErr;
  const { id: _, created_at, updated_at, ...rest } = original;
  const timestamp = Date.now().toString().slice(-4);
  const copy = {
    ...rest,
    id: await getNextWorkshopId(),
    titre: `${rest.titre} (Copie)`,
    slug: `${rest.slug}-copy-${timestamp}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  const { data, error } = await supabaseAdmin
    .from("ateliers")
    .insert(copy)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * SERVER-SIDE RESERVATION FUNCTIONS
 * Use supabaseAdmin to bypass RLS policies
 */

export async function createReservationServer(payload: {
  atelier_id: number;
  email: string;
  nom: string;
  etablissement?: string | null;
  adresse?: string | null;
  participants_count: number;
  date_atelier: string;
  status?: string;
}) {
  const { data, error } = await supabaseAdmin
    .from("reservations")
    .insert({
      ...payload,
      status: payload.status || "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating reservation on server:", error);
    throw error;
  }

  return data;
}

export async function getReservationByIdServer(id: number) {
  const { data, error } = await supabaseAdmin
    .from("reservations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching reservation:", error);
    throw error;
  }

  return data;
}

export async function updateReservationStatusServer(
  id: number,
  status: "pending" | "confirmed" | "paid" | "completed" | "cancelled",
) {
  const { data, error } = await supabaseAdmin
    .from("reservations")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating reservation status:", error);
    throw error;
  }

  return data;
}
