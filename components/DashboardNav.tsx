// components/DashboardNav.tsx

import Link from 'next/link'
import { useRouter } from 'next/router'

interface NavItem {
  label: string
  icon: string
  href?: string
  submenu?: Array<{ label: string; href: string }>
}

const navItems: NavItem[] = [
    {
      label: 'Libraries',
      icon: '📚',
      submenu: [
        { label: 'Audiences', href: '/dashboard/audiences' },
        { label: 'Creatives', href: '/dashboard/creatives' },
      ],
    },
    {
      label: 'Tools',
      icon: '🛠️',
      href: '/dashboard/tools',
    },
    {
      label: 'Reports',
      icon: '📊',
      href: '/dashboard/reports',
    },
    {
      label: 'Advertiser Settings',
      icon: '⚙️',
      href: '/dashboard/settings',
    },
    {
        label: 'Deal Desk',
        icon: '🤝',
        href: '/dashboard/deal-desk',
      },
  ]

export default function DashboardNav() {
  const router = useRouter()

  return (
    <div className="w-64 bg-gray-100 border-r border-gray-300 min-h-screen p-4">
      {/* 🏠 Bouton Accueil en haut */}
      <Link href="/dashboard">
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition cursor-pointer mb-6 ${
            router.pathname === '/dashboard'
              ? 'bg-gray-600 text-white'  // ✅ Gris foncé
              : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span>🏠</span>
          <span className="font-semibold">Accueil</span>
        </div>
      </Link>

      {/* Divider */}
      <div className="border-t border-gray-300 mb-6"></div>

      {/* Navigation items */}
      {navItems.map((item) => (
        <div key={item.label} className="mb-2">
          {/* Item sans submenu */}
          {!item.submenu && item.href && (
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                ['Tools', 'Reports', 'Advertiser Settings'].includes(item.label)
                  ? 'text-gray-400 cursor-not-allowed opacity-50'
                  : router.pathname === item.href
                  ? 'bg-blue-600 text-white cursor-pointer'
                  : 'text-gray-700 hover:bg-gray-200 cursor-pointer'
              }`}
              onClick={() => {
                if (!['Tools', 'Reports', 'Advertiser Settings'].includes(item.label) && item.href) {
                  router.push(item.href)  // ✅ Vérifie que item.href existe
                }
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          )}

          {/* Item avec submenu */}
          {item.submenu && (
            <div>
              <div className="flex items-center gap-3 px-4 py-3 text-gray-700 font-medium">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
              <div className="ml-4 space-y-1">
                {item.submenu.map((sub) => (
                  <Link key={sub.href} href={sub.href}>
                    <div
                      className={`block px-4 py-2 rounded-lg transition text-sm cursor-pointer ${
                        router.pathname === sub.href
                          ? 'bg-blue-100 text-blue-600 font-semibold'
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {sub.label}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}