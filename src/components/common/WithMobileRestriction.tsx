'use client';

import { ReactNode } from 'react';
import MobileAccessRestriction from './MobileAccessRestriction';

interface WithMobileRestrictionProps {
  children: ReactNode;
  pageName?: string;
  message?: string;
  showOnMobile?: boolean;
}

/**
 * Wrapper component that restricts access on mobile devices
 * Shows a message encouraging users to use desktop
 * Pass showOnMobile={false} to show MobileAccessRestriction on mobile
 */
export const WithMobileRestriction = ({
  children,
  pageName = 'Cette page',
  message = 'est disponible uniquement sur ordinateur.',
  showOnMobile = false
}: WithMobileRestrictionProps) => {
  // Check if mobile using CSS media query approach via a client component
  // Note: This uses CSS-in-JS to detect mobile, which is reliable for showing/hiding

  return (
    <>
      {/* Show content on desktop and up */}
      <div className={showOnMobile ? 'hidden md:block' : 'md:block'}>
        {children}
      </div>

      {/* Show restriction message on mobile */}
      {!showOnMobile && (
        <div className="md:hidden">
          <MobileAccessRestriction pageName={pageName} message={message} />
        </div>
      )}

      {/* If showOnMobile=true, show content only on mobile */}
      {showOnMobile && (
        <div className="md:hidden">
          {children}
        </div>
      )}
    </>
  );
};

export default WithMobileRestriction;
