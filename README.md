# 🔵 Ateliers 360

## 🧭 Présentation générale

**Ateliers 360** est un projet éducatif et entrepreneurial proposant des **ateliers et formations autour des sciences, du numérique, de la robotique et de l’intelligence artificielle**, à destination de publics variés : jeunes, étudiants, adultes, associations, centres de formation et structures éducatives.

Le projet vise à **rendre accessibles des sujets souvent perçus comme complexes**, en privilégiant une approche pédagogique basée sur la compréhension, l’expérimentation et l’esprit critique.

---

## 🎯 Objectifs du projet

Ateliers 360 poursuit plusieurs objectifs complémentaires :

- **Démystifier les technologies modernes** (informatique, IA, robotique, numérique).
- Donner des **bases solides de compréhension**, plutôt que des connaissances superficielles.
- Favoriser la **curiosité scientifique**, la logique et l’autonomie.
- Accompagner les publics face aux **enjeux sociétaux du numérique** (IA, réseaux sociaux, données, esprit critique).
- Proposer une offre **flexible et adaptée aux besoins concrets** des structures éducatives et associatives.
- Générer une **activité économique viable**, permettant de financer le développement d’autres projets numériques, notamment **ImuChat**.

---

## 👥 Publics concernés

Ateliers 360 s’adresse à un public large, avec des formats adaptés :

- **Jeunes (primaire, collège, lycée)**
  Découverte des sciences, initiation au code, robotique, culture numérique.

- **Étudiants et jeunes adultes**
  Compréhension des technologies, IA, orientation, compétences numériques.

- **Adultes / grand public**
  Culture numérique, IA au quotidien, sécurité, esprit critique.

- **Structures éducatives et sociales**
  Écoles, collèges, lycées, centres de formation, associations, MJC, médiathèques, collectivités.

---

## 🧠 Contenu pédagogique

L’offre Ateliers 360 se structure autour de plusieurs grands axes :

### 🔬 Sciences

Physique et chimie accessibles, expériences concrètes, observation et compréhension des phénomènes du quotidien.

### 💻 Informatique & programmation

Bases de la programmation, logique algorithmique, développement web et scripts simples.

### 🤖 Robotique

Compréhension du fonctionnement des robots, capteurs, automatisation, logique de décision.

### 🧠 Intelligence artificielle

Comprendre ce qu’est l’IA, comment elle fonctionne, ses usages, ses limites et ses enjeux éthiques.

### 🌍 Numérique & société

Réseaux sociaux, données personnelles, désinformation, sécurité numérique, numérique responsable.

---

## 📦 Formats proposés

Ateliers 360 propose des formats **modulables** selon les besoins :

- Ateliers ponctuels (1h à 2h)
- Demi-journées ou journées complètes
- Cycles de plusieurs séances
- Formations courtes (1 à 2 jours)
- Interventions sur mesure

Les contenus sont adaptés au **niveau du public**, aux contraintes de la structure et aux objectifs pédagogiques.

---

## 🧑‍🏫 Approche pédagogique

L’approche d’Ateliers 360 repose sur plusieurs principes :

- **Apprendre en comprenant**, pas en récitant.
- **Manipuler, tester, expérimenter** pour ancrer les connaissances.
- Favoriser le **questionnement et l’échange**.
- Utiliser des exemples concrets et actuels.
- Créer un cadre **bienveillant et accessible**, sans prérequis techniques.
- Encourager l’**esprit critique** face aux technologies.

---

## 🧩 Organisation & fonctionnement

- Les ateliers peuvent être réalisés **en intervention mobile**, directement dans les structures partenaires.
- Le matériel pédagogique est fourni par Ateliers 360 lorsque nécessaire.
- Un cadre professionnel est mis en place : conventions d’intervention, assurances, organisation claire.
- Une communauté en ligne (Discord) permet, si souhaité, de **prolonger les échanges après les ateliers**.

---

## 👤 Porteur du projet

Ateliers 360 est **fondé et animé par Nathan Imogo**, étudiant-entrepreneur, actuellement en BUT Informatique, disposant :

- d’une formation technique en informatique,
- d’une expérience en animation d’ateliers éducatifs (notamment avec **Fusion Jeunesse**),
- d’un statut d’étudiant-entrepreneur (SNEE),
- d’une volonté de lier innovation technologique, pédagogie et impact social.

---

## 💼 Positionnement du projet

Ateliers 360 est :

- **un projet entrepreneurial**, avec un modèle économique basé sur la prestation d’ateliers et formations,
- **un projet à impact éducatif et social**, contribuant à la diffusion de la culture scientifique et numérique,
- **complémentaire à ImuChat**, dont il peut soutenir le développement à long terme.

---

## 🧠 Vision à moyen terme

À moyen terme, Ateliers 360 ambitionne :

- de structurer une offre reconnue localement,
- de développer des partenariats éducatifs durables,
- d’intervenir sur des événements et dispositifs nationaux,
- et de contribuer à une meilleure compréhension des technologies dans la société.

---

---

## 🛠️ Technical Documentation & Legacy Notes

## 📂 Documents clés (Historique Semaine 1)

Lisez les fichiers **dans cet ordre**:

1. **[SEMAINE1-RESUME.md](./SEMAINE1-RESUME.md)** ← **COMMENCEZ ICI** 📍
   - Résumé complet de ce qui a été fait
   - Checklist Jour 1-7
   - Métriques et livrables

2. **[semaine1-complete.md](./semaine1-complete.md)**
   - Instructions détaillées Jour 1-4
   - Schéma SQL complet à copier-coller
   - Commandes de test

3. **[web-dev-plan.md](./web-dev-plan.md)**
   - Plan complet 5 semaines
   - Tech stack justifié
   - Roadmap détaillée

4. **[roadmap.md](./roadmap.md)**
   - Roadmap 5 phases (Dec 2025 - Jun 2026)
   - Budget et KPIs
   - Risques et mitigation

---

## 🎯 Quoi faire maintenant?

### Étape 1: Création Supabase (30 min)

```bash
1. Aller sur https://supabase.com/sign-up
2. Créer projet "ateliers-360-dev"
3. Copier-coller le schéma SQL (voir semaine1-complete.md)
4. Copier les clés API
5. Remplir .env.local
```

### Étape 2: Vérifier que ça marche (5 min)

```bash
npm run build  # Doit passer
npm run dev    # Démarrer serveur
# Aller sur http://localhost:3000/en/atelier
# Vérifier les 6 ateliers s'affichent
```

---

## 🛠 Commandes utiles

```bash
# Développement
npm run dev          # Serveur localhost:3000 avec hot reload

# Production
npm run build        # Build optimisé
npm start            # Lancer build prod

# Autres
npm run lint         # Vérifier ESLint
npm run type-check   # Vérifier TypeScript
```
# ateliers360-v2
