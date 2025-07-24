import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Checkbox, 
  FormControlLabel,
  Switch
} from '@mui/material';

interface ShiftSettingsProps {
  selectedSubItem: string;
}

const ShiftSettings: React.FC<ShiftSettingsProps> = ({ selectedSubItem }) => {
  const [allowStartDutyOutsideBoundary, setAllowStartDutyOutsideBoundary] = useState(false);
  
  const [allowReleaseAcceptedShift, setAllowReleaseAcceptedShift] = useState(false);
  const [allowReleasePopularShifts, setAllowReleasePopularShifts] = useState(false);
  
  const [allowEditDutyTime, setAllowEditDutyTime] = useState(false);
  
  const [allowManagerNamesInPDF, setAllowManagerNamesInPDF] = useState(true);

  const handleStartDutyBoundaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllowStartDutyOutsideBoundary(event.target.checked);
  };

  const handleReleaseAcceptedShiftChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllowReleaseAcceptedShift(event.target.checked);
  };

  const handleReleasePopularShiftsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllowReleasePopularShifts(event.target.checked);
  };

  const handleEditDutyTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllowEditDutyTime(event.target.checked);
  };

  const handleManagerNamesInPDFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllowManagerNamesInPDF(event.target.checked);
  };

  const renderStartDuty = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Start Duty
      </Typography>

      <FormControlLabel
        control={
          <Switch 
            checked={allowStartDutyOutsideBoundary}
            onChange={handleStartDutyBoundaryChange}
          />
        }
        label="Allow staff to start duty outside the boundary"
        sx={{ 
          '& .MuiFormControlLabel-label': {
            fontSize: '14px'
          }
        }}
      />
      <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
        Note: This is a general setup for all staff, it may vary from site to site
      </Typography>
    </Box>
  );

  const renderShiftSettings = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Shift Settings
      </Typography>

      <Box sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Checkbox 
              checked={allowReleaseAcceptedShift}
              onChange={handleReleaseAcceptedShiftChange}
            />
          }
          label="Allow staff to release accepted shift (Request sent to manager)"
          sx={{ 
            '& .MuiFormControlLabel-label': {
              fontSize: '14px'
            }
          }}
        />
      </Box>

      <Box sx={{ ml: 4 }}>
        <FormControlLabel
          control={
            <Checkbox 
              checked={allowReleasePopularShifts}
              onChange={handleReleasePopularShiftsChange}
            />
          }
          label="Allow staff to release Popular Shifts (Accepted by the Manager) without sending request"
          sx={{ 
            '& .MuiFormControlLabel-label': {
              fontSize: '14px',
              color: 'text.secondary'
            }
          }}
        />
      </Box>
    </Box>
  );

  const renderEditShift = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Timesheet Change Request
      </Typography>

      <FormControlLabel
        control={
          <Switch 
            checked={allowEditDutyTime}
            onChange={handleEditDutyTimeChange}
          />
        }
        label="Allow staff to edit duty time on end duty"
        sx={{ 
          '& .MuiFormControlLabel-label': {
            fontSize: '14px'
          }
        }}
      />
    </Box>
  );

  const renderShiftReport = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Shift Reports
      </Typography>

      <FormControlLabel
        control={
          <Switch 
            checked={allowManagerNamesInPDF}
            onChange={handleManagerNamesInPDFChange}
          />
        }
        label="Allow names of Manager in the Shift Report PDF"
        sx={{ 
          '& .MuiFormControlLabel-label': {
            fontSize: '14px'
          }
        }}
      />
    </Box>
  );

  const renderContent = () => {
    switch (selectedSubItem) {
      case 'Start Duty':
        return renderStartDuty();
      case 'Shift Settings':
        return renderShiftSettings();
      case 'Edit Shift':
        return renderEditShift();
      case 'Shift Report':
        return renderShiftReport();
      default:
        return renderStartDuty();
    }
  };

  return (
    <Box>
      {renderContent()}
    </Box>
  );
};

export default ShiftSettings;
