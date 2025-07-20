import { MoreVert } from '@mui/icons-material'
import { Box, Button, MenuItem, Select, TextField, Typography, Paper } from '@mui/material'
import { useState, useEffect } from 'react'
import { getStaffShifts } from '../../data/dataManager';
import type { StaffShiftInfo } from '../../data/dataManager';

interface TimesheetProps {
  staffId: string;
  staffName: string;
}

const Timesheet: React.FC<TimesheetProps> = ({ staffId, staffName }) => {
    const [timeperiod, setTimeperiod] = useState<'Last Week' | 'Last two week' | 'Last month'>('Last Week')
    const [startDate, setStartDate] = useState('2025-07-01');
    const [endDate, setEndDate] = useState('2025-07-20');
    const [timesheetData, setTimesheetData] = useState<StaffShiftInfo[]>([]);
    const [totalHours, setTotalHours] = useState({ hours: 0, minutes: 0 });

    // Calculate total hours from time string
    const calculateHours = (startTime: string, endTime: string) => {
        const [startHour, startMin] = startTime.split(':').map(Number);
        const [endHour, endMin] = endTime.split(':').map(Number);

        const startTotalMin = startHour * 60 + startMin;
        const endTotalMin = endHour * 60 + endMin;

        let diffMin = endTotalMin - startTotalMin;
        if (diffMin < 0) diffMin += 24 * 60; // Handle overnight shifts

        return {
            hours: Math.floor(diffMin / 60),
            minutes: diffMin % 60
        };
    };

    // Search timesheet data
    const handleSearch = () => {
        if (!startDate || !endDate || !staffId) return;

        const start = new Date(startDate);
        const end = new Date(endDate);

        const shifts = getStaffShifts(staffId, { start, end });

        // Filter shifts within date range
        const filteredShifts = shifts.filter(shift => {
            const shiftDate = new Date(shift.date);
            return shiftDate >= start && shiftDate <= end;
        });

        setTimesheetData(filteredShifts);

        // Calculate total hours
        let totalMinutes = 0;
        filteredShifts.forEach(shift => {
            const duration = calculateHours(shift.startTime, shift.endTime);
            totalMinutes += duration.hours * 60 + duration.minutes;
        });

        setTotalHours({
            hours: Math.floor(totalMinutes / 60),
            minutes: totalMinutes % 60
        });
    };

    // Auto search when component mounts or staffId changes
    useEffect(() => {
        handleSearch();
    }, [staffId]);

    // Format date for display
    const formatDisplayDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return {
            day: date.getDate(),
            month: date.toLocaleDateString('en-US', { month: 'short' })
        };
    };

    // Format time for display
    const formatTime = (time: string) => {
        return time;
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', m: '30px 30px 0 30px' }}>
                <Typography variant='h6' sx={{ fontWeight: 600 }} >
                    Timesheet
                </Typography>
                <Select
                    value={timeperiod}
                    onChange={(e) => setTimeperiod(e.target.value as 'Last Week' | 'Last two week' | 'Last month')}
                    className='item-selector'
                >
                    <MenuItem value="Last Week">Last Week</MenuItem>
                    <MenuItem value="Last two week">Last two week</MenuItem>
                    <MenuItem value="Last month">Last month</MenuItem>
                </Select>
            </Box>

            {/* Date Range Search */}
            <Box sx={{ width: '100%', p: 3, bgcolor: 'white', display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'end' }}>
                <Box>
                    <Typography variant="subtitle2" className='form-field-label' sx={{ color: 'var(--clr-text-secondary)', mb: 1 }}>
                        Start date
                    </Typography>
                    <TextField
                        type="date"
                        size="small"
                        className="input-field"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        sx={{ minWidth: 150 }}
                    />
                </Box>
                <Box>
                    <Typography variant="subtitle2" className='form-field-label' sx={{ color: 'var(--clr-text-secondary)', mb: 1 }}>
                        End date
                    </Typography>
                    <TextField
                        type="date"
                        size="small"
                        className="input-field"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        sx={{ minWidth: 150 }}
                    />
                </Box>
                <Button
                    variant="contained"
                    onClick={handleSearch}
                    sx={{
                        height: 40,
                        backgroundColor: '#6366F1',
                        color: 'white',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        px: 3,
                        '&:hover': {
                            backgroundColor: '#5856EB'
                        }
                    }}>
                    SEARCH
                </Button>
                <MoreVert sx={{ height: 40, color: 'var(--clr-text-secondary)', cursor: 'pointer' }} />
            </Box>

            {/* Total Hours Display */}
            {timesheetData.length > 0 && (
                <Box sx={{ px: 3, pb: 2 }}>
                    <Typography variant="body2" sx={{
                        textAlign: 'right',
                        color: 'var(--clr-text-secondary)',
                        fontWeight: 500
                    }}>
                        Total Payroll Hours: {totalHours.hours} hrs {totalHours.minutes} mins
                    </Typography>
                </Box>
            )}

            {/* Timesheet Results */}
            <Box sx={{ px: 3, pb: 3 }}>
                {timesheetData.length === 0 ? (
                    <Paper sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ color: 'var(--clr-text-secondary)' }}>
                            No timesheet data found for the selected date range
                        </Typography>
                    </Paper>
                ) : (
                    <Box>
                        {timesheetData.map((shift, index) => {
                            const displayDate = formatDisplayDate(shift.date);
                            const duration = calculateHours(shift.startTime, shift.endTime);

                            return (
                                <Paper key={shift.shiftId} sx={{
                                    mb: 2,
                                    p: 0,
                                    border: '1px solid #f0f0f0',
                                    boxShadow: 'none'
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 3
                                    }}>
                                        {/* Date */}
                                        <Box sx={{
                                            minWidth: 60,
                                            textAlign: 'center',
                                            mr: 3
                                        }}>
                                            <Typography variant="h6" sx={{
                                                fontWeight: 600,
                                                color: 'var(--clr-text-primary)',
                                                lineHeight: 1
                                            }}>
                                                {displayDate.day}
                                            </Typography>
                                            <Typography variant="caption" sx={{
                                                color: 'var(--clr-text-secondary)',
                                                textTransform: 'uppercase'
                                            }}>
                                                {displayDate.month}
                                            </Typography>
                                        </Box>

                                        {/* Site Info */}
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="subtitle1" sx={{
                                                fontWeight: 600,
                                                color: 'var(--clr-text-primary)',
                                                mb: 0.5
                                            }}>
                                                {shift.siteName}
                                            </Typography>
                                            <Typography variant="body2" sx={{
                                                color: 'var(--clr-text-secondary)'
                                            }}>
                                                {shift.siteName}
                                            </Typography>
                                        </Box>

                                        {/* Time and Duration */}
                                        <Box sx={{
                                            textAlign: 'right',
                                            minWidth: 120
                                        }}>
                                            <Typography variant="body2" sx={{
                                                color: 'var(--clr-text-secondary)',
                                                fontWeight: 500,
                                                mb: 0.5
                                            }}>
                                                {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                                            </Typography>
                                            <Typography variant="body2" sx={{
                                                color: 'var(--clr-text-primary)',
                                                fontWeight: 600
                                            }}>
                                                {duration.hours} hrs {duration.minutes} mins
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            );
                        })}
                    </Box>
                )}
            </Box>
        </>
    )
}

export default Timesheet
