import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Checkbox, 
  FormControlLabel,
  InputAdornment 
} from '@mui/material';
import { defaultOvertimeRule, type OvertimeRule as OvertimeRuleType } from '../../../data/timesheetSettingsData';

const OvertimeRule: React.FC = () => {
  const [settings, setSettings] = useState<OvertimeRuleType>(defaultOvertimeRule);

  const handleInputChange = (field: keyof OvertimeRuleType) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.type === 'checkbox' 
      ? event.target.checked 
      : Number(event.target.value);
    
    setSettings({
      ...settings,
      [field]: value
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Overtime Rule
      </Typography>
      
      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
        Your timesheet and payroll calculation will also be based on Overtime rule settings.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormControlLabel
          control={
            <Checkbox 
              checked={settings.weeklyOvertimeAfter > 0}
              onChange={(e) => {
                setSettings({
                  ...settings,
                  weeklyOvertimeAfter: e.target.checked ? 40 : 0
                });
              }}
            />
          }
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2">Weekly Overtime After</Typography>
              <TextField
                size="small"
                value={settings.weeklyOvertimeAfter}
                onChange={handleInputChange('weeklyOvertimeAfter')}
                sx={{ width: 80 }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">Hours/Week</InputAdornment>
                }}
              />
            </Box>
          }
        />

        <FormControlLabel
          control={
            <Checkbox 
              checked={settings.dailyOvertimeAfter > 0}
              onChange={(e) => {
                setSettings({
                  ...settings,
                  dailyOvertimeAfter: e.target.checked ? 8 : 0
                });
              }}
            />
          }
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2">Daily Overtime After</Typography>
              <TextField
                size="small"
                value={settings.dailyOvertimeAfter}
                onChange={handleInputChange('dailyOvertimeAfter')}
                sx={{ width: 80 }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">Hours/Day</InputAdornment>
                }}
              />
            </Box>
          }
        />

        <FormControlLabel
          control={
            <Checkbox 
              checked={settings.dailyDoubletimeAfter > 0}
              onChange={(e) => {
                setSettings({
                  ...settings,
                  dailyDoubletimeAfter: e.target.checked ? 12 : 0
                });
              }}
            />
          }
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2">Daily Doubletime After</Typography>
              <TextField
                size="small"
                value={settings.dailyDoubletimeAfter}
                onChange={handleInputChange('dailyDoubletimeAfter')}
                sx={{ width: 80 }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">Hours/Day</InputAdornment>
                }}
              />
            </Box>
          }
        />

        <FormControlLabel
          control={
            <Checkbox 
              checked={settings.californiaRule}
              onChange={handleInputChange('californiaRule')}
            />
          }
          label="7th day overtime rule(California Law)"
        />

        {settings.californiaRule && (
          <Typography variant="body2" sx={{ color: 'text.secondary', ml: 4 }}>
            {settings.californiaRuleDescription}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default OvertimeRule;
