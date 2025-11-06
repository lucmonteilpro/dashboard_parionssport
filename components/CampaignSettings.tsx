/**
 * Composant des paramètres de campagne
 * Budget, CPA, CPI et stratégie (LECTURE SEULE)
 */

import React from 'react'

interface CampaignSettingsProps {
  onSettingsChange?: (settings: CampaignSettingsData) => void
}

export interface CampaignSettingsData {
  monthlyBudget: number
  cpgObjective: number
  targetCpi: number
  strategy: number
}

export default function CampaignSettings({ onSettingsChange }: CampaignSettingsProps) {
  // Valeurs fixes
  const monthlyBudget = 20000
  const cpaObjective = 80
  const targetCpi = 10
  const strategy = 80

  return (
    <div className="mb-6 p-6 bg-white rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">⚙️ Settings Campagne</h3>

      {/* Grid 3 colonnes - LECTURE SEULE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Budget Mensuel */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget Mensuel
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-600">€</span>
            <input
              type="number"
              value={monthlyBudget}
              disabled
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Budget total pour le mois</p>
        </div>

        {/* Objectif CPA */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Objectif CPA
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-600">€</span>
            <input
              type="number"
              step="0.01"
              value={cpaObjective}
              disabled
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Coût par acquisition cible</p>
        </div>

        {/* Target CPI */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target CPI
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-600">€</span>
            <input
              type="number"
              step="0.01"
              value={targetCpi}
              disabled
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Coût par installation cible</p>
        </div>
      </div>

      {/* Stratégie CPA vs CPI */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-medium text-gray-700">
            Stratégie: CPA vs CPI
          </label>
          <div className="flex gap-4 text-sm">
            <span className="font-medium text-blue-600">CPA: {strategy}%</span>
            <span className="font-medium text-gray-600">CPI: {100 - strategy}%</span>
          </div>
        </div>

        {/* Slider - DÉSACTIVÉ */}
        <div className="flex items-center gap-4 opacity-60 pointer-events-none">
          <span className="text-xs font-medium text-gray-600 w-10">CPA</span>
          <input
            type="range"
            min="0"
            max="100"
            value={strategy}
            disabled
            className="flex-1 h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg appearance-none cursor-not-allowed"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${strategy}%, #10b981 ${strategy}%, #10b981 100%)`,
            }}
          />
          <span className="text-xs font-medium text-gray-600 w-10 text-right">CPI</span>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          {strategy >= 50
            ? `🔵 Priorité CPA: ${strategy}% - Optimiser pour les acquisitions`
            : `🟢 Priorité CPI: ${100 - strategy}% - Optimiser pour les installations`}
        </p>
      </div>

      {/* Visualisation rapide */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-3 rounded">
            <p className="text-xs text-gray-600">Budget/jour</p>
            <p className="text-lg font-bold text-blue-600">
              €{(monthlyBudget / 31).toFixed(2)}
            </p>
          </div>
          <div className="bg-green-50 p-3 rounded">
            <p className="text-xs text-gray-600">Installs potentiels</p>
            <p className="text-lg font-bold text-green-600">
              {Math.floor(monthlyBudget / targetCpi)}
            </p>
          </div>
          <div className="bg-purple-50 p-3 rounded">
            <p className="text-xs text-gray-600">Acquisitions potentielles</p>
            <p className="text-lg font-bold text-purple-600">
              {Math.floor(monthlyBudget / cpaObjective)}
            </p>
          </div>
          <div className="bg-orange-50 p-3 rounded">
            <p className="text-xs text-gray-600">Efficacité CPA/CPI</p>
            <p className="text-lg font-bold text-orange-600">
              {((cpaObjective / targetCpi) * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>

      {/* Note importante */}
      <p className="text-xs italic text-gray-500 mt-4 pt-4 border-t border-gray-200">
        Les paramètres ne peuvent être modifiés sur cette UI
      </p>
    </div>
  )
}