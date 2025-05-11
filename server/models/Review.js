import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  rating: Number,
  content: String,
  gameId: String,
  authorId: String,
});

export const Review = mongoose.model("Review", reviewSchema);
