import React from "react";
import { motion } from "framer-motion";
import { FiSearch, FiEdit3, FiDownload, FiTrash2, FiZap } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function ProjectList({ images, onPreview, onRename, onDelete, onConvert }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-[#2e2e2e] rounded-xl shadow-md overflow-hidden"
    >
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Preview
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              File Name
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-[#2e2e2e] divide-y divide-gray-200 dark:divide-gray-700">
          {images.map((url, index) => {
            const filename = url.split("/").pop();
            return (
              <motion.tr key={index} variants={itemVariants} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={url}
                    alt={filename}
                    className="h-10 w-10 rounded-md object-cover cursor-pointer"
                    onClick={() => onPreview(url)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-[#563232] dark:text-[#e7cfb4]">
                    {filename}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onPreview(url)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      title="Preview"
                    >
                      <FiSearch size={18} />
                    </button>
                    <button
                      onClick={() => onRename({ current: filename, newName: filename })}
                      className="text-[#FF6F3C] hover:text-[#e55a27]"
                      title="Rename"
                    >
                      <FiEdit3 size={18} />
                    </button>
                    <a
                      href={url}
                      download={filename}
                      className="text-[#00C2A8] hover:text-[#00a28d]"
                      title="Download"
                    >
                      <FiDownload size={18} />
                    </a>
                    <button
                      onClick={() => onConvert(url)}
                      className="text-purple-600 hover:text-purple-800"
                      title="Convert to SVG"
                    >
                      <FiZap size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(url)}
                      className="text-[#FF3C3C] hover:text-[#e52f2f]"
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </motion.div>
  );
}
