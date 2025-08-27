import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import UserListPage from './pages/UserListPage';
import EventListPage from './pages/EventListPage';
import OrderListPage from './pages/OrderListPage';
import LicenseListPage from './pages/LicenseListPage';
import { ToastProvider } from './components/Toast';
import { RoleProvider } from './contexts/RoleContext';
import { AuditLogProvider } from './contexts/AuditLogContext';
import { PageProvider } from './contexts/PageContext';
import './index.css';

const App = () => {
  return (
    <ToastProvider>
      <RoleProvider>
        <AuditLogProvider>
          <PageProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="users" element={<UserListPage />} />
                  <Route path="events" element={<EventListPage />} />
                  <Route path="orders" element={<OrderListPage />} />
                  <Route path="licenses" element={<LicenseListPage />} />
                </Route>
              </Routes>
            </Router>
          </PageProvider>
        </AuditLogProvider>
      </RoleProvider>
    </ToastProvider>
  );
};

export default App;
