import React from 'react';

const Header = ({ title, actionButton }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 md:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 ml-12 md:ml-0">{title}</h1>
        {actionButton && (
          <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
            {actionButton}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;