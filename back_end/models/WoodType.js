import mongoose from "mongoose";

const woodTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});

export default mongoose.model("WoodType", woodTypeSchema);
