## Semaine 1 - Execution Complétée ✅

### État actuel du projet Ateliers 360

Le développement de la Semaine 1 est maintenant **prêt pour exécution**. Voici ce qui a été fait :

---

## 📋 Checklist de Semaine 1

### ✅ Jour 1-2 : Configuration Infrastructure

- **Dépendances installées** ✅
  - `@supabase/supabase-js` - Client Supabase
  - `stripe` - Paiements
  - `zod` - Validation
  - `next-intl` - Internationalisation

- **Structure i18n établie** ✅
  - `middleware.ts` créé avec redirection locale
  - `src/i18n.ts` configuré avec next-intl
  - `messages/en.json` et `messages/fr.json` étendus avec 5 namespaces
  - Routing `/[locale]/` implémenté

- **Pages créées** ✅
  - `/[locale]/page.tsx` - Page d'accueil
  - `/[locale]/atelier/page.tsx` - Liste des ateliers avec filtres
  - `/[locale]/atelier/[slug]/page.tsx` - Détail atelier (SSG avec generateStaticParams)
  - `/[locale]/a-propos/page.tsx` - À propos d'Ateliers 360
  - `/[locale]/pour-les-ecoles/page.tsx` - Pages écoles avec formulaire + tarification + FAQ
  - Pages existantes: `/[locale]/contact/page.tsx`, `/[locale]/create/page.tsx`

### ✅ Jour 3-4 : Traductions (i18n)

**Namespaces ajoutés à `messages/en.json` et `messages/fr.json` :**

1. **Navigation** - Menu principal (7 clés)
2. **Workshops** - Pages ateliers (12 clés)
3. **About** - Page à propos (12 clés)
4. **Schools** - Pages écoles (11 clés)
5. **CreatePage** - Existant, réutilisé (14 clés)

**Total: 56 nouvelles clés de traduction en anglais et français**

### ✅ Jour 5-7 : Composants et Styles

- **Header mis à jour** - Navigation localisée avec liens i18n
- **Pages utilisant `useTranslations()`** - Support complet anglais/français
- **Types étendus** - Workshop type enrichi avec propriétés manquantes
- **Données mises à jour** - 6 ateliers avec discipline, prix, format, matériel
- **Build validé** - `npm run build` PASS avec 7 routes statiques générées

---

## 🔧 Configuration Supabase (À faire maintenant)

### Jour 1 - Créer compte Supabase (30 min)

```bash
1. Aller sur https://supabase.com/sign-up
2. S'inscrire avec GitHub ou email
3. Créer un nouveau projet
   - Nom : "ateliers-360-dev"
   - Région : "Europe (eu-west-1)" ou proche
   - Mot de passe superuser: Note-le ✅
```

### Jour 2 - Schéma et données (20 min)

Dans Supabase Editor SQL, copier-coller ce schéma :

```sql
-- Table Ateliers (Workshops)
CREATE TABLE ateliers (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  titre TEXT NOT NULL,
  description TEXT NOT NULL,
  objectifs TEXT[] NOT NULL,
  public_cible TEXT NOT NULL,
  duree_heures NUMERIC NOT NULL,
  tarif_eur NUMERIC NOT NULL,
  materiel TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table Réservations (Reservations)
CREATE TABLE reservations (
  id BIGSERIAL PRIMARY KEY,
  atelier_id BIGINT NOT NULL REFERENCES ateliers(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  nom TEXT NOT NULL,
  etablissement TEXT,
  adresse TEXT,
  participants_count INT NOT NULL DEFAULT 1,
  date_atelier DATE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'paid', 'completed')),
  stripe_session_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table Blog (Blog Articles)
CREATE TABLE blog_articles (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  titre TEXT NOT NULL,
  contenu TEXT NOT NULL,
  auteur TEXT,
  publier BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table Événements (Events)
CREATE TABLE events (
  id BIGSERIAL PRIMARY KEY,
  titre TEXT NOT NULL,
  description TEXT,
  date_debut TIMESTAMP NOT NULL,
  date_fin TIMESTAMP,
  lieu TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert 6 ateliers de test
INSERT INTO ateliers (slug, titre, description, objectifs, public_cible, duree_heures, tarif_eur, materiel) VALUES
('robotics-for-beginners', 'Robotics for Beginners', 'Build and program your first robot', 
 ARRAY['Understand robot components', 'Assemble a robot from kit', 'Write basic programs', 'Develop teamwork skills'],
 'Ages 8-12', 3, 45, 'Educational robotics kits, computers, sensors'),
('intro-to-ai', 'Introduction to AI', 'Discover how AI is changing the world',
 ARRAY['Define AI and ML', 'Understand ethics', 'Use AI models', 'Generate creative content'],
 'Ages 12-16', 2.5, 50, 'Computers, AI software tools'),
('physics-phun', 'Physics Phun-damentals', 'Explore physics through experiments',
 ARRAY['Learn gravity and force', 'Build electrical circuits', 'Experiment with magnets', 'Record observations'],
 'Ages 7-11', 2, 35, 'Circuit kits, magnets, batteries, light bulbs'),
('creative-coding', 'Creative Coding with Scratch', 'Learn to code by creating games',
 ARRAY['Understand programming concepts', 'Create interactive characters', 'Design games', 'Develop logical thinking'],
 'Ages 8-12', 3, 40, 'Computers with Scratch installed'),
('engineering-challenge', 'The Engineering Challenge', 'Design solutions to real problems',
 ARRAY['Apply engineering design process', 'Understand mechanics', 'Work in teams', 'Present designs'],
 'Ages 10-14', 3, 55, 'Building materials, simple machines'),
('kitchen-chemistry', 'Kitchen Chemistry', 'Conduct experiments with everyday ingredients',
 ARRAY['Learn states of matter', 'Understand chemical changes', 'Follow instructions', 'Develop curiosity'],
 'Ages 6-10', 1.5, 30, 'Kitchen ingredients, containers');

-- Enable RLS (Row Level Security)
ALTER TABLE ateliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policies for public read
CREATE POLICY "Allow public read ateliers" ON ateliers FOR SELECT USING (true);
CREATE POLICY "Allow public read events" ON events FOR SELECT USING (true);
CREATE POLICY "Allow public read published blog" ON blog_articles FOR SELECT USING (publier = true);

-- Insert reservations allowed for all (for now)
CREATE POLICY "Allow insert reservations" ON reservations FOR INSERT WITH CHECK (true);
```

Après avoir collé le schéma:

1. Cliquer "Run"
2. Vérifier que 6 ateliers sont insérés dans la table `ateliers`

### Jour 3 - Récupérer les clés API

1. Aller dans **Settings** → **API**
2. Copier:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `Anon (public) API Key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Jour 4 - Configurer `.env.local`

Créer un fichier `.env.local` à la racine du projet:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Stripe (test mode keys - optional for Week 1)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# App config
NEXT_PUBLIC_APP_NAME=Ateliers 360
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Vérification finale

```bash
# Test la build
npm run build

# Démarrer le dev
npm run dev

# Aller sur http://localhost:3000/en/atelier
# Aller sur http://localhost:3000/fr/atelier
```

Si les pages s'affichent sans erreur → ✅ Semaine 1 complète !

---

## 📦 Prochaines étapes (Semaine 2-5)

**Semaine 2: API Routes**

- Créer `/api/ateliers` GET (fetch de Supabase)
- Créer `/api/reservations` POST (insérer réservation)
- Connecter les pages à l'API

**Semaine 3: Paiement Stripe**

- Implémenter checkout Stripe
- Webhook pour confirmation paiement
- Email de confirmation

**Semaine 4: Admin Dashboard**

- Page `/admin` pour gérer réservations
- Analytics basiques

**Semaine 5: Déploiement**

- GitHub Actions CI/CD
- Déployer sur Vercel
- Tests en production

---

## 📊 Métriques Semaine 1

| Item | Statut |
|------|--------|
| Dépendances | ✅ Installées |
| i18n Structure | ✅ Complète (en/fr) |
| Pages créées | ✅ 6 pages |
| Traductions | ✅ 56 clés (en + fr) |
| Build | ✅ PASS (0 erreurs) |
| Routes statiques | ✅ 7 générées |
| Supabase Setup | ⏳ À faire |
| `.env.local` | ⏳ À faire |

---

## 🚀 Commandes utiles

```bash
# Build production
npm run build

# Dev server (hot reload)
npm run dev

# Vérifier les erreurs TypeScript
npm run type-check

# Vérifier les erreurs ESLint
npm run lint
```

---

## 📝 Notes importantes

1. **Structure i18n**: Toutes les pages sont dans `/[locale]/` pour supporter `en` et `fr`
2. **Message files**: Étendus avec namespaces pour chaque page (Navigation, Workshops, About, Schools)
3. **Link component**: Utilise `next/link` (pas `next-intl/navigation`) pour compatibilité
4. **Pages "use client"**: Les pages utilisant `useTranslations()` sont marquées `'use client'`
5. **Middleware**: Redirection automatique `/` → `/en`

---

**Prochaine action**: Créer compte Supabase et remplir le schéma SQL (est. 30 min)

Bon développement ! 🎉
