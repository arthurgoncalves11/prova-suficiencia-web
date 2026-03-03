import { Genero } from '../types/filme'

const colorMap: Record<Genero, string> = {
  Ação: 'bg-red-100 text-red-700',
  Comédia: 'bg-yellow-100 text-yellow-700',
  Drama: 'bg-blue-100 text-blue-700',
  Terror: 'bg-gray-200 text-gray-700',
  'Ficção Científica': 'bg-purple-100 text-purple-700',
  Romance: 'bg-pink-100 text-pink-700',
  Animação: 'bg-green-100 text-green-700',
  Documentário: 'bg-orange-100 text-orange-700',
}

interface GenreBadgeProps {
  genero: Genero
}

export function GenreBadge({ genero }: GenreBadgeProps) {
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
        colorMap[genero] ?? 'bg-gray-100 text-gray-600'
      }`}
    >
      {genero}
    </span>
  )
}
