# Roadmap — Version mobile vers une App mobile

Objectif

- Faire évoluer le site pour qu'il se comporte et se ressente comme une application mobile (responsive, rapide, installable, fluide, utilisable hors-ligne).

Principes

- Prioriser l'expérience utilisateur mobile: navigation simple, cibles tactiles, performance et accessibilité.
- Itérer par petites étapes vérifiables (MVP → PWA → intégrations natives).

Phases et tâches (ordre recommandé)

Phase 0 — Quick wins (1–2 jours)

- Meta viewport (déjà ajouté) — AC: page responsive sur mobile sans zoom horizontal. (S)
- Bottom tab bar / layout mobile (implémenté) — AC: navigation ergonomique en bas, contenu non masqué.
- Safe-area & paddings — AC: pas de contenu caché sur iPhone with notch. (S)
- Tactile targets ≥44px, espacement et typographie mobile — AC: éléments tappables confortables. (M)

Phase 1 — PWA de base (2–4 jours)

- `manifest.json` (icons 192/512, name, short_name, theme_color) — AC: page installable via Add to Home Screen.
- Service Worker minimal (workbox ou next-pwa) pour assets et routes critiques — AC: page d'accueil charge hors-ligne (shell). (implémenté)
- Icônes et splash screens — AC: installation propre sur iOS/Android. (M)

Phase 2 — Navigation & UX natifs (3–6 jours)

- Gestes et transitions (swipe back, active state animations) — AC: transitions fluides, animations légères.
- Pull-to-refresh et feedback tactiles — AC: actions réseaux avec loader tactile.
- Optimiser header/footer pour mobile (masquer éléments secondaires, repliable au scroll) — AC: header compact, menu accessible. (implémenté)

Phase 3 — Performance & accessibilité (2–4 jours)

- Lighthouse perf ≤ 90 mobile, CLS minimisé, TTFB réduit (optimisations images, critical CSS) — AC: rapports Lighthouse améliorés.
- Images responsives (`<Image>` Next.js, srcset, lazy) — AC: bons formats (AVIF/WebP) et tailles adaptées.
- Audit accessibilité: couleurs, contrastes, labels, focus — AC: score a11y ≥ 90. (M)

Phase 4 — Fonctionnalités « app » (optionnel, 1–3 semaines)

- Auth persistante & offline-first flows (caching des données essentielles)
- Notifications push (via service worker) — AC: opt-in et réception.
- Deep links & universal linking — AC: ouverture vers sections internes.

Phase 5 — QA, tests et release

- Tests E2E (Playwright) sur breakpoints mobiles — AC: navigation et formulaires ok.
- Visual regression (Percy / Chromatic) — AC: pas de régression UI mobile.
- Préparer pipeline CI/CD et checklist de release. (M)

Checklist technique — fichiers à créer/mettre à jour

- `src/app/layout.tsx` — layout mobile, `BottomTabBar`, padding safe-area (déjà modifié).
- `src/app/globals.css` — utilitaires responsive et safe-area (déjà modifié).
- `public/manifest.json` + icons — créé.
- `public/sw.js` — service worker minimal (créé).
- `src/hooks/useScrollDirection.ts` — hook pour collapse/expand au scroll (créé).
- `src/components/common/Header.tsx` — optimisé pour mobile avec collapse (modifié).
- Tests e2e: `tests/e2e/mobile.spec.ts` (Playwright) — ajouté.

Critères d'acceptation généraux

- Navigation principale accessible dans ≤1 tap depuis l'écran d'accueil.
- Vue principale complètement interactive en ≤2s sur réseau mobile 3G simulé.
- Contenu non masqué par UI système (safe-area respected).

Estimation et priorités

- MVP (Phase 0 + 1 minimal): 3–7 jours — priorité haute.
- Polissage (Phase 2 + 3): 1–2 semaines — priorité moyenne.
- Intégrations natives (Phase 4): 1–3 semaines — priorité basse / optionnelle.

Mesures & tests recommandés

- Exécuter Lighthouse mobile, Playwright mobile tests et captures iOS/Android.
- Tester sur appareils réels (iOS Safari, Chrome Android) et émulateurs.

Prochaine action suggérée

- Valider cette roadmap puis je peux implémenter automatiquement :
  - génération de `manifest.json` et icons stub
  - configuration `next-pwa` (ou service worker minimal)
  - ajouter tests Playwright de base pour navigation mobile

---
Fichier créé automatiquement par l'outil — dites-moi quelle action prioriser pour que je commence l'implémentation.
