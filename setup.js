#!/usr/bin/env node

/**
 * SCRIPT DE SETUP
 * 
 * Aide à configurer le projet avec les bonnes variables d'environnement
 * Utilisation: node setup.js
 */

const fs = require('fs')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query) {
  return new Promise((resolve) => rl.question(query, (answer) => resolve(answer)))
}

async function main() {
  console.log('\n🎯 Configuration Dashboard Parions Sport\n')

  // Demander les infos
  const email = await question('Email admin (défaut: parions@sport.fr): ')
  const password = await question('Mot de passe admin: ')
  const googleApiKey = await question(
    'Google API Key (obtenir depuis https://console.cloud.google.com/): '
  )

  console.log('\n⏳ Génération du hash du mot de passe...')
  const hash = await bcrypt.hash(password, 10)

  const jwtSecret = crypto.randomBytes(32).toString('base64')

  console.log('\n✅ Configuration générée!\n')

  const envContent = `# ===== GOOGLE SHEETS API =====
NEXT_PUBLIC_GOOGLE_SHEET_ID=1smJhv7bcumwsIw8zO1D7pQaLmxornGUcSDqEButCaos
GOOGLE_API_KEY=${googleApiKey}

# ===== AUTHENTIFICATION =====
ADMIN_EMAIL=${email || 'parions@sport.fr'}
ADMIN_PASSWORD_HASH=${hash}
JWT_SECRET=${jwtSecret}

# ===== GÉNÉRAL =====
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
`

  fs.writeFileSync('.env.local', envContent)

  console.log('📝 Fichier .env.local créé avec succès!')
  console.log('\n📋 Résumé de la configuration:')
  console.log(`   Email: ${email || 'parions@sport.fr'}`)
  console.log(`   API Key: ${googleApiKey.substring(0, 10)}...`)
  console.log('\n✨ Prêt! Lancer avec: npm run dev\n')

  rl.close()
}

main().catch(console.error)
