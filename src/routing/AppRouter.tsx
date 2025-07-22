import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StaffPage from '../pages/staff/StaffPage';
import { Box, Typography } from '@mui/material';
import SiteLayout from '../pages/sites/SiteLayout';
import Schedule from '../pages/schedule/SiteView';
import WatchLayout from '../pages/watch/WatchLayout';
import StaffTimesheetTable from '../pages/staff/StaffTimesheetTable';
import SiteInvoice from '../pages/sites/siteInvoice';
import { SettingsPage } from '../pages/settings';


const StaffTimesheetPage = () => {
  const handleClose = () => {
    window.history.back();
  };

  return (
    <Box className="page-container">
      <StaffTimesheetTable onClose={handleClose} />
    </Box>
  );
};

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/staff" replace />} />
      <Route path="/watch" element={<WatchLayout />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/sites" element={<SiteLayout />} />
      <Route path="/staff" element={<StaffPage />} />
      <Route path="/staff/timesheet" element={<StaffTimesheetPage />} />
      <Route path="/site/invoice" element={<SiteInvoice />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
};

export default AppRouter;
