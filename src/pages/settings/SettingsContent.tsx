import React from 'react';
import { Box, Typography } from '@mui/material';

// Timesheet components
import WorkWeek from './timesheet/WorkWeek';
import TimeFormat from './timesheet/TimeFormat';
import OvertimeRule from './timesheet/OvertimeRule';
import DayNightTimeRule from './timesheet/DayNightTimeRule';
import Breaks from './timesheet/Breaks';
import PayrollTime from './timesheet/PayrollTime';
import WeekendTimeRule from './timesheet/WeekendTimeRule';
import HolidayHrs from './timesheet/HolidayHrs';

// Notification components
import NotifyManager from './notification/NotifyManager';
import NotifyStaff from './notification/NotifyStaff';

// Other settings components
import ShiftSettings from './shift-setting/ShiftSettings';
import StaffSettings from './staff/StaffSettings';
import { Site } from './site';
import { Rates } from './rates';

interface SettingsContentProps {
  selectedCategory: string;
  selectedSubItem: string;
}

const SettingsContent: React.FC<SettingsContentProps> = ({
  selectedCategory,
  selectedSubItem
}) => {
  // Helper function to format titles
  const formatTitle = (text: string): string => {
    if (!text) return 'Settings';
    return text
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  // Validate props
  if (!selectedCategory || !selectedSubItem) {
    return (
      <Box className="settings-content-section">
        <Typography variant="h6" className="settings-content-title">
          Settings
        </Typography>
        <Typography variant="body2" className="settings-content-description">
          Please select a category and setting to configure.
        </Typography>
      </Box>
    );
  }

  const renderDefaultContent = () => (
    <Box className="settings-content-section">
      <Typography variant="h6" className="settings-content-title">
        {formatTitle(selectedSubItem)}
      </Typography>
      <Typography variant="body2" className="settings-content-description">
        Settings for {formatTitle(selectedSubItem)} will be available here.
      </Typography>
    </Box>
  );

  const renderContent = () => {
    try {
      switch (selectedCategory) {
        case 'timesheet':
          return renderTimesheetContent();
        case 'notifications':
          return renderNotificationContent();
        case 'shift-settings':
          return <ShiftSettings selectedSubItem={selectedSubItem} />;
        case 'staff':
          return <StaffSettings selectedSubItem={selectedSubItem} />;
        case 'site':
          return <Site selectedSubItem={selectedSubItem} />;
        case 'rates':
          return <Rates selectedSubItem={selectedSubItem} />;
        default:
          return renderDefaultContent();
      }
    } catch (error) {
      console.error('Error rendering settings content:', error);
      return (
        <Box className="settings-content-section">
          <Typography variant="h6" color="error">
            Error Loading Settings
          </Typography>
          <Typography variant="body2" color="textSecondary">
            There was an error loading the settings content. Please try again.
          </Typography>
        </Box>
      );
    }
  };

  const renderTimesheetContent = () => {
    switch (selectedSubItem) {
      case 'work-week':
        return <WorkWeek />;
      case 'time-format':
        return <TimeFormat />;
      case 'overtime-rule':
        return <OvertimeRule />;
      case 'day-night-time-rule':
        return <DayNightTimeRule />;
      case 'breaks':
        return <Breaks />;
      case 'payroll-time':
        return <PayrollTime />;
      case 'weekend-time-rule':
        return <WeekendTimeRule />;
      case 'holiday-hrs':
        return <HolidayHrs />;
      default:
        return renderDefaultContent();
    }
  };

  const renderNotificationContent = () => {
    switch (selectedSubItem) {
      case 'notify-manager':
        return <NotifyManager />;
      case 'notify-staff':
        return <NotifyStaff />;
      default:
        return renderDefaultContent();
    }
  };

  return (
    <Box className="settings-content-wrapper">
      {renderContent()}
    </Box>
  );
};

export default SettingsContent;
