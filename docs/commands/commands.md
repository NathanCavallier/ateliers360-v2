# Diverses commandes terminales pour le développement et la maintenance de l'application Ateliers360.

## Installation des dépendances

```bash
npm install
```

## Lancement de l'application

```bash
npm run dev
```

## Construction de l'application pour la production

```bash
npm run build
```

## Lancement de l'application en mode production

```bash
npm start
```

## Linting du code

```bash
npm run lint
```

## Tests unitaires

```bash
npm run test
```

## Nettoyage du cache et des modules

```bash
npm cache clean --force
rm -rf node_modules
rm package-lock.json
npm install
```

## Mise à jour des dépendances

```bash
npm update
```

## Vérification des vulnérabilités de sécurité

```bash
npm audit
```

## Génération de la documentation

```bash
npm run docs
```

## Autres commandes utiles

```bash
# Rechercher une chaîne de caractères dans le code et afficher les fichiers correspondants avec les numéros de ligne
grep -rnw 'src/' -e "chaîne à rechercher"

# Remplacer une chaîne de caractères dans le code + commandes python
find src/ -type f -name "*.js" -exec sed -i "s/chaîne à rechercher/nouvelle chaîne/g" {} \;

# Remplacer une chaîne de caractères dans le code + commandes bash
sed -i "s/chaîne à rechercher/nouvelle chaîne/" src/fichier.js

# Supprimer une chaîne de caractères dans le code
sed -i "/chaîne à supprimer/d" src/fichier.js

# Afficher le contenu d'un fichier
cat src/fichier.js
```
