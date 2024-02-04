import Car from "../models/car.model.js";
import Brand from "../models/brand.model.js";
import errorHandler from "../utils/errorHandler.js";

//Get Cars Info
export const getCars = async (req, res, next) => {
  try {
    // Retrieve all cars from the database
    const cars = await Car.find().populate('brand');

    res.json(cars);
  } catch (error) {
    next(error);
  }
};

//get Car Info by Id
export const getCarById = async (req, res, next) => {
  try {
    const carId = req.params.carId;

    // Retrieve the car from the database by ID
    const car = await Car.findById(carId).populate('brand');

    if (!car) {
      return next(errorHandler(404, "Car not found"));
    }

    res.json(car);
  } catch (error) {
    next(error);
  }
};

//get brands Info
export const getBrands = async (req, res, next) => {
  try {

    // Retrieve the brands from the database
    const brands = await Brand.find();

    if (!brands) {
      return next(errorHandler(404, "brands not found"));
    }

    res.json(brands);
  } catch (error) {
    next(error);
  }
};
