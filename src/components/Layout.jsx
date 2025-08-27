// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Toolbar, AppBar, Typography } from '@mui/material';
import Sidebar from './Sidebar';

function Layout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Graston Clinician Insights
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
        <Toolbar />
        <Outlet /> {/* Child pages will be rendered here */}
      </Box>
    </Box>
  );
}

export default Layout;