import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Radio, 
  RadioGroup, 
  FormControlLabel,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import { defaultPayrollTimeSettings,type PayrollTimeSettings } from '../../../data/timesheetSettingsData';

const PayrollTime: React.FC = () => {
  const [settings, setSettings] = useState<PayrollTimeSettings>({
    ...defaultPayrollTimeSettings,
    roundUpTime: 'Based on Round-up Time'
  });

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.value as 'schedule-time' | 'clock-in-time';
    setSettings({
      ...settings,
      type,
      roundUpTime: type === 'clock-in-time' ? 'Based on Round-up Time' : undefined
    });
  };

  const handleRoundUpTimeChange = (value: string) => {
    setSettings({
      ...settings,
      roundUpTime: value
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Payroll time
      </Typography>

      <RadioGroup
        value={settings.type}
        onChange={handleTypeChange}
        sx={{ mb: 3 }}
      >
        <FormControlLabel
          value="schedule-time"
          control={<Radio />}
          label="Schedule Time"
        />
        <FormControlLabel
          value="clock-in-time"
          control={<Radio />}
          label="Clock in Time"
        />
      </RadioGroup>

      {settings.type === 'clock-in-time' && (
        <Box sx={{ ml: 4, mb: 3 }}>
          <FormControl sx={{ minWidth: 200, mb: 2 }}>
            <Select
              value={settings.roundUpTime}
              onChange={(e) => handleRoundUpTimeChange(e.target.value)}
              size="small"
            >
              <MenuItem value="Based on Round-up Time">Based on Round-up Time</MenuItem>
              <MenuItem value="0 Min">0 Min</MenuItem>
              <MenuItem value="5 Min">5 Min</MenuItem>
              <MenuItem value="10 Min">10 Min</MenuItem>
              <MenuItem value="15 Min">15 Min</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Choose Round-up Time
          </Typography>
          
          <FormControl sx={{ minWidth: 100, mb: 2 }}>
            <Select
              value="0 Min"
              size="small"
            >
              <MenuItem value="0 Min">0 Min</MenuItem>
              <MenuItem value="5 Min">5 Min</MenuItem>
              <MenuItem value="10 Min">10 Min</MenuItem>
              <MenuItem value="15 Min">15 Min</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Round Up time is the closest time as per the selection made above. eg.
            If the round up hour is 15 minute, then the payroll time will be
            displayed in the segments of 15 mins only. 9:05 will be converted to
            9:00 and 9:12 will be converted to 9:15.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PayrollTime;
