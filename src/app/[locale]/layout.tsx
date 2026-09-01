import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { CookieConsent } from "@/components/common/CookieConsent";
import TrackingScripts from "@/components/common/TrackingScripts";
import BottomTabBar from "@/components/common/BottomTabBar";
import ServiceWorkerRegister from "@/components/common/ServiceWorkerRegister";
import MobileRestrictedPage from "@/components/common/MobileRestrictedPage";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";

const locales = ["en", "fr"];

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const baseMetadata: Metadata = {
  title: "Ateliers 360",
  description: "Ateliers Tech et Sciences",
  openGraph: {
    title: "Ateliers 360",
    description: "Ateliers Tech et Sciences",
    url: SITE_URL,
    siteName: "Ateliers 360",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: "Ateliers 360 Logo",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ateliers 360",
    description: "Ateliers Tech et Sciences",
    images: [DEFAULT_OG_IMAGE],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const localeTag = locale === "en" ? "en_US" : "fr_FR";

  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      locale: localeTag,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        fr: `${SITE_URL}/fr`,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const { locale } = await params;
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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(d, w, c) {
                w.BrevoConversationsID = '6a61c1a3fbb55c90730b8e44';
                w[c] = w[c] || function() {
                  (w[c].q = w[c].q || []).push(arguments);
                };
                var s = d.createElement('script');
                s.async = true;
                s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
                if (d.head) d.head.appendChild(s);
              })(document, window, 'BrevoConversations');
            `,
          }}
        />
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
          <TrackingScripts />
          <ServiceWorkerRegister />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
