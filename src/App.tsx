import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/header/Header';
import Sidebar from './layout/sidebar/sidebar';
import StaffPage from './pages/StaffPage';
import { Typography } from '@mui/material';

// Placeholder components for other routes
const WatchPage = () => (
  <Box sx={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    p: 3
  }}>
    <Typography variant="h4">Watch Page</Typography>
    <Typography variant="body1" color="text.secondary">
      Watch functionality will be implemented here
    </Typography>
  </Box>
);

const SchedulePage = () => (
  <Box sx={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    p: 3
  }}>
    <Typography variant="h4">Schedule Page</Typography>
    <Typography variant="body1" color="text.secondary">
      Schedule functionality will be implemented here
    </Typography>
  </Box>
);

const SitesPage = () => (
  <Box sx={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    p: 3
  }}>
    <Typography variant="h4">Sites Page</Typography>
    <Typography variant="body1" color="text.secondary">
      Sites functionality will be implemented here
    </Typography>
  </Box>
);

const SalesPage = () => (
  <Box sx={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    p: 3
  }}>
    <Typography variant="h4">Sales Page</Typography>
    <Typography variant="body1" color="text.secondary">
      Sales functionality will be implemented here
    </Typography>
  </Box>
);

const CustomerPage = () => (
  <Box sx={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    p: 3
  }}>
    <Typography variant="h4">Customer Page</Typography>
    <Typography variant="body1" color="text.secondary">
      Customer functionality will be implemented here
    </Typography>
  </Box>
);

const AreaTagsPage = () => (
  <Box sx={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    p: 3
  }}>
    <Typography variant="h4">Area Tags Page</Typography>
    <Typography variant="body1" color="text.secondary">
      Area Tags functionality will be implemented here
    </Typography>
  </Box>
);

const CustomReportsPage = () => (
  <Box sx={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    p: 3
  }}>
    <Typography variant="h4">Custom Reports Page</Typography>
    <Typography variant="body1" color="text.secondary">
      Custom Reports functionality will be implemented here
    </Typography>
  </Box>
);

const StaffTimesheetPage = () => (
  <Box sx={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    p: 3
  }}>
    <Typography variant="h4">Staff Timesheet Page</Typography>
    <Typography variant="body1" color="text.secondary">
      Staff Timesheet functionality will be implemented here
    </Typography>
  </Box>
);

const AppContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header onMenuClick={handleMenuClick} />
      <Sidebar
        open={sidebarOpen}
        onClose={handleSidebarClose}
        onNavigate={handleNavigate}
      />
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/staff" replace />} />
          <Route path="/watch" element={<WatchPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/sites" element={<SitesPage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/staff/timesheet" element={<StaffTimesheetPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/area-tags" element={<AreaTagsPage />} />
          <Route path="/custom-reports" element={<CustomReportsPage />} />
        </Routes>
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
