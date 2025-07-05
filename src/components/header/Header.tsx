import React, { useState, useEffect } from 'react';
import {
  Box,
  Tabs,
  Tab,
  IconButton,
  Avatar,
  Typography,
} from '@mui/material';
import {
  Menu,
  AccountCircle,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<number>(3);

  const tabRoutes = [
    '/watch',
    '/schedule',
    '/sites',
    '/staff'
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const tabIndex = tabRoutes.findIndex(route => currentPath.startsWith(route));
    if (tabIndex !== -1) {
      setActiveTab(tabIndex);
    }
  }, [location.pathname]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    navigate(tabRoutes[newValue]);
  };

  return (
    <div className='header-container'>
     <Box className="header-left">
        <IconButton
          edge="start"
          onClick={onMenuClick}
          className="header-menu-button"
        >
          <Menu />
        </IconButton>

        <Box className="header-tabs-container">
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            className="header-tabs"
          >
            <Tab label="Watch" />
            <Tab label="Schedule" />
            <Tab label="Sites" />
            <Tab label="Staff" />
          </Tabs>
        </Box>
      </Box>

      <Box className="header-right">
          <Avatar className="header-avatar">
            <AccountCircle />
          </Avatar>

          <Typography
            variant="body2"
            className="header-user-name"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            MIMI OPERATIONSMANAGER
          </Typography>
      </Box>
    </div>
  );
};

export default Header;