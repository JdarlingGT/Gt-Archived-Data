import React, { createContext, useContext, useState, useEffect } from 'react';

const AuditLogContext = createContext();

export const AuditLogProvider = ({ children }) => {
  const [auditLogs, setAuditLogs] = useState([]);

  const addAuditLog = (action, entity, user) => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      action,
      entity,
      user,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  return (
    <AuditLogContext.Provider value={{ auditLogs, addAuditLog }}>
      {children}
    </AuditLogContext.Provider>
  );
};

export const useAuditLog = () => {
  return useContext(AuditLogContext);
};