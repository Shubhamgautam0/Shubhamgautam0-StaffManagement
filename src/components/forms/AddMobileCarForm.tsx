import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Checkbox,
  FormControlLabel,
  Divider,
  IconButton,
} from '@mui/material';
import {
  CameraAlt,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';

interface AddMobileCarFormProps {
  onSave: (mobileCarData: any) => void;
  onCancel: () => void;
}

interface MobileCarData {
  patrolName: string;
  carNumber: string;
  carDescription: string;
  patrolEmail: string;
  startDutyAddress: string;
  enforceGeofence: boolean;
  instructions: string[];
  licenses: string[];
  assignedManager: string;
}

const AddMobileCarForm: React.FC<AddMobileCarFormProps> = ({ onSave, onCancel }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [formData, setFormData] = useState<MobileCarData>({
    patrolName: '',
    carNumber: '',
    carDescription: '',
    patrolEmail: '',
    startDutyAddress: '',
    enforceGeofence: false,
    instructions: [],
    licenses: ['Security Worker Licence'],
    assignedManager: '',
  });

  const handleInputChange = (field: keyof MobileCarData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const handleAddInstruction = () => {
    // This would open a modal or form to add instructions
    console.log('Add site instruction clicked');
  };

  const handleAddLicense = () => {
    // This would open a modal or form to add licenses
    console.log('Add license clicked');
  };

  const handleAddManager = () => {
    // This would open a modal or form to add manager
    console.log('Add manager clicked');
  };

  return (
    <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
      {/* Header */}
      <Typography variant="h5" sx={{
        fontWeight: 600,
        color: 'var(--clr-text-primary)',
        mb: 3
      }}>
        Add Mobile Car
      </Typography>

      {/* Profile Section */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 4 }}>
        {/* Avatar */}
        <Box sx={{ position: 'relative' }}>
          <Avatar sx={{
            width: 80,
            height: 80,
            backgroundColor: 'var(--clr-purple)',
            fontSize: '32px',
            fontWeight: 600
          }}>
            P
          </Avatar>
          <IconButton
            sx={{
              position: 'absolute',
              bottom: -5,
              right: -5,
              backgroundColor: 'var(--clr-white)',
              border: '2px solid var(--clr-border-light)',
              width: 32,
              height: 32,
              '&:hover': {
                backgroundColor: 'var(--clr-bg-light)',
              },
            }}
          >
            <CameraAlt sx={{ fontSize: '16px' }} />
          </IconButton>
        </Box>

        {/* Form Fields */}
        <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <TextField
            label="Patrol Name"
            required
            value={formData.patrolName}
            onChange={(e) => handleInputChange('patrolName', e.target.value)}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'var(--clr-border-light)',
                },
                '&:hover fieldset': {
                  borderColor: 'var(--clr-purple)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--clr-purple)',
                },
              },
            }}
          />

          <TextField
            label="Car Number"
            value={formData.carNumber}
            onChange={(e) => handleInputChange('carNumber', e.target.value)}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'var(--clr-border-light)',
                },
                '&:hover fieldset': {
                  borderColor: 'var(--clr-purple)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--clr-purple)',
                },
              },
            }}
          />

          <TextField
            label="Car Description"
            value={formData.carDescription}
            onChange={(e) => handleInputChange('carDescription', e.target.value)}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'var(--clr-border-light)',
                },
                '&:hover fieldset': {
                  borderColor: 'var(--clr-purple)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--clr-purple)',
                },
              },
            }}
          />

          <TextField
            label="Patrol Email"
            value={formData.patrolEmail}
            onChange={(e) => handleInputChange('patrolEmail', e.target.value)}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'var(--clr-border-light)',
                },
                '&:hover fieldset': {
                  borderColor: 'var(--clr-purple)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--clr-purple)',
                },
              },
            }}
          />
        </Box>
      </Box>

       {/* Map Section */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{
                height: 300,
                border: '1px solid #ddd',
                borderRadius: 1,
                overflow: 'hidden'
              }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635959542132!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Box>
            </Box>

      {/* Start Duty Address */}
      <TextField
        label="Start Duty Address"
        required
        fullWidth
        value={formData.startDutyAddress}
        onChange={(e) => handleInputChange('startDutyAddress', e.target.value)}
        size="small"
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'var(--clr-border-light)',
            },
            '&:hover fieldset': {
              borderColor: 'var(--clr-purple)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--clr-purple)',
            },
          },
        }}
      />

      {/* Toggle Details */}
      <Button
        onClick={() => setShowDetails(!showDetails)}
        startIcon={showDetails ? <ExpandLess /> : <ExpandMore />}
        sx={{
          color: 'var(--clr-purple)',
          textTransform: 'none',
          fontWeight: 500,
          mb: 2,
          '&:hover': {
            backgroundColor: 'var(--clr-purple-light)',
          },
        }}
      >
        {showDetails ? 'HIDE DETAILS' : 'ADD MORE DETAILS'}
      </Button>

      {/* Additional Details */}
      {showDetails && (
        <Box sx={{ mb: 3 }}>
          {/* Mobile Patrol Instructions */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--clr-text-primary)' }}>
                Mobile Patrol Instructions
              </Typography>
              <Button
                variant="outlined"
                onClick={handleAddInstruction}
                sx={{
                  color: 'var(--clr-purple)',
                  borderColor: 'var(--clr-purple)',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'var(--clr-purple-light)',
                    borderColor: 'var(--clr-purple)',
                  },
                }}
              >
                ADD SITE INSTRUCTION
              </Button>
            </Box>
            <Divider sx={{ backgroundColor: 'var(--clr-border-light)' }} />
          </Box>

          {/* Required License & Certifications */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--clr-text-primary)' }}>
                Required License & Certifications
              </Typography>
              <Button
                variant="outlined"
                onClick={handleAddLicense}
                sx={{
                  color: 'var(--clr-purple)',
                  borderColor: 'var(--clr-purple)',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'var(--clr-purple-light)',
                    borderColor: 'var(--clr-purple)',
                  },
                }}
              >
                ADD LICENCE
              </Button>
            </Box>
            <Divider sx={{ backgroundColor: 'var(--clr-border-light)' }} />
          </Box>

          {/* Assigned Manager */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--clr-text-primary)' }}>
                Assigned Manager
              </Typography>
              <Button
                variant="outlined"
                onClick={handleAddManager}
                sx={{
                  color: 'var(--clr-purple)',
                  borderColor: 'var(--clr-purple)',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'var(--clr-purple-light)',
                    borderColor: 'var(--clr-purple)',
                  },
                }}
              >
                ADD MANAGER
              </Button>
            </Box>
            <Divider sx={{ backgroundColor: 'var(--clr-border-light)' }} />
          </Box>
        </Box>
      )}

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
        <Button
          variant="outlined"
          onClick={onCancel}
          sx={{
            color: 'var(--clr-text-secondary)',
            borderColor: 'var(--clr-border-light)',
            textTransform: 'none',
            px: 3,
            '&:hover': {
              backgroundColor: 'var(--clr-bg-light)',
              borderColor: 'var(--clr-border-light)',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            backgroundColor: 'var(--clr-purple)',
            color: 'var(--clr-white)',
            textTransform: 'none',
            px: 4,
            '&:hover': {
              backgroundColor: 'var(--clr-purple-dark)',
            },
          }}
        >
          FINISH
        </Button>
      </Box>
    </Box>
  );
};

export default AddMobileCarForm;
