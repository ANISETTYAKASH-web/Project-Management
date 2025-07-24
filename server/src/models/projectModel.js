import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  teamName: { type: String, required: true },
  budget: Number,
});

export default mongoose.model("Project", projectSchema);
