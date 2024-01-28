import express from "express";
import { verfifyToken } from "../utils/authenticateUser.js";
import { deleteCar, saveCar, updateCar, getCarById, getCars } from "../controllers/car.controller.js";

const router = express.Router();

//saving car info
router.post("/save", saveCar);

//update car info
router.post("/update", verfifyToken, updateCar);

//deleting car info by ID
router.delete("/delete/:id", verfifyToken, deleteCar);

//Get cars info
router.get('/getCars', getCars);

//Get Car info by Id
router.get("/getCarById/:id", getCarById);

export default router;
