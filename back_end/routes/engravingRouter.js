import express from "express";
import {
  addWoodType,
  getWoodTypes,
  addEngravingSetting,
  getEngravingSettings,
  getEngravingSettingById,
  updateEngravingSetting,
  deleteEngravingSetting,
  getSettingByWoodType, // 🔥 include this
} from "../controllers/engravingController.js";

const router = express.Router();

//
// 🌳 WOOD TYPES ROUTES
//

// Add a new wood type
router.post("/wood-types", addWoodType);

// Get all wood types
router.get("/wood-types", getWoodTypes);

//
// 🔧 ENGRAVING SETTINGS ROUTES
//

// Add a new engraving setting
router.post("/engraving-settings", addEngravingSetting);

// Get all engraving settings
router.get("/engraving-settings", getEngravingSettings);

// Get a single engraving setting by ID
router.get("/engraving-settings/:id", getEngravingSettingById);

// Update an engraving setting by ID
router.put("/engraving-settings/:id", updateEngravingSetting);

// Delete an engraving setting by ID
router.delete("/engraving-settings/:id", deleteEngravingSetting);

// 🆕 Get engraving setting by wood type (used in PreviewModal)
// ✅ Corrected route to match frontend
router.get("/engraving-settings/wood/:woodType", getSettingByWoodType);


export default router;
