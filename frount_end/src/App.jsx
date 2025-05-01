import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Loging_page from './pages/logingpage'
import Signup_page from './pages/signuppage'
import Home_page from './pages/homepage'
import AboutUs from './pages/AboutUs'
import Services from './pages/Services'
import Contact from './pages/Contact'
import ProfilePage from './pages/ProfilePage'

import Docs from "./pages/Docs";
import AskAI from './pages/AskAI'
import Create from './pages/Create'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ProtectedRoute from './components/ProtectedRoute'; // Import it

function App() {
  const [count, setCount] = useState(0)

  return (
    <GoogleOAuthProvider clientId="113751300470-5msrn6r2ib5e28vmiml55d18v8ke5t3f.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home_page />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Loging_page />} />
          <Route path="/signup" element={<Signup_page />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/create" element={<Create />} />

          {/* Protected route */}
          <Route
            path="/askai"
            element={
              <ProtectedRoute>
                <AskAI />
              </ProtectedRoute>
            }
          />

          {/* If you want, later you can add Error 404 page */}
          {/* <Route path="*" element={<Error_page />} /> */}
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
