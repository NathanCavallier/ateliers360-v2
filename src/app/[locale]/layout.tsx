import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { CookieConsent } from "@/components/common/CookieConsent";
import BottomTabBar from '@/components/common/BottomTabBar';
import ServiceWorkerRegister from '@/components/common/ServiceWorkerRegister';
import MobileRestrictedPage from '@/components/common/MobileRestrictedPage';
import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

// Can be imported from a shared config
const locales = ['en', 'fr'];

export const metadata: Metadata = {
  title: "Ateliers 360 | Passerelle Jeunesse",
  description: "Ateliers éducatifs et accompagnement mobilité",
  openGraph: {
    title: "Ateliers 360 | Passerelle Jeunesse",
    description: "Ateliers éducatifs et accompagnement mobilité",
    url: "https://www.ateliers360.fr",
    siteName: "Ateliers 360",
    images: [
      {
        url: "https://orzfuxasrbpkcaqvgvah.supabase.co/storage/v1/object/sign/images/logo_Ateliers360.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtl eV80MzVkYjM4Ni1kN2Q5LTQwZWEtYmE5Mi04MTMwOTRhZjg2YTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvbG9nb19BdGVsaWVyczM2MC5wbmciLCJpYXQiOjE3NzgwMDA3NTYsImV4cCI6MTkzNTY4MDc1Nn0.-cSRdRkuxaaoNV3BCP8-aWNWb4ZGss_JM1_tB1LrSXA",// Lien direct vers l'image dans Supabase Storage (assurez-vous que les permissions sont correctement configurées)
        alt: "Ateliers 360 Logo",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export default async function RootLayout({
  children,
  params
}: Readonly<Props>) {
  const {locale} = await params;
  if (!locales.includes(locale as any)) notFound();

  // Load messages directly
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0d9488" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={cn("min-h-screen bg-background font-body antialiased")}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <MobileRestrictedPage>
              <main className="flex-1 pb-safe md:pb-0">{children}</main>
            </MobileRestrictedPage>
              <BottomTabBar />
            <Footer />
          </div>
          <Toaster />
          <CookieConsent />
          <ServiceWorkerRegister />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
