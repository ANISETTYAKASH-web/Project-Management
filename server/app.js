import express from "express";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000;
//MiddleWare
app.use(cors());
app.use(express.json());
//Listening on Port

app.get("/", (req, res) => {
  res.send("Hello World! hey");
});
app.listen(PORT, () => {
  console.log("Listening on port:", process.env.PORT);
});
