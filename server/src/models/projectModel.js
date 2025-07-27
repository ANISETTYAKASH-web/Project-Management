import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    budget: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
