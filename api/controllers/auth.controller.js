import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const userDetail = new User({ username, email, password: hashedPassword });

  try {
    await userDetail.save();
    res.status(201).json({ message: "User created succesfully", statusCode: 201 });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userDetail = await User.findOne({ email: email });
    if (!userDetail) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, userDetail.password);
    if (!validPassword) return next(errorHandler(401, "Invalid Credentials!"));
    const token = jwt.sign({ id: userDetail._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = userDetail._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1hr
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
