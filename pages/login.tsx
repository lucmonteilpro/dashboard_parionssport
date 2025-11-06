/**
 * EXPLICATION:
 * Page de login avec:
 * 1. Formulaire email + password
 * 2. Appel API /api/auth/login
 * 3. Stockage du token en localStorage
 * 4. Redirection vers /dashboard si succès
 */

import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  /**
   * Fonction pour gérer la soumission du formulaire
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Appel API POST à /api/auth/login
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!data.success) {
        setError(data.error || 'Erreur d\'authentification')
        setLoading(false)
        return
      }

      // Stocker le token en localStorage
      localStorage.setItem('token', data.token)

      // Rediriger vers le dashboard
      router.push('/dashboard')
    } catch (err) {
      console.error('Erreur login:', err)
      setError('Erreur serveur. Veuillez réessayer.')
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Login - Dashboard Parions Sport</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="login-container">
        <div className="login-card">
          {/* Logo */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-blue-600">Parions Sport</h1>
            <p className="text-gray-600 mt-2">Dashboard DSP - Accès Campagnes</p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="ton@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Bouton Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          {/* Footer info */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Dashboard réservé à Parions Sport</p>
          </div>
        </div>
      </div>
    </>
  )
}
