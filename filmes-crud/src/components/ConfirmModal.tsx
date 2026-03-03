interface ConfirmModalProps {
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmModal({ onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-80">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Confirmar exclusão
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Tem certeza que deseja remover este filme?
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}
