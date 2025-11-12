/**
 * EXPLICATION:
 * Composant React qui affiche un tableau avec les campagnes et leurs KPIs:
 * - Nom campagne
 * - Budget et spend
 * - Barre de progression
 * - Clics, Installations, CPI
 * - Statut
 */

import type { Campaign } from '@/lib/googleSheets'
import ProgressBar from './ProgressBar'

interface CampaignTableProps {
  campaigns: Campaign[]
  loading?: boolean
}

export default function CampaignTable({ campaigns, loading = false }: CampaignTableProps) {
  // Formater un nombre en devise EUR
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Formater un nombre avec séparateurs
  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('fr-FR').format(value)
  }

  // État de chargement
  if (loading) {
    return (
      <div className="table-container p-8 text-center">
        <div className="inline-block">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <p className="text-gray-600 mt-4">Chargement des campagnes...</p>
      </div>
    )
  }

  // Pas de campagnes
  if (campaigns.length === 0) {
    return (
      <div className="table-container p-8 text-center">
        <p className="text-gray-500">Aucune campagne trouvée.</p>
      </div>
    )
  }

  return (
    <div className="table-container overflow-x-auto">
      <table className="w-full">
        {/* Header du tableau */}
        <thead>
          <tr className="table-header">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
              Campagne
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
              Budget & Spend
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
              Progression
            </th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
              Clics
            </th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
              Installs
            </th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
              CPI
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
              Statut
            </th>
          </tr>
        </thead>

        {/* Body du tableau */}
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id} className="table-row">
              {/* Nom campagne */}
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900 max-w-xs truncate" title={campaign.name}>
                  {campaign.name}
                </div>
              </td>

              {/* Budget et Spend */}
              <td className="px-6 py-4 text-sm">
                <div className="font-medium text-gray-900">
                  {formatCurrency(campaign.spendTotal)} / {formatCurrency(campaign.totalBudget)}
                </div>
                <div className="text-xs text-gray-500">
                  Aujourd'hui: {formatCurrency(campaign.spendToday)}
                </div>

              </td>

              {/* Barre de progression */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <ProgressBar
                    percentage={Math.min(campaign.percentageSpent, 100)}
                    label={`${campaign.percentageSpent.toFixed(1)}%`}
                  />
                </div>
              </td>

              {/* Clics */}
              <td className="px-6 py-4 text-right text-sm text-gray-900">
                {formatNumber(campaign.totalClicks)}
              </td>

              {/* Installations */}
              <td className="px-6 py-4 text-right text-sm text-gray-900">
                {formatNumber(campaign.totalInstalls)}
              </td>

              {/* CPI (Cost Per Install) */}
              <td className="px-6 py-4 text-right text-sm text-gray-900">
                {campaign.cpi ? formatCurrency(campaign.cpi) : '–'}
              </td>

              {/* Statut */}
              <td className="px-6 py-4 text-center">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    campaign.status === 'live'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full mr-1.5 bg-current"></span>
                  {campaign.status === 'live' ? 'En direct' : 'Paused'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}