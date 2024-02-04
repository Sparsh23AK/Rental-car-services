import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

//Sign Up Logic
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const userDetail = new User({ username, email, password: hashedPassword });

  try {
    await userDetail.save();
    res
      .status(201)
      .json({ message: "User created succesfully", statusCode: 201 });
  } catch (error) {
    next(error);
  }
};

//Sign In Logic
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

//Google Oauth Logic
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1hr

      res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    } else {
      //creating random password of length 16.
      const generateRandomPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generateRandomPassword, 10);

      const newUser = new User({
        username:
          req.body.username.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 10000).toString(), //creating Username so that no 2 user can have same username
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1hr

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

//Sign Out Logic
export const signout =  (req, res) => {
  res.clearCookie('access_token').status(200).json("Sign Out successful!")
};
