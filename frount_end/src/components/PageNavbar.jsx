import React, { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Theme preference
    if (
      localStorage.theme === "dark" ||
      (!localStorage.theme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }

    // Login Status
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);

      // If you want to display user name, get from localStorage too
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        setUserName(userData.firstName || "Profile");
      }
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }

    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDark(true);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    window.location.href = "/login";
  };

  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (showProfileMenu && !e.target.closest('.profile-menu')) {
        setShowProfileMenu(false);
      }
    };
    
    document.addEventListener('mousedown', closeDropdown);
    return () => document.removeEventListener('mousedown', closeDropdown);
  }, [showProfileMenu]);

  return (
    <nav 
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white bg-opacity-95 dark:bg-gray-900 dark:bg-opacity-95 backdrop-blur-sm shadow-lg py-2" 
          : "bg-white dark:bg-gray-900 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center relative">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
              <img 
                src={logo} 
                alt="EngraveMaster Logo" 
                className="relative h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110" 
              />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-300 group-hover:tracking-wider">
              EngraveMaster
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/" label="Home" />
            <NavLink href="/about" label="About" />
            <NavLink href="/services" label="Services" />
            <NavLink href="/contact" label="Contact" />

            {/* Profile or Login/Signup */}
            <div className="relative ml-2 profile-menu">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-100 dark:bg-gray-800 hover:bg-orange-200 dark:hover:bg-gray-700 text-orange-500 dark:text-orange-400 transition-colors"
                aria-label="Profile"
              >
                <FaUserCircle size={20} />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 ease-out">
                  {isLoggedIn ? (
                    <>
                      <div className="block px-4 py-3 text-gray-800 dark:text-gray-200 font-semibold border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                        <div className="flex items-center">
                          <div className="bg-orange-100 dark:bg-gray-700 p-2 rounded-full mr-3">
                            <FaUserCircle className="text-orange-500" size={18} />
                          </div>
                          <div>
                            <div>{userName}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 font-normal">Member</div>
                          </div>
                        </div>
                      </div>
                      
                      <a
                        href="/profile"
                        className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-700"
                      >
                        <svg className="w-4 h-4 mr-3 text-gray-600 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        My Profile
                      </a>
                      
                      <a
                        href="/settings"
                        className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-700"
                      >
                        <svg className="w-4 h-4 mr-3 text-gray-600 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="3"></circle>
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>
                        Account Settings
                      </a>
                      
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-30"
                      >
                        <svg className="w-4 h-4 mr-3 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href="/login"
                        className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-700"
                      >
                        <svg className="w-4 h-4 mr-3 text-gray-600 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                          <polyline points="10 17 15 12 10 7"></polyline>
                          <line x1="15" y1="12" x2="3" y2="12"></line>
                        </svg>
                        Login
                      </a>
                      <a
                        href="/signup"
                        className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-700"
                      >
                        <svg className="w-4 h-4 mr-3 text-gray-600 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="8.5" cy="7" r="4"></circle>
                          <line x1="20" y1="8" x2="20" y2="14"></line>
                          <line x1="23" y1="11" x2="17" y2="11"></line>
                        </svg>
                        Sign Up
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-2 flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <FiSun className="text-yellow-400" size={18} />
              ) : (
                <FiMoon className="text-gray-700" size={18} />
              )}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center space-x-1">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <FiSun className="text-yellow-400" size={18} />
              ) : (
                <FiMoon className="text-gray-700" size={18} />
              )}
            </button>

            {/* Profile Button Mobile */}
            <div className="relative profile-menu">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-100 dark:bg-gray-800 hover:bg-orange-200 dark:hover:bg-gray-700 text-orange-500 dark:text-orange-400 transition-colors"
                aria-label="Profile"
              >
                <FaUserCircle size={18} />
              </button>
              
              {/* Mobile Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700">
                  {isLoggedIn ? (
                    <>
                      <div className="block px-4 py-3 text-gray-800 dark:text-gray-200 font-semibold border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                        <div className="flex items-center">
                          <div className="bg-orange-100 dark:bg-gray-700 p-2 rounded-full mr-3">
                            <FaUserCircle className="text-orange-500" size={18} />
                          </div>
                          <div>
                            <div>{userName}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 font-normal">Member</div>
                          </div>
                        </div>
                      </div>
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-700"
                      >
                        My Profile
                      </a>
                      <a
                        href="/settings"
                        className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-700"
                      >
                        Account Settings
                      </a>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-30"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href="/login"
                        className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-700"
                      >
                        Login
                      </a>
                      <a
                        href="/signup"
                        className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-700"
                      >
                        Sign Up
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Hamburger Menu */}
            <button
              onClick={toggleMenu}
              className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle Menu"
            >
              <svg 
                className={`w-5 h-5 text-gray-600 dark:text-gray-300 transition-transform duration-300 ease-in-out ${isOpen ? 'transform rotate-90' : ''}`} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {isOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div 
        className={`md:hidden bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 shadow-lg' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-2 space-y-1">
          <MobileNavLink href="/" label="Home" />
          <MobileNavLink href="/about" label="About" />
          <MobileNavLink href="/services" label="Services" />
          <MobileNavLink href="/contact" label="Contact" />
        </div>
      </div>
    </nav>
  );
}

// Desktop Navigation Link component
const NavLink = ({ href, label }) => {
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    // Check if this link is active based on current URL
    setIsActive(window.location.pathname === href);
  }, [href]);
  
  return (
    <a 
      href={href} 
      className={`relative px-3 py-2 rounded-md mx-1 font-medium transition-all duration-300 group ${
        isActive 
          ? 'text-orange-500 bg-orange-50 dark:bg-gray-800' 
          : 'text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400'
      }`}
    >
      {label}
      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform origin-bottom scale-x-0 transition-transform duration-300 ${
        isActive ? 'scale-x-100' : 'group-hover:scale-x-100'
      }`}></span>
    </a>
  );
};

// Mobile Navigation Link component
const MobileNavLink = ({ href, label }) => {
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    // Check if this link is active based on current URL
    setIsActive(window.location.pathname === href);
  }, [href]);
  
  return (
    <a 
      href={href} 
      className={`block py-3 px-4 rounded-md transition-colors duration-200 ${
        isActive 
          ? 'text-orange-500 bg-orange-50 dark:bg-gray-800 font-medium' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500 dark:hover:text-orange-400'
      }`}
    >
      <div className="flex items-center">
        {isActive && (
          <span className="w-1 h-5 bg-orange-500 rounded-full mr-3"></span>
        )}
        {label}
      </div>
    </a>
  );
};