import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { usePage } from '../contexts/PageContext';

const Layout = () => {
  const { pageTitle, actionButton } = usePage();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header title={pageTitle} actionButton={actionButton} />
          <main className="flex-1 p-4 md:p-8 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;