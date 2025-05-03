import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/PageNavbar";
import Footer from "../components/Footer";

export default function Support() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can replace this with actual backend submission logic
    console.log("Form Submitted:", formData);
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-[#1c1c1c] py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl font-bold text-center mb-4 text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Support & Help Center
          </motion.h1>

          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
            Have questions or need assistance? Reach out to us and we’ll respond as soon as possible.
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-[#FF6F3C] text-white py-3 rounded-lg hover:bg-[#e85d2f] transition-all"
            >
              {submitted ? "Message Sent!" : "Send Message"}
            </button>
          </form>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <ul className="space-y-4">
              <li className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <strong>Q: How do I reset my password?</strong>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Go to your profile settings and click on "Change Password".
                </p>
              </li>
              <li className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <strong>Q: Can I delete my account?</strong>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Yes, contact us through this support form and we will assist you with account deletion.
                </p>
              </li>
              <li className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <strong>Q: How long does it take to get a response?</strong>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  We usually respond within 24–48 hours.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
