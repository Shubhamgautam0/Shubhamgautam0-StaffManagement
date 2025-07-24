import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  TextField,
  Grid,
  Divider,
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { MoreVert, Phone, Email, LocationOn, Edit, Save, Cancel, Delete } from '@mui/icons-material';
import { type SiteCustomer, updateCustomer, getAllCustomers } from '../../data/siteData';

interface CustomerDetailProps {
  customer: SiteCustomer | null;
  onCustomerUpdate: (updatedCustomer: SiteCustomer) => void;
  onEdit: () => void;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({
  customer,
  onCustomerUpdate,
  onEdit
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState<SiteCustomer | null>(customer);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  React.useEffect(() => {
    setEditedCustomer(customer);
    setIsEditing(false);
  }, [customer]);

  if (!customer) {
    return (
      <Paper className="customer-detail-container">
        <Box className="customer-detail-empty">
          <Typography variant="h6" color="textSecondary">
            Select a customer to view details
          </Typography>
        </Box>
      </Paper>
    );
  }

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string): string => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setMenuAnchor(null);
    onEdit();
  };

  const handleSave = () => {
    if (editedCustomer) {
      const success = updateCustomer(editedCustomer.id, editedCustomer);
      if (success) {
        onCustomerUpdate(editedCustomer);
        setIsEditing(false);
      }
    }
  };

  const handleCancel = () => {
    setEditedCustomer(customer);
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Add delete functionality here
    setMenuAnchor(null);
    console.log('Delete customer:', customer?.id);
  };

  const handleInputChange = (field: keyof SiteCustomer, value: string) => {
    if (editedCustomer) {
      setEditedCustomer({
        ...editedCustomer,
        [field]: value
      });
    }
  };

  const formatPhoneNumber = (phone: string): string => {
    // Add formatting logic if needed
    return phone;
  };

  return (
    <Paper className="customer-detail-container">
      <Box className="customer-detail-header">
        <Box className="customer-detail-profile">
          <Avatar
            className="customer-detail-avatar"
            style={{ backgroundColor: getAvatarColor(customer.name) }}
          >
            {getInitials(customer.name)}
          </Avatar>
          <Box className="customer-detail-info">
            <Typography variant="h5" className="customer-detail-name">
              {customer.name}
            </Typography>
            <Typography variant="body2" className="customer-detail-address">
              {customer.address}
            </Typography>
          </Box>
        </Box>
        
        <Box className="customer-detail-actions">
          <IconButton
            className="customer-menu-button"
            onClick={handleMenuOpen}
          >
            <MoreVert />
          </IconButton>

          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleEdit}>
              <ListItemIcon>
                <Edit fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <ListItemIcon>
                <Delete fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      <Box className="customer-contact-info">
        <Box className="customer-contact-item">
          <Phone className="contact-icon" />
          <Typography variant="body1">
            {formatPhoneNumber(customer.phone)}
          </Typography>
        </Box>
        <Box className="customer-contact-item">
          <Email className="contact-icon" />
          <Typography variant="body1">
            {customer.email}
          </Typography>
        </Box>
      </Box>

      <Divider className="customer-detail-divider" />

      <Box className="customer-detail-tabs">
        <Typography variant="h6" className="customer-info-title">
          More Info
        </Typography>
      </Box>

      <Box className="customer-info-section">
        <Typography variant="subtitle1" className="info-section-title">
          Info
        </Typography>
        
        <Grid container spacing={3} className="customer-info-grid">
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Name"
              value={editedCustomer?.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={!isEditing}
              className="customer-info-field"
              required
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Contact Number"
              value={editedCustomer?.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={!isEditing}
              className="customer-info-field"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Select
                      value="+91"
                      disabled={!isEditing}
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
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Email"
              value={editedCustomer?.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!isEditing}
              className="customer-info-field"
              type="email"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Address"
              value={editedCustomer?.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              disabled={!isEditing}
              className="customer-info-field"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Save/Cancel buttons at bottom when editing */}
      {isEditing && (
        <Box className="customer-detail-bottom-actions">
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
            className="save-customer-button"
          >
            Save
          </Button>
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            onClick={handleCancel}
            className="cancel-customer-button"
          >
            Cancel
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default CustomerDetail;
