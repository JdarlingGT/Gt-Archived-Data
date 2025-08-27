import React, { createContext, useContext, useState } from 'react';

const PageContext = createContext();

export const usePage = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
};

export const PageProvider = ({ children }) => {
  const [pageTitle, setPageTitle] = useState('');
  const [actionButton, setActionButton] = useState(null);

  const setPageData = (title, button = null) => {
    setPageTitle(title);
    setActionButton(button);
  };

  return (
    <PageContext.Provider value={{ pageTitle, actionButton, setPageData }}>
      {children}
    </PageContext.Provider>
  );
};