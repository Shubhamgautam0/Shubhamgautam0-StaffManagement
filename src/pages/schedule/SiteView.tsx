import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Popover,
  Paper,
  Button,
} from '@mui/material';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Add,
  CalendarToday,
} from '@mui/icons-material';
import { SiteData, type Shift, type SiteMember, getShiftsForSiteAndDate } from '../../data/siteData';
import AddShiftDrawer from '../../components/shifts/AddShiftDrawer';
import StaffView from './StaffView';

interface ScheduleProps { }

const Schedule: React.FC<ScheduleProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showScheduledSites, setShowScheduledSites] = useState(true);
  const [siteView, setSiteView] = useState(false);
  const [staffView, setStaffView] = useState(false);
  const [calendarAnchorEl, setCalendarAnchorEl] = useState<HTMLElement | null>(null);
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());

  const [shifts, setShifts] = useState<Shift[]>([]);
  const [isAddShiftOpen, setIsAddShiftOpen] = useState(false);
  const [selectedSiteForShift, setSelectedSiteForShift] = useState<SiteMember | null>(null);
  const [selectedDateForShift, setSelectedDateForShift] = useState<Date>(new Date());

  // No longer needed for unified table structure

  const getWeekDates = (startDate: Date) => {
    const dates = [];
    const start = new Date(startDate);
    start.setDate(start.getDate() - start.getDay() + 1); // Start from Monday

    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates(currentWeekStart);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeekStart(newDate);
  };

  const filteredSites = SiteData.filter(site =>
    site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    site.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function to get shifts for site and date
  const getSiteShifts = (siteId: string, date: Date): Shift[] => {
    const dateStr = date.toISOString().split('T')[0];

    // Get shifts from site data
    const siteShifts = getShiftsForSiteAndDate(siteId, dateStr);

    // Get user-added shifts
    const userShifts = shifts.filter(shift =>
      shift.siteId === siteId && shift.date === dateStr
    );

    return [...siteShifts, ...userShifts];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric'
    });
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const handleCalendarOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCalendarAnchorEl(event.currentTarget);
    setCalendarDate(new Date(currentWeekStart));
  };

  const handleCalendarClose = () => {
    setCalendarAnchorEl(null);
  };

  const handleDateSelect = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1);
    setCurrentWeekStart(startOfWeek);
    setSelectedDate(date);
    handleCalendarClose();
  };

  const getCalendarDates = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const dates = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const navigateCalendarMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(calendarDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCalendarDate(newDate);
  };

  const calendarDates = getCalendarDates(calendarDate);
  const isCalendarOpen = Boolean(calendarAnchorEl);

  const handleAddShift = (siteId: string, date: Date) => {
    const site = SiteData.find(s => s.id === siteId);
    if (site) {
      setSelectedSiteForShift(site);
      setSelectedDateForShift(date);
      setIsAddShiftOpen(true);
    }
  };

  const handleSaveShift = (newShift: Shift) => {
    setShifts(prevShifts => [...prevShifts, newShift]);
    setIsAddShiftOpen(false);
  };

  const handleCloseShiftDrawer = () => {
    setIsAddShiftOpen(false);
    setSelectedSiteForShift(null);
  };

  // If staff view is enabled, render StaffView component
  if (staffView) {
    return (
      <StaffView
        currentWeekStart={currentWeekStart}
        onNavigateWeek={navigateWeek}
        onClose={() => setStaffView(false)}
      />
    );
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '64px' }}>
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
          <IconButton onClick={() => navigateWeek('prev')} size="small">
            <ChevronLeft />
          </IconButton>

          <Box
            onClick={handleCalendarOpen}
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 1,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'var(--clr-bg-light)',
              },
            }}
          >
            <CalendarToday sx={{ fontSize: '18px', color: 'var(--clr-text-secondary)' }} />
            <Typography variant="h6" sx={{
              fontWeight: 600,
              color: 'var(--clr-text-primary)',
              minWidth: '200px'
            }}>
              {formatMonthYear(weekDates[0])} - {formatMonthYear(weekDates[6])}
            </Typography>
          </Box>

          <IconButton onClick={() => navigateWeek('next')} size="small">
            <ChevronRight />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <input
              type="checkbox"
              checked={showScheduledSites}
              onChange={(e) => setShowScheduledSites(e.target.checked)}
              style={{ accentColor: 'var(--clr-purple)' }}
            />
            <Typography variant="body2" sx={{ color: 'var(--clr-text-secondary)' }}>
              Show scheduled sites
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <input
              type="checkbox"
              checked={staffView}
              onChange={(e) => setStaffView(e.target.checked)}
              style={{ accentColor: 'var(--clr-purple)' }}
            />
            <Typography variant="body2" sx={{ color: 'var(--clr-text-secondary)' }}>
              Staff View
            </Typography>
          </Box>

          <Typography variant="body2" sx={{
            color: 'var(--clr-text-secondary)',
            cursor: 'pointer',
            '&:hover': { color: 'var(--clr-purple)' }
          }}>
            Action
          </Typography>
        </Box>
      </Box>

      {/* Search Bar */}
      <Box sx={{ p: 2, borderBottom: '1px solid var(--clr-border-light)', backgroundColor: 'var(--clr-white)' }}>
        <TextField
          fullWidth
          placeholder="Search Site"
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
          {/* Site Column Header */}
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
              Sites
            </Typography>
          </Box>

          {/* Date Column Headers */}
          {weekDates.map((date, index) => (
            <Box
              key={index}
              onClick={() => setSelectedDate(date)}
              sx={{
                p: 2,
                textAlign: 'center',
                borderRight: index < 6 ? '1px solid var(--clr-border-light)' : 'none',
                cursor: 'pointer',
                backgroundColor: isSelected(date) ? 'var(--clr-purple-light)' : 'var(--clr-bg-light)',
                '&:hover': {
                  backgroundColor: isSelected(date) ? 'var(--clr-purple-light)' : 'var(--clr-bg-lighter)',
                },
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

        {/* Table Rows */}
        {filteredSites.map((site) => (
          <Box
            key={site.id}
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
            {/* Site Info Cell */}
            <Box sx={{
              p: 2,
              borderRight: '1px solid var(--clr-border-light)',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              minHeight: '80px'
            }}>
              <Avatar sx={{
                bgcolor: site.status === 'Mysite' ? 'var(--clr-orange)' : 'var(--clr-success)',
                color: 'var(--clr-white)',
                width: 32,
                height: 32,
                fontSize: '12px',
                fontWeight: 600
              }}>
                {site.initials}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{
                  fontWeight: 600,
                  color: 'var(--clr-text-primary)',
                  fontSize: '14px'
                }}>
                  {site.name}
                </Typography>
                <Typography variant="caption" sx={{
                  color: 'var(--clr-text-secondary)',
                  fontSize: '12px'
                }}>
                  {site.siteId}
                </Typography>
              </Box>
            </Box>

            {/* Calendar Cells */}
            {weekDates.map((date, dateIndex) => {
              const shifts = getSiteShifts(site.id, date);
              return (
                <Box
                  key={dateIndex}
                  sx={{
                    p: 1,
                    borderRight: dateIndex < 6 ? '1px solid var(--clr-border-light)' : 'none',
                    position: 'relative',
                    minHeight: '80px',
                    backgroundColor: isSelected(date) ? 'var(--clr-purple-light)' : 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start'
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => handleAddShift(site.id, date)}
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
                    {shifts.map((shift) => (
                      <Box
                        key={shift.id}
                        sx={{
                          mb: 1,
                          p: 1,
                          borderRadius: 1,
                          backgroundColor: shift.color + '20',
                          border: `1px solid ${shift.color}`,
                          cursor: 'pointer',
                        }}
                      >
                        <Typography variant="caption" sx={{
                          color: shift.color,
                          fontSize: '10px',
                          fontWeight: 600,
                          display: 'block'
                        }}>
                          {shift.startTime} - {shift.endTime}
                        </Typography>
                        {shift.assignedStaffNames.length > 0 && (
                          <Typography variant="caption" sx={{
                            color: shift.color,
                            fontSize: '9px',
                            display: 'block'
                          }}>
                            {shift.assignedStaffNames.join(', ')}
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>

      {/* Calendar Popover */}
      <Popover
        open={isCalendarOpen}
        anchorEl={calendarAnchorEl}
        onClose={handleCalendarClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Paper sx={{ p: 2, width: 320 }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}>
            <IconButton onClick={() => navigateCalendarMonth('prev')} size="small">
              <ChevronLeft />
            </IconButton>

            <Typography variant="h6" sx={{
              fontWeight: 600,
              color: 'var(--clr-text-primary)'
            }}>
              {calendarDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
              })}
            </Typography>

            <IconButton onClick={() => navigateCalendarMonth('next')} size="small">
              <ChevronRight />
            </IconButton>
          </Box>

          {/* Calendar Grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0 }}>
            {/* Day Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <Box key={day} sx={{
                textAlign: 'center',
                py: 1,
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--clr-text-secondary)'
              }}>
                {day}
              </Box>
            ))}

            {/* Calendar Dates */}
            {calendarDates.map((date, index) => {
              const isCurrentMonth = date.getMonth() === calendarDate.getMonth();
              const isToday = date.toDateString() === new Date().toDateString();
              const isSelectedWeek = weekDates.some(weekDate =>
                weekDate.toDateString() === date.toDateString()
              );

              return (
                <Box
                  key={index}
                  onClick={() => handleDateSelect(date)}
                  sx={{
                    textAlign: 'center',
                    py: 1,
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: isCurrentMonth ? 'var(--clr-text-primary)' : 'var(--clr-text-tertiary)',
                    backgroundColor: isSelectedWeek ? 'var(--clr-purple-light)' : 'transparent',
                    borderRadius: 1,
                    fontWeight: isToday ? 600 : 400,
                    border: isToday ? '2px solid var(--clr-purple)' : 'none',
                    '&:hover': {
                      backgroundColor: isSelectedWeek
                        ? 'var(--clr-purple-light)'
                        : 'var(--clr-bg-light)',
                    },
                  }}
                >
                  {date.getDate()}
                </Box>
              );
            })}
          </Box>

          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
            pt: 2,
            borderTop: '1px solid var(--clr-border-light)'
          }}>
            <Button
              variant="text"
              size="small"
              onClick={() => handleDateSelect(new Date())}
              sx={{
                color: 'var(--clr-purple)',
                textTransform: 'none',
                fontSize: '12px'
              }}
            >
              Today
            </Button>

            <Button
              variant="text"
              size="small"
              onClick={handleCalendarClose}
              sx={{
                color: 'var(--clr-text-secondary)',
                textTransform: 'none',
                fontSize: '12px'
              }}
            >
              Close
            </Button>
          </Box>
        </Paper>
      </Popover>

      {/* Add Shift Drawer */}
      <AddShiftDrawer
        open={isAddShiftOpen}
        onClose={handleCloseShiftDrawer}
        onSave={handleSaveShift}
        selectedDate={selectedDateForShift}
        selectedSite={selectedSiteForShift}
      />
    </Box>
  );
};

export default Schedule;