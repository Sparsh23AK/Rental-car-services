import User from "../models/user.model.js";
import errorHandler from "../utils/errorHandler.js";
import bcryptjs from "bcryptjs";

export const user = (req, res) => {
  res.json({
    message: "API is working!",
  });
};

//Update User logic

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "Unauthorized access!"));
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updateData = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateData._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

//Delete Account
export const deleteUser = async (req, res, next) =>{
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "Unauthorized access!"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({message : "Deleted Successfully"});
  } catch(error){
    next(error);
  }
}
