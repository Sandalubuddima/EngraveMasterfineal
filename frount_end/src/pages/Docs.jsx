import React from "react";
import Navbar from "../components/PageNavbar";
import Footer from "../components/Footer";

export default function Docs() {
  return (
    <>
      <Navbar />
      <br /><br /><br />
      <div className="min-h-screen bg-gradient-to-b from-[#f5e9da] to-[#e7cfb4] dark:from-[#1C1C1C] dark:to-[#2e2e2e] text-[#84240C] dark:text-white">
        {/* Hero Section */}
        <div className="w-full bg-gradient-to-r from-[#FF6F3C] to-[#FF3C3C] text-white py-10">
          <div className="max-w-5xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">EngraveMaster Documentation</h1>
            <p className="text-xl text-center max-w-3xl mx-auto text-[#fdf6f0]">
              Everything you need to know to create perfect engravings
            </p>
          </div>
        </div>

        {/* Documentation Content */}
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Table of Contents - Sticky on desktop */}
          <div className="hidden lg:block sticky top-4 float-right w-64 ml-8 p-5 bg-[#fdf6f0] dark:bg-[#2a2a2a] rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-3 text-[#FF6F3C]">Contents</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#getting-started" className="hover:text-[#FF5A1F] transition-colors">🧠 Getting Started</a></li>
              <li><a href="#features" className="hover:text-[#FF5A1F] transition-colors">⚙️ Features</a></li>
              <li><a href="#how-to-use" className="hover:text-[#FF5A1F] transition-colors">🚀 How to Use</a></li>
              <li><a href="#file-support" className="hover:text-[#FF5A1F] transition-colors">📂 File Support</a></li>
              <li><a href="#need-help" className="hover:text-[#FF5A1F] transition-colors">💬 Need Help</a></li>
              <li><a href="#tutorial" className="hover:text-[#FF5A1F] transition-colors">🎥 Tutorial</a></li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="lg:mr-64">
            <section id="getting-started" className="mb-12 p-6 bg-[#fdf6f0] dark:bg-[#2a2a2a] rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-[#FF6F3C] bg-opacity-10 dark:bg-opacity-20 p-3 rounded-full mr-4">
                  <span className="text-2xl">🧠</span>
                </div>
                <h2 className="text-2xl font-bold text-[#84240C] dark:text-[#FF6F3C]">Getting Started</h2>
              </div>
              <p className="text-base leading-relaxed text-[#563232] dark:text-gray-300">
                Welcome to EngraveMaster! This documentation will guide you through setting up and using the software to create stunning laser engravings with precision and ease.
              </p>
              <div className="mt-4 p-4 bg-[#FF6F3C] bg-opacity-5 dark:bg-opacity-10 border-l-4 border-[#FF6F3C] rounded-md">
                <p className="text-sm font-medium text-[#563232] dark:text-gray-300">Pro Tip: Make sure your machine firmware is updated before starting.</p>
              </div>
            </section>

            <section id="features" className="mb-12 p-6 bg-[#fdf6f0] dark:bg-[#2a2a2a] rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-[#FF6F3C] bg-opacity-10 dark:bg-opacity-20 p-3 rounded-full mr-4">
                  <span className="text-2xl">⚙️</span>
                </div>
                <h2 className="text-2xl font-bold text-[#84240C] dark:text-[#FF6F3C]">Features</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border border-[#e7cfb4] dark:border-gray-700 rounded-lg hover:border-[#FF6F3C] dark:hover:border-[#FF6F3C] transition-colors">
                  <h3 className="font-semibold mb-2 text-[#84240C] dark:text-white">AI-powered laser settings</h3>
                  <p className="text-sm text-[#563232] dark:text-gray-300">Optimal settings calculated based on your material and design.</p>
                </div>
                <div className="p-4 border border-[#e7cfb4] dark:border-gray-700 rounded-lg hover:border-[#FF6F3C] dark:hover:border-[#FF6F3C] transition-colors">
                  <h3 className="font-semibold mb-2 text-[#84240C] dark:text-white">Wood-type detection</h3>
                  <p className="text-sm text-[#563232] dark:text-gray-300">Automatic detection and optimization for different wood types.</p>
                </div>
                <div className="p-4 border border-[#e7cfb4] dark:border-gray-700 rounded-lg hover:border-[#FF6F3C] dark:hover:border-[#FF6F3C] transition-colors">
                  <h3 className="font-semibold mb-2 text-[#84240C] dark:text-white">Real-time preview</h3>
                  <p className="text-sm text-[#563232] dark:text-gray-300">See exactly how your engraving will look before starting.</p>
                </div>
                <div className="p-4 border border-[#e7cfb4] dark:border-gray-700 rounded-lg hover:border-[#FF6F3C] dark:hover:border-[#FF6F3C] transition-colors">
                  <h3 className="font-semibold mb-2 text-[#84240C] dark:text-white">Smart job history</h3>
                  <p className="text-sm text-[#563232] dark:text-gray-300">Track and replicate your successful engravings easily.</p>
                </div>
              </div>
            </section>

            <section id="how-to-use" className="mb-12 p-6 bg-[#fdf6f0] dark:bg-[#2a2a2a] rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-[#FF6F3C] bg-opacity-10 dark:bg-opacity-20 p-3 rounded-full mr-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h2 className="text-2xl font-bold text-[#84240C] dark:text-[#FF6F3C]">How to Use</h2>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-0 h-full w-0.5 bg-[#FF6F3C] bg-opacity-30 dark:bg-opacity-40"></div>
                <div className="space-y-6 relative">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-8 h-8 rounded-full bg-[#FF6F3C] text-white flex items-center justify-center">1</div>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#84240C] dark:text-white">Upload or select your wood type</h3>
                      <p className="text-sm text-[#563232] dark:text-gray-300 mt-1">Choose from our library or upload a custom image of your wood.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-8 h-8 rounded-full bg-[#FF6F3C] text-white flex items-center justify-center">2</div>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#84240C] dark:text-white">Adjust or accept suggested laser settings</h3>
                      <p className="text-sm text-[#563232] dark:text-gray-300 mt-1">Our AI will recommend optimal settings for your material.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-8 h-8 rounded-full bg-[#FF6F3C] text-white flex items-center justify-center">3</div>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#84240C] dark:text-white">Preview your engraving job</h3>
                      <p className="text-sm text-[#563232] dark:text-gray-300 mt-1">See a realistic simulation of the final result.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-8 h-8 rounded-full bg-[#FF6F3C] text-white flex items-center justify-center">4</div>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#84240C] dark:text-white">Click "Start Engraving" to begin</h3>
                      <p className="text-sm text-[#563232] dark:text-gray-300 mt-1">Monitor progress in real-time as your design comes to life.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="file-support" className="mb-12 p-6 bg-[#fdf6f0] dark:bg-[#2a2a2a] rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-[#FF6F3C] bg-opacity-10 dark:bg-opacity-20 p-3 rounded-full mr-4">
                  <span className="text-2xl">📂</span>
                </div>
                <h2 className="text-2xl font-bold text-[#84240C] dark:text-[#FF6F3C]">File Support</h2>
              </div>
              <p className="mb-4 text-[#563232] dark:text-gray-300">EngraveMaster supports a variety of file formats to ensure compatibility with your workflow:</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#FF6F3C] bg-opacity-10 dark:bg-opacity-20 text-[#84240C] dark:text-white rounded-full font-mono text-sm">.svg</span>
                <span className="px-3 py-1 bg-[#FF6F3C] bg-opacity-10 dark:bg-opacity-20 text-[#84240C] dark:text-white rounded-full font-mono text-sm">.png</span>
                <span className="px-3 py-1 bg-[#FF6F3C] bg-opacity-10 dark:bg-opacity-20 text-[#84240C] dark:text-white rounded-full font-mono text-sm">.dxf</span>
              </div>
            </section>

            <section id="need-help" className="mb-12 p-6 bg-[#fdf6f0] dark:bg-[#2a2a2a] rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-[#FF6F3C] bg-opacity-10 dark:bg-opacity-20 p-3 rounded-full mr-4">
                  <span className="text-2xl">💬</span>
                </div>
                <h2 className="text-2xl font-bold text-[#84240C] dark:text-[#FF6F3C]">Need Help?</h2>
              </div>
              <p className="mb-4 text-[#563232] dark:text-gray-300">We offer multiple support channels to ensure you get the help you need:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#FF6F3C] bg-opacity-5 dark:bg-opacity-10 rounded-lg flex items-center border-l-2 border-[#FF6F3C]">
                  <div className="bg-[#FF6F3C] p-2 rounded-md text-white mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#84240C] dark:text-white">Ask AI</h3>
                    <p className="text-sm text-[#563232] dark:text-gray-300">Use the "Ask AI" button in the sidebar for instant help.</p>
                  </div>
                </div>
                <div className="p-4 bg-[#FF6F3C] bg-opacity-5 dark:bg-opacity-10 rounded-lg flex items-center border-l-2 border-[#FF6F3C]">
                  <div className="bg-[#FF6F3C] p-2 rounded-md text-white mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#84240C] dark:text-white">Contact Support</h3>
                    <p className="text-sm text-[#563232] dark:text-gray-300">Email our team at support@engravemaster.com</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="tutorial" className="mb-12 p-6 bg-[#fdf6f0] dark:bg-[#2a2a2a] rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-[#FF6F3C] bg-opacity-10 dark:bg-opacity-20 p-3 rounded-full mr-4">
                  <span className="text-2xl">🎥</span>
                </div>
                <h2 className="text-2xl font-bold text-[#84240C] dark:text-[#FF6F3C]">Watch EngraveMaster Tutorial</h2>
              </div>
              <div className="overflow-hidden rounded-xl shadow-lg">
                <iframe
                  src="https://www.youtube.com/embed/SVGuBIJqkQY"
                  title="EngraveMaster Tutorial"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full aspect-video"
                ></iframe>
              </div>
              <div className="mt-4 p-3 bg-[#F9F871] bg-opacity-20 rounded-md flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF6F3C] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-medium text-[#563232] dark:text-gray-300">This tutorial covers all the basics to get you started with EngraveMaster.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}