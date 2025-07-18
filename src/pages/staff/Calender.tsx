import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

interface CalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDate: propSelectedDate,
  onDateSelect
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [internalSelectedDate, setInternalSelectedDate] = useState(new Date());

  const selectedDate = propSelectedDate || internalSelectedDate;

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

    if (onDateSelect) {
      onDateSelect(newSelectedDate);
    } else {
      setInternalSelectedDate(newSelectedDate);
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

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
            bgcolor: isSelected ? 'var(--clr-purple)' : 'var(--clr-bg-transparent)',
            color: isSelected ? 'var(--clr-white)' : 'var(--clr-text-secondary)',
            fontWeight: isSelected ? 600 : 400,
            fontSize: '16px',
            maxWidth: 50,
            mx: 'auto',
            '&:hover': {
              bgcolor: isSelected ? 'var(--clr-purple)' : 'var(--clr-border-lightest)',
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
    <Box sx={{ width: '100%', height: '100%', p: 3, bgcolor: 'var(--clr-bg-white)' }}>
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" mb={3}>
        <IconButton onClick={() => navigateMonth(-1)} size="small">
          <ChevronLeft />
        </IconButton>
        <Typography variant="h6" fontWeight={400} color="var(--clr-text-primary)">
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