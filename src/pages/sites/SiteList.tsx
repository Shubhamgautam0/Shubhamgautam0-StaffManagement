import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Search,
  MoreVert,
  FileUpload,
  Archive,
} from '@mui/icons-material';
import { SiteData } from '../../data/siteData';
import type { SiteMember } from '../../data/siteData';

interface SiteListProps {
  onSiteSelect: (site: SiteMember) => void;
  selectedSite?: SiteMember | null;
  newSiteList?: SiteMember[];
  sites?: SiteMember[];
}

const SiteList: React.FC<SiteListProps> = ({ onSiteSelect, selectedSite, newSiteList = [], sites = SiteData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [headerAnchorEl, setHeaderAnchorEl] = useState<null | HTMLElement>(null);
  const [siteAnchorEl, setSiteAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Header menu handlers
  const handleHeaderMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setHeaderAnchorEl(event.currentTarget);
  };

  const handleHeaderMenuClose = () => {
    setHeaderAnchorEl(null);
  };

  const handleImportAction = () => {
    console.log('Import sites data');
    handleHeaderMenuClose();
  };

  // Site menu handlers
  const handleSiteMenuClick = (event: React.MouseEvent<HTMLElement>, siteId: string) => {
    event.stopPropagation();
    setSiteAnchorEl(event.currentTarget);
    setSelectedSiteId(siteId);
  };

  const handleSiteMenuClose = () => {
    setSiteAnchorEl(null);
    setSelectedSiteId(null);
  };

  const handleArchiveAction = () => {
    console.log(`Archive site: ${selectedSiteId}`);
    handleSiteMenuClose();
  };

  const getFilteredSites = () => {
    const allSites = [...sites, ...newSiteList];
    let filtered = allSites;

    if (activeTab === 0) {
      filtered = allSites.filter(site => site.status === 'Mysite');
    } else if (activeTab === 1) {
      filtered = allSites.filter(site => site.status === 'Allsite');
    }

    if (searchTerm) {
      filtered = filtered.filter(site =>
        site.name.toLowerCase().includes(searchTerm.toLowerCase()) 
        // site.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // site.phone.includes(searchTerm)
      );
    }

    return filtered;
  };

  const filteredSites = getFilteredSites();

  return (
    <Box className="staff-list-container">
      <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" className="staff-list-title">
            Sites
          </Typography>
          <Box />
          <IconButton size="small" onClick={handleHeaderMenuClick}>
            <MoreVert />
          </IconButton>
        </Box>

        <TextField
          fullWidth
          placeholder="Search Sites by Name, Customer Name, Phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#666' }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
          }}
        />

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          className='staff-tabs'
          variant='scrollable'
          sx={{
            width: '100%',
            '& .MuiTabs-flexContainer': {
              display: 'flex',
              '& .MuiTab-root': {
                flex: 1
              }
            }
          }}
        >
          <Tab label="My Sites" />
          <Tab label="All Sites" />
        </Tabs>
      </Box>

      {/* Site List */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List sx={{ p: 0 }}>
          {filteredSites.map((site) => (
            <ListItem key={site.id} disablePadding>
              <ListItemButton
                onClick={() => onSiteSelect(site)}
                sx={{
                  p: 2,
                  borderBottom: '1px solid #f0f0f0',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: 'var(--clr-pumpkin)',
                      color: 'white',
                      fontWeight: 'bold',
                      width: 40,
                      height: 40,
                    }}
                  >
                    {site.initials}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {site.name}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Typography variant="body2" color="text.secondary">
                        {site.address}
                      </Typography>
                    </Box>
                  }
                />
                <IconButton
                  size="small"
                  onClick={(e) => handleSiteMenuClick(e, site.id)}
                >
                  <MoreVert />
                </IconButton>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Header Actions Menu */}
      <Menu
        anchorEl={headerAnchorEl}
        open={Boolean(headerAnchorEl)}
        onClose={handleHeaderMenuClose}
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
              mt: 1,
              minWidth: 120,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: '1px solid var(--clr-border-light)',
              borderRadius: 2,
            }
          }
        }}
      >
        <MenuItem
          onClick={handleImportAction}
          sx={{
            py: 1.5,
            px: 2,
            fontSize: '14px',
            '&:hover': {
              backgroundColor: 'var(--clr-border-lightest)',
            }
          }}
        >
          <FileUpload sx={{ fontSize: 18, mr: 1.5, color: 'var(--clr-text-secondary)' }} />
          Import
        </MenuItem>
      </Menu>

      {/* Site Actions Menu */}
      <Menu
        anchorEl={siteAnchorEl}
        open={Boolean(siteAnchorEl)}
        onClose={handleSiteMenuClose}
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
              mt: 1,
              minWidth: 120,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: '1px solid var(--clr-border-light)',
              borderRadius: 2,
            }
          }
        }}
      >
        <MenuItem
          onClick={handleArchiveAction}
          sx={{
            py: 1.5,
            px: 2,
            fontSize: '14px',
            '&:hover': {
              backgroundColor: 'var(--clr-border-lightest)',
            }
          }}
        >
          <Archive sx={{ fontSize: 18, mr: 1.5, color: 'var(--clr-text-secondary)' }} />
          Archive
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SiteList;