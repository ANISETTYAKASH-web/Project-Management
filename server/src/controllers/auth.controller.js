import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
const login = async (req, res) => {
  const user = req.user;

  const accessToken = jwt.sign(
    { user_name: user.user_name, user_id: user._id },
    process.env.JWT_ACCESS_KEY,
    {
      expiresIn: "10m",
    }
  );
  const refreshToken = jwt.sign(
    { user_name: user.user_name, user_id: user._id },
    process.env.JWT_REFRESH_KEY,
    {
      expiresIn: "1d",
    }
  );
  res.cookie("token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res
    .status(200)
    .json({ success: true, message: "Login Successfull", token: accessToken });
};
const refresh = (req, res, next) => {
  if (req.cookies.token) {
    const token = req.cookies.token;

    jwt.verify(token, process.env.JWT_REFRESH_KEY, (err, decoded) => {
      if (err) {
        return next(new AppError("Invalid session. Login again.", 401, err));
      } else {
        const accessToken = jwt.sign(
          { user_name: decoded.user_name, user_id: decoded.user_id },
          process.env.JWT_ACCESS_KEY,
          {
            expiresIn: "10m",
          }
        );
        return res.json({ accessToken });
      }
    });
  } else {
    next(new AppError("Invalid session. Login again.", 401));
  }
};
export { login, refresh };
