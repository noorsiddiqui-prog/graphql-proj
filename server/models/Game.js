import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  platform: { type: [String], required: true },
});

export const Game = mongoose.model("Game", gameSchema);
