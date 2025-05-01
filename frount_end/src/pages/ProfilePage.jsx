import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiUser, FiMail, FiPhone, FiMapPin, FiSave, FiImage, FiGrid, FiList, FiClock } from 'react-icons/fi';
import Navbar from "../components/PageNavbar";
import Footer from "../components/Footer";

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    profileImage: null
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [projectsFilter, setProjectsFilter] = useState('all'); // 'all', 'recent', 'completed'
  
  // Mock projects data - in a real app you would fetch this from your API
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Wooden Nameplate",
      image: "https://images.unsplash.com/photo-1611486212557-88be5ff6f941?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29vZCUyMGVuZ3JhdmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
      date: "2023-10-15",
      status: "completed",
      description: "Custom engraved office nameplate with elegant wood finish."
    },
    {
      id: 2,
      title: "Anniversary Gift",
      image: "https://images.unsplash.com/photo-1559304822-9eb2813c9844?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29vZCUyMGVuZ3JhdmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
      date: "2023-11-02",
      status: "completed",
      description: "Personalized wooden plaque with wedding date and names."
    },
    {
      id: 3,
      title: "Business Logo",
      image: "https://images.unsplash.com/photo-1618090584352-1603bd4529f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdvb2QlMjBlbmdyYXZpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
      date: "2023-11-28",
      status: "in-progress",
      description: "Company logo engraving for reception desk."
    },
    {
      id: 4,
      title: "Custom Cutting Board",
      image: "https://images.unsplash.com/photo-1544098730-e4ee8a7e6c4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdvb2QlMjBlbmdyYXZpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
      date: "2023-12-05",
      status: "draft",
      description: "Family recipe engraved on maple cutting board."
    }
  ]);

  // Fetch user data on component mount
  useEffect(() => {
    // Simulate API call to get user data
    setTimeout(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUserData({
            firstName: parsedUser.firstName || 'John',
            lastName: parsedUser.lastName || 'Doe',
            email: parsedUser.email || 'john.doe@example.com',
            phone: parsedUser.phone || '+1 (123) 456-7890',
            location: parsedUser.location || 'New York, USA',
            bio: parsedUser.bio || 'Enthusiastic about creating beautiful wood engravings for home and office. Love working with oak and maple.',
            profileImage: parsedUser.profileImage || 'https://randomuser.me/api/portraits/men/44.jpg'
          });
        } catch (error) {
          console.error('Error parsing user data:', error);
          showNotification('Error loading profile data', 'error');
        }
      } else {
        // Default data if no user in localStorage (for demo)
        setUserData({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '+1 (123) 456-7890',
          location: 'New York, USA',
          bio: 'Enthusiastic about creating beautiful wood engravings for home and office. Love working with oak and maple.',
          profileImage: 'https://randomuser.me/api/portraits/men/44.jpg'
        });
      }
      setIsLoading(false);
    }, 800);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call to update user data
    setTimeout(() => {
      // Update localStorage with new user data
      localStorage.setItem('user', JSON.stringify(userData));
      
      setIsEditing(false);
      setIsLoading(false);
      showNotification('Profile updated successfully', 'success');
    }, 1000);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({
      show: true,
      message,
      type
    });

    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  // Filter projects based on selected filter
  const filteredProjects = projects.filter(project => {
    if (projectsFilter === 'all') return true;
    if (projectsFilter === 'recent') {
      // Filter projects from last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return new Date(project.date) >= thirtyDaysAgo;
    }
    if (projectsFilter === 'completed') return project.status === 'completed';
    return true;
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-[#f5e9da] to-[#e7cfb4] dark:from-[#1c1c1c] dark:to-[#2e2e2e] text-[#1c1c1c] dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Notification */}
          {notification.show && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg ${
                notification.type === 'success' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                  : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
              }`}
            >
              {notification.message}
            </motion.div>
          )}

          <div className="bg-white dark:bg-[#2a2a2a] rounded-3xl shadow-xl overflow-hidden">
            {/* Cover image */}
            <div className="h-48 bg-gradient-to-r from-[#FF6F3C] to-[#FF3C3C] relative">
              {/* Edit profile button */}
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="absolute top-4 right-4 flex items-center space-x-1 bg-white dark:bg-gray-800 text-[#FF6F3C] px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <FiEdit2 size={16} />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="absolute top-4 right-4 flex items-center space-x-1 bg-white dark:bg-gray-800 text-green-600 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-4 w-4 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <FiSave size={16} />
                  )}
                  <span>Save Changes</span>
                </button>
              )}
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Profile sidebar */}
              <div className="md:w-1/3 border-r border-gray-200 dark:border-gray-700">
                <div className="px-8 py-6 relative">
                  {/* Profile image with edit option */}
                  <div className="relative mx-auto w-32 h-32 -mt-20 mb-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                      <img 
                        src={userData.profileImage || 'https://via.placeholder.com/150'} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-[#FF6F3C] p-2 rounded-full text-white cursor-pointer shadow-md hover:bg-[#FF5A1F] transition-colors">
                        <FiImage size={16} />
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleProfileImageChange}
                        />
                      </label>
                    )}
                  </div>

                  {/* User name */}
                  <div className="text-center mb-6">
                    {isEditing ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          name="firstName"
                          value={userData.firstName}
                          onChange={handleInputChange}
                          className="text-center w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6F3C] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="First Name"
                        />
                        <input
                          type="text"
                          name="lastName"
                          value={userData.lastName}
                          onChange={handleInputChange}
                          className="text-center w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6F3C] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="Last Name"
                        />
                      </div>
                    ) : (
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {userData.firstName} {userData.lastName}
                      </h1>
                    )}
                    {!isEditing && (
                      <p className="text-[#FF6F3C]">EngraveMaster Member</p>
                    )}
                  </div>

                  {/* Contact information */}
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-[#FF6F3C] bg-opacity-10 p-2 rounded-full mr-3">
                        <FiMail className="text-[#FF6F3C]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6F3C] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            placeholder="Email"
                          />
                        ) : (
                          <p className="text-gray-900 dark:text-white">{userData.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-[#FF6F3C] bg-opacity-10 p-2 rounded-full mr-3">
                        <FiPhone className="text-[#FF6F3C]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            value={userData.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6F3C] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            placeholder="Phone"
                          />
                        ) : (
                          <p className="text-gray-900 dark:text-white">{userData.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-[#FF6F3C] bg-opacity-10 p-2 rounded-full mr-3">
                        <FiMapPin className="text-[#FF6F3C]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                        {isEditing ? (
                          <input
                            type="text"
                            name="location"
                            value={userData.location}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6F3C] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            placeholder="Location"
                          />
                        ) : (
                          <p className="text-gray-900 dark:text-white">{userData.location}</p>
                        )}
                      </div>
                    </div>

                    <div className="pt-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">About</h3>
                      {isEditing ? (
                        <textarea
                          name="bio"
                          value={userData.bio}
                          onChange={handleInputChange}
                          rows="5"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6F3C] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="Tell us about yourself..."
                        ></textarea>
                      ) : (
                        <p className="text-gray-700 dark:text-gray-300">{userData.bio}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Projects section */}
              <div className="md:w-2/3 px-8 py-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Projects</h2>
                  
                  <div className="flex items-center space-x-2">
                    {/* View mode toggle */}
                    <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                      <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-2 ${viewMode === 'grid' ? 'bg-[#FF6F3C] text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                      >
                        <FiGrid size={18} />
                      </button>
                      <button 
                        onClick={() => setViewMode('list')}
                        className={`p-2 ${viewMode === 'list' ? 'bg-[#FF6F3C] text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                      >
                        <FiList size={18} />
                      </button>
                    </div>
                    
                    {/* Filter dropdown */}
                    <select 
                      value={projectsFilter}
                      onChange={(e) => setProjectsFilter(e.target.value)}
                      className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF6F3C]"
                    >
                      <option value="all">All Projects</option>
                      <option value="recent">Recent</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                {/* Project list */}
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProjects.map(project => (
                      <motion.div 
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <div className="aspect-w-16 aspect-h-9 relative">
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-3 right-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              project.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                              project.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                            }`}>
                              {project.status === 'completed' ? 'Completed' : 
                               project.status === 'in-progress' ? 'In Progress' : 'Draft'}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{project.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mb-2">
                            <FiClock size={14} className="mr-1" />
                            {new Date(project.date).toLocaleDateString()}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">{project.description}</p>
                          <div className="mt-4 flex justify-end">
                            <a 
                              href={`/projects/${project.id}`} 
                              className="text-[#FF6F3C] hover:text-[#FF5A1F] text-sm font-medium"
                            >
                              View Details →
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredProjects.map(project => (
                      <motion.div 
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col sm:flex-row bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <div className="sm:w-48 h-32 flex-shrink-0">
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                <FiClock size={14} className="mr-1" />
                                {new Date(project.date).toLocaleDateString()}
                              </p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              project.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                              project.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                            }`}>
                              {project.status === 'completed' ? 'Completed' : 
                               project.status === 'in-progress' ? 'In Progress' : 'Draft'}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{project.description}</p>
                          <div className="mt-auto pt-2 flex justify-end">
                            <a 
                              href={`/projects/${project.id}`} 
                              className="text-[#FF6F3C] hover:text-[#FF5A1F] text-sm font-medium"
                            >
                              View Details →
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* No projects message */}
                {filteredProjects.length === 0 && (
                  <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <FiGrid size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No projects found</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {projectsFilter === 'all' 
                        ? "You haven't created any projects yet." 
                        : `No ${projectsFilter} projects found.`}
                    </p>
                    <a 
                      href="/create" 
                      className="mt-4 inline-block px-4 py-2 bg-[#FF6F3C] text-white rounded-lg hover:bg-[#FF5A1F] transition-colors"
                    >
                      Create New Project
                    </a>
                  </div>
                )}

                {/* Create new project button */}
                {filteredProjects.length > 0 && (
                  <div className="mt-8 text-center">
                    <a 
                      href="/create" 
                      className="inline-block px-6 py-3 bg-[#FF6F3C] text-white rounded-lg hover:bg-[#FF5A1F] transition-colors"
                    >
                      Create New Project
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}