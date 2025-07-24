import React, { useState } from 'react';
import { Box, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { defaultWeekendTimeRule, type WeekendTimeRule as WeekendTimeRuleType } from '../../../data/timesheetSettingsData';

const WeekendTimeRule: React.FC = () => {
  const [settings, setSettings] = useState<WeekendTimeRuleType>(defaultWeekendTimeRule);

  const handleEnabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      enabled: event.target.checked
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Weekend Time Rule
      </Typography>
      
      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
        Configure weekend time rule settings for your timesheet and payroll calculations.
      </Typography>

      <FormControlLabel
        control={
          <Checkbox 
            checked={settings.enabled}
            onChange={handleEnabledChange}
          />
        }
        label="Enable Weekend Time Rule"
        sx={{ mb: 3 }}
      />

      {settings.enabled && (
        <Box sx={{ ml: 4 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Weekend time rule configuration options will be displayed here.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default WeekendTimeRule;
