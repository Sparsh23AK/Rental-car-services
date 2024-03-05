import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  status: {
    type: String,
    enum: ["visited", "pending"],
    default: "pending",
  },
  date: {type: Date, required: true},
  phoneNumber: {type: String, required: true},
  timestamp: { type: Date, default: Date.now },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
