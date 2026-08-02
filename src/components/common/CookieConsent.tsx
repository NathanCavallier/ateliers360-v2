"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Cookie, X } from "lucide-react";

declare global {
  interface Window {
    gtag?: (command: string, action: string, params: Record<string, string>) => void;
  }
}

const COOKIE_CONSENT_KEY = "imulabs_cookie_consent";

export function CookieConsent() {
  const t = useTranslations("CookieConsent");
  const locale = useLocale();
  const [showBanner, setShowBanner] = useState(false);

  const openPreferences = () => setShowBanner(true);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Delay showing banner slightly for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setShowBanner(false);

    // Initialize analytics/tracking here if needed
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setShowBanner(false);

    // Disable analytics/tracking
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }
  };

  return (
    <>
      {!showBanner && (
        <Button
          variant="outline"
          size="icon"
          onClick={openPreferences}
          className="fixed bottom-4 left-4 z-[60] h-12 w-12 rounded-full border border-border/80 bg-background/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/90"
          aria-label={t("preferences")}
        >
          <Cookie className="h-5 w-5" />
        </Button>
      )}

      {showBanner && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-bottom duration-500">
          <Card className="border-2 shadow-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-primary/10 p-1.5">
                    <Cookie className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-base font-semibold">{t("title")}</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDecline}
                  className="h-7 w-7 -mt-1"
                  aria-label={t("close")}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <CardDescription className="text-xs leading-relaxed">
                {t("description")} {" "}
                <Link
                  href={`/${locale}/politique-confidentialite`}
                  className="underline underline-offset-4 hover:text-primary font-medium"
                >
                  {t("privacyLink")}
                </Link>
                {" "}{t("and")} {" "}
                <Link
                  href={`/${locale}/mentions-legales`}
                  className="underline underline-offset-4 hover:text-primary font-medium"
                >
                  {t("termsLink")}
                </Link>
                .
              </CardDescription>
              <div className="mt-2">
                <details className="text-[10px] text-muted-foreground">
                  <summary className="cursor-pointer hover:text-foreground font-medium">
                    {t("cookieTypes")}
                  </summary>
                  <ul className="mt-1.5 ml-3 space-y-0.5 list-disc">
                    <li>
                      <strong>{t("essential.title")}:</strong> {t("essential.description")}
                    </li>
                    <li>
                      <strong>{t("analytics.title")}:</strong> {t("analytics.description")}
                    </li>
                  </ul>
                </details>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 pt-0">
              <Button
                variant="outline"
                onClick={handleDecline}
                className="flex-1 h-9 text-xs"
              >
                {t("decline")}
              </Button>
              <Button
                onClick={handleAccept}
                className="flex-1 h-9 text-xs"
              >
                {t("accept")}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
