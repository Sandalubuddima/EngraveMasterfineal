import React from "react";
import { motion } from "framer-motion";
import { FiEdit3, FiDownload, FiTrash2, FiZap } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

export default function ProjectGrid({ images, onPreview, onRename, onDelete, onConvert }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      {images.map((url, index) => {
        const filename = url.split("/").pop();
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white dark:bg-[#2e2e2e] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={url}
                alt={`Project ${filename}`}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                onClick={() => onPreview(url)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                <h3 className="text-white font-medium truncate">{filename}</h3>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-medium text-[#563232] dark:text-[#e7cfb4] mb-3 truncate">
                {filename}
              </h3>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => onPreview(url)}
                  className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-[#563232] dark:text-[#e7cfb4] transition-colors duration-200"
                >
                  Preview
                </button>

                <div className="flex space-x-1">
                  <button
                    onClick={() => onRename({ current: filename, newName: filename })}
                    className="p-2 text-[#FF6F3C] hover:bg-[#FF6F3C]/10 rounded-lg transition-colors duration-200"
                    title="Rename"
                  >
                    <FiEdit3 size={16} />
                  </button>
                  <a
                    href={url}
                    download={filename}
                    className="p-2 text-[#00C2A8] hover:bg-[#00C2A8]/10 rounded-lg transition-colors duration-200"
                    title="Download"
                  >
                    <FiDownload size={16} />
                  </a>
                  <button
                    onClick={() => onPreview(url)}
                    className="p-2 text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-800 rounded-lg transition-colors duration-200"
                    title="Convert to SVG"
                  >
                    <FiZap size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(url)}
                    className="p-2 text-[#FF3C3C] hover:bg-[#FF3C3C]/10 rounded-lg transition-colors duration-200"
                    title="Delete"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
