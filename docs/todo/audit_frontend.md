# 🔍 AUDIT FRONTEND — Ateliers 360

**Date** : Avril 2026 | **Périmètre** : `src/app/[locale]/` + `src/components/` + `messages/`

---

## Légende des statuts

| Icône | Statut | Signification |
|-------|--------|---------------|
| ✅ | **FAIT** | Implémenté et fonctionnel |
| 🟡 | **PARTIEL** | Existe mais incomplet ou à améliorer |
| ❌ | **MANQUANT** | Attendu dans la vision, non implémenté |
| ⚠️ | **À AJUSTER** | Existe mais non conforme à la vision ou aux contraintes réglementaires |

---

## 1. PAGES PUBLIQUES (`src/app/[locale]/`)

### 1.1 Accueil — `page.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Hero avec image de fond | ✅ | Unsplash, overlay primary, OK |
| Stats (1000+ élèves, 50+ écoles) | ⚠️ | **Données fictives hardcodées** — À brancher sur Supabase ou afficher comme objectifs clairement |
| Grille des 6 ateliers phares | 🟡 | Chargement dynamique OK, mais fallback si Supabase vide non géré visuellement |
| Section "Pourquoi nous choisir" | ✅ | 3 cards, contenu i18n |
| Section formations adultes | ✅ | Lien vers `/formations`, contenu traduit |
| Métadonnées SEO | ✅ | Titre + description dans layout |
| **Conformité** : Pas de mentions légales en footer | ⚠️ | Footer présent mais liens légaux doivent être visibles depuis l'accueil |

---

### 1.2 Catalogue Ateliers — `atelier/page.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Barre de recherche hero | ✅ | Fonctionnelle, state local |
| Filtres avancés Desktop (catégorie, âge, durée, prix, format) | ✅ | Sliders + boutons, tous fonctionnels |
| Filtres Mobile (Sheet) | ✅ | Sheet shadcn/ui, expérience OK |
| Tri (popularité, prix, durée, récents) | ✅ | Select + useMemo |
| Compteur de filtres actifs | ✅ | `activeFiltersCount` |
| Reset filtres | ✅ | Bouton "Effacer les filtres" |
| Chargement Supabase via `WorkshopList` | ✅ | Avec Skeleton loading |
| CTA footer "Réserver" | ✅ | Bouton accent, lien contact |
| **Conformité** : Pas de prix garantis affichés sans devis | ✅ | Tarifs indicatifs, CTA devis |

---

### 1.3 Détail Atelier — `atelier/[slug]/page.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Hero avec image atelier | ✅ | Image Unsplash avec overlay dark |
| Badges type/catégorie | ✅ | `type_workshop` / `type_module` / `type_pack` |
| Métriques clés (durée, public, prix, format) | ✅ | 4 chips en barre dédiée |
| Description longue + objectifs | ✅ | `whitespace-pre-line` |
| Matériel fourni | ✅ | Section dédiée |
| Sessions à la demande (CTA) | ✅ | Card avec bouton réserver |
| Ateliers similaires (sidebar) | ✅ | Triés par catégorie, 3 max |
| Sticky CTA sidebar | ✅ | `sticky top-24` |
| **SEO** : `generateMetadata` dynamique | ✅ | Titre, description, OG, Twitter, alternates |
| **SEO** : JSON-LD `EducationalEvent` | ✅ | Schéma.org complet |
| `generateStaticParams` | ✅ | Pour ISR/SSG |
| **Conformité** : Prix clairement indicatifs | ✅ | "Estimated price" dans badge |
| Breadcrumbs | ✅ | Composant `Breadcrumbs` avec locale |
| **Manque** : Date de mise à jour de la fiche | ❌ | Utile pour la confiance et le SEO |

---

### 1.4 Réservation — `reserver/page.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Chargement liste ateliers depuis Supabase | ✅ | `getWorkshops()` |
| Pre-sélection via `?atelier=ID` | ✅ | `useSearchParams()` |
| Skeleton loading | ✅ | |
| Formulaire `ReservationForm` | ✅ | Voir composant dédié ci-dessous |
| **Conformité CGV** : Mention CGV avant paiement | ❌ | **CRITIQUE** — Les CGV doivent être accessibles et acceptées avant tout engagement financier |
| **Conformité RGPD** : Case consentement | 🟡 | Case "Politique de confidentialité" présente dans le form mais libellé incomplet pour mineurs |

---

### 1.5 Succès Réservation — `reserver/success/page.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Message confirmation visuel | ✅ | CheckCircle + Alert verte |
| Étapes suivantes numérotées | ✅ | 4 étapes claires |
| Référence paiement Stripe (session_id) | ✅ | Affiché tronqué |
| CTA "Explorer autres ateliers" | ✅ | |
| Lien support | ✅ | |
| **Conformité** : Email de confirmation mentionné | ✅ | "Vous allez recevoir un email..." |
| **Manque** : Numéro de réservation lisible | ❌ | `reservation_id` pas affiché si absent des params |

---

### 1.6 À Propos — `a-propos/page.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Hero + logo | ✅ | |
| Mission, valeurs, approche | ✅ | i18n complet |
| Équipe (Nathan Imogo) | ✅ | Bio, rôle, emoji placeholder |
| Stats (500+ enfants, 50+ ateliers…) | ⚠️ | **Hardcodées** — Doit correspondre à la réalité ou être clairement aspirationnelles |
| Photo/Avatar fondateur | ⚠️ | Emoji 👨‍💻 — À remplacer par photo réelle pour crédibilité |
| CTA vers ateliers | ✅ | |
| `generateMetadata` | ✅ | |

---

### 1.7 Pour les Écoles — `pour-les-ecoles/page.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Hero + image | ✅ | |
| 6 raisons de choisir | ✅ | CheckCircle + i18n |
| 4 formats disponibles | ✅ | Cards |
| 3 Packs "Cycles" (A, B, C) | ✅ | Colorés par niveau d'âge |
| Formulaire de contact | ⚠️ | **Ne fait rien** — `<form>` HTML sans action ni API call. Données perdues |
| Tarification 3 niveaux | ✅ | Découverte, Cycle, Journée Science |
| FAQ | ✅ | 4 questions |
| CTA contact | ✅ | |
| **Conformité** : Le formulaire doit envoyer à `contact@ateliers360.fr` | ❌ | Formulaire non fonctionnel = perte de leads |

---

### 1.8 Formations — `formations/page.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Hero avec badge | ✅ | |
| Positionnement Ateliers vs Formations | ✅ | 2 cards distinctives |
| 4 axes de formation avec items | ✅ | Cards colorées avec images Unsplash |
| Formats disponibles | ✅ | 5 formats listés |
| Section tarifs indicatifs | ✅ | 4 fourchettes de prix |
| Section public cible | ✅ | Associations, institutions, adultes |
| CTA devis | ✅ | |
| **Manque** : Pas de formulaire de demande de formation | ❌ | Le CTA "Demander un devis" pointe vers `/contact` généraliste — Un formulaire dédié serait plus converti |

---

### 1.9 Formations Pro — `formations-pro/page.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| 3 modules (Python, Robotique, IA) | ✅ | Cards avec Dialog détail |
| Dialog détail : objectifs + programme + prix | ✅ | Bien structuré |
| Avantages (4 cards) | ✅ | |
| FAQ (5 questions) | ✅ | Dont CPF/Qualiopi |
| CTA contact + calendrier | ✅ | |
| **Conformité Qualiopi** : Mention "certification en cours" | 🟡 | Mentionné dans FAQ mais pas en évidence — Réglementairement doit être clair pour éviter toute confusion |
| **Conformité** : Financement OPCO mentionné | ✅ | Note sur chaque module |

---

### 1.10 Contact — `contact/page.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Informations de contact (email, téléphone, adresse, horaires) | 🟡 | Données de contact **imulabs.fr** pas **ateliers360.fr** → À corriger |
| Réseaux sociaux | ⚠️ | Liens vers imulabs.fr — À mettre à jour |
| Formulaire avec Server Action | ✅ | `submitContactForm` + validation Zod |
| Feedback toast succès/erreur | ✅ | |
| Reset formulaire après succès | ✅ | `formRef.current?.reset()` |
| Carte Google Maps (Paris) | ✅ | iframe intégré |
| **Fonctionnel** : Server Action log en console | ⚠️ | `console.log(validatedFields.data)` — **Données envoyées nulle part en production !** Doit envoyer un email |
| **Conformité RGPD** : Mentions sur traitement des données | ❌ | Pas de mention sur le formulaire contact |

---

### 1.11 Blog — `blog/page.tsx` + `blog/[slug]/page.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Chargement articles Supabase | ✅ | `getBlogArticles()` |
| Filtres par catégorie (Tabs) | ✅ | |
| Tri (récents, anciens, populaires) | 🟡 | "Populaires" ne tri sur rien de réel (pas de compteur de vues) |
| Pagination avec contrôles complets | ✅ | Chevrons + numéros |
| Articles/page configurable | ✅ | Select 6/9/12/24 |
| Page détail avec contenu Markdown-like | 🟡 | Parser basique `split('\n\n')` — Pas de support Markdown complet (gras, listes, etc.) |
| Boutons partage social | ✅ | Facebook, Twitter, LinkedIn, Email, Copier |
| Copier lien | ✅ | `navigator.clipboard` + feedback |
| **Conformité** : Pas de date de publication visible sur la liste | ⚠️ | Affiché en détail mais pas dans la grille des cards |
| **Manque** : Métadonnées SEO dynamiques pour les articles | ❌ | Page blog et page article sont `'use client'` — pas de `generateMetadata` côté serveur |

---

### 1.12 Calendrier — `calendrier/page.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Vue mensuelle avec grille | ✅ | `date-fns` + logique custom |
| Indicateurs de jours avec événements | ✅ | Points primaires |
| Vue liste | ✅ | Cards événements |
| Statistiques (total, à venir, ce mois, places) | ✅ | 4 KPIs |
| Dialog détail événement | ✅ | Avec lieu, horaires, places |
| Export iCal | ✅ | Génération fichier `.ics` |
| Bouton réserver dans dialog | ✅ | Lien vers `/reserver` |
| Navigation mois précédent/suivant | ✅ | |
| **Manque** : Pas d'événements réels en base | ❌ | Table `events` existe mais vide — Aucun contenu à afficher sans alimentation |

---

### 1.13 Tarifs — `tarifs/page.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Hero avec badge | ✅ | |
| Calculateur de prix interactif | ✅ | Type × Participants × Durée × Options |
| Remises groupes automatiques | ✅ | -10% ≥10, -15% ≥20 |
| Résultat estimatif | ✅ | Affiche total + prix/personne |
| Tarifs standards en cards | ✅ | 4 types |
| FAQ facturation | ✅ | 4 questions |
| **Conformité** : Mention "estimation non contractuelle" | ✅ | |
| **Conformité** : Régime TVA non mentionné dans le calculateur | ⚠️ | Le calculateur doit préciser HT/TTC ou, en micro-entreprise non assujettie, la mention de franchise en base de TVA |
| **Cohérence** : Prix découverte calculateur (35€/pers) ≠ offre commerciale (250€ HT groupe) | ⚠️ | Discordance possible côté client |

---

### 1.14 Mentions Légales — `mentions-legales/page.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Éditeur du site | 🟡 | SIRET `[À compléter]`, adresse `[À compléter]` |
| Directeur de publication | ✅ | Nathan Imogo |
| Hébergeur | ✅ | Vercel Inc. |
| Assurance RC Pro | 🟡 | `[Nom de l'assurance]` à compléter |
| Propriété intellectuelle | ✅ | |
| Crédits | ✅ | |
| **Conformité** : Numéro SIRET manquant | ❌ | **OBLIGATOIRE légalement** pour toute activité commerciale en ligne |
| **Conformité** : Statut EI/micro-entreprise non explicite | ❌ | La page doit refléter la structure reelle et ne pas laisser une mention SASU ailleurs dans le site |
| **Conformité** : N° TVA manquant | 🟡 | A fournir uniquement si assujetti a la TVA ; sinon prevoir une formulation coherente avec la franchise en base |

---

### 1.15 Politique de Confidentialité — `politique-confidentialite/page.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Introduction | ✅ | |
| Données collectées (4 catégories) | ✅ | Contact, réservations, navigation, paiement |
| Utilisation des données | ✅ | |
| Données des mineurs | ✅ | Section dédiée |
| Cookies | ✅ | |
| Droits RGPD (5 droits) | ✅ | Accès, rectification, effacement, opposition, portabilité |
| DPO / Contact CNIL | ✅ | `dpo@ateliers360.fr` |
| **Conformité RGPD** : Durées de conservation précises | 🟡 | Mentionné "3 ans prospects" — manque durées pour autres catégories |
| **Conformité** : Base légale pour chaque traitement | ❌ | Non structuré par base légale comme dans la charte RGPD (`charte_rgpd_participant.docx`) |
| **Conformité** : Sous-traitants listés (Stripe, Supabase, Resend) | ❌ | **RGPD Art. 13** — Les sous-traitants traitant des données UE doivent être déclarés |

---

### 1.16 Conditions d'Utilisation — `conditions-utilisation/page.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Structure 6 sections | ✅ | |
| Contenu i18n | ✅ | |
| **Conformité** : CGU ≠ CGV — Les CGV (conditions_generales_vente.docx) ne sont pas sur le site | ❌ | **CRITIQUE** — Les CGV sont obligatoires et doivent être accessibles avant toute commande (Art. L111-1 C. conso.) |
| **Conformité** : Modalités d'annulation/remboursement absentes du site | ❌ | Présentes dans le doc CGV mais pas sur le site public |

---

### 1.17 Modules — `modules/page.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Hero avec animation orbitale | ✅ | Blur circles animés |
| Intro texte | ✅ | |
| Grille modules depuis Supabase (type=module) | ✅ | Avec badge P1, P2... |
| Badge Pn rotatif au hover | ✅ | Transition CSS |
| CTA bas de page | ✅ | |
| **Manque** : Contenu vide si aucun module en base | ❌ | Pas de state vide géré explicitement |

---

### 1.18 Packs — `packs/page.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Hero deux colonnes avec cards animées | ✅ | Rotate CSS |
| Grille packs depuis Supabase | ✅ | |
| Section "Intensifs" (stages, anniversaires, hackathons) | ✅ | 3 cards avec images |
| Section "Ils nous font confiance" | ⚠️ | **Logos fictifs** ("ACADEMIE", "ECOLE PRO"...) — À remplacer par vrais logos partenaires ou supprimer |
| CTA footer | ✅ | |

---

### 1.19 Disciplines — `disciplines/page.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| 6 disciplines en cards | ✅ | Icônes Lucide |
| Titre et description i18n | ✅ | |
| Section CTA | ⚠️ | Bouton "Explorer les Ateliers" en `<button>` HTML basique sans route — **Non fonctionnel** |

---

### 1.20 Stages — `stages/page.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Timeline des 4 saisons | ✅ | Cards avec icônes thématiques |
| Autres formats (anniversaires, hackathons) | ✅ | |
| Features (encadrement, projets, ambiance) | ✅ | |
| `generateMetadata` | ✅ | |
| **Manque** : Formulaire ou CTA de réservation de stage spécifique | ❌ | CTA pointe vers `/reserver` générique |
| **Manque** : Prix des stages | ❌ | Aucun tarif affiché pour les stages vacances |

---

### 1.21 Dashboard Apprenant — `dashboard/page.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Auth Supabase (`getUser`) | ✅ | Redirect login si non connecté |
| Récupération groupe membership | ✅ | |
| Onglet Planning (sessions à venir) | ✅ | |
| Onglet Ressources (fichiers + liens) | ✅ | |
| Onglet Suivi pédagogique | ⚠️ | **Placeholder** "Retrouvez bientôt ici..." — Non implémenté |
| **Manque** : Onglet Projets Fil Rouge côté apprenant | ❌ | `StudentProjectView` existe mais non intégré au dashboard |
| **Manque** : Notifications | ❌ | |

---

### 1.22 Login Apprenant — `login/page.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Auth Supabase password | ✅ | |
| Lien vers admin login | ✅ | |
| **Manque** : Inscription / mot de passe oublié | ❌ | "Demandez à votre animateur" — OK pour MVP mais limitant |
| **Conformité** : Pas de mention RGPD sur la page login | ❌ | Les données de connexion constituent un traitement |

---

### 1.23 Cookie Consent — `CookieConsent.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Bannière cookie | ✅ | Fixed bottom-right, animé |
| Accepter / Refuser | ✅ | |
| Détail des types de cookies | ✅ | Essential + Analytics |
| Persistance localStorage | ✅ | |
| Intégration gtag consent update | ✅ | |
| **Conformité RGPD** : Refus doit être aussi simple que l'acceptation | ✅ | Boutons équivalents |
| **Conformité RGPD** : Pas de cookies déposés avant consentement | ⚠️ | À vérifier — Si Google Analytics chargé en avance, violation |
| **Manque** : Lien "Gérer mes préférences" granulaire | ❌ | Uniquement accept/decline global |

---

## 2. COMPOSANTS PARTAGÉS (`src/components/`)

### 2.1 Header — `common/Header.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Navigation desktop avec dropdowns | ✅ | 2 groupes + liens directs |
| Navigation mobile Sheet | ✅ | Tous les liens |
| Auth Supabase (Mon Espace / Déconnexion) | ✅ | `onAuthStateChange` |
| Sélecteur de langue | ✅ | `LocaleSwitcher` |
| CTA "Réserver une démo" | ✅ | |
| **Conformité** : Lien "Ateliers" en dropdown OK | ✅ | |
| **Manque** : Lien vers Mentions Légales / CGV dans nav | ❌ | Uniquement dans footer |

---

### 2.2 Footer — `common/Footer.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Navigation 2 colonnes | ✅ | |
| Liens légaux (confidentialité, CGU, mentions) | ✅ | |
| Réseaux sociaux | ⚠️ | Liens `href="#"` non fonctionnels |
| Copyright dynamique | ✅ | `new Date().getFullYear()` |
| **Conformité** : CGV absentes du footer | ❌ | **Obligatoire** — Lien "Conditions Générales de Vente" manquant |

---

### 2.3 WorkshopCard — `workshops/WorkshopCard.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Image catégorie avec fallback | ✅ | `categoryBackgrounds` |
| Badge format (Présentiel/En ligne/Hybride) | ✅ | |
| Badge catégorie coloré | ✅ | 3 couleurs selon `categoryColor` |
| Public cible | ✅ | |
| Titre + description tronquée | ✅ | `line-clamp-3` |
| Durée + prix en pills | ✅ | Avec icônes Clock/Euro |
| 2 premiers objectifs | ✅ | Avec checkmark |
| CTA "Découvrir" | ✅ | Lien vers détail avec locale |
| Hover animation | ✅ | `-translate-y-2 + shadow` |
| `useLocale()` | ✅ | Routing correct |

---

### 2.4 ReservationForm — `reservations/ReservationForm.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Validation Zod complète | ✅ | 8 champs validés |
| Sélecteur atelier | ✅ | |
| Date picker (Calendar shadcn) | ✅ | Dates passées désactivées |
| Consentement RGPD | 🟡 | Case présente mais libellé insuffisant pour mineurs |
| Flow réservation → Stripe | ✅ | API `/api/reservations` puis `/api/stripe/checkout` |
| Redirect Stripe Checkout | ✅ | `window.location.href = url` |
| **Conformité** : Consentement parental obligatoire si mineur | ❌ | Il n'y a pas de champ "âge des participants" qui déclenche la demande de consentement parental |
| **Conformité CGV** : Lien CGV avant soumission | ❌ | **CRITIQUE** — Aucune mention des CGV dans le formulaire |
| **Conformité** : Droit de rétractation mentionné | ❌ | Applicable aux prestations de services |

---

### 2.5 ContactForm — `contact/ContactForm.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Validation Zod + useFormState | ✅ | |
| Server Action | ✅ | `submitContactForm` dans `actions.ts` |
| Reset après succès | ✅ | |
| Toast notifications | ✅ | |
| **Fonctionnel** : Action ne fait que `console.log` | ❌ | **Données jamais envoyées** — Pas d'envoi email, pas de sauvegarde DB |

---

### 2.6 Logo — `common/Logo.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Image `/images/logo.png` | ⚠️ | **Fichier probablement manquant** — `public/images/logo.png` n'est pas dans les sources fournies. L'image signature HTML référence `https://www.ateliers360.fr/logo.png` qui n'existe peut-être pas |
| Texte fallback "Ateliers 360" | ✅ | |

---

### 2.7 Breadcrumbs — `common/Breadcrumbs.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Navigation hiérarchique | ✅ | |
| Support i18n | ✅ | `useTranslations('Navigation')` |
| Icône Home | ✅ | |
| **Accessibilité** : `aria-label="Breadcrumb"` + `aria-current` | 🟡 | `aria-label` présent, `aria-current="page"` absent sur le dernier élément |

---

## 3. INTERNATIONALISATION (`messages/`)

### 3.1 Couverture i18n

| Namespace | EN | FR | Commentaire |
|-----------|----|----|-------------|
| Header | ✅ | ✅ | |
| Footer | ✅ | ✅ | |
| HomePage | ✅ | ✅ | |
| Workshops | ✅ | ✅ | |
| ContactPage | ✅ | ✅ | |
| AboutPage | ✅ | ✅ | |
| Schools | ✅ | ✅ | |
| FormationsPage | ✅ | ✅ | |
| FormationsProPage | ✅ | ✅ | |
| TarifsPage | ✅ | ✅ | |
| BlogPage | ✅ | ✅ | |
| CalendarPage | ✅ | ✅ | |
| ReservationForm | ✅ | ✅ | |
| StagesPage | ✅ | ✅ | |
| ModulesPage | ✅ | ✅ | |
| PacksPage | ✅ | ✅ | |
| DisciplinesPage | ❌ | ✅ | **Namespace `DisciplinesPage` absent de `en.json`** |
| PrivacyPage | ✅ | ✅ | |
| TermsPage | ✅ | ✅ | |
| LegalPage | ✅ | ✅ | |
| AdminAuth | ✅ | ✅ | |
| ReservationSuccessPage | ✅ | ✅ | |
| **CGV** | ❌ | ❌ | **Namespace manquant** — Les CGV ne sont pas dans l'i18n |

---

## 4. SYNTHÈSE FRONTEND

### Points forts

- Architecture Next.js App Router bien structurée avec i18n
- Composants shadcn/ui cohérents
- SEO correctement géré (JSON-LD, generateMetadata, sitemap, robots)
- UX catalogue ateliers soignée avec filtres avancés
- Flow de réservation → Stripe bien pensé

### Problèmes critiques (🔴 Bloquants)

1. **Formulaire `/pour-les-ecoles`** : Données perdues, aucune action
2. **Server Action contact** : `console.log` uniquement, pas d'envoi réel
3. **CGV absentes du site** : Obligatoires légalement, absentes du flow de réservation
4. **Mentions légales non alignées avec la micro-entreprise** : SIRET absent, statut juridique à corriger, régime TVA non clarifié
5. **Consentement parental** dans le form réservation : Insuffisant pour les mineurs
6. **Sous-traitants non déclarés** dans la politique de confidentialité (Stripe, Supabase, Resend)

### Problèmes importants (🟠 À corriger)

7. Logo `/images/logo.png` potentiellement manquant
2. Stats hardcodées (stats accueil, stats à propos) non conformes à la réalité
3. Logos partenaires fictifs dans `packs/page.tsx`
4. Emails de contact mixés (imulabs.fr vs ateliers360.fr) dans `contact/page.tsx`
5. Régime TVA non clarifié dans le calculateur tarifaire
6. `DisciplinesPage` namespace absent de `en.json`
7. Politique de confidentialité sans base légale structurée

### Améliorations UX suggérées (🟡 Optionnelles)

14. Date de mise à jour sur les fiches ateliers
2. Formulaire dédié formations (pas juste `/contact`)
3. Prix des stages vacances non affichés
4. Markdown parser complet pour les articles de blog
5. Lien "Gérer mes préférences cookies" granulaire
