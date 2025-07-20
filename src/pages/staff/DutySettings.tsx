import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Paper,
  Alert,
} from '@mui/material';
import {
  updateStaffDutySettings,
  getStaffDutySettings,
  type StaffDutySettings
} from '../../data/staffData';

interface DutySettingsProps {
  staffId: string;
  staffName: string;
}

function DutySettings({ staffId, staffName }: DutySettingsProps) {
  const [clockInOut, setClockInOut] = useState<'default' | 'enabled' | 'disabled'>('default');
  const [emailNotifications, setEmailNotifications] = useState<'default' | 'enable' | 'disable'>('default');
  const [saveMessage, setSaveMessage] = useState<string>('');

  // Load staff duty settings when component mounts or staffId changes
  useEffect(() => {
    if (staffId) {
      const dutySettings = getStaffDutySettings(staffId);
      if (dutySettings) {
        setClockInOut(dutySettings.clockInOut);
        setEmailNotifications(dutySettings.emailNotifications);
      } else {
        // Reset to defaults if no duty settings data
        setClockInOut('default');
        setEmailNotifications('default');
      }
    }
  }, [staffId]);

  // Auto-save when settings change
  useEffect(() => {
    if (staffId && (clockInOut !== 'default' || emailNotifications !== 'default')) {
      const dutySettings: StaffDutySettings = {
        clockInOut,
        emailNotifications
      };

      const success = updateStaffDutySettings(staffId, dutySettings);
      if (success) {
        setSaveMessage('Duty settings updated successfully!');
        setTimeout(() => setSaveMessage(''), 2000);
      }
    }
  }, [clockInOut, emailNotifications, staffId]);

  const handleClockInOutChange = (value: string) => {
    setClockInOut(value as 'default' | 'enabled' | 'disabled');
  };

  const handleEmailNotificationsChange = (value: string) => {
    setEmailNotifications(value as 'default' | 'enable' | 'disable');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'var(--clr-text-primary)' }}>
        Duty Settings
      </Typography>

      {/* Save Message */}
      {saveMessage && (
        <Box sx={{ mb: 3 }}>
          <Alert severity="success" sx={{ fontSize: '0.875rem' }}>
            {saveMessage}
          </Alert>
        </Box>
      )}

      {/* Clock In/Out Setting */}
      <Paper sx={{ 
        p: 3, 
        mb: 3, 
        border: '1px solid #e0e0e0',
        boxShadow: 'none',
        borderRadius: 1
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 1
        }}>
          <Typography variant="body1" sx={{ 
            fontWeight: 500,
            color: 'var(--clr-text-primary)'
          }}>
            Clock In/Out
          </Typography>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={clockInOut}
              onChange={(e) => handleClockInOutChange(e.target.value)}
              displayEmpty
              sx={{
                backgroundColor: 'white',
                '& .MuiSelect-select': {
                  color: 'var(--clr-text-secondary)',
                  fontSize: '0.875rem'
                }
              }}
            >
              <MenuItem value="default">default</MenuItem>
              <MenuItem value="enabled">enabled</MenuItem>
              <MenuItem value="disabled">disabled</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Email Notifications Setting */}
      <Paper sx={{ 
        p: 3, 
        border: '1px solid #e0e0e0',
        boxShadow: 'none',
        borderRadius: 1
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          mb: 2
        }}>
          <Typography variant="body1" sx={{ 
            fontWeight: 500,
            color: 'var(--clr-text-primary)',
            flex: 1
          }}>
            Notify Staff via email about Schedule Updates
          </Typography>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={emailNotifications}
              onChange={(e) => handleEmailNotificationsChange(e.target.value)}
              displayEmpty
              sx={{
                backgroundColor: 'white',
                '& .MuiSelect-select': {
                  color: 'var(--clr-text-secondary)',
                  fontSize: '0.875rem'
                }
              }}
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="enable">Enable</MenuItem>
              <MenuItem value="disable">Disable</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <Typography variant="body2" sx={{ 
          color: 'var(--clr-text-secondary)',
          fontStyle: 'italic',
          fontSize: '0.8rem'
        }}>
          Default: Enable
        </Typography>
      </Paper>
    </Box>
  );
}

export default DutySettings;
