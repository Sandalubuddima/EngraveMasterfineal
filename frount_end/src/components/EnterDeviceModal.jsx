// src/components/EnterDeviceModal.jsx
import React, { useState } from "react";

export default function EnterDeviceModal({ onClose, onSubmit }) {
  const [deviceId, setDeviceId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (deviceId.trim()) {
      onSubmit(deviceId.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Enter Device ID
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="e.g., device1"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              View
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
