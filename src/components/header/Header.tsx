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

  // Define tab routes mapping
  const tabRoutes = [
    '/watch',
    '/schedule',
    '/sites',
    '/staff'
  ];

  // Update active tab based on current route
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
      {/* Left side - Menu icon */}
     <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{
            color: '#666666',
            '&:hover': { backgroundColor: '#f5f5f5' }
          }}
        >
          <Menu />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '14px',
                color: '#666666',
                minWidth: 'auto',
                padding: '12px 24px',
                '&.Mui-selected': {
                  color: '#000000',
                  fontWeight: 600,
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#000000',
                height: '2px',
              },
            }}
          >
            <Tab label="Watch" />
            <Tab label="Schedule" />
            <Tab label="Sites" />
            <Tab label="Staff" />
          </Tabs>
        </Box>
      </Box>

      {/* Right side - User profile */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar 
            sx={{ 
              width: 32, 
              height: 32, 
              backgroundColor: '#e0e0e0',
              color: '#666666',
              fontSize: '14px'
            }}
          >
            <AccountCircle />
          </Avatar>
          
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, color: '#000000' ,display: { xs: 'none', sm: 'block' } }}
          >
            MIMI OPERATIONSMANAGER
          </Typography> 
        </Box>
      </Box>
    </div>
  );
};

export default Header;