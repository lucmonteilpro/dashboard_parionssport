// pages/api/sync-adjust.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { getAdjustData } from '@/lib/adjust'

interface SyncResponse {
  success: boolean
  message?: string
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SyncResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  try {
    console.log('🚀 Sync Adjust → Google Sheets')

    // Récupérer les données d'hier
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const dateStr = yesterday.toISOString().split('T')[0]

    // Récupérer les données d'Adjust
    const rows = await getAdjustData(dateStr, dateStr)

    if (rows.length === 0) {
      console.log('⚠️ Aucune donnée Adjust')
      return res.status(200).json({
        success: true,
        message: 'Aucune donnée',
      })
    }

    // Pousser dans Google Sheets
    const sheetId = process.env.GOOGLE_SHEET_ID
    const apiKey = process.env.GOOGLE_API_KEY

    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/'ParionsSport Data'!A:G:append?key=${apiKey}`

    const sheetResponse = await fetch(sheetsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: rows,
      }),
    })

    if (!sheetResponse.ok) {
      throw new Error(`Sheet API error: ${sheetResponse.status}`)
    }

    console.log(`✅ ${rows.length} lignes ajoutées`)

    return res.status(200).json({
      success: true,
      message: `${rows.length} lignes synchronisées`,
    })
  } catch (error: any) {
    console.error('❌ Erreur:', error.message)
    return res.status(500).json({
      success: false,
      error: 'Erreur serveur',
    })
  }
}