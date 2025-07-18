import React from 'react'
import { Box, Typography, Select, MenuItem, Button, TextField } from '@mui/material';


function SiteInvoice() {
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [timeRange, setTimeRange] = React.useState('Last Week');

    return (
         <Box sx={{ p: 4, height: '100%' }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4
      }}>
        <Typography variant="h4" sx={{
          fontWeight: 600,
          color: '#333',
          fontSize: '28px'
        }}>
            Site Invoice
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className='item-selector'
            >
              <MenuItem value="Last Week">Last Week</MenuItem>
              <MenuItem value="Last Month">Last Month</MenuItem>
              <MenuItem value="Last 3 Months">Last 3 Months</MenuItem>
              <MenuItem value="Custom Range">Custom Range</MenuItem>
            </Select>
        </Box>
      </Box>
       <Box sx={{
        display: 'flex',
        gap: 3,
        alignItems: 'flex-end',
        mb: 4
      }}>
        {/* Start Date */}
        <Box sx={{ flex: 1, maxWidth: 300 }}>
          <Typography variant="body2" className='form-field-label' >
            Start Date
          </Typography>
          <TextField
            fullWidth
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Select start date"
           type='date'
            className='input-field'
          />
        </Box>

        {/* End Date */}
        <Box sx={{ flex: 1, maxWidth: 300 }}>
          <Typography variant="body2" className='form-field-label' >
            End Date
          </Typography>
          <TextField
            fullWidth
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="Select end date"
            type='date'
            className='input-field'
          />
        </Box>

        {/* Search Button */}
        <Button
          variant="contained"
          className='btn-primary'
          sx={{height: '50px', }}
        >
          SEARCH
        </Button>
      </Box>
      </Box>
    )
}

export default SiteInvoice
