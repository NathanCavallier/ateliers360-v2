# Spécifications : Communication & Interaction 💬

**Priorité** : P1 (Important pour l'engagement)
**Statut** : À spécifier techniquement

Ce module gère les interactions entre les parties prenantes (Animateurs, Apprenants, Parents, Admin).

## 1. Fonctionnalités Détaillées

### A. Communication Interne

* [ ] **Messagerie Instantanée (Chat)**
  * Canaux :
    * **Canal Groupe** : Pour les discussions générales de tout le groupe (modéré par animateur).
    * **Canal Équipe/Projet** : Pour les sous-groupes de travail.
    * **Direct (1-to-1)** : Animateur <-> Apprenant (si contexte approprié/sécurisé) ou Animateur <-> Parent.
* [ ] **Système d'Annonces**
  * "Mur d'actualités" ou "Annonces épinglées" pour les infos importantes (Changement d'horaire, Matériel à apporter).
  * Notifications push/email pour les annonces urgentes.
* [ ] **Contextualisation**
  * Possibilité de commenter directement un livrable ou un projet ("Bravo pour ce code !", "Attention à l'indentation ici").

### B. Interaction Temps Réel (Classe Virtuelle / Hybride)

* [ ] **Intégration Visio**
  * Lien Jitsi/Zoom/Meet persistant ou généré par session.
  * Bouton "Rejoindre la classe virtuelle" en un clic depuis le dashboard.
* [ ] **Outils d'Animation**
  * Partage d'écran (via outil visio).
  * Tableau blanc partagé (Whiteboard) pour croquis rapides.
  * Mode "Lever la main" (si intégré ou via outil externe).

### C. Replay & Asynchrone

* [ ] **Médiathèque des Séances**
  * Si session enregistrée : mise à disposition automatique du lien Replay.
  * Chapitrage automatique (IA - feature avancée).

## 2. Contraintes & Sécurité

* **Modération** : Tout chat entre mineurs doit être auditable par l'animateur.
* **Protection** : Filtres de mots-clés interdits. Signalement de messages.
* **Horaires** : Possibilité de "muter" les chats la nuit (Droit à la déconnexion / Sécurité enfant).

## 3. Priorités d'Implémentation

1. Annonces (Mur de groupe).
2. Commentaires sur Projets/Livrables.
3. Chat de Groupe.
