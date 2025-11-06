/**
 * EXPLICATION:
 * Ce fichier est le point d'entrée de toute l'application React.
 * Il:
 * 1. Importe les styles globaux (Tailwind CSS)
 * 2. Enveloppe toutes les pages avec les providers
 * 3. Gère les états globaux si nécessaire
 */

import type { AppProps } from 'next/app'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
