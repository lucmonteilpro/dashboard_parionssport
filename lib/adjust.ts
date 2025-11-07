// lib/adjust.ts
// Client pour récupérer les données d'Adjust

interface AdjustEvent {
    date: string
    app: string
    installs: number
    clicks: number
    impressions: number
    cost: number
  }
  
  export async function getAdjustData(dateFrom: string, dateTo: string) {
    const token = process.env.ADJUST_API_TOKEN
  
    if (!token) {
      throw new Error('ADJUST_API_TOKEN non configuré')
    }
  
    try {
      console.log('📲 Appel Adjust API...')
  
      // Adjust API endpoint
      const url = `https://dash.adjust.com/control-center/reports/csv_export?date_from=${dateFrom}&date_to=${dateTo}&metrics=impressions,clicks,installs,cost&group_by=day,campaign_name&format=json`
  
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  
      if (!response.ok) {
        throw new Error(`Adjust API error: ${response.status}`)
      }
  
      const data = await response.json()
  
      // Transformer au format Sheet
      const rows = data.map((row: any) => [
        row.day,                    // A: Date
        'Sharper',                  // B: App (Channel)
        row.campaign_name,          // C: Campaign Name
        row.impressions || 0,       // D: Impressions
        row.clicks || 0,            // E: Clicks
        row.installs || 0,          // F: Installs
        row.cost || 0,              // G: Cost
      ])
  
      console.log(`✅ ${rows.length} lignes transformées`)
      return rows
    } catch (error) {
      console.error('❌ Erreur Adjust:', error)
      throw error
    }
  }
  