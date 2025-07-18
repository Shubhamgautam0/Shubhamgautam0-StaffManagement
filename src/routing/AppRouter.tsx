import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StaffPage from '../pages/staff/StaffPage';
import { Box, Typography } from '@mui/material';
import SiteLayout from '../pages/sites/SiteLayout';
import Schedule from '../pages/schedule/Schedule';
import WatchLayout from '../pages/watch/WatchLayout';

// Placeholder components for other routes



const StaffTimesheetPage = () => (
  <Box sx={{
    height: '100%',
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
    <Routes>
      <Route path="/" element={<Navigate to="/staff" replace />} />
      <Route path="/watch" element={<WatchLayout />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/sites" element={<SiteLayout />} />
      <Route path="/staff" element={<StaffPage />} />
      <Route path="/staff/timesheet" element={<StaffTimesheetPage />} />
    </Routes>
  );
};

export default AppRouter;
