import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import './ReferEarn.css';

interface ReferEarnProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  referralName: string;
  referralEmail: string;
  referralPhone: string;
  yourName: string;
  yourEmail: string;
  yourPhone: string;
}

const ReferEarn: React.FC<ReferEarnProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    referralName: '',
    referralEmail: '',
    referralPhone: '',
    yourName: '',
    yourEmail: '',
    yourPhone: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.referralName.trim()) {
      newErrors.referralName = 'Referral name is required';
    }
    if (!formData.referralEmail.trim()) {
      newErrors.referralEmail = 'Referral email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.referralEmail)) {
      newErrors.referralEmail = 'Please enter a valid email';
    }
    if (!formData.referralPhone.trim()) {
      newErrors.referralPhone = 'Referral phone number is required';
    }
    if (!formData.yourName.trim()) {
      newErrors.yourName = 'Your name is required';
    }
    if (!formData.yourEmail.trim()) {
      newErrors.yourEmail = 'Your email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.yourEmail)) {
      newErrors.yourEmail = 'Please enter a valid email';
    }
    if (!formData.yourPhone.trim()) {
      newErrors.yourPhone = 'Your phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Handle form submission here
      onClose();
      // Reset form
      setFormData({
        referralName: '',
        referralEmail: '',
        referralPhone: '',
        yourName: '',
        yourEmail: '',
        yourPhone: '',
      });
    }
  };

  const handleClose = () => {
    onClose();
    setErrors({});
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      className="refer-earn-dialog"
    >
      <DialogContent className="refer-earn-content">
        {/* Close Button */}
        <IconButton
          onClick={handleClose}
          className="refer-earn-close-button"
        >
          <Close />
        </IconButton>

        {/* Header */}
        <Box className="refer-earn-header">
          <Typography variant="h4" className="refer-earn-title">
            Refer a friend
          </Typography>
          <Typography variant="body1" className="refer-earn-subtitle">
            Just fill out our Referral form to let us know who we should get in touch with,
            then your work is done! Sit back and relax
          </Typography>
        </Box>

        {/* Illustration */}
        <Box className="refer-earn-illustration">
          <Box className="refer-earn-image-placeholder">
            <Typography variant="body2" sx={{ color: '#8B5CF6', textAlign: 'center' }}>
              🤝 Refer Friends & Earn Rewards 🎉
            </Typography>
          </Box>
        </Box>

        {/* Form */}
        <Box className="refer-earn-form">
          {/* Referral's Information */}
          <Typography variant="h6" className="form-section-title">
            Referral's information
          </Typography>
          
          <Grid container spacing={2} className="form-row">
            <Grid item xs={12} md={6}>
              <Typography variant="body2" className="form-field-label">
                Referral's Name<span className="required-asterisk">*</span>
              </Typography>
              <TextField
                fullWidth
                value={formData.referralName}
                onChange={handleInputChange('referralName')}
                error={!!errors.referralName}
                helperText={errors.referralName}
                className="refer-earn-input"
                placeholder="Enter referral's name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" className="form-field-label">
                Referral's Email Address<span className="required-asterisk">*</span>
              </Typography>
              <TextField
                fullWidth
                type="email"
                value={formData.referralEmail}
                onChange={handleInputChange('referralEmail')}
                error={!!errors.referralEmail}
                helperText={errors.referralEmail}
                className="refer-earn-input"
                placeholder="Enter referral's email"
              />
            </Grid>
          </Grid>

          <Box className="form-field">
            <Typography variant="body2" className="form-field-label">
              Referral's Phone Number<span className="required-asterisk">*</span>
            </Typography>
            <TextField
              fullWidth
              value={formData.referralPhone}
              onChange={handleInputChange('referralPhone')}
              error={!!errors.referralPhone}
              helperText={errors.referralPhone}
              className="refer-earn-input"
              placeholder="Enter referral's phone number"
            />
          </Box>

          {/* Your Information */}
          <Typography variant="h6" className="form-section-title your-info-title">
            Your information
          </Typography>
          
          <Grid container spacing={2} className="form-row">
            <Grid item xs={12} md={6}>
              <Typography variant="body2" className="form-field-label">
                Your Name<span className="required-asterisk">*</span>
              </Typography>
              <TextField
                fullWidth
                value={formData.yourName}
                onChange={handleInputChange('yourName')}
                error={!!errors.yourName}
                helperText={errors.yourName}
                className="refer-earn-input"
                placeholder="Enter your name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" className="form-field-label">
                Your Email Address<span className="required-asterisk">*</span>
              </Typography>
              <TextField
                fullWidth
                type="email"
                value={formData.yourEmail}
                onChange={handleInputChange('yourEmail')}
                error={!!errors.yourEmail}
                helperText={errors.yourEmail}
                className="refer-earn-input"
                placeholder="Enter your email"
              />
            </Grid>
          </Grid>

          <Box className="form-field">
            <Typography variant="body2" className="form-field-label">
              Your Phone Number<span className="required-asterisk">*</span>
            </Typography>
            <TextField
              fullWidth
              value={formData.yourPhone}
              onChange={handleInputChange('yourPhone')}
              error={!!errors.yourPhone}
              helperText={errors.yourPhone}
              className="refer-earn-input"
              placeholder="Enter your phone number"
            />
          </Box>

          {/* Submit Button */}
          <Box className="refer-earn-submit-container">
            <Button
              variant="contained"
              onClick={handleSubmit}
              className="refer-earn-submit-button"
            >
              Finish
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ReferEarn;
