import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Paper,
} from '@mui/material';
import {
  Close,
} from '@mui/icons-material';
import Availability from './Availability';
import Licence_Certification from './Licence_Certification';
import PersonalDetailsForm from './PersonalDetailsForm';

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

interface AddStaffFormProps {
  onClose: () => void;
  onSubmit: (staffData: any) => void;
  mode?: 'add' | 'edit';
  initialData?: Partial<PersonalInfo>;
}

const AddStaffForm: React.FC<AddStaffFormProps> = ({
  onClose,
  onSubmit,
  mode = 'add',
  initialData = {}
}) => {
  const [activeStep, setActiveStep] = useState(0);
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

  const steps = ['Personal Info', 'Availability', 'Licences'];

  const validateStep = (): boolean => {
    // Validation is now handled in PersonalDetailsForm
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    
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



  const handleSubmit = () => {
    const newStaff = {
      id: Date.now().toString(),
      name: `${personalInfo.firstName} ${personalInfo.lastName}`,
      phone: personalInfo.phoneNumber,
      email: `${personalInfo.email || ''}`,
      address: `${personalInfo.address || ''}`,
      status: 'Active' as const,
      initials: `${personalInfo.firstName.charAt(0)}${personalInfo.lastName.charAt(0)}`,
      gender: personalInfo.gender,
      employeeId: personalInfo.employeeId,
      username: personalInfo.username,
    };

    onSubmit(newStaff);
    onClose();
  };

  const handlePersonalDetailsSubmit = (data: PersonalInfo) => {
  setPersonalInfo(data);
  if (mode === 'edit') {
    const updatedStaff = {
      id: Date.now().toString(), 
      name: `${data.firstName} ${data.lastName}`,
      phone: data.phoneNumber,
      email: `${data.email || ''}`,
      address: `${data.address || ''}`,
      status: 'Active' as const,
      initials: `${data.firstName.charAt(0)}${data.lastName.charAt(0)}`,
      gender: data.gender,
      employeeId: data.employeeId,
      username: data.username,
    };
    onSubmit(updatedStaff);
  } else {
    handleNext();
  }
};

  const handlePersonalDetailsCancel = () => {
    if (mode === 'edit') {
      onClose();
    } else {
      handleBack();
    }
  };

  const renderPersonalInfo = () => (
    <PersonalDetailsForm
      mode={mode}
      initialData={personalInfo}
      onSubmit={handlePersonalDetailsSubmit}
      onCancel={handlePersonalDetailsCancel}
    />
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
    <Paper sx={{ width: '800px', maxWidth: '100%', borderRadius: 2, display: 'flex',flexDirection: 'column',maxHeight: '90vh', }}>
      <Box sx={{ p: 3, borderBottom: '1px solid #eee' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {mode === 'edit' ? 'Edit Staff' : 'Add Staff'}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        {mode === 'add' && (
          <Box sx={{ mt: 3 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel sx={{ '& .MuiStepLabel-label': { fontSize: '14px' } }}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        )}
      </Box>

      <Box sx={{ p: 3, overflowY: 'auto' }}>
        {mode === 'edit' ? renderPersonalInfo() : renderStepContent()}
      </Box>

      {mode === 'add' && activeStep !== 0 && (
        <Box sx={{ p: 3, borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-start', gap: 2, mb: 3 , flexShrink:0}}>
          <Button
            variant="outlined"
            onClick={handleBack}
            className='btn-secondary'
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            className='btn-primary'
          >
            {activeStep === steps.length - 1 ? 'Add Staff' : 'Next'}
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default AddStaffForm;