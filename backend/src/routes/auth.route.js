// src/routes/auth.route.js
import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

// Dummy middleware to replace Arcjet protection
const arcjetProtection = (req, res, next) => {
  // Just pass through, no security logic
  next();
};

const router = express.Router();

// Use the dummy middleware instead of Arcjet
router.use(arcjetProtection);

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Profile update route (requires authentication)
router.put("/update-profile", protectRoute, updateProfile);

// Check logged-in user route
router.get("/check", protectRoute, (req, res) =>
  res.status(200).json(req.user),
);

export default router;
