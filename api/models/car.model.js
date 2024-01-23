import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  transmissionType: String,
  fuelType: String,
  mileage: Number,
  status: { type: String, enum: ['available', 'rented', 'sold'], default: 'available' }
});

const Car = mongoose.model('Car', carSchema);

export default Car;