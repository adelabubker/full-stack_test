# Day 27 – Professional Node.js & Express Backend

## Overview
Clean, scalable backend demonstrating:
- JWT-based authentication (register/login)
- Auth middleware to protect routes
- Admin-only routes
- Centralized error handling
- Input validation
- Clean Architecture ready for portfolio

---

## Project Structure
src/
├── config/ # DB connection
├── models/ # Mongoose models
├── controllers/ # Business logic
├── routes/ # API routes
├── middleware/ # Auth, admin, error, notFound
├── utils/ # Async handler, JWT generator
├── .env # Environment variables
└── server.js # Entry point

---

## Key Features

### Controllers
```javascript
// src/controllers/authController.js
//exports.register = asyncHandler(async (req,res)=>{ ... });
//exports.login = asyncHandler(async (req,res)=>{ ... });
//exports.getProfile = asyncHandler(async (req,res)=>{ ... });


## Middleware

Auth Middleware – Protect routes

Admin Middleware – Admin-only access

Error Middleware – Central error handler

NotFound – Handle unknown routes

JWT Authentication

Tokens issued on register/login

Use Authorization: Bearer TOKEN to access protected routes


| Endpoint           | Method | Access        | Body / Headers                    |
| ------------------ | ------ | ------------- | --------------------------------- |
| /api/auth/register | POST   | Public        | { name, email, password }         |
| /api/auth/login    | POST   | Public        | { email, password }               |
| /api/auth/profile  | GET    | Private       | Authorization: Bearer TOKEN       |
| /api/auth/admin    | GET    | Private/Admin | Authorization: Bearer ADMIN_TOKEN |

### Environment Variables (.env)
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/probackend
JWT_SECRET=supersecret123


### Run the Project

npm install
npx nodemon server.js
