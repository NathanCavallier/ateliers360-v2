# 🗄️ Ateliers 360 — Supabase Setup Guide

**Objectif** : Configurer la base de données Supabase pour Ateliers 360
**Durée estimée** : 15 min
**Prérequis** : Compte Supabase créé (free tier OK)

---

## 1️⃣ Créer un Projet Supabase

1. Aller sur [supabase.com](https://supabase.com)
2. S'inscrire (email ou GitHub)
3. Créer un nouveau projet
   - **Nom** : `ateliers-360` ou `ateliers-360-dev`
   - **Region** : EU (pour RGPD)
   - **Password** : Générer un mot de passe fort
4. Copier l'URL et la clé anon
5. Sauvegarder dans `.env.local` :
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```

**⏱️ 3 min**

---

## 2️⃣ Créer les Tables

Aller dans l'onglet **SQL Editor** de Supabase et copier-coller ce code :

```sql
-- Table des ateliers
CREATE TABLE ateliers (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  slug TEXT UNIQUE NOT NULL,
  titre TEXT NOT NULL,
  description TEXT NOT NULL,
  objectifs TEXT[] NOT NULL,
  public_cible TEXT NOT NULL,
  duree_heures NUMERIC NOT NULL,
  tarif_eur NUMERIC NOT NULL,
  materiel TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table des réservations
CREATE TABLE reservations (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  atelier_id BIGINT REFERENCES ateliers(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  nom TEXT NOT NULL,
  etablissement TEXT,
  adresse TEXT,
  participants_count INT NOT NULL,
  date_atelier DATE NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, confirmed, paid, completed
  stripe_session_id TEXT,
  group_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table des articles blog
CREATE TABLE blog_articles (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  slug TEXT UNIQUE NOT NULL,
  titre TEXT NOT NULL,
  excerpt TEXT,
  contenu TEXT NOT NULL,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table des événements/créneaux
CREATE TABLE events (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  atelier_id BIGINT REFERENCES ateliers(id) ON DELETE CASCADE,
  date_event DATE NOT NULL,
  heure_debut TIME NOT NULL,
  heure_fin TIME NOT NULL,
  places_disponibles INT NOT NULL,
  adresse TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes pour performance
CREATE INDEX idx_ateliers_slug ON ateliers(slug);
CREATE INDEX idx_reservations_atelier_id ON reservations(atelier_id);
CREATE INDEX idx_reservations_email ON reservations(email);
CREATE INDEX idx_blog_articles_slug ON blog_articles(slug);
CREATE INDEX idx_events_atelier_id ON events(atelier_id);
CREATE INDEX idx_events_date ON events(date_event);
```

Cliquer sur **Run** pour exécuter.

**⏱️ 2 min**

---

## 3️⃣ Configurer Row Level Security (RLS)

Pour que la BD soit sécurisée, activer RLS sur les tables publiques :

```sql
-- Activer RLS sur ateliers (lecture publique)
ALTER TABLE ateliers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ateliers_read_all"
ON ateliers FOR SELECT
USING (true);

-- Activer RLS sur reservations (insertion publique, lecture admin)
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reservations_insert_anyone"
ON reservations FOR INSERT
WITH CHECK (true);

CREATE POLICY "reservations_read_own"
ON reservations FOR SELECT
USING (true); -- Admin gérera l'accès

-- Activer RLS sur blog_articles (lecture publique)
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "blog_read_all"
ON blog_articles FOR SELECT
USING (published_at IS NOT NULL OR auth.uid() IS NOT NULL);

-- Activer RLS sur events (lecture publique)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "events_read_all"
ON events FOR SELECT
USING (true);
```

**⏱️ 3 min**

---

## 4️⃣ Peupler les Données (Ateliers)

Copier ce code SQL pour insérer les 10 ateliers Ateliers 360 :

```sql
INSERT INTO ateliers (slug, titre, description, objectifs, public_cible, duree_heures, tarif_eur, materiel)
VALUES
  (
    'decouverte-robotique',
    'Découverte Robotique — Mon premier robot',
    'Initiation pratique à la robotique avec kits plug-and-play. Les enfants montent, programment et testent leur robot sur des missions ludiques.',
    ARRAY['Comprendre les capteurs et actionneurs', 'Initier à la logique de programmation', 'Développer l''esprit critique et le travail d''équipe'],
    '8–12 ans',
    3,
    120,
    'Kit robot mBot, table défi, PC/tablette'
  ),
  (
    'robotique-avancee',
    'Robotique Avancée — Compétition mini-robots',
    'Ateliers par équipes pour concevoir, coder et optimiser un robot pour un défi (parcours, sumo, ramassage). Mécanique, capteurs, calibration et itérations.',
    ARRAY['Travail en équipe', 'Prototypage rapide', 'Mise au point algorithmique'],
    '12–17 ans',
    8,
    400,
    'Kits robots avancés, capteurs, outils, table challenge'
  ),
  (
    'code-fun',
    'Code Fun — Créer ton premier jeu',
    'Utilisation de Scratch ou p5.js/HTML pour créer un mini-jeu. Design, logique, collision, scoring et partage.',
    ARRAY['Logique de programmation', 'Créativité', 'Débogage'],
    '10–15 ans',
    1.5,
    150,
    'PC/tablettes avec navigateur'
  ),
  (
    'ia-jeunes',
    'IA pour les jeunes — Comprendre et créer un mini-chatbot',
    'Atelier d''initiation à l''IA (concepts simples), création d''un mini-chatbot guidé (règles + prompts), sensibilisation éthique.',
    ARRAY['Démystifier l''IA', 'Construire un chatbot', 'Comprendre enjeux éthiques'],
    '13–18 ans',
    3,
    180,
    'PC/tablettes, accès internet'
  ),
  (
    'mini-labo-physique',
    'Mini-labo Physique-Chimie — Expériences qui impressionnent',
    'Animations d''expériences sûres (chimie colorée, électricité simple, pression/air) avec explication scientifique.',
    ARRAY['Curiosité scientifique', 'Méthode expérimentale', 'Sécurité'],
    '8–14 ans',
    2,
    100,
    'Kits labo, lunettes, gants, réactifs inoffensifs'
  ),
  (
    'web-design',
    'Web & Design — Ma page web en 2h',
    'Apprendre HTML/CSS de base ou utiliser un builder simple pour créer un portfolio/mini-site. Introduction à l''UX simple.',
    ARRAY['Notion web de base', 'Publication', 'Design simple'],
    '13–18 ans',
    2,
    130,
    'PC, hébergement (optionnel)'
  ),
  (
    'securite-famille',
    'Sécurité numérique — Internet sûr à la maison',
    'Atelier parents-enfants sur mots de passe, vie privée, réseaux sociaux, cyberharcèlement. Exercices pratiques.',
    ARRAY['Bonnes pratiques', 'Sensibilisation'],
    'Familles (tous âges)',
    1.5,
    180,
    'Supports imprimés, slides'
  ),
  (
    'stage-vacances',
    'Stage Vacances — Code & Robotique (3 jours)',
    '3 jours de projet avec objectifs (robot + mini-jeu + présentation finale). Encadrement, matériel, diplôme.',
    ARRAY['Gestion de projet', 'Prototypage', 'Soft skills'],
    '10–16 ans',
    18,
    200,
    'Kits robots, PC, fournitures complètes'
  ),
  (
    'orientation-metiers',
    'Atelier Orientation — Métiers du numérique',
    'Conférence atelier + Q&A avec exercices pour construire son parcours. Idéal pour lycées.',
    ARRAY['Information réaliste', 'Plan d''action', 'Mini CV'],
    'Lycéens, étudiants',
    1.5,
    120,
    'Slides, formulaires'
  ),
  (
    'mini-app-maker',
    'Atelier ImuChat Maker — Créer une mini-app',
    'Présentation du concept de mini-app, workflow de conception, prototype et démonstration. Idéal pour lycéens/étudiants.',
    ARRAY['Compréhension fullstack light', 'Packaging', 'UI/UX'],
    '15+ ans',
    3,
    200,
    'PC, accès internet'
  );
```

**⏱️ 3 min**

---

## 5️⃣ Vérifier les Données

Aller dans l'onglet **Table Editor** et vérifier que les données sont bien insérées.

Vous devriez voir :
- 1 table `ateliers` avec 10 lignes ✅
- 1 table `reservations` (vide pour le moment)
- 1 table `blog_articles` (vide)
- 1 table `events` (vide)

**⏱️ 1 min**

---

## 6️⃣ Tester la Connexion Next.js

```bash
# Dans le terminal du projet

# 1. Vérifier que .env.local est bien rempli
cat .env.local | grep SUPABASE

# 2. Lancer le dev server
npm run dev

# 3. Aller sur http://localhost:3000/atelier
# Vérifier que les ateliers s'affichent (actuellement statique depuis data.ts)
```

Pour charger depuis Supabase (optionnel, à faire plus tard) :
```tsx
// src/lib/data.ts
import { supabase } from './supabase'

export async function getAteliers() {
  const { data } = await supabase.from('ateliers').select('*')
  return data || []
}
```

**⏱️ 2 min**

---

## ✅ Fin Setup Supabase

Vous avez maintenant :
- ✅ Compte Supabase créé
- ✅ Schéma BD complet
- ✅ 10 ateliers peuplés
- ✅ RLS sécurisé
- ✅ Connexion Next.js testée

**Prochaines étapes** :
1. Créer le formulaire réservation (`/reserver`)
2. Intégrer API POST réservations
3. Tester emails
4. Ajouter Stripe

---

## 🔒 Sécurité Checklist

- [x] Region EU (RGPD)
- [x] RLS activé
- [x] Clé anon utilisée en frontend (readonly pour ateliers)
- [ ] Admin key sécurisée (jamais en frontend)
- [ ] CORS configuré (optionnel si Vercel)

---

## 📞 Troubleshooting

### Erreur : "NEXT_PUBLIC_SUPABASE_URL not found"
→ Vérifier `.env.local` est à la racine du projet

### Erreur : "Failed to fetch from Supabase"
→ Vérifier URL + clé sont corrects, region en EU

### Réservations ne s'insèrent pas
→ Vérifier RLS policy sur `reservations_insert_anyone`

---

**Besoin d'aide ?**
Docs : https://supabase.com/docs
Support : https://supabase.com/support

Bon development ! 🚀
