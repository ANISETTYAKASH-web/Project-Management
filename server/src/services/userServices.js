import User from "../models/usersModel.js";
export async function getUserByEmail(email) {
  return await User.findOne({ email: email });
}
export async function getUserByUserName(user_name) {
  return await User.findOne({ user_name: user_name });
}
export async function createUser(user_name, email, password) {
  return await User.create({
    user_name: user_name,
    email: email,
    password: password,
  });
}
