import Contact from "../models/contact.js";

// POST /api/contact
export async function submitContact(req, res) {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: "Message submitted successfully" });
  } catch (err) {
    console.error("Submit error:", err);
    res.status(500).json({ message: "Submission failed" });
  }
}

// GET /api/contacts (Admin)
export async function getAllContacts(req, res) {
  try {
    if (!req.user || req.user.type !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// DELETE /api/contacts/:id (Admin)
export async function deleteContact(req, res) {
  try {
    if (!req.user || req.user.type !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
}
