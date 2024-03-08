import express from "express";
import {  getCarById, getCars, getBrands, fetchCarsByPriceRangeAndType, fetchCarsByBrand } from "../controllers/car.controller.js";

const router = express.Router();

console.log("inside Car routes");
//Get cars info
router.get('/getCars', getCars);

//Get Car info by Id
router.get("/getCarById/:id", getCarById);

//Get brands info
router.get('/getBrands', getBrands);

//fetch car by price range
router.get('/fetchCarsByPriceRangeAndType', fetchCarsByPriceRangeAndType)

//fetch cars by brand
router.get("/by-brand", fetchCarsByBrand);

export default router;
