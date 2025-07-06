import { MoreVert } from '@mui/icons-material'
import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useState } from 'react'


const Timesheet = () => {
    const [timeperiod, setTimeperiod] = useState<'Last week' | 'Last two week' | 'Last month'>('Last week')

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', m: '30px 30px 0 30px' }}>
                <Typography variant='h6' sx={{ fontWeight: 600 }} >
                    Timesheet
                </Typography>
                <Select
                    value={timeperiod}
                    onChange={(e) => setTimeperiod(e.target.value as 'Last week' | 'Last two week' | 'Last month')}
                    className='item-selector'
                >
                    <MenuItem value="Last week">Last week</MenuItem>
                    <MenuItem value="Last two week">Last two week</MenuItem>
                    <MenuItem value="Last month">Last month</MenuItem>
                </Select>
            </Box>
            <Box sx={{ width: '100%', height: '100%', p: 3, bgcolor: 'white', display: 'flex', flexDirection: 'row', gap: 4, overflow: 'auto' }}>
                <Box>
                    <Typography variant="subtitle2" className='form-field-label' >
                        Start Date
                    </Typography>
                    <TextField type="date" size="small" className="input-field" />
                </Box>
                <Box>
                    <Typography variant="subtitle2" className='form-field-label' >
                        End Date
                    </Typography>
                    <TextField type="date" size="small" className="input-field" />
                </Box>
                <Button variant="contained"
                    className='btn-primary'
                    sx={{
                        mt: 3.5,
                        height: 40,
                    }}>
                    Search
                </Button>
                <MoreVert sx={{ mt: 3.5, height: 40 }} />
            </Box>
        </>
    )
}

export default Timesheet
