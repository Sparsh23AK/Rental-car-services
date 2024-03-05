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
      console.log(appointment);
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
    console.log(appoitments);
    res.json(appoitments);
  } catch (error) {
    next(error);
  }
};