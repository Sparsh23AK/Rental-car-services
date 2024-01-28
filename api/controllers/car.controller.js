import Car from "../models/car.model.js";
import errorHandler from "../utils/errorHandler.js";

//Get Cars Info
export const getCars = async (req, res, next) => {
  try {
    // Retrieve all cars from the database
    const cars = await Car.find();

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
    const car = await Car.findById(carId);

    if (!car) {
      return next(errorHandler(404, "Car not found"));
    }

    res.json(car);
  } catch (error) {
    next(error);
  }
};
