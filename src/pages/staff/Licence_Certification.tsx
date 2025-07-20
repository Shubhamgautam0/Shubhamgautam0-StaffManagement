import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Paper,
  Alert,
} from '@mui/material';
import {
  Add,
  Close,
  MoreVert,
} from '@mui/icons-material';
import {
  addStaffLicence,
  getStaffLicences,
  removeStaffLicence,
  type StaffLicence
} from '../../data/staffData';

const licenceTypes = [
  'Security Worker Licence',
  'Driving License',
  'First Aid Certificate',
  'Food Safety Certificate',
  'Construction License',
  'Other',
];

interface LicenceCertificationProps {
  staffId: string;
  staffName: string;
}

function Licence_Certification({ staffId, staffName }: LicenceCertificationProps) {
  const [showForm, setShowForm] = useState(false);
  const [licences, setLicences] = useState<StaffLicence[]>([]);
  const [formData, setFormData] = useState({
    type: '',
    number: '',
    expiryDate: '2025-02-21',
  });
  const [saveMessage, setSaveMessage] = useState<string>('');

  // Load staff licences when component mounts or staffId changes
  useEffect(() => {
    if (staffId) {
      const staffLicences = getStaffLicences(staffId);
      setLicences(staffLicences);
    }
  }, [staffId]);

  const handleAddLicence = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({
      type: '',
      number: '',
      expiryDate: '2025-02-21',
    });
  };

  const handleClear = () => {
    setFormData({
      type: '',
      number: '',
      expiryDate: '2025-02-21',
    });
  };

  const handleSubmit = () => {
    if (formData.type && formData.number && formData.expiryDate) {
      const success = addStaffLicence(staffId, {
        type: formData.type,
        number: formData.number,
        expiryDate: formData.expiryDate,
      });

      if (success) {
        // Refresh the licences list
        const updatedLicences = getStaffLicences(staffId);
        setLicences(updatedLicences);
        setSaveMessage('Licence added successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
        handleCloseForm();
      } else {
        setSaveMessage('Failed to add licence. Please try again.');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    }
  };

  const handleRemoveLicence = (licenceId: string) => {
    const success = removeStaffLicence(staffId, licenceId);
    if (success) {
      const updatedLicences = getStaffLicences(staffId);
      setLicences(updatedLicences);
      setSaveMessage('Licence removed successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Box className="licence-container">
      <Typography variant="h5" className="form-section-title mb-3">
        Licences & Certifications
      </Typography>

      <Button
        variant="text"
        startIcon={<Add />}
        onClick={handleAddLicence}
        className="btn-text"
      >
        Add Licences
      </Button>

      {/* Save Message */}
      {saveMessage && (
        <Box sx={{ mt: 2 }}>
          <Alert severity={saveMessage.includes('successfully') ? 'success' : 'error'}>
            {saveMessage}
          </Alert>
        </Box>
      )}

      {/* Existing Licences List */}
      {licences.length > 0 && (
        <Box sx={{ mt: 3 }}>
          {licences.map((licence) => {
            const isExpired = new Date(licence.expiryDate) < new Date();
            const expiryDate = new Date(licence.expiryDate).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            });

            return (
              <Paper
                key={licence.id}
                sx={{
                  p: 3,
                  mb: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: '1px solid #f0f0f0',
                  boxShadow: 'none'
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: 'var(--clr-text-primary)' }}>
                    {licence.type}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--clr-text-secondary)' }}>
                    {licence.number}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isExpired ? '#dc3545' : 'var(--clr-text-secondary)',
                        fontWeight: isExpired ? 600 : 400
                      }}
                    >
                      {isExpired ? 'Expired on' : 'Expires on'} {expiryDate}
                    </Typography>
                  </Box>

                  <IconButton
                    onClick={() => handleRemoveLicence(licence.id)}
                    size="small"
                    sx={{ color: 'var(--clr-text-secondary)' }}
                  >
                    <MoreVert />
                  </IconButton>
                </Box>
              </Paper>
            );
          })}
        </Box>
      )}

      {showForm && (
        <Paper className="licence-form-inline">
          <Box className="licence-form-header">
            <Typography variant="h6" className="licence-form-title text-primary">
              ADD LICENCE
            </Typography>
            <IconButton onClick={handleCloseForm} size="small">
              <Close />
            </IconButton>
          </Box>

            <Box className="licence-form-fields">
              <Box className="form-row">
                <Box className="form-field">
                  <Typography variant="body2" className="form-field-label">
                    Licence Type *
                  </Typography>
                  <FormControl fullWidth className="input-field">
                    <Select
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        <Typography color="text.secondary">Licence Type</Typography>
                      </MenuItem>
                      {licenceTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" className='form-field-label' >
                    Licence Number *
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Licence Number"
                    value={formData.number}
                    onChange={(e) => handleInputChange('number', e.target.value)}
                    className='input-field'
                  />
                </Box>
              </Box>

              <Box sx={{ width: '50%' }}>
                <Typography variant="body2" className='form-field-label' >
                  Licence Expiry Date *
                </Typography>
                <TextField
                  fullWidth
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  className='input-field'
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  className="btn-primary"
                  sx={{ px: 3, py: 1.5}}
                >
                  Add Licence
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleClear}
                  className="btn-secondary"
                  sx={{ px: 3, py: 1.5 }}
                >
                  Clear
                </Button>
              </Box>
            </Box>
          </Paper>
      )}
    </Box>
  );
}

export default Licence_Certification;
