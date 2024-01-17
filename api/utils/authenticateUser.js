import  jwt  from "jsonwebtoken";
import errorHandler from "./errorHandler.js";

export const verfifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token)
    return next(
      errorHandler(401, "Access Denied! Please login to the application.")
    );

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Invalid Token!"));

    req.user = user;
    next();
  });
};
