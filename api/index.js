import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

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

app.listen(3000, () => {
  console.log("Server running at port 3000.");
});
//accepting json as request body from client.
app.use(express.json());

//Routes
//User Route
app.use("/api/user", userRoutes);

//Auth Route
app.use("/api/auth", authRoute);

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
