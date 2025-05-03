import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiZoomIn, FiZoomOut, FiMaximize, FiMinimize } from "react-icons/fi";

const ImgPreview = ({ src, alt }) => {
  const [loading, setLoading] = useState(true);
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(1);
  const [isFullSize, setIsFullSize] = useState(false);
  
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  // Handle image load to get natural dimensions
  const handleImageLoad = () => {
    setLoading(false);
    
    if (imgRef.current) {
      const { naturalWidth, naturalHeight } = imgRef.current;
      setImgDimensions({ width: naturalWidth, height: naturalHeight });
    }
  };

  // Reset zoom when src changes
  useEffect(() => {
    setZoom(1);
    setIsFullSize(false);
    setLoading(true);
  }, [src]);

  // Handle zoom in/out
  const handleZoomIn = (e) => {
    e.stopPropagation();
    setZoom(prevZoom => Math.min(prevZoom + 0.25, 3));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setZoom(prevZoom => Math.max(prevZoom - 0.25, 0.5));
  };

  // Toggle between fit-to-screen and actual size
  const toggleFullSize = (e) => {
    e.stopPropagation();
    setIsFullSize(!isFullSize);
    setZoom(isFullSize ? 1 : 'auto');
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full max-h-[calc(90vh-130px)] p-4 flex items-center justify-center overflow-auto"
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6F3C]"></div>
        </div>
      )}

      <motion.img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        animate={{ 
          scale: zoom === 'auto' ? 1 : zoom,
          opacity: loading ? 0 : 1 
        }}
        transition={{ duration: 0.3 }}
        style={{ 
          maxWidth: isFullSize ? 'none' : '100%',
          maxHeight: isFullSize ? 'none' : '100%',
          objectFit: 'contain'
        }}
        className="rounded-lg shadow-lg"
        draggable={false}
      />

      {!loading && (
        <div className="absolute bottom-4 right-4 flex bg-black bg-opacity-50 rounded-lg overflow-hidden">
          <button 
            onClick={handleZoomOut}
            className="p-2 text-white hover:bg-black hover:bg-opacity-40 transition-colors"
            disabled={zoom <= 0.5}
            title="Zoom out"
          >
            <FiZoomOut size={18} />
          </button>
          
          <div className="px-3 py-2 text-white text-sm border-l border-r border-gray-600">
            {zoom === 'auto' ? '100%' : `${Math.round(zoom * 100)}%`}
          </div>
          
          <button 
            onClick={handleZoomIn}
            className="p-2 text-white hover:bg-black hover:bg-opacity-40 transition-colors"
            disabled={zoom >= 3}
            title="Zoom in"
          >
            <FiZoomIn size={18} />
          </button>
          
          <button 
            onClick={toggleFullSize}
            className="p-2 text-white hover:bg-black hover:bg-opacity-40 transition-colors border-l border-gray-600"
            title={isFullSize ? "Fit to screen" : "Actual size"}
          >
            {isFullSize ? <FiMinimize size={18} /> : <FiMaximize size={18} />}
          </button>
        </div>
      )}

      {!loading && (
        <div className="absolute top-4 left-4 px-3 py-1 bg-black bg-opacity-50 text-white rounded-lg text-xs">
          {imgDimensions.width} × {imgDimensions.height}
        </div>
      )}
    </div>
  );
};

export default ImgPreview;