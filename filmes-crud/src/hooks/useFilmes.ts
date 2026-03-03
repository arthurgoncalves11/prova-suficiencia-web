import { useState, useEffect } from 'react'
import { Filme, FilmeForm } from '../types/filme'
import { getFilmes, saveFilmes } from '../utils/storage'

export function useFilmes() {
  const [filmes, setFilmes] = useState<Filme[]>(getFilmes)

  useEffect(() => {
    saveFilmes(filmes)
  }, [filmes])

  function addFilme(form: FilmeForm): void {
    const novo: Filme = { ...form, id: Date.now() }
    setFilmes(prev => [novo, ...prev])
  }

  function updateFilme(id: number, form: FilmeForm): void {
    setFilmes(prev => prev.map(f => (f.id === id ? { ...form, id } : f)))
  }

  function deleteFilme(id: number): void {
    setFilmes(prev => prev.filter(f => f.id !== id))
  }

  return { filmes, addFilme, updateFilme, deleteFilme }
}
