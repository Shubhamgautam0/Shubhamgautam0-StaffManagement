import React, { useState } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';

interface RateProps {
  siteId?: string;
}

function Rate({ siteId }: RateProps) {
  const [rateSetting, setRateSetting] = useState('Company Settings');

  const handleRateSettingChange = (value: string) => {
    setRateSetting(value);
  };

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'row', gap: 2 }}>
      <Typography variant="h4" sx={{
        fontWeight: 600,
        color: 'var(--clr-text-primary)',
        fontSize: '28px',
        mt: 1
      }}>
        Bill Rates
      </Typography>
      <Select
        value={rateSetting}
        className='item-selector'
        onChange={(e) => handleRateSettingChange(e.target.value)}
      >
        <MenuItem value="Company Settings">Company Settings</MenuItem>
        <MenuItem value="Custom Settings">Custom Settings</MenuItem>
      </Select>
    </Box>
  );
}

export default Rate;
