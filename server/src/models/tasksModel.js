import mongoose from "mongoose";
const tasksScheme = new mongoose.Schema({
  name: { type: String, required: true },
  status: {
    type: String,
    enum: {
      values: ["todo", "doing", "done"],
      message: "Status is either: todo,doing,done",
    },
    default: "todo",
  },
  User: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  Project: { type: mongoose.Types.ObjectId, ref: "Project", required: true },
});

export default mongoose.model("Tasks", tasksScheme);
