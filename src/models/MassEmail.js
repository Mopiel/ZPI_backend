import mongoose from "mongoose";
export const MassEmail = mongoose.model("MassEmail", {
  name: String,
  userId: String,
  html: String,
  design: String,
  mailingAddresses: [String],
});
