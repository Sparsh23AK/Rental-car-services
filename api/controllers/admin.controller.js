import Car from "../models/car.model.js";
import errorHandler from "../utils/errorHandler.js";

//Save Car info
export const saveCar = async (req, res, next) => {
  try {
    const {
      name,
      brand,
      model,
      year,
      transmissionType,
      fuelType,
      mileage,
      rental_price,
      price,
      status,
      image1,
      image2,
      image3,
      carType,
      isTrending,
      isUpcoming
    } = req.body;

    // Create a new car instance
    const newCar = new Car({
      name,
      brand,
      model,
      year,
      transmissionType,
      fuelType,
      mileage,
      rental_price,
      price,
      status,
      image1,
      image2,
      image3,
      carType,
      isTrending,
      isUpcoming
    });

    // Save the new car to the database
    const savedCar = await newCar.save();

    res.status(201).json(savedCar);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//Get Cars Info
export const getCars = async (req, res, next) => {
  try {
    // Retrieve all cars from the database
    const cars = await Car.find().populate('brand');
    console.log(cars);

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

//update car
export const updateCar = async (req, res, next) => {
  try {
    const carId = req.params.id;
    const { _id, ...updateFields } = req.body;
    console.log("Car Id : ", carId);
    console.log("req body : ", req.body);

    // Update the car in the database
    const updatedCar = await Car.findByIdAndUpdate(carId, updateFields, {
      new: true,
    });

    if (!updatedCar) {
      return next(errorHandler(404, "Car not found"));
    }

    res.json(updatedCar);
  } catch (error) {
    next(error);
  }
};

//delete car
export const deleteCar = async (req, res, next) => {
  try {
    const carId = req.params.id;

    // Delete the car from the database
    const deletedCar = await Car.findByIdAndDelete(carId);

    if (!deletedCar) {
      return next(errorHandler(401, "Car not found!"));
    }

    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    next(error);
  }
};
