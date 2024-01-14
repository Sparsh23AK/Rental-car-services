import express from "express";
import { user, updateUser } from "../controllers/user.controller.js";
import { verfifyToken } from "../utils/authenticateUser.js";

const router = express.Router();

router.get("/", user);

router.post("/update/:id", verfifyToken, updateUser);

export default router;
