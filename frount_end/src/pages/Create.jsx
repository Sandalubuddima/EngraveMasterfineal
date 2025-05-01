import React, { useState, useRef } from "react";
import Navbar from "../components/PageNavbar";
import Footer from "../components/Footer";

export default function Create() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const openInPhotopea = () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      const config = {
        files: [base64Image],
        server: {
          version: 1,
          url: "http://localhost:5001/api/photopea/save",
          formats: ["png", "jpg:0.8"]
        },
        script: `app.echoToOE("Image loaded in Photopea. You can start editing.");`
      };

      const configString = encodeURIComponent(JSON.stringify(config));
      const photopeaUrl = `https://www.photopea.com#${configString}`;
      window.open(photopeaUrl, "_blank");
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
        <>
          <Navbar />
    <div className="min-h-screen bg-[#f5e9da] dark:bg-[#1C1C1C] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl bg-white dark:bg-[#2a2a2a] shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-[#84240C] dark:text-[#ffc18c] mb-6 text-center">
          Upload & Edit with Photopea
        </h2>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current.click()}
          className={`w-full p-6 border-4 ${
            isDragging ? "border-dashed border-[#FF3C3C]" : "border-dashed border-[#FF6F3C]"
          } rounded-xl text-center cursor-pointer transition-all duration-200 bg-[#fdf6f0] dark:bg-[#2e2e2e] mb-6`}
        >
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Drag & drop an image here or <span className="underline">click to browse</span>
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>

        {previewURL && (
          <div className="mb-6 text-center">
            <img
              src={previewURL}
              alt="Preview"
              className="mx-auto max-h-64 rounded-lg border border-gray-300 dark:border-gray-600 shadow"
            />
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {selectedFile?.name}
            </p>
          </div>
        )}

        {selectedFile && (
          <div className="text-center">
            <button
              onClick={openInPhotopea}
              className="bg-[#FF6F3C] hover:bg-[#FF5A1F] text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-md"
            >
              Edit in Photopea
            </button>
          </div>
        )}
      </div>
    </div>
          <Footer />
        </>
  );
}
