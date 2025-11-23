// pages/dashboard/audiences.tsx

import DashboardNav from '@/components/DashboardNav'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface AudienceState {
  // Demographics
  ages: string[]
  genders: string[]
  
  // Audience Segments
  firstPartyAudiences: string[]
  interestSegments: string[]
  intentBehavioral: string[]
  
  // Contextual Targeting
  topics: string[]
  
  // Device Targeting
  deviceTypes: string[]
  osTypes: string[]
  osVersion: string
  deviceModels: string[]
  connections: string[]
  
  // Geo Targeting
  country: string
  region: string
  city: string
  zip: string
  radius: string
  geoExclusion: string
  
  // Tech & Delivery
  dayparting: string
  weekdays: string
  impressionsPerUser: string
  clicksPerUser: string
  viewability: string
  environment: string[]
}

export default function AudiencesPage() {
  const router = useRouter()
  const [audience, setAudience] = useState<AudienceState>({
    // Demographics - tous sauf 14-18
    ages: ['18-25', '26-35', '36-45', '45-59', '60+'],
    genders: ['All', 'Male', 'Female'],
    
    // Audience Segments
    firstPartyAudiences: [],
    interestSegments: ['Gamers', 'Sports & Fitness', 'Lifestyle & Fashion', 'Finance & Banking', 'Travel Enthusiasts', 'Entertainment', 'Foodies', 'Students', 'Parents', 'High Value Shoppers (CSP+)'],
    intentBehavioral: ['High spenders', 'Long-term players', 'Purchasers (IAP)'],
    
    // Contextual
    topics: ['Gaming', 'Puzzle games', 'RPG & Strategy', 'Finance news', 'Fitness & health', 'Travel', 'Shopping', 'Entertainment'],
    
    // Device
    deviceTypes: ['Mobile', 'Tablet'],
    osTypes: ['iOS', 'Android'],
    osVersion: '',
    deviceModels: [],
    connections: ['WiFi', '4G', '5G'],
    
    // Geo
    country: 'France',
    region: '',
    city: '',
    zip: '',
    radius: '',
    geoExclusion: '',
    
    // Tech & Delivery
    dayparting: 'All hours',
    weekdays: 'All days',
    impressionsPerUser: '3',
    clicksPerUser: '1',
    viewability: '50%+ viewable',
    environment: ['In-app', 'Mobile web'],
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    }
  }, [router])

  const handleCheckboxChange = (field: keyof AudienceState, value: string) => {
    if (Array.isArray(audience[field])) {
      const array = audience[field] as string[]
      if (array.includes(value)) {
        setAudience({
          ...audience,
          [field]: array.filter(item => item !== value)
        })
      } else {
        setAudience({
          ...audience,
          [field]: [...array, value]
        })
      }
    }
  }

  const handleInputChange = (field: keyof AudienceState, value: string) => {
    setAudience({
      ...audience,
      [field]: value
    })
  }

  return (
    <>
      <Head>
        <title>Audiences - Parions Sport DSP</title>
      </Head>

      <div className="flex min-h-screen bg-gray-50">
        <DashboardNav />

        <div className="flex-1">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 border-b-4 border-blue-800 shadow-lg">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-white">Audiences</h1>
                  <p className="text-blue-100 text-sm">Setup complet d'une audience (lecture seule)</p>
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
            {/* Section Targeting */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-lg opacity-75 cursor-not-allowed space-y-8">
              
              {/* 1. DEMOGRAPHICS */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Demographics</h2>
                
                {/* Age */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Age</h3>
                  <div className="flex flex-wrap items-center gap-6">
                    {['14-18', '18-25', '26-35', '36-45', '45-59', '60+'].map((ageRange) => (
                      <label key={ageRange} className="flex items-center cursor-not-allowed">
                        <input
                          type="checkbox"
                          checked={audience.ages.includes(ageRange)}
                          onChange={() => handleCheckboxChange('ages', ageRange)}
                          disabled
                          className="w-4 h-4 text-blue-600 disabled:opacity-50 rounded"
                        />
                        <span className="ml-3 text-gray-700 font-medium">{ageRange}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Gender */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Gender</h3>
                  <div className="flex items-center gap-6">
                    {['All', 'Male', 'Female'].map((gender) => (
                      <label key={gender} className="flex items-center cursor-not-allowed">
                        <input
                          type="checkbox"
                          checked={audience.genders.includes(gender)}
                          onChange={() => handleCheckboxChange('genders', gender)}
                          disabled
                          className="w-4 h-4 text-blue-600 disabled:opacity-50 rounded"
                        />
                        <span className="ml-3 text-gray-700 font-medium">{gender}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              {/* 2. AUDIENCE SEGMENTS */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">👤 Audience Segments</h2>
                
                {/* First-Party Audiences */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">First-Party Audiences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {['Upload CRM list', 'App user list', 'Lookalike audiences', 'Re-engagement audiences'].map((item) => (
                      <label key={item} className="flex items-center cursor-not-allowed p-3 rounded-lg">
                        <input
                          type="checkbox"
                          checked={audience.firstPartyAudiences.includes(item)}
                          onChange={() => handleCheckboxChange('firstPartyAudiences', item)}
                          disabled
                          className="w-4 h-4 text-blue-600 disabled:opacity-50 rounded"
                        />
                        <span className="ml-3 text-gray-700 font-medium">{item}</span>
                      </label>
                    ))}
                  </div>
                  <button disabled className="px-4 py-2 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed opacity-50">
                    📤 Upload
                  </button>
                </div>

                {/* Interest Segments */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Interest Segments</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Gamers', 'Sports & Fitness', 'Lifestyle & Fashion', 'Finance & Banking', 'Travel Enthusiasts', 'Entertainment', 'Foodies', 'Students', 'Parents', 'High Value Shoppers (CSP+)'].map((segment) => (
                      <label key={segment} className="flex items-center cursor-not-allowed p-3 rounded-lg">
                        <input
                          type="checkbox"
                          checked={audience.interestSegments.includes(segment)}
                          onChange={() => handleCheckboxChange('interestSegments', segment)}
                          disabled
                          className="w-4 h-4 text-blue-600 disabled:opacity-50 rounded"
                        />
                        <span className="ml-3 text-gray-700 font-medium">{segment}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Intent & Behavioral */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Intent & Behavioral (Performance-focused)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Recent app installers', 'High spenders', 'Long-term players', 'Purchasers (IAP)', 'Subscription-friendly users', 'Frequent app users', 'Recent search intent'].map((item) => (
                      <label key={item} className="flex items-center cursor-not-allowed p-3 rounded-lg">
                        <input
                          type="checkbox"
                          checked={audience.intentBehavioral.includes(item)}
                          onChange={() => handleCheckboxChange('intentBehavioral', item)}
                          disabled
                          className="w-4 h-4 text-blue-600 disabled:opacity-50 rounded"
                        />
                        <span className="ml-3 text-gray-700 font-medium">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              {/* 3. CONTEXTUAL TARGETING */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">🔍 Contextual Targeting</h2>
                
                {/* Keywords */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Keywords</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Add keyword list</label>
                      <input type="text" disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Exclusion keyword list</label>
                      <input type="text" disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed" />
                    </div>
                  </div>
                  <button disabled className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed opacity-50">
                    📤 Upload
                  </button>
                </div>

                {/* Topics / Categories */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Topics / Categories</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Gaming', 'Puzzle games', 'RPG & Strategy', 'Finance news', 'Fitness & health', 'Travel', 'Shopping', 'Entertainment'].map((topic) => (
                      <label key={topic} className="flex items-center cursor-not-allowed p-3 rounded-lg">
                        <input
                          type="checkbox"
                          checked={audience.topics.includes(topic)}
                          onChange={() => handleCheckboxChange('topics', topic)}
                          disabled
                          className="w-4 h-4 text-blue-600 disabled:opacity-50 rounded"
                        />
                        <span className="ml-3 text-gray-700 font-medium">{topic}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Domain / App Lists */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Domain / App Lists</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Whitelist</label>
                      <input type="text" disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Blacklist</label>
                      <input type="text" disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed" />
                    </div>
                  </div>
                  <button disabled className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed opacity-50">
                    📤 Upload
                  </button>
                </div>
              </section>

              {/* 4. DEVICE TARGETING */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">📱 Device Targeting</h2>
                
                {/* Device Type */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Type</h3>
                  <div className="flex items-center gap-6">
                    {['Mobile', 'Tablet'].map((device) => (
                      <label key={device} className="flex items-center cursor-not-allowed">
                        <input
                          type="checkbox"
                          checked={audience.deviceTypes.includes(device)}
                          onChange={() => handleCheckboxChange('deviceTypes', device)}
                          disabled
                          className="w-4 h-4 text-blue-600 disabled:opacity-50 rounded"
                        />
                        <span className="ml-3 text-gray-700 font-medium">{device}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* OS */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">OS</h3>
                  <div className="flex items-center gap-6">
                    {['iOS', 'Android'].map((os) => (
                      <label key={os} className="flex items-center cursor-not-allowed">
                        <input
                          type="checkbox"
                          checked={audience.osTypes.includes(os)}
                          onChange={() => handleCheckboxChange('osTypes', os)}
                          disabled
                          className="w-4 h-4 text-blue-600 disabled:opacity-50 rounded"
                        />
                        <span className="ml-3 text-gray-700 font-medium">{os}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Device Models */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Models</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">All Devices</span>
                    <button 
                      disabled 
                      className="px-4 py-2 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed opacity-50"
                    >
                      Select device to exclude
                    </button>
                  </div>
                </div>

                {/* Connection */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Connection</h3>
                  <div className="flex items-center gap-6">
                    {['WiFi', '4G', '5G'].map((conn) => (
                      <label key={conn} className="flex items-center cursor-not-allowed">
                        <input
                          type="checkbox"
                          checked={audience.connections.includes(conn)}
                          onChange={() => handleCheckboxChange('connections', conn)}
                          disabled
                          className="w-4 h-4 text-blue-600 disabled:opacity-50 rounded"
                        />
                        <span className="ml-3 text-gray-700 font-medium">{conn}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              {/* 5. GEO TARGETING */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">🌍 Geo Targeting</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <input 
                      type="text" 
                      disabled 
                      value={audience.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                    <input 
                      type="text" 
                      disabled 
                      value={audience.region}
                      onChange={(e) => handleInputChange('region', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input 
                      type="text" 
                      disabled 
                      value={audience.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ZIP</label>
                    <input 
                      type="text" 
                      disabled 
                      value={audience.zip}
                      onChange={(e) => handleInputChange('zip', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Radius (km)</label>
                    <input 
                      type="text" 
                      disabled 
                      value={audience.radius}
                      onChange={(e) => handleInputChange('radius', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Geo Exclusion</label>
                    <input 
                      type="text" 
                      disabled 
                      value={audience.geoExclusion}
                      onChange={(e) => handleInputChange('geoExclusion', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </section>

              {/* 6. TECH & DELIVERY CONTROLS */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">🧪 Tech & Delivery Controls</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dayparting</label>
                    <input 
                      type="text" 
                      disabled 
                      value={audience.dayparting}
                      onChange={(e) => handleInputChange('dayparting', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weekdays / Weekends</label>
                    <input 
                      type="text" 
                      disabled 
                      value={audience.weekdays}
                      onChange={(e) => handleInputChange('weekdays', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Impressions per user</label>
                    <input 
                      type="text" 
                      disabled 
                      value={audience.impressionsPerUser}
                      onChange={(e) => handleInputChange('impressionsPerUser', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Clicks per user</label>
                    <input 
                      type="text" 
                      disabled 
                      value={audience.clicksPerUser}
                      onChange={(e) => handleInputChange('clicksPerUser', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Environment</label>
                    <div className="flex items-center gap-6 mt-2">
                      {['In-app', 'Mobile web'].map((env) => (
                        <label key={env} className="flex items-center cursor-not-allowed">
                          <input
                            type="checkbox"
                            checked={audience.environment.includes(env)}
                            onChange={() => handleCheckboxChange('environment', env)}
                            disabled
                            className="w-4 h-4 text-blue-600 disabled:opacity-50 rounded"
                          />
                          <span className="ml-2 text-gray-700 font-medium text-sm">{env}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* SUMMARY */}
              <section className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-4">📋 Résumé de l'Audience Setup:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <strong>Ages:</strong> {audience.ages.join(', ')}
                  </div>
                  <div>
                    <strong>Genders:</strong> {audience.genders.join(', ')}
                  </div>
                  <div>
                    <strong>Interest Segments:</strong> {audience.interestSegments.slice(0, 3).join(', ')}...
                  </div>
                  <div>
                    <strong>Device Types:</strong> {audience.deviceTypes.join(', ')}
                  </div>
                  <div>
                    <strong>OS:</strong> {audience.osTypes.join(', ')}
                  </div>
                  <div>
                    <strong>Location:</strong> {audience.country}
                  </div>
                  <div>
                    <strong>Connections:</strong> {audience.connections.join(', ')}
                  </div>
                  <div>
                    <strong>Frequency Capping:</strong> {audience.impressionsPerUser} impressions, {audience.clicksPerUser} clicks
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}