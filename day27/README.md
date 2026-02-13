# Day 27 – Node.js & Express Backend with Controllers & Middleware

## Overview
This project is a **Node.js & Express backend** demonstrating:
- Controllers for clean, separated logic
- Middleware (logging, auth, error handling)
- JWT-based authentication
- Admin-only routes
- MongoDB integration
- Scalable project structure

---

## Project Structure

## Project Structure
day27
├── config/ 
│   └── db.js
│
├── controllers/
│   └── userController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── loggerMiddleware.js
│   ├── errorMiddleware.js
│   └── notFound.js
│
├── models/
│   └── User.js
│
├── routes/
│   └── userRoutes.js
│
├── utils/
│   └── asyncHandler.js
│
├── .env
└── server.js


## Key Features

### Controllers
```javascript
exports.registerUser = asyncHandler(async (req, res) => {
  // Register a new user and return JWT
});
exports.loginUser = asyncHandler(async (req, res) => {
  // Login user and return JWT
});
exports.getProfile = asyncHandler(async (req, res) => {
  // Return user profile (protected)
});
exports.adminRoute = asyncHandler(async (req, res) => {
  // Admin-only route
});


Middleware

Logger – Logs every request

Auth – Protect routes, verify JWT

Error Handler – Centralized error responses

NotFound – Handle unknown routes


app.use(logger);
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);


JWT Authentication

Tokens generated on login/register

Protect routes using Authorization: Bearer TOKEN

Admin-only access via isAdmin field



| Endpoint            | Method | Access        | Body / Headers                    |
| ------------------- | ------ | ------------- | --------------------------------- |
| /api/users/register | POST   | Public        | { name, email, password }         |
| /api/users/login    | POST   | Public        | { email, password }               |
| /api/users/profile  | GET    | Private       | Authorization: Bearer TOKEN       |
| /api/users/admin    | GET    | Private/Admin | Authorization: Bearer ADMIN_TOKEN |



PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/day27db
JWT_SECRET=supersecret123
NODE_ENV=development



npm install
npx nodemon server.js



MongoDB Connected: 127.0.0.1
Server running on port 3000

adel bassam 
13/02/2026