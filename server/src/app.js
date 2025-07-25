import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import projectRouter from "./routes/projectRoutes.js";
import { connection } from "./config/mongodb.config.js";
//user defined imports
const app = express();
const PORT = process.env.PORT;
//MiddleWare
app.use(cors());
app.use(express.json());
app.use(cookieParser());
//Listening on Port
const dbConnection = async (params) => {
  try {
    await connection();
  } catch (error) {
    console.log("DB CONNECTION FAILED", error);
    process.exit(1);
  }
};
dbConnection();
app.get("/", (req, res) => {
  res.send("Hello World! hey");
});
app.use("/projects", projectRouter);
app.listen(PORT, async () => {
  console.log("Listening on port:", PORT);
});
