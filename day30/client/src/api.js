import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 5000,
})

// attach token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// normalize errors
api.interceptors.response.use(
  (r) => r,
  (err) => {
    const message = err.response?.data?.message || err.message || 'Unknown error'
    return Promise.reject(new Error(message))
  }
)

export default api
