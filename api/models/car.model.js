import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  transmissionType: String,
  fuelType: String,
  mileage: Number,
  status: {
    type: String,
    enum: ["available", "rented", "sold"],
    default: "available",
  },
  image1: { type: String, required: true },
  image2: { type: String, required: true },
  image3: { type: String, required: true },
});

const Car = mongoose.model("Car", carSchema);

export default Car;
