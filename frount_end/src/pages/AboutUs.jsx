import React from "react";
import { motion } from "framer-motion";
import CircularGallery from '../components/CircularGallery';
import Navbar from "../components/PageNavbar";
import Footer from "../components/Footer";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

export default function AboutUs() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "With 15+ years in laser technology and a background in fine arts, Sarah combines technical expertise with artistic vision.",
      initial: "S"
    },
    {
      name: "David Chen",
      role: "CTO",
      bio: "David's AI research background helps drive our smart automation features and next-generation engraving algorithms.",
      initial: "D"
    },
    {
      name: "Maya Patel",
      role: "Head of Design",
      bio: "Maya brings 10 years of experience in industrial design, ensuring our products are both beautiful and functional.",
      initial: "M"
    }
  ];

  // Timeline items for company history
  const timelineItems = [
    {
      year: "2018",
      title: "The Beginning",
      description: "EngraveMaster was founded with a vision to revolutionize laser engraving using smart technology."
    },
    {
      year: "2020",
      title: "AI Integration",
      description: "Launched our first AI-powered material recognition system, automating calibration for different wood types."
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Expanded to international markets and partnered with leading wood suppliers across Asia and Europe."
    },
    {
      year: "2023",
      title: "Cloud Platform",
      description: "Introduced our cloud platform for design storage, sharing, and remote engraving control."
    },
    {
      year: "2024",
      title: "Sustainability Initiative",
      description: "Launched our eco-friendly program, optimizing energy use and supporting sustainable forestry."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-gradient-to-br from-[#f5e9da] to-[#e7cfb4] dark:from-[#1c1c1c] dark:to-[#2e2e2e] text-[#1c1c1c] dark:text-[#e7cfb4] font-sans">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <h1 className="inline-block text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#84240c] to-[#da6d42] dark:from-[#ffc18c] dark:to-[#FF6F3C]">
                Our Story
              </h1>
              <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-[#563232] dark:text-[#e7cfb4]">
                Welcome to <span className="text-[#84240c] dark:text-[#ffc18c] font-semibold">EngraveMaster</span> — where tradition meets technology.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl mb-20"
            >
              <div className="aspect-w-16 aspect-h-9 w-full">
                <div className="w-full h-full" style={{ height: '600px' }}>
                  <CircularGallery
                    bend={3}
                    textColor="#ffffff"
                    borderRadius={0.06}
                    font="bold 28px DM Sans"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-16 bg-white dark:bg-[#2a2a2a] bg-opacity-50 dark:bg-opacity-50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-10"
            >
              <motion.div 
                variants={itemVariants} 
                className="bg-gradient-to-br from-[#fff5ec] to-[#ffe0cb] dark:from-[#563232] dark:to-[#664444] rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-[#FF6F3C] rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-[#84240c] dark:text-[#ffc18c]">Our Mission</h2>
                  <p className="text-[#563232] dark:text-[#e7cfb4] leading-relaxed">
                    To revolutionize the engraving industry with smart technology, ensuring precision, speed, and elegance for creators worldwide. We blend the art of traditional craftsmanship with cutting-edge AI to deliver exceptional results.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants} 
                className="bg-gradient-to-br from-[#fff5ec] to-[#ffe0cb] dark:from-[#563232] dark:to-[#664444] rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-[#FF6F3C] rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-[#84240c] dark:text-[#ffc18c]">Our Vision</h2>
                  <p className="text-[#563232] dark:text-[#e7cfb4] leading-relaxed">
                    A world where creative expression meets sustainable technology—one engraved masterpiece at a time. We envision empowering artisans, businesses, and hobbyists with tools that bring their unique visions to life while respecting our planet.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants} 
                className="bg-gradient-to-br from-[#fff5ec] to-[#ffe0cb] dark:from-[#563232] dark:to-[#664444] rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-[#FF6F3C] rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-[#84240c] dark:text-[#ffc18c]">Our Values</h2>
                  <p className="text-[#563232] dark:text-[#e7cfb4] leading-relaxed">
                    Innovation, sustainability, craftsmanship, and user empowerment are the heart of everything we do. We believe in creating technology that enhances human creativity rather than replacing it, and in building tools that are accessible to all.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Content Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#84240c] dark:text-[#ffc18c]">
                  Blending Artistry with Technology
                </h2>
                <p className="text-lg leading-relaxed mb-6 text-[#563232] dark:text-[#e7cfb4]">
                  At EngraveMaster, we specialize in smart laser engraving solutions for wood, blending artistic precision with AI-powered automation. Our journey began with a simple question: How can we make laser engraving more intelligent, more beautiful, and more accessible?
                </p>
                <p className="text-lg leading-relaxed mb-6 text-[#563232] dark:text-[#e7cfb4]">
                  Today, our technology helps craftspeople, businesses, and hobbyists around the world create stunning wooden engravings with unprecedented ease and precision. Our material analysis algorithms detect wood types automatically, while our smart optimization ensures perfect results every time.
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <div className="flex items-center">
                    <div className="bg-[#FF6F3C] bg-opacity-10 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6F3C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[#563232] dark:text-[#e7cfb4]">AI-powered precision</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-[#FF6F3C] bg-opacity-10 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6F3C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[#563232] dark:text-[#e7cfb4]">Cloud-based workflow</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-[#FF6F3C] bg-opacity-10 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6F3C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[#563232] dark:text-[#e7cfb4]">Sustainable practices</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FF6F3C] to-[#FF3C3C] rounded-2xl blur-lg opacity-20 dark:opacity-30 transform -rotate-2"></div>
                <div className="relative bg-white dark:bg-[#2a2a2a] rounded-2xl overflow-hidden shadow-xl">
                  <div className="aspect-w-4 aspect-h-3">
                    <img 
                      src="https://images.unsplash.com/photo-1635342219731-4ae4bf4717ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80" 
                      alt="Laser engraving in action" 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-[#84240c] dark:text-[#ffc18c]">Our Commitment</h3>
                    <p className="text-[#563232] dark:text-[#e7cfb4]">
                      We're committed to developing technology that enhances human creativity rather than replacing it. 
                      Every feature we build is designed to make your workflow smoother, faster, and more enjoyable.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-16 bg-white dark:bg-[#2a2a2a] bg-opacity-50 dark:bg-opacity-50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#84240c] dark:text-[#ffc18c]">
                Our Journey
              </h2>
              <p className="text-lg max-w-3xl mx-auto text-[#563232] dark:text-[#e7cfb4]">
                From a small workshop to a global technology provider, our path has been defined by innovation and a commitment to excellence.
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#FF6F3C] to-[#FF3C3C] rounded-full"></div>
              
              <div className="relative">
                {timelineItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`mb-12 flex items-center ${index % 2 === 0 ? 'justify-start md:justify-end' : 'justify-start'} relative`}
                  >
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-10' : 'md:pl-10'}`}>
                      <div className="bg-white dark:bg-[#2e2e2e] p-6 rounded-2xl shadow-lg">
                        <span className="inline-block px-4 py-2 rounded-full bg-[#FF6F3C] text-white font-bold mb-3">
                          {item.year}
                        </span>
                        <h3 className="text-xl font-bold mb-2 text-[#84240c] dark:text-[#ffc18c]">
                          {item.title}
                        </h3>
                        <p className="text-[#563232] dark:text-[#e7cfb4]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-[#FF6F3C] border-4 border-white dark:border-[#2a2a2a] z-10"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#84240c] dark:text-[#ffc18c]">
                Meet Our Team
              </h2>
              <p className="text-lg max-w-3xl mx-auto text-[#563232] dark:text-[#e7cfb4]">
                Passionate experts dedicated to pushing the boundaries of what's possible in laser engraving technology.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-[#2e2e2e] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="bg-gradient-to-r from-[#FF6F3C] to-[#FF3C3C] h-24 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white dark:bg-[#1c1c1c] border-4 border-white dark:border-[#2e2e2e] flex items-center justify-center text-3xl font-bold text-[#FF6F3C] -mt-8">
                      {member.initial}
                    </div>
                  </div>
                  <div className="p-6 text-center -mt-10 pt-12">
                    <h3 className="text-xl font-bold mb-1 text-[#84240c] dark:text-[#ffc18c]">
                      {member.name}
                    </h3>
                    <p className="text-[#FF6F3C] mb-4">{member.role}</p>
                    <p className="text-[#563232] dark:text-[#e7cfb4]">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-gradient-to-r from-[#FF6F3C] to-[#FF3C3C] rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-12 md:p-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  Ready to Transform Your Engraving?
                </h2>
                <p className="text-lg text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
                  Join thousands of creators who have elevated their craft with EngraveMaster. 
                  Experience the perfect blend of artistic tradition and cutting-edge technology.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="/contact" 
                    className="px-8 py-3 bg-white text-[#FF6F3C] font-semibold rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
                  >
                    Contact Us
                  </a>
                  <a 
                    href="/services" 
                    className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                  >
                    Explore Services
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}