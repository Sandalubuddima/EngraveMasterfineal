import React from "react";
import { motion } from "framer-motion";

export default function WidgetCard({ icon, title, value, color = "#FF6F3C" }) {
  return (
    <motion.div
      className="w-full sm:w-64 p-6 bg-white dark:bg-[#1C1C1C] rounded-2xl shadow-md hover:shadow-lg transition duration-300"
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">{title}</div>
        <div className="text-2xl text-white p-2 rounded-md" style={{ backgroundColor: color }}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
    </motion.div>
  );
}
