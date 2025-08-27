import React, { useState } from 'react';
import { FaSearch, FaMoon, FaSun, FaBell } from 'react-icons/fa';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-white shadow-md dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">
            <FaSearch />
          </button>
        </form>
        <div className="flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="text-gray-600 dark:text-gray-300">
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button className="text-gray-600 dark:text-gray-300">
            <FaBell />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;