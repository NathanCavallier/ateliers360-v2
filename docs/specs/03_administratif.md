# Spécifications : Gestion Administrative 📄

**Priorité** : P1/P2 (Indispensable pour le légal/scaling)
**Statut** : À spécifier techniquement

Ce module couvre les aspects légaux, financiers et administratifs, cruciaux pour une activité éducative en France.

## 1. Fonctionnalités Détaillées

### A. Dossiers Apprenants

* [ ] **Fiche Administrative**
  * Coordonnées complètes.
  * Responsables légaux (Contacts urgence).
  * Infos médicales non-sensibles (Allergies alimentaires si goûter, PAI si nécessaire).
* [ ] **Gestion Documentaire**
  * Stockage sécurisé des documents signés.
  * **Documents Types** :
    * Autorisation parentale (Sortie, Matériel).
    * Droit à l'image (OUI/NON explicite).
    * Règlement intérieur signé.
  * Génération automatique de documents PDF pré-remplis à faire signer.

### B. Facturation & Financement

* [ ] **Gestion des Inscriptions**
  * Statut inscription : Pré-inscrit, Confirmé, Liste d'attente.
  * Suivi Paiement : Payé, Acompte versé, En attente.
* [ ] **Documents Comptables**
  * Génération de devis (pour écoles/partenaires).
  * Génération de factures acquittées.
  * Export comptable (CSV/Excel) pour l'expert comptable.
* [ ] **Subventions & Partenariats**
  * Tag "Financé par X" pour suivi des obligations de communication (logos sur les docs).

### C. Conformité RGPD

* [ ] **Gestion des Consentements**
  * Granularité : Newsletter, Photos internes, Photos publiques, Usage données recherche.
  * Droit à l'oubli : Bouton/Procédure d'anonymisation d'un apprenant sortant.
  * Logs d'accès aux données sensibles.

## 2. Priorités d'Implémentation

1. Fiche Administrative de base + Contacts Urgence.
2. Gestion des Consentements (RGPD/Droit image).
3. Suivi simple Paiement (Payé/Non Payé).
