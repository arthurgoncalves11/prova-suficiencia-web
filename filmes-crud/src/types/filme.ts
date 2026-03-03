export type Genero =
  | 'Ação'
  | 'Comédia'
  | 'Drama'
  | 'Terror'
  | 'Ficção Científica'
  | 'Romance'
  | 'Animação'
  | 'Documentário'

export interface Filme {
  id: number
  titulo: string
  diretor: string
  ano: number
  genero: Genero
  nota: number
}

export type FilmeForm = Omit<Filme, 'id'>

export type View = 'lista' | 'form'
