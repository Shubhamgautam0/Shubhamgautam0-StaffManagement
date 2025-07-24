import React, { useState } from 'react';
import { BrowserRouter as Router, useNavigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/header/Header';
import Sidebar from './layout/sidebar/sidebar';
import AppRouter from './routing/AppRouter';

const AppContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  if (isHomePage) {
    return (
      <Box sx={{ height: '100vh', overflow: 'hidden' }}>
        <AppRouter />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header onMenuClick={handleMenuClick} />
      <Sidebar
        open={sidebarOpen}
        onClose={handleSidebarClose}
        onNavigate={handleNavigate}
      />
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <AppRouter />
      </Box>
    </Box>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
