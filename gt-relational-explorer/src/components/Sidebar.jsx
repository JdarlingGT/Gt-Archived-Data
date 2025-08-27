import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/users', label: 'Users', icon: '👤' },
    { path: '/events', label: 'Events', icon: '📅' },
    { path: '/orders', label: 'Orders', icon: '🛒' },
    { path: '/licenses', label: 'Licenses', icon: '🔑' },
  ];

  return (
    <div className={`bg-gray-800 text-white h-full ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
      <div className="p-4 flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${isOpen ? 'block' : 'hidden'}`}>GT Explorer</h1>
        <button onClick={toggleSidebar} className="text-white">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-2 mt-2 text-sm ${location.pathname === item.path ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            <span className="mr-3">{item.icon}</span>
            <span className={`${isOpen ? 'block' : 'hidden'}`}>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;