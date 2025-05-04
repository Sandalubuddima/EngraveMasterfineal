import React, { useState } from 'react';
import { 
  FiGrid, 
  FiUsers, 
  FiFileText, 
  FiLogOut, 
  FiLayers,
  FiSettings,
  FiMenu,
  FiChevronLeft
} from 'react-icons/fi';
import { NavLink } from 'react-router-dom'; // This is available in your project

const navItems = [
  { name: "Dashboard", icon: <FiGrid size={18} />, path: "/admin/dashboard" },
  { name: "Users", icon: <FiUsers size={18} />, path: "/admin/users" },
  { name: "Projects", icon: <FiLayers size={18} />, path: "/admin/projects" },
  { name: "Reports", icon: <FiFileText size={18} />, path: "/admin/reports" },
  { name: "Settings", icon: <FiSettings size={18} />, path: "/admin/settings" }
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <aside 
      className={`bg-gray-900 text-white h-screen fixed left-0 top-0 z-10 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } shadow-xl flex flex-col`}
    >
      {/* Header with Logo */}
      <div className="flex items-center justify-between px-4 py-6 border-b border-gray-800">
        {!collapsed && (
          <div className="text-xl font-bold">
            <span className="text-orange-500">Engrave</span>
            <span className="text-white">Master</span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto text-2xl font-bold text-orange-500">
            EM
          </div>
        )}
        <button 
          onClick={toggleSidebar} 
          className="p-1 rounded-full hover:bg-gray-800 transition-colors"
        >
          {collapsed ? <FiMenu size={18} /> : <FiChevronLeft size={18} />}
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto">
        <div className={`flex flex-col gap-2 ${collapsed ? 'items-center' : ''}`}>
          {!collapsed && (
            <div className="px-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Main Menu
            </div>
          )}
          
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center ${collapsed ? 'justify-center' : ''} gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg"
                    : "hover:bg-gray-800 text-gray-300"
                }`
              }
              title={collapsed ? item.name : ""}
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
            </NavLink>
          ))}
        </div>
      </nav>
      
      {/* User Profile */}
      {!collapsed && (
        <div className="px-4 py-4 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold">
              A
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Admin User</div>
              <div className="text-xs text-gray-400">admin@engravemaster.com</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Logout Button */}
      <div className={`p-4 ${collapsed ? 'flex justify-center' : ''}`}>
        <button className={`flex items-center ${collapsed ? 'justify-center w-12 h-12' : 'w-full gap-3 px-4 py-3'} rounded-lg bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 transition-all text-white shadow-lg`}>
          <FiLogOut size={18} />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;