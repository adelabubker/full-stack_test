import React, { useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './Login'
import Protected from './Protected'
import { AuthProvider, AuthContext } from './AuthContext'
import ProtectedRoute from './ProtectedRoute'

function AppInner() {
  const { token, logout } = useContext(AuthContext)
  return (
    <div className="app">
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/protected">Protected</Link>
        {token ? <button onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<div>Welcome to the demo app. Use <Link to="/login">Login</Link>.</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/protected" element={<ProtectedRoute><Protected /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  )
}
