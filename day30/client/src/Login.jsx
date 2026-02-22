import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [apiError, setApiError] = useState(null)
  const { login, loading } = useContext(AuthContext)
  const navigate = useNavigate()

  const validate = () => {
    const errs = {}
    if (!username.trim()) errs.username = 'Username is required'
    if (!password) errs.password = 'Password is required'
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    setApiError(null)
    if (!validate()) return
    const res = await login(username.trim(), password)
    if (res.ok) navigate('/protected')
    else setApiError(res.message)
  }

  return (
    <form className="login" onSubmit={submit} noValidate>
      <h2>Login</h2>
      {apiError && <div className="error">{apiError}</div>}
      <label>
        Username
        <input value={username} onChange={(e) => setUsername(e.target.value)} aria-invalid={!!fieldErrors.username} />
        {fieldErrors.username && <div className="field-error">{fieldErrors.username}</div>}
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} aria-invalid={!!fieldErrors.password} />
        {fieldErrors.password && <div className="field-error">{fieldErrors.password}</div>}
      </label>
      <button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
      <p className="hint">Use username: <strong>user</strong> and password: <strong>pass</strong></p>
    </form>
  )
}
