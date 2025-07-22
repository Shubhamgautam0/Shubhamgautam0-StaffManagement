import React from 'react';
import { Box, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface SettingsContentProps {
  selectedCategory: string;
  selectedSubItem: string;
}

const SettingsContent: React.FC<SettingsContentProps> = ({
  selectedCategory,
  selectedSubItem
}) => {
  const renderWorkWeekContent = () => (
    <Box className="settings-content-section">
      <Typography variant="h6" className="settings-content-title">
        Work week
      </Typography>
      <Typography variant="body2" className="settings-content-description">
        Your weekly schedule view and payroll calculation will also be based on this work week
      </Typography>
      
      <Box className="settings-form-group">
        <Typography variant="body2" className="settings-form-label">
          Start day
        </Typography>
        <FormControl fullWidth className="settings-form-control">
          <Select
            value="tuesday"
            className="settings-select"
            displayEmpty
          >
            <MenuItem value="monday">Monday</MenuItem>
            <MenuItem value="tuesday">Tuesday</MenuItem>
            <MenuItem value="wednesday">Wednesday</MenuItem>
            <MenuItem value="thursday">Thursday</MenuItem>
            <MenuItem value="friday">Friday</MenuItem>
            <MenuItem value="saturday">Saturday</MenuItem>
            <MenuItem value="sunday">Sunday</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box className="settings-form-group">
        <Typography variant="body2" className="settings-form-text">
          Work week Tue-Mon
        </Typography>
      </Box>
    </Box>
  );

  const renderTimeFormatContent = () => (
    <Box className="settings-content-section">
      <Typography variant="h6" className="settings-content-title">
        Time Format
      </Typography>
      <Typography variant="body2" className="settings-content-description">
        Choose your preferred time format for displaying times throughout the application
      </Typography>
      
      <Box className="settings-form-group">
        <Typography variant="body2" className="settings-form-label">
          Time Format
        </Typography>
        <FormControl fullWidth className="settings-form-control">
          <Select
            value="12-hour"
            className="settings-select"
            displayEmpty
          >
            <MenuItem value="12-hour">12 Hour (AM/PM)</MenuItem>
            <MenuItem value="24-hour">24 Hour</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );

  const renderOvertimeRuleContent = () => (
    <Box className="settings-content-section">
      <Typography variant="h6" className="settings-content-title">
        Overtime Rule
      </Typography>
      <Typography variant="body2" className="settings-content-description">
        Configure overtime calculation rules for your organization
      </Typography>
      
      <Box className="settings-form-group">
        <Typography variant="body2" className="settings-form-label">
          Daily Overtime Threshold (hours)
        </Typography>
        <TextField
          fullWidth
          type="number"
          defaultValue="8"
          className="settings-text-field"
        />
      </Box>

      <Box className="settings-form-group">
        <Typography variant="body2" className="settings-form-label">
          Weekly Overtime Threshold (hours)
        </Typography>
        <TextField
          fullWidth
          type="number"
          defaultValue="40"
          className="settings-text-field"
        />
      </Box>
    </Box>
  );

  const renderDefaultContent = () => (
    <Box className="settings-content-section">
      <Typography variant="h6" className="settings-content-title">
        {selectedSubItem.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </Typography>
      <Typography variant="body2" className="settings-content-description">
        Settings for {selectedSubItem.replace('-', ' ')} will be available here.
      </Typography>
    </Box>
  );

  const renderContent = () => {
    if (selectedCategory === 'timesheet') {
      switch (selectedSubItem) {
        case 'work-week':
          return renderWorkWeekContent();
        case 'time-format':
          return renderTimeFormatContent();
        case 'overtime-rule':
          return renderOvertimeRuleContent();
        default:
          return renderDefaultContent();
      }
    }
    return renderDefaultContent();
  };

  return (
    <Box className="settings-content-wrapper">
      {renderContent()}
    </Box>
  );
};

export default SettingsContent;
