import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Autocomplete,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import type { SiteMember, SiteCustomer } from '../../data/siteData';
import { CustomerData } from '../../data/siteData';

interface EditSiteFormProps {
  site: SiteMember;
  onSave: (updatedSite: SiteMember) => void;
  onCancel: () => void;
}

const EditSiteForm: React.FC<EditSiteFormProps> = ({ site, onSave, onCancel }) => {
  const [formData, setFormData] = useState<SiteMember>({
    ...site
  });
  const [selectedCustomer, setSelectedCustomer] = useState<SiteCustomer | null>(
    site.customer || null
  );

  useEffect(() => {
    setFormData({ ...site });
    setSelectedCustomer(site.customer || null);
  }, [site]);

  const handleInputChange = (field: keyof SiteMember, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCustomerChange = (customer: SiteCustomer | null) => {
    setSelectedCustomer(customer);
    setFormData(prev => ({
      ...prev,
      customer: customer || undefined,
      customerName: customer?.name || ''
    }));
  };

  const handleSave = () => {
    const updatedSite: SiteMember = {
      ...formData,
      customer: selectedCustomer || undefined,
      customerName: selectedCustomer?.name || formData.customerName || ''
    };
    onSave(updatedSite);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleInputChange('avatar', result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box className="edit-site-form-container">
      <Typography variant="h5" className="edit-site-form-title">
        Edit Site
      </Typography>

      <Box className="edit-site-form-content">
        {/* Site Image Upload */}
        <Box className="edit-site-image-section">
          <Avatar 
            className="edit-site-avatar"
            src={formData.avatar}
            sx={{ 
              width: 40, 
              height: 40, 
              fontSize: '1rem',
              backgroundColor: '#6366f1',
              color: 'white'
            }}
          >
            {formData.initials || formData.name?.charAt(0) || 'A'}
          </Avatar>
          <Box className="edit-site-image-upload">
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="site-image-upload"
              type="file"
              onChange={handleImageUpload}
            />
            <label htmlFor="site-image-upload">
              <Button
                variant="text"
                component="span"
                sx={{ 
                  color: '#6366f1',
                  textTransform: 'none',
                  fontSize: '0.875rem'
                }}
              >
                Browse Image
              </Button>
            </label>
          </Box>
        </Box>

        {/* Site Name */}
        <Box className="edit-site-form-field">
          <Typography variant="body2" className="edit-site-form-label">
            Site Name
          </Typography>
          <TextField
            fullWidth
            value={formData.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter site name"
            variant="outlined"
            size="medium"
             />
        </Box>

        {/* Add Customer */}
        <Box className="edit-site-form-field">
          <Typography variant="body2" className="edit-site-form-label">
            Add Customer
          </Typography>
          <Autocomplete
            value={selectedCustomer}
            onChange={(_, newValue) => handleCustomerChange(newValue)}
            options={CustomerData}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search Customer"
                variant="outlined"
                size="medium"
              />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    {option.name}
                  </Typography>
                </Box>
              </Box>
            )}
          />
        </Box>

        {/* Action Buttons */}
        <Box className="edit-site-form-actions">
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: '#6366f1',
              color: 'white',
              textTransform: 'none',
              borderRadius: '8px',
              px: 3,
              py: 1,
              '&:hover': {
                backgroundColor: '#5856eb'
              }
            }}
          >
            SAVE
          </Button>
          <Button
            variant="outlined"
            onClick={onCancel}
            sx={{
              borderColor: '#d1d5db',
              color: '#6b7280',
              textTransform: 'none',
              borderRadius: '8px',
              px: 3,
              py: 1,
              '&:hover': {
                borderColor: '#9ca3af',
                backgroundColor: '#f9fafb'
              }
            }}
          >
            BACK
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditSiteForm;
