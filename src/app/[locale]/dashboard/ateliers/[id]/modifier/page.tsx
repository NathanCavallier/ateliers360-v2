// [locale]/dashboard/ateliers/[id]/modifier/page.tsx
// This server component fetches the workshop data and renders the edit form.
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EditWorkshopForm } from '@/components/admin/EditWorkshopForm';
import { supabaseAdmin } from '@/lib/supabase-server';
import type { WorkshopDB } from '@/lib/types';

type PageProps = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

async function getWorkshop(id: number): Promise<WorkshopDB | null> {
  const { data, error } = await supabaseAdmin
    .from('ateliers')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Failed to fetch workshop:', error);
    return null;
  }

  return data;
}

export default async function EditWorkshopPage({ params }: PageProps) {
  const { locale, id } = await params;
  const workshopId = Number(id);

  if (isNaN(workshopId)) {
    notFound();
  }

  const workshop = await getWorkshop(workshopId);

  if (!workshop) {
    notFound();
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Container (ajouter marge verticale) */}
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href={`/${locale}/dashboard/ateliers`}
          className="text-muted-foreground"
        >
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
        successUrl={`/${locale}/dashboard/ateliers`}
        cancelUrl={`/${locale}/dashboard/ateliers`}
      />
    </div>
  );
}
