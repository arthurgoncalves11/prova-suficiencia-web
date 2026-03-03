import { View } from '../types/filme'

interface HeaderProps {
  view: View
  onNavigate: (view: View) => void
  onNew: () => void
}

export function Header({ view, onNavigate, onNew }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎬</span>
          <h1 className="text-xl font-bold text-gray-900">Filmes</h1>
        </div>
        <nav className="flex gap-2">
          <button
            onClick={() => onNavigate('lista')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              view === 'lista'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📋 Lista
          </button>
          <button
            onClick={onNew}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              view === 'form'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            ➕ Novo
          </button>
        </nav>
      </div>
    </header>
  )
}
