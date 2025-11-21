/**
 * Campaign Settings Component
 * Budget, CPA, CPI and strategy (READ ONLY)
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
  // Fixed values
  const monthlyBudget = 20000
  const cpaObjective = 80
  const targetCpi = 10
  const strategy = 80

  return (
    <div className="mb-6 p-6 bg-white rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">⚙️ Campaign Settings</h3>

      {/* 3-column grid - READ ONLY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Monthly Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Budget
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
          <p className="text-xs text-gray-500 mt-1">Total budget for the month</p>
        </div>

        {/* CPA Objective */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CPA Objective
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
          <p className="text-xs text-gray-500 mt-1">Target cost per acquisition</p>
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
          <p className="text-xs text-gray-500 mt-1">Target cost per install</p>
        </div>
      </div>

      {/* CPA vs CPI Strategy */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-medium text-gray-700">
            Strategy: CPA vs CPI
          </label>
          <div className="flex gap-4 text-sm">
            <span className="font-medium text-blue-600">CPA: {strategy}%</span>
            <span className="font-medium text-gray-600">CPI: {100 - strategy}%</span>
          </div>
        </div>

        {/* Slider - DISABLED */}
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
            ? `🔵 CPA Priority: ${strategy}% - Optimize for acquisitions`
            : `🟢 CPI Priority: ${100 - strategy}% - Optimize for installs`}
        </p>
      </div>

      {/* Quick Overview */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-3 rounded">
            <p className="text-xs text-gray-600">Daily Budget</p>
            <p className="text-lg font-bold text-blue-600">
              €{(monthlyBudget / 31).toFixed(2)}
            </p>
          </div>
          <div className="bg-green-50 p-3 rounded">
            <p className="text-xs text-gray-600">Potential Installs</p>
            <p className="text-lg font-bold text-green-600">
              {Math.floor(monthlyBudget / targetCpi)}
            </p>
          </div>
          <div className="bg-purple-50 p-3 rounded">
            <p className="text-xs text-gray-600">Potential Acquisitions</p>
            <p className="text-lg font-bold text-purple-600">
              {Math.floor(monthlyBudget / cpaObjective)}
            </p>
          </div>
          <div className="bg-orange-50 p-3 rounded">
            <p className="text-xs text-gray-600">CPA/CPI Efficiency</p>
            <p className="text-lg font-bold text-orange-600">
              {((cpaObjective / targetCpi) * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>

      {/* Important Note */}
      <p className="text-xs italic text-gray-500 mt-4 pt-4 border-t border-gray-200">
        Parameters cannot be modified on this UI
      </p>
    </div>
  )
}