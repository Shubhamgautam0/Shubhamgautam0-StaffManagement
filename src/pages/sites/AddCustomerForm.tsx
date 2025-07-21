import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import {
  Close,
} from '@mui/icons-material';
import { addCustomer, type SiteCustomer } from '../../data/siteData';

interface AddCustomerFormProps {
  open: boolean;
  onClose: () => void;
  onCustomerAdded: (customer: SiteCustomer) => void;
}

function AddCustomerForm({ open, onClose, onCustomerAdded }: AddCustomerFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  const [countryCode, setCountryCode] = useState('+1');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (formData.name.trim()) {
      const customerData = {
        name: formData.name.trim(),
        phone: formData.phone.trim() ? `${countryCode} ${formData.phone.trim()}` : '',
        email: formData.email.trim(),
        address: formData.address.trim()
      };

      const newCustomer = addCustomer(customerData);
      onCustomerAdded(newCustomer);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: ''
    });
    setCountryCode('+1');
    onClose();
  };

  const isFormValid = formData.name.trim() !== '';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: 400
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 2
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Create New Customer
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pb: 2 }}>
        {/* Customer Name */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1, color: '#666' }}>
            Customer Name <span style={{ color: '#f44336' }}>*</span>
          </Typography>
          <TextField
            fullWidth
            placeholder="Customer Name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1
              }
            }}
          />
        </Box>

        {/* Contact Number */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1, color: '#666' }}>
            Contact Number
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <FormControl sx={{ minWidth: 100 }}>
              <Select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1
                  }
                }}
              >
                <MenuItem value="+1">🇺🇸 +1</MenuItem>
                <MenuItem value="+91">🇮🇳 +91</MenuItem>
                <MenuItem value="+44">🇬🇧 +44</MenuItem>
                <MenuItem value="+86">🇨🇳 +86</MenuItem>
                <MenuItem value="+81">🇯🇵 +81</MenuItem>
                <MenuItem value="+49">🇩🇪 +49</MenuItem>
                <MenuItem value="+33">🇫🇷 +33</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1
                }
              }}
            />
          </Box>
        </Box>

        {/* Email */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1, color: '#666' }}>
            Email
          </Typography>
          <TextField
            fullWidth
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1
              }
            }}
          />
          <Typography variant="caption" sx={{ color: '#999', mt: 0.5, display: 'block' }}>
            Please add comma Separated Emails
          </Typography>
        </Box>

        {/* Address */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1, color: '#666' }}>
            Address
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Enter customer address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1
              }
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ 
        px: 3, 
        pb: 3,
        gap: 2,
        justifyContent: 'flex-end'
      }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderColor: '#ddd',
            color: '#666',
            '&:hover': {
              borderColor: '#bbb',
              backgroundColor: '#f5f5f5'
            }
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!isFormValid}
          sx={{
            backgroundColor: '#6366F1',
            '&:hover': {
              backgroundColor: '#5856EB'
            },
            '&:disabled': {
              backgroundColor: '#ddd',
              color: '#999'
            }
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCustomerForm;
