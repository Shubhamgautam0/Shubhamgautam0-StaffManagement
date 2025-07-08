import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 6, 1)); // July 1, 2025

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const handleDateClick = (day: number) => {
    const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newSelectedDate);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <Box key={`empty-${i}`} sx={{ width: '100%', height: 50, maxWidth: 50, mx: 'auto' }} />
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();

      days.push(
        <IconButton
          key={day}
          onClick={() => handleDateClick(day)}
          sx={{
            width: '100%',
            height: 50,
            borderRadius: '50%',
            bgcolor: isSelected ? '#7c4dff' : 'transparent',
            color: isSelected ? 'white' : '#666',
            fontWeight: isSelected ? 600 : 400,
            fontSize: '16px',
            maxWidth: 50,
            mx: 'auto',
            '&:hover': {
              bgcolor: isSelected ? '#7c4dff' : '#f5f5f5',
            },
          }}
        >
          {day}
        </IconButton>
      );
    }

    return days;
  };

  return (
    <Box sx={{ width: '100%', height: '100%', p: 3, bgcolor: 'white' }}>
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" width="30%" mb={3}>
        <IconButton onClick={() => navigateMonth(-1)} size="small">
          <ChevronLeft />
        </IconButton>
        <Typography variant="h6" fontWeight={400} color="#333">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Typography>
        <IconButton onClick={() => navigateMonth(1)} size="small">
          <ChevronRight />
        </IconButton>
      </Box>

      {/* Day headers */}
      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" mb={2} gap={1}>
        {dayNames.map((day, idx) => (
          <Typography
            key={idx}
            align="center"
            variant="body2"
            color="text.secondary"
            sx={{
              height: 40,
              lineHeight: '40px',
              fontWeight: 600,
              fontSize: '14px'
            }}
          >
            {day}
          </Typography>
        ))}
      </Box>

      {/* Calendar grid */}
      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
        {renderCalendarDays()}
      </Box>
    </Box>
  );
};

export default Calendar;