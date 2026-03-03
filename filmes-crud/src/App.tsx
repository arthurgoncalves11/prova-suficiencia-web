import { useState } from 'react'
import { Filme, FilmeForm as FilmeFormType, View } from './types/filme'
import { useFilmes } from './hooks/useFilmes'
import { useToast } from './hooks/useToast'
import { Header } from './components/Header'
import { Toast } from './components/Toast'
import { ConfirmModal } from './components/ConfirmModal'
import { FilmeLista } from './components/FilmeLista'
import { FilmeForm } from './components/FilmeForm'

export default function App() {
  const { filmes, addFilme, updateFilme, deleteFilme } = useFilmes()
  const { toast, showToast } = useToast()

  const [view, setView] = useState<View>('lista')
  const [editTarget, setEditTarget] = useState<Filme | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  function handleNew() {
    setEditTarget(null)
    setView('form')
  }

  function handleEdit(filme: Filme) {
    setEditTarget(filme)
    setView('form')
  }

  function handleFormSubmit(form: FilmeFormType, id?: number) {
    if (id) {
      updateFilme(id, form)
      showToast('Filme atualizado!')
    } else {
      addFilme(form)
      showToast('Filme cadastrado!')
    }
    setEditTarget(null)
    setView('lista')
  }

  function handleFormCancel() {
    setEditTarget(null)
    setView('lista')
  }

  function handleDeleteRequest(id: number) {
    setDeleteId(id)
  }

  function handleDeleteConfirm() {
    if (deleteId !== null) {
      deleteFilme(deleteId)
      showToast('Filme removido.', 'error')
      setDeleteId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Toast toast={toast} />

      {deleteId !== null && (
        <ConfirmModal
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteId(null)}
        />
      )}

      <Header view={view} onNavigate={setView} onNew={handleNew} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {view === 'form' ? (
          <FilmeForm
            editTarget={editTarget}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        ) : (
          <FilmeLista
            filmes={filmes}
            onEdit={handleEdit}
            onDelete={handleDeleteRequest}
            onNew={handleNew}
          />
        )}
      </main>
    </div>
  )
}
