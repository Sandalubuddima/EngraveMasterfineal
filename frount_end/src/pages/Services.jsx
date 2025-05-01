import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/PageNavbar";
import Footer from "../components/Footer";

// Service icons - you would replace these with actual SVG icons or import them
const ServiceIcon = ({ name }) => {
  // This function returns different SVG icons based on the service name
  switch (name) {
    case "Smart Laser Optimization":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M3 12h6M15 12h6M12 3v6M12 15v6"></path>
          <path d="M18.364 5.636l-1.5 1.5M7.05 16.95l-1.5 1.5M18.364 18.364l-1.5-1.5M7.05 7.05l-1.5-1.5"></path>
        </svg>
      );
    case "Material Analysis":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 14l5-5-5-5"></path>
          <path d="M19 9H4"></path>
          <path d="M4 14h11"></path>
          <path d="M9 19l-5-5 5-5"></path>
        </svg>
      );
    case "Live Simulation":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
          <path d="M9.5 9.5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0z"></path>
          <path d="M4.5 13.5a5 5 0 1 0 15 0 5 5 0 1 0-15 0z"></path>
        </svg>
      );
    case "Error Detection":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      );
    case "Cloud Sync Projects":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
          <path d="M13 15l3-3-3-3"></path>
          <line x1="16" y1="12" x2="6" y2="12"></line>
        </svg>
      );
    case "User-Friendly Interface":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
          <path d="M2 8h20"></path>
          <path d="M6 12h4"></path>
          <path d="M14 12h4"></path>
          <path d="M6 16h12"></path>
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 8v4M12 16h.01"></path>
        </svg>
      );
  }
};

const services = [
  {
    title: "Smart Laser Optimization",
    desc: "AI-powered adjustment of laser speed, intensity, and interval based on wood type. Our technology analyzes material properties in real-time to deliver perfect results every time.",
    features: ["Automatic calibration", "Material-specific settings", "Energy optimization"],
    icon: "Smart Laser Optimization"
  },
  {
    title: "Material Analysis",
    desc: "Get automatic wood type recognition and tailored engraving profiles. Our system identifies different materials and suggests the optimal settings for your specific project.",
    features: ["Wood type identification", "Custom material profiles", "Density mapping"],
    icon: "Material Analysis"
  },
  {
    title: "Live Simulation",
    desc: "Preview your design in real-time before engraving begins. See exactly how your finished product will look and make adjustments before committing to the physical engraving.",
    features: ["Real-time preview", "Interactive adjustments", "Depth visualization"],
    icon: "Live Simulation"
  },
  {
    title: "Error Detection",
    desc: "Warn users about risky settings that could damage material or the machine. Our smart monitoring system prevents costly mistakes and ensures safe operation.",
    features: ["Pre-engraving checks", "Real-time monitoring", "Safety notifications"],
    icon: "Error Detection"
  },
  {
    title: "Cloud Sync Projects",
    desc: "Access your saved templates from anywhere with our secure cloud system. Seamlessly work across devices and share your designs with team members or clients.",
    features: ["Automatic backup", "Version history", "Team collaboration"],
    icon: "Cloud Sync Projects"
  },
  {
    title: "User-Friendly Interface",
    desc: "Built for all skill levels, from beginners to pros. Our intuitive design makes complex laser engraving accessible to everyone while offering advanced features for experts.",
    features: ["Guided setup", "Template library", "Keyboard shortcuts"],
    icon: "User-Friendly Interface"
  },
];

// Animations
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
    transition: { duration: 0.5 }
  }
};

export default function Services() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#f9f5f2] to-[#f0e6de] dark:from-[#1C1C1C] dark:to-[#252525] text-[#1C1C1C] dark:text-white py-24 px-4 transition-colors duration-300">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#84240c] to-[#da6d42] dark:from-[#ffc18c] dark:to-[#FF6F3C]">
                Our Services
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <p className="text-lg md:text-xl text-[#563232] dark:text-[#e7cfb4] mb-8 max-w-3xl mx-auto leading-relaxed">
                At <span className="text-[#da6d42] font-semibold dark:text-[#ffc18c]">EngraveMaster</span>, 
                we blend tradition with technology, offering powerful tools that make laser engraving 
                smarter, safer, and easier. Discover how our innovative solutions can transform your creative process.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a href="#contact" className="px-8 py-3 bg-gradient-to-r from-[#FF6F3C] to-[#FF3C3C] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Get Started
              </a>
              <a href="#learn-more" className="px-8 py-3 bg-white dark:bg-gray-800 text-[#563232] dark:text-white border border-[#da6d42] dark:border-[#FF6F3C] font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Learn More
              </a>
            </motion.div>
          </div>
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                className="bg-white dark:bg-[#2e2e2e] rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-[#fff5ec] to-[#ffefe0] dark:from-[#563232] dark:to-[#664444] p-6 flex items-center justify-center">
                  <div className="text-[#FF6F3C] dark:text-[#FF9F6C]">
                    <ServiceIcon name={service.icon} />
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#84240c] dark:text-[#ffc18c] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[#563232] dark:text-[#e7cfb4] mb-6">
                    {service.desc}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-[#563232] dark:text-[#e7cfb4]">
                        <svg className="h-5 w-5 mr-2 text-[#FF6F3C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Card Footer */}
                <div className="px-6 py-4 bg-[#fff5ec] dark:bg-[#3a3a3a] flex justify-end">
                  <button className="text-[#FF6F3C] font-medium flex items-center hover:text-[#E55A2B] transition-colors duration-200">
                    Learn more
                    <svg className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Call to Action Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mt-24 p-8 md:p-12 bg-white dark:bg-[#2e2e2e] rounded-2xl shadow-xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#84240c] dark:text-[#ffc18c] mb-4">
              Ready to Transform Your Engraving Process?
            </h2>
            <p className="text-[#563232] dark:text-[#e7cfb4] text-lg">
              Join thousands of satisfied customers who have elevated their craft with EngraveMaster.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#fff5ec] dark:bg-[#563232] h-16 w-16 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-[#FF6F3C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#84240c] dark:text-[#ffc18c] mb-2">Cost Effective</h3>
              <p className="text-[#563232] dark:text-[#e7cfb4]">
                Save up to 40% on materials with precision optimization
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#fff5ec] dark:bg-[#563232] h-16 w-16 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-[#FF6F3C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#84240c] dark:text-[#ffc18c] mb-2">Faster Results</h3>
              <p className="text-[#563232] dark:text-[#e7cfb4]">
                Reduce production time by up to 60% with smart settings
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#fff5ec] dark:bg-[#563232] h-16 w-16 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-[#FF6F3C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#84240c] dark:text-[#ffc18c] mb-2">Quality Assured</h3>
              <p className="text-[#563232] dark:text-[#e7cfb4]">
                Guaranteed precision with advanced error prevention
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <a 
              href="/contact" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF6F3C] to-[#FF3C3C] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Contact Us Today
            </a>
          </div>
        </motion.div>
        
        {/* Testimonials Section */}
        <div className="max-w-6xl mx-auto mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#84240c] dark:text-[#ffc18c] mb-4">
              What Our Clients Say
            </h2>
            <p className="text-[#563232] dark:text-[#e7cfb4] text-lg max-w-3xl mx-auto">
              Trusted by professionals and hobbyists alike for precision laser engraving.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Artisan Woodworker",
                quote: "EngraveMaster transformed my small business. The material analysis feature alone has saved me countless hours of testing and calibration."
              },
              {
                name: "Michael Chen",
                role: "Design Studio Owner",
                quote: "The cloud sync makes collaboration with clients seamless. I can show them live previews and make adjustments in real-time. Game-changer!"
              },
              {
                name: "Priya Patel",
                role: "Jewelry Designer",
                quote: "As someone new to laser engraving, the user-friendly interface and error detection have been invaluable in helping me create professional pieces."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-[#2e2e2e] p-6 rounded-2xl shadow-lg"
              >
                <div className="mb-4 text-[#FF6F3C]">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-[#563232] dark:text-[#e7cfb4] mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-[#fff5ec] dark:bg-[#563232] flex items-center justify-center mr-4">
                    <span className="text-[#FF6F3C] font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#84240c] dark:text-[#ffc18c]">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-[#563232] dark:text-[#e7cfb4]">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}