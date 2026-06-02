# 🗺️ Ateliers 360 — Roadmap Générale & Vision Produit

Ce document définit la trajectoire de développement pour la plateforme **Ateliers 360**. Il structure les fonctionnalités en blocs logiques et priorisés pour assurer un déploiement progressif et robuste.

**Dernière mise à jour** : Janvier 2026
**Objectif** : Transformer la plateforme MVP en un écosystème complet de gestion d'ateliers éducatifs.

---

## 📅 Synthèse du Planning (H1 2026)

| Phase | Est. Date | Objectif Principal | Livrables Clés |
|-------|-----------|-------------------|----------------|
| **1. MVP (Fondations)** | Fév 2026 | Lancement opérationnel | Site public, Réservations, Gestion Groupes (Simple) |
| **2. Core Interactif** | Mar 2026 | Gestion Apprenants | Espace Animateur, Suivi Pédagogique simple, Espaces Groupes |
| **3. Expansion** | Avr 2026 | Communication & Admin | Messagerie, Facturation, Dossiers Admin |
| **4. Innovation** | Mai 2026 | IA & Ateliers 360+ | Assistant ImuChat, Mode "Itinérant", Gamification |

---

## 🧱 Blocs Fonctionnels Priorisés

Cette roadmap suit une approche **"Groupe Aware"** : la gestion des groupes est le cœur du système.

### 1️⃣ Cœur du Projet : Gestion des Groupes & Apprenants
>
> *Le moteur de la plateforme. Sans cela, c'est juste un site vitrine.*

* **Priorité** : Haute (MVP)
* **Fonctionnalités clés** : Création groupes, Planning, Suivi présence, Contenus pédagogiques associés.
* 👉 [Voir les spécifications détaillées](docs/specs/01_gestion_groupes.md)

### 2️⃣ Plateforme & Expérience Utilisateur (UX)
>
> *L'interface qui rend l'outil utilisable et agréable.*

* **Priorité** : Haute (MVP)
* **Fonctionnalités clés** : Dashboards (Apprenant/Animateur/Admin), Mobile-first, Accessibilité, Multilingue.
* 👉 [Voir les spécifications détaillées](docs/specs/05_plateforme_ux.md)

### 3️⃣ Communication & Interaction
>
> *Créer le lien entre les acteurs.*

* **Priorité** : Moyenne (Phase 2)
* **Fonctionnalités clés** : Messagerie interne, Chat atelier, Notifications, Visio (optionnel).
* 👉 [Voir les spécifications détaillées](docs/specs/02_communication.md)

### 4️⃣ Gestion Administrative
>
> *La conformité et la gestion "sérieuse".*

* **Priorité** : Moyenne (Phase 2/3)
* **Fonctionnalités clés** : Dossiers apprenants, RGPD, Facturation, Financement.
* 👉 [Voir les spécifications détaillées](docs/specs/03_administratif.md)

### 5️⃣ Animateurs & Intervenants
>
> *Gérer l'équipe pédagogique.*

* **Priorité** : Basse (Phase 3 - sauf si plusieurs animateurs dès le début)
* **Fonctionnalités clés** : Profils, Disponibilités, Affectation, Feedback qualité.
* 👉 [Voir les spécifications détaillées](docs/specs/04_animateurs.md)

### 6️⃣ Fonctionnalités Avancées & IA
>
> *Le futur et la différenciation technique.*

* **Priorité** : Future (Phase 4)
* **Fonctionnalités clés** : Assistant pédagogique (IA), Résumé automatique, Suggestions d'activités, Modularité.
* 👉 [Voir les spécifications détaillées](docs/specs/06_avance_et_specifique.md)

### 7️⃣ Spécificités Ateliers 360
>
> *L'ADN unique du projet.*

* **Priorité** : Fil rouge (Tout au long du projet)
* **Fonctionnalités clés** : Carnet de parcours, Badges, Mode "Itinérant".
* *Intégré dans les spécifications avancées.*

---

## 🏫 Offre Pédagogique (Les 4 Pôles)

L'architecture technique doit servir ces 4 piliers d'intervention.

### Pôle 1 – Robotique & Automatismes 🤖

* **Focus** : Matériel, Kits, Physique.
* **Specs** : [docs/specs/10_pole_robotique.md](docs/specs/10_pole_robotique.md)

### Pôle 2 – Programmation & Création 💻

* **Focus** : Code, Portfolio, Projets Web.
* **Specs** : [docs/specs/11_pole_programmation.md](docs/specs/11_pole_programmation.md)

### Pôle 3 – IA & IoT 🧠

* **Focus** : Data, Dashboards temps réel, Éthique.
* **Specs** : [docs/specs/12_pole_ia_iot.md](docs/specs/12_pole_ia_iot.md)

### Pôle 4 – Culture Numérique 🛡️

* **Focus** : Parents, Citoyenneté, Sécurité.
* **Specs** : [docs/specs/13_pole_culture_num.md](docs/specs/13_pole_culture_num.md)

---

## 🚀 Prochaines Étapes Immédiates

1. **Validation des Specs "Groupe"** : S'assurer que le modèle de données `Groups` <-> `Users` <-> `Workshops` est solide.
2. **Implémentation CRUD Groupes** : Interface admin pour créer un groupe et y ajouter des élèves.
3. **Vue "Mon Atelier" (Front)** : Espace connecté pour un élève voyant ses ateliers et ressources.

---
*Document vivant - À mettre à jour à chaque fin de cycle de développement.*
