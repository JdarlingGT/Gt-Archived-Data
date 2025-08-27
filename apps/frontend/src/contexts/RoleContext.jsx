import React, { createContext, useContext, useState, useEffect } from 'react';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState('viewer');

  useEffect(() => {
    // In a real application, you would fetch the user's role from an API
    // For this example, we'll simulate a role change
    const simulateRoleChange = () => {
      const roles = ['admin', 'coordinator', 'viewer'];
      const randomRole = roles[Math.floor(Math.random() * roles.length)];
      setRole(randomRole);
    };

    simulateRoleChange();
  }, []);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  return useContext(RoleContext);
};