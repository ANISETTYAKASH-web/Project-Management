import "dotenv/config";
import errorHandler from "./middleware/errorHandler.js";
import AppError from "./utils/AppError.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import projectRouter from "./routes/projectRoutes.js";
import TaskRouter from "./routes/tasksRouter.js";
import { connection } from "./config/mongodb.config.js";
import UserRouter from "./routes/userRoutes.js";
import AuthRouter from "./routes/authRoutes.js";

//user defined imports
const app = express();
//MiddleWare
app.use(cors());
app.use(express.json());
app.use(cookieParser());
//Listening on Port
const dbConnection = async (params) => {
  try {
    await connection();
  } catch (error) {
    // console.log("DB CONNECTION FAILED", error);
    next(new Error("failed to connect to DB"));
    process.exit(1);
  }
};
dbConnection();
app.get("/", (req, res) => {
  res.send("Hello World! hey");
});

//custom Routes
app.get("/favicon.ico", (req, res) => res.status(200));
app.use("/users", UserRouter);
app.use("/auth", AuthRouter);
app.use("/projects", projectRouter);
app.use("/tasks", TaskRouter);
app.all("/{*any}", (req, res, next) => {
  next(
    new AppError(`requested ${req.originalUrl} is not found on the server`, 404)
  );
});

app.use(errorHandler);
// app.listen(PORT, async () => {
//   console.log("Listening on port:", PORT);
// });
export { app };
