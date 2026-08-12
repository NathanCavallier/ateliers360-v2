"use client";

import { useEffect } from "react";

const COOKIE_CONSENT_KEY = "imulabs_cookie_consent";
const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: any[]) => void;
  }
}

function ensureDataLayer() {
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.gtag = w.gtag || function () {
    w.dataLayer.push(arguments);
  };
}

function pushDataLayer(payload: Record<string, unknown>) {
  const w = window as any;
  if (!w.dataLayer) {
    ensureDataLayer();
  }
  w.dataLayer.push(payload);
}

function loadGtmScript() {
  if (!GTM_ID) return;
  const existing = document.querySelector(`script[data-gtm-id="${GTM_ID}"]`);
  if (existing) return;

  ensureDataLayer();
  pushDataLayer({ event: "gtm.js" });

  const script = document.createElement("script");
  script.async = true;
  script.dataset.gtmId = GTM_ID;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

function updateConsent(status: "accepted" | "declined") {
  ensureDataLayer();
  if (status === "accepted") {
    pushDataLayer({ event: "cookieConsentChange", consent_status: "granted" });
    pushDataLayer({ event: "optimize.activate" });
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
      });
    }
  } else {
    pushDataLayer({ event: "cookieConsentChange", consent_status: "denied" });
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
      });
    }
  }
}

export default function TrackingScripts() {
  useEffect(() => {
    if (!GTM_ID) return;
    ensureDataLayer();

    const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (storedConsent === "accepted") {
      loadGtmScript();
      updateConsent("accepted");
    } else if (storedConsent === "declined") {
      updateConsent("declined");
    }

    const handleConsentChange = (event: Event) => {
      const customEvent = event as CustomEvent<"accepted" | "declined">;
      if (customEvent.detail === "accepted") {
        loadGtmScript();
        updateConsent("accepted");
      } else if (customEvent.detail === "declined") {
        updateConsent("declined");
      }
    };

    window.addEventListener("cookieConsentChange", handleConsentChange as EventListener);
    return () => {
      window.removeEventListener("cookieConsentChange", handleConsentChange as EventListener);
    };
  }, []);

  return null;
}
