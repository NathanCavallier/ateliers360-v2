#!/usr/bin/env bash

# Quick Start Script for ImuLabs Semaine 1
# Usage: bash setup.sh

set -e

echo "🚀 ImuLabs Semaine 1 - Quick Start Setup"
echo "=========================================="

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez installer Node.js 18+"
    exit 1
fi

echo "✅ Node.js trouvé: $(node -v)"
echo "✅ npm trouvé: $(npm -v)"

# Install dependencies
echo ""
echo "📦 Installation des dépendances..."
npm install

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo ""
    echo "⚠️  Fichier .env.local n'existe pas"
    echo "   Créez un fichier .env.local avec:"
    echo ""
    echo "   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co"
    echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key"
    echo ""
    echo "   Voir docs/semaine1-complete.md pour les instructions"
    echo ""
fi

# Build test
echo ""
echo "🏗️  Vérification de la build..."
npm run build

echo ""
echo "✅ Configuration complétée!"
echo ""
echo "📝 Prochaines étapes:"
echo "1. Créer compte Supabase: https://supabase.com/sign-up"
echo "2. Remplir le fichier .env.local avec les clés"
echo "3. Lancer: npm run dev"
echo ""
echo "📖 Documentation: docs/SEMAINE1-RESUME.md"
echo ""
