import React, { useState } from "react";
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

        {/* Step 1: Download / Rename / Continue */}
        {step === 1 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
            <div className="flex space-x-2">
              <a
                href={url}
                download={filename}
                className="inline-flex items-center px-4 py-2 bg-[#00C2A8] text-white rounded-lg hover:bg-[#00a28d] transition"
              >
                <FiDownload className="mr-2" /> Download
              </a>
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

        {/* Step 2: Size & DPI */}
        {step === 2 && (
          <div className="p-6 space-y-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-[#563232] dark:text-[#e7cfb4] text-sm">
              Please enter the final size for your engraving. This cannot be
              changed later.
            </p>
            <p className="text-[#563232] dark:text-[#e7cfb4] text-sm">
              Select the DPI (Dots Per Inch) setting suitable for your laser.{" "}
              <a href="#" className="underline text-blue-600">
                Learn more here
              </a>
            </p>

            <div>
              <label className="block text-sm text-[#563232] dark:text-[#e7cfb4] mb-1">
                Measurement Unit
              </label>
              <select className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-[#563232] dark:text-[#e7cfb4]">
                <option value="mm">Millimeters (mm)</option>
                <option value="cm">Centimeters (cm)</option>
                <option value="inch">Inches</option>
              </select>
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm text-[#563232] dark:text-[#e7cfb4] mb-1">
                  Width
                </label>
                <input
                  type="number"
                  className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-[#563232] dark:text-[#e7cfb4]"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-[#563232] dark:text-[#e7cfb4] mb-1">
                  Height
                </label>
                <input
                  type="number"
                  className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-[#563232] dark:text-[#e7cfb4]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#563232] dark:text-[#e7cfb4] mb-1">
                DPI
              </label>
              <select className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-[#563232] dark:text-[#e7cfb4]">
                <option value="72">72 DPI</option>
                <option value="150">150 DPI</option>
                <option value="300">300 DPI</option>
              </select>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-[#563232] dark:text-[#e7cfb4] rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2 bg-[#FF6F3C] text-white rounded-lg hover:bg-[#e55a27]"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Engraving Machine */}
        {step === 3 && (
          <div className="p-6 space-y-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-[#563232] dark:text-[#ffc18c]">
              What is your Engraving Machine?
            </h3>
            <select className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-[#563232] dark:text-[#e7cfb4]">
              <option value="">-- Select Your Machine --</option>
              <option value="co2">CO₂ Laser Engraving Machine</option>
              <option value="diode">Diode Laser Engraving Machine</option>
              <option value="uv">UV Laser Engraving Machine</option>
            </select>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-[#563232] dark:text-[#e7cfb4] rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-4 py-2 bg-[#FF6F3C] text-white rounded-lg hover:bg-[#e55a27]"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Material Selection */}
        {step === 4 && (
          <div className="p-6 space-y-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-[#563232] dark:text-[#ffc18c]">
              On what material do you want to engrave?
            </h3>
            <select className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-[#563232] dark:text-[#e7cfb4]">
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
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-[#563232] dark:text-[#e7cfb4] rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Back
              </button>
              <button
                onClick={() => {
                  alert("Engraving setup complete.");
                  setStep(1);
                  onClose();
                }}
                className="px-4 py-2 bg-[#2ECC71] text-white rounded-lg hover:bg-green-600"
              >
                Finish
              </button>
            </div>
          </div>
        )}

        {/* Delete (always visible at bottom) */}
        <div className="px-6 pb-6 pt-2 flex justify-end border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onDelete}
            className="inline-flex items-center px-4 py-2 bg-[#FF3C3C] text-white rounded-lg hover:bg-[#e52f2f] transition"
          >
            <FiTrash2 className="mr-2" />
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
