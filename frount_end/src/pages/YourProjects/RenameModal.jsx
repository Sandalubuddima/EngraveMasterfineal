import React from "react";
import { motion } from "framer-motion";

export default function RenameModal({ current, newName, onCancel, onChange, onSave }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-[#2e2e2e] p-6 rounded-xl max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold text-[#84240c] dark:text-[#ffc18c] mb-4">
          Rename Project
        </h3>

        <div className="mb-6 p-3 bg-[#f9f5f2] dark:bg-[#1c1c1c] rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Current name:</p>
          <p className="font-medium text-[#563232] dark:text-[#e7cfb4] break-all">{current}</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-[#563232] dark:text-[#e7cfb4] mb-2">
            New name:
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-[#563232] dark:text-[#e7cfb4] focus:ring-[#FF6F3C] focus:border-[#FF6F3C]"
            placeholder="Enter new file name (with extension)"
            value={newName}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-[#563232] dark:text-[#e7cfb4] hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-gradient-to-r from-[#FF6F3C] to-[#FF3C3C] text-white font-medium rounded-lg hover:shadow-md transition-all duration-200"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
