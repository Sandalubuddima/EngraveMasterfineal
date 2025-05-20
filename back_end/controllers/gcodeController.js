import converter from "gcode-image-converter";
import fs from "fs";
import path from "path";
import bucket from "./firebaseConfig.js"; // import the firebase config

export const generateGcode = async (req, res) => {
  const { imageUrl, width, height, dpi, material, machine, timber } = req.body;

  if (!imageUrl || !width || !height || !dpi || !material || !machine) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const fileName = `gcode_${Date.now()}.gcode`;
  const localPath = path.join("gcode-temp", fileName); // make sure this folder exists

  try {
    // Generate G-code from image URL
    await converter({
      imagePath: imageUrl,
      outputPath: localPath,
      laserOnCommand: "M03",
      laserOffCommand: "M05",
      resolution: 25.4 / parseInt(dpi), // Convert DPI to mm per dot
      scale: 1.0,
      feedRate: 1000,
    });

    // Upload to Firebase Storage
    await bucket.upload(localPath, {
      destination: `gcodes/${fileName}`,
      public: true,
      metadata: { cacheControl: "public, max-age=31536000" },
    });

    const downloadUrl = `https://storage.googleapis.com/${bucket.name}/gcodes/${fileName}`;

    // Clean up local file
    fs.unlinkSync(localPath);

    res.status(200).json({ downloadUrl });
  } catch (error) {
    console.error("G-code generation error:", error);
    res.status(500).json({ message: "Failed to generate G-code" });
  }
};
