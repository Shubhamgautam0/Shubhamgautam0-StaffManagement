import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  MoreVert
} from '@mui/icons-material';
import type { StaffMember } from '../../data/staffData';

interface StaffDetailsProps {
  staff: StaffMember | null;
  onEditClick?: (staff: StaffMember) => void;
}

const StaffDetails: React.FC<StaffDetailsProps> = ({ staff, onEditClick }) => {
  const [menuItem, setMenuitem] = useState<null | HTMLElement>(null);
  const open = Boolean(menuItem);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuitem(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuitem(null);
  };

  const handleMenuAction = (action: string) => {
   if (action === 'edit' && staff && onEditClick) {
      onEditClick(staff);
    }

    handleMenuClose();
  };
  if (!staff) {
    return (
      <Box className="staff-details-empty">
        <Box className="staff-details-empty-icon">
          <Phone sx={{ fontSize: 32, color: '#ccc' }} />
        </Box>
        <Typography variant="h6" className="staff-details-empty-title">
          No Data Found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Select a staff member to view details
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="staff-details-container">
      <Box className="staff-details-header">
        <Box className="staff-details-profile">
          <Avatar className="staff-details-avatar">
            {staff.initials}
          </Avatar>
          <Box className="staff-details-info">
            <Box className="staff-details-name-row">
              <Typography variant="h4" className="staff-details-name">
                {staff.name}
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" className="staff-details-subtitle">
              {staff.name.toLowerCase()} | {staff.gender}
            </Typography>
          </Box>
          <IconButton onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>
        </Box>

        {/* Contact Information */}
        <Box className="staff-details-contact">
          <Box className="staff-details-contact-item">
            <Phone className="staff-details-contact-icon" />
            <Typography variant="body1">{staff.phone}</Typography>
          </Box>
          <Box className="staff-details-contact-item">
            <Email className="staff-details-contact-icon" />
            <Typography variant="body1" color={staff.email ? 'inherit' : 'text.secondary'}>
              {staff.email || 'Email not available'}
            </Typography>
          </Box>
          <Box className="staff-details-contact-item">
            <LocationOn className="staff-details-contact-icon" />
            <Typography variant="body1" color={staff.address ? 'inherit' : 'text.secondary'}>
              {staff.address || 'Address not available'}
            </Typography>
          </Box>
        </Box>

        {/* Area Tags */}
        <Box className="staff-details-area-tags">
          <Typography variant="body2" color="text.secondary" className="staff-details-area-label">
            Area Tags:
          </Typography>
          <input
            type="text"
            className="staff-details-area-input"
            placeholder="Enter area tags"
          />
        </Box>
      </Box>

      {/* Staff Actions Menu */}
      <Menu
        anchorEl={menuItem}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 150,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              borderRadius: '8px',
            }
          }
        }}
      >
        <MenuItem onClick={() => handleMenuAction('edit')} >
          <ListItemText primary="Edit" />
        </MenuItem>

        <MenuItem onClick={() => handleMenuAction('change-password')} >
          <ListItemText primary="Change Password" />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default StaffDetails;
