# Reconnaissance des apprentissages

## Virtuelles (faciles à mettre en place dès maintenant)

- Badges numériques — par compétence acquise ("Pythoniste", "Builder 3D", "Cyber-Défenseur"), affichables sur le dashboard apprenant qui existe déjà dans le code
- Attestation PDF générée automatiquement — avec nom, atelier, date, compétences validées et QR code vérifiable (lié au profil apprenant)
- Diplôme de fin de cycle — version plus élaborée avec logo Ateliers 360, signature Nathan, et un design soigné

## Physiques (plus d'impact, surtout pour les jeunes)

- Stickers thématiques — par domaine (robot, code, espace, chimie...), peu chers et très appréciés en primaire/collège
- Cartes de compétences imprimées — style carte à collectionner, avec niveau (bronze/argent/or)
- Médaille en impression 3D — en fin de hackathon ou de cycle, ça peut même être un projet en soi de les concevoir pendant l'atelier
- Certificat papier format A4 — avec cachet, à remettre en main propre pour marquer le coup

## Gamification progressive

- Système de niveaux (Explorateur → Maker → Expert) — débloqué au fil des cycles, visible dans l'espace apprenant
- Classement de groupe — pour les hackathons et défis, un podium avec mention dans le book de références
- Portfolio automatique — agrégation des projets réalisés en un lien partageable (utile pour Parcoursup ou stages)

## Ce qui est déjà dans le code existant

Tu as déjà la base dans `types.ts` (`Evaluation`, `GroupMember`) et dans `StudentEvaluationSheet.tsx` pour le suivi pédagogique. Les badges et le portfolio seraient une extension naturelle de ça, stockés dans Supabase et affichés dans le dashboard `/dashboard`.

La combinaison qui fonctionne le mieux pédagogiquement : **badge numérique + sticker physique + attestation PDF**, selon le niveau et la durée de l'atelier.
