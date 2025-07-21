import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  Chip,
  IconButton,
  Collapse,
  Divider,
} from '@mui/material';
import {
  PhotoCamera,
  ExpandLess,
  ExpandMore,
  Add,
  Person,
} from '@mui/icons-material';
import AddCustomerForm from './AddCustomerForm';
import {
  getAllCustomers,
  type SiteCustomer
} from '../../data/siteData';



// Dummy licence data
const dummyLicences = [
  'Security Guard License',
  'Fire Safety Certificate',
  'First Aid Certification',
  'CPR Certification',
  'Armed Security License',
  'Crowd Control License'
];

// Dummy manager data
const dummyManagers = [
  {
    id: '1',
    name: 'Robert Anderson',
    email: 'robert.anderson@security.com',
    phone: '+1 (555) 111-2222',
    position: 'Site Manager'
  },
  {
    id: '2',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@security.com',
    phone: '+1 (555) 222-3333',
    position: 'Operations Manager'
  },
  {
    id: '3',
    name: 'James Rodriguez',
    email: 'james.rodriguez@security.com',
    phone: '+1 (555) 333-4444',
    position: 'Security Supervisor'
  }
];

interface AddSiteFormProps {
  onSave: (siteData: any) => void;
  onCancel: () => void;
}

function AddSiteForm({ onSave, onCancel }: AddSiteFormProps) {
  const [formData, setFormData] = useState({
    siteName: '',
    areaTags: [] as string[],
    address: '',
    enforceGeofence: false,
    customer: null as SiteCustomer | null,
    licences: [] as string[],
    assignedManager: null as any,
  });

  const [showDetails, setShowDetails] = useState(false);
  const [newAreaTag, setNewAreaTag] = useState('');
  const [customers, setCustomers] = useState<SiteCustomer[]>([]);
  const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);

  // Load customers on component mount
  React.useEffect(() => {
    const allCustomers = getAllCustomers();
    setCustomers(allCustomers);
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddAreaTag = () => {
    if (newAreaTag.trim() && !formData.areaTags.includes(newAreaTag.trim())) {
      setFormData(prev => ({
        ...prev,
        areaTags: [...prev.areaTags, newAreaTag.trim()]
      }));
      setNewAreaTag('');
    }
  };

  const handleRemoveAreaTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      areaTags: prev.areaTags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddCustomer = () => {
    setShowAddCustomerForm(true);
  };

  const handleCustomerAdded = (newCustomer: SiteCustomer) => {
    setCustomers(prev => [...prev, newCustomer]);
    setFormData(prev => ({ ...prev, customer: newCustomer }));
    setShowAddCustomerForm(false);
  };

  const handleSave = () => {
    if (formData.siteName.trim() && formData.address.trim()) {
      const siteData = {
        id: Date.now().toString(),
        name: formData.siteName.trim(),
        address: formData.address.trim(),
        areaTags: formData.areaTags,
        enforceGeofence: formData.enforceGeofence,
        customer: formData.customer,
        licences: formData.licences,
        assignedManager: formData.assignedManager,
        createdDate: new Date().toISOString().split('T')[0],
        status: 'Active'
      };

      onSave(siteData);
    }
  };

  return (
    <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
      {/* Header */}
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Add Site
      </Typography>

      {/* Site Image */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            backgroundColor: '#9CA3AF',
            mr: 2
          }}
        >
          <PhotoCamera sx={{ fontSize: 32, color: 'white' }} />
        </Avatar>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
            Site Name
          </Typography>
          <input
          type="text"
          style={{ minWidth: '300px' }}
          className="staff-details-area-input"
          placeholder="Site Name"
           value={formData.siteName}
            onChange={(e) => handleInputChange('siteName', e.target.value)}
            
        />
        </Box>
      </Box>

      {/* Area Tags */}
      <Box className="staff-details-area-tags" sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" className="staff-details-area-label">
          Area Tags:
        </Typography>
        <input
          type="text"
          className="staff-details-area-input"
          placeholder="Enter area tags"
          value={newAreaTag}
          onChange={(e) => setNewAreaTag(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddAreaTag()}
        />
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

        <TextField
          fullWidth
          placeholder="Enter site address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          sx={{ mt: 2 }}
        />
      </Box>

      {/* Expandable Details Section */}
      <Box sx={{ mb: 3 }}>
        <Button
          onClick={() => setShowDetails(!showDetails)}
          sx={{
            color: '#6366F1',
            textTransform: 'none',
            fontWeight: 500,
            p: 0,
            mb: 2
          }}
        >
          {showDetails ? ' HIDE DETAILS' : ' ADD MORE DETAILS'}
        </Button>

        <Collapse in={showDetails}>
          <Box sx={{ pl: 2, borderLeft: '2px solid #f0f0f0' }}>
            {/* Add Customer */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                Add Customer
              </Typography>
              <Autocomplete
                options={customers}
                getOptionLabel={(option) => option.name}
                value={formData.customer}
                onChange={(_, newValue) => handleInputChange('customer', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search Customer"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {params.InputProps.endAdornment}
                          <Button
                            size="small"
                            onClick={handleAddCustomer}
                            sx={{
                              color: '#6366F1',
                              textTransform: 'none',
                              minWidth: 'auto',
                              p: 0.5
                            }}
                          >
                            Add New Customer
                          </Button>
                        </Box>
                      ),
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <Avatar sx={{ mr: 2, backgroundColor: '#6366F1', width: 32, height: 32 }}>
                      {option.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="body1">{option.name}</Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        {option.phone}
                      </Typography>
                    </Box>
                  </Box>
                )}
                noOptionsText={
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                      No customers found
                    </Typography>
                    <Button
                      size="small"
                      onClick={handleAddCustomer}
                      sx={{
                        color: '#6366F1',
                        textTransform: 'none'
                      }}
                    >
                      +Add New Customer
                    </Button>
                  </Box>
                }
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Licences & Certifications */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                Licences & Certifications
              </Typography>
              <Button
                startIcon={<Add />}
                sx={{
                  color: '#6366F1',
                  textTransform: 'none',
                  fontWeight: 500,
                  p: 0,
                  mb: 2
                }}
              >
                Add Licence
              </Button>
              <Autocomplete
                multiple
                options={dummyLicences}
                value={formData.licences}
                onChange={(_, newValue) => handleInputChange('licences', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select licences"
                    fullWidth
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                      key={index}
                    />
                  ))
                }
              />
            </Box>

            {/* Assigned Manager */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                Assigned Manager
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ mr: 2, backgroundColor: '#9CA3AF' }}>
                  <Person />
                </Avatar>
                {formData.assignedManager && (
                  <Box>
                    <Typography variant="body1">{formData.assignedManager.name}</Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {formData.assignedManager.position}
                    </Typography>
                  </Box>
                )}
              </Box>
              <Button
                startIcon={<Add />}
                sx={{
                  color: '#6366F1',
                  textTransform: 'none',
                  fontWeight: 500,
                  p: 0,
                  mb: 2
                }}
              >
                ADD MANAGER
              </Button>
              <Autocomplete
                options={dummyManagers}
                getOptionLabel={(option) => option.name}
                value={formData.assignedManager}
                onChange={(_, newValue) => handleInputChange('assignedManager', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search Manager"
                    fullWidth
                  />
                )}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <Avatar sx={{ mr: 2, backgroundColor: '#9CA3AF' }}>
                      <Person />
                    </Avatar>
                    <Box>
                      <Typography variant="body1">{option.name}</Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        {option.position} • {option.email}
                      </Typography>
                    </Box>
                  </Box>
                )}
              />
            </Box>
          </Box>
        </Collapse>
      </Box>

      {/* Action Buttons */}
      <Box sx={{
        display: 'flex',
        gap: 2,
        justifyContent: 'flex-end',
        pt: 2,
        borderTop: '1px solid #f0f0f0'
      }}>
        <Button
          variant="outlined"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            backgroundColor: '#6366F1',
            '&:hover': {
              backgroundColor: '#5856EB'
            }
          }}
        >
          Save Site
        </Button>
      </Box>

      {/* Add Customer Form */}
      <AddCustomerForm
        open={showAddCustomerForm}
        onClose={() => setShowAddCustomerForm(false)}
        onCustomerAdded={handleCustomerAdded}
      />
    </Box>
  );
}

export default AddSiteForm;
