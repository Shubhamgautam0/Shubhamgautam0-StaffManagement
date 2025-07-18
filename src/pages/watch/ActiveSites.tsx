import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  List,
  ListItemButton,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  Search,
  Refresh,
  ViewModule,
} from '@mui/icons-material';
import { watchSitesData, getStatusColor, type WatchSite } from '../../data/watchData';

interface ActiveSitesProps {
  selectedSite: string | null;
  onSiteSelect: (siteId: string) => void;
}

const ActiveSites: React.FC<ActiveSitesProps> = ({ selectedSite, onSiteSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSites = watchSitesData.filter((site: WatchSite) =>
    site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    site.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        borderBottom: '1px solid var(--clr-border-light)'
      }}>
        <Typography variant="h6" sx={{
          fontWeight: 600,
          color: 'var(--clr-text-primary)'
        }}>
          Active Sites
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small" sx={{ color: 'var(--clr-text-secondary)' }}>
            <Refresh fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ color: 'var(--clr-text-secondary)' }}>
            <ViewModule fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Search */}
      <Box sx={{ p: 2, borderBottom: '1px solid var(--clr-border-light)' }}>
        <TextField
          fullWidth
          placeholder="Search sites by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'var(--clr-text-tertiary)', fontSize: '20px' }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'var(--clr-border-light)',
              },
              '&:hover fieldset': {
                borderColor: 'var(--clr-border-medium)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'var(--clr-purple)',
              },
            },
          }}
        />
      </Box>

      {/* Sites List */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List sx={{ p: 0 }}>
          {filteredSites.map((site) => (
            <ListItemButton
              key={site.id}
              onClick={() => onSiteSelect(site.id)}
              selected={selectedSite === site.id}
              sx={{
                p: 2,
                borderBottom: '1px solid var(--clr-border-lighter)',
                borderLeft: '4px solid transparent',
                position: 'relative',
                '&.Mui-selected': {
                  backgroundColor: 'var(--clr-bg-purple-light)',
                  borderLeft: '4px solid #ff6b35',
                },
                '&:hover': {
                  backgroundColor: 'var(--clr-border-lightest)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, width: '100%' }}>
                {/* Site Avatar */}
                <Avatar sx={{
                  bgcolor: site.color,
                  color: 'var(--clr-white)',
                  width: 40,
                  height: 40,
                  fontSize: '14px',
                  fontWeight: 600,
                  flexShrink: 0
                }}>
                  {site.name.charAt(0)}
                </Avatar>

                {/* Site Info */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  {/* Site Name and Status */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="body2" sx={{
                      fontWeight: 600,
                      color: 'var(--clr-text-primary)',
                      fontSize: '13px',
                      lineHeight: 1.2
                    }}>
                      {site.name}
                    </Typography>
                    <Box sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: getStatusColor(site.status),
                      flexShrink: 0
                    }} />
                  </Box>

                  {/* Address */}
                  <Typography variant="caption" sx={{
                    color: 'var(--clr-text-secondary)',
                    fontSize: '11px',
                    lineHeight: 1.3,
                    display: 'block',
                    mb: 1
                  }}>
                    {site.address}
                  </Typography>

                  {/* Time and Staff */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{
                      color: 'var(--clr-text-tertiary)',
                      fontSize: '10px'
                    }}>
                      {site.lastUpdate}
                    </Typography>
                  </Box>

                  {/* Staff Name or Indicator */}
                  {site.staffName ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                      <Avatar sx={{
                        width: 16,
                        height: 16,
                        fontSize: '8px',
                        fontWeight: 600,
                        backgroundColor: '#4caf50',
                        color: 'white'
                      }}>
                        {site.staffInitials}
                      </Avatar>
                      <Typography variant="caption" sx={{
                        color: 'var(--clr-text-secondary)',
                        fontSize: '10px'
                      }}>
                        {site.staffName}
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                      <Avatar sx={{
                        width: 16,
                        height: 16,
                        fontSize: '8px',
                        fontWeight: 600,
                        backgroundColor: '#999',
                        color: 'white'
                      }}>
                        {site.staffInitials}
                      </Avatar>
                    </Box>
                  )}
                </Box>
              </Box>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ActiveSites;
