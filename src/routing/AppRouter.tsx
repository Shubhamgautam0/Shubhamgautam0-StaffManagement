import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StaffPage from '../pages/StaffPage';
import { Box, Typography } from '@mui/material';

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

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/staff" replace />} />
        <Route path="/watch" element={<WatchPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/sites" element={<SitesPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/staff/timesheet" element={<StaffTimesheetPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
