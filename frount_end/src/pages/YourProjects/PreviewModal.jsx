import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiDownload,
  FiEdit3,
  FiTrash2,
  FiChevronRight,
} from "react-icons/fi";
import ImgPreview from "../../components/ImgPreview";

export default function PreviewModal({ url, onClose, onRename, onDelete }) {
  const filename = url?.split("/").pop();
  const [step, setStep] = useState(1);
  const [material, setMaterial] = useState("");
  const [timber, setTimber] = useState("");
  const [woodTypes, setWoodTypes] = useState([]);
  const [suggestedPower, setSuggestedPower] = useState("");
  const [suggestedSpeed, setSuggestedSpeed] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5001/api/wood-types")
      .then((res) => res.json())
      .then((data) => setWoodTypes(data))
      .catch((err) => console.error("Failed to load wood types", err));
  }, []);

  const handleTimberChange = async (e) => {
    const selected = e.target.value;
    setTimber(selected);
    try {
      const res = await fetch(`http://localhost:5001/api/engraving-settings/wood/${selected}`);
      const data = await res.json();
      setSuggestedPower(data?.suggestedPower || "");
      setSuggestedSpeed(data?.suggestedSpeed || "");
    } catch (err) {
      console.error("Failed to fetch engraving suggestions", err);
      setSuggestedPower("");
      setSuggestedSpeed("");
    }
  };

  const handleGenerateRandomGcode = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const gcodeFiles = [
        "24683062.gcode",
        "27893422.gcode",
        "52272523.gcode",
        "52514154.gcode",
        "67905312.gcode",
        "72425108.gcode"
      ];
      const randomFile = gcodeFiles[Math.floor(Math.random() * gcodeFiles.length)];
      const gcodeUrl = `http://localhost:5001/uploads/gcode/${randomFile}`;
      const link = document.createElement("a");
      link.href = gcodeUrl;
      link.setAttribute("download", randomFile);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 3000);
  };

  const handleImageDownload = () => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-[#2e2e2e] rounded-xl w-auto max-w-[90vw] max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-[#563232] dark:text-[#e7cfb4] truncate max-w-lg">
            {filename}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Image Preview */}
        <div className="relative flex-grow overflow-auto bg-[#f9f5f2] dark:bg-[#1c1c1c] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={url}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex justify-center items-center"
            >
              <ImgPreview src={url} alt={filename || "Preview"} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
            <div className="flex space-x-2">
              <button
                onClick={handleImageDownload}
                className="inline-flex items-center px-4 py-2 bg-[#00C2A8] text-white rounded-lg hover:bg-[#00a28d] transition"
              >
                <FiDownload className="mr-2" /> Download
              </button>
              <button
                onClick={onRename}
                className="inline-flex items-center px-4 py-2 bg-[#FF6F3C] text-white rounded-lg hover:bg-[#e55a27] transition"
              >
                <FiEdit3 className="mr-2" /> Rename
              </button>
            </div>
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 bg-[#563232] text-white rounded-lg hover:bg-[#84240c] transition"
            >
              Continue <FiChevronRight className="ml-1" />
            </button>
          </div>
        )}

{/* Step 2 */}
{step === 2 && (
  <div className="p-6 space-y-4 border-t border-gray-200 dark:border-gray-700">
    <p className="text-[#563232] dark:text-[#e7cfb4] text-sm">Enter engraving size and DPI setting.</p>

    {/* Width and Height Inputs with Units */}
    <div className="flex space-x-4">
      <input
        type="number"
        placeholder="Width"
        className="flex-1 p-3 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-[#e7cfb4]"
      />
      <input
        type="number"
        placeholder="Height"
        className="flex-1 p-3 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-[#e7cfb4]"
      />
      <select className="p-3 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-[#e7cfb4]">
        <option value="mm">mm</option>
        <option value="cm">cm</option>
        <option value="inch">inch</option>
      </select>
    </div>

    {/* DPI Dropdown */}
    <div>
      <label className="block text-sm font-medium text-[#563232] dark:text-[#e7cfb4] mb-1">DPI</label>
      <select className="w-full p-3 rounded border dark:border-gray-600 dark:bg-gray-700 text-[#563232] dark:text-[#e7cfb4]">
        <option value="72">72 DPI</option>
        <option value="150">150 DPI</option>
        <option value="300">300 DPI</option>
      </select>
    </div>

    <div className="flex justify-between pt-4">
      <button onClick={() => setStep(1)} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded">Back</button>
      <button onClick={() => setStep(3)} className="px-4 py-2 bg-[#FF6F3C] text-white rounded hover:bg-[#e55a27]">Continue</button>
    </div>
  </div>
)}


        {/* Step 3 */}
        {step === 3 && (
          <div className="p-6 space-y-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-[#563232] dark:text-[#ffc18c]">What is your Engraving Machine?</h3>
            <select className="w-full p-3 rounded border dark:border-gray-600 dark:bg-gray-700 text-[#563232] dark:text-[#e7cfb4]">
              <option value="">-- Select Your Machine --</option>
              <option value="co2">CO₂ Laser Engraving Machine</option>
              <option value="diode">Diode Laser Engraving Machine</option>
              <option value="uv">UV Laser Engraving Machine</option>
            </select>
            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(2)} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded">Back</button>
              <button onClick={() => setStep(4)} className="px-4 py-2 bg-[#FF6F3C] text-white rounded hover:bg-[#e55a27]">Continue</button>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div className="p-6 space-y-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-[#563232] dark:text-[#ffc18c]">On what material do you want to engrave?</h3>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full p-3 rounded border dark:border-gray-600 dark:bg-gray-700 text-[#563232] dark:text-[#e7cfb4]"
            >
              <option value="">-- Select Material --</option>
              <option value="acrylic">Acrylic</option>
              <option value="black-slate">Black Slate</option>
              <option value="cork">Cork</option>
              <option value="glass">Glass</option>
              <option value="leather">Leather</option>
              <option value="white-tile-painted-black">White Tile Painted Black</option>
              <option value="white-tile">White Tile</option>
              <option value="wood">Wood</option>
              <option value="anodized-aluminum">Anodized Aluminum</option>
              <option value="stainless-steel">Stainless Steel</option>
            </select>
            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(3)} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded">Back</button>
              <button
                onClick={() => material === "wood" ? setStep(5) : onClose()}
                className="px-4 py-2 bg-[#2ECC71] text-white rounded hover:bg-green-600"
              >
                {material === "wood" ? "Next" : "Finish"}
              </button>
            </div>
          </div>
        )}

        {/* Step 5 */}
        {step === 5 && (
          <div className="p-6 space-y-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-[#563232] dark:text-[#ffc18c]">Select Timber Type</h3>
            <select
              value={timber}
              onChange={handleTimberChange}
              className="w-full p-3 rounded border dark:border-gray-600 dark:bg-gray-700 text-[#563232] dark:text-[#e7cfb4]"
            >
              <option value="">-- Choose Timber --</option>
              {woodTypes.map((wood, index) => (
                <option key={index} value={wood.name}>{wood.name}</option>
              ))}
            </select>

            <div className="text-sm mt-4 p-4 bg-[#f5f5f5] dark:bg-gray-800 rounded-lg border dark:border-gray-700 text-[#563232] dark:text-[#e7cfb4]">
              <p><strong>Suggested Power:</strong> {suggestedPower ? `${suggestedPower}%` : "N/A"}</p>
              <p><strong>Suggested Speed:</strong> {suggestedSpeed ? `${suggestedSpeed} mm/s` : "N/A"}</p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => setStep(4)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded"
                disabled={isGenerating}
              >
                Back
              </button>

              <button
                onClick={handleGenerateRandomGcode}
                className="inline-flex items-center px-4 py-2 bg-[#007BFF] text-white rounded hover:bg-[#0056b3] transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <span className="flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Generating...</span>
                  </span>
                ) : (
                  <>
                    <FiDownload className="mr-2" />
                    Generate G-code
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Delete Button */}
        <div className="px-6 pb-6 pt-2 flex justify-end border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onDelete}
            className="inline-flex items-center px-4 py-2 bg-[#FF3C3C] text-white rounded-lg hover:bg-[#e52f2f] transition"
          >
            <FiTrash2 className="mr-2" /> Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
