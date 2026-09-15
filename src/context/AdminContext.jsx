import { createContext, useContext, useEffect, useState } from 'react'

const AdminContext = createContext()

const CREDENTIALS = { username: 'admin', password: 'admin123' }

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function AdminProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(() => localStorage.getItem('admin_auth') === '1')
  const [messages, setMessages] = useState(() => load('adm_messages', []))

  // Persist messages whenever they change
  useEffect(() => {
    localStorage.setItem('adm_messages', JSON.stringify(messages))
  }, [messages])

  const login = (username, password) => {
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
      localStorage.setItem('admin_auth', '1')
      setIsAuthed(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('admin_auth')
    setIsAuthed(false)
  }

  const addMessage = (msg) => {
    const entry = {
      id: Date.now().toString(36),
      ...msg,
      read: false,
      createdAt: new Date().toISOString(),
    }
    setMessages((prev) => [entry, ...prev])
    return entry
  }

  const toggleRead = (id) =>
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: !m.read } : m)))

  const deleteMessage = (id) => setMessages((prev) => prev.filter((m) => m.id !== id))

  const markAllRead = () => setMessages((prev) => prev.map((m) => ({ ...m, read: true })))

  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <AdminContext.Provider
      value={{
        isAuthed,
        login,
        logout,
        messages,
        addMessage,
        toggleRead,
        deleteMessage,
        markAllRead,
        unreadCount,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  return useContext(AdminContext)
}
