import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Avatar,
  IconButton,
  Paper,
} from '@mui/material';
import {
  Close,
  PhotoCamera,
} from '@mui/icons-material';
import Availability from './Availability';
import Licence_Certification from './Licence_Certification';

interface AddStaffFormProps {
  onClose: () => void;
  onSubmit: (staffData: any) => void;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: 'Male' | 'Female' | 'Other';
  licenceExpireDate: string;
  employeeId: string;
  username: string;
  password: string;
}

const AddStaffForm: React.FC<AddStaffFormProps> = ({ onClose, onSubmit }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: 'Male',
    licenceExpireDate: '',
    employeeId: '',
    username: '',
    password: '',
  });

  const steps = ['Personal Info', 'Availability', 'Licences'];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const newStaff = {
      id: Date.now().toString(),
      name: `${personalInfo.firstName} ${personalInfo.lastName}`,
      phone: personalInfo.phoneNumber,
      email: '',
      address: '',
      status: 'Active' as const,
      initials: `${personalInfo.firstName.charAt(0)}${personalInfo.lastName.charAt(0)}`,
      gender: personalInfo.gender,
      employeeId: personalInfo.employeeId,
      username: personalInfo.username,
    };

    onSubmit(newStaff);
    onClose();
  };

  const renderPersonalInfo = () => (
    <Box className="form-container">
      <Typography variant="h6" className="form-section-title">
        Personal Detail
      </Typography>

      <Box className="flex-center mb-3">
        <Avatar className="avatar-large">
          <IconButton>
            <PhotoCamera />
          </IconButton>
        </Avatar>
      </Box>

      <Box className="form-row">
        <Box className="form-field">
          <Typography variant="body2" className="form-field-label" >
            First name *
          </Typography>
          <TextField
            fullWidth
            placeholder="First Name"
            value={personalInfo.firstName}
            onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
            className="input-field"
          />
        </Box>
        <Box className="form-field">
          <Typography variant="body2" className="form-field-label" >
            Last name *
          </Typography>
          <TextField
            fullWidth
            placeholder="Last name"
            value={personalInfo.lastName}
            onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
            className="input-field"
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" className="form-field-label"  >
            Phone Number *
          </Typography>
          <TextField
            fullWidth
            placeholder="Phone Number"
            value={personalInfo.phoneNumber}
            onChange={(e) => handlePersonalInfoChange('phoneNumber', e.target.value)}
            className='input-field'
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" >
            Gender
          </Typography>
          <RadioGroup
            row
            value={personalInfo.gender}
            onChange={(e) => handlePersonalInfoChange('gender', e.target.value as 'Male' | 'Female' | 'Other')}
          >
            <FormControlLabel value="Male" control={<Radio size="small" />} label="Male" />
            <FormControlLabel value="Female" control={<Radio size="small" />} label="Female" />
            <FormControlLabel value="Other" control={<Radio size="small" />} label="Other" />
          </RadioGroup>
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" className='form-field-label' >
          Licence Expire Date
        </Typography>
        <TextField
          type="date"
          fullWidth
          value={personalInfo.licenceExpireDate}
          onChange={(e) => handlePersonalInfoChange('licenceExpireDate', e.target.value)}
          className='input-field'
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" className='form-field-label' >
          Employee Id
        </Typography>
        <TextField
          fullWidth
          placeholder="Employee Id"
          value={personalInfo.employeeId}
          onChange={(e) => handlePersonalInfoChange('employeeId', e.target.value)}
          className='input-field'
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" className='form-field-label' >
            Username *
          </Typography>
          <TextField
            fullWidth
            placeholder="Username"
            value={personalInfo.username}
            onChange={(e) => handlePersonalInfoChange('username', e.target.value)}
            className='input-field'
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" className='form-field-label' >
            Password *
          </Typography>
          <TextField
            fullWidth
            type="password"
            placeholder="Password"
            value={personalInfo.password}
            onChange={(e) => handlePersonalInfoChange('password', e.target.value)}
            className='input-field'
          />
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Button variant="text" sx={{ color: '#9D00FF', textTransform: 'none', p: 0 }}>
          + Add More Details
        </Button>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Button variant="text" sx={{ color: '#9D00FF', textTransform: 'none', p: 0 }}>
          + Add More Info.
        </Button>
      </Box>
    </Box>
  );

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return renderPersonalInfo();
      case 1:
        return <Availability />;
      case 2:
        return <Licence_Certification />;
      default:
        return null;
    }
  };

  return (
    <Paper className="paper-container">
      <Box className="form-header">
        <Typography variant="h6" className="form-title">
          Add Staff
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <Box className="form-stepper-container">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  '& .MuiStepLabel-label': {
                    fontSize: '14px',
                  },
                }}
                className="stepper-label"
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Box className="form-content">
        {renderStepContent()}
      </Box>

      <Box className="form-footer">
        <Button
          variant="outlined"
          onClick={activeStep === 0 ? onClose : handleBack}
          className="btn-secondary"
        >
          {activeStep === 0 ? 'Cancel' : 'Back'}
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          className="btn-primary"
          sx={{ mr: 6 }}
        >
          {activeStep === steps.length - 1 ? 'Add Staff' : 'Next'}
        </Button>
      </Box>
    </Paper>
  );
};

export default AddStaffForm;
