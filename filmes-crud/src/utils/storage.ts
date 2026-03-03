import { Filme } from '../types/filme'

const STORAGE_KEY = 'filmes_filmes'

export function getFilmes(): Filme[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Filme[]) : []
  } catch {
    return []
  }
}

export function saveFilmes(filmes: Filme[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filmes))
}
