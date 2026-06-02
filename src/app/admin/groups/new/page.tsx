'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GroupForm } from '@/components/groups/GroupForm';
import { createGroup } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NewGroupPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await createGroup(data);
      router.push('/admin/groups');
      router.refresh();
    } catch (error) {
      console.error('Failed to create group:', error);
      alert('Erreur lors de la création du groupe. Vérifiez les permissions (RLS).');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/groups">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Nouveau Groupe</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Détails du groupe</CardTitle>
        </CardHeader>
        <CardContent>
          <GroupForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </CardContent>
      </Card>
    </div>
  );
}
