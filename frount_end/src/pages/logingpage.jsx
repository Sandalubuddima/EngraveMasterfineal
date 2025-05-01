import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebookF } from 'react-icons/fa';
import { GoogleLogin } from '@react-oauth/google';
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';
import EMImage from '../assets/EM.png';
import Navbar from '../components/PageNavbar';
import Footer from '../components/Footer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // For parallax effect on background decorations
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError('');

    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        
        // If remember me is checked, store user email in localStorage
        if (rememberMe) {
          localStorage.setItem("userEmail", email);
        } else {
          localStorage.removeItem("userEmail");
        }
        
        // Success animation before redirect
        setTimeout(() => {
          window.location.href = "/";
        }, 800);
      } else {
        setFormError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setFormError("An error occurred during login. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    setIsLoading(true);
    setFormError('');

    try {
      const response = await fetch("http://localhost:5001/api/users/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        
        // Success animation before redirect
        setTimeout(() => {
          window.location.href = "/";
        }, 800);
      } else {
        setFormError(data.message || "Google login failed. Please try again.");
      }
    } catch (error) {
      console.error("Google login error:", error);
      setFormError("An error occurred during Google login");
    } finally {
      setIsLoading(false);
    }
  };

  // Load saved email if available
  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 pb-16 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#f5e9da] to-[#e7cfb4] dark:from-[#1C1C1C] dark:to-[#2e2e2e]">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#FF6F3C] opacity-10 dark:opacity-20 blur-3xl"
            animate={{
              x: mousePosition.x * 20,
              y: mousePosition.y * 20,
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          />
          <motion.div 
            className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-[#84240c] opacity-10 dark:opacity-20 blur-3xl"
            animate={{
              x: mousePosition.x * -30,
              y: mousePosition.y * -30,
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.07] mix-blend-multiply"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex w-full max-w-5xl mx-4 bg-white dark:bg-[#2a2a2a] shadow-2xl rounded-3xl overflow-hidden relative z-10"
        >
          {/* Left Side - Image with overlay text */}
          <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#84240c]/80 to-[#FF6F3C]/70 z-10"></div>
            <img 
              src={EMImage} 
              alt="EngraveMaster" 
              className="h-full w-full object-cover scale-110 hover:scale-105 transition-transform duration-7000"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 text-white">
              <h2 className="text-3xl font-bold mb-4">Welcome to EngraveMaster</h2>
              <p className="text-lg mb-6">Where precision meets intelligence in laser engraving.</p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>AI-powered material detection</p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>Cloud-based design storage</p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>Real-time engraving preview</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-1/2 p-8 md:p-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome back</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Sign in to continue your creative journey</p>
              </div>
              <div className="lg:hidden w-12 h-12 rounded-full bg-[#FF6F3C] p-2">
                <img src={EMImage} alt="Logo" className="w-full h-full object-contain" />
              </div>
            </div>

            {formError && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg mb-6 flex items-start"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{formError}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiMail />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6F3C] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6F3C] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="w-4 h-4 rounded text-[#FF6F3C] focus:ring-[#FF6F3C] border-gray-300 dark:border-gray-600"
                  />
                  <span>Remember me</span>
                </label>
                <a href="/forgot-password" className="text-sm text-[#FF6F3C] hover:underline">
                  Forgot password?
                </a>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full relative bg-gradient-to-r from-[#FF6F3C] to-[#FF3C3C] text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center ${isLoading ? 'opacity-90' : 'hover:translate-y-[-2px]'}`}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <span className="mr-2">Sign In</span>
                    <FiArrowRight />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 relative flex items-center justify-center">
              <hr className="border-gray-300 dark:border-gray-700 w-full" />
              <span className="absolute bg-white dark:bg-[#2a2a2a] px-3 text-xs text-gray-500 dark:text-gray-400">
                or continue with
              </span>
            </div>

            <div className="mt-6 flex flex-col items-center gap-4">
              <div className="w-full">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    setFormError('Google login failed. Please try another method.');
                  }}
                  theme="filled_blue"
                  shape="pill"
                  width="100%"
                />
              </div>

              <div className="flex gap-4">
                <button className="p-3 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-full shadow-md hover:shadow-lg transition-all">
                  <FaApple className="text-xl dark:text-white" />
                </button>
                <button className="p-3 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-full shadow-md hover:shadow-lg transition-all">
                  <FaFacebookF className="text-xl text-[#1877f2]" />
                </button>
              </div>
            </div>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8">
              Don't have an account?{' '}
              <a href="/signup" className="text-[#FF6F3C] hover:underline font-medium">
                Create one
              </a>
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}