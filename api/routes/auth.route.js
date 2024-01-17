import express from "express";
import {
  signup,
  signin,
  google,
  signout,
} from "../controllers/auth.controller.js";

const router = express.Router();

//SignUp Route
router.post("/signup", signup);

//SignIn route
router.post("/signin", signin);

//Google OAuth Route
router.post("/google", google);

//Sign Out Route
router.get("/signout", signout);

export default router;
