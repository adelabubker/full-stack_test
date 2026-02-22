const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 4000

app.post('/api/login', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) return res.status(400).json({ message: 'Username and password required' })
  if (username === 'user' && password === 'pass') {
    return res.json({ token: 'fake-jwt-token' })
  }
  return res.status(401).json({ message: 'Invalid credentials' })
})

app.get('/api/protected', (req, res) => {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).json({ message: 'Missing authorization header' })
  const parts = auth.split(' ')
  if (parts[0] !== 'Bearer' || parts[1] !== 'fake-jwt-token') return res.status(403).json({ message: 'Invalid token' })
  res.json({ data: 'This is protected data from the API.' })
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
