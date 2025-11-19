// pages/dashboard/audiences.tsx

import DashboardNav from '@/components/DashboardNav'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const categories = [
  'Tous',
  'CSP+',
  'Voyageurs',
  'Sportifs',
  'Gamers',
  'Parents',
  'Étudiants',
]

export default function AudiencesPage() {
  const router = useRouter()
  const [selectedGender, setSelectedGender] = useState('All')
  const [selectedAge, setSelectedAge] = useState<string[]>(['18-25', '26-35', '36-45', '45-59', '60+'])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Tous'])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    }
  }, [router])

  const handleCategoryChange = (category: string) => {
    if (category === 'Tous') {
      setSelectedCategories(['Tous'])
    } else {
      let newCategories = selectedCategories.filter((c) => c !== 'Tous')
      if (newCategories.includes(category)) {
        newCategories = newCategories.filter((c) => c !== category)
      } else {
        newCategories.push(category)
      }
      setSelectedCategories(newCategories.length > 0 ? newCategories : ['Tous'])
    }
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
                  <p className="text-blue-100 text-sm">Créé tes audiences (fonctionnalité indisponible en lecture seule)</p>
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
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Upload tes Audiences</h3>
                <p className="text-gray-600 mb-4">Drag and drop tes audiences ici ou clique pour les rechercher</p>
                <button
                  disabled
                  className="px-6 py-2 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed"
                >
                  Choisis ton fichier
                </button>
              </div>
            </div>

            {/* Section Targeting */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-lg opacity-75 cursor-not-allowed">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Créer votre Targeting</h2>

              {/* Age */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Age</h3>
                <div className="flex flex-wrap items-center gap-6">
                  {['14-18', '18-25', '26-35', '36-45', '45-59', '60+'].map((ageRange) => (
                    <label key={ageRange} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAge.includes(ageRange)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedAge([...selectedAge, ageRange])
                          } else {
                            setSelectedAge(selectedAge.filter((age) => age !== ageRange))
                          }
                        }}
                        disabled
                        className="w-4 h-4 text-blue-600 disabled:opacity-50 rounded"
                      />
                      <span className="ml-3 text-gray-700 font-medium">{ageRange}</span>
                    </label>
                  ))}
                </div>
                <button
                  disabled
                  className="mt-4 px-6 py-2 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed opacity-50"
                >
                  Définir avec précision
                </button>
              </div>

              {/* Sexe */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sexe</h3>
                <div className="flex items-center gap-6">
                  {['All', 'Homme', 'Femmes'].map((gender) => (
                    <label key={gender} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={selectedGender === gender}
                        onChange={(e) => setSelectedGender(e.target.value)}
                        disabled
                        className="w-4 h-4 text-blue-600 disabled:opacity-50"
                      />
                      <span className="ml-3 text-gray-700 font-medium">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Catégories */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Catégories</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center cursor-not-allowed p-3 rounded-lg transition"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        disabled
                        className="w-4 h-4 text-blue-600 rounded disabled:opacity-50"
                      />
                      <span className="ml-3 text-gray-700 font-medium">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Upload Exclusion JSON (grisé) */}
              <div className="bg-gray-50 rounded-lg border border-gray-300 p-6 opacity-50 cursor-not-allowed">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Upload une exclusion</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Upload ton JSON pour exclure une audience spécifique
                </p>
                <button
                  disabled
                  className="px-6 py-2 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed"
                >
                  📎 Upload JSON
                </button>
              </div>

              {/* Summary */}
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-3">Résumé du Targeting:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>📅 <strong>Age:</strong> {selectedAge.join(', ')}</li>
                  <li>👥 <strong>Sexe:</strong> {selectedGender}</li>
                  <li>🏷️ <strong>Catégories:</strong> {selectedCategories.join(', ')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}