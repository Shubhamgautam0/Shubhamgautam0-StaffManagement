import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import {
  Schedule,
  Notifications,
  Settings as SettingsIcon,
  People,
  PersonPin,
  LocationOn,
  Business,
  AttachMoney,
  Receipt
} from '@mui/icons-material';

interface SettingsSidebarProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  selectedCategory,
  onCategorySelect
}) => {
  const categories = [
    {
      id: 'timesheet',
      label: 'Timesheet',
      icon: <Schedule />
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Notifications />
    },
    {
      id: 'shift-settings',
      label: 'Shift Settings',
      icon: <SettingsIcon />
    },
    {
      id: 'staff',
      label: 'Staff',
      icon: <People />
    },
    {
      id: 'visitor-management',
      label: 'Visitor Management',
      icon: <PersonPin />
    },
    {
      id: 'site',
      label: 'Site',
      icon: <LocationOn />
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: <Business />
    },
    {
      id: 'rates',
      label: 'Rates',
      icon: <AttachMoney />
    },
    {
      id: 'invoice-estimate',
      label: 'Invoice and Estimate',
      icon: <Receipt />
    }
  ];

  return (
    <Box className="settings-sidebar-content">
      <List className="settings-category-list">
        {categories.map((category) => (
          <ListItem
            key={category.id}
            className={`settings-category-item ${
              selectedCategory === category.id ? 'selected' : ''
            }`}
            onClick={() => onCategorySelect(category.id)}
          >
            <Box className="settings-category-icon">
              {category.icon}
            </Box>
            <ListItemText 
              primary={category.label}
              className="settings-category-text"
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SettingsSidebar;
