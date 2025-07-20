import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
} from '@mui/material';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Close,
  Add,
} from '@mui/icons-material';
import { staffData, type StaffMember, getStaffById } from '../../data/staffData';
import { getStaffShifts, getUnassignedShifts, type StaffShiftInfo, assignStaffToShift } from '../../data/dataManager';
import AddShiftDrawer from '../../components/shifts/AddShiftDrawer';
import { type Shift, addShiftToSite } from '../../data/siteData';

interface StaffViewProps {
  currentWeekStart: Date;
  onNavigateWeek: (direction: 'prev' | 'next') => void;
  onClose: () => void;
}

const StaffView: React.FC<StaffViewProps> = ({ currentWeekStart, onNavigateWeek, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddShiftOpen, setIsAddShiftOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [refreshKey, setRefreshKey] = useState(0);

  // Handle shift save
  const handleShiftSave = (shift: Shift) => {
    // Add shift to site data
    const success = addShiftToSite(shift.siteId, shift);
    if (success) {
      console.log('Shift added successfully:', shift);
      setIsAddShiftOpen(false);
      // Force re-render by updating refresh key
      setRefreshKey(prev => prev + 1);
    } else {
      console.error('Failed to add shift');
    }
  };

  const getWeekDates = (startDate: Date) => {
    const dates = [];
    // Force to July 14, 2025 week for testing
    const start = new Date('2025-07-14');
    start.setDate(start.getDate() - start.getDay() + 1); // Start from Monday

    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates(currentWeekStart);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric'
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Filter staff based on search term
  const filteredStaff = staffData.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );



  const getShiftsForStaffAndDate = (staffId: string, date: Date): StaffShiftInfo[] => {
    const dateStr = date.toISOString().split('T')[0];

    const allShifts = getStaffShifts(staffId, {
      start: date,
      end: date
    });

    console.log(`Debug - Staff ${staffId} on ${dateStr}:`, allShifts);
    return allShifts.filter(shift => shift.date === dateStr);
  };

  // Get unassigned shifts for a date using dataManager
  const getUnassignedShiftsForDate = (date: Date) => {
    const unassignedShifts = getUnassignedShifts({
      start: date,
      end: date
    });

    const dateStr = date.toISOString().split('T')[0];
    return unassignedShifts.filter(shift => shift.date === dateStr);
  };

  return (
    <Box sx={{ height: '100vh', paddingTop: '64px', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--clr-bg-lightest)' }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        borderBottom: '1px solid var(--clr-border-light)',
        backgroundColor: 'var(--clr-white)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => onNavigateWeek('prev')} size="small">
            <ChevronLeft />
          </IconButton>

          <Typography variant="h6" sx={{
            fontWeight: 600,
            color: 'var(--clr-text-primary)',
            minWidth: '200px'
          }}>
            {weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </Typography>

          <IconButton onClick={() => onNavigateWeek('next')} size="small">
            <ChevronRight />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" sx={{ color: 'var(--clr-text-primary)', fontWeight: 600 }}>
            Staff View
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </Box>

      {/* Search Bar */}
      <Box sx={{ p: 2, borderBottom: '1px solid var(--clr-border-light)', backgroundColor: 'var(--clr-white)' }}>
        <TextField
          fullWidth
          placeholder="Search staff"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'var(--clr-text-tertiary)', fontSize: '20px' }} />
                </InputAdornment>
              ),
            }
          }}
          sx={{
            maxWidth: '400px',
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'var(--clr-white)',
              '& fieldset': {
                borderColor: 'var(--clr-border-light)',
              },
              '&:hover fieldset': {
                borderColor: 'var(--clr-purple)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'var(--clr-purple)',
              },
            },
          }}
        />
      </Box>

      {/* Unified Table Structure */}
      <Box sx={{ flex: 1, overflow: 'auto', backgroundColor: 'var(--clr-bg-lightest)' }}>
        {/* Table Header */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: '300px repeat(7, 1fr)',
          borderBottom: '2px solid var(--clr-border-light)',
          backgroundColor: 'var(--clr-white)',
          position: 'sticky',
          top: 0,
          zIndex: 1
        }}>
          {/* Staff Column Header */}
          <Box sx={{
            p: 2,
            borderRight: '1px solid var(--clr-border-light)',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--clr-bg-light)'
          }}>
            <Typography variant="h6" sx={{
              fontWeight: 600,
              color: 'var(--clr-text-primary)',
              fontSize: '14px'
            }}>
              Staff
            </Typography>
          </Box>

          {/* Date Column Headers */}
          {weekDates.map((date, index) => (
            <Box
              key={index}
              sx={{
                p: 2,
                textAlign: 'center',
                borderRight: index < 6 ? '1px solid var(--clr-border-light)' : 'none',
                backgroundColor: 'var(--clr-bg-light)',
              }}
            >
              <Typography variant="body2" sx={{
                fontWeight: 600,
                color: isToday(date) ? 'var(--clr-purple)' : 'var(--clr-text-primary)',
                fontSize: '12px'
              }}>
                {formatDate(date)}
              </Typography>
              <Typography variant="caption" sx={{
                color: 'var(--clr-text-secondary)',
                fontSize: '10px',
                display: 'block',
                mt: 0.5
              }}>
                {date.getDate()}
              </Typography>
              {isToday(date) && (
                <Box sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: 'var(--clr-purple)',
                  margin: '4px auto 0'
                }} />
              )}
            </Box>
          ))}
        </Box>

        {/* Unassigned Shifts Row */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: '300px repeat(7, 1fr)',
          borderBottom: '1px solid var(--clr-border-light)',
          minHeight: '80px',
          backgroundColor: 'var(--clr-white)',
        }}>
          {/* Unassigned Label Cell */}
          <Box sx={{
            p: 2,
            borderRight: '1px solid var(--clr-border-light)',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            minHeight: '80px',
            backgroundColor: '#ffebee'
          }}>
            <Avatar sx={{
              bgcolor: '#f44336',
              color: 'var(--clr-white)',
              width: 32,
              height: 32,
              fontSize: '16px',
              fontWeight: 600
            }}>
              ❌
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{
                fontWeight: 600,
                color: '#d32f2f',
                fontSize: '14px'
              }}>
                Shift Without Staff
              </Typography>
              <Typography variant="caption" sx={{
                color: '#d32f2f',
                fontSize: '12px'
              }}>
                Unassigned shifts
              </Typography>
            </Box>
          </Box>

          {/* Unassigned Shifts Cells */}
          {weekDates.map((date, dateIndex) => {
            const unassignedShifts = getUnassignedShiftsForDate(date);
            return (
              <Box
                key={dateIndex}
                sx={{
                  p: 1,
                  borderRight: dateIndex < 6 ? '1px solid var(--clr-border-light)' : 'none',
                  position: 'relative',
                  minHeight: '80px',
                  backgroundColor: '#ffebee',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start'
                }}
              >
                {unassignedShifts.map((shift) => (
                  <Box
                    key={shift.id}
                    sx={{
                      mb: 1,
                      p: 1,
                      borderRadius: 1,
                      backgroundColor: '#ffcdd2',
                      border: '1px solid #f44336',
                      cursor: 'pointer',
                    }}
                  >
                    <Typography variant="caption" sx={{
                      color: '#d32f2f',
                      fontSize: '10px',
                      fontWeight: 600,
                      display: 'block'
                    }}>
                      {shift.startTime} - {shift.endTime}
                    </Typography>
                    <Typography variant="caption" sx={{
                      color: '#d32f2f',
                      fontSize: '9px',
                      display: 'block'
                    }}>
                      {shift.siteName}
                    </Typography>
                  </Box>
                ))}
              </Box>
            );
          })}
        </Box>

        {/* Staff Rows */}
        {filteredStaff.map((staff) => (
          <Box
            key={`${staff.id}-${refreshKey}`}
            sx={{
              display: 'grid',
              gridTemplateColumns: '300px repeat(7, 1fr)',
              borderBottom: '1px solid var(--clr-border-light)',
              minHeight: '80px',
              backgroundColor: 'var(--clr-white)',
              '&:hover': {
                backgroundColor: 'var(--clr-bg-lightest)',
              },
            }}
          >
            {/* Staff Info Cell */}
            <Box sx={{
              p: 2,
              borderRight: '1px solid var(--clr-border-light)',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              minHeight: '80px'
            }}>
              <Avatar sx={{
                bgcolor: staff.color || 'var(--clr-purple)',
                color: 'var(--clr-white)',
                width: 32,
                height: 32,
                fontSize: '12px',
                fontWeight: 600
              }}>
                {staff.initials}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{
                  fontWeight: 600,
                  color: 'var(--clr-text-primary)',
                  fontSize: '14px'
                }}>
                  {staff.name}
                </Typography>
                <Typography variant="caption" sx={{
                  color: 'var(--clr-text-secondary)',
                  fontSize: '12px'
                }}>
                  {staff.phone}
                </Typography>
              </Box>
            </Box>

            {/* Calendar Cells */}
            {weekDates.map((date, dateIndex) => {
              const shifts = getShiftsForStaffAndDate(staff.id, date);
              return (
                <Box
                  key={dateIndex}
                  sx={{
                    p: 1,
                    borderRight: dateIndex < 6 ? '1px solid var(--clr-border-light)' : 'none',
                    position: 'relative',
                    minHeight: '80px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start'
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSelectedStaffId(staff.id);
                      setSelectedDate(date);
                      setIsAddShiftOpen(true);
                    }}
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      width: 20,
                      height: 20,
                      backgroundColor: 'var(--clr-bg-light)',
                      color: 'var(--clr-text-tertiary)',
                      '&:hover': {
                        backgroundColor: 'var(--clr-purple)',
                        color: 'var(--clr-white)',
                      },
                    }}
                  >
                    <Add sx={{ fontSize: '14px' }} />
                  </IconButton>

                  <Box sx={{ mt: 3, flex: 1 }}>
                    {shifts.length > 0 ? (
                      shifts.map((shift) => (
                        <Box
                          key={shift.shiftId}
                          sx={{
                            mb: 1,
                            p: 1,
                            borderRadius: 1,
                            backgroundColor: (staff.color || '#2196F3') + '20',
                            border: `1px solid ${staff.color || '#2196F3'}`,
                            cursor: 'pointer',
                          }}
                        >
                          <Typography variant="caption" sx={{
                            color: staff.color || '#2196F3',
                            fontSize: '10px',
                            fontWeight: 600,
                            display: 'block'
                          }}>
                            {shift.startTime} - {shift.endTime}
                          </Typography>
                          <Typography variant="caption" sx={{
                            color: staff.color || '#2196F3',
                            fontSize: '9px',
                            display: 'block'
                          }}>
                            {shift.siteName}
                          </Typography>
                        </Box>
                      ))
                    ) : (
                      // Debug: Show when no shifts found
                      <Typography variant="caption" sx={{
                        color: 'var(--clr-text-tertiary)',
                        fontSize: '9px',
                        fontStyle: 'italic'
                      }}>
                        No shifts
                      </Typography>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>

      {/* Add Shift Drawer */}
      <AddShiftDrawer
        open={isAddShiftOpen}
        onClose={() => setIsAddShiftOpen(false)}
        onSave={handleShiftSave}
        selectedDate={selectedDate}
        selectedSite={null}
        preSelectedStaff={selectedStaffId ? [selectedStaffId] : []}
        viewMode="staff"
      />
    </Box>
  );
};

export default StaffView;