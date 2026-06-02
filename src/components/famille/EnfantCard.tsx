import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AllergyBadges from './AllergyBadges';

interface Props {
  child: any;
  locale?: string;
  consentsCount?: number;
  grantedCount?: number;
}

export default function EnfantCard({
  child,
  locale = 'fr',
  consentsCount = 0,
  grantedCount = 0,
}: Props) {
  const t = useTranslations('FamilyPage');
  const birthDate = child.birthdate || child.birth_date || null;
  const profileCompleted = Boolean(child.first_name && birthDate);
  const healthCompleted = Boolean(
    child.emergency_contact_name &&
    child.emergency_contact_phone &&
    child.doctor_name &&
    (child.allergies?.length || child.other_allergies)
  );
  const consentCompleted = consentsCount > 0;
  const partialConsent = consentsCount > 0 && grantedCount < consentsCount;

  return (
    <Card className="rounded-xl border bg-card p-6 shadow-sm">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-lg">
              {child.first_name} {child.last_name || ''}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              {birthDate
                ? t('born_on', {
                    date: new Intl.DateTimeFormat(locale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }).format(new Date(birthDate)),
                  })
                : t('birthdate_missing')}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Link href={`/${locale}/famille/enfants/${child.id}/autorisation`}>
              <Button variant="ghost">{t('button_authorizations')}</Button>
            </Link>
            <Link href={`/${locale}/famille/enfants/${child.id}/edit`}>
              <Button variant="outline">{t('button_edit')}</Button>
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="mt-2 space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant={profileCompleted ? 'default' : 'outline'}>
            {profileCompleted ? t('profile_complete') : t('profile_incomplete')}
          </Badge>
          <Badge variant={healthCompleted ? 'secondary' : 'outline'}>
            {healthCompleted ? t('health_complete') : t('health_incomplete')}
          </Badge>
          <Badge
            variant={
              consentCompleted
                ? partialConsent
                  ? 'secondary'
                  : 'default'
                : 'destructive'
            }
          >
            {consentCompleted
              ? partialConsent
                ? t('consent_partial', {
                    granted: grantedCount,
                    total: consentsCount,
                  })
                : t('consent_all', { count: consentsCount })
              : t('consent_none')}
          </Badge>
          <Badge variant={child.pai_required ? 'destructive' : 'secondary'}>
            {child.pai_required ? t('pai_required') : t('pai_not_required')}
          </Badge>
        </div>

        <div>
          <h3 className="text-sm font-medium">Allergies</h3>
          <div className="mt-2">
            <AllergyBadges
              allergies={child.allergies}
              otherAllergies={child.other_allergies}
            />
          </div>
        </div>

        {child.notes && (
          <div>
            <h3 className="text-sm font-medium">Notes</h3>
            <div className="mt-2 text-sm text-muted-foreground">
              {child.notes}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
