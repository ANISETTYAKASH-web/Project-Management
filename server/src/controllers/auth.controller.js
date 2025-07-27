import jwt from "jsonwebtoken";
const login = async (req, res) => {
  const user = req.user;
  const user_name = user.user_name;
  const accessToken = jwt.sign({ user_name }, process.env.JWT_ACCESS_KEY, {
    expiresIn: "10m",
  });
  const refreshToken = jwt.sign({ user_name }, process.env.JWT_REFRESH_KEY, {
    expiresIn: "1d",
  });
  res.cookie("token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ message: "Login Successfull", token: accessToken });
};
const refresh = (req, res) => {
  if (req.cookies.token) {
    const token = req.cookies.token;

    jwt.verify(token, process.env.JWT_REFRESH_KEY, (err, decoded) => {
      if (err) {
        res.json({
          message: "Invalid Session Login again",
          error: err.message,
        });
      } else {
        const accessToken = jwt.sign(
          { user_name: decoded.user_name },
          process.env.JWT_ACCESS_KEY,
          {
            expiresIn: "10m",
          }
        );
        return res.json({ accessToken });
      }
    });
  } else {
    res.json({ message: "Invalid Session Login again" });
  }
};
export { login, refresh };
