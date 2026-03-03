import { useState, useEffect } from 'react'

export type ToastType = 'success' | 'error'

export interface Toast {
  message: string
  type: ToastType
}

export function useToast() {
  const [toast, setToast] = useState<Toast | null>(null)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 2500)
    return () => clearTimeout(timer)
  }, [toast])

  function showToast(message: string, type: ToastType = 'success') {
    setToast({ message, type })
  }

  return { toast, showToast }
}
