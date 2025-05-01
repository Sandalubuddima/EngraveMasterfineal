import React, { useState } from "react";
import Navbar from "../components/PageNavbar";
import Footer from "../components/Footer";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    // For demo purposes, we'll simulate a successful submission
    setFormStatus({
      submitted: true,
      success: true,
      message: "Thanks for reaching out! We'll get back to you soon."
    });
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: false,
        message: ""
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 3000);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-[#f5e9da] to-[#e7cfb4] dark:from-[#252525] dark:to-[#1C1C1C] text-[#563232] dark:text-white">
        <div className="container max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6F3C] to-[#FF3C3C]">
              Get In Touch
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-[#563232] dark:text-gray-300">
              Have questions about our laser engraving services? We're here to help! Reach out to our team and we'll respond as soon as possible.
            </p>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Information */}
            <div className="lg:w-1/3">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#FF6F3C] to-[#FF3C3C] p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
                  <p className="opacity-90">Reach out to us using any of these methods</p>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="flex items-start">
                    <div className="bg-orange-100 dark:bg-gray-700 p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6F3C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Email</h3>
                      <a href="mailto:support@engravemaster.com" className="text-[#FF6F3C] hover:underline">
                        support@engravemaster.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-orange-100 dark:bg-gray-700 p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6F3C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Phone</h3>
                      <a href="tel:+94771234567" className="text-[#FF6F3C] hover:underline">
                        +94 77 123 4567
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-orange-100 dark:bg-gray-700 p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6F3C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Address</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        No. 25, Main Street, <br />
                        Colombo, Sri Lanka
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-orange-100 dark:bg-gray-700 p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6F3C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Business Hours</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Monday - Friday: 9:00 AM - 5:00 PM <br />
                        Saturday: 9:00 AM - 1:00 PM <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 pb-6">
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Connect With Us</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="bg-orange-100 dark:bg-gray-700 p-3 rounded-full text-[#FF6F3C] hover:bg-orange-200 dark:hover:bg-gray-600 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                        </svg>
                      </a>
                      <a href="#" className="bg-orange-100 dark:bg-gray-700 p-3 rounded-full text-[#FF6F3C] hover:bg-orange-200 dark:hover:bg-gray-600 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                        </svg>
                      </a>
                      <a href="#" className="bg-orange-100 dark:bg-gray-700 p-3 rounded-full text-[#FF6F3C] hover:bg-orange-200 dark:hover:bg-gray-600 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.159 1.2A4.92 4.92 0 0016.093 2a4.93 4.93 0 00-4.931 4.93c0 .39.044.765.126 1.124A13.986 13.986 0 013.007 3.2a4.89 4.89 0 00-.67 2.48c0 1.71.87 3.214 2.19 4.1a4.89 4.89 0 01-2.23-.616v.06a4.93 4.93 0 003.95 4.829 4.93 4.93 0 01-2.224.084 4.94 4.94 0 004.604 3.417A9.89 9.89 0 010 20.289a13.94 13.94 0 007.548 2.209c9.054 0 14.004-7.5 14.004-14.001 0-.21-.005-.42-.014-.639A9.936 9.936 0 0024 4.59l-.047-.02z"/>
                        </svg>
                      </a>
                      <a href="#" className="bg-orange-100 dark:bg-gray-700 p-3 rounded-full text-[#FF6F3C] hover:bg-orange-200 dark:hover:bg-gray-600 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:w-2/3">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-10">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Send us a Message</h2>
                
                {formStatus.submitted ? (
                  <div className={`p-4 mb-6 rounded-lg ${formStatus.success ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:bg-opacity-50 dark:text-green-200' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:bg-opacity-50 dark:text-red-200'}`}>
                    {formStatus.message}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Your Name</label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FF6F3C] focus:border-transparent transition duration-200 outline-none" 
                          required
                        />
                      </div>
                      <div>
                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FF6F3C] focus:border-transparent transition duration-200 outline-none" 
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Subject</label>
                      <input 
                        type="text" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is your message about?"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FF6F3C] focus:border-transparent transition duration-200 outline-none" 
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Message</label>
                      <textarea 
                        rows="5" 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your message here..."
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#FF6F3C] focus:border-transparent transition duration-200 outline-none resize-none" 
                        required
                      ></textarea>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        id="privacy-policy" 
                        type="checkbox" 
                        className="h-4 w-4 text-[#FF6F3C] focus:ring-[#FF6F3C] border-gray-300 rounded" 
                        required
                      />
                      <label htmlFor="privacy-policy" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        I agree to the <a href="#" className="text-[#FF6F3C] hover:underline">Privacy Policy</a> and consent to being contacted.
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#FF6F3C] to-[#FF3C3C] hover:from-[#FF5A1F] hover:to-[#FF2929] text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                    >
                      <span>Send Message</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#FF6F3C] to-[#FF3C3C] p-6 text-white">
              <h2 className="text-2xl font-bold">Find Us</h2>
              <p className="opacity-90">Visit our office location</p>
            </div>
            <div className="h-96 w-full">
              <LoadScript googleMapsApiKey="AIzaSyC4zcfEYFK-woLfp8L4EcwZSx1ujuk_F30">
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={{ lat: 6.9271, lng: 79.8612 }} // Colombo
                  zoom={12}
                >
                  <Marker position={{ lat: 6.9271, lng: 79.8612 }} />
                </GoogleMap>
              </LoadScript>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}