import React, { useState } from 'react';
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
} from '@mui/material';
import {
  Add,
  Close,
} from '@mui/icons-material';

interface Licence {
  id: string;
  type: string;
  number: string;
  expiryDate: string;
}

const licenceTypes = [
  'Driving License',
  'Security License',
  'First Aid Certificate',
  'Food Safety Certificate',
  'Construction License',
  'Other',
];

function Licence_Certification() {
  const [showForm, setShowForm] = useState(false);
  const [licences, setLicences] = useState<Licence[]>([]);
  const [formData, setFormData] = useState({
    type: '',
    number: '',
    expiryDate: '2025-07-04',
  });

  const handleAddLicence = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({
      type: '',
      number: '',
      expiryDate: '2025-07-04',
    });
  };

  const handleClear = () => {
    setFormData({
      type: '',
      number: '',
      expiryDate: '2025-07-04',
    });
  };

  const handleSubmit = () => {
    if (formData.type && formData.number && formData.expiryDate) {
      const newLicence: Licence = {
        id: Date.now().toString(),
        type: formData.type,
        number: formData.number,
        expiryDate: formData.expiryDate,
      };
      setLicences([...licences, newLicence]);
      handleCloseForm();
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
        variant="outlined"
        startIcon={<Add />}
        onClick={handleAddLicence}
        className="btn-text"
        sx={{
          borderColor: '#7c4dff',
          '&:hover': {
            borderColor: '#6a3de8',
          },
        }}
      >
        Add Licences
      </Button>

      {/* Existing Licences List */}
      {licences.length > 0 && (
        <Box sx={{ mt: 3 }}>
          {licences.map((licence) => (
            <Paper
              key={licence.id}
              sx={{
                p: 2,
                mb: 2,
                border: '1px solid #e0e0e0',
                borderRadius: 1,
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                {licence.type}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Number: {licence.number}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Expires: {licence.expiryDate}
              </Typography>
            </Paper>
          ))}
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
                  <FormControl fullWidth>
                    <Select
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      displayEmpty
                      className="input-field"
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
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                    Licence Number *
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Licence Number"
                    value={formData.number}
                    onChange={(e) => handleInputChange('number', e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                      },
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ width: '50%' }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Licence Expiry Date *
                </Typography>
                <TextField
                  fullWidth
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                    },
                  }}
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
