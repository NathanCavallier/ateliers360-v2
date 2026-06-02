'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { isRouteMobileRestricted } from '@/lib/mobile-restrictions';
import MobileAccessRestriction from './MobileAccessRestriction';

interface MobileRestrictedPageProps {
  children: ReactNode;
  pageName?: string;
  message?: string;
}

/**
 * Wrapper component that automatically restricts pages on mobile
 * based on the current pathname
 *
 * Usage: Wrap your page content with this component
 * <MobileRestrictedPage>
 *   <YourPageContent />
 * </MobileRestrictedPage>
 */
export const MobileRestrictedPage = ({
  children,
  pageName = 'Cette page',
  message = 'est disponible uniquement sur ordinateur.'
}: MobileRestrictedPageProps) => {
  const pathname = usePathname() || '';

  // Extract the path without locale prefix (e.g., '/fr/ateliers' -> '/ateliers')
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');
  const isRestricted = isRouteMobileRestricted(pathWithoutLocale);

  if (!isRestricted) {
    // Page is allowed on mobile, show content
    return <>{children}</>;
  }

  return (
    <>
      {/* Show restriction message on mobile */}
      <div className="md:hidden">
        <MobileAccessRestriction pageName={pageName} message={message} />
      </div>

      {/* Show content on desktop and up */}
      <div className="hidden md:block">
        {children}
      </div>
    </>
  );
};

export default MobileRestrictedPage;
