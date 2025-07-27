import jwt from "jsonwebtoken";
const { verify } = jwt;
const AuthorizeUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.json({ message: "Unauthorized Login Again" });
  }
  verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
    if (err) {
      return res.json({
        message: "Unauthorized, Please Login Again",
        error: err.message,
      });
    }
    // req.user_name = user.user_name;
    // req.user_id = user.user_id;
    req.user = { user_name: user.user_name, user_id: user.user_id };
    next();
  });
};
export default AuthorizeUser;
