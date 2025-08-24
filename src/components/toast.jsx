import React, { useEffect, useState } from 'react'
import { useHiring } from '../contexts/HiringContext'
import { LucideX } from 'lucide-react'

const Toast = () => {
  const { toast } = useHiring()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (toast) {
      setVisible(true)
      const timer = setTimeout(() => setVisible(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  if (!toast || !visible) return null

  const typeClasses = {
    success: 'bg-green-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-white',
    error: 'bg-red-500 text-white',
    default: 'bg-gray-800 text-white'
  }

  return (
    <div
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-5 py-3 rounded-xl shadow-xl max-w-sm w-full mx-4 sm:mx-0 sm:max-w-md
        ${typeClasses[toast.type] || typeClasses.default}
        animate-fade-in-up
        backdrop-blur-sm
        border border-white/20
      `}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm sm:text-base font-medium">{toast.message}</p>
        <button
          onClick={() => setVisible(false)}
          className="ml-3 p-1 rounded-full hover:bg-white/20 transition-colors"
        >
          <LucideX className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  )
}

export default Toast
