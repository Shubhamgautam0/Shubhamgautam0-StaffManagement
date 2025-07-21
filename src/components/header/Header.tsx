import React, { useState, useEffect } from 'react';
import {
  Box,
  Tabs,
  Tab,
  IconButton,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Visibility,
  Schedule,
  LocationOn,
  People,
  Notifications,
  Settings,
  RequestPageOutlined,
  MoreTime,
  Lock,
  Person,
  Logout,
  KeyboardArrowDown,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import ReferEarn from '../referEarn';
import './Header.css';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<number>(-1);
  const [referEarnOpen, setReferEarnOpen] = useState<boolean>(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

  const tabRoutes = [
    '/watch',
    '/schedule',
    '/sites',
    '/staff'
  ];

  const tabData = [
    { label: 'Watch', icon: <Visibility /> },
    { label: 'Schedule', icon: <Schedule /> },
    { label: 'Sites', icon: <LocationOn /> },
    { label: 'Staff', icon: <People /> }
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

  const handleReferEarnOpen = () => {
    setReferEarnOpen(true);
  };

  const handleReferEarnClose = () => {
    setReferEarnOpen(false);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleChangePassword = () => {
    handleUserMenuClose();
    // Add change password logic here
    console.log('Change Password clicked');
  };

  const handleMyProfile = () => {
    handleUserMenuClose();
    // Add my profile logic here
    console.log('My Profile clicked');
  };

  const handleLogout = () => {
    handleUserMenuClose();
    // Add logout logic here
    console.log('Logout clicked');
  };

  return (
    <div className='header-container'>
      <Box className="header-left">
        <IconButton
          edge="start"
          onClick={onMenuClick}
          className="header-menu-button"
        >
          <MenuIcon />
        </IconButton>

        <Box className="header-tabs-container">
          <Tabs
            value={activeTab >= 0 && activeTab < tabRoutes.length ? activeTab : 0}
            onChange={handleTabChange}
            className="header-tabs"
            variant="standard"
            indicatorColor="primary"
            textColor="primary"
          >
            {tabData.map((tab, index) => (
              <Tab
                key={tab.label}
                label={tab.label}
                // icon={tab.icon}
                iconPosition="start"
                className="header-tab"
              />
            ))}
          </Tabs>
        </Box>
      </Box>

      <Box className="header-right">
        {/* Header Icons - Hide on small screens */}
        <Box className="header-icons" sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton size="small" title='Notifications' className="header-icon-button">
            <Notifications />
          </IconButton>
          <IconButton size="small" title='Settings' className="header-icon-button">
            <Settings />
          </IconButton>
          <IconButton
            size="small"
            title='Refer & Earn'
            className="header-icon-button"
            onClick={handleReferEarnOpen}
          >
            <MoreTime />
          </IconButton>
          <IconButton size="small" title='Request' className="header-icon-button">
            <RequestPageOutlined />
          </IconButton>
        </Box>

        <Box className="header-right">
          <Box
            className="header-user-section"
            onClick={handleUserMenuOpen}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
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

            <KeyboardArrowDown
              sx={{
                display: { xs: 'none', sm: 'block' },
                color: 'var(--clr-text-secondary)',
                fontSize: '20px',
                transition: 'transform 0.2s',
                transform: userMenuAnchor ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </Box>
        </Box>

        {/* User Dropdown Menu */}
        <Menu
          anchorEl={userMenuAnchor}
          open={Boolean(userMenuAnchor)}
          onClose={handleUserMenuClose}
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                minWidth: 200,
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                border: '1px solid var(--clr-border-light)',
              }
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleChangePassword} className="user-menu-item">
            <ListItemIcon>
              <Lock fontSize="small" sx={{ color: 'var(--clr-text-secondary)' }} />
            </ListItemIcon>
            <ListItemText
              primary="Change Password"
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '14px',
                  color: 'var(--clr-text-secondary)'
                }
              }}
            />
          </MenuItem>

          <MenuItem onClick={handleMyProfile} className="user-menu-item">
            <ListItemIcon>
              <Person fontSize="small" sx={{ color: 'var(--clr-text-secondary)' }} />
            </ListItemIcon>
            <ListItemText
              primary="My Profile"
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '14px',
                  color: 'var(--clr-text-secondary)'
                }
              }}
            />
          </MenuItem>

          <Divider sx={{ my: 0.5 }} />

          <MenuItem onClick={handleLogout} className="user-menu-item">
            <ListItemIcon>
              <Logout fontSize="small" sx={{ color: 'var(--clr-text-secondary)' }} />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '14px',
                  color: 'var(--clr-text-secondary)'
                }
              }}
            />
          </MenuItem>
        </Menu>
      </Box>

      {/* Refer & Earn Popup */}
      <ReferEarn
        open={referEarnOpen}
        onClose={handleReferEarnClose}
      />
    </div>
  );
};

export default Header;