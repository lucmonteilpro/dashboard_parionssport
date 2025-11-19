// pages/dashboard/creatives.tsx

import DashboardNav from '@/components/DashboardNav'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Creative {
  id: string
  name: string
  format: string
  status: 'live' | 'paused'
  url: string
  filename: string
}

const creatives: Creative[] = [
    {
      id: '1',
      name: 'GIF_DISPLAY APP-320x480',
      format: '320x480',
      status: 'live',
      url: '/creatives/GIF_DISPLAY APP-320x480.gif',  // ← ESPACE ici!
      filename: 'GIF_DISPLAY APP-320x480.gif',
    },
    {
      id: '2',
      name: 'GIF_DISPLAY APP-300x250',
      format: '300x250',
      status: 'live',
      url: '/creatives/GIF_DISPLAY APP-300x250.gif',  // ← ESPACE ici!
      filename: 'GIF_DISPLAY APP-300x250.gif',
    },
    {
      id: '3',
      name: 'GIF_DISPLAY APP-320x50',
      format: '320x50',
      status: 'live',
      url: '/creatives/GIF_DISPLAY APP-320x50.gif',  // ← ESPACE ici!
      filename: 'GIF_DISPLAY APP-320x50.gif',
    },
    {
      id: '4',
      name: 'GIF_DISPLAY-APP-1000x627',
      format: '1000x627',
      status: 'live',
      url: '/creatives/GIF_DISPLAY-APP-1000x627.gif',  // ← Tiret!
      filename: 'GIF_DISPLAY-APP-1000x627.gif',
    },
  ]

export default function CreativesPage() {
  const router = useRouter()
  const [selectedCreative, setSelectedCreative] = useState<Creative | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    }
  }, [router])

  return (
    <>
      <Head>
        <title>Creatives - Parions Sport DSP</title>
      </Head>

      <div className="flex min-h-screen bg-gray-50">
        <DashboardNav />

        <div className="flex-1">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 border-b-4 border-blue-800 shadow-lg">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-white">Creatives</h1>
                  <p className="text-blue-100 text-sm">Gérez vos créatives publicitaires</p>
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
                        {/* Section Upload (grisée/factice) */}
                        <div className="mb-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-8 opacity-50 cursor-not-allowed">
                        <div className="text-center">
                            <div className="text-4xl mb-4">📤</div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">Upload Creatives</h3>
                            <p className="text-gray-600 mb-4">Drag and drop les creatives ici</p>
                            <button
                            disabled
                            className="px-6 py-2 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed"
                            >
                            Choose Files
                            </button>
                            <p className="text-gray-500 text-sm mt-4">Non disponible en lecture seule</p>
                        </div>
                        </div>

                        <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Vos Creatives</h2>
                        <p className="text-gray-600">Gérez vos créatives publicitaires</p>
                        </div>

                        {/* Tableau des créatives */}
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-lg">
                        <table className="w-full">
                            <thead className="bg-gray-100 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                Nom de la Créa
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                Format
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                Status
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                Aperçu
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {creatives.map((creative) => (
                                <tr
                                key={creative.id}
                                className="border-b border-gray-200 hover:bg-gray-50 transition"
                                >
                                {/* Nom */}
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    {creative.name}
                                </td>

                                {/* Format */}
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {creative.format}
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                                    <span className="text-sm font-semibold text-green-600">
                                        Live
                                    </span>
                                    </div>
                                </td>

                                {/* Aperçu - GIF affiché directement */}
                                <td className="px-6 py-4">
                                    <div className="relative w-24 h-24 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 cursor-pointer hover:shadow-md transition"
                                    onClick={() => setSelectedCreative(creative)}
                                    >
                                    <img
                                        src={creative.url}
                                        alt={creative.name}
                                        className="w-full h-full object-cover"
                                    />
                                    </div>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <p className="text-gray-600 text-sm font-medium">Total Creatives</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{creatives.length}</p>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <p className="text-gray-600 text-sm font-medium">Live</p>
                            <p className="text-3xl font-bold text-green-600 mt-2">
                            {creatives.filter((c) => c.status === 'live').length}
                            </p>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <p className="text-gray-600 text-sm font-medium">Paused</p>
                            <p className="text-3xl font-bold text-gray-600 mt-2">
                            {creatives.filter((c) => c.status === 'paused').length}
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

      {/* Modal aperçu plein écran */}
      {selectedCreative && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedCreative(null)}
        >
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {selectedCreative.name}
              </h3>
              <button
                onClick={() => setSelectedCreative(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 flex justify-center">
              <img
                src={selectedCreative.url}
                alt={selectedCreative.name}
                className="max-w-full max-h-96 rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}