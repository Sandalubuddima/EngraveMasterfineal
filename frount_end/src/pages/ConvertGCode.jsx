// src/pages/ConvertGCode.jsx
import React, { useState } from "react";
import Navbar from "../components/PageNavbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function ConvertGCode() {
  const [svgUrl, setSvgUrl] = useState("");
  const [gcode, setGcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState(null);

  const token = localStorage.getItem("token");

  const handleConvert = async () => {
    setLoading(true);
    setGcode("");
    setDownloadLink(null);

    try {
      const res = await fetch("http://localhost:5001/api/photopea/svg-to-gcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ svgUrl, saveAsFile: true }),
      });

      const data = await res.json();

      if (res.ok) {
        setGcode(data.gcode);
        if (data.gcodeFilename) {
          setDownloadLink(`http://localhost:5001/gcodes/${data.gcodeFilename}`);
        }
      } else {
        alert(data.message || "Conversion failed");
      }
    } catch (err) {
      console.error("Conversion error:", err);
      alert("Something went wrong during conversion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 bg-[#f5e9da] dark:bg-[#1C1C1C] px-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-[#2e2e2e] p-6 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-[#84240c] dark:text-[#ffc18c] mb-4">Convert SVG to G-Code</h1>

          <input
            type="text"
            placeholder="Enter SVG URL here"
            value={svgUrl}
            onChange={(e) => setSvgUrl(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-[#563232] dark:text-[#e7cfb4] mb-4"
          />

          <button
            onClick={handleConvert}
            disabled={loading || !svgUrl}
            className="px-6 py-2 bg-gradient-to-r from-[#FF6F3C] to-[#FF3C3C] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            {loading ? "Converting..." : "Convert to G-Code"}
          </button>

          {gcode && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-[#563232] dark:text-[#ffc18c] mb-2">Generated G-Code:</h2>
              <textarea
                value={gcode}
                readOnly
                rows={12}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-sm font-mono text-gray-800 dark:text-gray-200"
              />
              {downloadLink && (
                <a
                  href={downloadLink}
                  download
                  className="inline-block mt-4 px-4 py-2 bg-[#00C2A8] text-white rounded-lg hover:bg-[#009b86] transition-colors"
                >
                  Download G-Code
                </a>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
