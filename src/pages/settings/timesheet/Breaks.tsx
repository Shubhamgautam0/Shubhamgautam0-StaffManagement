import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Checkbox, 
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Select,
  MenuItem,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { defaultBreaksSettings,type BreaksSettings,type BreakType } from '../../../data/timesheetSettingsData';

const Breaks: React.FC = () => {
  const [settings, setSettings] = useState<BreaksSettings>(defaultBreaksSettings);

  const handleEnabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      enabled: event.target.checked
    });
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      type: event.target.value as 'manual' | 'automatic'
    });
  };

  const handleBreakTypeChange = (id: string, field: keyof BreakType, value: string) => {
    setSettings({
      ...settings,
      breakTypes: settings.breakTypes.map(breakType =>
        breakType.id === id ? { ...breakType, [field]: value } : breakType
      )
    });
  };

  const removeBreakType = (id: string) => {
    setSettings({
      ...settings,
      breakTypes: settings.breakTypes.filter(breakType => breakType.id !== id)
    });
  };

  const addBreakType = () => {
    const newBreakType: BreakType = {
      id: Date.now().toString(),
      name: '',
      type: 'Unpaid',
      duration: '5 mins'
    };
    setSettings({
      ...settings,
      breakTypes: [...settings.breakTypes, newBreakType]
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Breaks
      </Typography>

      <FormControlLabel
        control={
          <Checkbox 
            checked={settings.enabled}
            onChange={handleEnabledChange}
          />
        }
        label="Enable Breaks"
        sx={{ mb: 3 }}
      />

      {settings.enabled && (
        <Box>
          <RadioGroup
            value={settings.type}
            onChange={handleTypeChange}
            sx={{ mb: 3 }}
          >
            <FormControlLabel
              value="manual"
              control={<Radio />}
              label="Manual Breaks"
            />
            <FormControlLabel
              value="automatic"
              control={<Radio />}
              label="Automatic Breaks"
            />
          </RadioGroup>

          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
            {settings.type === 'manual' ? settings.manualDescription : settings.automaticDescription}
          </Typography>

          {settings.type === 'manual' && (
            <Box>
              <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell width="50px"></TableCell>
                      <TableCell>Break Name</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell width="50px"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {settings.breakTypes.map((breakType) => (
                      <TableRow key={breakType.id}>
                        <TableCell>
                          <Checkbox defaultChecked />
                        </TableCell>
                        <TableCell>
                          <TextField
                            size="small"
                            value={breakType.name}
                            onChange={(e) => handleBreakTypeChange(breakType.id, 'name', e.target.value)}
                            placeholder="Break Name"
                            variant="outlined"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            size="small"
                            value={breakType.type}
                            onChange={(e) => handleBreakTypeChange(breakType.id, 'type', e.target.value)}
                          >
                            <MenuItem value="Unpaid">Unpaid</MenuItem>
                            <MenuItem value="Paid">Paid</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select
                            size="small"
                            value={breakType.duration}
                            onChange={(e) => handleBreakTypeChange(breakType.id, 'duration', e.target.value)}
                          >
                            <MenuItem value="5 mins">5 mins</MenuItem>
                            <MenuItem value="10 mins">10 mins</MenuItem>
                            <MenuItem value="15 mins">15 mins</MenuItem>
                            <MenuItem value="30 mins">30 mins</MenuItem>
                            <MenuItem value="60 mins">60 mins</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <IconButton 
                            size="small" 
                            onClick={() => removeBreakType(breakType.id)}
                            sx={{ color: 'error.main' }}
                          >
                            <Close />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
              
              <Button
                variant="outlined"
                onClick={addBreakType}
                sx={{ mt: 2 }}
              >
                + ADD BREAK TYPE
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Breaks;
