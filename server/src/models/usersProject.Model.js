import mongoose from "mongoose";
const userProjects = new mongoose.Schema({
  User: { type: mongoose.Types.ObjectId, ref: "User" },
  Project: { type: mongoose.Types.ObjectId, ref: "Project" },
  Role: {
    type: String,
    enum: {
      values: ["owner", "member"],
      message: "Values can only be owner and member",
    },
    default: "owner",
  },
});

export default mongoose.model("userProjects", userProjects);
