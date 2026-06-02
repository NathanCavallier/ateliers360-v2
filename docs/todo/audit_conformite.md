# 🔍 AUDIT CONFORMITÉ RÉGLEMENTAIRE — Ateliers 360

**Date** : Avril 2026 | **Périmètre** : Droit commercial, RGPD, Droit de la consommation, Droit du travail éducatif

> ⚠️ Ce document est un audit technique de conformité. Il ne constitue pas un avis juridique.
> Pour toute décision légale, consulter un avocat spécialisé en droit des affaires / numérique.

---

## Légende des statuts

| Icône | Statut | Signification |
|-------|--------|---------------|
| ✅ | **CONFORME** | Exigence satisfaite |
| 🟡 | **PARTIEL** | Exigence partiellement satisfaite |
| ❌ | **NON CONFORME** | Exigence manquante ou incorrecte |
| ⚠️ | **À VÉRIFIER** | Dépend de facteurs externes non auditables ici |

---

## 1. DROIT COMMERCIAL & IDENTIFICATION

### 1.1 Mentions légales obligatoires (Loi pour la Confiance en l'Économie Numérique — LCEN 2004)

| Exigence | Statut | Constat | Référence |
|----------|--------|---------|-----------|
| Nom/dénomination sociale | 🟡 | Le site mentionne encore "Ateliers 360, SASU" ; à remplacer par l'identité réelle de l'entrepreneur individuel exploitant Ateliers 360 | LCEN Art. 6 |
| Forme juridique | ❌ | SASU mentionné alors que la stratégie retenue est un démarrage en entrepreneur individuel au regime micro-entreprise | |
| Adresse du siège social | ❌ | `[À compléter]` dans mentions légales | LCEN Art. 6 |
| Numéro SIREN/SIRET | ❌ | `________________` non renseigné | LCEN Art. 6 |
| Capital social (si société) | ✅ | Non applicable a une micro-entreprise : aucune mention de capital social n'est requise | LCEN Art. 6 |
| N° TVA intracommunautaire | 🟡 | A afficher uniquement si assujetti a la TVA ; sinon la mention de franchise en base doit etre prevue sur les devis/factures et, si pertinent, sur le site | LCEN Art. 6 |
| Directeur de publication | ✅ | Nathan Imogo | |
| Hébergeur identifié | ✅ | Vercel Inc. avec adresse | |
| Email de contact | ✅ | `contact@ateliers360.fr` | |
| RC Pro mentionnée | 🟡 | Mentionnée mais assureur non nommé | |
| Numéro de police RC Pro | ❌ | `[À compléter]` | |

**⚠️ Risque** : le site cumule un mauvais statut juridique affiche (SASU) et l'absence de SIRET/SIREN. Ce decalage fragilise les documents commerciaux et la credibilite de lancement.

---

### 1.2 Conditions Générales de Vente (Art. L441-1 Code de Commerce + Art. L111-1 Code de la Consommation)

| Exigence | Statut | Constat |
|----------|--------|---------|
| CGV accessibles depuis le site | ❌ | **Les CGV existent (`conditions_generales_vente.docx`) mais ne sont PAS publiées sur le site web** |
| CGV acceptées avant toute commande | ❌ | Le formulaire de réservation ne demande pas l'acceptation des CGV |
| Durée de validité des devis | ❌ | "30 jours" dans le document CGV mais non visible sur le site |
| Politique d'annulation sur le site | ❌ | Les pénalités d'annulation (Article 8 des CGV) ne sont pas visibles |
| Droit de rétractation (14 jours) | ❌ | Non mentionné. Pour les prestations de services, des exceptions s'appliquent mais doivent être explicitées |
| Modalités de paiement | 🟡 | Mentionné dans la page tarifs mais incomplet |
| Prix HT/TTC clairement distingués | ⚠️ | Les tarifs de l'offre commerciale sont "HT" mais la page tarifs ne le précise pas partout |

**⚠️ Risque** : L'absence de CGV accessibles et acceptées lors de la réservation peut rendre les contrats inopposables au client.

---

### 1.3 Facturation & Comptabilité

| Exigence | Statut | Constat |
|----------|--------|---------|
| Mentions légales sur les devis | ⚠️ | Template `modele_devis.docx` correct mais génération non automatisée |
| Mentions légales sur les factures | ⚠️ | Template `modele_facture.docx` correct mais génération non automatisée |
| Numérotation factures séquentielle | ⚠️ | Format `FAC-2025-______` prévu mais non implémenté dans l'app |
| Conservation des factures 10 ans | ⚠️ | Dépend du système de stockage — Non vérifié |
| TVA correctement gérée selon le regime | ⚠️ | En micro-entreprise, il faut aligner le site, Stripe, les devis et les factures sur le regime retenu : franchise en base ou assujettissement a la TVA | 
| Pénalités de retard paiement légales | ✅ | Mentionnées dans les templates (taux légal + 5pts + 40€ forfait) |

---

## 2. RGPD (Règlement UE 2016/679)

### 2.1 Registre des traitements (Art. 30 RGPD)

| Traitement | Base légale déclarée | Durée conservation | Statut |
|-----------|---------------------|-------------------|--------|
| Réservations clients | Exécution du contrat (6.1.b) | ? | ❌ Non défini dans l'app |
| Données participants ateliers | Exécution du contrat (6.1.b) | 1 an scolaire | 🟡 Dans `charte_rgpd_participant.docx` seulement |
| Formulaire de contact | Intérêt légitime (6.1.f) | ? | ❌ Non défini |
| Paiements Stripe | Obligation légale (6.1.c) | 5-10 ans comptables | ❌ Non défini |
| Emails transactionnels (Resend) | Exécution du contrat | Durée prestation | ❌ Non défini |
| Logs de navigation (analytics) | Consentement (6.1.a) | ? | ❌ Non défini |
| Données admin (auth NextAuth) | Intérêt légitime | Durée emploi | ❌ Non défini |

**⚠️ Obligation** : L'Article 30 RGPD impose la tenue d'un registre des traitements. Ce registre n'est pas visible dans le projet.

---

### 2.2 Information des personnes (Arts. 13-14 RGPD)

| Point d'information | Statut | Constat |
|--------------------|--------|---------|
| Politique de confidentialité publiée | ✅ | `/politique-confidentialite` |
| Identité du responsable de traitement | ✅ | Ateliers 360 mentionné |
| Finalités des traitements | 🟡 | Listées mais sans base légale structurée |
| Destinataires des données | ❌ | **Sous-traitants non listés** : Stripe (EU/US), Supabase (EU/US), Resend, Vercel |
| Transferts hors UE | ❌ | Stripe (US), Supabase (US via Fly.io), Vercel (US) — Doivent être déclarés avec les garanties (DPA, SCCs) |
| Droits des personnes | ✅ | 5 droits listés |
| Contact DPO | ✅ | `rgpd@ateliers360.fr` et `dpo@ateliers360.fr` |
| Délai de réponse | ✅ | "30 jours" mentionné |
| Recours CNIL | ✅ | |
| **Mineurs** : Information spécifique | 🟡 | Section dans la politique mais formulaire de réservation insuffisant |

---

### 2.3 Consentement (Art. 7 RGPD)

| Point | Statut | Constat |
|-------|--------|---------|
| Consentement cookies analytiques | 🟡 | Bannière présente mais conformité du dépôt avant consentement non vérifiable sans accès en live |
| Consentement photo/droit à l'image | ❌ | La `charte_rgpd_participant.docx` existe mais n'est PAS intégrée dans l'app ni dans le flow de réservation |
| Consentement newsletters | ❌ | Pas de case newsletter dans aucun formulaire, mais si emails marketing envoyés, consentement requis |
| Retrait du consentement | ✅ | "À tout moment" mentionné dans la politique |
| Preuve du consentement | ❌ | Pas de log/horodatage des consentements en base de données |

---

### 2.4 Sécurité des données (Art. 32 RGPD)

| Mesure | Statut | Constat |
|--------|--------|---------|
| HTTPS | ✅ | Via Vercel (Let's Encrypt) |
| Authentification admin sécurisée | ❌ | **Mot de passe en clair comparé** (`"admin123"`) — Violation Art. 32 |
| RLS Supabase (données isolées) | ✅ | Row Level Security configuré |
| Chiffrement des données en transit | ✅ | TLS via Supabase et Vercel |
| Chiffrement au repos | ✅ | Supabase chiffre les données au repos |
| Clés API dans variables d'environnement | ✅ | `.env.local` non commité (`.gitignore`) |
| Tests de pénétration | ❌ | Non documenté |
| Plan de réponse aux incidents | ❌ | Pas de procédure documentée |
| Notification CNIL en cas de violation (72h) | ⚠️ | Pas de procédure — Obligation légale |

---

### 2.5 Droits des personnes — Exercice effectif

| Droit | Disponible | Mécanisme | Statut |
|-------|-----------|-----------|--------|
| Droit d'accès | ❌ | Email `rgpd@ateliers360.fr` — Pas de portail self-service | 🟡 |
| Droit de rectification | ❌ | Idem | 🟡 |
| Droit à l'effacement | ❌ | Idem — Pas de bouton "Supprimer mon compte" | ❌ |
| Droit à la portabilité | ❌ | Idem — Pas d'export automatique | ❌ |
| Droit d'opposition | ❌ | Idem | 🟡 |
| Délai de traitement 30 jours | ⚠️ | Mentionné dans la politique mais non procédurisé |

---

### 2.6 Sous-traitants & DPA (Art. 28 RGPD)

| Sous-traitant | Rôle | DPA signé | Déclaré sur site | Pays |
|---------------|------|-----------|------------------|------|
| **Supabase** | Base de données + Auth | ⚠️ À vérifier | ❌ | US (hebergement EU possible) |
| **Stripe** | Paiements | ⚠️ Stripe a un DPA | ❌ | US |
| **Resend** | Emails transactionnels | ⚠️ À vérifier | ❌ | US |
| **Vercel** | Hébergement | ⚠️ Vercel a un DPA | ❌ | US |
| **Google (Gemini/Imagen)** | IA générative | ⚠️ À vérifier | ❌ | US |
| **Google Analytics** | Analytics (si utilisé) | ⚠️ À vérifier | ❌ | US |

**⚠️ Risque RGPD** : Les transferts vers des sous-traitants US doivent s'appuyer sur les Clauses Contractuelles Types (SCCs) ou le Data Privacy Framework UE-US. Tous les sous-traitants doivent être déclarés aux utilisateurs.

---

## 3. PROTECTION DES MINEURS

### 3.1 Collecte de données concernant les mineurs

| Exigence | Statut | Constat |
|----------|--------|---------|
| Consentement parental pour < 15 ans | ❌ | Le formulaire de réservation n'identifie pas si les participants sont mineurs |
| Droit à l'image des mineurs | ❌ | La `charte_rgpd_participant.docx` prévoit un formulaire — Non intégré dans l'app |
| Données minimisées pour les mineurs | 🟡 | Seuls prénom et niveau sont collectés dans la charte — Mais le form réservation collecte plus |
| Autorisation parentale pour ateliers | ❌ | Aucun mécanisme dans l'app |
| Casier judiciaire vierge de l'intervenant | ✅ | Mentionné dans le dossier de présentation |
| Signalement obligatoire incidents mineurs | ⚠️ | Pas de procédure documentée |

**⚠️ Risque** : La CNIL est particulièrement vigilante sur les traitements concernant des mineurs. L'absence de consentement parental pour les < 15 ans est une violation directe du RGPD.

---

### 3.2 Sécurité des mineurs dans les ateliers

| Point | Statut | Constat |
|-------|--------|---------|
| RC Pro couvrant les dommages corporels | 🟡 | Mentionnée mais attestation non publiée |
| Ratio animateur/enfant respecté | ✅ | "1 animateur pour 15 élèves max" — Documenté |
| Procédure d'urgence | ❌ | Checklist matériel mentionne "trousse de secours" mais pas de procédure d'urgence digitalisée |
| Vérification antécédents intervenants | 🟡 | Mentionné dans le dossier — Pas de procédure automatisée |

---

## 4. DROIT DU NUMÉRIQUE & E-COMMERCE

### 4.1 Accessibilité numérique (RGAA)

| Exigence | Statut | Constat |
|----------|--------|---------|
| Déclaration d'accessibilité | ❌ | Absente — Obligatoire pour les services publics, recommandée pour tous |
| Contraste des couleurs (WCAG 2.1 AA) | ⚠️ | Non vérifié sans audit en conditions réelles |
| Navigation clavier | ⚠️ | shadcn/ui implémente `focus-visible` mais non testé exhaustivement |
| Textes alternatifs sur les images | 🟡 | `alt` souvent génériques ("Atelier détail", "Hero background") |
| Formulaires labellisés | ✅ | `<Label htmlFor>` utilisé systématiquement |
| `aria-label` sur les boutons icône | 🟡 | Certains boutons (réseaux sociaux dans contact) ont `title` mais pas `aria-label` |
| RGAA 4.1 — Critères niveau A | ⚠️ | Non audité — L'atelier 15 "Accessibilité numérique" du catalogue devrait s'appliquer à ce site |

---

### 4.2 Loi sur les Fake Reviews (DPDE 2023)

| Exigence | Statut | Constat |
|----------|--------|---------|
| Avis clients vérifiés | ✅ | Pas d'avis clients affichés (pas de risque actuel) |
| Témoignages clairement identifiés | ✅ | Pas de verbatims clients actuellement |
| Stats marketing honnêtes | ⚠️ | "1000+ élèves", "50+ écoles" sont des **objectifs non vérifiés affichés comme des faits** |

---

### 4.3 Loi Élan & Affichage des prix

| Exigence | Statut | Constat |
|----------|--------|---------|
| Prix TTC visibles pour les consommateurs | ⚠️ | L'offre commerciale est HT (B2B) mais si des particuliers achètent, les prix TTC doivent être affichés |
| TVA applicable mentionnée | 🟡 | Le calculateur et les supports commerciaux doivent indiquer clairement soit le regime TVA applicable, soit la franchise en base de TVA si la micro-entreprise n'est pas assujettie |
| Réductions clairement calculées | ✅ | -10% et -15% calculés et affichés dans le calculateur |

---

### 4.4 Pratiques commerciales déloyales (Directive UE 2019/2161)

| Pratique | Statut | Constat |
|----------|--------|---------|
| Urgence artificielle | ✅ | Pas de faux compteurs de stock |
| Faux badges de certification | ⚠️ | Qualiopi "en cours" doit être clairement distingué d'une certification obtenue |
| Logos partenaires fictifs | ❌ | "ACADEMIE", "ECOLE PRO", "MAIRIE" dans `packs/page.tsx` constituent une pratique commerciale trompeuse |

---

## 5. PROPRIÉTÉ INTELLECTUELLE

### 5.1 Images et médias

| Élément | Statut | Constat |
|---------|--------|---------|
| Images Unsplash | ✅ | Licence Unsplash — Usage commercial gratuit |
| Attribution Unsplash | 🟡 | Non requise par la licence Unsplash mais bonne pratique |
| Images générées par IA (Imagen) | ⚠️ | Les droits sur les images générées par IA sont encore mal définis légalement en France |
| Logo Ateliers 360 | ⚠️ | Référencé mais probablement non déposé comme marque |
| Contenu des fiches ateliers | ✅ | Propriété d'Ateliers 360 selon les CGV |

---

### 5.2 Code et licences tierces

| Composant | Licence | Statut |
|-----------|---------|--------|
| Next.js | MIT | ✅ |
| shadcn/ui | MIT | ✅ |
| Tailwind CSS | MIT | ✅ |
| Lucide React | ISC | ✅ |
| date-fns | MIT | ✅ |
| Stripe SDK | Apache 2.0 | ✅ |
| Supabase JS | MIT | ✅ |
| bcrypt | MIT | ✅ |
| **Genkit** | Apache 2.0 | ✅ |

---

## 6. CONFORMITÉ SECTEUR ÉDUCATIF

### 6.1 Agrément et certification (Éducation Nationale)

| Exigence | Statut | Constat |
|----------|--------|---------|
| Extrait casier judiciaire (bulletin n°3) vierge | 🟡 | Mentionné dans le dossier de présentation — "disponible sur demande" |
| RC Pro attestée | 🟡 | Mentionnée — "attestation fournie sur demande" |
| Référencement DANE Nancy-Metz | ❌ | Dans le plan de lancement mais non réalisé |
| Agrément association éducative | ⚠️ | Non lie au choix micro-entreprise vs SASU ; verifier au cas par cas selon les dispositifs et les etablissements partenaires |
| Code APE 8559A ou 8560Z | ✅ | Mentionné dans les CGV |
| Numéro de déclaration formation | ❌ | Requis si formation professionnelle (Code du Travail L6351-1). À obtenir auprès du DREETS |

---

### 6.2 Conformité avec l'Académie Nancy-Metz

| Exigence | Statut | Constat |
|----------|--------|---------|
| Convention de partenariat signée | 🟡 | Template mentionné — Pas d'interface de gestion dans l'app |
| Bilan pédagogique post-atelier | ❌ | Prévu dans le dossier ("sous 5 jours") mais non implémenté dans l'app |
| Respect du règlement intérieur des établissements | ⚠️ | Responsabilité partagée — Mentionné dans les CGV (Article 7) |

---

## 7. PLAN DE MISE EN CONFORMITÉ PRIORITAIRE

### 🔴 Priorité 1 — Immédiat (avant toute activité commerciale)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1 | **Corriger les mentions légales pour une micro-entreprise** : identite de l'entrepreneur individuel, SIRET, adresse, RC Pro, TVA si applicable | Légal LCEN | 1h |
| 2 | **Publier les CGV sur le site** + lien dans le footer | Légal C. Commerce | 2h |
| 3 | **Ajouter case d'acceptation CGV** dans le formulaire de réservation | Légal | 1h |
| 4 | **Corriger l'auth admin** : utiliser `bcrypt.compare` au lieu de la comparaison en clair | Sécurité RGPD | 2h |
| 5 | **Générer et stocker `NEXTAUTH_SECRET`** sécurisé | Sécurité | 30min |
| 6 | **Supprimer les identifiants hardcodés** de la page login (MVP hint) | Sécurité | 15min |
| 7 | **Déclarer les sous-traitants** dans la politique de confidentialité | RGPD Art. 13 | 2h |
| 8 | **Supprimer les logos partenaires fictifs** de `packs/page.tsx` | Droit conso | 30min |
| 9 | **Valider les modeles de devis et facture pour la micro-entreprise** : identite EI, SIRET, RC Pro, TVA si applicable | Commercial | 1h |

---

### 🟠 Priorité 2 — Court terme (≤ 1 mois)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 9 | **Intégrer la charte RGPD participants** dans le flow réservation (avec case consentement parental si mineurs) | RGPD mineurs | 1 jour |
| 10 | **Créer table `contact_requests`** en Supabase + connecter le Server Action | Commercial | 2h |
| 11 | **Corriger les emails** : remplacer `imulabs.fr` par `ateliers360.fr` dans les templates | Identité marque | 1h |
| 12 | **Corriger `sitemap.ts` et `robots.ts`** : `ateliers360.fr` au lieu de `imulabs.fr` | SEO | 30min |
| 13 | **Activer la locale par défaut `fr`** dans `routing.ts` | UX + cohérence | 15min |
| 14 | **Corriger le formulaire `/pour-les-ecoles`** : ajouter Server Action ou API | Commercial | 3h |
| 15 | **Clarifier le regime TVA** dans le calculateur tarifaire et les pages commerciales ("TVA non applicable, art. 293 B du CGI" si franchise en base, sinon HT/TTC) | Légal | 1h |
| 16 | **Obtenir le numéro de déclaration de prestataire de formation** auprès du DREETS | Légal formation | Démarche externe |

---

### 🟡 Priorité 3 — Moyen terme (1-3 mois)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 17 | Créer un **registre des traitements** RGPD documenté | RGPD Art. 30 | 1 jour |
| 18 | **Structurer la politique de confidentialité** par base légale et ajouter durées de conservation | RGPD Art. 13 | 3h |
| 19 | Signer des **DPA avec Supabase, Stripe, Resend, Vercel** | RGPD Art. 28 | 1 semaine |
| 20 | Implémenter **génération PDF devis/factures** dans l'app admin | Commercial | 3 jours |
| 21 | Créer une **procédure de réponse aux violations de données** (72h CNIL) | RGPD Art. 33 | 2h |
| 22 | Audit **accessibilité RGAA** complet sur les pages principales | RGAA | 2 jours |
| 23 | Implémenter la **suppression de compte** self-service | RGPD Art. 17 | 1 jour |
| 24 | Corriger les **statistiques marketing** (1000+ élèves, etc.) pour refléter la réalité | Droit conso | 30min |

---

## 8. TABLEAU DE BORD CONFORMITÉ

```
DROIT COMMERCIAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Mentions légales          ██░░░░░░░░  40%
CGV sur le site           ░░░░░░░░░░   0%
Facturation               ██████░░░░  60%

RGPD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Information utilisateurs  ██████░░░░  60%
Consentements             ████░░░░░░  40%
Sécurité des données      ████░░░░░░  40%
Sous-traitants            ██░░░░░░░░  20%
Droits des personnes      ████░░░░░░  40%
Mineurs                   ██░░░░░░░░  20%

SECTEUR ÉDUCATIF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RC Pro + casier           ██████░░░░  60%
Déclaration formation     ░░░░░░░░░░   0%
Conformité académique     ████░░░░░░  40%

SCORE GLOBAL ESTIMÉ : ≈ 37%
```

**Objectif cible avant premiers ateliers : ≥ 70%**
**Objectif cible avant développement commercial fort : ≥ 85%**
