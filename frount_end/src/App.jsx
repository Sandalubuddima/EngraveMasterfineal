import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import Home_page from './pages/homepage';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Loging_page from './pages/logingpage';
import Signup_page from './pages/signuppage';

// User Pages
import ProfilePage from './pages/ProfilePage';
import Docs from './pages/Docs';
import Support from './pages/support';

// Protected Pages
import AskAI from './pages/AskAI';
import Create from './pages/Create';
import YourProjects from './pages/YourProjects/YourProjects';
import NotesAndSketches from './pages/Notes';

// Admin Pages
import Dashboard from './pages/Dashboard';
import AdminUsers from './admin/Users';

function App() {
  return (
    <GoogleOAuthProvider clientId="113751300470-5msrn6r2ib5e28vmiml55d18v8ke5t3f.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home_page />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Loging_page />} />
          <Route path="/signup" element={<Signup_page />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/support" element={<Support />} />

          {/* Protected User Routes */}
          <Route path="/askai" element={<ProtectedRoute><AskAI /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
          <Route path="/yourprojects" element={<ProtectedRoute><YourProjects /></ProtectedRoute>} />
          <Route path="/notes" element={<ProtectedRoute><NotesAndSketches /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/Users" element={<AdminUsers />} />

          {/* Future: 404 Not Found Route */}
          {/* <Route path="*" element={<Error_page />} /> */}
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
