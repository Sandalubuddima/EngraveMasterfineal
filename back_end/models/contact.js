import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String }, // optional if not captured in form
  subject: { type: String },
  message: { type: String, required: true }
}, {
  timestamps: true // adds createdAt and updatedAt
});

const Contact = mongoose.model("contacts", contactSchema);
export default Contact;
