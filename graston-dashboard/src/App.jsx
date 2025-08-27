import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import UserListPage from './pages/UserListPage';
import EventListPage from './pages/EventListPage';
import BusinessListPage from './pages/BusinessListPage';
import UserDetailPage from './pages/UserDetailPage';
import EventDetailPage from './pages/EventDetailPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<UserListPage />} />
          <Route path="/events" element={<EventListPage />} />
          <Route path="/businesses" element={<BusinessListPage />} />
          <Route path="/user/:id" element={<UserDetailPage />} />
          <Route path="/event/:id" element={<EventDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;