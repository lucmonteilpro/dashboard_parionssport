// pages/dashboard/deal-desk.tsx

import DashboardNav from '@/components/DashboardNav'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface Deal {
  id: string
  dealName: string
  dealId: string
  dealType: string
  sellingParty: string
  buyingParty: string
  startDate: string
  endDate: string
  qualityScore: string
  status: string
}

const deals: Deal[] = [
  {
    id: '1',
    dealName: 'MAF_ParionsSport',
    dealId: '1932428',
    dealType: 'CPI',
    sellingParty: 'N.A',
    buyingParty: 'N.A',
    startDate: 'N.A',
    endDate: 'N.A',
    qualityScore: 'N.A',
    status: 'To be validated',
  },
]

export default function DealDeskPage() {
  const router = useRouter()
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>(deals)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDealType, setFilterDealType] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    }
  }, [router])

  useEffect(() => {
    let filtered = deals

    if (searchTerm) {
      filtered = filtered.filter((deal) =>
        deal.dealName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.dealId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterDealType !== 'All') {
      filtered = filtered.filter((deal) => deal.dealType === filterDealType)
    }

    if (filterStatus !== 'All') {
      filtered = filtered.filter((deal) => deal.status === filterStatus)
    }

    setFilteredDeals(filtered)
  }, [searchTerm, filterDealType, filterStatus])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'To be validated':
        return 'bg-yellow-100 text-yellow-800'
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Paused':
        return 'bg-gray-100 text-gray-800'
      case 'Archived':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <>
      <Head>
        <title>Deal Desk - Parions Sport DSP</title>
      </Head>

      <div className="flex min-h-screen bg-gray-50">
        <DashboardNav />

        <div className="flex-1">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 border-b-4 border-blue-800 shadow-lg">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-white">Deal Desk</h1>
                  <p className="text-blue-100 text-sm">Manage your deals and advertising contracts</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-white font-semibold">Live</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Deals Section */}
            <div className="mb-8">
              {/* Title + Buttons */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Deals</h2>
                <div className="flex items-center gap-4">
                  <button 
                    disabled 
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed opacity-50 flex items-center gap-2"
                  >
                    + Create Delivery Profiles
                  </button>
                  <button 
                    disabled 
                    className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed opacity-50 flex items-center gap-2"
                  >
                    ⚙️ Manage Delivery Profiles
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <select
                  value={filterDealType}
                  onChange={(e) => setFilterDealType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:border-gray-400 transition"
                >
                  <option value="All">Deal Type (All)</option>
                  <option value="CPI">CPI</option>
                  <option value="CPC">CPC</option>
                  <option value="CPM">CPM</option>
                  <option value="CPA">CPA</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:border-gray-400 transition"
                >
                  <option value="All">Deal Status (All)</option>
                  <option value="To be validated">To be validated</option>
                  <option value="Active">Active</option>
                  <option value="Paused">Paused</option>
                  <option value="Archived">Archived</option>
                </select>

                <select className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:border-gray-400 transition">
                  <option>Prioritize status (All)</option>
                </select>

                <select className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:border-gray-400 transition">
                  <option>Default-On (All)</option>
                </select>

                <div className="flex-1 min-w-xs">
                  <input
                    type="text"
                    placeholder="Search Deals"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
                  ⋮
                </button>
              </div>

              {/* Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-lg">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        DEAL NAME
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        DEAL ID
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        DEAL TYPE
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        SELLING PARTY
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        BUYING PARTY
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        START DATE
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        END DATE
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        DEAL QUALITY SCORE
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        STATUS
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDeals.length > 0 ? (
                      filteredDeals.map((deal) => (
                        <tr key={deal.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                          <td className="px-6 py-4">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {deal.dealName}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {deal.dealId}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                              {deal.dealType}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {deal.sellingParty}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {deal.buyingParty}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {deal.startDate}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {deal.endDate}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {deal.qualityScore}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(deal.status)}`}>
                              {deal.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <button className="text-blue-600 hover:text-blue-800 font-medium">
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={11} className="px-6 py-12 text-center text-gray-500">
                          No deals
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-6">
                <p className="text-sm text-gray-600">
                  Report period: <strong>Last 7 days</strong>
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{filteredDeals.length} results</span>
                  <button className="px-3 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50">
                    ‹
                  </button>
                  <span className="px-3 py-1 bg-blue-600 text-white rounded">1</span>
                  <button className="px-3 py-1 text-gray-500 hover:text-gray-700">
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}