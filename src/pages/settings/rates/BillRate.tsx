import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Switch,
  IconButton,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface BillRateRow {
  id: string;
  diff: boolean;
  type: string;
  regularRate: string;
  overtimeRate: string;
  doubleTimeRate: string;
  dayTimeRate: string;
  nightTimeRate: string;
  holidayRate: string;
  weekendRate: string;
}

const BillRate: React.FC = () => {
  const [billRates, setBillRates] = useState<BillRateRow[]>([
    {
      id: '1',
      diff: false,
      type: 'Enter Type',
      regularRate: '0',
      overtimeRate: '0',
      doubleTimeRate: '0',
      dayTimeRate: '0',
      nightTimeRate: '0',
      holidayRate: '0',
      weekendRate: '0'
    }
  ]);

  const addNewRate = () => {
    const newRate: BillRateRow = {
      id: Date.now().toString(),
      diff: false,
      type: 'Enter Type',
      regularRate: '0',
      overtimeRate: '0',
      doubleTimeRate: '0',
      dayTimeRate: '0',
      nightTimeRate: '0',
      holidayRate: '0',
      weekendRate: '0'
    };
    setBillRates([...billRates, newRate]);
  };

  const removeRate = (id: string) => {
    setBillRates(billRates.filter(rate => rate.id !== id));
  };

  const updateRate = (id: string, field: keyof BillRateRow, value: string | boolean) => {
    setBillRates(billRates.map(rate => 
      rate.id === id ? { ...rate, [field]: value } : rate
    ));
  };

  const handleSave = () => {
    console.log('Saving bill rates:', billRates);
    // Add save logic here
  };

  const handleCancel = () => {
    setBillRates([
      {
        id: '1',
        diff: false,
        type: 'Enter Type',
        regularRate: '0',
        overtimeRate: '0',
        doubleTimeRate: '0',
        dayTimeRate: '0',
        nightTimeRate: '0',
        holidayRate: '0',
        weekendRate: '0'
      }
    ]);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Bill Rate
          </Typography>
          <Tooltip title="Bill rate information">
            <InfoIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
          </Tooltip>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 600, minWidth: 80 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Diff
                  <Tooltip title="Differential information">
                    <InfoIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  </Tooltip>
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 600, minWidth: 120 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 600, minWidth: 100 }}>Regular Rate</TableCell>
              <TableCell sx={{ fontWeight: 600, minWidth: 100 }}>Overtime Rate</TableCell>
              <TableCell sx={{ fontWeight: 600, minWidth: 120 }}>Double Time Rate</TableCell>
              <TableCell sx={{ fontWeight: 600, minWidth: 100 }}>Day Time Rate</TableCell>
              <TableCell sx={{ fontWeight: 600, minWidth: 100 }}>Night Time Rate</TableCell>
              <TableCell sx={{ fontWeight: 600, minWidth: 100 }}>Holiday Rate</TableCell>
              <TableCell sx={{ fontWeight: 600, minWidth: 100 }}>Weekend Rate</TableCell>
              <TableCell sx={{ width: 50 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {billRates.map((rate) => (
              <TableRow key={rate.id}>
                <TableCell>
                  <Switch
                    checked={rate.diff}
                    onChange={(e) => updateRate(rate.id, 'diff', e.target.checked)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={rate.type}
                    onChange={(e) => updateRate(rate.id, 'type', e.target.value)}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: rate.type === 'Enter Type' ? '#f5f5f5' : 'white'
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={rate.regularRate}
                    onChange={(e) => updateRate(rate.id, 'regularRate', e.target.value)}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={rate.overtimeRate}
                    onChange={(e) => updateRate(rate.id, 'overtimeRate', e.target.value)}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={rate.doubleTimeRate}
                    onChange={(e) => updateRate(rate.id, 'doubleTimeRate', e.target.value)}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={rate.dayTimeRate}
                    onChange={(e) => updateRate(rate.id, 'dayTimeRate', e.target.value)}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={rate.nightTimeRate}
                    onChange={(e) => updateRate(rate.id, 'nightTimeRate', e.target.value)}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={rate.holidayRate}
                    onChange={(e) => updateRate(rate.id, 'holidayRate', e.target.value)}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={rate.weekendRate}
                    onChange={(e) => updateRate(rate.id, 'weekendRate', e.target.value)}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton 
                    size="small" 
                    onClick={() => removeRate(rate.id)}
                    sx={{ color: 'error.main' }}
                  >
                    <CloseIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button 
        variant="contained" 
        startIcon={<AddIcon />}
        onClick={addNewRate}
        sx={{ 
          backgroundColor: '#5c6bc0',
          '&:hover': {
            backgroundColor: '#3f51b5'
          },
          mb: 3
        }}
      >
        ADD NEW
      </Button>

      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        pt: 2, 
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#f8f9fa',
        p: 2,
        mt: 3
      }}>
        <Button 
          variant="contained" 
          onClick={handleSave}
          sx={{ 
            backgroundColor: '#5c6bc0',
            '&:hover': {
              backgroundColor: '#3f51b5'
            }
          }}
        >
          Save
        </Button>
        <Button 
          variant="outlined" 
          onClick={handleCancel}
          sx={{ 
            borderColor: '#ccc',
            color: '#666',
            '&:hover': {
              borderColor: '#999',
              backgroundColor: '#f5f5f5'
            }
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default BillRate;
