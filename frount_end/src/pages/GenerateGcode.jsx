import React, { useState } from "react";

export default function GenerateGcode({ imageUrl }) {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [dpi, setDpi] = useState("150");
  const [material, setMaterial] = useState("wood");
  const [machine, setMachine] = useState("co2");
  const [timber, setTimber] = useState("Teak");

  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState("");

  const handleGenerate = async () => {
    if (!imageUrl || !width || !height || !dpi || !material || !machine) {
      alert("Please fill all required fields.");
      return;
    }

    setIsGenerating(true);
    setMessage("Generating G-code...");

    try {
      const response = await fetch("http://localhost:5001/api/gcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl,
          width,
          height,
          dpi,
          material,
          machine,
          timber: material === "wood" ? timber : "",
        }),
      });

      const data = await response.json();

      if (data.downloadUrl) {
        // Trigger file download
        const a = document.createElement("a");
        a.href = data.downloadUrl;
        a.download = "engraving.gcode";
        document.body.appendChild(a);
        a.click();
        a.remove();

        setMessage("G-code downloaded successfully!");
      } else {
        setMessage("Failed to generate G-code.");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("An error occurred while generating G-code.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-[#2c2c2c] shadow-lg rounded-xl space-y-4">
      <h2 className="text-xl font-bold text-[#563232] dark:text-[#ffc18c]">Generate G-code</h2>

      <input
        type="number"
        placeholder="Width (mm)"
        value={width}
        onChange={(e) => setWidth(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-[#e7cfb4]"
      />

      <input
        type="number"
        placeholder="Height (mm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-[#e7cfb4]"
      />

      <select
        value={dpi}
        onChange={(e) => setDpi(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-[#e7cfb4]"
      >
        <option value="72">72 DPI</option>
        <option value="150">150 DPI</option>
        <option value="300">300 DPI</option>
      </select>

      <select
        value={machine}
        onChange={(e) => setMachine(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-[#e7cfb4]"
      >
        <option value="co2">CO₂ Laser</option>
        <option value="diode">Diode Laser</option>
        <option value="uv">UV Laser</option>
      </select>

      <select
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-[#e7cfb4]"
      >
        <option value="wood">Wood</option>
        <option value="acrylic">Acrylic</option>
        <option value="glass">Glass</option>
        <option value="leather">Leather</option>
        <option value="white-tile">White Tile</option>
        <option value="stainless-steel">Stainless Steel</option>
      </select>

      {material === "wood" && (
        <select
          value={timber}
          onChange={(e) => setTimber(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-[#e7cfb4]"
        >
          <option value="Teak">Teak</option>
          <option value="Mahogany">Mahogany</option>
          <option value="Jak">Jak</option>
          <option value="Kumbuk">Kumbuk</option>
          <option value="Nadun">Nadun</option>
          <option value="Satinwood">Satinwood</option>
        </select>
      )}

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full px-4 py-2 bg-[#007BFF] text-white rounded hover:bg-[#005fcc] disabled:opacity-50"
      >
        {isGenerating ? "Generating..." : "Generate G-code"}
      </button>

      {message && <p className="text-sm mt-2 text-[#563232] dark:text-[#ffc18c]">{message}</p>}
    </div>
  );
}
