# Spécifications : Pôle 3 – IA & Objets Connectés (IoT) 🧠

**Objectif Pédagogique** : Comprendre le monde de demain, démystifier la "magie" de la tech.
**Approche** : Expérimentation concrète + Réflexion éthique.

## 1. Fonctionnalités Clés

### A. Gestion des Objets Connectés (IoT)

* [ ] **IoT Dashboard**
  * Visualisation des données "Live" envoyées par les objets des élèves (via MQTT/Websockets ou saisie manuelle au début).
  * Widgets : Jauges, Graphiques linéaires (Température, Humidité, Bruit, Luminosité).
  * Historique des données (pour analyse mathématique simple).

### B. Modules IA Vulgarisés

* [ ] **Playground IA**
  * Interfaces simplifiées pour tester des modèles (Reconnaissance image, Texte).
  * Comparaison : "IA vs Humain" (ex: reconnaissance de dessins).
* [ ] **Ateliers de Prompting**
  * Zone de texte pour tester des prompts avec différents modèles (si API connectée) ou simulateur.
  * Analyse collective des réponses (Biais, Hallucinations).

### C. Esprit Critique & Éthique

* [ ] **Quiz Reflexifs**
  * "Est-ce que cette photo est vraie ?", "Pourquoi l'IA a répondu ça ?".
* [ ] **Débats**
  * Outil de vote/sondage temps réel pour lancer des débats en classe ("L'IA doit-elle conduire les voitures ?").

### D. Mode "Conférence / Démo"

* [ ] **Support Présentateur**
  * Diaporama intégré pilotable par l'animateur.
  * Interaction public : Questions/Réponses affichées à l'écran.

## 2. Focus Technique (IoT)

Pour la partie IoT, prévoir une architecture capable d'ingérer des petits flux de données (ex: Supabase Realtime ou MQTT Broker externe connecté). L'objectif n'est pas l'industriel, mais la visualisation pédagogique.

## 3. Priorités

1. Dashboard IoT simple (Graphique temps réel).
2. Modules de contenu "Comprendre l'IA".
