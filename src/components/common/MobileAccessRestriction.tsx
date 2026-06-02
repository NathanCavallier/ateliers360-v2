'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Smartphone, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileAccessRestrictionProps {
  pageName?: string;
  message?: string;
}

export const MobileAccessRestriction = ({
  pageName = 'Cette page',
  message = 'est disponible uniquement sur ordinateur.'
}: MobileAccessRestrictionProps) => {
  const locale = useLocale();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12 text-center">
      <div className="rounded-2xl border border-amber-200/50 bg-gradient-to-br from-amber-50 to-orange-50 p-8 max-w-md mx-auto space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-amber-100 p-4">
            <Smartphone className="h-8 w-8 text-amber-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">
            Version Bureau
          </h2>
          <p className="text-slate-700">
            <span className="font-semibold">{pageName}</span> {message}
          </p>
        </div>

        <div className="rounded-lg bg-amber-100/50 border border-amber-200 p-4 text-sm text-slate-700">
          <p>
            Pour accéder à l'ensemble des fonctionnalités et de la plateforme, veuillez utiliser un ordinateur.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Button asChild variant="outline" className="w-full">
            <Link href={`/${locale}`} className="inline-flex items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour à l'accueil
            </Link>
          </Button>
          <p className="text-xs text-slate-500">
            La version mobile est limitée à l'information et la prise de contact.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileAccessRestriction;
