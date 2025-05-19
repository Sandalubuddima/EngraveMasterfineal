import WoodType from "../models/WoodType.js";
import EngravingSetting from "../models/EngravingSetting.js";

// Add new wood type
export async function addWoodType(req, res) {
  try {
    const { name } = req.body;

    const existing = await WoodType.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Wood type already exists" });
    }

    const newWood = await WoodType.create({ name });
    res.status(201).json(newWood);
  } catch (err) {
    console.error("Error adding wood type:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// Get all wood types
export async function getWoodTypes(req, res) {
  try {
    const woodTypes = await WoodType.find().sort({ name: 1 });
    res.json(woodTypes);
  } catch (err) {
    console.error("Error fetching wood types:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// Add new engraving setting
export async function addEngravingSetting(req, res) {
  try {
    const { materialType, woodType, suggestedPower, suggestedSpeed } = req.body;

    const existing = await EngravingSetting.findOne({
      materialType,
      woodType: materialType === "Wood" ? woodType : null,
    });

    if (existing) {
      return res.status(400).json({ message: "Setting for this material already exists" });
    }

    const setting = await EngravingSetting.create({
      materialType,
      woodType: materialType === "Wood" ? woodType : null,
      suggestedPower,
      suggestedSpeed,
    });

    res.status(201).json(setting);
  } catch (err) {
    console.error("Error saving engraving setting:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// Get all engraving settings
export async function getEngravingSettings(req, res) {
  try {
    const settings = await EngravingSetting.find().sort({ materialType: 1 });
    res.json(settings);
  } catch (err) {
    console.error("Error fetching engraving settings:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// Get a single setting by ID
export async function getEngravingSettingById(req, res) {
  try {
    const setting = await EngravingSetting.findById(req.params.id);
    if (!setting) {
      return res.status(404).json({ message: "Setting not found" });
    }
    res.json(setting);
  } catch (err) {
    console.error("Error fetching setting by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// Update a setting by ID
export async function updateEngravingSetting(req, res) {
  try {
    const { suggestedPower, suggestedSpeed } = req.body;

    const updated = await EngravingSetting.findByIdAndUpdate(
      req.params.id,
      { suggestedPower, suggestedSpeed },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Setting not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating setting:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// Delete a setting by ID
export async function deleteEngravingSetting(req, res) {
  try {
    const deleted = await EngravingSetting.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Setting not found" });
    }

    res.json({ message: "Setting deleted successfully" });
  } catch (err) {
    console.error("Error deleting setting:", err);
    res.status(500).json({ message: "Server error" });
  }
}
