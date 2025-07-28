import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
const { verify } = jwt;
const AuthorizeUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    next(new AppError("Unauthorized Login Again", 401));
  }
  verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
    if (err) {
      return next(
        new AppError("Unauthorized: Invalid or expired token", 403, err)
      );
    }

    req.user = { user_name: user.user_name, user_id: user.user_id };
    next();
  });
};
export default AuthorizeUser;
