import "dotenv/config";
import express from "express";
import cors from "cors";
import * as cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT;
//MiddleWare
app.use(cors());
app.use(express.json());
app.use(cookieParser());
//Listening on Port

app.get("/", (req, res) => {
  res.send("Hello World! hey");
});
app.listen(PORT, () => {
  console.log("Listening on port:", PORT);
});
