import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import {
  Add,
  Delete,
} from '@mui/icons-material';

interface CustomField {
  id: string;
  label: string;
  value: string;
}

interface StaffInfoData {
  dateOfBirth: string;
  socialSecurityNumber: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  landlinePhone: string;
  staffCode: string;
}

function StaffInformation() {
  const [staffInfo, setStaffInfo] = useState<StaffInfoData>({
    dateOfBirth: '',
    socialSecurityNumber: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    landlinePhone: '',
    staffCode: '',
  });

  const [customFields, setCustomFields] = useState<CustomField[]>([
    { id: '1', label: '', value: '' }
  ]);

  const handleStaffInfoChange = (field: keyof StaffInfoData, value: string) => {
    setStaffInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCustomFieldChange = (id: string, field: 'label' | 'value', newValue: string) => {
    setCustomFields(prev =>
      prev.map(customField =>
        customField.id === id
          ? { ...customField, [field]: newValue }
          : customField
      )
    );
  };

  const addCustomField = () => {
    const newField: CustomField = {
      id: Date.now().toString(),
      label: '',
      value: '',
    };
    setCustomFields(prev => [...prev, newField]);
  };

  const removeCustomField = (id: string) => {
    setCustomFields(prev => prev.filter(field => field.id !== id));
  };

  return (
    <Box className="form-container">
      <Typography variant="h5" className="form-section-title mb-3">
        Staff Information
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box className="form-row">
          <Box className="form-field">
            <Typography variant="body2" className="form-field-label" >
              Date of Birth
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={staffInfo.dateOfBirth}
              onChange={(e) => handleStaffInfoChange('dateOfBirth', e.target.value)}
              className="input-field"
            />
          </Box>

          <Box className="form-field">
            <Typography variant="body2" className="form-field-label" >
              Social Security Number
            </Typography>
            <TextField
              fullWidth
              value={staffInfo.socialSecurityNumber}
              onChange={(e) => handleStaffInfoChange('socialSecurityNumber', e.target.value)}
              className="input-field"
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" className="form-field-label" >
              Emergency Contact Name
            </Typography>
            <TextField
              fullWidth
              value={staffInfo.emergencyContactName}
              onChange={(e) => handleStaffInfoChange('emergencyContactName', e.target.value)}
              className='input-field'
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" className="form-field-label" >
              Emergency Contact Phone
            </Typography>
            <TextField
              fullWidth
              value={staffInfo.emergencyContactPhone}
              onChange={(e) => handleStaffInfoChange('emergencyContactPhone', e.target.value)}
              className='input-field'
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" className="form-field-label" >
              Landline Phone
            </Typography>
            <TextField
              fullWidth
              value={staffInfo.landlinePhone}
              onChange={(e) => handleStaffInfoChange('landlinePhone', e.target.value)}
              className='input-field'
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" className="form-field-label" >
              Staff Code
            </Typography>
            <TextField
              fullWidth
              value={staffInfo.staffCode}
              onChange={(e) => handleStaffInfoChange('staffCode', e.target.value)}
              className='input-field'
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          {customFields.length > 0 && <Typography variant="body2" className="form-field-title" sx={{fontWeight: 600, fontSize: '24px'}} >
            Custom Field
          </Typography>}
          <Button
          className='btn-primary'
            variant="text"
            startIcon={<Add />}
            onClick={addCustomField}
          >
            Add a new custom field
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {customFields.map((field) => (
            <Box key={field.id} sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" className="form-field-label" >
                  {field.label || 'Field Name'}
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Field Label"
                  value={field.label}
                  onChange={(e) => handleCustomFieldChange(field.id, 'label', e.target.value)}
                  className='input-field'
                />
              </Box>
              
              {customFields.length > 0 && (
                <IconButton
                  onClick={() => removeCustomField(field.id)}
                  sx={{
                    mb: 1,
                    color: '#f44336',
                  }}
                >
                  <Delete />
                </IconButton>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default StaffInformation;
