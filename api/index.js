import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"

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


//Routes
//User Route 
app.use("/api/user", userRoutes);

//Auth Route
app.use("/api/auth", authRoute);