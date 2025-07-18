import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  List,
  ListItem,
  Button,
} from '@mui/material';
import {
  Warning,
  MoreVert,
} from '@mui/icons-material';
import { getAllUrgentLogs, getLogTypeColor, type UrgentLog } from '../../data/watchData';

interface MapAndLogsProps {
  selectedSite: string | null;
}

const MapAndLogs: React.FC<MapAndLogsProps> = ({ selectedSite }) => {
  const [mapView, setMapView] = useState<'satellite' | 'street'>('satellite');
  const urgentLogs = getAllUrgentLogs();

  const getMapUrl = () => {
    if (!selectedSite) {
      
      return mapView === 'satellite'
        ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.8!2d-119.4179!3d36.7783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQ2JzQyLjAiTiAxMTnCsDI1JzA0LjQiVw!5e1!3m2!1sen!2sus!4v1642000000000!5m2!1sen!2sus"
        : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.8!2d-119.4179!3d36.7783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQ2JzQyLjAiTiAxMTnCsDI1JzA0LjQiVw!5e0!3m2!1sen!2sus!4v1642000000000!5m2!1sen!2sus";
    }

    const siteLocations = {
      '1': { 
        satellite: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.8!2d-116.9711!3d33.7455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80db6c5c5c5c5c5c%3A0x5c5c5c5c5c5c5c5c!2s2369%20W%20Florida%20Ave%2C%20Hemet%2C%20CA%2092545%2C%20USA!5e1!3m2!1sen!2sus!4v1642000000000!5m2!1sen!2sus",
        street: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.8!2d-116.9711!3d33.7455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80db6c5c5c5c5c5c%3A0x5c5c5c5c5c5c5c5c!2s2369%20W%20Florida%20Ave%2C%20Hemet%2C%20CA%2092545%2C%20USA!5e0!3m2!1sen!2sus!4v1642000000000!5m2!1sen!2sus"
      },
      '2': { 
        satellite: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.5!2d-119.0187!3d35.3733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ea6bc8b2b2b2b2%3A0x2b2b2b2b2b2b2b2b!2s6710%20Colony%20St%2C%20Bakersfield%2C%20CA!5e1!3m2!1sen!2sus!4v1642000000000!5m2!1sen!2sus",
        street: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.5!2d-119.0187!3d35.3733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ea6bc8b2b2b2b2%3A0x2b2b2b2b2b2b2b2b!2s6710%20Colony%20St%2C%20Bakersfield%2C%20CA!5e0!3m2!1sen!2sus!4v1642000000000!5m2!1sen!2sus"
      },
      '3': { 
        satellite: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.1!2d-118.4437!3d34.1522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc85c85c85c8%3A0x5c85c85c85c85c85!2s14644%20Ventura%20Boulevard%2C%20Sherman%20Oaks%2C%20CA!5e1!3m2!1sen!2sus!4v1642000000000!5m2!1sen!2sus",
        street: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.1!2d-118.4437!3d34.1522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc85c85c85c8%3A0x5c85c85c85c85c85!2s14644%20Ventura%20Boulevard%2C%20Sherman%20Oaks%2C%20CA!5e0!3m2!1sen!2sus!4v1642000000000!5m2!1sen!2sus"
      }
    };

    const siteLocation = siteLocations[selectedSite as keyof typeof siteLocations];
    return siteLocation ? siteLocation[mapView] : siteLocations['1'][mapView];
  };

  return (
    <Box sx={{
      height: '100%',
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        width: '6px',
      },
      '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#c1c1c1',
        borderRadius: '3px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#a8a8a8',
      },
    }}>
      {/* Map Section */}
      <Box sx={{
        height: '400px',
        position: 'relative',
        mb: 3,
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        {/* Live Tracks Badge */}
        <Box sx={{
          position: 'absolute',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'var(--clr-purple)',
          color: 'var(--clr-white)',
          px: 2,
          py: 0.5,
          borderRadius: 2,
          fontSize: '12px',
          fontWeight: 600,
          zIndex: 10
        }}>
          Load Live Tracks
        </Box>

        {/* Map Controls */}
        <Box sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          display: 'flex',
          gap: 1,
          zIndex: 10
        }}>
          <Button
            size="small"
            variant={mapView === 'satellite' ? 'contained' : 'outlined'}
            onClick={() => setMapView('satellite')}
            sx={{
              minWidth: 'auto',
              px: 1.5,
              py: 0.5,
              fontSize: '11px',
              backgroundColor: mapView === 'satellite' ? 'var(--clr-purple)' : 'rgba(255, 255, 255, 0.9)',
              borderColor: 'var(--clr-purple)',
              color: mapView === 'satellite' ? 'var(--clr-white)' : 'var(--clr-purple)',
              '&:hover': {
                backgroundColor: mapView === 'satellite' ? 'var(--clr-purple)' : 'var(--clr-bg-purple-light)',
              }
            }}
          >
            Satellite
          </Button>
          <Button
            size="small"
            variant={mapView === 'street' ? 'contained' : 'outlined'}
            onClick={() => setMapView('street')}
            sx={{
              minWidth: 'auto',
              px: 1.5,
              py: 0.5,
              fontSize: '11px',
              backgroundColor: mapView === 'street' ? 'var(--clr-purple)' : 'rgba(255, 255, 255, 0.9)',
              borderColor: 'var(--clr-purple)',
              color: mapView === 'street' ? 'var(--clr-white)' : 'var(--clr-purple)',
              '&:hover': {
                backgroundColor: mapView === 'street' ? 'var(--clr-purple)' : 'var(--clr-bg-purple-light)',
              }
            }}
          >
            Street
          </Button>
        </Box>

        {/* Map iframe */}
        <iframe
          src={getMapUrl()}
          width="100%"
          height="100%"
          style={{
            border: 0,
            borderRadius: '8px'
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={selectedSite ? `Site ${selectedSite} Location Map` : "Default Location Map"}
        />
      </Box>

      {/* Urgent Logs Section */}
      <Box sx={{
        backgroundColor: 'var(--clr-white)',
        borderRadius: '8px',
        border: '1px solid var(--clr-border-light)',
        overflow: 'hidden'
      }}>
        {/* Logs Header */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid var(--clr-border-light)',
          backgroundColor: 'var(--clr-bg-light)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Warning sx={{ fontSize: 18, color: 'var(--clr-warning)' }} />
            <Typography variant="h6" sx={{
              fontWeight: 600,
              color: 'var(--clr-text-primary)',
              fontSize: '16px'
            }}>
              Urgent Logs
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              size="small"
              sx={{
                color: 'var(--clr-purple)',
                textTransform: 'none',
                fontSize: '12px',
                fontWeight: 500,
                minWidth: 'auto',
                px: 1
              }}
            >
              View All Logs
            </Button>
            <IconButton size="small" sx={{ color: 'var(--clr-text-secondary)' }}>
              <MoreVert fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Logs List */}
        <Box sx={{
          maxHeight: '300px',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#c1c1c1',
            borderRadius: '2px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#a8a8a8',
          },
        }}>
          <List sx={{ p: 0 }}>
            {urgentLogs.map((log: UrgentLog, index: number) => (
              <ListItem
                key={log.id}
                sx={{
                  p: 2,
                  borderBottom: index < urgentLogs.length - 1 ? '1px solid var(--clr-border-lighter)' : 'none',
                  '&:hover': {
                    backgroundColor: 'var(--clr-border-lightest)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, width: '100%' }}>
                  {/* Staff Avatar */}
                  <Avatar sx={{
                    bgcolor: getLogTypeColor(log.type),
                    color: 'var(--clr-white)',
                    width: 32,
                    height: 32,
                    fontSize: '12px',
                    fontWeight: 600,
                    flexShrink: 0
                  }}>
                    {log.staffInitials}
                  </Avatar>

                  {/* Log Content */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{
                          fontWeight: 600,
                          color: 'var(--clr-text-primary)',
                          fontSize: '13px',
                          lineHeight: 1.2
                        }}>
                          {log.duty}:
                        </Typography>
                        {log.isLate && (
                          <Typography variant="body2" sx={{
                            fontWeight: 600,
                            color: '#ff9800',
                            fontSize: '13px',
                            lineHeight: 1.2
                          }}>
                            {log.lateBy}
                          </Typography>
                        )}
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="caption" sx={{
                          color: 'var(--clr-text-tertiary)',
                          fontSize: '11px'
                        }}>
                          {log.time}
                        </Typography>
                        <IconButton size="small" sx={{ 
                          color: 'var(--clr-text-tertiary)',
                          width: 20,
                          height: 20
                        }}>
                          <MoreVert sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Box>
                    </Box>

                    <Typography variant="caption" sx={{
                      color: 'var(--clr-text-secondary)',
                      fontSize: '11px',
                      display: 'block',
                      mb: 0.5
                    }}>
                      {log.staffName}
                    </Typography>

                    <Typography variant="caption" sx={{
                      color: 'var(--clr-text-tertiary)',
                      fontSize: '10px'
                    }}>
                      {log.description}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default MapAndLogs;
