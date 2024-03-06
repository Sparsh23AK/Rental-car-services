import express from "express";
import { user, updateUser, deleteUser } from "../controllers/user.controller.js";
import { verfifyToken } from "../utils/authenticateUser.js";
import { bookAppointment, getAppointments, deleteAppointment } from "../controllers/appointment.controller.js"

const router = express.Router();

router.get("/", user);

//Updating User's details by ID
router.post("/update/:id", verfifyToken, updateUser);


//deleting user's account by ID
router.delete("/delete/:id", verfifyToken, deleteUser);

//get appointment details by user's ID
router.get("/getAppointments/:id", verfifyToken, getAppointments);

//book appointment
router.post("/bookAppointment", verfifyToken, bookAppointment);

//cancel appointment by appoint's ID
router.delete("/deleteAppointment/:id", verfifyToken, deleteAppointment);

export default router;
