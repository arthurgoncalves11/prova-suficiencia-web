import { useState } from 'react'
import { Filme } from '../types/filme'
import { FilmeCard } from './FilmeCard'

interface FilmeListaProps {
  filmes: Filme[]
  onEdit: (filme: Filme) => void
  onDelete: (id: number) => void
  onNew: () => void
}

export function FilmeLista({ filmes, onEdit, onDelete, onNew }: FilmeListaProps) {
  const [search, setSearch] = useState('')

  const filtered = filmes.filter(
    f =>
      f.titulo.toLowerCase().includes(search.toLowerCase()) ||
      f.diretor.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Buscar por título ou diretor..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <span className="text-sm text-gray-400 whitespace-nowrap">
          {filtered.length} filme(s)
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-3">🎞️</div>
          <p className="text-sm">
            {filmes.length === 0
              ? 'Nenhum filme cadastrado ainda.'
              : 'Nenhum resultado encontrado.'}
          </p>
          {filmes.length === 0 && (
            <button
              onClick={onNew}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700"
            >
              Cadastrar primeiro filme
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map(filme => (
            <FilmeCard
              key={filme.id}
              filme={filme}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
