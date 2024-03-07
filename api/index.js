import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import carsRoute from "./routes/car.route.js"
import adminRoute from "./routes/admin.route.js"
import cookieParser from "cookie-parser";
import path from 'path';
import bodyParser from "body-parser";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MongoDbUri)
  .then(() => {
    console.log("Connected to Data Base");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();
//for server to initialize
app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, 'client','dist','index.html'))
});

app.listen(3000, () => {
  console.log("Server running at port 3000.");
});
//accepting json as request body from client.
app.use(express.json());
app.use(bodyParser.json());

app.use(cookieParser());

//Routes
//User Route
app.use("/api/user", userRoutes);

//Auth Route
app.use("/api/auth", authRoute);

//car Route
app.use('/api/cars', carsRoute);

//admin Route
app.use('/api/admin', adminRoute);

//Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
