import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  name: String,
  verified: Boolean,
});

export const Author = mongoose.model("Author", authorSchema);
