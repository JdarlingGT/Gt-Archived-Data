import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-blue-600 text-white p-2 rounded-md shadow-lg"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40
        w-64 bg-white shadow-md
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="p-6 text-xl font-bold text-blue-600 flex items-center justify-between">
          <span>GT Explorer</span>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        <nav className="mt-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block px-6 py-2 text-gray-700 hover:bg-blue-50 rounded transition-colors ${
                location.pathname === item.path ? 'text-blue-600 font-semibold bg-blue-100' : ''
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;