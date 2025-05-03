// routes/photopeaRouter.js
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import PhotopeaFile from "../models/PhotopeaFile.js"; // ✅ Model for DB storage

dotenv.config();

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "../uploads");

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// 🔐 SAVE uploaded image from Photopea
router.post("/save", (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "") || req.query.token;
  if (!token) return res.status(401).json({ message: "Missing token" });

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    req.user = decoded;
    const chunks = [];

    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", async () => {
      const buffer = Buffer.concat(chunks);
      let imageFormat = "png";
      let imageData = null;

      try {
        const base64Start = buffer.indexOf("base64,");
        if (base64Start !== -1) {
          const dataStart = base64Start + 7;
          imageData = Buffer.from(buffer.slice(dataStart).toString("utf8"), "base64");

          const headerText = buffer.slice(0, 1000).toString("utf8");
          const formatMatch = headerText.match(/data:image\/([^;]+);base64/);
          if (formatMatch?.[1]) imageFormat = formatMatch[1];
        } else {
          const signatures = {
            png: Buffer.from([0x89, 0x50, 0x4E, 0x47]),
            jpg: Buffer.from([0xFF, 0xD8, 0xFF]),
            jpeg: Buffer.from([0xFF, 0xD8, 0xFF]),
            gif: Buffer.from([0x47, 0x49, 0x46]),
            webp: Buffer.from([0x52, 0x49, 0x46, 0x46]),
          };

          for (const [format, sig] of Object.entries(signatures)) {
            const pos = buffer.indexOf(sig);
            if (pos !== -1) {
              imageData = buffer.slice(pos);
              imageFormat = format;
              break;
            }
          }
        }

        if (!imageData) return res.status(400).json({ message: "No image data found" });

        const fileName = `${Date.now()}.${imageFormat}`;
        const filePath = path.join(uploadDir, fileName);
        const fileUrl = `http://localhost:5001/uploads/${fileName}`;

        fs.writeFileSync(filePath, imageData);

        // ✅ Save to MongoDB with user email + metadata
        await PhotopeaFile.create({
          filename: fileName,
          url: fileUrl,
          userEmail: decoded.email,
          uploadedAt: new Date(),
        });

        return res.json({
          message: "Image saved successfully!",
          script: 'app.echoToOE("Image saved to EngraveMaster!")',
          newSource: fileUrl,
        });
      } catch (e) {
        console.error("Failed to process image:", e);
        return res.status(500).json({ message: "Server error saving image" });
      }
    });
  });
});

// 📥 LIST user's uploaded images
router.get("/list", async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Missing token" });

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    try {
      const images = await PhotopeaFile.find({ userEmail: decoded.email })
        .sort({ uploadedAt: -1 });

      res.json({ images: images.map(img => img.url) });
    } catch (e) {
      res.status(500).json({ message: "Error fetching user images" });
    }
  });
});

// 🗑️ DELETE by filename
router.delete("/delete/:filename", async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Missing token" });

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    const { filename } = req.params;
    const filePath = path.join(uploadDir, filename);

    try {
      await PhotopeaFile.deleteOne({ filename, userEmail: decoded.email });

      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

      res.json({ message: "File deleted" });
    } catch (e) {
      res.status(500).json({ message: "Failed to delete file" });
    }
  });
});

export default router;
