// lib/api.ts
// 🔓 FRONTEND - Appelle VOTRE serveur uniquement (pas Google)

const API_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function fetchCampaigns(token: string) {
  if (!token) {
    throw new Error('Non authentifié');
  }

  // ✅ Appeler VOTRE API (pas Google!)
  const response = await fetch(`${API_URL}/api/campaigns`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erreur de chargement');
  }

  return response.json();
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Identifiants incorrects');
  }

  return response.json();
}