import React, { useState } from "react";

const Topbar = ({ toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header className="w-full h-16 flex items-center justify-between px-6 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg fixed top-0 left-0 md:left-64 z-40 transition-all duration-300">
      {/* Sidebar toggle button */}
      <div className="md:hidden">
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Dashboard Title with Icon */}
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </div>
        <h1 className="text-lg font-semibold bg-gradient-to-r from-gray-800 to-blue-700 dark:from-white dark:to-blue-300 bg-clip-text text-transparent hidden md:block">
          Admin Dashboard
        </h1>
      </div>

      {/* Search Bar */}
      <div className="hidden md:block max-w-md w-full mx-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input 
            type="search" 
            className="w-full py-2 pl-10 pr-4 text-sm bg-gray-100 dark:bg-gray-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-gray-200" 
            placeholder="Search..." 
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={toggleNotifications}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
          
          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700">
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="font-medium text-gray-800 dark:text-white">Notifications</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">3 New</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <a href="#" className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 border-l-4 border-blue-500">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3 w-0 flex-1">
                    <p className="text-sm text-gray-800 dark:text-white font-medium">New user registered</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">John Doe created an account</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 minutes ago</p>
                  </div>
                </a>
                <a href="#" className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 border-l-4 border-green-500">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3 w-0 flex-1">
                    <p className="text-sm text-gray-800 dark:text-white font-medium">Security alert</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Unusual login detected</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">1 hour ago</p>
                  </div>
                </a>
                <a href="#" className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 border-l-4 border-yellow-500">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center text-yellow-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3 w-0 flex-1">
                    <p className="text-sm text-gray-800 dark:text-white font-medium">System update</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Maintenance scheduled for tonight</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">5 hours ago</p>
                  </div>
                </a>
              </div>
              <a href="#" className="block text-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                View all notifications
              </a>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium text-gray-800 dark:text-white">Admin User</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Administrator</span>
          </div>
          <div className="relative">
            <button className="w-10 h-10 overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-medium">
              AU
            </button>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;