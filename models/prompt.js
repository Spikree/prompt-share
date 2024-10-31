import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  prompt: { type: String, required: true },
  tag: { type: String, required: true },
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt