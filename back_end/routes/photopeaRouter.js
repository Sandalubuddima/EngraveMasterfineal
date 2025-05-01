import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "../uploads");

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

router.post("/save", (req, res) => {
  console.log("Received Photopea save request");
  const chunks = [];

  req.on("data", (chunk) => {
    console.log(`Received chunk of size: ${chunk.length} bytes`);
    chunks.push(chunk);
  });
  
  req.on("end", () => {
    console.log(`Total request size: ${chunks.reduce((total, chunk) => total + chunk.length, 0)} bytes`);
    const buffer = Buffer.concat(chunks);
    
    // Step 1: Convert to string for JSON parsing, but use a limited length to avoid processing image data
    // This addresses the key issue - we should only convert the beginning portion to text, not the whole thing
    const headerText = buffer.slice(0, 1000).toString("utf8");
    console.log("First 100 chars of request:", headerText.substring(0, 100));
    
    // Step 2: Extract the JSON metadata
    let json = null;
    let imageFormat = "png"; // Default format
    
    try {
      // The request appears to start with valid JSON
      // Extract just the metadata portion
      if (headerText.startsWith("{")) {
        // Find where the base64 data begins
        const base64Start = headerText.indexOf("base64,");
        if (base64Start !== -1) {
          // Extract just the JSON metadata by finding where the actual base64 data begins
          const jsonEnd = headerText.indexOf(",", base64Start) + 1;
          const jsonText = headerText.substring(0, jsonEnd);
          
          // Complete the JSON object since we're truncating it
          const completeJson = jsonText + '"}';
          console.log("Extracted JSON metadata:", completeJson);
          
          // Parse the JSON
          try {
            json = JSON.parse(completeJson);
            console.log("Successfully parsed JSON metadata:", JSON.stringify(json));
            
            // Extract image format from source
            if (json.source && typeof json.source === 'string') {
              const formatMatch = json.source.match(/data:image\/([^;]+);base64/);
              if (formatMatch && formatMatch[1]) {
                imageFormat = formatMatch[1];
                console.log(`Detected image format from source: ${imageFormat}`);
              }
            }
          } catch (parseError) {
            console.error("Failed to parse JSON metadata:", parseError);
            return res.status(400).json({ message: "Failed to parse image metadata" });
          }
        }
      }
    } catch (e) {
      console.error("Error processing request:", e);
      return res.status(400).json({ message: "Invalid request format" });
    }
    
    // Step 3: Extract the image data
    let imageData = null;
    
    try {
      // Find where the base64 data begins
      const headerStr = buffer.slice(0, 1000).toString('utf8');
      const base64Start = headerStr.indexOf("base64,");
      
      if (base64Start !== -1) {
        // Get the position after "base64,"
        const dataStart = base64Start + 7;
        
        // Extract the image data (everything after "base64,")
        imageData = Buffer.from(
          buffer.slice(dataStart).toString('utf8'), 
          'base64'
        );
        
        console.log(`Extracted image data, size: ${imageData.length} bytes`);
      } else {
        // Fallback: Try to find standard image signatures
        const signatures = {
          'png': Buffer.from([0x89, 0x50, 0x4E, 0x47]),
          'jpeg': Buffer.from([0xFF, 0xD8, 0xFF]),
          'jpg': Buffer.from([0xFF, 0xD8, 0xFF]),
          'gif': Buffer.from([0x47, 0x49, 0x46]),
          'webp': Buffer.from([0x52, 0x49, 0x46, 0x46])
        };
        
        let imageStart = -1;
        
        // Check for image signature
        for (const [format, sig] of Object.entries(signatures)) {
          const pos = buffer.indexOf(sig);
          if (pos !== -1) {
            imageStart = pos;
            imageFormat = format;
            console.log(`Found ${format} signature at position ${pos}`);
            break;
          }
        }
        
        if (imageStart !== -1) {
          imageData = buffer.slice(imageStart);
          console.log(`Using image data from position ${imageStart}, size: ${imageData.length} bytes`);
        } else {
          console.error("Could not locate image data");
          return res.status(400).json({ message: "Image data not found" });
        }
      }
    } catch (e) {
      console.error("Error extracting image data:", e);
      return res.status(400).json({ message: "Failed to extract image data" });
    }
    
    // Step 4: Save the image
    if (!imageData) {
      console.error("No image data to save");
      return res.status(400).json({ message: "No image data found" });
    }
    
    const fileName = `photopea_${Date.now()}.${imageFormat}`;
    const uploadPath = path.join(uploadDir, fileName);
    
    fs.writeFile(uploadPath, imageData, (err) => {
      if (err) {
        console.error("File write error:", err);
        return res.status(500).json({ message: "Failed to save image" });
      }
      
      console.log(`Image saved successfully to ${uploadPath}`);
      const fileUrl = `http://localhost:5001/uploads/${fileName}`;
      
      res.json({
        message: "Image saved successfully!",
        script: 'app.echoToOE("Image saved to EngraveMaster!")',
        newSource: fileUrl
      });
    });
  });
});

export default router;