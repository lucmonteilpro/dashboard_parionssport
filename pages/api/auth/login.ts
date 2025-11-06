/**
 * API Endpoint: POST /api/auth/login
 * Authentifie avec email + mot de passe
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import { authManager } from '@/lib/auth'

interface LoginResponse {
  success: boolean
  token?: string
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Méthode non autorisée',
    })
  }

  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email et mot de passe requis',
      })
    }

    // ✅ AUTHENTIFIER VRAIMENT (pas de bypass!)
    const token = await authManager.authenticate(email, password)

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Email ou mot de passe incorrect',
      })
    }

    return res.status(200).json({
      success: true,
      token,
    })
  } catch (error) {
    console.error('Erreur login:', error)
    return res.status(500).json({
      success: false,
      error: 'Erreur serveur',
    })
  }
}