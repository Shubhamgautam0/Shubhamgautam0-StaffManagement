import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { getStaffShifts } from '../../data/dataManager';
import type { StaffShiftInfo } from '../../data/dataManager';
import Calendar from './Calender';

interface StaffScheduleProps {
  staffId: string;
  staffName: string;
  staffInitials: string;
  staffColor?: string;
}

const StaffSchedule: React.FC<StaffScheduleProps> = ({
  staffId,
  staffName,
  staffInitials,
  staffColor = '#2196F3'
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date('2025-07-14'));
  const [staffShifts, setStaffShifts] = useState<StaffShiftInfo[]>([]);

  // Get shifts for selected date
  useEffect(() => {
    const dateStr = selectedDate.toISOString().split('T')[0];

    const shifts = getStaffShifts(staffId, {
      start: selectedDate,
      end: selectedDate
    });

    const dayShifts = shifts.filter(shift => shift.date === dateStr);
    setStaffShifts(dayShifts);
  }, [staffId, selectedDate]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const formatTime = (time: string) => {
    return time;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header with Legend */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h5" sx={{
          fontWeight: 600,
          color: 'var(--clr-text-primary)'
        }}>
          Schedule
        </Typography>

        {/* Legend */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#4CAF50'
            }} />
            <Typography variant="body2" sx={{ color: 'var(--clr-text-secondary)' }}>
              Accepted shift
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#FF9800'
            }} />
            <Typography variant="body2" sx={{ color: 'var(--clr-text-secondary)' }}>
              Pending Shift
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Calendar Component */}
      <Box sx={{ mb: 3 }}>
        <Calendar
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />
      </Box>

      {/* Selected Date Header */}
      <Box sx={{
        mb: 3,
        p: 2,
        backgroundColor: 'var(--clr-bg-light)',
        borderRadius: 2,
        border: `2px solid ${staffColor}20`
      }}>
        <Typography variant="h6" sx={{
          fontWeight: 600,
          color: 'var(--clr-text-primary)',
          mb: 1
        }}>
          📅 Selected Date: {selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--clr-text-secondary)' }}>
          {staffShifts.length} assignment{staffShifts.length !== 1 ? 's' : ''} for {staffName}
        </Typography>
      </Box>

      {/* Selected Date Assignments */}
      {staffShifts.length > 0 && (
        <Box>
          {staffShifts.map((shift, index) => (
            <Box key={shift.shiftId} sx={{
              display: 'flex',
              alignItems: 'center',
              py: 2,
              borderBottom: index < staffShifts.length - 1 ? '1px solid #f0f0f0' : 'none'
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
                  {selectedDate.getDate()}
                </Typography>
                <Typography variant="caption" sx={{
                  color: 'var(--clr-text-secondary)',
                  textTransform: 'uppercase'
                }}>
                  {formatDate(selectedDate)}
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
                  14123 Victory Boulevard, Van Nuys, CA, USA
                </Typography>
              </Box>

              {/* Time */}
              <Box sx={{
                textAlign: 'right',
                minWidth: 100
              }}>
                <Typography variant="body2" sx={{
                  color: 'var(--clr-text-secondary)',
                  fontWeight: 500
                }}>
                  {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* No assignments message */}
      {staffShifts.length === 0 && (
        <Box sx={{
          textAlign: 'center',
          py: 4,
          color: 'var(--clr-text-secondary)'
        }}>
          <Typography variant="body2">
            No assignments for {formatDate(selectedDate)}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default StaffSchedule;
