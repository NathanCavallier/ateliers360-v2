'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  GraduationCap,
  Loader2,
  MessageSquare,
  Plus,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { RightSidebar } from '@/components/dashboard/RightSidebar';
import { AccountType } from '@/types-accounts';
import {
  getDashboardIntroKey,
  getDashboardRole,
  getDashboardRoleFlags,
  getQuickLinksForRole,
  getRightSidebarActionsForRole,
  getStatsCardsForRole,
} from '@/lib/dashboardRoleConfig';

type UserProfile = {
  account_type?: AccountType | 'admin' | string | null;
  full_name?: string | null;
  is_verified?: boolean | null;
};

type ChildRecord = {
  id: string;
  first_name: string;
  last_name?: string | null;
  emergency_contact_name?: string | null;
  emergency_contact_phone?: string | null;
  doctor_name?: string | null;
  allergies?: string[] | null;
  other_allergies?: string | null;
};

type Reservation = {
  id: string | number;
  nom?: string;
  email?: string;
  participants_count?: number;
  status?: string;
  date_atelier?: string;
  ateliers?: any;
};

type DashboardStats = {
  totalReservations: number;
  pendingReservations: number;
  confirmedReservations: number;
  totalRevenue: number;
};

const ACCOUNT_TYPE_LABELS: Record<AccountType | 'admin', string> = {
  [AccountType.Family]: 'account_type.family',
  [AccountType.Establishment]: 'account_type.establishment',
  [AccountType.Center]: 'account_type.center',
  [AccountType.Animator]: 'account_type.animator',
  [AccountType.Learner]: 'account_type.learner',
  [AccountType.Student]: 'account_type.student',
  [AccountType.Other]: 'account_type.other',
  admin: 'account_type.admin',
};

const DEFAULT_STATS: DashboardStats = {
  totalReservations: 0,
  pendingReservations: 0,
  confirmedReservations: 0,
  totalRevenue: 0,
};

export default function DashboardPage() {
  const t = useTranslations('DashboardPage');
  const locale = useLocale();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  const profileType: AccountType | 'admin' | string | undefined =
    (profile?.account_type as AccountType | 'admin' | string | undefined) ??
    (user?.user_metadata as any)?.account_type;

  const dashboardRole = getDashboardRole(
    profileType,
    user?.user_metadata as any,
  );

  const roleFlags = getDashboardRoleFlags(dashboardRole);

  const accountTypeLabel = profileType
    ? t(
        ACCOUNT_TYPE_LABELS[
          profileType as keyof typeof ACCOUNT_TYPE_LABELS
        ] ?? (profileType === 'admin' ? 'account_type.admin' : String(profileType))
      )
    : null;

  const {
    isAdmin,
    isFamily,
    isLearnerOrStudent,
    isAnimator,
    isEstablishmentOrCenter,
    isEstablishment,
    isCenter,
  } = roleFlags;

  const canViewRewards = isFamily || isLearnerOrStudent;

  const quickLinks = getQuickLinksForRole(dashboardRole).map((link) => ({
    href: `/${locale}${link.href}`,
    title: t(link.label),
    description: t(link.description),
  }));

  const [stats, setStats] = useState({
    totalReservations: 0,
    pendingReservations: 0,
    confirmedReservations: 0,
    totalRevenue: 0,
  });

  const [badgeCount, setBadgeCount] = useState<number>(0);
  const [attestationCount, setAttestationCount] = useState<number>(0);
  const [projectCount, setProjectCount] = useState<number>(0);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [familyChildren, setFamilyChildren] = useState<any[]>([]);
  const [familyAlertCount, setFamilyAlertCount] = useState<number>(0);

  const dashboardIntro = t(getDashboardIntroKey(dashboardRole));

  const rightSidebarActions = getRightSidebarActionsForRole(dashboardRole).map(
    (action) => {
      const Icon = action.icon;
      return {
        label: t(action.label),
        href: `/${locale}${action.href}`,
        icon: <Icon className="w-4 h-4" />,
      };
    }
  );

  const statsCards = getStatsCardsForRole(dashboardRole, {
    sessions: sessions.length,
    stats,
    badgeCount,
    attestationCount,
    projectCount,
    childrenCount,
  });

  useEffect(() => {
    // Vérification de l'authentification
    async function loadData() {
      if (!supabase) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push(`/${locale}/login`);
        return;
      }
      setUser(user);

      const { data: profileData } = await supabase
        .from('profiles')
        .select('account_type, full_name, is_verified')
        .eq('id', user.id)
        .maybeSingle();
      setProfile(profileData || null);

      const isFamilyUser = profileData?.account_type === AccountType.Family;
      const isLearnerOrStudentUser =
        profileData?.account_type === AccountType.Learner ||
        profileData?.account_type === AccountType.Student;
      const isAnimatorOrAdminUser =
        profileData?.account_type === AccountType.Animator ||
        (user.user_metadata as any)?.role === 'admin' ||
        user.role === 'admin';
      const isEstablishmentOrCenterUser =
        profileData?.account_type === AccountType.Establishment ||
        profileData?.account_type === AccountType.Center;

      if (isFamilyUser) {
        try {
          const { data: childrenData } = await supabase
            .from<any, any>('children')
            .select(
              'id, first_name, last_name, emergency_contact_name, emergency_contact_phone, doctor_name, allergies, other_allergies'
            )
            .eq('family_id', user.id)
            .order('created_at', { ascending: false });

          const children = (childrenData as any[]) || [];
          setFamilyChildren(children);
          setChildrenCount(children.length);

          const childIds = children.map((child) => child.id).filter(Boolean);
          if (childIds.length) {
            const { data: authorizations } = await supabase
              .from<any, any>('authorizations')
              .select('child_id, granted')
              .in('child_id', childIds);

            const alertChildIds = new Set<string>();
            children.forEach((child) => {
              const hasAllergyInfo = Array.isArray(child.allergies)
                ? child.allergies.filter(Boolean).length > 0
                : false;
              if (
                !child.emergency_contact_name ||
                !child.emergency_contact_phone ||
                !child.doctor_name ||
                (!hasAllergyInfo && !child.other_allergies)
              ) {
                alertChildIds.add(child.id);
              }
            });

            const authRows = (authorizations as any[]) || [];
            childIds.forEach((childId) => {
              const grantedAuthorizations = authRows.filter(
                (item) => item.child_id === childId && item.granted
              );
              if (grantedAuthorizations.length === 0) {
                alertChildIds.add(childId);
              }
            });

            setFamilyAlertCount(alertChildIds.size);
          }
        } catch (err) {
          console.warn('Failed to load family data', err);
        }
      }

      try {
        const { data: membership, error } = await supabase
          .from('group_members')
          .select('*, groups(*)')
          .eq('user_id', user.id)
          .single();

        if (membership && (membership as any).groups) {
          const mem = membership as any;

          // Fetch sessions
          const { data: sessionsData } = await supabase
            .from('group_sessions')
            .select('*')
            .eq('group_id', mem.group_id)
            .gte('date_session', new Date().toISOString())
            .order('date_session', { ascending: true });
          setSessions(sessionsData || []);

          // Fetch reservations for the current group
          const { data: reservationsData } = await supabase
            .from('reservations')
            .select('*, ateliers(*)')
            .eq('group_id', mem.group_id)
            .order('date_atelier', { ascending: true });
          setReservations(reservationsData || []);

          // Charger les statistiques depuis les réservations du groupe
          const pending = (reservationsData || []).filter(
            (r: any) => r.status === 'pending'
          ).length;
          const confirmed = (reservationsData || []).filter(
            (r: any) => r.status === 'confirmed' || r.status === 'paid'
          ).length;
          const revenue = (reservationsData || [])
            .filter((r: any) => r.status === 'confirmed' || r.status === 'paid')
            .reduce(
              (sum: number, r: any) =>
                sum + (r.ateliers?.tarif_eur || 0) * r.participants_count,
              0
            );

          setStats({
            totalReservations: (reservationsData || []).length,
            pendingReservations: pending,
            confirmedReservations: confirmed,
            totalRevenue: revenue,
          });

        }

        try {
          const userId = user.id;
          const { data: badgeIssuances } = await supabase
            .from('badge_issuances')
            .select('id', { count: 'exact' })
            .eq('student_id', userId);
          setBadgeCount((badgeIssuances as any)?.length || 0);

          const { data: attestations } = await supabase
            .from('attestations')
            .select('id', { count: 'exact' })
            .eq('student_id', userId);
          setAttestationCount((attestations as any)?.length || 0);

          const projectQuery = supabase.from('projects').select('id');
          // Cast column keys to `any` to satisfy Supabase/TS typed helpers
          const projectFilter =
            isAnimatorOrAdminUser || isEstablishmentOrCenterUser
              ? projectQuery.eq(
                  'group_id' as any,
                  (membership as any)?.group_id
                )
              : projectQuery.eq('student_id' as any, userId);
          const { data: projects } = await projectFilter;
          setProjectCount((projects as any)?.length || 0);
        } catch (err) {
          console.warn('Reward counts fetch failed', err);
        }
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [router]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-semibold tracking-tight">
              {t('title')}
            </h1>
            <p className="text-muted-foreground text-lg">{t('subtitle')}</p>
            <p className="text-muted-foreground text-sm">{dashboardIntro}</p>
            {accountTypeLabel && (
              <p className="text-sm text-muted-foreground">
                {t('account_type_label')} : {accountTypeLabel}
              </p>
            )}
            {profile?.is_verified === false && (
              <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                {t('account_not_verified_warning')}
              </div>
            )}

            {isFamily && (
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>{t('dashboard_family_title')}</CardTitle>
                  <CardDescription>
                    {t('dashboard_family_desc')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border bg-slate-50 p-4">
                      <p className="text-sm text-muted-foreground">
                        {t('family_card_children_label')}
                      </p>
                      <p className="text-2xl font-semibold">{childrenCount}</p>
                    </div>
                    <div className="rounded-xl border bg-slate-50 p-4">
                      <p className="text-sm text-muted-foreground">
                        {t('family_card_alerts_label')}
                      </p>
                      <p className="text-2xl font-semibold">
                        {familyAlertCount}
                      </p>
                    </div>
                    <div className="rounded-xl border bg-slate-50 p-4">
                      <p className="text-sm text-muted-foreground">
                        {t('family_card_actions_label')}
                      </p>
                      <p className="text-2xl font-semibold">
                        {familyChildren.length > 0
                          ? t('family_card_status_up_to_date')
                          : t('family_card_status_add_child')}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    {familyChildren.length > 0 ? (
                      <div className="space-y-3">
                        <p className="text-sm font-medium">
                          {t('family_recent_children_title')}
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {familyChildren.slice(0, 3).map((child) => (
                            <div
                              key={child.id}
                              className="rounded-lg border bg-white p-3"
                            >
                              <p className="font-semibold">
                                {child.first_name} {child.last_name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {child.doctor_name
                                  ? t('family_child_health_complete')
                                  : t('family_child_health_incomplete')}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-lg border bg-slate-50 p-4">
                        <p className="text-sm text-muted-foreground">
                          {t('family_no_children')}
                        </p>
                        <Link
                          href={`/${locale}/famille/enfants/nouveau`}
                          className="mt-3 inline-flex items-center rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-primary/90"
                        >
                          {t('family_add_child_cta')}
                        </Link>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {isLearnerOrStudent && (
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>{t('dashboard_learners_title')}</CardTitle>
                  <CardDescription>
                    {t('dashboard_learners_desc')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border bg-slate-50 p-4">
                      <p className="text-sm text-muted-foreground">
                        {t('button_my_badges')}
                      </p>
                      <p className="text-2xl font-semibold">{badgeCount}</p>
                    </div>
                    <div className="rounded-xl border bg-slate-50 p-4">
                      <p className="text-sm text-muted-foreground">
                        {t('button_my_attestations')}
                      </p>
                      <p className="text-2xl font-semibold">
                        {attestationCount}
                      </p>
                    </div>
                    <div className="rounded-xl border bg-slate-50 p-4">
                      <p className="text-sm text-muted-foreground">
                        {t('button_my_portfolio')}
                      </p>
                      <p className="text-2xl font-semibold">{projectCount}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {isAnimator && !isAdmin && (
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>{t('dashboard_animator_title')}</CardTitle>
                  <CardDescription>
                    {t('dashboard_animator_desc')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border bg-slate-50 p-4">
                      <p className="text-sm text-muted-foreground">
                        {t('assigned_sessions')}
                      </p>
                      <p className="text-2xl font-semibold">
                        {sessions.length}
                      </p>
                    </div>
                    <div className="rounded-xl border bg-slate-50 p-4">
                      <p className="text-sm text-muted-foreground">
                        {t('total_reservations')}
                      </p>
                      <p className="text-2xl font-semibold">
                        {stats.totalReservations}
                      </p>
                    </div>
                    <div className="rounded-xl border bg-slate-50 p-4">
                      <p className="text-sm text-muted-foreground">
                        {t('button_view_requests')}
                      </p>
                      <p className="text-2xl font-semibold">
                        {stats.pendingReservations}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {isEstablishmentOrCenter && (
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>
                    {isEstablishment
                      ? t('dashboard_establishment_title')
                      : t('dashboard_center_title')}
                  </CardTitle>
                  <CardDescription>
                    {isEstablishment
                      ? t('dashboard_establishment_desc')
                      : t('dashboard_center_desc')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border bg-slate-50 p-4">
                      <p className="text-sm text-muted-foreground">
                        {t('workshops')}
                      </p>
                      <p className="text-2xl font-semibold">
                        {sessions.length}
                      </p>
                    </div>
                    <div className="rounded-xl border bg-slate-50 p-4">
                      <p className="text-sm text-muted-foreground">
                        {t('total_reservations')}
                      </p>
                      <p className="text-2xl font-semibold">
                        {stats.totalReservations}
                      </p>
                    </div>
                    <div className="rounded-xl border bg-slate-50 p-4">
                      <p className="text-sm text-muted-foreground">
                        {t('button_documents')}
                      </p>
                      <p className="text-2xl font-semibold">
                        {profile?.is_verified === false
                          ? t('verification_pending_short')
                          : t('documents_ready_short')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {isAdmin && (
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>{t('dashboard_team_title')}</CardTitle>
                  <CardDescription>
                    {t('dashboard_team_desc')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border bg-slate-50 p-4">
                      <p className="text-sm text-muted-foreground">
                        {t('workshops')}
                      </p>
                      <p className="text-2xl font-semibold">
                        {sessions.length}
                      </p>
                    </div>
                    <div className="rounded-xl border bg-slate-50 p-4">
                      <p className="text-sm text-muted-foreground">
                        {t('total_reservations')}
                      </p>
                      <p className="text-2xl font-semibold">
                        {stats.totalReservations}
                      </p>
                    </div>
                    <div className="rounded-xl border bg-slate-50 p-4">
                      <p className="text-sm text-muted-foreground">
                        {t('stats.estimated_revenue')}
                      </p>
                      <p className="text-2xl font-semibold">
                        {stats.totalRevenue}€
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition hover:border-accent"
              >
                <h3 className="font-semibold text-lg">{link.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>

          {/* Récompenses */}
          <div>
            <h2 className="text-lg font-semibold">{t('rewards')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
              {canViewRewards && (
                <Link
                  href={`/${locale}/dashboard/badges`}
                  className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition hover:border-accent"
                >
                  <h3 className="font-semibold">{t('button_my_badges')}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {badgeCount} badge{badgeCount > 1 ? 's' : ''}
                  </p>
                </Link>
              )}

              {canViewRewards && (
                <Link
                  href={`/${locale}/dashboard/attestations`}
                  className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition hover:border-accent"
                >
                  <h3 className="font-semibold">
                    {t('button_my_attestations')}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {attestationCount} attestations
                  </p>
                </Link>
              )}

              {canViewRewards && (
                <Link
                  href={`/${locale}/dashboard/portfolio`}
                  className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition hover:border-accent"
                >
                  <h3 className="font-semibold">{t('button_my_portfolio')}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {projectCount} projet{projectCount > 1 ? 's' : ''}
                  </p>
                </Link>
              )}

              {isAdmin && (
                <Link
                  href={`/${locale}/recompenses/catalogue`}
                  className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition hover:border-accent"
                >
                  <h3 className="font-semibold">
                    {t('button_manage_rewards')}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('manage_rewards_action_desc')}
                  </p>
                </Link>
              )}

              {isAnimator && !isAdmin && (
                <div className="p-4 rounded-lg border bg-card">
                  <h3 className="font-semibold">
                    {t('animator_readonly_health_title')}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('animator_readonly_health_desc')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-6 md:grid-cols-2">
            {statsCards.map((card) => {
              const Icon = card.icon;
              return (
                <Card key={card.title} className="shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      {card.title}
                    </CardTitle>
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{card.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {card.subtitle}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Activity */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>{t('recent_activity')}</CardTitle>
              <CardDescription>{t('recent_activity_subtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              {reservations.length === 0 ? (
                <div className="py-10 text-center text-muted-foreground">
                  {t('no_recent_activity')}
                </div>
              ) : (
                <div className="space-y-3">
                  {reservations.slice(0, 5).map((reservation) => (
                    <div
                      key={reservation.id}
                      className="rounded-lg border p-4 bg-slate-50"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold">
                            {reservation.ateliers?.titre || 'Réservation'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {reservation.date_atelier} •{' '}
                            {reservation.participants_count ?? 0} participant
                            {(reservation.participants_count ?? 0) > 1 ? 's' : ''}
                          </p>
                        </div>
                        <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold uppercase text-slate-700">
                          {reservation.status}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {reservation.nom} • {reservation.email}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDEBAR */}
        <RightSidebar
          title={t('quick_actions')}
          description={t('quick_actions_desc')}
          actions={rightSidebarActions}
          stats={[
            {
              label: t('total_reservations'),
              value: stats.totalReservations,
              icon: <Calendar className="w-4 h-4" />,
              variant: 'default',
            },
            {
              label: t('pending_requests'),
              value: stats.pendingReservations,
              icon: <Clock className="w-4 h-4" />,
              variant: 'pending',
            },
            {
              label: t('confirmed_reservations'),
              value: stats.confirmedReservations,
              icon: <CheckCircle className="w-4 h-4" />,
              variant: 'success',
            },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
