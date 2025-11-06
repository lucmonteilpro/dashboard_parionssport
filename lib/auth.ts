/**
 * EXPLICATION:
 * Ce fichier contient la logique d'authentification:
 * 1. Hachage de mots de passe avec bcrypt
 * 2. Génération de tokens JWT
 * 3. Vérification des tokens
 * 4. Valider les credentials email/password
 */

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// Interface pour le payload JWT
interface JWTPayload {
  email: string
  iat: number
  exp: number
}

/**
 * Classe pour gérer l'authentification
 */
class AuthManager {
  private jwtSecret: string
  private adminEmail: string
  private adminPasswordHash: string

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'default-secret-change-in-env'
    this.adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
    this.adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || ''
  }

  /**
   * Hacher un mot de passe avec bcrypt
   * À appeler AVANT le déploiement pour générer le hash
   * Utilisation: npm run hash-password
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10) // Nombre de rounds (10 = sûr)
    const hash = await bcrypt.hash(password, salt)
    return hash
  }

  /**
   * Vérifier si le mot de passe correspond au hash
   * Utilisé lors du login
   */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }

  /**
   * Générer un JWT token
   * Durée de vie: 7 jours
   */
  generateToken(email: string): string {
    const payload: JWTPayload = {
      email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 jours
    }

    const token = jwt.sign(payload, this.jwtSecret, { algorithm: 'HS256' })
    return token
  }

  /**
   * Vérifier et décoder un JWT token
   */
  verifyToken(token: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as JWTPayload
      return decoded
    } catch (error) {
      console.error('Token invalide:', error)
      return null
    }
  }

  /**
   * Authentifier un utilisateur avec email et mot de passe
   * Retourne le token si succès, null si erreur
   */
  async authenticate(email: string, password: string): Promise<string | null> {
    // Vérifier que l'email est correct
    if (email !== this.adminEmail) {
      console.warn(`❌ Email incorrect: ${email}`)
      return null
    }

    // Vérifier le mot de passe
    if (!this.adminPasswordHash) {
      console.error('❌ ADMIN_PASSWORD_HASH non configuré dans .env.local')
      return null
    }

    const isValidPassword = await this.comparePassword(password, this.adminPasswordHash)

    if (!isValidPassword) {
      console.warn('❌ Mot de passe incorrect')
      return null
    }

    // Générer et retourner le token
    const token = this.generateToken(email)
    console.log(`✅ Authentification réussie pour ${email}`)
    return token
  }

  /**
   * Extraire le token du header Authorization
   * Format: "Bearer <token>"
   */
  extractTokenFromHeader(authHeader: string | undefined): string | null {
    if (!authHeader) return null

    const parts = authHeader.split(' ')
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null
    }

    return parts[1]
  }
}

// Exporter une instance singleton
export const authManager = new AuthManager()
export type { JWTPayload }
