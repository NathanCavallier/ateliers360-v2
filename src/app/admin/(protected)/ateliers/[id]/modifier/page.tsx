import { notFound, redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EditWorkshopForm } from '@/components/admin/EditWorkshopForm';
import { getAuthenticatedSupabase } from '@/utils/supabase/server';
import type { WorkshopDB } from '@/lib/types';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getWorkshop(id: number): Promise<WorkshopDB | null> {
  const cookieStore = await cookies();
  const { supabaseClient } = await getAuthenticatedSupabase(null, cookieStore);

  if (!supabaseClient) {
    console.error('Supabase server client not initialized');
    return null;
  }

  const { data, error } = await supabaseClient
    .from('ateliers')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export default async function EditWorkshopPage({ params }: PageProps) {
  const { id } = await params;
  const workshopId = parseInt(id);

  if (isNaN(workshopId)) {
    notFound();
  }

  const workshop = await getWorkshop(workshopId);

  if (!workshop) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/ateliers">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Modifier l&apos;atelier</h1>
          <p className="text-muted-foreground">
            Modifiez les informations de &quot;{workshop.titre}&quot;
          </p>
        </div>
      </div>

      {/* Form */}
      <EditWorkshopForm
        workshop={workshop}
        successUrl="/admin/ateliers"
        cancelUrl="/admin/ateliers"
      />
    </div>
  );
}
