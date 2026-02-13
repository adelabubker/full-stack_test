const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/profile", protect, controller.getProfile);

// admin test route
router.get("/admin", protect, admin, (req,res)=>{
  res.json({message:"Welcome admin"});
});

module.exports = router;
