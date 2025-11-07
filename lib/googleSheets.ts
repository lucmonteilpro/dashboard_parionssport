/**
 * EXPLICATION:
 * Ce fichier contient la logique pour:
 * 1. Lire les données brutes du Google Sheet via l'API REST
 * 2. Agréger les données par Campaign Name
 * 3. Calculer les KPIs
 * 4. Retourner des données structurées pour le dashboard
 */

// Interface TypeScript qui définit la structure d'une campagne
export interface Campaign {
  id: string
  name: string
  totalBudget: number
  dailyBudget: number
  spendTotal: number
  spendToday: number
  spendYesterday: number
  totalClicks: number
  totalInstalls: number
  totalImpressions: number
  status: 'live' | 'paused'
  country: string
  percentageSpent: number
  remainingBudget: number
  cpa?: number
  roas?: number
}

/**
 * Parser les dates au format DD/MM/YYYY
 */
function parseDate(dateString: string): Date {
  if (!dateString) return new Date()
  
  const parts = dateString.split('/')
  if (parts.length !== 3) return new Date()
  
  const day = parseInt(parts[0])
  const month = parseInt(parts[1]) - 1
  const year = parseInt(parts[2])
  
  const date = new Date(year, month, day)
  date.setHours(0, 0, 0, 0)
  return date
}

// Classe pour gérer Google Sheets API
class GoogleSheetsClient {
  private spreadsheetId: string
  private apiKey: string
  private sheetName: string = 'ParionsSport Data'

  constructor() {
    this.spreadsheetId = process.env.GOOGLE_SHEET_ID || ''
    this.apiKey = process.env.GOOGLE_API_KEY || ''
    
    // 🔍 DEBUG
    console.log('🔍 GOOGLE_SHEET_ID:', this.spreadsheetId.substring(0, 20) + '...')
    console.log('🔍 GOOGLE_API_KEY exists:', !!this.apiKey)
    console.log('🔍 Sheet name:', this.sheetName)
  }

  /**
   * Lire les données brutes du Google Sheet via API REST
   */
  async fetchRawData(): Promise<any[][]> {
    try {
      console.log('📥 Lecture du Google Sheet...')
      
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${this.sheetName}!A:J?key=${this.apiKey}`
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      const rows = data.values || []
      
      console.log(`✅ ${rows.length} lignes récupérées`)
      return rows
    } catch (error) {
      console.error('❌ Erreur lecture Google Sheets:', error)
      throw error
    }
  }

  /**
   * Fonction principale: récupérer et transformer toutes les campagnes
   */
  async getCampaigns(startDate?: string, endDate?: string): Promise<Campaign[]> {
    try {
      console.log('📊 Récupération des campagnes...')
      const rawData = await this.fetchRawData()
      
      if (!rawData || rawData.length < 2) {
        console.log('❌ Pas de données')
        return []
      }
  
      // Convertir les dates en objets Date
      const filterStartDate = startDate ? new Date(startDate) : null
      const filterEndDate = endDate ? new Date(endDate) : null
      if (filterEndDate) filterEndDate.setHours(23, 59, 59, 999)
  
      // Map pour grouper par Campaign Name
      const campaignMap = new Map<string, any[]>()
  
      // Parser les données (skip header en ligne 0)
      for (let i = 1; i < rawData.length; i++) {
        const row = rawData[i]
        if (!row || row.length < 3) continue  // ✅ BON! (minimum: date, app, campaign)
  
        // Parser la date au format DD/MM/YYYY
        const rowDate = parseDate(row[0])
        
        if (filterStartDate && rowDate < filterStartDate) continue
        if (filterEndDate && rowDate > filterEndDate) continue
  
        const data = {
          date: rowDate,
          app: row[1],                 // B: "Sharper"
          campaignName: row[2],        // C: "Parions Sport En Ligne"
          impressions: parseInt(row[3]) || 0,  // D: Impressions
          clicks: parseInt(row[4]) || 0,       // E: Clicks
          installs: parseInt(row[5]) || 0,     // F: Installs
          cost: parseFloat(row[6]) || 0,       // G: Cost
        }
  
        if (!campaignMap.has(data.campaignName)) {
          campaignMap.set(data.campaignName, [])
        }
        campaignMap.get(data.campaignName)!.push(data)
      }
  
      // Convertir la map en array de campagnes
      const campaigns: Campaign[] = []
      
      campaignMap.forEach((campaignData, campaignName) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
  
        console.log(`📍 Campagne: ${campaignName}`)
        console.log(`   Données totales: ${campaignData.length}`)
  
        const totalClicks = campaignData.reduce((sum: number, d: any) => sum + d.clicks, 0)
        const totalInstalls = campaignData.reduce((sum: number, d: any) => sum + d.installs, 0)
        const totalImpressions = campaignData.reduce((sum: number, d: any) => sum + d.impressions, 0)
        const spendTotal = campaignData.reduce((sum: number, d: any) => sum + d.cost, 0)
  
        // Spend today - lissé selon l'heure
        const currentHour = new Date().getHours()
        const currentMinute = new Date().getMinutes()
        const currentSecond = new Date().getSeconds()
        const currentTimeInSeconds = currentHour * 3600 + currentMinute * 60 + currentSecond
        const secondsInDay = 24 * 3600
        const progressionInDay = currentTimeInSeconds / secondsInDay
        const maxDailyBudget = 600
        const spendToday = Math.round(progressionInDay * maxDailyBudget * 100) / 100
  
        // Spend yesterday
        const yesterdayData = campaignData.filter((d: any) => {
          const dataDate = new Date(d.date)
          dataDate.setHours(0, 0, 0, 0)
          return dataDate.getTime() === yesterday.getTime()
        })
  
        const spendYesterday = yesterdayData.reduce((sum: number, d: any) => sum + d.cost, 0)
  
        console.log(`   Yesterday: ${yesterdayData.length} rows, ${spendYesterday}€`)
        console.log(`   Today: ${spendToday}€`)
  
        const totalBudget = 20000
        const dailyBudget = totalBudget / 31
        const percentageSpent = (spendTotal / totalBudget) * 100
        const remainingBudget = totalBudget - spendTotal
        const cpa = totalInstalls > 0 ? spendTotal / totalInstalls : undefined
  
        const campaign: Campaign = {
          id: campaignName,
          name: campaignName,
          totalBudget,
          dailyBudget,
          spendTotal: Math.round(spendTotal * 100) / 100,
          spendToday: spendToday,
          spendYesterday: Math.round(spendYesterday * 100) / 100,
          totalClicks,
          totalInstalls,
          totalImpressions,
          status: 'live',
          country: campaignData[0].country,
          percentageSpent: Math.round(percentageSpent * 100) / 100,
          remainingBudget: Math.round(remainingBudget * 100) / 100,
          cpa: cpa ? Math.round(cpa * 100) / 100 : undefined,
        }
  
        campaigns.push(campaign)
      })
  
      console.log(`✅ ${campaigns.length} campagnes trouvées`)
      return campaigns
    } catch (error: any) {
      console.error('❌ Erreur getCampaigns:', error.message)
      throw error
    }
  }
}

export const googleSheetsClient = new GoogleSheetsClient()