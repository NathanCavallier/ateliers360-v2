# 🚀 Instructions de Migration - Ajout de la colonne Catégorie

## Étape 1 : Appliquer la migration SQL

1. Connectez-vous à votre projet Supabase : https://supabase.com
2. Allez dans l'onglet **SQL Editor**
3. Créez une nouvelle requête
4. Copiez-collez le contenu du fichier `migration-add-categorie.sql`
5. Cliquez sur **Run** pour exécuter la migration

## Étape 2 : Insérer des données de test (optionnel)

Si vous voulez des données de test avec des catégories :

1. Dans le **SQL Editor** de Supabase
2. Créez une nouvelle requête
3. Copiez-collez le contenu du fichier `ateliers-test-data.sql`
4. Cliquez sur **Run**

## Étape 3 : Vérifier les changements

```sql
-- Vérifier que la colonne existe
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'ateliers' AND column_name = 'categorie';

-- Voir les ateliers avec leurs catégories
SELECT id, titre, categorie FROM ateliers;
```

## Étape 4 : Redémarrer l'application Next.js

```bash
# Arrêter le serveur (Ctrl+C)
# Puis relancer
npm run dev
```

## Fonctionnalités activées après migration

✅ **Filtres par catégorie fonctionnels**
- Sciences
- Robotique
- Programmation
- IA
- Ingénierie
- Technologie

✅ **Recherche par texte**
- Recherche dans le titre
- Recherche dans la description
- Recherche dans la catégorie

✅ **Affichage dynamique**
- Badges de catégorie colorés
- Compteur de résultats
- Message si aucun résultat

## Catégories disponibles

Les catégories sont contraintes aux valeurs suivantes :
- `Sciences`
- `Robotique`
- `Programmation`
- `IA`
- `Ingénierie`
- `Physique`
- `Technologie`

## Codes couleur des badges

- **Sciences / Physique** : Bleu (`blue`)
- **Robotique** : Cyan (`cyan`)
- **IA / Programmation** : Jaune (`yellow`)
- **Ingénierie** : Vert (`green`)
- **Technologie** : Orange (`orange`)

## Troubleshooting

### Erreur : La colonne existe déjà
Si vous voyez "column already exists", c'est normal - la migration utilise `IF NOT EXISTS`.

### Les filtres ne fonctionnent pas
1. Vérifiez que la migration a été appliquée
2. Vérifiez que les ateliers ont une catégorie assignée
3. Redémarrez le serveur Next.js

### Les données statiques s'affichent encore
C'est normal si Supabase est vide. Ajoutez des ateliers via `ateliers-test-data.sql`.
