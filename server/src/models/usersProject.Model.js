import mongoose from "mongoose";
const userProjects = new mongoose.Schema({
  User: { type: mongoose.Types.ObjectId, ref: "User" },
  Project: { type: mongoose.Types.ObjectId, ref: "Project" },
});

export default mongoose.model("userProjects", userProjects);
