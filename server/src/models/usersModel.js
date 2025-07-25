import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
      message: "Email is not valid pls include correct Email Address",
    },
  },
  password: {
    type: String,
    required: true,
  },
});
export default mongoose.model("User", userSchema);
