import mongoose from "mongoose";
const tasksScheme = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ["todo", "doing", "done"], default: "todo" },
  User: { type: mongoose.Types.ObjectId, ref: "User" },
  Project: { type: mongoose.Types.ObjectId, ref: "Project" },
});

export default mongoose.model("Tasks", tasksScheme);
