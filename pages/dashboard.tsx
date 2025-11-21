// pages/dashboard.tsx

import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import DashboardNav from '@/components/DashboardNav'
import CampaignTable from '@/components/CampaignTable'
import DateFilter from '@/components/DateFilter'
import CampaignSettings from '@/components/CampaignSettings'
import type { Campaign } from '@/lib/googleSheets'

export default function Dashboard() {
  const router = useRouter()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')

        const params = new URLSearchParams()
        if (startDate) params.append('startDate', startDate)
        if (endDate) params.append('endDate', endDate)

        const response = await fetch(`/api/campaigns?${params}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) throw new Error('Retrieval error')

        const data = await response.json()
        if (data.success) {
          setCampaigns(data.campaigns)
          setFilteredCampaigns(data.campaigns)
        } else {
          setError(data.error || 'Error')
        }
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    fetchCampaigns()
  }, [startDate, endDate, router])

  const handleDateChange = (newStartDate: string, newEndDate: string) => {
    setStartDate(newStartDate)
    setEndDate(newEndDate)
  }

  const totalCampaigns = filteredCampaigns.length
  const totalSpend = filteredCampaigns.reduce((sum, c) => sum + c.spendTotal, 0)
  const totalClicks = filteredCampaigns.reduce((sum, c) => sum + c.totalClicks, 0)
  const totalInstalls = filteredCampaigns.reduce((sum, c) => sum + c.totalInstalls, 0)

  return (
    <>
      <Head>
        <title>Dashboard - Parions Sport DSP</title>
      </Head>

      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar Navigation */}
        <DashboardNav />

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 border-b-4 border-blue-800 shadow-lg">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between gap-4">
                {/* Logos on the left */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="bg-white rounded-lg p-2">
                    <img 
                      src="/logo-sharper.png" 
                      alt="Sharper" 
                      className="h-10 w-auto"
                    />
                  </div>
                  
                  <img 
                    src="/logo-parionssport.png" 
                    alt="Parions Sport" 
                    className="h-8 w-auto"
                  />
                </div>

                {/* Text + Live in the center */}
                <div className="flex items-center gap-4 flex-1 justify-center">
                  <div>
                    <h1 className="text-2xl font-bold text-white">Parions Sport</h1>
                    <p className="text-blue-100 text-sm">Dashboard DSP - Campaigns</p>
                  </div>

                  {/* Live indicator */}
                  <div className="flex items-center gap-2 ml-6">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-white font-semibold">Live</span>
                  </div>
                </div>

                {/* Logout on the right */}
                <div className="flex-shrink-0">
                  <button
                    onClick={() => {
                      localStorage.removeItem('token')
                      router.push('/login')
                    }}
                    className="px-4 py-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition shadow-md"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <DateFilter onDateChange={handleDateChange} />

            <CampaignSettings />

            <div className="mb-8">
              <div className="flex justify-between items-baseline">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Your Campaigns</h2>
                  <p className="text-gray-600 mt-1">Overview of all your DSP campaigns and their performance</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  {filteredCampaigns.length} campaign{filteredCampaigns.length > 1 ? 's' : ''}
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                Error: {error}
              </div>
            )}

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
                <p className="text-gray-600 mt-4">Loading data...</p>
              </div>
            ) : filteredCampaigns.length > 0 ? (
              <>
                <CampaignTable campaigns={filteredCampaigns} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">Total Campaigns</p>
                        <p className="text-4xl font-bold text-gray-900 mt-2">{totalCampaigns}</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-lg">
                        📊
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">Total Spend</p>
                        <p className="text-4xl font-bold text-gray-900 mt-2">
                          {totalSpend.toLocaleString('en-US', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
                        </p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-lg">
                        💰
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">Total Clicks</p>
                        <p className="text-4xl font-bold text-gray-900 mt-2">
                          {totalClicks.toLocaleString('en-US')}
                        </p>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-lg">
                        🖱️
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">Total Installs</p>
                        <p className="text-4xl font-bold text-gray-900 mt-2">
                          {totalInstalls.toLocaleString('en-US')}
                        </p>
                      </div>
                      <div className="bg-orange-100 p-3 rounded-lg">
                        📱
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-600 text-lg">No campaigns found for this period</p>
                <p className="text-gray-500 text-sm mt-2">Try changing the dates</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}