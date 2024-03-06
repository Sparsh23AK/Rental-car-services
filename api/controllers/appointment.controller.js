import Car from "../models/car.model.js";
import errorHandler from "../utils/errorHandler.js";
import User from "../models/user.model.js";
import Appointment from "../models/appointment.model.js";


//save appointment details
export const bookAppointment = async (req, res, next) => {
    try {
      // Retrieve all cars from the database
      const { user, car, date, phoneNumber } = req.body;
      const newAppointment = new Appointment({user , car, phoneNumber, date})
      const appointment = await newAppointment.save();
      res.status(201).json(appointment);
    } catch (error) {
      next(error);
    }
  };

//Get appoitments Info
export const getAppointments = async (req, res, next) => {
  try {
    // Retrieve all cars from the database
    const userId = req.params.id;
    const appoitments = await Appointment.find({
      user: userId
    }).populate('car');
    res.json(appoitments);
  } catch (error) {
    next(error);
  }
};

//Delete appointment
export const deleteAppointment = async (req, res, next) =>{
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({message : "Deleted Successfully"});
  } catch(error){
    next(error);
  }
}