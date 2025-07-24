import { verify } from "jsonwebtoken";
export default AuthorizeUser = (req, res, next) => {
  const authHeader = req.header["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.json({ message: "Unauthorized Login Again" });
  }
  verify(token, process.env.JWT_ACCESS_KEY, (err, user_name) => {
    if (err) {
      return res.json({
        message: "Unauthorized Login Again",
        error: err.message,
      });
    }
    req.user_name = user_name;
    next();
  });
};
