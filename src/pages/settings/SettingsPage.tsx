import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SettingsSidebar from './SettingsSidebar';
import SettingsSubMenu from './SettingsSubMenu';
import SettingsContent from './SettingsContent';
import './Settings.css';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('timesheet');
  const [selectedSubItem, setSelectedSubItem] = useState('work-week');

  const handleBack = () => {
    navigate(-1);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Set default sub-item based on category
    switch (category) {
      case 'timesheet':
        setSelectedSubItem('work-week');
        break;
      case 'notifications':
        setSelectedSubItem('email-notifications');
        break;
      case 'shift-settings':
        setSelectedSubItem('shift-templates');
        break;
      case 'staff':
        setSelectedSubItem('staff-roles');
        break;
      case 'visitor-management':
        setSelectedSubItem('visitor-settings');
        break;
      case 'site':
        setSelectedSubItem('site-settings');
        break;
      case 'customers':
        setSelectedSubItem('customer-list');
        break;
      case 'rates':
        setSelectedSubItem('pay-rates');
        break;
      case 'invoice-estimate':
        setSelectedSubItem('invoice-settings');
        break;
      default:
        setSelectedSubItem('work-week');
    }
  };

  const handleSubItemSelect = (subItem: string) => {
    setSelectedSubItem(subItem);
  };

  return (
    <Box className="settings-page">
      {/* Left Sidebar - Main Categories */}
      <Box className="settings-sidebar">
        <Box className="settings-header">
          <IconButton onClick={handleBack} className="settings-back-button">
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" className="settings-title">
            Settings
          </Typography>
        </Box>
        <SettingsSidebar 
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
      </Box>

      {/* Middle Section - Sub Categories */}
      <Box className="settings-submenu">
        <SettingsSubMenu 
          selectedCategory={selectedCategory}
          selectedSubItem={selectedSubItem}
          onSubItemSelect={handleSubItemSelect}
        />
      </Box>

      {/* Right Section - Content */}
      <Box className="settings-content">
        <SettingsContent 
          selectedCategory={selectedCategory}
          selectedSubItem={selectedSubItem}
        />
      </Box>
    </Box>
  );
};

export default SettingsPage;
