import express from "express";
import {  getCarById, getCars, getBrands } from "../controllers/car.controller.js";

const router = express.Router();

//Get cars info
router.get('/getCars', getCars);

//Get Car info by Id
router.get("/getCarById/:id", getCarById);

//Get brands info
router.get('/getBrands', getBrands);

export default router;
