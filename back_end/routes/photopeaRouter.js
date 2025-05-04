// routes/photopeaRouter.js
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import PhotopeaFile from "../models/PhotopeaFile.js";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ImageTracer from "imagetracerjs";
import { createCanvas, loadImage } from "canvas";
import { parse as parseSVG } from "svgson";
import pkg from "svg-path-parser";
const { parseSVG: parsePathData } = pkg;


dotenv.config();

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "../uploads");
const svgDir = path.join(__dirname, "../svgs");

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(svgDir)) fs.mkdirSync(svgDir);

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

router.get("/list", async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Missing token" });

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    try {
      const images = await PhotopeaFile.find({ userEmail: decoded.email }).sort({ uploadedAt: -1 });
      res.json({ images: images.map(img => img.url) });
    } catch (e) {
      res.status(500).json({ message: "Error fetching user images" });
    }
  });
});

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

router.post("/rename", async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Missing token" });

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    const { oldName, newName } = req.body;
    if (!oldName || !newName) {
      return res.status(400).json({ message: "Both oldName and newName are required" });
    }

    const oldPath = path.join(uploadDir, oldName);
    const newPath = path.join(uploadDir, newName);

    if (!fs.existsSync(oldPath)) {
      return res.status(404).json({ message: "Original file not found" });
    }

    try {
      fs.renameSync(oldPath, newPath);

      const oldUrl = `http://localhost:5001/uploads/${oldName}`;
      const newUrl = `http://localhost:5001/uploads/${newName}`;

      const updated = await PhotopeaFile.findOneAndUpdate(
        { filename: oldName, userEmail: decoded.email },
        { filename: newName, url: newUrl },
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ message: "Database entry not found for update" });
      }

      res.json({ message: "File renamed successfully", newName, newUrl });
    } catch (e) {
      console.error("Rename error:", e);
      res.status(500).json({ message: "Failed to rename file" });
    }
  });
});

router.post("/convert-svg", async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Missing token" });

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    const { imageUrl } = req.body;
    if (!imageUrl) return res.status(400).json({ message: "Missing image URL" });

    try {
      const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
      const buffer = Buffer.from(response.data);

      const tempPath = path.join(uploadDir, `${uuidv4()}.png`);
      fs.writeFileSync(tempPath, buffer);

      const image = await loadImage(tempPath);
      const canvas = createCanvas(image.width, image.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);

      const svgString = ImageTracer.imagedataToSVG(ctx.getImageData(0, 0, image.width, image.height));
      const outputFileName = `${Date.now()}.svg`;
      const outputPath = path.join(svgDir, outputFileName);
      fs.writeFileSync(outputPath, svgString);

      const svgUrl = `http://localhost:5001/svgs/${outputFileName}`;
      res.json({ svgUrl });
    } catch (e) {
      console.error("SVG conversion failed:", e);
      res.status(500).json({ message: "Failed to convert to SVG" });
    }
  });
});

router.post("/svg-to-gcode", async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Missing token" });

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    const { svgUrl } = req.body;
    if (!svgUrl) return res.status(400).json({ message: "Missing svgUrl" });

    try {
      const response = await axios.get(svgUrl);
      const svgContent = response.data;

      const svgJson = await parseSVG(svgContent);

      let gcode = ["G21 ; Set units to mm", "G90 ; Absolute positioning", "G1 F1000 ; Feed rate"];

      const extractGcodeFromNode = (node) => {
        if (node.name === "path" && node.attributes?.d) {
          const pathCommands = parsePathData(node.attributes.d);
          pathCommands.forEach(cmd => {
            if (cmd.code === "M") {
              gcode.push(`G0 X${cmd.x.toFixed(2)} Y${cmd.y.toFixed(2)}`);
            } else if (cmd.code === "L") {
              gcode.push(`G1 X${cmd.x.toFixed(2)} Y${cmd.y.toFixed(2)}`);
            }
          });
        }
        if (node.children) node.children.forEach(extractGcodeFromNode);
      };

      extractGcodeFromNode(svgJson);

      res.json({ gcode: gcode.join("\n") });
    } catch (error) {
      console.error("SVG to G-code error:", error);
      res.status(500).json({ message: "Failed to convert SVG to G-code" });
    }
  });
});

export default router;
