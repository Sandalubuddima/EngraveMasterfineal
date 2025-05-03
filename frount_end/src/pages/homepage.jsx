import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import GlassIcons from "../components/GlassIcons";
import Navbar from "../components/PageNavbar";
import Footer from "../components/Footer";
import {
  FiPlusCircle,
  FiFolder,
  FiFileText,
  FiMessageCircle,
  FiEdit,
  FiAlertCircle,
  FiArrowRight,
  FiCheckCircle,
  FiLayers,
} from "react-icons/fi";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const parallaxRef = useRef(null);
  
  // For parallax effect
  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      if (!parallaxRef.current) return;
      
      const elements = parallaxRef.current.querySelectorAll('.parallax-element');
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (e.clientX - centerX) / 50;
      const deltaY = (e.clientY - centerY) / 50;
      
      elements.forEach((element) => {
        const depth = parseFloat(element.getAttribute('data-depth')) || 1;
        const moveX = deltaX * depth;
        const moveY = deltaY * depth;
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const glassIcons = [
    { 
      icon: <FiPlusCircle />, 
      color: "#FF6F3C", 
      label: "Create New", 
      href: "/create",
      description: "Start a new engraving project"
    },
    { 
      icon: <FiFolder />, 
      color: "#845EC2", 
      label: "Your Projects",
      href: "/yourprojects",
      description: "Access your saved designs"
    },
    { 
      icon: <FiFileText />, 
      color: "#00C2A8", 
      label: "Documentation", 
      href: "/docs",
      description: "Learn how to use EngraveMaster"
    },
    { 
      icon: <FiMessageCircle />, 
      color: "#F9F871", 
      label: "AI Assistant", 
      href: "/askai",
      description: "Get smart recommendations"
    },
    { 
      icon: <FiEdit />, 
      color: "#FF9671", 
      label: "Note & Sketches",
      href: "/notes",
      description: "Capture your design ideas"
    },
    { 
      icon: <FiAlertCircle />, 
      color: "#D65DB1", 
      label: "Support", 
      href: "/support",
      description: "Get help with your projects"
    },
  ];

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  // Item animation variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-24 pb-20 overflow-hidden bg-gradient-to-br from-[#f5e9da] to-[#e7cfb4] dark:from-[#1C1C1C] dark:to-[#2e2e2e] transition-colors duration-300">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden" ref={parallaxRef}>
          {/* Large circle decoration */}
          <div 
            className="absolute -right-40 -top-40 w-96 h-96 bg-[#FF6F3C] opacity-5 dark:opacity-10 rounded-full blur-2xl parallax-element" 
            data-depth="0.3"
          ></div>
          
          {/* Wood grain texture overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.07] mix-blend-multiply"></div>
          
          {/* Small decorative elements */}
          <div 
            className="absolute left-1/4 top-1/4 w-32 h-32 bg-[#FF6F3C] opacity-10 dark:opacity-15 rounded-full blur-xl parallax-element" 
            data-depth="1.2"
          ></div>
          <div 
            className="absolute right-1/3 bottom-1/4 w-48 h-48 bg-[#FF9671] opacity-10 dark:opacity-15 rounded-full blur-xl parallax-element" 
            data-depth="0.8"
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-24"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#84240c] to-[#FF6F3C] dark:from-[#ffc18c] dark:to-[#FF6F3C]">
                Precision Meets Intelligence
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-[#563232] dark:text-[#e7cfb4]"
            >
              Welcome to <span className="font-semibold">EngraveMaster</span> - The smart laser engraving platform for wooden masterpieces.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a 
                href="/create" 
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#FF6F3C] to-[#FF3C3C] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Engraving
                <FiArrowRight className="ml-2" />
              </a>
              <a 
                href="/demo" 
                className="inline-flex items-center px-8 py-3 bg-white dark:bg-gray-800 text-[#563232] dark:text-white border border-[#FF6F3C] font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Watch Demo
              </a>
            </motion.div>
          </motion.section>

          {/* Navigation Icons */}
          <motion.section 
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="mb-20"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#84240c] dark:text-[#ffc18c]"
            >
              Explore EngraveMaster
            </motion.h2>
            
            <motion.div variants={itemVariants}>
              <GlassIcons items={glassIcons} className="z-10" />
            </motion.div>
          </motion.section>

          {/* Features Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-12"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#84240c] dark:text-[#ffc18c]">
                Intelligent Engraving Features
              </h2>
              <p className="text-lg max-w-3xl mx-auto text-[#563232] dark:text-[#e7cfb4]">
                Our smart technology elevates the craft of laser engraving to new heights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FiLayers size={32} />,
                  title: "Smart Material Detection",
                  description: "Automatically identifies wood type and adjusts laser settings for optimal results"
                },
                {
                  icon: <FiEdit size={32} />,
                  title: "Live Preview",
                  description: "See your design on the actual material before engraving begins"
                },
                {
                  icon: <FiCheckCircle size={32} />,
                  title: "Error Prevention",
                  description: "AI monitors for potential issues and suggests improvements in real-time"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white dark:bg-[#2e2e2e] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-[#FF6F3C] bg-opacity-10 rounded-full flex items-center justify-center text-[#FF6F3C]">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#84240c] dark:text-[#ffc18c]">{feature.title}</h3>
                  <p className="text-[#563232] dark:text-[#e7cfb4]">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Display Gallery */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-12"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#84240c] dark:text-[#ffc18c]">
                Stunning Results
              </h2>
              <p className="text-lg max-w-3xl mx-auto text-[#563232] dark:text-[#e7cfb4]">
                See what craftspeople have created with EngraveMaster
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative overflow-hidden rounded-xl shadow-lg aspect-square group"
                >
                  <img 
                    src={`https://source.unsplash.com/random/600x600?wood,engraving,art&sig=${index}`} 
                    alt={`Gallery item ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="font-bold text-lg">Wooden Masterpiece {index + 1}</h3>
                      <p className="text-sm text-gray-200">Created with EngraveMaster</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <a 
                href="/gallery" 
                className="inline-flex items-center px-6 py-3 bg-[#563232] dark:bg-[#e7cfb4] text-white dark:text-[#563232] font-medium rounded-lg hover:bg-opacity-90 dark:hover:bg-opacity-90 transition-all duration-300"
              >
                View Full Gallery
                <FiArrowRight className="ml-2" />
              </a>
            </div>
          </motion.section>

          {/* Testimonial Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-12"
          >
            <div className="bg-white dark:bg-[#2e2e2e] rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6F3C] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="text-center mb-12 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#84240c] dark:text-[#ffc18c]">
                  What Our Users Say
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 relative z-10">
                {[
                  {
                    quote: "EngraveMaster transformed my woodworking business. The intelligent material detection has saved me countless hours of calibration.",
                    author: "Michael Chen",
                    role: "Professional Woodworker"
                  },
                  {
                    quote: "As a beginner, I was intimidated by laser engraving. EngraveMaster's smart features made it approachable and the results are stunning!",
                    author: "Emma Thompson",
                    role: "Hobby Enthusiast"
                  }
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className="bg-[#f9f5f2] dark:bg-[#363636] p-6 rounded-xl relative"
                  >
                    <div className="absolute -top-4 left-6 text-5xl text-[#FF6F3C] opacity-30">❝</div>
                    <p className="text-[#563232] dark:text-[#e7cfb4] mb-6 relative z-10">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#FF6F3C] flex items-center justify-center text-white font-bold">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <p className="font-bold text-[#84240c] dark:text-[#ffc18c]">{testimonial.author}</p>
                        <p className="text-sm text-[#563232] dark:text-[#e7cfb4] opacity-75">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-12 text-center"
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#84240c] dark:text-[#ffc18c]">
                Ready to Create?
              </h2>
              <p className="text-lg mb-8 text-[#563232] dark:text-[#e7cfb4]">
                Join thousands of creators who have elevated their craft with EngraveMaster.
              </p>
              <a 
                href="/signup" 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF6F3C] to-[#FF3C3C] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get Started Now
                <FiArrowRight className="ml-2" />
              </a>
            </div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </>
  );
}