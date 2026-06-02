import { ComponentType } from 'react';
import { AccountType } from '@/types-accounts';
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  Clock,
  CheckCircle,
  DollarSign,
  FileText,
  GraduationCap,
  MessageSquare,
  Plus,
  Settings,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

export type DashboardRole = AccountType | 'admin' | 'other';

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

export type DashboardQuickLink = {
  href: string;
  label: string;
  description: string;
};

export type DashboardActionItem = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

export type DashboardStatCard = {
  title: string;
  value: string | number;
  icon: ComponentType<{ className?: string }>;
  subtitle: string;
  variant?: 'default' | 'pending' | 'success' | 'warning';
};

const navigationItems: DashboardNavItem[] = [
  { label: 'dashboard_menu.overview', href: '/dashboard', icon: BarChart3 },
  { label: 'dashboard_menu.workshops', href: '/dashboard/ateliers', icon: BookOpen },
  { label: 'dashboard_menu.reservations', href: '/dashboard/reservations', icon: CalendarDays },
  { label: 'dashboard_menu.requests', href: '/dashboard/demandes', icon: MessageSquare },
  { label: 'dashboard_menu.contacts', href: '/dashboard/contacts', icon: Users },
  { label: 'dashboard_menu.settings', href: '/dashboard/settings', icon: Settings },
];

const familyNavigationItems: DashboardNavItem[] = [
  navigationItems[0],
  { label: 'dashboard_menu.family', href: '/famille', icon: Users },
  { label: 'dashboard_menu.badges', href: '/dashboard/badges', icon: Zap },
  { label: 'dashboard_menu.certificates', href: '/dashboard/attestations', icon: FileText },
  navigationItems[5],
];

const learnerNavigationItems: DashboardNavItem[] = [
  navigationItems[0],
  { label: 'dashboard_menu.badges', href: '/dashboard/badges', icon: Zap },
  { label: 'dashboard_menu.certificates', href: '/dashboard/attestations', icon: FileText },
  { label: 'dashboard_menu.portfolio', href: '/dashboard/portfolio', icon: BookOpen },
  navigationItems[5],
];

const partnerNavigationItems: DashboardNavItem[] = [
  navigationItems[0],
  navigationItems[2],
  navigationItems[3],
  navigationItems[4],
  navigationItems[5],
];

const animatorNavigationItems: DashboardNavItem[] = [
  navigationItems[0],
  navigationItems[2],
  navigationItems[3],
  navigationItems[5],
];

const otherNavigationItems: DashboardNavItem[] = [navigationItems[0], navigationItems[5]];

export function getDashboardRole(
  profileType?: string | null,
  userMetadata?: any,
): DashboardRole {
  if (userMetadata?.role === 'admin' || userMetadata?.account_type === 'admin') {
    return 'admin';
  }

  const type = profileType || userMetadata?.account_type;

  switch (type) {
    case AccountType.Family:
    case AccountType.Establishment:
    case AccountType.Center:
    case AccountType.Animator:
    case AccountType.Learner:
    case AccountType.Student:
    case AccountType.Other:
      return type;
    case 'admin':
      return 'admin';
    default:
      return 'other';
  }
}

export function getDashboardRoleFlags(role: DashboardRole) {
  return {
    isAdmin: role === 'admin',
    isFamily: role === AccountType.Family,
    isLearner: role === AccountType.Learner,
    isStudent: role === AccountType.Student,
    isLearnerOrStudent:
      role === AccountType.Learner || role === AccountType.Student,
    isAnimator: role === AccountType.Animator,
    isEstablishment: role === AccountType.Establishment,
    isCenter: role === AccountType.Center,
    isEstablishmentOrCenter:
      role === AccountType.Establishment || role === AccountType.Center,
    isOther: role === 'other',
  };
}

export function getNavigationItemsForRole(role: DashboardRole) {
  if (role === 'admin') return navigationItems;
  if (role === AccountType.Family) return familyNavigationItems;
  if (role === AccountType.Learner || role === AccountType.Student)
    return learnerNavigationItems;
  if (role === AccountType.Animator) return animatorNavigationItems;
  if (role === AccountType.Establishment || role === AccountType.Center)
    return partnerNavigationItems;
  return otherNavigationItems;
}

export function getDashboardIntroKey(role: DashboardRole) {
  if (role === AccountType.Family) return 'dashboard_intro_family';
  if (role === AccountType.Learner || role === AccountType.Student)
    return 'dashboard_intro_learners';
  if (role === AccountType.Animator) return 'dashboard_intro_animators';
  if (role === AccountType.Establishment || role === AccountType.Center)
    return 'dashboard_intro_team';
  if (role === 'admin') return 'dashboard_intro_admin';
  return 'dashboard_intro_default';
}

export function getQuickLinksForRole(role: DashboardRole): DashboardQuickLink[] {
  const commonSettings = {
    href: '/dashboard/settings',
    label: 'button_profile_settings',
    description: 'manage_profile_desc',
  };

  if (role === AccountType.Family) {
    return [
      commonSettings,
      {
        href: '/famille',
        label: 'button_family_space',
        description: 'family_space_desc',
      },
      {
        href: '/famille/enfants/nouveau',
        label: 'button_children',
        description: 'children_desc',
      },
      {
        href: '/famille',
        label: 'button_authorizations',
        description: 'authorizations_desc',
      },
    ];
  }

  if (role === AccountType.Learner || role === AccountType.Student) {
    return [
      {
        href: '/dashboard/badges',
        label: 'button_my_badges',
        description: 'my_badges_desc',
      },
      {
        href: '/dashboard/attestations',
        label: 'button_my_attestations',
        description: 'my_attestations_desc',
      },
      {
        href: '/dashboard/portfolio',
        label: 'button_my_portfolio',
        description: 'my_portfolio_desc',
      },
    ];
  }

  if (role === AccountType.Animator) {
    return [
      {
        href: '/dashboard/reservations',
        label: 'button_manage_reservations',
        description: 'animator_reservations_desc',
      },
      {
        href: '/dashboard/demandes',
        label: 'button_view_requests',
        description: 'animator_reports_desc',
      },
      {
        href: '/dashboard/contacts',
        label: 'button_view_contacts',
        description: 'animator_contacts_desc',
      },
    ];
  }

  if (role === AccountType.Establishment || role === AccountType.Center) {
    return [
      {
        href: '/dashboard/ateliers',
        label: 'dashboard_menu.workshops',
        description: 'manage_workshops_desc',
      },
      {
        href: '/dashboard/reservations',
        label: 'dashboard_menu.reservations',
        description: 'manage_reservations_desc',
      },
      {
        href: '/dashboard/demandes',
        label: 'dashboard_menu.requests',
        description: 'view_requests_desc',
      },
    ];
  }

  if (role === 'admin') {
    return [
      {
        href: '/dashboard/ateliers/nouveau',
        label: 'create_workshop',
        description: 'manage_workshops_desc',
      },
      {
        href: '/dashboard/reservations',
        label: 'button_manage_reservations',
        description: 'manage_reservations_desc',
      },
      {
        href: '/dashboard/demandes',
        label: 'button_view_requests',
        description: 'view_requests_desc',
      },
    ];
  }

  return [
    {
      href: '/dashboard/settings',
      label: 'button_profile_settings',
      description: 'manage_profile_desc',
    },
    {
      href: '/dashboard/reservations',
      label: 'button_manage_reservations',
      description: 'manage_reservations_desc',
    },
    {
      href: '/dashboard/contacts',
      label: 'button_view_contacts',
      description: 'view_contacts_desc',
    },
  ];
}

export function getRightSidebarActionsForRole(role: DashboardRole): DashboardActionItem[] {
  if (role === AccountType.Family) {
    return [
      {
        href: '/famille/enfants/nouveau',
        label: 'button_children',
        icon: Users,
      },
      {
        href: '/famille',
        label: 'button_authorizations',
        icon: FileText,
      },
      {
        href: '/dashboard/settings',
        label: 'button_profile_settings',
        icon: Plus,
      },
    ];
  }

  if (role === AccountType.Learner || role === AccountType.Student) {
    return [
      {
        href: '/dashboard/badges',
        label: 'button_my_badges',
        icon: GraduationCap,
      },
      {
        href: '/dashboard/attestations',
        label: 'button_my_attestations',
        icon: CheckCircle,
      },
      {
        href: '/dashboard/portfolio',
        label: 'button_my_portfolio',
        icon: Plus,
      },
    ];
  }

  if (role === AccountType.Animator) {
    return [
      {
        href: '/dashboard/reservations',
        label: 'button_manage_reservations',
        icon: CalendarDays,
      },
      {
        href: '/dashboard/demandes',
        label: 'button_view_requests',
        icon: MessageSquare,
      },
      {
        href: '/dashboard/contacts',
        label: 'button_view_contacts',
        icon: Users,
      },
    ];
  }

  if (role === AccountType.Establishment || role === AccountType.Center) {
    return [
      {
        href: '/dashboard/ateliers',
        label: 'dashboard_menu.workshops',
        icon: BookOpen,
      },
      {
        href: '/dashboard/reservations',
        label: 'dashboard_menu.reservations',
        icon: CalendarDays,
      },
      {
        href: '/dashboard/demandes',
        label: 'dashboard_menu.requests',
        icon: MessageSquare,
      },
    ];
  }

  if (role === 'admin') {
    return [
      {
        href: '/dashboard/ateliers/nouveau',
        label: 'create_workshop',
        icon: Plus,
      },
      {
        href: '/dashboard/reservations',
        label: 'button_manage_reservations',
        icon: CalendarDays,
      },
      {
        href: '/dashboard/demandes',
        label: 'button_view_requests',
        icon: MessageSquare,
      },
    ];
  }

  return [
    {
      href: '/dashboard/reservations',
      label: 'button_manage_reservations',
      icon: CalendarDays,
    },
    {
      href: '/dashboard/contacts',
      label: 'button_view_contacts',
      icon: Users,
    },
    {
      href: '/dashboard/settings',
      label: 'button_profile_settings',
      icon: Settings,
    },
  ];
}

export function getStatsCardsForRole(
  role: DashboardRole,
  values: {
    sessions: number;
    stats: DashboardStatValues;
    badgeCount: number;
    attestationCount: number;
    projectCount: number;
    childrenCount: number;
  },
): DashboardStatCard[] {
  const { sessions, stats, badgeCount, attestationCount, projectCount, childrenCount } = values;

  if (role === AccountType.Family) {
    return [
      {
        title: 'stats.children',
        value: childrenCount,
        icon: Users,
        subtitle: 'stats.children_desc',
      },
      {
        title: 'workshops',
        value: sessions,
        icon: CalendarDays,
        subtitle: 'futur_workshops',
      },
      {
        title: 'stats.pendings',
        value: stats.pendingReservations,
        icon: Clock,
        subtitle: 'stats.pendings',
        variant: 'pending',
      },
    ];
  }

  if (role === AccountType.Learner || role === AccountType.Student) {
    return [
      {
        title: 'button_my_badges',
        value: badgeCount,
        icon: GraduationCap,
        subtitle: 'my_badges_desc',
      },
      {
        title: 'button_my_attestations',
        value: attestationCount,
        icon: CheckCircle,
        subtitle: 'my_attestations_desc',
      },
      {
        title: 'button_my_portfolio',
        value: projectCount,
        icon: Plus,
        subtitle: 'my_portfolio_desc',
      },
    ];
  }

  if (role === AccountType.Animator) {
    return [
      {
        title: 'assigned_sessions',
        value: sessions,
        icon: Users,
        subtitle: 'dashboard_animator_desc',
      },
      {
        title: 'total_reservations',
        value: stats.totalReservations,
        icon: CalendarDays,
        subtitle: 'dashboard_menu.reservations',
      },
      {
        title: 'pending_requests',
        value: stats.pendingReservations,
        icon: Clock,
        subtitle: 'dashboard_menu.requests',
        variant: 'pending',
      },
    ];
  }

  if (role === AccountType.Establishment || role === AccountType.Center) {
    return [
      {
        title: 'workshops',
        value: sessions,
        icon: CalendarDays,
        subtitle: 'futur_workshops',
      },
      {
        title: 'total_reservations',
        value: stats.totalReservations,
        icon: Users,
        subtitle: 'stats.schools',
      },
      {
        title: 'button_documents',
        value: stats.confirmedReservations,
        icon: FileText,
        subtitle: 'dashboard_menu.settings',
      },
    ];
  }

  if (role === 'admin') {
    return [
      {
        title: 'workshops',
        value: sessions,
        icon: CalendarDays,
        subtitle: 'futur_workshops',
      },
      {
        title: 'stats.students',
        value: stats.totalReservations,
        icon: Users,
        subtitle: 'stats.schools',
      },
      {
        title: 'stats.pendings',
        value: stats.pendingReservations,
        icon: TrendingUp,
        subtitle: 'stats.pendings',
        variant: 'pending',
      },
      {
        title: 'stats.estimated_revenue',
        value: `${stats.totalRevenue}€`,
        icon: DollarSign,
        subtitle: 'stats.confirmed_reservations',
        variant: 'success',
      },
    ];
  }

  return [
    {
      title: 'workshops',
      value: sessions,
      icon: CalendarDays,
      subtitle: 'futur_workshops',
    },
    {
      title: 'total_reservations',
      value: stats.totalReservations,
      icon: Users,
      subtitle: 'stats.schools',
    },
    {
      title: 'pending_requests',
      value: stats.pendingReservations,
      icon: Clock,
      subtitle: 'stats.pendings',
      variant: 'pending',
    },
  ];
}

export type DashboardStatValues = {
  totalReservations: number;
  pendingReservations: number;
  confirmedReservations: number;
  totalRevenue: number;
};
