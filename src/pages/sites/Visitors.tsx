import React from 'react'
import { Box, Typography, Select, MenuItem, Button, TextField } from '@mui/material';


function Visitors() {
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [timeRange, setTimeRange] = React.useState('Last Week');

    return (
        <Box sx={{ p: 4, height: '100%' }}>
            <Typography variant="h4" sx={{
                fontWeight: 600,
                color: '#333',
                fontSize: '28px',
                mb: 2
            }}>
                Visitors
            </Typography>
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

                <Button
                    variant="contained"
                    className='btn-primary'
                    sx={{ height: '50px', }}
                >
                    SEARCH
                </Button>
            </Box>
        </Box>
    )
}

export default Visitors
