/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration React stricte (détecte les erreurs)
  reactStrictMode: true,
  
  // Support des variables d'environnement
  env: {
    NEXT_PUBLIC_GOOGLE_SHEET_ID: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID,
  },
}

module.exports = nextConfig
