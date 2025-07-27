import {
  createUser,
  getUserByEmail,
  getUserByUserName,
} from "../services/userServices.js";
import bcrypt from "bcryptjs";

const signUp = async (req, res, next) => {
  const { user_name, email, password } = req.body;
  if (!user_name || !email || !password) {
    return res.status(400).json({ message: "Please enter all the details" });
  }
  try {
    const userExists = await getUserByUserName(user_name);
    if (userExists) {
      return res
        .status(409)
        .json({ message: "UserName already taken pls enter a new one" });
    }
    const emailExists = await getUserByEmail(email);
    if (emailExists) {
      return res.status(409).json({
        message: "email already exists pls enter a new one or Login",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await createUser(user_name, email, hashPassword);
    req.user = user;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Sign up failed Try again", error: error.message });
    next(error);
  }
};

const login = async (req, res, next) => {
  const { user_name, password } = req.body;
  if (!user_name || !password) {
    return res.status(400).json({ message: "Please enter all the details" });
  }
  try {
    const user = await getUserByUserName(user_name);
    if (!user) {
      return res
        .status(409)
        .json({ message: "User doesn't exist create a new Acount" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Wrong password" });
    }
    req.user = user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Internal Server Error", error: error.message });
    next(error);
  }
};
export { signUp, login };
