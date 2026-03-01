# K8 Automation — Enterprise Automation Agency Platform

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18+-blue?logo=react)](https://reactjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-8+-green?logo=mongodb)](https://www.mongodb.com)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

A **production-ready, full-stack web application** for a professional automation agency. Built with **React 18 + Node.js + MongoDB** featuring JWT authentication, role-based access control, comprehensive logging, input validation, and enterprise-grade security.

---

## 🚀 **Tech Stack**

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, React Router v6, Axios |
| **Backend** | Node.js, Express.js, MVC Architecture |
| **Database** | MongoDB, Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens), bcryptjs |
| **Security** | Helmet, express-rate-limit, input validation |
| **Logging** | Custom centralized logger with file persistence |
| **Validation** | express-validator with custom schemas |
| **Styling** | Custom CSS Design System (dark SaaS UI) |

---

## 📁 **Project Structure**

```
k8-automation/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection with retry logic
│   ├── constants/
│   │   └── index.js           # Centralized constants & messages
│   ├── controllers/
│   │   ├── authController.js  # Register, login, logout
│   │   ├── serviceController.js # Services CRUD
│   │   └── userController.js  # User management
│   ├── middleware/
│   │   ├── auth.js            # JWT + role-based middleware
│   │   └── errorHandler.js    # Global error handling
│   ├── models/
│   │   ├── User.js            # User schema with validation
│   │   └── Service.js         # Service schema
│   ├── routes/
│   │   ├── authRoutes.js      # Auth endpoints with validation
│   │   ├── serviceRoutes.js   # Service endpoints
│   │   └── userRoutes.js      # User management endpoints
│   ├── utils/
│   │   ├── generateToken.js   # JWT utility
│   │   ├── logger.js          # Centralized logging system
│   │   ├── validation.js      # Input validation schemas
│   │   └── seed.js            # Database seeder
│   ├── logs/                  # Application logs
│   ├── .env.example
│   ├── package.json
│   └── server.js              # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── DashboardLayout.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── Sidebar.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx  # Global auth state
    │   ├── pages/
    │   │   ├── HomePage.jsx     # Public landing
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── DashboardPage.jsx
    │   │   ├── ServicesPage.jsx
    │   │   ├── AddServicePage.jsx
    │   │   ├── EditServicePage.jsx
    │   │   ├── UsersPage.jsx
    │   │   ├── SettingsPage.jsx
    │   │   └── ContactPage.jsx
    │   ├── utils/
    │   │   └── api.js           # Axios instance + interceptors
    │   ├── App.jsx              # Routes
    │   ├── main.jsx             # Entry point
    │   └── index.css            # Design system
    ├── .env.example
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## 👥 **Role System**

| Role | Permissions |
|------|------------|
| **user** | Read public services, view own profile |
| **admin** | Add/edit services, no user management |
| **fullAdmin** | All access: users, services, roles, settings, delete operations |

---

## 🔐 **Security Features**

✅ **Password Security**
- Passwords hashed with bcryptjs (12 salt rounds)
- Never stored in plain text
- Secure password comparison

✅ **JWT Authentication**
- Configurable token expiration (default: 24 hours)
- Tokens stored in database for server-side invalidation
- Token revocation on logout
- Automatic token refresh on login

✅ **Request Security**
- Helmet middleware for HTTP headers
- Rate limiting (100 requests per 15 minutes)
- CORS properly configured
- Body size limits (10KB)

✅ **Input Validation**
- Express-validator schemas
- Email validation and normalization
- Password strength requirements
- Database index protection against duplicates

✅ **Error Handling**
- Centralized error handler
- No sensitive data in error responses
- Full error logging in development
- Generic responses in production

✅ **Logging & Monitoring**
- Centralized logger with 4 levels (INFO, WARN, ERROR, DEBUG)
- File persistence (`logs/app.log`)
- Request logging via Morgan
- Security event logging

---

## 🔌 **API Endpoints**

### **Authentication**
```
POST   /api/auth/register      # Register new account (public)
POST   /api/auth/login         # Login & get JWT (public)
POST   /api/auth/logout        # Logout (private)
GET    /api/auth/me            # Get current user (private)
```

### **Services**
```
GET    /api/services           # List all services (public)
GET    /api/services/:id       # Get service by ID (public)
POST   /api/services           # Create service (admin+)
PUT    /api/services/:id       # Update service (admin+)
DELETE /api/services/:id       # Delete service (fullAdmin)
```

### **Users**
```
GET    /api/users              # List all users (fullAdmin)
GET    /api/users/:id          # Get user details (fullAdmin)
DELETE /api/users/:id          # Delete user (fullAdmin)
PUT    /api/users/:id/role     # Change user role (fullAdmin)
```

### **Health Check**
```
GET    /api/health             # API status (public)
```

---

## ⚙️ **Setup & Installation**

### **Prerequisites**
- **Node.js** 18+ & npm 9+
- **MongoDB** (local or Atlas cloud)

### **1. Clone & Setup Backend**

```bash
cd backend
cp .env.example .env
```

**Edit `.env` with your values:**
```env
NODE_ENV=development
PORT=5000

# MongoDB
MONGO_URI=mongodb://localhost:27017/k8-automation
# OR MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/k8-automation

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=24h

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

```bash
npm install
```

### **2. Setup Frontend**

```bash
cd ../frontend
cp .env.example .env
```

**Edit `.env` with your values:**
```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm install
```

### **3. Seed Database (Optional)**

```bash
cd ../backend
node utils/seed.js
```

This creates:
- **Admin Account**
  - Email: `admin@k8automation.io`
  - Password: `admin123456`
- **6 sample services**
- **3 sample users (different roles)**

### **4. Run Development Servers**

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
# API: http://localhost:5000/api/health
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 **Pages & Routes**

| URL | Page | Access | Description |
|-----|------|--------|-------------|
| `/` | Home | Public | Landing page |
| `/login` | Login | Public | User authentication |
| `/register` | Register | Public | Create new account |
| `/dashboard` | Dashboard | Admin+ | Overview |
| `/dashboard/services` | Services List | Admin+ | Manage services |
| `/dashboard/services/add` | Add Service | Admin+ | Create new service |
| `/dashboard/services/edit/:id` | Edit Service | Admin+ | Update service |
| `/dashboard/users` | Users | FullAdmin | User management |
| `/dashboard/settings` | Settings | FullAdmin | App configuration |
| `/contact` | Contact | Public | Contact form |
| `/services` | Services | Public | View all services |

---

## 🚢 **Production Deployment**

### **Backend Deployment** (Railway, Render, Fly.io, Heroku)

1. Set environment variables in hosting platform:
   ```
   NODE_ENV=production
   MONGO_URI=your_production_mongo_uri
   JWT_SECRET=your_secure_jwt_secret
   FRONTEND_URL=your_production_frontend_url
   ```

2. Deploy the backend directory

3. Backend will be available at your hosting URL (e.g., `https://k8-api.railway.app`)

### **Frontend Deployment** (Vercel, Netlify)

1. Create `.env.production`:
   ```
   VITE_API_URL=https://your-backend-url/api
   ```

2. Build:
   ```bash
   npm run build
   ```

3. Deploy the `dist/` folder

4. Frontend will be available at your hosting URL (e.g., `https://k8-automation.vercel.app`)

---

## 📊 **System Improvements**

### **Logging System**
- 4 log levels: INFO, WARN, ERROR, DEBUG
- Console output with emoji indicators
- File persistence in `logs/app.log`
- Automatic log rotation (production-ready)

### **Constants Management**
- Centralized in `constants/index.js`
- All error messages in one place
- HTTP status codes enumeration
- Easy to maintain and update

### **Input Validation**
- Express-validator schemas
- Pre-defined for register, login, service creation
- Custom validation rules
- Clear error messages with field details

### **Error Handling**
- Centralized error middleware
- Specific handling for MongoDB errors
- JWT error processing
- Development vs. Production responses

### **Database Connection**
- Retry logic with exponential backoff (3 attempts)
- Connection timeouts
- Detailed logging of connection status

---

## 🔄 **API Response Format**

All endpoints return standardized JSON responses:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "id": "...",
    "name": "..."
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

---

## 🧪 **Testing the API**

### **Using cURL**

**1. Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123"
  }'
```

**2. Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

**3. Get Current User (use token from login):**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📈 **Performance Tips**

- Database indexes on frequently queried fields (email, role)
- Rate limiting prevents brute force attacks
- Token-based authentication (stateless)
- Helmet reduces security overhead
- Morgan logging only in development
- Efficient password hashing (bcryptjs)

---

## 🐛 **Troubleshooting**

### **MongoDB Connection Issues**
- Check `MONGO_URI` in `.env`
- Verify MongoDB is running: `mongosh` or check MongoDB Compass
- For Atlas, ensure IP is whitelisted

### **JWT Errors**
- Ensure `JWT_SECRET` is set
- Token may have expired (default 24h)
- Clear browser localStorage and login again

### **CORS Errors**
- Check `FRONTEND_URL` in backend `.env`
- Ensure frontend URL matches exactly

### **Port Already in Use**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### **Logs Not Showing**
- Check `logs/app.log` file
- Set `NODE_ENV=development` for detailed logs
- Check terminal output for Morgan logs

---

## 📚 **Code Standards**

- **JSDoc comments** on all functions
- **Consistent error handling** throughout
- **Centralized constants** for maintainability
- **MVC pattern** for clean architecture
- **Async/await** for promise handling
- **Try-catch** blocks in all async functions

---

## 🔐 **Environment Variables**

### **Backend (.env)**
```env
# Server
NODE_ENV=development           # development | production
PORT=5000

# Database
MONGO_URI=mongodb://...        # MongoDB connection string

# Authentication
JWT_SECRET=your_secret_key     # ⚠️ Change in production!
JWT_EXPIRE=24h                 # Token expiration time

# API Configuration
FRONTEND_URL=http://localhost:5173  # Frontend URL for CORS
```

### **Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📦 **Dependencies**

### **Backend**
| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.18.2 | Web framework |
| mongoose | ^8.0.3 | MongoDB ODM |
| jsonwebtoken | ^9.0.2 | JWT implementation |
| bcryptjs | ^2.4.3 | Password hashing |
| cors | ^2.8.5 | CORS middleware |
| helmet | ^7.1.0 | Security headers |
| express-rate-limit | ^7.1.5 | Rate limiting |
| express-validator | ^7.0.1 | Input validation |
| dotenv | ^16.3.1 | Environment variables |
| morgan | ^1.10.0 | HTTP logging |

### **Frontend**
| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.0.0 | UI library |
| react-router-dom | ^6.0.0 | Routing |
| axios | ^1.4.0 | HTTP client |

---

## 📄 **License**

MIT — Free to use and modify for commercial projects.

---

## 👨‍💻 **Development Workflow**

1. **Start Backend:** `npm run dev` in `backend/`
2. **Start Frontend:** `npm run dev` in `frontend/`
3. **Check Logs:** `tail -f logs/app.log` for backend logs
4. **Test API:** Use Postman/cURL or frontend UI
5. **Commit:** Git commits with clear messages

---

## 🎯 **Next Steps**

- [ ] Add unit tests (Jest, Vitest)
- [ ] Add integration tests (Supertest)
- [ ] Implement refresh tokens
- [ ] Add email verification
- [ ] Add password reset functionality
- [ ] Implement API documentation (Swagger/OpenAPI)
- [ ] Add caching (Redis)
- [ ] Implement file uploads
- [ ] Add analytics tracking
- [ ] Set up CI/CD pipeline

---

**Built with ❤️ for K8 Automation**

Last Updated: February 2025 | Version: 1.0.0
