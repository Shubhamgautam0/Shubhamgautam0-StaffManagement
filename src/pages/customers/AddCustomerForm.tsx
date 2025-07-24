import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider
} from '@mui/material';
import { Close, Search } from '@mui/icons-material';
import { addCustomer, getAllCustomers, type SiteCustomer } from '../../data/siteData';

interface AddCustomerFormProps {
  open: boolean;
  onClose: () => void;
  onCustomerAdded: (customer: SiteCustomer) => void;
  isDrawer?: boolean;
  editingCustomer?: SiteCustomer | null;
}

interface CustomerFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  lastName: string;
  site: string;
}

const AddCustomerForm: React.FC<AddCustomerFormProps> = ({
  open,
  onClose,
  onCustomerAdded,
  isDrawer = true,
  editingCustomer = null
}) => {
  const [formData, setFormData] = useState<CustomerFormData>({
    name: editingCustomer ? editingCustomer.name.split(' ')[0] || '' : '',
    phone: editingCustomer ? editingCustomer.phone.replace(/^\+\d+\s*/, '') || '' : '',
    email: editingCustomer ? editingCustomer.email || '' : '',
    address: editingCustomer ? editingCustomer.address || '' : '',
    lastName: editingCustomer ? editingCustomer.name.split(' ').slice(1).join(' ') || '' : '',
    site: ''
  });

  const [countryCode, setCountryCode] = useState('+91');
  const [errors, setErrors] = useState<Partial<CustomerFormData>>({});

  const handleInputChange = (field: keyof CustomerFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
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
    const newErrors: Partial<CustomerFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Contact number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const customerData: Omit<SiteCustomer, 'id'> = {
        name: `${formData.name} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: `${countryCode}${formData.phone}`,
        address: formData.address
      };

      if (editingCustomer) {
        // Update existing customer
        const updatedCustomer = { ...editingCustomer, ...customerData };
        onCustomerAdded(updatedCustomer);
      } else {
        // Add new customer
        const newCustomer = addCustomer(customerData);
        onCustomerAdded(newCustomer);
      }
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      lastName: '',
      site: ''
    });
    setErrors({});
    onClose();
  };

  const sites = [
    'malhar madhyapradesh',
    'Orange Tech Hub',
    'Target Pasadena',
    'Walmart Express',
    'Unity Church Center'
  ];

  const formContent = (
    <Box className="add-customer-form-container">
        <Box className="add-customer-form-header">
          <Typography variant="h6" className="add-customer-form-title">
            {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
          </Typography>
          {isDrawer && (
            <IconButton onClick={handleClose} className="close-button">
              <Close />
            </IconButton>
          )}
        </Box>

        <Box className="add-customer-form-content">
          <Box className="form-fields-container">
            <Box className="form-field-box">
              <FormControl fullWidth>
                <InputLabel>Site</InputLabel>
                <Select
                  value={formData.site}
                  onChange={(e) => handleInputChange('site', e.target.value)}
                  label="Site"
                  className="site-select"
                >
                  <MenuItem value="">Select Site</MenuItem>
                  {sites.map((site) => (
                    <MenuItem key={site} value={site}>
                      {site}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box className="form-field-box">
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                required
                className="customer-form-field"
              />
            </Box>

            <Box className="form-field-box">
              <TextField
                fullWidth
                label="Contact Number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                error={!!errors.phone}
                helperText={errors.phone}
                required
                className="customer-form-field"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="country-code-select"
                      >
                        <MenuItem value="+91">+91</MenuItem>
                        <MenuItem value="+1">+1</MenuItem>
                        <MenuItem value="+44">+44</MenuItem>
                      </Select>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box className="form-field-box">
              <TextField
                fullWidth
                label="Email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                required
                type="email"
                className="customer-form-field"
              />
              <Typography variant="caption" className="email-helper-text">
                Comma separated emails
              </Typography>
            </Box>

            <Box className="form-field-box">
              <TextField
                fullWidth
                label="Address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                error={!!errors.address}
                helperText={errors.address}
                required
                className="customer-form-field"
              />
            </Box>

            <Box className="form-field-box">
              <TextField
                fullWidth
                label="CUSTOMER LAST NAME"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                error={!!errors.lastName}
                helperText={errors.lastName}
                required
                className="customer-form-field"
              />
            </Box>
          </Box>
        </Box>

        <Divider className="form-divider" />

        <Box className="add-customer-form-actions">
          <Button
            variant="contained"
            onClick={handleSubmit}
            className="add-button"
          >
            {editingCustomer ? 'UPDATE' : 'ADD'}
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            className="cancel-button"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    );

  if (isDrawer) {
    return (
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        className="add-customer-drawer"
        PaperProps={{
          className: "add-customer-drawer-paper"
        }}
      >
        {formContent}
      </Drawer>
    );
  }

  return formContent;
};

export default AddCustomerForm;
