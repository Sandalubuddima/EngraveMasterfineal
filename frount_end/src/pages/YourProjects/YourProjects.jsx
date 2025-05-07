import React from "react";
import {
  FiChevronRight,
  FiSearch,
  FiGrid,
  FiList,
  FiChevronLeft,
} from "react-icons/fi";
import { motion } from "framer-motion";
import Navbar from "../../components/PageNavbar";
import Footer from "../../components/Footer";
import useProjects from "../../hooks/useProjects";
import ProjectGrid from "./ProjectGrid";
import ProjectList from "./ProjectList";
import PreviewModal from "./PreviewModal";
import RenameModal from "./RenameModal";
import Toast from "../../components/Toast";

export default function YourProjects() {
  const {
    images,
    loading,
    previewUrl,
    renameInfo,
    searchTerm,
    sortBy,
    sortOrder,
    viewMode,
    setPreviewUrl,
    setRenameInfo,
    setSearchTerm,
    setSortBy,
    setSortOrder,
    setViewMode,
    handleDelete,
    handleRename,
    toast,
  } = useProjects();

  // 👉 Add next image navigation
  const handleNextPreview = () => {
    const currentIndex = images.findIndex((img) => img === previewUrl);
    const nextIndex = (currentIndex + 1) % images.length;
    setPreviewUrl(images[nextIndex]);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-[#f5e9da] to-[#e7cfb4] dark:from-[#1C1C1C] dark:to-[#2e2e2e] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
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

          {/* Controls */}
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

          {/* Main Content */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6F3C]"></div>
            </div>
          ) : images.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#2e2e2e] rounded-xl shadow-md p-8 text-center"
            >
              <h3 className="text-xl font-semibold text-[#84240c] dark:text-[#ffc18c] mb-2">
                No Projects Found
              </h3>
              <p className="text-[#563232] dark:text-[#e7cfb4] max-w-md mx-auto mb-6">
                You haven't uploaded any projects yet. Start by creating your first project.
              </p>
              <a
                href="/create"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#FF6F3C] to-[#FF3C3C] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Create Your First Project
              </a>
            </motion.div>
          ) : viewMode === "grid" ? (
            <ProjectGrid
              images={images}
              onPreview={setPreviewUrl}
              onRename={setRenameInfo}
              onDelete={handleDelete}
            />
          ) : (
            <ProjectList
              images={images}
              onPreview={setPreviewUrl}
              onRename={setRenameInfo}
              onDelete={handleDelete}
            />
          )}
        </div>
      </main>

      {/* Modals */}
      {previewUrl && (
        <PreviewModal
          url={previewUrl}
          onClose={() => setPreviewUrl(null)}
          onRename={() => {
            const filename = previewUrl.split("/").pop();
            setRenameInfo({ current: filename, newName: filename });
            setPreviewUrl(null);
          }}
          onDelete={() => {
            handleDelete(previewUrl);
            setPreviewUrl(null);
          }}
          onNext={handleNextPreview}
        />

      )}

      {renameInfo.current && (
        <RenameModal
          current={renameInfo.current}
          newName={renameInfo.newName}
          onCancel={() => setRenameInfo({ current: "", newName: "" })}
          onChange={(newName) => setRenameInfo({ ...renameInfo, newName })}
          onSave={handleRename}
        />
      )}

      {/* Toast */}
      {toast.visible && <Toast message={toast.message} type={toast.type} />}
      <Footer />
    </>
  );
}
