import express from "express";
import { user, updateUser, deleteUser } from "../controllers/user.controller.js";
import { verfifyToken } from "../utils/authenticateUser.js";

const router = express.Router();

router.get("/", user);

//Updating User's details by ID
router.post("/update/:id", verfifyToken, updateUser);


//deleting user's account by ID
router.delete("/delete/:id", verfifyToken, deleteUser);


export default router;
