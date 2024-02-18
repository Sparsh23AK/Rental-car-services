import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
  model: { type: String, required: true },
  year: { type: String, required: true },
  transmissionType: String,
  mileage: String,
  status: {
    type: String,
    enum: ["available", "rented", "sold", "upcoming"],
    default: "available",
  },
  rental_price: { type: Number, required: true },
  price: { type: Number, required: true },
  image1: { type: String, required: true },
  image2: { type: String, required: true },
  image3: { type: String, required: true },
  fuelType: {
    type: String,
    required: true,
    enum: ["Petrol", "Electric", "Diseal"],
  },
  carType: {type: String,
    enum: ["SUV", "Sedan", "HatchBack", "MUV", "Luxury"],
    required: true},
  isTrending: {type: Boolean, default: false},
  isUpcoming: {type: Boolean, default: false}
  
});

const Car = mongoose.model("Car", carSchema);

export default Car;
