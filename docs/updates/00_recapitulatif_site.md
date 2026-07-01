# Récapitulatif & Plan d'action — Mise à jour site ateliers360.fr

> Document de pilotage à utiliser avec le développeur ou intégrateur du site.  
> Reprend l'ensemble des 19 pages identifiées et hiérarchise les actions.

---

## Vue d'ensemble du site actuel vs cible

| Aspect | Situation actuelle | Situation cible |
|---|---|---|
| Forme juridique | Micro-entreprise | SAS |
| Ancrage géographique | Non précisé / Côte d'Azur | Metz, Grand Est |
| Nombre de pôles | 2 (Ateliers 360 + Passerelle Jeunesse mobilité) | 3 (Ateliers 360 + Passerelle Jeunesse périscolaire + Solutions Numériques) |
| Concept Passerelle Jeunesse | Accompagnement à la mobilité (trajets) | Périscolaire, loisirs éducatifs, stages de vacances |
| Solutions Numériques | Absent du site | Nouvelle page à créer |
| Pages légales | Micro-entreprise, adresse absente | SAS, adresse Metz, RGPD renforcé (mineurs) |
| FAQ | Orientée ancien concept | Refonte complète, 3 pôles |

---

## Tableau de bord des mises à jour

| # | Page | URL | Priorité | Effort | Statut |
|---|---|---|---|---|---|
| 01 | Accueil | `/fr` | 🔴 Haute | Moyen | À faire |
| 02 | Nos activités | `/fr/nos-activites` | 🔴 Haute | Moyen | À faire |
| 03 | Le Projet | `/fr/le-projet` | 🟡 Moyenne | Moyen | À faire |
| 04 | Passerelle Jeunesse | `/fr/passerelle-jeunesse` | 🔴 Haute | Élevé — refonte | À faire |
| 05 | Ateliers | `/fr/ateliers` | 🟡 Moyenne | Moyen | À faire |
| 06 | Modules | `/fr/modules` | 🟢 Basse | Faible | À faire |
| 07 | Packs | `/fr/packs` | 🟡 Moyenne | Faible | À faire |
| 08 | Disciplines | `/fr/disciplines` | 🟢 Basse | Faible | À faire |
| 09 | Tarifs | `/fr/tarifs` | 🔴 Haute | Moyen | À faire |
| 10 | Pour les écoles | `/fr/pour-les-ecoles` | 🟡 Moyenne | Moyen | À faire |
| 11 | FAQ | `/fr/faq` | 🔴 Haute | Élevé — refonte | À faire |
| 12 | Contact | `/fr/contact` | 🟡 Moyenne | Faible | À faire |
| 13 | Solutions Numériques | `/fr/solutions-numeriques` | 🔴 Haute | Élevé — création | À faire |
| 14 | Demander une mission | `/fr/demander-mission` | 🟡 Moyenne | Faible | À faire |
| 15 | Réservation | `/fr/reserver` | 🟡 Moyenne | Faible | À faire |
| 16 | Récompenses | `/fr/recompenses` | 🟢 Basse | Faible | À évaluer |
| 17 | Mentions légales | `/fr/mentions-legales` | 🔴 Haute | Moyen | À faire |
| 18 | CGV | `/fr/cgv` | 🔴 Haute | Élevé | À faire |
| 19 | Politique confidentialité | `/fr/politique-confidentialite` | 🔴 Haute | Élevé | À faire |
| 20 | Conditions d'utilisation | `/fr/conditions-utilisation` | 🟡 Moyenne | Faible | À faire |

---

## Plan d'action priorisé

### 🔴 Phase 1 — Priorité absolue (avant ouverture)

Ces pages sont visibles en premier par les prospects, partenaires et familles.  
Les laisser avec l'ancien contenu nuit à la crédibilité immédiate.

```
1. Mentions légales → mettre à jour forme juridique, adresse, activités
2. Politique de confidentialité → RGPD, données mineurs Passerelle Jeunesse
3. CGV → couvrir les 3 pôles, SAS, nouvelles prestations
4. Accueil → 3 pôles, ancrage Metz, nouveau hero
5. Nos activités → repositionnement Passerelle Jeunesse + ajout Solutions Numériques
6. Passerelle Jeunesse → refonte complète du concept
7. Solutions Numériques → créer la page ex nihilo
8. FAQ → refonte complète 3 pôles
9. Tarifs → recalibrage + grilles PJ et Solutions Numériques
```

---

### 🟡 Phase 2 — Mise à jour dans les 30 jours

```
10. Le Projet → mise à jour vision, feuille de route
11. Pour les écoles → renforcement argumentaire décideur
12. Contact → enrichissement formulaire, canaux par pôle
13. Ateliers → enrichissement catalogue, nouveaux ateliers IA/Cyber/3D
14. Packs → nouveau pack Découverte, vérification prix
15. Demander une mission → vocabulaire, périmètre
16. Réservation → ajout choix de pôle, conditions
```

---

### 🟢 Phase 3 — Optimisation continue

```
17. Modules → ajout modules IA et Éco-numérique
18. Disciplines → ajout IA, cybersécurité, éco-numérique
19. Récompenses → décision conserver ou supprimer
20. Conditions d'utilisation → mise à jour SAS
```

---

## Éléments transversaux à mettre à jour sur toutes les pages

```
✅ Remplacer partout :
• "micro-entreprise" → "SAS" (après immatriculation)
• "Côte d'Azur" / "PACA" / "Nice" → "Metz" / "Grand Est"
• Tout contenu lié à l'ancien concept Passerelle Jeunesse (mobilité/trajets)
• Copyright footer → "© 2026 Ateliers 360 SAS"

✅ Ajouter partout où pertinent :
• Lien vers la nouvelle page /fr/solutions-numeriques
• Zone géographique : "Grand Est — Metz et communes limitrophes"
• Formulaire de contact enrichi (cf. page contact)

✅ SEO — Balises title et meta description à mettre à jour :
• Chaque page doit avoir un title unique incluant le pôle concerné et "Metz Grand Est"
• Aucune page ne doit avoir la même meta description
• Vérifier les balises Open Graph (partage réseaux sociaux)
```

---

## Nouvelles pages à créer (non présentes actuellement)

| Page | URL suggérée | Priorité | Contenu |
|---|---|---|---|
| Solutions Numériques | `/fr/solutions-numeriques` | 🔴 Haute | Cf. fichier 04 |
| Inscription Passerelle Jeunesse | `/fr/inscription-passerelle` | 🟡 Moyenne | Formulaire d'inscription enfant |
| Programme périscolaire | `/fr/programme-passerelle` | 🟡 Moyenne | Planning activités + programme par période |
| Bloom Connect | `/fr/bloom-connect` | 🟢 Basse | Page de présentation app (quand MVP prêt) |
| Blog / Actualités | `/fr/actualites` | 🟢 Basse | Articles, événements, vie du projet |

---

## Points d'attention pour le développeur / intégrateur

```
1. RGPD — Bandeau cookies :
   Vérifier que le bandeau cookies est conforme CNIL 
   (refus aussi simple que l'acceptation).
   Aucun cookie analytics ne doit se charger avant consentement.

2. Formulaires — Protection des données :
   Tous les formulaires doivent avoir :
   • La case RGPD obligatoire cochée par l'utilisateur (opt-in)
   • Un lien vers la politique de confidentialité
   • Une confirmation d'envoi avec délai de réponse affiché

3. Accessibilité numérique (RGAA) :
   En tant que structure recevant des fonds publics potentiellement 
   (collectivités, CAF), le site doit tendre vers le niveau AA du RGAA.
   Au minimum : contraste suffisant, texte alternatif sur les images, 
   navigation clavier possible.

4. Performances :
   Vérifier le score Lighthouse (Google PageSpeed) — viser > 85/100.
   Les images doivent être optimisées (format WebP, lazy loading).

5. Multilingue :
   Le site est actuellement en français (/fr/...). 
   Prévoir dès maintenant une architecture compatible avec 
   l'ajout d'une version anglaise ou allemande 
   (frontaliers luxembourgeois et allemands = cible Bloom Connect).
```

---

## Correspondance fichiers de mise à jour

| Fichier | Contenu |
|---|---|
| `01_accueil.md` | Page d'accueil |
| `02_presentation_poles.md` | Nos activités · Le Projet · Passerelle Jeunesse |
| `03_ateliers_catalogues_tarifs.md` | Ateliers · Modules · Packs · Disciplines · Tarifs |
| `04_pages_fonctionnelles.md` | Pour les écoles · FAQ · Contact · Solutions Numériques · Demander mission · Réserver · Récompenses |
| `05_pages_legales.md` | Mentions légales · CGV · Politique confidentialité · Conditions d'utilisation |
| `00_recapitulatif.md` | Ce fichier — récapitulatif et plan d'action |
