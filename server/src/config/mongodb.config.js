import mongoose from "mongoose";
export const connection = async () => {
  await mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => {
      console.log("DataBase Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
