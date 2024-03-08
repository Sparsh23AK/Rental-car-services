import Car from "../models/car.model.js";
import Brand from "../models/brand.model.js";
import errorHandler from "../utils/errorHandler.js";

//Get Cars Info
export const getCars = async (req, res, next) => {
  try {
    // Retrieve all cars from the database
    const cars = await Car.find().populate("brand");
    console.log("inside get Cars",cars.length);
    res.json(cars);
  } catch (error) {
    next(error);
  }
};

//get Car Info by Id
export const getCarById = async (req, res, next) => {
  try {
    const carId = req.params.id;

    // Retrieve the car from the database by ID
    const car = await Car.findById(carId).populate("brand");

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
    console.log(brands);
    res.json(brands);
  } catch (error) {
    next(error);
  }
};

export const fetchCarsByPriceRangeAndType = async (req, res, next) => {
  try {
    const { priceRange, carType } = req.query;
    const [minPrice, maxPrice] = priceRange.split(" to ").map(Number);

    // Find cars within the specified price range and vehicle type
    let cars = [];
    if (carType.trim() !== "" && priceRange.trim() !== "") {
      cars = await Car.find({
        price: { $gte: minPrice, $lte: maxPrice },
        carType: carType,
      }).populate("brand");
    } else {
      if (carType.trim() === "" && priceRange.trim() !== "") {
        cars = await Car.find({
          price: { $gte: minPrice, $lte: maxPrice },
        }).populate("brand");
      } else if (priceRange.trim() === "" && carType.trim() !== "") {
        cars = await Car.find({
          carType: carType,
        }).populate("brand");
      } else {
        cars = await Car.find().populate("brand");
      }
    }
    res.json(cars);
  } catch (error) {
    next(error);
  }
};

export const fetchCarsByBrand = async (req, res, next) => {
  try {
    const { brandId } = req.query;

    const cars = await Car.find({ brand: brandId }).populate("brand");

    res.json(cars);
  } catch (error) {
    next(error);
  }
};

export const fetchCarsByType = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
