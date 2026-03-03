import { Toast as ToastType } from '../hooks/useToast'

interface ToastProps {
  toast: ToastType | null
}

export function Toast({ toast }: ToastProps) {
  if (!toast) return null

  return (
    <div
      className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all ${
        toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
      }`}
    >
      {toast.message}
    </div>
  )
}
