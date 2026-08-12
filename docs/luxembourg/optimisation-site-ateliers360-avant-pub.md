# Documentation d'implémentation — Optimiser le site Ateliers 360 avant de pousser du trafic payant

**Site concerné :** <https://www.ateliers360.fr/fr>
**Objectif du document :** donner à l'équipe technique/marketing une feuille de route actionnable, avec le "quoi", le "où" et le "comment", pour préparer le site avant le lancement de campagnes publicitaires sur les réseaux sociaux.

---

## Sommaire

1. [Aperçus de partage (Open Graph & Twitter Cards)](#1-aperçus-de-partage-open-graph--twitter-cards)
2. [Pixels de suivi (Meta, LinkedIn, Google)](#2-pixels-de-suivi-meta-linkedin-google)
3. [Landing pages dédiées par campagne](#3-landing-pages-dédiées-par-campagne)
4. [Boutons de partage social sur les fiches ateliers](#4-boutons-de-partage-social-sur-les-fiches-ateliers)
5. [Témoignages avec photos/vidéos](#5-témoignages-avec-photosvidéos)
6. [Section actualités / blog](#6-section-actualités--blog)
7. [Mise en avant des chiffres clés](#7-mise-en-avant-des-chiffres-clés)
8. [Plan de mise en œuvre et priorisation](#8-plan-de-mise-en-œuvre-et-priorisation)
9. [KPIs à suivre après implémentation](#9-kpis-à-suivre-après-implémentation)

---

## 1. Aperçus de partage (Open Graph & Twitter Cards)

### Objectif

Quand un lien vers une fiche atelier est partagé sur Facebook, LinkedIn, WhatsApp ou dans une pub, la plateforme doit afficher une image, un titre et une description propres au contenu — pas une image générique ou un aperçu vide. C'est la première chose que voit un parent ou un enseignant avant même de cliquer.

### Pages concernées en priorité

- Chaque fiche atelier individuelle (`/fr/ateliers/[slug]`)
- Chaque article de blog / actualité (`/fr/blog/[slug]`)
- Chaque pack/cycle (`/fr/packs/[slug]`)
- Chaque module pilier (`/fr/modules/[slug]`)
- La page d'accueil et les pages disciplines (`/fr/disciplines`)

### Balises à intégrer dans le `<head>` de chaque page

```html
<!-- Open Graph (Facebook, LinkedIn, WhatsApp) -->
<meta property="og:type" content="website" />
<meta property="og:title" content="Atelier Robotique 6-18 ans — Ateliers 360" />
<meta property="og:description" content="Un atelier clé en main pour construire et programmer un robot, adapté à votre classe ou votre événement." />
<meta property="og:image" content="https://www.ateliers360.fr/og/robotique-atelier.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://www.ateliers360.fr/fr/ateliers/robotique-initiation" />
<meta property="og:site_name" content="Ateliers 360" />
<meta property="og:locale" content="fr_FR" />

<!-- Twitter / X Card (utile aussi pour certains aperçus tiers) -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Atelier Robotique 6-18 ans — Ateliers 360" />
<meta name="twitter:description" content="Un atelier clé en main pour construire et programmer un robot." />
<meta name="twitter:image" content="https://www.ateliers360.fr/og/robotique-atelier.jpg" />
```

### Implémentation selon la stack

**Si le site est en Next.js (App Router)** — probable vu la structure de routes i18n `/fr/...` — utiliser la fonction `generateMetadata` par page dynamique :

```ts
// app/fr/ateliers/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const atelier = await getAtelierBySlug(params.slug); // depuis Supabase
  const image = atelier.image_og_url ?? atelier.image_url ?? '/og/default.jpg';
  const description = (atelier.description || '').slice(0, 155);

  return {
    title: `${atelier.titre} — Ateliers 360`,
    description,
    openGraph: {
      title: atelier.titre,
      description,
      url: `https://www.ateliers360.fr/fr/ateliers/${atelier.slug}`,
      images: [{ url: image, width: 1200, height: 630 }],
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: atelier.titre,
      description,
      images: [image],
    },
  };
}
```

**Si le site est sur un autre framework/CMS** : le principe reste identique — chaque route dynamique doit générer ses propres balises meta à partir des champs déjà présents dans la base Supabase (`titre`, `description`, `categorie`). Un champ `image_og_url` (1200×630px) est à ajouter à la table `ateliers` si absent. Prévoyez aussi un fallback `DEFAULT_OG_IMAGE` pour les contenus qui n'ont pas encore d'image dédiée.

Sur Next.js App Router, pensez à générer `og:locale` dynamiquement (`fr_FR` / `en_US`) selon le paramètre de route. Cela évite les aperçus incorrects sur les réseaux sociaux.

### Génération des images OG

Deux options, à choisir selon les ressources disponibles :

1. **Manuel** : créer un gabarit réutilisable (Canva/Figma, format 1200×630px, couleur de marque `#0d9488`) et l'adapter atelier par atelier — rapide à démarrer, plus lent à maintenir.
2. **Automatisé** : générer dynamiquement l'image OG à partir du titre + de la catégorie via une librairie type `@vercel/og` (si Next.js) — investissement initial plus élevé, zéro maintenance ensuite.

### Validation

Avant mise en ligne, tester **chaque type de page** (atelier, pack, module, accueil) avec :

- Facebook Sharing Debugger : <https://developers.facebook.com/tools/debug/>
- LinkedIn Post Inspector : <https://www.linkedin.com/post-inspector/>
- Twitter Card Validator : <https://cards-dev.twitter.com/validator>

> ⚠️ Ces outils mettent en cache l'ancien aperçu. Utiliser le bouton "Scrape Again"/"Inspect" après chaque modification pour forcer le rafraîchissement.

### Checklist

- [ ] Balises OG + Twitter Card ajoutées sur les templates ateliers, packs, modules et articles de blog
- [ ] Champ `image_og_url` ajouté en base pour chaque atelier
- [ ] Image OG par défaut créée (fallback si un atelier n'a pas encore la sienne)
- [ ] Testé sur les 3 outils de validation ci-dessus

---

## 2. Pixels de suivi (Meta, LinkedIn, Google)

### Objectif

Avant même de lancer une seule campagne payante, poser les pixels permet de commencer à constituer des audiences (visiteurs du site, vues de fiches ateliers) qui pourront être utilisées en retargeting dès le premier jour de campagne — au lieu de repartir de zéro.

### Recommandation : centraliser via Google Tag Manager (GTM)

Plutôt que coller le code de chaque pixel en dur dans le site, passer par un conteneur GTM unique permet d'ajouter/modifier des tags sans redéploiement.

**Étape 1 — Créer le conteneur GTM**

1. Créer un compte sur <https://tagmanager.google.com>
2. Récupérer l'ID conteneur (format `GTM-XXXXXXX`)
3. Installer les deux extraits de code fournis par Google :

```html
<!-- Dans le <head>, le plus haut possible -->
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PBX6VMKW');</script>
<!-- End Google Tag Manager -->

<!-- Juste après l'ouverture de <body> -->
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PBX6VMKW"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

**Étape 2 — Ajouter les tags dans GTM (sans toucher au code du site ensuite)**

| Tag | Où le configurer | Déclencheur |
| --- | --- | --- |
| Google Tag (GA4) | GTM → Nouvelle balise → Google Tag | Toutes les pages |
| Meta Pixel | GTM → Modèle communautaire "Facebook Pixel" ou balise HTML personnalisée | Toutes les pages + événements clés |
| LinkedIn Insight Tag | GTM → balise HTML personnalisée avec le script LinkedIn | Toutes les pages |

### Événements à tracker en priorité (au-delà du simple "PageView")

Ce sont ces événements qui permettront de créer des audiences qualifiées et de mesurer les conversions publicitaires :

| Événement | Déclenché quand | Utilité |
| --- | --- | --- |
| `ViewContent` (Meta) / `view_item` (GA4) | Un visiteur ouvre une fiche atelier | Audience "intéressés par tel atelier/discipline" |
| `Lead` (Meta) / `generate_lead` (GA4) | Le formulaire de contact est soumis | Optimisation de campagne sur les leads |
| `CompleteRegistration` ou événement custom `reservation_start` | Clic sur "Réserver un atelier" | Mesurer l'intention de réservation |
| `Purchase`/conversion custom | Réservation confirmée (si paiement/validation en ligne) | Mesurer le ROI réel des campagnes |

### Conformité RGPD (obligatoire — audience France/Luxembourg/Belgique)

Les pixels ne doivent se déclencher **qu'après consentement**, via une bannière cookies (CMP) conforme RGPD :

- Mettre en place un bandeau de consentement (ex. Axeptio, Cookiebot, ou solution GTM + Consent Mode v2 de Google)
- Bloquer le chargement de GTM/Meta Pixel/LinkedIn Tag tant que le consentement "marketing" n'est pas donné
- Charger le conteneur GTM uniquement après consentement, puis envoyer un événement `cookieConsentChange` ou `consent_granted` pour activer les tags côté tag manager
- Mettre à jour la page "Politique de confidentialité" existante pour mentionner les cookies publicitaires utilisés

### Checklist

- [ ] Conteneur GTM installé sur toutes les pages
- [ ] Bandeau de consentement cookies conforme RGPD en place
- [ ] Google Tag (GA4), Meta Pixel, LinkedIn Insight Tag configurés dans GTM
- [ ] Événements `ViewContent`, `Lead`, conversion de réservation configurés et testés
- [ ] Testé avec Meta Pixel Helper (extension Chrome) et l'outil de test GTM (mode aperçu)
- [ ] Politique de confidentialité mise à jour

---

## 3. Landing pages dédiées par campagne

### Objectif

Envoyer tout le trafic publicitaire vers la page catalogue générale dilue le message et complique la mesure. Une landing page par campagne permet un message unique, une mesure propre, et un meilleur taux de conversion.

### Structure recommandée d'une landing page

1. **Hero** : un seul message, aligné avec l'accroche de la pub (ex. "Ateliers Robotique — rentrée 2026")
2. **Proposition de valeur** : 3 bénéfices concrets, courts
3. **Preuve sociale** : témoignage(s) + chiffres clés (voir section 7)
4. **Détails pratiques** : âge, durée, format (présentiel/hybride/distanciel), tarif
5. **CTA unique et répété** : "Réserver cet atelier" — éviter les liens concurrents (pas de menu complet qui distrait)
6. **FAQ courte** : 3-4 questions qui lèvent les freins habituels
7. **Formulaire de contact/réservation** en bas de page

### Convention de nommage des URLs

Utiliser un pattern cohérent et lisible, par campagne :

```
/fr/campagnes/robotique-rentree-2026
/fr/campagnes/ecologie-ete-2026
/fr/campagnes/portes-ouvertes-luxembourg
```

### Paramètres UTM à utiliser sur chaque lien publicitaire

Pour que Google Analytics/GA4 distingue précisément l'origine du trafic :

```
https://www.ateliers360.fr/fr/campagnes/robotique-rentree-2026
  ?utm_source=facebook
  &utm_medium=paid-social
  &utm_campaign=robotique_rentree_2026
  &utm_content=video-demo-v1
```

| Paramètre | Exemple de valeurs |
| --- | --- |
| `utm_source` | `facebook`, `instagram`, `linkedin`, `google` |
| `utm_medium` | `paid-social`, `cpc`, `organic-social` |
| `utm_campaign` | `robotique_rentree_2026`, `portes_ouvertes_lux` |
| `utm_content` | pour distinguer 2 créas différentes d'une même campagne |

> Astuce : construire ces liens avec un outil comme le Campaign URL Builder de Google, pour éviter les erreurs de frappe qui cassent le tracking.

### Checklist par landing page

- [ ] Un seul CTA principal, répété au moins 2 fois sur la page
- [ ] Menu de navigation allégé ou masqué (limite les sorties)
- [ ] Balises OG spécifiques à la campagne (voir section 1)
- [ ] Liens publicitaires taggués en UTM
- [ ] Formulaire connecté au même pipeline de leads que le reste du site

---

## 4. Boutons de partage social sur les fiches ateliers

### Objectif

Faciliter le partage organique par les enseignants/parents déjà convaincus — chaque partage est une recommandation gratuite.

### Réseaux à inclure en priorité

- Facebook
- LinkedIn
- WhatsApp (très utilisé dans les échanges parents/enseignants)
- Email
- "Copier le lien"

### Exemple de composant (React générique, adaptable à la stack du site)

```tsx
function ShareButtons({ url, title }: { url: string; title: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
  };

  return (
    <div className="share-buttons">
      <a href={links.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
      <a href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href={links.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <a href={links.email}>Email</a>
      <button onClick={() => navigator.clipboard.writeText(url)}>Copier le lien</button>
    </div>
  );
}
```

### Emplacement recommandé

- Juste sous le titre de la fiche atelier (visible sans scroller)
- Répété en bas de page, après la description complète

### Checklist

- [ ] Composant de partage ajouté sur les templates atelier, pack, module
- [ ] Liens testés (ouvrent bien un pré-remplissage correct sur chaque réseau)
- [ ] Fonctionne sur mobile (la version mobile du site est actuellement limitée — voir note ci-dessous)

> ℹ️ Note : la version mobile actuelle du catalogue ("Cette page est disponible uniquement sur ordinateur") limite fortement le partage et la conversion mobile, alors qu'une bonne partie du trafic publicitaire arrivera depuis des téléphones. À évaluer en priorité avant de lancer les campagnes.

---

## 5. Témoignages avec photos/vidéos

### Objectif

La preuve sociale (écoles, enseignants, familles) rassure davantage qu'une description technique de l'atelier — surtout pour un premier contact via publicité.

### Processus de collecte

1. Envoyer un court formulaire post-atelier aux enseignants/référents (note + citation courte + autorisation)
2. **Point d'attention obligatoire** : les ateliers s'adressent à des 6-18 ans. Toute photo/vidéo/témoignage impliquant un mineur nécessite une **autorisation écrite du représentant légal** (droit à l'image), distincte de l'autorisation de participation à l'atelier. Prévoir un formulaire de consentement dédié, avec mention de la durée d'utilisation et des supports (site, réseaux sociaux, publicité).
3. Privilégier, quand c'est possible, les témoignages d'adultes (enseignants, responsables d'établissement, parents) qui ne posent pas cette contrainte, en complément des retours élèves anonymisés.

### Format recommandé pour chaque témoignage

- Nom, rôle, établissement (ex. "Julie R., professeure de technologie, Collège X")
- Photo ou courte vidéo (10-20 secondes suffisent pour du contenu social)
- Citation courte (1-2 phrases), pas un pavé

### Emplacement sur le site

- Fiches ateliers concernées
- Page d'accueil (bloc dédié, une section "Pourquoi choisir Ateliers 360 Lab" existe déjà et peut l'accueillir)
- Landing pages de campagne (section "preuve sociale", voir section 3)

### Marquage SEO (optionnel mais utile)

Ajouter un balisage Schema.org `Review`/`AggregateRating` sur les pages concernées pour améliorer l'affichage dans les résultats Google :

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": { "@type": "Service", "name": "Atelier Robotique 6-18 ans" },
  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
  "author": { "@type": "Person", "name": "Julie R." },
  "reviewBody": "Un atelier concret, les élèves étaient captivés du début à la fin."
}
</script>
```

### Checklist

- [ ] Formulaire de collecte de témoignages créé
- [ ] Formulaire de consentement image mineur créé et validé (juridique si besoin)
- [ ] Au moins 3-5 témoignages collectés avant le lancement des campagnes
- [ ] Témoignages intégrés sur accueil + fiches ateliers concernées + landing pages

---

## 6. Section actualités / blog

### Objectif

Chaque atelier réalisé peut devenir un article, qui sert à la fois le SEO du site et de matière première recyclable en post social — au lieu de créer du contenu social "à part".

### Structure type d'un article de blog "atelier réalisé"

1. Titre concret (ex. "Retour sur l'atelier Robotique au Collège X — Luxembourg")
2. Contexte : établissement, âge des élèves, discipline
3. Déroulé de l'atelier en quelques paragraphes + photos
4. Ce que les élèves ont produit/appris
5. Citation d'un enseignant ou d'un élève (voir section 5)
6. CTA en fin d'article : "Vous voulez organiser cet atelier dans votre établissement ?" → lien vers la fiche atelier correspondante ou le formulaire de contact

### Fréquence recommandée

1 à 2 articles par mois pour commencer, alignés sur les ateliers réellement réalisés — la régularité compte plus que le volume.

### Bonnes pratiques SEO on-page (rapides à appliquer)

- Un seul `<h1>` par article, titre descriptif (pas juste "Atelier du 12 mars")
- Meta description unique par article (150-160 caractères)
- Attribut `alt` descriptif sur chaque image (utile aussi pour l'accessibilité)
- Lien interne vers la fiche atelier/discipline concernée

### Réutilisation en contenu social

Chaque article publié peut directement alimenter :

- Un post LinkedIn (angle impact/résultats)
- Un carrousel Instagram (les meilleures photos + les points clés)
- Une story Facebook avec lien vers l'article

### Checklist

- [ ] Section blog/actualités créée sur le site (si absente)
- [ ] Gabarit d'article défini (structure ci-dessus)
- [ ] Premier calendrier éditorial établi (1-2 articles/mois)
- [ ] Process de "recyclage" de chaque article en 2-3 posts sociaux formalisé

---

## 7. Mise en avant des chiffres clés

### Objectif

Les chiffres déjà affichés sur la page d'accueil (500+ élèves touchés, 20+ partenaires, 150+ ateliers réalisés) sont un argument de crédibilité fort, en particulier pour les créas publicitaires B2B (écoles, collectivités) et LinkedIn. Ils gagnent à être visibles à plus d'endroits, pas seulement sur l'accueil.

### Emplacements recommandés

- En haut des landing pages de campagne (juste sous le hero)
- Sur la page "Pour les écoles" (argument de réassurance pour un décideur)
- En pied de page globale (bannière discrète mais toujours visible)
- Repris tels quels dans les créas publicitaires (visuels + accroches)

### Statique vs dynamique

- **Court terme** : chiffres mis à jour manuellement (trimestriel), suffisant pour démarrer
- **Plus tard** : si ces données existent déjà dans Supabase (nombre d'ateliers réalisés, etc.), envisager un compteur alimenté automatiquement pour rester à jour sans intervention manuelle

### Checklist

- [ ] Bloc chiffres clés dupliqué sur les landing pages de campagne
- [ ] Bloc chiffres clés ajouté sur la page "Pour les écoles"
- [ ] Chiffres synchronisés avec la réalité (process de mise à jour trimestrielle défini)

---

## 8. Plan de mise en œuvre et priorisation

| # | Action | Priorité | Effort estimé | Bloquant pour lancer les pubs ? |
| --- | --- | --- | --- | --- |
| 2 | Pixels de suivi + consentement RGPD | Haute | Moyen | **Oui** — sans ça, pas de mesure ni de retargeting |
| 1 | Balises Open Graph | Haute | Faible-Moyen | **Oui** — impacte directement le taux de clic des posts/pubs |
| 3 | Landing pages de campagne | Haute | Moyen-Élevé | Recommandé avant la 1ère campagne payante |
| 4 | Boutons de partage social | Moyenne | Faible | Non, mais rapide à faire |
| 5 | Témoignages avec consentement | Moyenne | Moyen (dépend de la collecte) | Non, mais renforce fortement la conversion |
| 6 | Section actualités/blog | Moyenne | Moyen-Élevé | Non, effet à moyen terme (SEO + contenu recyclable) |
| 7 | Mise en avant des chiffres | Faible | Faible | Non, rapide à généraliser |

**Ordre de mise en œuvre suggéré :**

1. Pixels + consentement RGPD (fondation technique)
2. Balises Open Graph (impact immédiat sur tout partage/pub)
3. Première landing page pilote (sur la prochaine campagne prévue)
4. Boutons de partage + mise en avant des chiffres (rapides, en parallèle)
5. Collecte de témoignages (en continu)
6. Section blog (dès que le rythme de publication peut être tenu)

---

## 9. KPIs à suivre après implémentation

| Indicateur | Où le mesurer | Ce qu'il révèle |
| --- | --- | --- |
| Taux de clic (CTR) sur les posts/pubs partagés | Meta Ads Manager / LinkedIn Campaign Manager | Qualité des aperçus OG + des accroches |
| Taux de conversion landing page → formulaire | GA4 (événement `Lead`) | Pertinence du message par campagne |
| Coût par lead (CPL) | Meta Ads Manager / LinkedIn Campaign Manager | Efficacité globale des campagnes |
| Taille des audiences de retargeting | Meta Ads Manager (audience "Visiteurs du site") | Volume disponible pour les campagnes de relance |
| Trafic organique issu du blog | GA4 (source `organic search`) | Retour SEO du contenu publié |

---

*Document à faire évoluer au fil de l'implémentation — chaque section peut être détachée et assignée séparément (dev, marketing, juridique pour le consentement image).*
