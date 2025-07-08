import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  PhotoCamera,
} from '@mui/icons-material';
import Textfield from '../textField/TextField';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: 'Male' | 'Female' | 'Other';
  licenceExpireDate: string;
  employeeId: string;
  username: string;
  password: string;
  email: string;
  address: string;
  unitNumber: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  username?: string;
  password?: string;
  email?: string;
}

interface PersonalDetailsFormProps {
  mode: 'add' | 'edit';
  initialData?: Partial<PersonalInfo>;
  onSubmit: (data: PersonalInfo) => void;
  onCancel: () => void;
  isFirstStep?: boolean;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
  mode,
  initialData = {},
  onSubmit,
  onCancel,
  isFirstStep = true,
}) => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    phoneNumber: initialData.phoneNumber || '',
    gender: initialData.gender || 'Male',
    licenceExpireDate: initialData.licenceExpireDate || '',
    employeeId: initialData.employeeId || '',
    username: initialData.username || '',
    password: initialData.password || '',
    email: initialData.email || '',
    address: initialData.address || '',
    unitNumber: initialData.unitNumber || '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (initialData) {
      setPersonalInfo(prev => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!personalInfo.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!personalInfo.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!personalInfo.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d+$/.test(personalInfo.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must contain only digits';
    }
    if (!personalInfo.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (mode === 'add' && !personalInfo.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (mode === 'add' && personalInfo.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (personalInfo.email && !/\S+@\S+\.\S+/.test(personalInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(personalInfo);
    }
  };

  return (
    <Box className="form-container">
      <Typography variant="h6" className="form-section-title mb-3">
        {mode === 'edit' ? 'Edit Personal Details' : 'Personal Detail'}
      </Typography>

      <Box className="flex-center mb-3">
        <Avatar className="avatar-large">
          <IconButton>
            <PhotoCamera />
          </IconButton>
        </Avatar>
        {mode === 'edit' && (
          <Typography variant="body2" sx={{ mt: 1, color: '#666' }}>
            Edit Photo
          </Typography>
        )}
      </Box>

      {/* Name Fields */}
      <Box className="form-row">
        <Box className="form-field">
          <Textfield
            label="First name"
            value={personalInfo.firstName}
            onChange={(value: string) => handlePersonalInfoChange('firstName', value)}
            required
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
        </Box>
        <Box className="form-field">
          <Textfield
            label="Last name"
            value={personalInfo.lastName}
            onChange={(value: string) => handlePersonalInfoChange('lastName', value)}
            required
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Box>
      </Box>

      {/* Username and Gender Row */}
      <Box className="form-row">
        <Box className="form-field">
          <Textfield
            label="Username"
            value={personalInfo.username}
            onChange={(value: string) => handlePersonalInfoChange('username', value)}
            required
            error={!!errors.username}
            helperText={errors.username}
          />
        </Box>
        <Box className="form-field">
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
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

      {/* Password Field (Only for Add Mode) */}
      {mode === 'add' && (
        <Textfield
          label="Password"
          type="password"
          value={personalInfo.password}
          onChange={(value: string) => handlePersonalInfoChange('password', value)}
          required
          error={!!errors.password}
          helperText={errors.password}
        />
      )}

      {/* Phone and Email Row */}
      <Box className="form-row">
        <Box className="form-field">
          <Textfield
            label="Phone Number"
            value={personalInfo.phoneNumber}
            onChange={(value: string) => handlePersonalInfoChange('phoneNumber', value)}
            required
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
          />
        </Box>
        <Box className="form-field">
          <Textfield
            label="Email Address"
            type="email"
            value={personalInfo.email}
            onChange={(value: string) => handlePersonalInfoChange('email', value)}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Box>
      </Box>

      {/* Address and Unit Number Row */}
      <Box className="form-row">
        <Box className="form-field">
          <Textfield
            label="Address"
            value={personalInfo.address}
            onChange={(value: string) => handlePersonalInfoChange('address', value)}
          />
        </Box>
        <Box className="form-field">
          <Textfield
            label="Unit Number"
            value={personalInfo.unitNumber}
            onChange={(value: string) => handlePersonalInfoChange('unitNumber', value)}
          />
        </Box>
      </Box>

      {/* Employee ID and License Date */}
      <Box className="form-row">
        <Box className="form-field">
          <Textfield
            label="Employee Id"
            value={personalInfo.employeeId}
            onChange={(value: string) => handlePersonalInfoChange('employeeId', value)}
          />
        </Box>
        {mode === 'add' && (
          <Box className="form-field">
            <Textfield
              label="Licence Expire Date"
              type="date"
              value={personalInfo.licenceExpireDate}
              onChange={(value: string) => handlePersonalInfoChange('licenceExpireDate', value)}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        )}
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, mt: 3 }}>
        <Button
          variant="outlined"
          onClick={onCancel}
          className='btn-secondary'
        >
          {mode === 'edit' ? 'Cancel' : (isFirstStep ? 'Cancel' : 'Back')}
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          className='btn-primary'
        >
          {mode === 'edit' ? 'Save' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};

export default PersonalDetailsForm;
