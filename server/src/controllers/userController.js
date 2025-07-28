import {
  createUser,
  getUserByEmail,
  getUserByUserName,
} from "../services/userServices.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcryptjs";

const signUp = async (req, res, next) => {
  const { user_name, email, password } = req.body;
  if (!user_name || !email || !password) {
    return next(new AppError("Please enter all the details", 400));
  }
  try {
    const userExists = await getUserByUserName(user_name);
    if (userExists) {
      return next(
        new AppError("Username already taken. Please enter a new one.", 409)
      );
    }
    const emailExists = await getUserByEmail(email);
    if (emailExists) {
      return next(
        new AppError(
          "Email already exists. Please enter a new one or login.",
          409
        )
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await createUser(user_name, email, hashPassword);
    req.user = user;
    next();
  } catch (error) {
    next(new AppError("Sign up failed. Try again.", 500, error));
  }
};

const login = async (req, res, next) => {
  const { user_name, password } = req.body;
  if (!user_name || !password) {
    // return res.status(400).json({ message: "Please enter all the details" });
    return next(new AppError("Please enter all the details", 400));
  }
  try {
    const user = await getUserByUserName(user_name);
    if (!user) {
      return next(
        new AppError("User doesn't exist. Create a new account.", 404)
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return next(new AppError("Wrong password", 401));
    }
    req.user = user;
    next();
  } catch (error) {
    next(new AppError("Sign up failed. Try again.", 500, error));
  }
};
export { signUp, login };
