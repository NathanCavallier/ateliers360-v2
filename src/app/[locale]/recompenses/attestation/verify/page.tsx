import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import QRVerifier from '../../../../../components/rewards/QRVerifier';

type Props = { params: Promise<{ locale: string }> };

export default async function VerifyPage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="container py-12 px-4 lg:px-6">
      <div className="space-y-6 rounded-3xl border border-border bg-card p-8 shadow-sm">
        <div className="flex items-center gap-3 text-primary">
          <ShieldCheck className="h-5 w-5" />
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Vérification d’attestation
          </p>
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            Vérifiez une attestation ou un badge.
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Entrez le code QR ou le token unique reçu avec l’attestation pour confirmer la validité du document.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-background p-6">
          <QRVerifier />
        </div>
        <div className="pt-4">
          <Link
            href={`/${locale}/recompenses`}
            className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour à Récompenses
          </Link>
        </div>
      </div>
    </div>
  );
}
