# Spécifications : Plateforme & Expérience Utilisateur (UX) 🧭

**Priorité** : P0 (Transverse)
**Statut** : En cours de dev

L'expérience utilisateur doit être "Premium", engageante et accessible.

## 1. Tableaux de Bord (Dashboards)

### A. Dashboard Apprenant ("Mon Espace Maker")

* **Vue** : Ludique, visuelle, gamifiée.
* **Contenu** :
  * Prochain atelier (Carte "Save the date").
  * Derniers projets / Badges récents.
  * Accès rapide aux ressources du groupe actuel.
  * Jauge de progression globale.

### B. Dashboard Animateur ("Cockpit")

* **Vue** : Efficace, dense, orientée action.
* **Contenu** :
  * Planning de la journée/semaine.
  * Alertes (Absences non justifiées, Tâches admin en retard).
  * Accès rapide : "Faire l'appel", "Ouvrir ressources groupe X".

### C. Dashboard Admin ("Tour de Contrôle")

* **Vue** : Synthétique, indicateurs clés.
* **Contenu** :
  * Vue calendaire globale (tous les ateliers).
  * KPIs : Taux de remplissage, CA mensuel, Nbr incidents.

## 2. Accessibilité & Inclusion

* [ ] **Multilingue**
  * Architecture i18n prête (FR/EN minimum).
  * Contenus traduisibles.
* [ ] **Accessibilité Numérique (a11y)**
  * Respect WCAG AA.
  * Contraste élevé, polices lisibles (type dyslexie-friendly optionnel).
  * Compatibilité lecteurs d'écran.
* [ ] **Mobile First**
  * Tout doit être faisable sur smartphone (surtout pour Apprenant et Parents, et appel Animateur).
* [ ] **Mode Hors-Ligne (PWA)**
  * Consultation des supports possible sans internet (mise en cache).
  * Faire l'appel sans internet (synchro au retour de la connexion).

## 3. Priorités d'Implémentation

1. Dashboard Animateur (Fonctionnel).
2. Dashboard Apprenant (Engagement).
3. Responsive Mobile.
