import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Switch, 
  FormControlLabel
} from '@mui/material';
import { defaultNotifyStaffSettings, type NotifyStaffSettings } from '../../../data/notificationSettingsData';

const NotifyStaff: React.FC = () => {
  const [settings, setSettings] = useState<NotifyStaffSettings>(defaultNotifyStaffSettings);

  const handleScheduleUpdatesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      scheduleUpdates: {
        ...settings.scheduleUpdates,
        enabled: event.target.checked
      }
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Notify Staff
      </Typography>

      <FormControlLabel
        control={
          <Switch 
            checked={settings.scheduleUpdates.enabled}
            onChange={handleScheduleUpdatesChange}
          />
        }
        label={settings.scheduleUpdates.description}
        sx={{ 
          '& .MuiFormControlLabel-label': {
            fontSize: '14px'
          }
        }}
      />
    </Box>
  );
};

export default NotifyStaff;
