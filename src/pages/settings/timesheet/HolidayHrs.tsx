import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Checkbox, 
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { defaultHolidaySettings,type HolidaySettings,type Holiday } from '../../../data/timesheetSettingsData';

const HolidayHrs: React.FC = () => {
  const [settings, setSettings] = useState<HolidaySettings>(defaultHolidaySettings);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newHoliday, setNewHoliday] = useState<Partial<Holiday>>({
    year: new Date().getFullYear().toString(),
    date: '',
    name: ''
  });

  const handleEnabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      enabled: event.target.checked
    });
  };

  const handleRuleBasedOnChange = (value: string) => {
    setSettings({
      ...settings,
      ruleBasedOn: value
    });
  };

  const handleShiftBasedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      shiftBased: event.target.checked
    });
  };

  const handleExcludeDayNightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      excludeDayNight: event.target.checked
    });
  };

  const handleAddHoliday = () => {
    setDialogOpen(true);
  };

  const handleSaveHoliday = () => {
    if (newHoliday.date && newHoliday.name) {
      const holiday: Holiday = {
        id: Date.now().toString(),
        year: newHoliday.year || new Date().getFullYear().toString(),
        date: newHoliday.date,
        name: newHoliday.name
      };
      
      setSettings({
        ...settings,
        holidays: [...settings.holidays, holiday]
      });
      
      setNewHoliday({
        year: new Date().getFullYear().toString(),
        date: '',
        name: ''
      });
      setDialogOpen(false);
    }
  };

  const handleCancelDialog = () => {
    setNewHoliday({
      year: new Date().getFullYear().toString(),
      date: '',
      name: ''
    });
    setDialogOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Holiday Hrs
      </Typography>

      <FormControlLabel
        control={
          <Checkbox 
            checked={settings.enabled}
            onChange={handleEnabledChange}
          />
        }
        label="Holidays Hrs"
        sx={{ mb: 2 }}
      />

      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary', fontStyle: 'italic' }}>
        {settings.instructions}
      </Typography>

      {settings.enabled && (
        <Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Holiday Rule based on
            </Typography>
            <FormControl sx={{ minWidth: 200 }}>
              <Select
                value={settings.ruleBasedOn}
                onChange={(e) => handleRuleBasedOnChange(e.target.value)}
                size="small"
              >
                <MenuItem value="Shift Start Time">Shift Start Time</MenuItem>
                <MenuItem value="Shift End Time">Shift End Time</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 2, fontWeight: 500 }}>
              Choose Holiday
            </Typography>
            
            <Table size="small" sx={{ border: '1px solid #e0e0e0', borderRadius: 1 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell>Year</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Holiday Name</TableCell>
                  <TableCell>
                    <Button 
                      variant="text" 
                      size="small" 
                      onClick={handleAddHoliday}
                      sx={{ color: 'primary.main' }}
                    >
                      + Add Holiday
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {settings.holidays.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                      No holidays added yet
                    </TableCell>
                  </TableRow>
                ) : (
                  settings.holidays.map((holiday) => (
                    <TableRow key={holiday.id}>
                      <TableCell>{holiday.year}</TableCell>
                      <TableCell>{holiday.date}</TableCell>
                      <TableCell>{holiday.name}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
            <Checkbox 
              checked={settings.shiftBased}
              onChange={handleShiftBasedChange}
              size="small"
            />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Shift Based
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {settings.shiftBasedDescription}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <Checkbox 
              checked={settings.excludeDayNight}
              onChange={handleExcludeDayNightChange}
              size="small"
            />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Exclude Day and Night hrs
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {settings.excludeDayNightDescription}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* Add Holiday Dialog */}
      <Dialog open={dialogOpen} onClose={handleCancelDialog} maxWidth="sm" fullWidth>
        <DialogContent>
          <Typography variant="h6" sx={{ mb: 3 }}>
            holiday date
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Date <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Choose a date"
                value={newHoliday.date}
                onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
              />
            </Box>
            
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Holiday Name <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Holiday Name"
                value={newHoliday.name}
                onChange={(e) => setNewHoliday({ ...newHoliday, name: e.target.value })}
              />
            </Box>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button 
            variant="outlined" 
            onClick={handleCancelDialog}
            startIcon={<span>✕</span>}
          >
            CANCEL
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSaveHoliday}
            startIcon={<span>✓</span>}
          >
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HolidayHrs;
