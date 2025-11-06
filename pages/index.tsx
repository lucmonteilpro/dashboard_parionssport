/**
 * EXPLICATION:
 * Page racine (/) qui redirige automatiquement vers /login
 * ou /dashboard selon si l'utilisateur est authentifié
 */

import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function IndexPage() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }, [router])

  return null
}
