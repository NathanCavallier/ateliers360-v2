'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { GroupForm } from '@/components/groups/GroupForm';
import { getGroupById, updateGroup } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Database } from '@/lib/types';

export default function EditGroupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [group, setGroup] = useState<Database['public']['Tables']['groups']['Row'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadGroup() {
      const data = await getGroupById(Number(id));
      if (data) {
        setGroup(data);
      }
      setLoading(false);
    }
    loadGroup();
  }, [id]);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await updateGroup(Number(id), data);
      router.push('/admin/groups');
      router.refresh();
    } catch (error) {
      console.error('Failed to update group:', error);
      alert('Erreur lors de la mise à jour.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (!group) return <div>Groupe non trouvé.</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/admin/groups/${id}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Modifier le Groupe</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{group.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <GroupForm initialData={group} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </CardContent>
      </Card>
    </div>
  );
}
