import React, { ReactNode } from 'react';
import { AdminRole } from '@/types-admin';

interface RoleBasedViewProps {
  children: ReactNode;
  requiredRole?: AdminRole | AdminRole[];
  fallback?: ReactNode;
}

/**
 * Composant pour afficher du contenu conditionnel selon le rôle
 * Utilise le hook useAdminRole() dans ses enfants
 */
export function RoleBasedView({
  children,
  requiredRole,
  fallback,
}: RoleBasedViewProps) {
  // Ce composant est généralement enveloppé par un client qui a accès au hook
  // La logique de filtrage se fait dans le composant parent
  return <>{children}</>;
}

interface PermissionGuardProps {
  canAccess: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Composant pour contrôler l'accès à du contenu basé sur une permission
 */
export function PermissionGuard({
  canAccess,
  children,
  fallback = null,
}: PermissionGuardProps) {
  if (!canAccess) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
}

interface RestrictedSectionProps {
  title: string;
  description?: string;
  requiredRole: AdminRole;
  currentRole: AdminRole;
  children: ReactNode;
}

/**
 * Composant pour afficher une section avec restriction de rôle
 */
export function RestrictedSection({
  title,
  description,
  requiredRole,
  currentRole,
  children,
}: RestrictedSectionProps) {
  const hasAccess =
    currentRole === AdminRole.SuperAdmin ||
    (currentRole === AdminRole.Moderator && requiredRole !== AdminRole.SuperAdmin) ||
    currentRole === requiredRole;

  if (!hasAccess) {
    return (
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <p className="text-sm text-yellow-800">
          {/* Accès limité: {title} réservé aux {requiredRole} */}
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}
