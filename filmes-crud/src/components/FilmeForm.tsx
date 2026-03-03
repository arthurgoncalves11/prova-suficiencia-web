import { useState, useEffect } from 'react'
import { Filme, FilmeForm as FilmeFormType, Genero } from '../types/filme'

const GENEROS: Genero[] = [
  'Ação',
  'Comédia',
  'Drama',
  'Terror',
  'Ficção Científica',
  'Romance',
  'Animação',
  'Documentário',
]

const EMPTY_FORM: RawForm = {
  titulo: '',
  diretor: '',
  ano: '',
  genero: '',
  nota: '',
}

// Raw form uses strings for controlled inputs
interface RawForm {
  titulo: string
  diretor: string
  ano: string
  genero: string
  nota: string
}

type FormErrors = Partial<Record<keyof RawForm, string>>

interface FilmeFormProps {
  editTarget: Filme | null
  onSubmit: (form: FilmeFormType, id?: number) => void
  onCancel: () => void
}

export function FilmeForm({ editTarget, onSubmit, onCancel }: FilmeFormProps) {
  const [form, setForm] = useState<RawForm>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})

  // Populate form when editing
  useEffect(() => {
    if (editTarget) {
      setForm({
        titulo: editTarget.titulo,
        diretor: editTarget.diretor,
        ano: String(editTarget.ano),
        genero: editTarget.genero,
        nota: String(editTarget.nota),
      })
    } else {
      setForm(EMPTY_FORM)
    }
    setErrors({})
  }, [editTarget])

  function validate(): FormErrors {
    const e: FormErrors = {}
    if (!form.titulo.trim()) e.titulo = 'Título obrigatório'
    if (!form.diretor.trim()) e.diretor = 'Diretor obrigatório'
    const ano = Number(form.ano)
    if (!form.ano || isNaN(ano) || ano < 1888 || ano > 2026)
      e.ano = 'Ano inválido (1888–2026)'
    if (!form.genero) e.genero = 'Selecione um gênero'
    const nota = Number(form.nota)
    if (!form.nota || isNaN(nota) || nota < 1 || nota > 5)
      e.nota = 'Nota entre 1 e 5'
    return e
  }

  function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length) {
      setErrors(e)
      return
    }
    const parsed: FilmeFormType = {
      titulo: form.titulo.trim(),
      diretor: form.diretor.trim(),
      ano: Number(form.ano),
      genero: form.genero as Genero,
      nota: Number(form.nota),
    }
    onSubmit(parsed, editTarget?.id)
  }

  function setField(field: keyof RawForm, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 max-w-lg mx-auto">
      <h2 className="text-lg font-bold text-gray-800 mb-6">
        {editTarget ? '✏️ Editar Filme' : '🎬 Cadastrar Filme'}
      </h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            value={form.titulo}
            onChange={e => setField('titulo', e.target.value)}
            placeholder="Ex: Interestelar"
            className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              errors.titulo ? 'border-red-400 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.titulo && (
            <span className="text-xs text-red-500">{errors.titulo}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Diretor</label>
          <input
            type="text"
            value={form.diretor}
            onChange={e => setField('diretor', e.target.value)}
            placeholder="Ex: Christopher Nolan"
            className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              errors.diretor ? 'border-red-400 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.diretor && (
            <span className="text-xs text-red-500">{errors.diretor}</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Ano</label>
            <input
              type="number"
              value={form.ano}
              onChange={e => setField('ano', e.target.value)}
              placeholder="2024"
              className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                errors.ano ? 'border-red-400 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.ano && (
              <span className="text-xs text-red-500">{errors.ano}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Nota (1–5)</label>
            <input
              type="number"
              value={form.nota}
              onChange={e => setField('nota', e.target.value)}
              placeholder="4"
              min={1}
              max={5}
              className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                errors.nota ? 'border-red-400 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.nota && (
              <span className="text-xs text-red-500">{errors.nota}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Gênero</label>
          <select
            value={form.genero}
            onChange={e => setField('genero', e.target.value)}
            className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white ${
              errors.genero ? 'border-red-400 bg-red-50' : 'border-gray-300'
            }`}
          >
            <option value="">Selecione...</option>
            {GENEROS.map(g => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.genero && (
            <span className="text-xs text-red-500">{errors.genero}</span>
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-6 justify-end">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          className="px-5 py-2 text-sm rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
        >
          {editTarget ? 'Salvar' : 'Cadastrar'}
        </button>
      </div>
    </div>
  )
}
