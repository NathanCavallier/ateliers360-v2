import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import ChildConsentForm from '@/components/family/ChildConsentForm';

export const metadata = {
  title: 'Autorisation enfant - Ateliers 360',
};

interface Props {
  params: Promise<{
    locale: string;
    childId: string;
  }>;
}

export default async function ChildAuthorizationPage({ params }: Props) {
  const { locale, childId } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  if (!user) {
    redirect(`/${locale}/login`);
  }

  const { data: child, error: childError } = await supabase
    .from('children')
    .select(
      'id, family_id, first_name, last_name, consent_pdf_path, updated_at'
    )
    .eq('id', childId)
    .single();

  if (childError || !child || child.family_id !== user?.id) {
    redirect(`/${locale}/famille`);
  }

  const { data: authorizations } = await supabase
    .from('authorizations')
    .select('consent, granted')
    .eq('child_id', childId);

  const initialConsents = (authorizations || []).map((item: any) => ({
    consent: item.consent,
    granted: item.granted,
  }));

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Gestion famille
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Autorisation pour {child.first_name}{' '}
            {child.last_name ? child.last_name : ''}
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Définissez les autorisations RGPD et consentements pour cet enfant.
          </p>
        </div>
      </div>

      <ChildConsentForm
        childId={child.id}
        childName={`${child.first_name} ${child.last_name || ''}`.trim()}
        initialConsents={initialConsents}
        consentPdfPath={child.consent_pdf_path ?? undefined}
        pdfGeneratedAt={child.updated_at ?? undefined}
      />
    </div>
  );
}
