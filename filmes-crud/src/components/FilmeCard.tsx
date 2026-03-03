import { Filme } from '../types/filme'
import { StarRating } from './StarRating'
import { GenreBadge } from './GenreBadge'

interface FilmeCardProps {
  filme: Filme
  onEdit: (filme: Filme) => void
  onDelete: (id: number) => void
}

export function FilmeCard({ filme, onEdit, onDelete }: FilmeCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-start justify-between gap-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-semibold text-gray-900 text-base">{filme.titulo}</h3>
          <GenreBadge genero={filme.genero} />
        </div>
        <p className="text-sm text-gray-500">
          {filme.diretor} · {filme.ano}
        </p>
        <StarRating value={filme.nota} />
      </div>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => onEdit(filme)}
          className="p-2 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors"
          title="Editar"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(filme.id)}
          className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
          title="Excluir"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}
