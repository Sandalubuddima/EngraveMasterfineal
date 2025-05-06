import React from "react";
import { motion } from "framer-motion";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

export default function Toast({ message, type = "success", visible }) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2
        ${type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
    >
      {type === "error" ? (
        <FiAlertCircle className="flex-shrink-0" />
      ) : (
        <FiCheckCircle className="flex-shrink-0" />
      )}
      <span>{message}</span>
    </motion.div>
  );
}
