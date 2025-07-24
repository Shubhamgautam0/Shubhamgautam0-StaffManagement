import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, FormControl } from '@mui/material';
import { defaultTimeFormatSettings,type TimeFormatSettings } from '../../../data/timesheetSettingsData';

const TimeFormat: React.FC = () => {
  const [settings, setSettings] = useState<TimeFormatSettings>(defaultTimeFormatSettings);

  const handleFormatChange = (value: '12-hour' | '24-hour') => {
    setSettings({
      ...settings,
      format: value
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Time Format
      </Typography>
      
      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
        {settings.description}
      </Typography>

      <FormControl sx={{ minWidth: 200 }}>
        <Select
          value={settings.format === '12-hour' ? 'AM PM Time - 05:00p' : '24 Hour Time - 17:00'}
          onChange={(e) => {
            const value = e.target.value;
            if (value.includes('AM PM')) {
              handleFormatChange('12-hour');
            } else {
              handleFormatChange('24-hour');
            }
          }}
          size="small"
        >
          <MenuItem value="AM PM Time - 05:00p">AM PM Time - 05:00p</MenuItem>
          <MenuItem value="24 Hour Time - 17:00">24 Hour Time - 17:00</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TimeFormat;
