import mongoose from "mongoose";

const engravingSettingSchema = new mongoose.Schema({
  materialType: { type: String, required: true },
  woodType: { type: String, default: null }, // Only for wood
  suggestedPower: { type: Number, required: true },
  suggestedSpeed: { type: Number, required: true }
});

export default mongoose.model("EngravingSetting", engravingSettingSchema);
