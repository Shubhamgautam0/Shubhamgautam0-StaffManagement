import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Button,
  Checkbox,
  Alert,
} from '@mui/material';
import {
  updateStaffAvailability,
  getStaffAvailability,
  type TimeSlot,
  type VacationPeriod,
  type StaffAvailability
} from '../../data/staffData';

interface AvailabilityProps {
  staffId: string;
  staffName: string;
}

function Availability({ staffId, staffName }: AvailabilityProps) {
  const [availabilityType, setAvailabilityType] = useState<'fullTime' | 'partTime'>('fullTime');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [vacationPeriods, setVacationPeriods] = useState<VacationPeriod[]>([]);
  const [newVacation, setNewVacation] = useState<VacationPeriod>({
    from: '2025-07-20',
    to: '2025-07-21'
  });
  const [saveMessage, setSaveMessage] = useState<string>('');

  // Load staff availability data when component mounts or staffId changes
  useEffect(() => {
    if (staffId) {
      const availability = getStaffAvailability(staffId);
      if (availability) {
        setAvailabilityType(availability.type);
        setTimeSlots(availability.timeSlots);
        setVacationPeriods(availability.vacationPeriods);

        // Set selected days based on time slots
        const days = availability.timeSlots.map(slot => slot.day);
        setSelectedDays(days);
      } else {
        // Reset to defaults if no availability data
        setAvailabilityType('fullTime');
        setTimeSlots([]);
        setSelectedDays([]);
        setVacationPeriods([]);
      }
    }
  }, [staffId]);

  const daysOfWeek = [
    { key: 'M', label: 'Monday' },
    { key: 'T', label: 'Tuesday' },
    { key: 'W', label: 'Wednesday' },
    { key: 'T', label: 'Thursday' },
    { key: 'F', label: 'Friday' },
    { key: 'S', label: 'Saturday' },
    { key: 'S', label: 'Sunday' },
  ];

  const handleAvailabilityTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAvailabilityType(event.target.value as 'fullTime' | 'partTime');
  };

  const handleTimeSlotChange = (index: number, field: 'startTime' | 'endTime', value: string) => {
    const updatedSlots = [...timeSlots];
    updatedSlots[index][field] = value;
    setTimeSlots(updatedSlots);
  };

  const handleDayToggle = (dayKey: string) => {
    const isSelected = selectedDays.includes(dayKey);

    if (isSelected) {
      // Remove day from selection and timeSlots
      setSelectedDays(prev => prev.filter(day => day !== dayKey));
      setTimeSlots(prev => prev.filter(slot => slot.day !== dayKey));
    } else {
      // Add day to selection and create new timeSlot
      setSelectedDays(prev => [...prev, dayKey]);
      setTimeSlots(prev => [...prev, { day: dayKey, startTime: '12:00', endTime: '23:59' }]);
    }
  };

  const addVacationPeriod = () => {
    if (newVacation.from && newVacation.to) {
      setVacationPeriods([...vacationPeriods, newVacation]);
      setNewVacation({ from: '', to: '' });
    }
  };

  const removeVacationPeriod = (index: number) => {
    setVacationPeriods(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const availabilityData: StaffAvailability = {
      type: availabilityType,
      timeSlots: timeSlots,
      vacationPeriods: vacationPeriods
    };

    const success = updateStaffAvailability(staffId, availabilityData);
    if (success) {
      setSaveMessage('Availability saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } else {
      setSaveMessage('Failed to save availability. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const renderAvailableTimeSection = () => {
    if (availabilityType === 'fullTime') {
      return (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{  mb: 2, fontWeight: 500 }}>
            Vacation Time
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                From
              </Typography>
              <TextField
                fullWidth
                type="date"
                value={newVacation.from}
                onChange={(e) => setNewVacation({ ...newVacation, from: e.target.value })}
                className="input-field"
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                To
              </Typography>
              <TextField
                fullWidth
                type="date"
                value={newVacation.to}
                onChange={(e) => setNewVacation({ ...newVacation, to: e.target.value })}
                className="input-field"
              />
            </Box>
            <Button
              variant="contained"
              onClick={addVacationPeriod}
              className='btn-primary'
              sx={{
                px: 3,
                py: 1.5,
                mt: 3,
              }}
            >
              ADD
            </Button>
          </Box>

          {/* Display existing vacation periods */}
          {vacationPeriods.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 500, color: '#6366F1' }}>
                Vacation Time
              </Typography>
              {vacationPeriods.map((period, index) => (
                <Box key={index} sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 2,
                  mb: 1,
                  backgroundColor: '#f8f9fa',
                  borderRadius: 1,
                  border: '1px solid #e9ecef'
                }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {new Date(period.from).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })} - {new Date(period.to).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => removeVacationPeriod(index)}
                    sx={{ color: '#dc3545', minWidth: 'auto', p: 1 }}
                  >
                    ✕
                  </Button>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      );
    }

    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
          Available Time
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {daysOfWeek.map((day, index) => {
            const isSelected = selectedDays.includes(day.key);
            const timeSlot = timeSlots.find(slot => slot.day === day.key);

            return (
              <Box key={`${day.key}-${index}`} className="availability-time-row">
                <Box className="availability-day-selector">
                  <Checkbox
                    checked={isSelected}
                    onChange={() => handleDayToggle(day.key)}
                    className="checkbox-primary"
                  />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#666' }}>
                    {day.key}
                  </Typography>
                </Box>

                <TextField
                  type="time"
                  value={timeSlot?.startTime || '12:00'}
                  onChange={(e) => {
                    const slotIndex = timeSlots.findIndex(slot => slot.day === day.key);
                    if (slotIndex !== -1) {
                      handleTimeSlotChange(slotIndex, 'startTime', e.target.value);
                    }
                  }}
                  disabled={!isSelected}
                  className="availability-time-field input-field"
                />
                <Typography variant="body2" color="text.secondary">
                  To
                </Typography>
                <TextField
                  type="time"
                  value={timeSlot?.endTime || '23:59'}
                  onChange={(e) => {
                    const slotIndex = timeSlots.findIndex(slot => slot.day === day.key);
                    if (slotIndex !== -1) {
                      handleTimeSlotChange(slotIndex, 'endTime', e.target.value);
                    }
                  }}
                  disabled={!isSelected}
                  className="input-field"
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  };

  return (
    <Box className="availability-container">
      <Typography variant="h5" className="form-section-title mb-3">
        Availability
      </Typography>

      <FormControl component="fieldset">
        <RadioGroup
          row
          value={availabilityType}
          onChange={handleAvailabilityTypeChange}
          className="availability-radio-group"
        >
          <FormControlLabel
            value="fullTime"
            control={<Radio className="radio-primary" />}
            label="Full Time"
            sx={{ mr: 4 }}
          />
          <FormControlLabel
            value="partTime"
            control={<Radio className="radio-primary" />}
            label="Part Time"
          />
        </RadioGroup>
      </FormControl>

      {renderAvailableTimeSection()}

      {/* Save Message */}
      {saveMessage && (
        <Box sx={{ mt: 3 }}>
          <Alert severity={saveMessage.includes('successfully') ? 'success' : 'error'}>
            {saveMessage}
          </Alert>
        </Box>
      )}

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          className="btn-primary"
          onClick={handleSave}
          sx={{
            backgroundColor: '#6366F1',
            '&:hover': {
              backgroundColor: '#5856EB'
            }
          }}
        >
          SAVE
        </Button>
      </Box>
    </Box>
  );
}

export default Availability;
