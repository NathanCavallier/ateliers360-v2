/**
 * Configuration des pages restreintes en mobile
 * Ces pages afficheront un message informatif sur mobile invitant l'utilisateur à utiliser un ordinateur
 */

export const MOBILE_RESTRICTED_ROUTES = [
  // Catalogues and discovery (not strict info-only)
  '/ateliers',
  '/catalogues',
  '/modules',
  '/packs',
  '/disciplines',

  // User dashboard and account
  '/dashboard',

  // B2B pages
  '/pour-les-entreprises',
  '/pour-les-structures',
  '/pour-les-ecoles',
  '/construir',

  // Builder and configuration tools
  '/constructeur',

  // Advanced features
  '/recompenses',
  '/recompenses',
  '/tarifs',
  '/calendrier',
  '/blog',
  '/stages',

  // Dynamic workshop pages
  '/ateliers',

  // Create and propose
  '/create',
  '/proposer-projet',
];

/**
 * Exact routes that are allowed on mobile (informative + contact)
 */
export const MOBILE_ALLOWED_ROUTES = [
  '/',
  '/a-propos',
  '/contact',
  '/mentions-legales',
  '/politique-confidentialite',
  '/cgv',
  '/conditions-utilisation',
  '/reserver', // Contact/reservation
  '/inscription',
  '/login',
  '/en-attente-validation',
  '/nous-rejoindre',
  '/reservation-confirmation',
];

/**
 * Check if a route is restricted on mobile
 * Handles both exact matches and dynamic route patterns
 */
export function isRouteMobileRestricted(pathname: string): boolean {
  // Clean up the path
  const cleanPath = pathname.toLowerCase().trim();

  // Check exact matches first
  if (MOBILE_RESTRICTED_ROUTES.includes(cleanPath)) {
    return true;
  }

  // Check if it's allowed (whitelist approach is safer)
  if (MOBILE_ALLOWED_ROUTES.includes(cleanPath)) {
    return false;
  }

  // Check prefix matches for nested routes
  for (const route of MOBILE_RESTRICTED_ROUTES) {
    if (cleanPath.startsWith(route + '/')) {
      return true;
    }
  }

  // If not explicitly restricted, allow by default on mobile
  // (only pages in MOBILE_RESTRICTED_ROUTES are hidden)
  return false;
}

export function isMobileAllowed(pathname: string): boolean {
  return !isRouteMobileRestricted(pathname);
}
