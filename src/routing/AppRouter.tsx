import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StaffPage from '../pages/staff/StaffPage';
import { Box } from '@mui/material';
import SiteLayout from '../pages/sites/SiteLayout';
import Schedule from '../pages/schedule/SiteView';
import WatchLayout from '../pages/watch/WatchLayout';
import StaffTimesheetTable from '../pages/staff/StaffTimesheetTable';
import SiteInvoice from '../pages/sites/siteInvoice';
import { SettingsPage } from '../pages/settings';
import { CustomerPage } from '../pages/customers';
import { CustomReportPage } from '../pages/custom-report';
import HomePage from '../pages/home/HomePage';


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
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/watch" element={<WatchLayout />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/sites" element={<SiteLayout />} />
      <Route path="/staff" element={<StaffPage />} />
      <Route path="/staff/timesheet" element={<StaffTimesheetPage />} />
      <Route path="/site/invoice" element={<SiteInvoice />} />
      <Route path="/customers" element={<CustomerPage />} />
      <Route path="/custom-reports" element={<CustomReportPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
};

export default AppRouter;
