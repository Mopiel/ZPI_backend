import mongoose from "mongoose";
export const MassEmail = mongoose.model("MassEmail", {
  user: String,
  body: String,
  mailingAddresses: [String],
});
