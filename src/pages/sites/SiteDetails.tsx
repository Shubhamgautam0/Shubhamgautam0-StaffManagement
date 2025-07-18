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
    Email,
  LocationOn,
  MoreVert,
  Person,
  Phone
} from '@mui/icons-material';
import type { SiteMember } from '../../data/siteData';

interface SiteDetailsProps {
  site: SiteMember | null;
  onEditClick?: (site: SiteMember) => void;
}

const SiteDetails: React.FC<SiteDetailsProps> = ({ site, onEditClick }) => {
  const [menuItem, setMenuitem] = useState<null | HTMLElement>(null);
  const open = Boolean(menuItem);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuitem(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuitem(null);
  };

  const handleMenuAction = (action: string) => {
   if (action === 'edit' && site && onEditClick) {
      onEditClick(site);
    }

    handleMenuClose();
  };
  if (!site) {
    return (
      <Box className="staff-details-empty">
        <Box className="staff-details-empty-icon">
          <LocationOn sx={{ fontSize: 32, color: '#ccc' }} />
        </Box>
        <Typography variant="h6" className="staff-details-empty-title">
          No Data Found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Select a site to view details
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="staff-details-container">
      <Box className="staff-details-header">
        <Box className="staff-details-profile">
          <Avatar className="staff-details-avatar">
            {site.initials}
          </Avatar>
          <Box className="staff-details-info">
            <Box className="staff-details-name-row">
              <Typography variant="h4" className="staff-details-name">
                {site.name}
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" className="staff-details-subtitle">
              {site.siteId} | {site.scheduleDate}
            </Typography>
          </Box>
          <IconButton onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>
        </Box>

        {/* Site Information */}
        <Box className="staff-details-contact">
          <Box className="staff-details-contact-item">
            <Person className='staff-details-contact-icon' />
            <Typography variant="body2" color="text.secondary" >
              {site.customerName}
            </Typography>
          </Box>
          <Box className="staff-details-contact-item">
            <Phone className="staff-details-contact-icon" />
            <Typography variant="body2" color="text.secondary">
              {site.phone || 'Phone not available'}
            </Typography>
          </Box>
          <Box className="staff-details-contact-item">
            <Email className="staff-details-contact-icon" />
            <Typography variant="body2" color="text.secondary" >
             {site.email}
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

export default SiteDetails;
