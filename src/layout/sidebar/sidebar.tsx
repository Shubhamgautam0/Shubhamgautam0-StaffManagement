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
  Business,
  Description,
} from '@mui/icons-material';
import './sidebar.css';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, onNavigate }) => {
  const [openSubmenus, setOpenSubmenus] = React.useState<Record<string, boolean>>({
    staff: false,
    sites: false,
  });

  const handleSubmenuClick = (menuKey: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const menuItems = [
    {
      text: 'Watch',
      icon: <Visibility />,
      path: '/watch',
      key: 'watch',
    },
    {
      text: 'Schedule',
      icon: <Schedule />,
      path: '/schedule',
      key: 'schedule',
    },
    {
      text: 'Sites',
      icon: <LocationOn />,
      key: 'sites',
      hasSubmenu: true,
      submenu: [
        {
          text: 'All Site',
          icon: <LocationOn />,
          path: '/sites',
        },
        {
          text: 'Site Invoice',
          icon: <Assessment />,
          path: '/site/invoice',
        },
      ],
    },
    {
      text: 'Staff',
      icon: <People />,
      key: 'staff',
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
    {
      text: 'Customers',
      icon: <Business />,
      path: '/customers',
      key: 'customers',
    },
    {
      text: 'Custom Reports',
      icon: <Description />,
      path: '/custom-reports',
      key: 'custom-reports',
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
          <React.Fragment key={item.key}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  if (item.hasSubmenu) {
                    handleSubmenuClick(item.key);
                  } else if (item.path) {
                    try {
                      onNavigate(item.path);
                      onClose();
                    } catch (error) {
                      console.error('Navigation error:', error);
                    }
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
                  openSubmenus[item.key] ? <ExpandLess /> : <ExpandMore />
                )}
              </ListItemButton>
            </ListItem>

            {/* Submenu */}
            {item.hasSubmenu && item.submenu && (
              <Collapse in={openSubmenus[item.key]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.submenu.map((subItem) => (
                    <ListItem key={subItem.text} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          try {
                            onNavigate(subItem.path);
                            onClose();
                          } catch (error) {
                            console.error('Submenu navigation error:', error);
                          }
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