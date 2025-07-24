import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, FormControl } from '@mui/material';
import { defaultWorkWeekSettings,type WorkWeekSettings } from '../../../data/timesheetSettingsData';

const WorkWeek: React.FC = () => {
  const [settings, setSettings] = useState<WorkWeekSettings>(defaultWorkWeekSettings);

  const handleStartDayChange = (value: string) => {
    const workWeekDisplay = `Work week ${value.charAt(0).toUpperCase() + value.slice(1, 3)}-${
      value === 'tuesday' ? 'Mon' : 
      value === 'monday' ? 'Sun' :
      value === 'wednesday' ? 'Tue' :
      value === 'thursday' ? 'Wed' :
      value === 'friday' ? 'Thu' :
      value === 'saturday' ? 'Fri' :
      'Sat'
    }`;
    
    setSettings({
      startDay: value,
      workWeekDisplay
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Work week
      </Typography>
      
      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
        Your weekly schedule view and payroll calculation will also be based on this work week
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
          Start day
        </Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <Select
            value={settings.startDay}
            onChange={(e) => handleStartDayChange(e.target.value)}
            size="small"
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

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {settings.workWeekDisplay}
      </Typography>
    </Box>
  );
};

export default WorkWeek;
