import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from './api'

export default function Protected() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await api.get('/api/protected')
        setData(res.data.data)
      } catch (err) {
        if (err.message?.toLowerCase().includes('missing') || err.message?.toLowerCase().includes('invalid')) {
          navigate('/login')
          return
        }
        setError(err.message || 'Error fetching protected data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [navigate])

  if (loading) return <div>Loading protected data...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div>
      <h2>Protected</h2>
      <div className="card">{data}</div>
    </div>
  )
}
