import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setSidebarOpen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f5f2] dark:bg-[#1C1C1C]">
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#1C1C1C] shadow-lg transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>

      {/* Main */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen && !isMobile ? "lg:ml-64" : "lg:ml-0"
        }`}
      >
        <Topbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Admin
              </span>
              <span>/</span>
              <span className="text-gray-700 dark:text-gray-300 font-medium">Dashboard</span>
            </div>

            {/* Title */}
            <div className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
              <h1 className="text-3xl font-bold text-[#563232] dark:text-white animate-fade-in">
                EngraveMaster Admin Dashboard
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                Monitor usage, project stats, and engraving activity.
              </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Users */}
              <StatCard
                color="blue"
                label="Registered Users"
                value="12,984"
                growth="+9.2%"
                icon="M12 4.354a4 4 0 110 5.292..."
              />

              {/* Revenue */}
              <StatCard
                color="orange"
                label="Total Revenue"
                value="$27,650"
                growth="+6.5%"
                icon="M12 8c-1.657 0-3 .895..."
              />

              {/* Projects */}
              <StatCard
                color="green"
                label="Engraving Projects"
                value="3,201"
                growth="+11.1%"
                icon="M16 11V7a4 4 0 00-8 0v4..."
              />

              {/* Errors */}
              <StatCard
                color="red"
                label="Machine Alerts"
                value="37"
                growth="-3.4%"
                isNegative
                icon="M9 19v-6a2 2 0 00-2-2H5..."
              />
            </div>

            {/* Children Content */}
            <div className="bg-white dark:bg-[#1C1C1C] border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6">
              {children}
            </div>
          </div>
        </main>

        <footer className="bg-white dark:bg-[#1C1C1C] border-t border-gray-200 dark:border-gray-700 py-4 px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2025 EngraveMaster. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Terms</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">Support</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Reusable StatCard Component
function StatCard({ color, label, value, growth, icon, isNegative = false }) {
  const bgColor = {
    blue: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
    orange: "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400",
    green: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
    red: "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400"
  }[color];

  return (
    <div className="bg-white dark:bg-[#1C1C1C] rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 p-6 overflow-hidden relative">
      <div className={`absolute top-0 right-0 w-24 h-24 opacity-10 rounded-full -mr-8 -mt-8 bg-${color}-500`}></div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
          <h3 className="text-2xl font-bold text-[#563232] dark:text-white mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-full ${bgColor}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
      </div>
      <p className={`mt-3 text-sm font-medium flex items-center ${isNegative ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isNegative ? "M19 14l-7 7m0 0l-7-7m7 7V3" : "M5 10l7-7m0 0l7 7m-7-7v18"} />
        </svg>
        {growth} {isNegative && "decrease"}
      </p>
    </div>
  );
}
