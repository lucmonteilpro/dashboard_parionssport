/**
 * EXPLICATION:
 * Composant React simple pour afficher une barre de progression
 * avec:
 * - Barre visuelle avec couleur qui change selon le pourcentage
 * - Label du pourcentage
 */

interface ProgressBarProps {
  percentage: number
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function ProgressBar({
  percentage,
  label,
  size = 'md',
}: ProgressBarProps) {
  // Clamp percentage entre 0 et 100
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100)

  // Déterminer la couleur selon le pourcentage
  let colorClass = 'bg-green-500'    // < 50%: vert
  if (clampedPercentage > 75) {
    colorClass = 'bg-red-500'        // > 75%: rouge
  } else if (clampedPercentage > 50) {
    colorClass = 'bg-yellow-500'     // > 50%: orange
  }

  // Déterminer la hauteur selon la taille
  const heightClass = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  }[size]

  const labelSizeClass = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }[size]

  return (
    <div className="w-full">
      {/* Barre */}
      <div className={`w-full ${heightClass} bg-gray-200 rounded-full overflow-hidden`}>
        <div
          className={`${colorClass} ${heightClass} rounded-full transition-all duration-500`}
          style={{ width: `${clampedPercentage}%` }}
        ></div>
      </div>

      {/* Label */}
      {label && (
        <div className={`mt-1 text-right ${labelSizeClass} font-medium text-gray-700`}>
          {label}
        </div>
      )}
    </div>
  )
}
