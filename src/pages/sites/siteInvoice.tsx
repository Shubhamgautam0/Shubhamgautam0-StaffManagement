import React, { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, Button, TextField, Paper, Divider } from '@mui/material';
import { SiteData, type Shift } from '../../data/siteData';
import { getStaffById } from '../../data/staffData';


interface WorkSummary {
  date: string;
  shifts: Array<{
    startTime: string;
    endTime: string;
    hours: number;
    siteName: string;
    staffName: string;
  }>;
  totalHours: number;
}

function SiteInvoice() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [timeRange, setTimeRange] = useState('Last Week');
    const [workSummary, setWorkSummary] = useState<WorkSummary[]>([]);
    const [totalHours, setTotalHours] = useState(0);

    // Set default dates based on time range
    useEffect(() => {
        const today = new Date();
        let start: Date;
        let end: Date = today;

        switch (timeRange) {
            case 'Last Week':
                start = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case 'Last Month':
                start = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                break;
            case 'Last 3 Months':
                start = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
                break;
            default:
                start = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        }

        setStartDate(start.toISOString().split('T')[0]);
        setEndDate(end.toISOString().split('T')[0]);
    }, [timeRange]);

    // Calculate work hours for date range
    const calculateWorkHours = () => {
        if (!startDate || !endDate) return;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const workData: { [key: string]: WorkSummary } = {};
        let total = 0;

        // Process all sites and their shifts
        SiteData.forEach(site => {
            if (site.shifts) {
                Object.entries(site.shifts).forEach(([date, shifts]) => {
                    const shiftDate = new Date(date);

                    // Check if date is within range
                    if (shiftDate >= start && shiftDate <= end) {
                        shifts.forEach(shift => {
                            // Calculate shift hours
                            const startTime = new Date(`2000-01-01T${shift.startTime}`);
                            const endTime = new Date(`2000-01-01T${shift.endTime}`);

                            // Handle overnight shifts
                            if (endTime < startTime) {
                                endTime.setDate(endTime.getDate() + 1);
                            }

                            const durationMs = endTime.getTime() - startTime.getTime();
                            const hours = durationMs / (1000 * 60 * 60);

                            // Get staff names
                            const staffNames = shift.assignedStaff.map(staffId => {
                                const staff = getStaffById(staffId);
                                return staff ? staff.name : 'Unknown Staff';
                            }).join(', ');

                            // Group by date
                            if (!workData[date]) {
                                workData[date] = {
                                    date,
                                    shifts: [],
                                    totalHours: 0
                                };
                            }

                            workData[date].shifts.push({
                                startTime: shift.startTime,
                                endTime: shift.endTime,
                                hours: Math.round(hours * 10) / 10,
                                siteName: site.name,
                                staffName: staffNames
                            });

                            workData[date].totalHours += hours;
                            total += hours;
                        });
                    }
                });
            }
        });

        // Convert to array and sort by date
        const summaryArray = Object.values(workData).sort((a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        setWorkSummary(summaryArray);
        setTotalHours(Math.round(total * 10) / 10);
    };

    // Auto-calculate when dates change
    useEffect(() => {
        calculateWorkHours();
    }, [startDate, endDate]);

    const handleSearch = () => {
        calculateWorkHours();
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short'
        });
    };

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
            value={startDate}
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
          onClick={handleSearch}
        >
          SEARCH
        </Button>

        {/* Total Hours Display */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          ml: 2
        }}>
          <Typography variant="h6" sx={{
            fontWeight: 600,
            color: '#333'
          }}>
            {totalHours} hrs
          </Typography>
          <Typography variant="body2" sx={{
            color: '#666',
            fontSize: '14px'
          }}>
            ⋮
          </Typography>
        </Box>
      </Box>

      {/* Work Summary */}
      <Box sx={{ mt: 4 }}>
        {workSummary.length > 0 ? (
          workSummary.map((daySummary) => (
            <Paper
              key={daySummary.date}
              sx={{
                mb: 3,
                p: 3,
                border: '1px solid #f0f0f0',
                boxShadow: 'none',
                borderRadius: 2
              }}
            >
              {/* Date Header */}
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2
              }}>
                <Box>
                  <Typography variant="h6" sx={{
                    fontWeight: 600,
                    color: '#333',
                    fontSize: '18px'
                  }}>
                    {formatDate(daySummary.date)}
                  </Typography>
                  <Typography variant="body2" sx={{
                    color: '#666',
                    fontSize: '14px'
                  }}>
                    {new Date(daySummary.date).toLocaleDateString('en-US', {
                      weekday: 'long'
                    })}
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{
                  fontWeight: 600,
                  color: '#333'
                }}>
                  {Math.round(daySummary.totalHours * 10) / 10} hrs
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Shifts List */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {daySummary.shifts.map((shift, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: 1
                    }}
                  >
                    <Typography variant="body1" sx={{
                      color: '#333',
                      fontWeight: 500
                    }}>
                      {shift.startTime} - {shift.endTime}
                    </Typography>
                    <Box sx={{
                      display: 'flex',
                      gap: 2,
                      alignItems: 'center'
                    }}>
                      <Typography variant="body2" sx={{
                        color: '#666',
                        fontSize: '14px'
                      }}>
                        {shift.siteName} • {shift.staffName}
                      </Typography>
                      <Typography variant="body2" sx={{
                        color: '#333',
                        fontWeight: 500,
                        minWidth: '50px',
                        textAlign: 'right'
                      }}>
                        {shift.hours} hrs
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          ))
        ) : (
          <Paper sx={{
            p: 4,
            textAlign: 'center',
            border: '1px solid #f0f0f0',
            boxShadow: 'none'
          }}>
            <Typography variant="body1" sx={{
              color: '#666',
              fontSize: '16px'
            }}>
              No work data found for the selected date range
            </Typography>
          </Paper>
        )}
      </Box>
      </Box>
    )
}

export default SiteInvoice
