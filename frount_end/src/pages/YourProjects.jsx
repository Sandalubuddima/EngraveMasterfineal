import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  FiDownload,
  FiTrash2,
  FiEdit3,
  FiX,
  FiSearch,
  FiGrid,
  FiList,
  FiChevronLeft,
  FiChevronRight,
  FiFolder,
  FiAlertCircle,
  FiCheckCircle
} from "react-icons/fi";
import Navbar from "../components/PageNavbar";
import Footer from "../components/Footer";
import ImgPreview from "../components/ImgPreview";

export default function YourProjects() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [renameInfo, setRenameInfo] = useState({ current: "", newName: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("date"); // date, name
  const [sortOrder, setSortOrder] = useState("desc"); // asc, desc
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5001/api/photopea/list", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setImages(data.images || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading images:", err);
        setLoading(false);
      });
  }, [token]);

  const handleDelete = async (url) => {
    const filename = url.split("/").pop();
    if (confirm(`Are you sure you want to delete ${filename}?`)) {
      try {
        const res = await fetch(`http://localhost:5001/api/photopea/delete/${filename}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const result = await res.json();
        if (res.ok) {
          setImages((prev) => prev.filter((img) => img !== url));
          showToast("Project deleted successfully!");
        } else {
          showToast(result.message || "Failed to delete project", "error");
        }
      } catch (err) {
        console.error("Delete failed:", err);
        showToast("Error deleting project", "error");
      }
    }
  };

  const handleRename = async () => {
    const { current, newName } = renameInfo;
    if (!newName.trim()) {
      showToast("Please enter a valid name", "error");
      return;
    }
    try {
      const res = await fetch(`http://localhost:5001/api/photopea/rename`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ oldName: current, newName }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast("Project renamed successfully!");
        setImages((prev) =>
          prev.map((img) =>
            img.includes(current)
              ? img.replace(current, newName)
              : img
          )
        );
        setRenameInfo({ current: "", newName: "" });
      } else {
        showToast(data.message, "error");
      }
    } catch (err) {
      showToast("Rename failed", "error");
    }
  };

  const [toast, setToast] = useState({ message: "", type: "", visible: false });
  const showToast = (message, type = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ message: "", type: "", visible: false }), 3000);
  };

  const filteredProjects = images.filter(url => {
    const filename = url.split("/").pop().toLowerCase();
    return filename.includes(searchTerm.toLowerCase());
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const filenameA = a.split("/").pop();
    const filenameB = b.split("/").pop();
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? filenameA.localeCompare(filenameB)
        : filenameB.localeCompare(filenameA);
    }
    return sortOrder === "asc" ? a.localeCompare(b) : b.localeCompare(a);
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  // [Rendering logic remains unchanged...]
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-[#f5e9da] to-[#e7cfb4] dark:from-[#1C1C1C] dark:to-[#2e2e2e] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with breadcrumbs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <div className="flex items-center text-sm text-[#563232] dark:text-[#e7cfb4] mb-2">
                <a href="/" className="hover:text-[#FF6F3C]">Home</a>
                <FiChevronRight className="mx-2" />
                <span className="font-medium">Your Projects</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#84240c] dark:text-[#ffc18c]">
                Your Projects
              </h1>
            </div>
            
            <div className="mt-4 md:mt-0">
              <a 
                href="/create" 
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#FF6F3C] to-[#FF3C3C] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Create New Project
              </a>
            </div>
          </div>
          
          {/* Search and filter controls */}
          <div className="bg-white dark:bg-[#2e2e2e] rounded-xl shadow-md mb-8 p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <div className="relative flex-grow max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-[#563232] dark:text-[#e7cfb4] focus:ring-[#FF6F3C] focus:border-[#FF6F3C]"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-[#563232] dark:text-[#e7cfb4]">Sort:</span>
                  <select 
                    className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-[#563232] dark:text-[#e7cfb4] rounded-lg focus:ring-[#FF6F3C] focus:border-[#FF6F3C] p-2 text-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="date">Date</option>
                    <option value="name">Name</option>
                  </select>
                  <button 
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    {sortOrder === "asc" ? <FiChevronLeft /> : <FiChevronRight />}
                  </button>
                </div>
                
                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    className={`p-2 rounded-md ${viewMode === "grid" ? "bg-white dark:bg-gray-600 shadow-sm" : "text-gray-500 dark:text-gray-400"}`}
                    onClick={() => setViewMode("grid")}
                    title="Grid view"
                  >
                    <FiGrid />
                  </button>
                  <button
                    className={`p-2 rounded-md ${viewMode === "list" ? "bg-white dark:bg-gray-600 shadow-sm" : "text-gray-500 dark:text-gray-400"}`}
                    onClick={() => setViewMode("list")}
                    title="List view"
                  >
                    <FiList />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content area */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6F3C]"></div>
            </div>
          ) : sortedProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#2e2e2e] rounded-xl shadow-md p-8 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FF6F3C] bg-opacity-10 rounded-full mb-4">
                <FiFolder className="text-2xl text-[#FF6F3C]" />
              </div>
              <h3 className="text-xl font-semibold text-[#84240c] dark:text-[#ffc18c] mb-2">
                {searchTerm ? "No matching projects found" : "No projects yet"}
              </h3>
              <p className="text-[#563232] dark:text-[#e7cfb4] max-w-md mx-auto mb-6">
                {searchTerm 
                  ? `Try adjusting your search or browse all your projects by clearing the search field.`
                  : `Start creating beautiful laser engravings with EngraveMaster. Your projects will appear here.`
                }
              </p>
              {!searchTerm && (
                <a 
                  href="/create" 
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#FF6F3C] to-[#FF3C3C] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Create Your First Project
                </a>
              )}
            </motion.div>
          ) : viewMode === "grid" ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {sortedProjects.map((url, index) => {
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
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                        onClick={() => setPreviewUrl(url)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                        <h3 className="text-white font-medium truncate">{filename}</h3>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-medium text-[#563232] dark:text-[#e7cfb4] mb-3 truncate">
                        {filename}
                      </h3>
                      <div className="flex justify-between">
                        <button
                          onClick={() => setPreviewUrl(url)}
                          className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-[#563232] dark:text-[#e7cfb4] transition-colors duration-200"
                        >
                          Preview
                        </button>
                        
                        <div className="flex space-x-1">
                          <button
                            onClick={() => setRenameInfo({ current: filename, newName: filename })}
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
                            onClick={() => handleDelete(url)}
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
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-white dark:bg-[#2e2e2e] rounded-xl shadow-md overflow-hidden"
            >
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Project
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-[#2e2e2e] divide-y divide-gray-200 dark:divide-gray-700">
                  {sortedProjects.map((url, index) => {
                    const filename = url.split("/").pop();
                    return (
                      <motion.tr 
                        key={index}
                        variants={itemVariants}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img 
                                className="h-10 w-10 rounded-md object-cover cursor-pointer"
                                src={url}
                                alt={filename}
                                onClick={() => setPreviewUrl(url)}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-[#563232] dark:text-[#e7cfb4]">
                            {filename}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => setPreviewUrl(url)}
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                              title="Preview"
                            >
                              <FiSearch size={18} />
                            </button>
                            <button
                              onClick={() => setRenameInfo({ current: filename, newName: filename })}
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
                              onClick={() => handleDelete(url)}
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
          )}
        </div>
      </main>

      {/* Preview Modal with responsive sizing */}
      {previewUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewUrl(null)}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-[#2e2e2e] rounded-xl w-auto max-w-[90vw] max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-[#563232] dark:text-[#e7cfb4] truncate max-w-lg">
                {previewUrl && previewUrl.split("/").pop()}
              </h3>
              <button
                onClick={() => setPreviewUrl(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="relative flex-grow overflow-auto bg-[#f9f5f2] dark:bg-[#1c1c1c] flex items-center justify-center">
              <ImgPreview
                src={previewUrl}
                alt={previewUrl && previewUrl.split("/").pop() || "Preview"}
              />
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
              <div className="flex space-x-2">
                <a
                  href={previewUrl}
                  download={previewUrl && previewUrl.split("/").pop()}
                  className="inline-flex items-center px-4 py-2 bg-[#00C2A8] text-white rounded-lg hover:bg-[#00a28d] transition-colors duration-200"
                >
                  <FiDownload className="mr-2" />
                  Download
                </a>
                <button
                  onClick={() => {
                    const filename = previewUrl.split("/").pop();
                    setRenameInfo({ current: filename, newName: filename });
                    setPreviewUrl(null);
                  }}
                  className="inline-flex items-center px-4 py-2 bg-[#FF6F3C] text-white rounded-lg hover:bg-[#e55a27] transition-colors duration-200"
                >
                  <FiEdit3 className="mr-2" />
                  Rename
                </button>
              </div>
              <button
                onClick={() => {
                  handleDelete(previewUrl);
                  setPreviewUrl(null);
                }}
                className="inline-flex items-center px-4 py-2 bg-[#FF3C3C] text-white rounded-lg hover:bg-[#e52f2f] transition-colors duration-200"
              >
                <FiTrash2 className="mr-2" />
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Rename Modal */}
      {renameInfo.current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-[#2e2e2e] p-6 rounded-xl max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-[#84240c] dark:text-[#ffc18c] mb-4">Rename Project</h3>
            <div className="mb-6 p-3 bg-[#f9f5f2] dark:bg-[#1c1c1c] rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Current name:</p>
              <p className="font-medium text-[#563232] dark:text-[#e7cfb4] break-all">{renameInfo.current}</p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#563232] dark:text-[#e7cfb4] mb-2">
                New name:
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-[#563232] dark:text-[#e7cfb4] focus:ring-[#FF6F3C] focus:border-[#FF6F3C]"
                placeholder="Enter new file name (with extension)"
                value={renameInfo.newName}
                onChange={(e) => setRenameInfo({ ...renameInfo, newName: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setRenameInfo({ current: "", newName: "" })}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-[#563232] dark:text-[#e7cfb4] hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleRename}
                className="px-4 py-2 bg-gradient-to-r from-[#FF6F3C] to-[#FF3C3C] text-white font-medium rounded-lg hover:shadow-md transition-all duration-200"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Toast notification */}
      {toast.visible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 ${
            toast.type === "error" 
              ? "bg-red-500 text-white" 
              : "bg-green-500 text-white"
          }`}
        >
          {toast.type === "error" ? (
            <FiAlertCircle className="flex-shrink-0" />
          ) : (
            <FiCheckCircle className="flex-shrink-0" />
          )}
          <span>{toast.message}</span>
        </motion.div>
      )}
      
      <Footer />
    </>
  );
}