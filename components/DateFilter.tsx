/**
 * Composant de sélection de dates
 * Permet de filtrer les campagnes par date
 */

import React, { useState } from 'react'

interface DateFilterProps {
  onDateChange: (startDate: string, endDate: string) => void
}

export default function DateFilter({ onDateChange }: DateFilterProps) {
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  )
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split('T')[0]
  )

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value
    setStartDate(newStartDate)
    onDateChange(newStartDate, endDate)
  }

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value
    setEndDate(newEndDate)
    onDateChange(startDate, newEndDate)
  }

  const handleLastWeek = () => {
    const end = new Date()
    const start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    setStartDate(start.toISOString().split('T')[0])
    setEndDate(end.toISOString().split('T')[0])
    onDateChange(start.toISOString().split('T')[0], end.toISOString().split('T')[0])
  }

  const handleLastMonth = () => {
    const end = new Date()
    const start = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    setStartDate(start.toISOString().split('T')[0])
    setEndDate(end.toISOString().split('T')[0])
    onDateChange(start.toISOString().split('T')[0], end.toISOString().split('T')[0])
  }

  const handleAllTime = () => {
    const start = '2025-01-01'
    const end = new Date().toISOString().split('T')[0]
    setStartDate(start)
    setEndDate(end)
    onDateChange(start, end)
  }

  return (
    <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 items-end flex-1">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date de début
            </label>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date de fin
            </label>
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleLastWeek}
            className="px-3 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition"
          >
            7 jours
          </button>
          <button
            onClick={handleLastMonth}
            className="px-3 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition"
          >
            30 jours
          </button>
          <button
            onClick={handleAllTime}
            className="px-3 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition"
          >
            Tous
          </button>
        </div>
      </div>
    </div>
  )
}