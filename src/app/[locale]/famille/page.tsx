import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { createClient } from '@/utils/supabase/server';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import EnfantCard from '@/components/famille/EnfantCard';

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: { params: Props['params'] }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'FamilyPage' });

  return {
    title: t('dashboard_title'),
  };
}

export default async function FamillePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'FamilyPage' });
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  if (!user) {
    redirect(`/${locale}/login`);
  }

  const { data: children } = await supabase
    .from('children')
    .select('*')
    .eq('family_id', user!.id)
    .order('created_at', { ascending: false });

  const childRows = children || [];
  const childIds = childRows.map((child: any) => child.id);

  const { data: authorizations } = childIds.length
    ? await supabase
        .from('authorizations')
        .select('child_id, consent, granted, granted_at')
        .in('child_id', childIds)
    : { data: [] };

  const authorizationsByChild = (authorizations || []).reduce(
    (acc: Record<string, any[]>, authorization: any) => {
      if (!authorization.child_id) return acc;
      acc[authorization.child_id] = [
        ...(acc[authorization.child_id] || []),
        authorization,
      ];
      return acc;
    },
    {}
  );

  const healthAlerts = childRows.filter((child: any) => {
    const hasAllergyInfo = Array.isArray(child.allergies)
      ? child.allergies.filter(Boolean).length > 0
      : false;
    return (
      !child.emergency_contact_name ||
      !child.emergency_contact_phone ||
      !child.doctor_name ||
      (!hasAllergyInfo && !child.other_allergies)
    );
  });

  const consentAlerts = childRows.filter((child: any) => {
    const consents = authorizationsByChild[child.id] || [];
    return consents.filter((item: any) => item.granted).length === 0;
  });

  const firstHealthChild = healthAlerts[0];
  const firstConsentChild = consentAlerts[0];

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <section className="mb-10 rounded-[2rem] bg-slate-950 px-8 py-10 text-white shadow-xl sm:px-12 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr] lg:items-end">
          <div>
            <Badge className="mb-4 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              {t('badge')}
            </Badge>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">
              {t('dashboard_title')}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              {t('dashboard_heading')}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
              {t('dashboard_subtitle')}
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-500/20 bg-slate-900 p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">
              {t('dashboard_stats_label')}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-950/80 p-5 text-center">
                <p className="text-3xl font-semibold text-white">{childRows.length}</p>
                <p className="mt-2 text-sm text-slate-400">
                  {t('dashboard_stat_children')}
                </p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-5 text-center">
                <p className="text-3xl font-semibold text-white">
                  {healthAlerts.length}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  {t('dashboard_stat_health_alerts')}
                </p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-5 text-center">
                <p className="text-3xl font-semibold text-white">
                  {consentAlerts.length}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  {t('dashboard_stat_consent_alerts')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            {t('dashboard_section_label')}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            {t('dashboard_children_section')}
          </h2>
        </div>
        <Button size="lg" asChild>
          <Link href={`/${locale}/famille/enfants/nouveau`}>
            {t('dashboard_add_child')}
          </Link>
        </Button>
      </div>

      <div className="mb-6 space-y-4">
        {healthAlerts.length > 0 && (
          <Alert variant="destructive">
            <AlertTitle>{t('dashboard_alert_health_title')}</AlertTitle>
            <AlertDescription>
              {healthAlerts.length === 1 ? (
                t('dashboard_alert_health_single', {
                  name: firstHealthChild.first_name,
                })
              ) : (
                t('dashboard_alert_health_multi', {
                  count: healthAlerts.length,
                })
              )}
            </AlertDescription>
            {firstHealthChild && (
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" asChild>
                  <Link href={`/${locale}/famille/enfants/${firstHealthChild.id}/edit`}>
                    {t('dashboard_alert_health_action')}
                  </Link>
                </Button>
              </div>
            )}
          </Alert>
        )}

        {consentAlerts.length > 0 && (
          <Alert variant="destructive">
            <AlertTitle>{t('dashboard_alert_consent_title')}</AlertTitle>
            <AlertDescription>
              {consentAlerts.length === 1 ? (
                t('dashboard_alert_consent_single', {
                  name: firstConsentChild.first_name,
                })
              ) : (
                t('dashboard_alert_consent_multi', {
                  count: consentAlerts.length,
                })
              )}
            </AlertDescription>
            {firstConsentChild && (
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" asChild>
                  <Link
                    href={`/${locale}/famille/enfants/${firstConsentChild.id}/autorisation`}
                  >
                    {t('dashboard_alert_consent_action')}
                  </Link>
                </Button>
              </div>
            )}
          </Alert>
        )}
      </div>

      <section className="space-y-6">
        {childRows.length === 0 ? (
          <div className="rounded-3xl border border-border/70 bg-card p-8 text-center">
            <p className="text-xl font-semibold text-slate-900">
              {t('dashboard_no_children')}
            </p>
            <p className="mt-3 text-sm text-muted-foreground max-w-2xl mx-auto">
              {t('dashboard_no_children_help')}
            </p>
            <div className="mt-6 flex justify-center">
              <Button asChild>
                <Link href={`/${locale}/famille/enfants/nouveau`}>
                  {t('family_add_child_cta')}
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {childRows.map((child: any) => {
              const consents = authorizationsByChild[child.id] || [];
              const grantedCount = consents.filter(
                (item: any) => item.granted
              ).length;

              return (
                <EnfantCard
                  key={child.id}
                  child={child}
                  locale={locale}
                  consentsCount={consents.length}
                  grantedCount={grantedCount}
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
