/**
 * API Endpoint pour récupérer les campagnes
 * Supporte le filtrage par date
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import { authManager } from '@/lib/auth'
import { googleSheetsClient, type Campaign } from '@/lib/googleSheets'

interface CampaignsResponse {
  success: boolean
  campaigns?: Campaign[]
  error?: string
}

function verifyAuth(req: NextApiRequest): boolean {
  const authHeader = req.headers.authorization
  const token = authHeader?.replace('Bearer ', '')
  
  // ✅ Utiliser authManager.verifyToken() (comme en login!)
  return authManager.verifyToken(token || '') !== null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CampaignsResponse>
) {
  if (!verifyAuth(req)) {
    return res.status(401).json({
      success: false,
      error: 'Non autorisé'
    })
  }

  try {
    // Récupérer les paramètres de date
    const { startDate, endDate } = req.query

    // Récupérer les vraies données du Google Sheets
    const campaigns = await googleSheetsClient.getCampaigns(
      startDate as string | undefined,
      endDate as string | undefined
    )
    
    return res.status(200).json({
      success: true,
      campaigns
    })
  } catch (error: any) {
    console.error('Erreur getCampaigns:', error.message)
    return res.status(500).json({
      success: false,
      error: error.message || 'Erreur lors de la récupération des campagnes'
    })
  }
}