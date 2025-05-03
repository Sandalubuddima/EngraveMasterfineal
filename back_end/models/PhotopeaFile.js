import mongoose from "mongoose";

const PhotopeaFileSchema = new mongoose.Schema({
  filename: String,
  url: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  userEmail: String, // ← Add this
});

export default mongoose.model("PhotopeaFile", PhotopeaFileSchema);
