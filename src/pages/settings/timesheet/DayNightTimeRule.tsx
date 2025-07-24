import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Checkbox, 
  FormControlLabel,
  TextField,
  InputAdornment
} from '@mui/material';
import { defaultDayNightTimeRule, type DayNightTimeRule as DayNightTimeRuleType } from '../../../data/timesheetSettingsData';

const DayNightTimeRule: React.FC = () => {
  const [settings, setSettings] = useState<DayNightTimeRuleType>(defaultDayNightTimeRule);

  const handleEnabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      enabled: event.target.checked
    });
  };

  const handleTimeChange = (field: 'dayStart' | 'dayEnd') => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSettings({
      ...settings,
      [field]: value,
      description: `Day shift - ${field === 'dayStart' ? value : settings.dayStart} to ${field === 'dayEnd' ? value : settings.dayEnd} | Night shift - ${field === 'dayEnd' ? value : settings.dayEnd} to ${field === 'dayStart' ? value : settings.dayStart}`
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Day/Night Time Rule
      </Typography>
      
      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
        Your timesheet and payroll calculation will also be based on Day/Night Time rule settings.
      </Typography>

      <FormControlLabel
        control={
          <Checkbox 
            checked={settings.enabled}
            onChange={handleEnabledChange}
          />
        }
        label="Enable Day/Night Time Rule"
        sx={{ mb: 3 }}
      />

      {settings.enabled && (
        <Box sx={{ ml: 4 }}>
          <Typography variant="body2" sx={{ mb: 2, fontWeight: 500 }}>
            Day Time
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
            <TextField
              size="small"
              value={settings.dayStart}
              onChange={handleTimeChange('dayStart')}
              sx={{ width: 100 }}
              placeholder="06:00a"
            />
            <Typography variant="body2">to</Typography>
            <TextField
              size="small"
              value={settings.dayEnd}
              onChange={handleTimeChange('dayEnd')}
              sx={{ width: 100 }}
              placeholder="06:00p"
            />
          </Box>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {settings.description}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default DayNightTimeRule;
