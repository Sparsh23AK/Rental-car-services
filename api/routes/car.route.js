import express from "express";
import {  getCarById, getCars } from "../controllers/car.controller.js";

const router = express.Router();

//Get cars info
router.get('/getCars', getCars);

//Get Car info by Id
router.get("/getCarById/:id", getCarById);

export default router;
