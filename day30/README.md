# Fullstack Demo (Day30)

This workspace contains a minimal Express API and a Vite + React frontend demonstrating login, token storage, protected route, error display, loading indicators, and logout.

Server
- Location: [server](server)
- Run:

```powershell
cd server
npm install
npm start
```

Client
- Location: [client](client)
- Run:

```powershell
cd client
npm install
npm run dev
```

Usage
- Open `http://localhost:5173`.
- Login with username `user` and password `pass`.
- The app stores a token in `localStorage` and calls the protected API.
