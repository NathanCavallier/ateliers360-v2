# LÉGENDE DES STATUTS

```txt
[BOILERPLATE]  → Squelette vide fourni aux participants au démarrage
[REF_FINIE]    → Version complète (solution / démo animateur, pas montrée d'emblée)
[NATHAN_IMPL]  → Nathan doit implémenter l'essentiel AVANT le jour J
[PLATFORM]     → Le projet Ateliers 360 lui-même (déjà existant, à continuer)
```

---

## 1. PLATEFORME ATELIERS 360 (Next.js)

**Stack :** Next.js 15, TypeScript, Tailwind, Supabase, Stripe, Resend, next-intl, Genkit/Gemini  
**Statut :** [PLATFORM]

```md
ateliers360/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Pages publiques (fr/en)
│   │   ├── admin/             # Backoffice protégé
│   │   └── api/               # Routes API (reservations, stripe, webhooks)
│   ├── components/
│   │   ├── ui/                # shadcn/ui
│   │   ├── common/            # Header, Footer, Logo
│   │   ├── workshops/         # WorkshopCard, WorkshopList
│   │   ├── reservations/      # ReservationForm
│   │   ├── groups/            # Gestion pédagogique
│   │   ├── admin/             # CRUD ateliers, réservations
│   │   ├── dashboard/         # Espace apprenant
│   │   └── create/            # Générateur IA
│   ├── lib/
│   │   ├── supabase.ts        # Tous les appels DB
│   │   ├── auth.ts            # NextAuth
│   │   ├── stripe.ts          # Stripe checkout + webhooks
│   │   ├── email.ts           # Resend templates
│   │   └── types.ts           # Types globaux
│   ├── ai/
│   │   ├── genkit.ts
│   │   └── flows/             # Génération description + image
│   ├── hooks/
│   └── i18n/
├── messages/
│   ├── fr.json
│   └── en.json
├── public/images/
├── .env.local                 # À NE PAS COMMITTER
├── next.config.ts
└── package.json
```

**À implémenter encore [NATHAN_IMPL] :**

- Rappels email automatiques 48h/24h (cron Supabase ou Vercel cron)
- Mentions légales SIREN + TVA réelles
- Dashboard analytics admin (graphiques recharts)
- Portail famille / espace apprenant complet
- SEO metadata dynamique par atelier

---

## 2. SCRATCH / MAKECODE (Ateliers 2, 5)

**Stack :** Scratch 3 (browser), MakeCode (browser), exports .sb3 / .hex  
**Pas de VS Code nécessaire pour les participants.**  
**VS Code utile pour :** scripts Python de génération de fiches, correction automatisée.

```
atelier-scratch-jeux/
├── boilerplates/
│   ├── jeu-depart.sb3         [BOILERPLATE] → sprite + fond, logique vide
│   └── defi-1-template.sb3
├── solutions/
│   ├── jeu-complet.sb3        [REF_FINIE]
│   └── variante-animation.sb3
├── fiches/
│   ├── fiche-participant.pdf
│   └── aide-memoire-blocs.pdf
└── README.md
```

---

## 3. HTML / CSS MINI-PROJETS (Atelier 4)

**Stack :** HTML5, CSS3, Live Server (extension VSCode), optionnel : Prettier  
**Statut boilerplate + ref :**

```
atelier-html-css/
├── boilerplate/
│   ├── index.html             [BOILERPLATE] → structure sémantique vide
│   ├── style.css              → variables CSS commentées, reset minimal
│   └── assets/
│       └── placeholder.jpg
├── variantes/
│   ├── portfolio/
│   │   ├── index.html         [REF_FINIE]
│   │   └── style.css
│   ├── evenement/
│   │   ├── index.html
│   │   └── style.css
│   └── mini-cv/
│       ├── index.html
│       └── style.css
├── exercices/
│   ├── ex1-flexbox.html       [BOILERPLATE]
│   └── ex2-grid.html
└── README.md
```

**[NATHAN_IMPL] :** Préparer les 3 variantes finies + les exercices guidés avec commentaires TODO.

---

## 4. PYTHON DÉBUTANT (Atelier 6, ID 6)

**Stack :** Python 3.11+, Thonny ou VS Code + extension Python, Jupyter (optionnel)

```
atelier-python-debutant/
├── notebooks/
│   ├── 01_bases.ipynb         [BOILERPLATE] → cellules avec TODO
│   ├── 02_boucles_fonctions.ipynb
│   └── 03_miniprojet.ipynb
├── scripts/
│   ├── exercices/
│   │   ├── ex01_variables.py  [BOILERPLATE]
│   │   ├── ex02_boucles.py
│   │   └── ex03_fonctions.py
│   └── solutions/
│       ├── ex01_variables_sol.py [REF_FINIE]
│       ├── ex02_boucles_sol.py
│       └── ex03_fonctions_sol.py
├── miniprojets/
│   ├── jeu_texte/
│   │   ├── jeu_texte_boilerplate.py  [BOILERPLATE]
│   │   └── jeu_texte_solution.py     [REF_FINIE]
│   ├── calculateur_csv/
│   │   ├── data_sample.csv
│   │   ├── calcul_boilerplate.py     [BOILERPLATE]
│   │   └── calcul_solution.py        [REF_FINIE]
│   └── automatisation_fichiers/
│       └── ...
├── requirements.txt           # vide ou minimal
└── README.md
```

**[NATHAN_IMPL] :** Les 3 mini-projets solutions + datasets CSV réalistes.

---

## 5. ÉLECTRONIQUE CRÉATIVE / ARDUINO (Ateliers 2, 14, ID 14)

**Stack :** Arduino IDE (C++), VS Code + PlatformIO extension, fritzing (schémas)  
**Matériel :** Arduino Uno/Nano, capteurs, LEDs, breadboard

```
atelier-electronique-creative/
├── sketches/
│   ├── 01_blink_led/
│   │   ├── boilerplate/
│   │   │   └── 01_blink_led.ino      [BOILERPLATE]
│   │   └── solution/
│   │       └── 01_blink_led.ino      [REF_FINIE]
│   ├── 02_capteur_distance/
│   │   ├── boilerplate/
│   │   │   └── capteur_hcsr04.ino    [BOILERPLATE]
│   │   └── solution/
│   │       └── capteur_hcsr04.ino    [REF_FINIE]
│   ├── 03_servo_capteur/
│   ├── 04_buzzer_melodie/
│   └── 05_wearable_led/
│       ├── boilerplate/
│       │   └── wearable.ino          [BOILERPLATE]
│       └── solution/
│           └── wearable.ino          [REF_FINIE]
├── schemas/
│   ├── schema_led.fzz
│   ├── schema_capteur.fzz
│   └── schema_servo.fzz
├── libs/                      # Librairies tiers à installer
│   └── README_libs.txt
└── README.md
```

**[NATHAN_IMPL] :** Tester physiquement chaque sketch avant le J, préparer les schemas fritzing.

---

## 6. ROBOTIQUE LUDIQUE / MAKECODE (Atelier 3, ID 3)

**Stack :** MakeCode (browser ou offline), Arduino IDE, Python (micro:bit ou mBot)

```
atelier-robotique-ludique/
├── mbot/
│   ├── boilerplate/
│   │   ├── deplacement_base.ino      [BOILERPLATE]
│   │   └── evitement_obstacles.ino   [BOILERPLATE]
│   └── solution/
│       ├── deplacement_base.ino      [REF_FINIE]
│       ├── evitement_obstacles.ino   [REF_FINIE]
│       └── parcours_autonome.ino     [REF_FINIE]
├── microbit/
│   ├── boilerplate/
│   │   └── defi1.hex                 [BOILERPLATE]
│   └── solution/
│       └── defi1_solution.hex        [REF_FINIE]
├── defis/
│   ├── parcours_slalom.md
│   ├── labyrinthe.md
│   └── robot_musicien.md
└── README.md
```

---

## 7. MINI VÉHICULE AUTONOME (ID 305)

**Stack :** Arduino C++, Python (Raspberry Pi optionnel), PlatformIO/VS Code  
**Complexité :** Haute — [NATHAN_IMPL] majoritairement

```
atelier-vehicule-autonome/
├── arduino/
│   ├── boilerplate/
│   │   ├── vehicule_base.ino         [BOILERPLATE] → moteurs init
│   │   ├── capteur_ultrasons.ino     [BOILERPLATE]
│   │   └── pid_template.ino          [BOILERPLATE] → structure PID vide
│   └── solution/
│       ├── vehicule_complet.ino      [REF_FINIE]   [NATHAN_IMPL]
│       ├── evitement_v2.ino          [REF_FINIE]   [NATHAN_IMPL]
│       └── navigation_ligne.ino      [REF_FINIE]   [NATHAN_IMPL]
├── raspberry/                 # Option lycée avancé
│   ├── camera_detection.py    [NATHAN_IMPL]
│   └── mqtt_control.py        [NATHAN_IMPL]
├── simulation/
│   └── sim_vehicule.py        [NATHAN_IMPL] → Pygame ou turtle
├── schemas/
│   ├── schema_moteurs.fzz
│   └── schema_ultrasons.fzz
└── README.md
```

---

## 8. INITIATION IA (ID 4)

**Stack :** Python 3, Jupyter Notebook, Teachable Machine (browser), Scikit-learn, Pandas, Matplotlib

```
atelier-initiation-ia/
├── notebooks/
│   ├── 01_intro_donnees.ipynb        [BOILERPLATE] → TODO dans cellules
│   ├── 02_classification_images.ipynb [BOILERPLATE]
│   ├── 03_biais_ia.ipynb             [BOILERPLATE]
│   └── solutions/
│       ├── 01_intro_donnees_sol.ipynb [REF_FINIE]  [NATHAN_IMPL]
│       ├── 02_classification_sol.ipynb [REF_FINIE] [NATHAN_IMPL]
│       └── 03_biais_sol.ipynb         [REF_FINIE]  [NATHAN_IMPL]
├── datasets/
│   ├── animaux_simples/       [NATHAN_IMPL] → 50-100 images par classe
│   ├── chiffres_manuscrits/   → MNIST subset
│   └── textes_sentiments.csv  [NATHAN_IMPL]
├── demos/
│   ├── demo_teachable_machine.md
│   ├── demo_quickdraw.md
│   └── demo_chatgpt_biais.md
├── nocode/
│   └── guide_ml4kids.md
└── requirements.txt
```

**[NATHAN_IMPL] :** Préparer datasets locaux propres, tester les notebooks bout en bout avant J.

---

## 9. CRÉATION DE CHATBOT (Atelier 19)

**Stack :** Landbot/Chatfuel (no-code), ou Python + Rasa Lite ou simple FSM, VS Code pour version code

```
atelier-chatbot/
├── nocode/
│   ├── guide_landbot.md
│   ├── template_faq.json              [BOILERPLATE] → arbre décision vide
│   └── template_orientation.json
├── python/                    # Version lycée/étudiants
│   ├── boilerplate/
│   │   ├── chatbot_fsm.py             [BOILERPLATE] → structure états vide
│   │   └── intents.json
│   └── solution/
│       ├── chatbot_faq_solution.py    [REF_FINIE]  [NATHAN_IMPL]
│       └── chatbot_orientation_sol.py [REF_FINIE]  [NATHAN_IMPL]
├── datasets/
│   └── intents_exemple.json   [NATHAN_IMPL]
└── README.md
```

---

## 10. DATA FOR GOOD (Atelier 18)

**Stack :** Python, Pandas, Matplotlib/Seaborn, Tableau Public (browser), VS Code + Jupyter

```
atelier-data-for-good/
├── notebooks/
│   ├── 01_exploration.ipynb           [BOILERPLATE]
│   ├── 02_visualisation.ipynb         [BOILERPLATE]
│   ├── 03_storytelling.ipynb          [BOILERPLATE]
│   └── solutions/
│       └── ...                        [REF_FINIE]  [NATHAN_IMPL]
├── datasets/
│   ├── qualite_air_nancy.csv          [NATHAN_IMPL] → données opendata réelles
│   ├── equipements_moselle.csv        [NATHAN_IMPL]
│   └── energie_grand_est.csv          [NATHAN_IMPL]
├── templates_tableau/
│   └── dashboard_template.twbx
└── requirements.txt
```

**[NATHAN_IMPL] :** Récupérer et nettoyer les datasets opendata locaux (data.gouv.fr, opendata Grand Est).

---

## 11. MINI VILLE INTELLIGENTE — IoT (ID 302)

**Stack :** Arduino/ESP32 C++, Python (dashboard), MQTT (Mosquitto), Supabase Realtime, React (dashboard)  
**Complexité :** Très haute — majoritairement [NATHAN_IMPL]

```
atelier-smart-city/
├── firmware/                  # Code ESP32/Arduino
│   ├── boilerplate/
│   │   ├── capteur_temperature.ino   [BOILERPLATE]
│   │   ├── capteur_luminosite.ino    [BOILERPLATE]
│   │   └── mqtt_publish_template.ino [BOILERPLATE]
│   └── solution/
│       ├── noeud_complet.ino         [REF_FINIE]  [NATHAN_IMPL]
│       └── gestion_energie.ino       [REF_FINIE]  [NATHAN_IMPL]
├── dashboard/                 # Interface de supervision
│   ├── src/
│   │   ├── App.tsx                   [NATHAN_IMPL]
│   │   ├── components/
│   │   │   ├── GaugeTemperature.tsx  [NATHAN_IMPL]
│   │   │   ├── GraphLuminosite.tsx   [NATHAN_IMPL]
│   │   │   └── MapVille.tsx          [NATHAN_IMPL]
│   │   └── lib/
│   │       └── supabase.ts
│   ├── package.json           # React + Recharts + Supabase
│   └── index.html
├── broker/
│   └── mosquitto.conf         [NATHAN_IMPL]
├── schemas/
│   ├── architecture_reseau.png
│   └── schema_noeuds.fzz      [NATHAN_IMPL]
└── README.md
```

---

## 12. ESCAPE GAME — CYBER-ATTAQUE (ID 311)

**Stack :** Python (challenges CTF), Bash, VS Code, serveur local (Flask ou simple HTTP)  
**Complexité :** Haute — [NATHAN_IMPL] pour les challenges

```
escape-cyber-attaque/
├── challenges/
│   ├── 01_phishing/
│   │   ├── email_piege.html           [NATHAN_IMPL] → faux email réaliste
│   │   └── indice.txt
│   ├── 02_chiffrement_cesar/
│   │   ├── message_chiffre.txt        [NATHAN_IMPL]
│   │   ├── boilerplate/
│   │   │   └── dechiffrer.py          [BOILERPLATE]
│   │   └── solution/
│   │       └── dechiffrer.py          [REF_FINIE]
│   ├── 03_analyse_trafic/
│   │   ├── capture.pcap               [NATHAN_IMPL] → wireshark capture préparée
│   │   └── questions.md
│   ├── 04_password_crack/
│   │   ├── hash_list.txt              [NATHAN_IMPL]
│   │   └── solution.txt               [REF_FINIE]
│   └── 05_lockdown_final/
│       ├── code_acces.py              [NATHAN_IMPL] → vérification code final
│       └── boilerplate.py             [BOILERPLATE]
├── serveur/
│   ├── app.py                         [NATHAN_IMPL] → Flask score/timer
│   ├── templates/
│   │   └── scoreboard.html
│   └── requirements.txt
├── animateur/
│   ├── guide_animateur.md
│   └── solutions_completes.md
└── README.md
```

---

## 13. ESCAPE GAME — ROBOT LABYRINTHE (ID 312)

**Stack :** MakeCode / Arduino, Python (simulation), Pygame (optionnel)

```
escape-robot-labyrinthe/
├── simulation/
│   ├── boilerplate/
│   │   └── labyrinthe_sim.py          [BOILERPLATE] → grille + déplacements vides
│   └── solution/
│       └── labyrinthe_sol.py          [REF_FINIE]  [NATHAN_IMPL]
├── physique/                  # Code pour robot réel
│   ├── boilerplate/
│   │   └── robot_labyrinthe.ino       [BOILERPLATE]
│   └── solution/
│       └── robot_labyrinthe_sol.ino   [REF_FINIE]  [NATHAN_IMPL]
├── niveaux/
│   ├── niveau_1.json          [NATHAN_IMPL] → définition labyrinthe
│   ├── niveau_2.json
│   └── niveau_3.json
└── README.md
```

---

## 14. ESCAPE GAME — L'IA DÉRAILLE (ID 316)

**Stack :** Python, Scikit-learn, Pandas, Jupyter, VS Code

```
escape-ia-deraille/
├── mission_1_exploration/
│   ├── dataset_biaise.csv             [NATHAN_IMPL] → dataset avec biais intentionnels
│   ├── boilerplate/
│   │   └── exploration.ipynb          [BOILERPLATE]
│   └── solution/
│       └── exploration_sol.ipynb      [REF_FINIE]  [NATHAN_IMPL]
├── mission_2_nettoyage/
│   ├── boilerplate/
│   │   └── nettoyage.ipynb            [BOILERPLATE]
│   └── solution/
│       └── nettoyage_sol.ipynb        [REF_FINIE]  [NATHAN_IMPL]
├── mission_3_reentrainement/
│   ├── boilerplate/
│   │   └── modele.ipynb               [BOILERPLATE] → structure sklearn vide
│   └── solution/
│       └── modele_sol.ipynb           [REF_FINIE]  [NATHAN_IMPL]
├── mission_4_ethique/
│   └── debat_questions.md
└── requirements.txt           # scikit-learn, pandas, matplotlib, imbalanced-learn
```

---

## 15. ESCAPE GAME — MISSION SPATIALE (ID 315)

**Stack :** Python, Pygame ou Matplotlib (simulation), Arduino (rover)

```
escape-mission-spatiale/
├── simulation_orbite/
│   ├── boilerplate/
│   │   └── orbite_sim.py              [BOILERPLATE] → lois Kepler commentées
│   └── solution/
│       └── orbite_sol.py              [REF_FINIE]  [NATHAN_IMPL]
├── rover_arduino/
│   ├── boilerplate/
│   │   └── rover_control.ino          [BOILERPLATE]
│   └── solution/
│       └── rover_sol.ino              [REF_FINIE]  [NATHAN_IMPL]
├── calculs_trajectoire/
│   ├── boilerplate/
│   │   └── trajectoire.ipynb          [BOILERPLATE]
│   └── solution/
│       └── trajectoire_sol.ipynb      [REF_FINIE]  [NATHAN_IMPL]
└── README.md
```

---

## 16. PLANÉTARIUM (ID 301)

**Stack :** Arduino C++ (moteurs + projection), FreeCAD/Tinkercad (3D), Python (préparation carte du ciel)

```
atelier-planetarium/
├── firmware/
│   ├── boilerplate/
│   │   ├── moteur_pas_pas.ino         [BOILERPLATE]
│   │   └── projecteur_pwm.ino         [BOILERPLATE]
│   └── solution/
│       ├── planetarium_complet.ino    [REF_FINIE]  [NATHAN_IMPL]
│       └── scenario_visite.ino        [REF_FINIE]  [NATHAN_IMPL]
├── modeles_3d/
│   ├── coupole.stl                    [NATHAN_IMPL]
│   └── support_moteur.stl             [NATHAN_IMPL]
├── carte_ciel/
│   ├── generer_carte.py               [NATHAN_IMPL] → Astropy + Matplotlib
│   └── constellations.json
└── README.md
```

---

## 17. JEU DE PLATEAU CONNECTÉ (ID 304)

**Stack :** Arduino (NFC/capteurs), React Native ou PWA (app compagnon), VS Code

```
atelier-jeu-plateau/
├── firmware/
│   ├── boilerplate/
│   │   ├── lecteur_nfc.ino            [BOILERPLATE]
│   │   └── scoring_led.ino            [BOILERPLATE]
│   └── solution/
│       └── jeu_complet.ino            [REF_FINIE]  [NATHAN_IMPL]
├── app_compagnon/             # PWA simple
│   ├── index.html                     [NATHAN_IMPL]
│   ├── app.js                         [NATHAN_IMPL]
│   └── style.css
├── regles/
│   ├── regles_base.md
│   └── fiches_cartes.pdf              [NATHAN_IMPL]
└── README.md
```

---

## 18. ROBOT DE CUISINE MULTIFONCTIONS (ID 306)

**Stack :** Arduino C++, PlatformIO/VS Code

```
atelier-robot-cuisine/
├── firmware/
│   ├── boilerplate/
│   │   ├── moteur_mixeur.ino          [BOILERPLATE]
│   │   ├── capteur_niveau.ino         [BOILERPLATE]
│   │   └── minuterie.ino              [BOILERPLATE]
│   └── solution/
│       └── robot_cuisine_complet.ino  [REF_FINIE]  [NATHAN_IMPL]
├── securite/
│   └── protocole_securite.md          [NATHAN_IMPL] → document obligatoire
├── schemas/
│   └── schema_electronique.fzz        [NATHAN_IMPL]
└── README.md
```

---

## 19. SATELLITES ET MISSIONS (ID 12)

**Stack :** Python, Astropy, Matplotlib, VS Code + Jupyter

```
atelier-satellites/
├── notebooks/
│   ├── 01_orbites_kepler.ipynb        [BOILERPLATE]
│   ├── 02_teldetection.ipynb          [BOILERPLATE]
│   ├── 03_conception_mission.ipynb    [BOILERPLATE]
│   └── solutions/
│       └── ...                        [REF_FINIE]  [NATHAN_IMPL]
├── simulateur/
│   ├── sim_orbite.py                  [NATHAN_IMPL] → visualisation 2D orbite
│   └── parametres_mission.json
└── requirements.txt           # astropy, matplotlib, numpy
```

---

## 20. HACKATHON SCOLAIRE (ID 17)

**Stack :** Variable selon équipes — préparer des starter kits multi-techno

```
hackathon-scolaire/
├── starter-kits/
│   ├── web/
│   │   ├── index.html                 [BOILERPLATE]
│   │   ├── style.css
│   │   └── app.js
│   ├── arduino/
│   │   └── starter.ino                [BOILERPLATE]
│   ├── python/
│   │   └── starter.py                 [BOILERPLATE]
│   └── scratch/
│       └── starter.sb3                [BOILERPLATE]
├── templates-pitch/
│   ├── pitch_template.pptx            [NATHAN_IMPL]
│   └── canvas_projet.pdf              [NATHAN_IMPL]
├── jury/
│   ├── grille_evaluation.xlsx         [NATHAN_IMPL]
│   └── guide_jury.md
├── scenarios/
│   ├── theme_ecologie.md              [NATHAN_IMPL]
│   ├── theme_sante.md                 [NATHAN_IMPL]
│   └── theme_mobilite.md              [NATHAN_IMPL]
└── README.md
```

---

## RÉCAPITULATIF PRIORITÉS NATHAN_IMPL

```
CRITIQUE avant J-7 (logique métier complexe) :
  → escape-cyber-attaque/    challenges + serveur Flask
  → escape-ia-deraille/      datasets biaisés + notebooks ML
  → atelier-smart-city/      firmware ESP32 + dashboard React
  → mini-vehicule-autonome/  code PID + navigation

IMPORTANT avant J-3 (contenu pédagogique) :
  → atelier-initiation-ia/   datasets locaux + notebooks bout-en-bout
  → atelier-data-for-good/   datasets opendata nettoyés
  → escape-mission-spatiale/ simulation Python
  → atelier-planetarium/     firmware moteurs + carte du ciel

FAISABLE avant J-1 (relativement simple) :
  → atelier-html-css/        3 variantes finies
  → atelier-python-debutant/ mini-projets solutions
  → atelier-electronique/    test physique des sketches
  → hackathon-scolaire/      grilles, scénarios, pitch template

BOILERPLATES QUASI PRÊTS (logique standard) :
  → arduino sketches de base (blink, servo, capteurs)
  → notebooks Python structure vide
  → HTML/CSS reset template
  → Scratch .sb3 vierges
```

---

## CONVENTION DE NOMMAGE DES DÉPÔTS

```
ateliers360-platform/          → la webapp Next.js
ateliers360-ressources/        → dépôt parent (monorepo pédagogique)
  ├── 00-platform/             → symlink ou submodule vers platform
  ├── 01-scratch/
  ├── 02-html-css/
  ├── 03-python-debutant/
  ├── 04-arduino-electronique/
  ├── 05-robotique/
  ├── 06-ia-initiation/
  ├── 07-chatbot/
  ├── 08-data-for-good/
  ├── 09-smart-city/
  ├── 10-vehicule-autonome/
  ├── 11-escape-cyber/
  ├── 12-escape-labyrinthe/
  ├── 13-escape-ia-deraille/
  ├── 14-escape-spatial/
  ├── 15-planetarium/
  ├── 16-satellites/
  ├── 17-jeu-plateau/
  └── 18-hackathon-kits/
```
