import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Collapse,
} from '@mui/material';
import {
  Visibility,
  Schedule,
  LocationOn,
  People,
  Assessment,
  ExpandLess,
  ExpandMore,
  Person,
} from '@mui/icons-material';
import './sidebar.css';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, onNavigate }) => {
  const [staffOpen, setStaffOpen] = React.useState(false);

  const handleStaffClick = () => {
    setStaffOpen(!staffOpen);
  };

  const menuItems = [
    {
      text: 'Watch',
      icon: <Visibility />,
      path: '/watch',
    },
    {
      text: 'Schedule',
      icon: <Schedule />,
      path: '/schedule',
    },
    {
      text: 'Sites',
      icon: <LocationOn />,
      path: '/sites',
    },
    {
      text: 'Staff',
      icon: <People />,
      hasSubmenu: true,
      submenu: [
        {
          text: 'All Staff',
          icon: <Person />,
          path: '/staff',
        },
        {
          text: 'Staff Timesheet',
          icon: <Assessment />,
          path: '/staff/timesheet',
        },
      ],
    },
  ];

  const drawerContent = (
    <Box sx={{ width: 280, height: '100%', backgroundColor: '#2c3e50' }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid #34495e' }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
          Dspace-Vite
        </Typography>
      </Box>

      {/* Navigation Menu */}
      <List sx={{ pt: 1 }}>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  if (item.hasSubmenu && item.text === 'Staff') {
                    handleStaffClick();
                  } else if (item.path) {
                    onNavigate(item.path);
                    onClose();
                  }
                }}
                sx={{
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#34495e',
                  },
                  py: 1.5,
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '14px',
                      fontWeight: 500,
                    }
                  }}
                />
                {item.hasSubmenu && (
                  staffOpen ? <ExpandLess /> : <ExpandMore />
                )}
              </ListItemButton>
            </ListItem>

            {/* Staff Submenu */}
            {item.text === 'Staff' && item.submenu && (
              <Collapse in={staffOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.submenu.map((subItem) => (
                    <ListItem key={subItem.text} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          onNavigate(subItem.path);
                          onClose();
                        }}
                        sx={{
                          pl: 4,
                          color: '#bdc3c7',
                          '&:hover': {
                            backgroundColor: '#34495e',
                            color: 'white',
                          },
                          py: 1,
                        }}
                      >
                        <ListItemIcon sx={{ color: 'inherit', minWidth: 35 }}>
                          {subItem.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={subItem.text}
                          sx={{
                            '& .MuiListItemText-primary': {
                              fontSize: '13px',
                            }
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: 280,
          backgroundColor: '#2c3e50',
        }, 
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;