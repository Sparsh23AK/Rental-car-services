import { jwt } from "jsonwebtoken";
import errorHandler from "./errorHandler";

export const verfifyToken = (req, res, next) => {
  const token = req.cookie.access_token;
  if (!token)
    return next(
      errorHandler(401, "Access Denied! Please login to the application.")
    );

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Invalid Token!"));

    res.user = user;
    next();
  });
};
