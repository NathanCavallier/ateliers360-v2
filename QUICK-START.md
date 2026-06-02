## 🚀 DÉMARRAGE RAPIDE - Semaine 1 Complete

**Status: ✅ Application web bilingue prête. Reste uniquement la configuration Supabase.**

---

## ⏱️ Timeline: ~1 heure pour démarrer

| Tâche | Durée | Difficulty |
|-------|-------|-----------|
| Créer compte Supabase | 5 min | Facile |
| Copier schéma SQL | 5 min | Très facile |
| Créer .env.local | 2 min | Très facile |
| Vérifier build | 5 min | Très facile |
| **Total** | **17 min** | ✅ |

---

## 📍 Étape 1: Créer compte Supabase (5 min)

```bash
1. Ouvrir: https://supabase.com/sign-up
2. Signup avec GitHub ou email
3. Vérifier email (vérification automatique)
4. Créer projet:
   - Nom: "ateliers-360-dev"
   - Région: "eu-west-1" (Europe)
   - Password: Choisir un mot de passe fort
   - Cliquer "Create new project"
5. Attendre 2-3 min que le projet se crée
```

**Vous avez maintenant:** Project URL + Anon Key ✅

---

## 📍 Étape 2: Remplir Supabase (5 min)

1. **Ouvrir Supabase Editor** (SQL button sur la gauche)
2. **Copier TOUT ce code SQL:**

```sql
-- 1. Créer table ateliers
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

-- 2. Créer table réservations
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

-- 3. Créer table blog
CREATE TABLE blog_articles (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  titre TEXT NOT NULL,
  contenu TEXT NOT NULL,
  auteur TEXT,
  publier BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Créer table événements
CREATE TABLE events (
  id BIGSERIAL PRIMARY KEY,
  titre TEXT NOT NULL,
  description TEXT,
  date_debut TIMESTAMP NOT NULL,
  date_fin TIMESTAMP,
  lieu TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. Insérer 6 ateliers de test
INSERT INTO ateliers (slug, titre, description, objectifs, public_cible, duree_heures, tarif_eur, materiel) VALUES
('robotics-for-beginners', 'Robotics for Beginners', 'Build and program your first robot', ARRAY['Understand robot components', 'Assemble a robot from kit', 'Write basic programs', 'Develop teamwork skills'], 'Ages 8-12', 3, 45, 'Educational robotics kits, computers, sensors'),
('intro-to-ai', 'Introduction to AI', 'Discover how AI is changing the world', ARRAY['Define AI and ML', 'Understand ethics', 'Use AI models', 'Generate creative content'], 'Ages 12-16', 2.5, 50, 'Computers, AI software tools'),
('physics-phun', 'Physics Phun-damentals', 'Explore physics through experiments', ARRAY['Learn gravity and force', 'Build electrical circuits', 'Experiment with magnets', 'Record observations'], 'Ages 7-11', 2, 35, 'Circuit kits, magnets, batteries, light bulbs'),
('creative-coding', 'Creative Coding with Scratch', 'Learn to code by creating games', ARRAY['Understand programming concepts', 'Create interactive characters', 'Design games', 'Develop logical thinking'], 'Ages 8-12', 3, 40, 'Computers with Scratch installed'),
('engineering-challenge', 'The Engineering Challenge', 'Design solutions to real problems', ARRAY['Apply engineering design process', 'Understand mechanics', 'Work in teams', 'Present designs'], 'Ages 10-14', 3, 55, 'Building materials, simple machines'),
('kitchen-chemistry', 'Kitchen Chemistry', 'Conduct experiments with everyday ingredients', ARRAY['Learn states of matter', 'Understand chemical changes', 'Follow instructions', 'Develop curiosity'], 'Ages 6-10', 1.5, 30, 'Kitchen ingredients, containers');

-- 6. Activer RLS (sécurité)
ALTER TABLE ateliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- 7. Créer policies (permissions)
CREATE POLICY "Allow public read ateliers" ON ateliers FOR SELECT USING (true);
CREATE POLICY "Allow public read events" ON events FOR SELECT USING (true);
CREATE POLICY "Allow public read published blog" ON blog_articles FOR SELECT USING (publier = true);
CREATE POLICY "Allow insert reservations" ON reservations FOR INSERT WITH CHECK (true);
```

3. **Coller le code** dans l'éditeur SQL
4. **Cliquer "Run"** (en haut à droite)
5. **Vérifier:**
   - ✅ Pas d'erreurs
   - ✅ Table "ateliers" existe (voir gauche)
   - ✅ 6 ateliers insérés

---

## 📍 Étape 3: Copier les clés API (2 min)

1. **Aller dans Settings → API** (sur la gauche)
2. **Copier 2 clés:**
   - `Project URL` (commence par https://xxx.supabase.co)
   - `Anon (public) API Key` (commence par eyJ...)
3. **Garder ces clés visibles** (besoin dans étape 4)

---

## 📍 Étape 4: Créer .env.local (2 min)

1. **À la racine du projet**, créer un fichier `.env.local`
2. **Remplir avec:**

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

(Remplacer `xxx` et `eyJ...` avec les vraies clés de l'étape 3)

3. **Sauvegarder** (Ctrl+S ou Cmd+S)

---

## 📍 Étape 5: Démarrer l'app (5 min)

```bash
# Terminal, à la racine du projet:

# 1. Vérifier la build
npm run build

# Doit afficher:
# ✓ Compiled successfully
# ✓ Generating static pages (7/7)

# 2. Lancer le serveur
npm run dev

# Doit afficher:
# > Local: http://localhost:3000
```

3. **Ouvrir dans le navigateur:**
   - http://localhost:3000/en/atelier
   - http://localhost:3000/fr/atelier

4. **Vérifier que:**
   - ✅ Page affiche 6 ateliers
   - ✅ Filtres fonctionnent
   - ✅ En anglais vs français selon la langue

**Vous avez maintenant une app web bilingue avec Supabase ! 🎉**

---

## ✅ Checklist Final

- [ ] Compte Supabase créé
- [ ] Schéma SQL copié et exécuté
- [ ] 6 ateliers visibles dans table
- [ ] Clés API copiées
- [ ] .env.local créé et rempli
- [ ] `npm run build` réussi
- [ ] `npm run dev` fonctionne
- [ ] Pages `/en/atelier` et `/fr/atelier` affichent 6 ateliers
- [ ] Filtres fonctionnent

---

## 🆘 Troubleshooting

### "Cannot find module '@supabase/supabase-js'"
```bash
npm install  # Réinstaller dépendances
```

### ".env.local not recognized"
```bash
# Créer le fichier vérifier qu'il est à la racine (même niveau que package.json)
ls -la .env.local  # Doit exister
```

### "Build failed - ateliers is not iterable"
```bash
# Vérifier que .env.local a les 2 clés Supabase
# Vérifier que 6 ateliers existent dans Supabase
```

### "No translation found for key 'Workshops.title'"
```bash
# messages/en.json doit avoir le namespace "Workshops"
# messages/fr.json pareil
```

---

## 📱 Tester les pages

### Page accueil
```
http://localhost:3000/en
- Doit afficher hero + 6 ateliers
- Boutons "Explore" cliquables
```

### Liste ateliers
```
http://localhost:3000/en/atelier
- Doit afficher 6 ateliers en grille
- Filtres par discipline (Physics, Robotics, etc.)
- Cliquer atelier → page détail
```

### Détail atelier
```
http://localhost:3000/en/atelier/robotics-for-beginners
- Doit afficher hero + description
- Infos clés (durée, prix, public)
- Objectifs d'apprentissage
- Ateliers liés
```

### À propos
```
http://localhost:3000/en/a-propos
- Mission statement
- Valeurs (4 cartes)
- Stats en fond
```

### Pour les écoles
```
http://localhost:3000/en/pour-les-ecoles
- 4 raisons
- 3 tarifs (Workshop, Série, Annuel)
- Formulaire (ne post rien pour l'instant)
- FAQ
```

---

## 🎓 Avant Semaine 2

Vous avez maintenant:
- ✅ App web bilingue (EN/FR)
- ✅ 7 pages (accueil, ateliers, détail, a-propos, écoles, contact, créer)
- ✅ Supabase avec 6 ateliers
- ✅ Build production qui fonctionne

**Semaine 2 sera:** Connecter les pages à Supabase avec API routes

---

## 📖 Documentation complète

- **SEMAINE1-RESUME.md** - Résumé complet
- **semaine1-complete.md** - Instructions détaillées
- **FICHIERS-CREES.md** - Liste tous les fichiers
- **web-dev-plan.md** - Plan 5 semaines
- **roadmap.md** - Roadmap 5 phases

---

**Durée totale**: ~30-40 min (compte tenu des temps d'attente Supabase)

**Prochaine action**: Créer le compte Supabase → https://supabase.com/sign-up ✅

Bon développement ! 🚀
