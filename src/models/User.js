import mongoose from "mongoose";
export const User = mongoose.model("User", {
  email: String,
  login: String,
  password: String,
});
