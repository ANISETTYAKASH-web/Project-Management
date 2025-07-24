import * as jwt from "jsonwebtoken";

const login = (req, res) => {
  const { user_name, password } = req.body;
  const user = {
    user_name: "akash",
    password: "akash",
  };
  if (user_name === user.user_name && password === user.password) {
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
    return res.json({ accessToken });
  } else {
    res.json("Invalid Credentials");
  }
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
