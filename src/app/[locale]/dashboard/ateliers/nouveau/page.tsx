'use client';

// [locale]/dashboard/ateliers/nouveau/page.tsx (création d'un nouvel atelier)
import { CreateWorkshopForm } from '@/components/admin/CreateWorkshopForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from "next-intl";

export default function CreateWorkshopPage() {
  const t = useTranslations('CreateWorkshopPage');
  const locale = useLocale();

  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function checkAuth() {
      if (!supabase) return;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push(`/${locale}/login`);
        return;
      }
      setUser(user);
    }

    checkAuth();
  }, [router, locale]);

  return (
    <div className="px-4 sm:px-6 lg:px-8"> {/* Container (ajouter marge horizontale) */}
      <div className="mb-6">
        <Link href={`/${locale}/dashboard/ateliers`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('back_to_workshops')}
          </Button>
        </Link>
      </div>

      <CreateWorkshopForm />
    </div>
  );
}
