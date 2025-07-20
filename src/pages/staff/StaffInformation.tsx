import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Alert,
} from '@mui/material';
import {
  updateStaffInformation,
  getStaffInformation,
  type StaffInformationData
} from '../../data/staffData';

interface StaffInformationProps {
  staffId: string;
  staffName: string;
}

function StaffInformation({ staffId, staffName }: StaffInformationProps) {
  const [staffInfo, setStaffInfo] = useState<StaffInformationData>({
    personalDetails: {
      dateOfBirth: '',
      nationality: '',
      emergencyContact: '',
      emergencyPhone: '',
    },
    employmentDetails: {
      startDate: '',
      position: '',
      department: '',
      supervisor: '',
      employmentType: 'Full-time',
    },
    additionalInfo: {
      notes: '',
      skills: [],
      certifications: [],
    }
  });

  const [saveMessage, setSaveMessage] = useState<string>('');

  // Load staff information when component mounts or staffId changes
  useEffect(() => {
    if (staffId) {
      const existingInfo = getStaffInformation(staffId);
      if (existingInfo) {
        setStaffInfo(existingInfo);
      }
    }
  }, [staffId]);

  const handlePersonalDetailChange = (field: string, value: string) => {
    setStaffInfo(prev => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        [field]: value
      }
    }));
  };

  const handleEmploymentDetailChange = (field: string, value: string) => {
    setStaffInfo(prev => ({
      ...prev,
      employmentDetails: {
        ...prev.employmentDetails,
        [field]: value
      }
    }));
  };

  const handleAdditionalInfoChange = (field: string, value: string) => {
    setStaffInfo(prev => ({
      ...prev,
      additionalInfo: {
        ...prev.additionalInfo,
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    const success = updateStaffInformation(staffId, staffInfo);
    if (success) {
      setSaveMessage('Staff information updated successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } else {
      setSaveMessage('Failed to update staff information. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'var(--clr-text-primary)' }}>
        Staff Information
      </Typography>

      {/* Save Message */}
      {saveMessage && (
        <Box sx={{ mb: 3 }}>
          <Alert severity={saveMessage.includes('successfully') ? 'success' : 'error'}>
            {saveMessage}
          </Alert>
        </Box>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* Personal Details Section */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'var(--clr-text-primary)' }}>
            Personal Details
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ mb: 1, color: 'var(--clr-text-secondary)' }}>
                  Date of Birth
                </Typography>
                <TextField
                  fullWidth
                  type="date"
                  size="small"
                  value={staffInfo.personalDetails.dateOfBirth || ''}
                  onChange={(e) => handlePersonalDetailChange('dateOfBirth', e.target.value)}
                  className="input-field"
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ mb: 1, color: 'var(--clr-text-secondary)' }}>
                  Nationality
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter nationality"
                  value={staffInfo.personalDetails.nationality || ''}
                  onChange={(e) => handlePersonalDetailChange('nationality', e.target.value)}
                  className="input-field"
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ mb: 1, color: 'var(--clr-text-secondary)' }}>
                  Emergency Contact Name
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter emergency contact name"
                  value={staffInfo.personalDetails.emergencyContact || ''}
                  onChange={(e) => handlePersonalDetailChange('emergencyContact', e.target.value)}
                  className="input-field"
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ mb: 1, color: 'var(--clr-text-secondary)' }}>
                  Emergency Contact Phone
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter emergency contact phone"
                  value={staffInfo.personalDetails.emergencyPhone || ''}
                  onChange={(e) => handlePersonalDetailChange('emergencyPhone', e.target.value)}
                  className="input-field"
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Employment Details Section */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'var(--clr-text-primary)' }}>
            Employment Details
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ mb: 1, color: 'var(--clr-text-secondary)' }}>
                  Start Date
                </Typography>
                <TextField
                  fullWidth
                  type="date"
                  size="small"
                  value={staffInfo.employmentDetails.startDate || ''}
                  onChange={(e) => handleEmploymentDetailChange('startDate', e.target.value)}
                  className="input-field"
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ mb: 1, color: 'var(--clr-text-secondary)' }}>
                  Position
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter position"
                  value={staffInfo.employmentDetails.position || ''}
                  onChange={(e) => handleEmploymentDetailChange('position', e.target.value)}
                  className="input-field"
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ mb: 1, color: 'var(--clr-text-secondary)' }}>
                  Department
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter department"
                  value={staffInfo.employmentDetails.department || ''}
                  onChange={(e) => handleEmploymentDetailChange('department', e.target.value)}
                  className="input-field"
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ mb: 1, color: 'var(--clr-text-secondary)' }}>
                  Supervisor
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter supervisor name"
                  value={staffInfo.employmentDetails.supervisor || ''}
                  onChange={(e) => handleEmploymentDetailChange('supervisor', e.target.value)}
                  className="input-field"
                />
              </Box>
            </Box>

            <Box sx={{ width: '50%' }}>
              <Typography variant="body2" sx={{ mb: 1, color: 'var(--clr-text-secondary)' }}>
                Employment Type
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={staffInfo.employmentDetails.employmentType || 'Full-time'}
                  onChange={(e) => handleEmploymentDetailChange('employmentType', e.target.value)}
                  className="input-field"
                >
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                  <MenuItem value="Temporary">Temporary</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>

        {/* Additional Information Section */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'var(--clr-text-primary)' }}>
            Additional Information
          </Typography>
          <Box>
            <Typography variant="body2" sx={{ mb: 1, color: 'var(--clr-text-secondary)' }}>
              Notes
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              size="small"
              placeholder="Enter additional notes about the staff member"
              value={staffInfo.additionalInfo.notes || ''}
              onChange={(e) => handleAdditionalInfoChange('notes', e.target.value)}
              className="input-field"
            />
          </Box>
        </Box>

        {/* Save Button */}
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: '#6366F1',
              color: 'white',
              px: 4,
              py: 1.5,
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#5856EB'
              }
            }}
          >
            SAVE
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default StaffInformation;
