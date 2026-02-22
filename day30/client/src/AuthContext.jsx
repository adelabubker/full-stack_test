import React, { createContext, useState, useEffect } from 'react'
import api from './api'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  const login = async (username, password) => {
    setLoading(true)
    try {
      const res = await api.post('/api/login', { username, password })
      setToken(res.data.token)
      return { ok: true }
    } catch (err) {
      return { ok: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
