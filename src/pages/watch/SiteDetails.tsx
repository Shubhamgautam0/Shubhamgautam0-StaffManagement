import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Chip,
} from '@mui/material';
import {
  MoreVert,
  LocationOn,
  AccessTime,
} from '@mui/icons-material';
import { getWatchSiteById, getStatusColor, getStatusText } from '../../data/watchData';

interface SiteDetailsProps {
  selectedSite: string | null;
}

const SiteDetails: React.FC<SiteDetailsProps> = ({ selectedSite }) => {
  if (!selectedSite) {
    return (
      <Box sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 2
      }}>
        <Box sx={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          backgroundColor: 'var(--clr-border-lightest)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <LocationOn sx={{ fontSize: 32, color: 'var(--clr-text-tertiary)' }} />
        </Box>
        <Typography variant="h6" sx={{ 
          color: 'var(--clr-text-secondary)',
          fontWeight: 600 
        }}>
          Select a site to view details
        </Typography>
        <Typography variant="body2" sx={{ 
          color: 'var(--clr-text-tertiary)',
          textAlign: 'center'
        }}>
          Choose a site from the Active Sites list to see detailed information
        </Typography>
      </Box>
    );
  }

  const siteData = getWatchSiteById(selectedSite);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {siteData && (
        <>
          {/* Header */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            p: 3,
          }}>
            <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
              <Avatar sx={{
                bgcolor: siteData.color,
                color: 'var(--clr-white)',
                width: 56,
                height: 56,
                fontSize: '20px',
                fontWeight: 600
              }}>
                {siteData.name.charAt(0)}
              </Avatar>

              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="h6" sx={{
                    fontWeight: 600,
                    color: 'var(--clr-text-primary)',
                    fontSize: '18px'
                  }}>
                    {siteData.name}
                  </Typography>
                  <Chip
                    label={getStatusText(siteData.status)}
                    size="small"
                    sx={{
                      backgroundColor: getStatusColor(siteData.status) + '20',
                      color: getStatusColor(siteData.status),
                      fontWeight: 600,
                      fontSize: '11px',
                      height: '20px'
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                  <LocationOn sx={{ fontSize: 14, color: 'var(--clr-text-tertiary)' }} />
                  <Typography variant="body2" sx={{
                    color: 'var(--clr-text-secondary)',
                    fontSize: '13px'
                  }}>
                    {siteData.address}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AccessTime sx={{ fontSize: 14, color: 'var(--clr-text-tertiary)' }} />
                  <Typography variant="body2" sx={{
                    color: 'var(--clr-text-secondary)',
                    fontSize: '13px'
                  }}>
                    {siteData.shiftTime}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <IconButton size="small" sx={{ color: 'var(--clr-text-secondary)' }}>
              <MoreVert />
            </IconButton>
          </Box>


        </>
      )}
    </Box>
  );
};

export default SiteDetails;
