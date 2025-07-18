import React, { useEffect, useState } from 'react';
import { Box, Paper, Grid, Fab, Tooltip, Zoom } from '@mui/material';
import ActiveSites from './ActiveSites';
import SiteDetails from './SiteDetails';
import MapAndLogs from './MapAndLogs';
import { watchSitesData, type WatchSite } from '../../data/watchData';
import { Add, Visibility, Security, LocationOn } from '@mui/icons-material';

interface WatchLayoutProps {}

const WatchLayout: React.FC<WatchLayoutProps> = () => {
  const [sites, setSites] = useState<WatchSite[]>(watchSitesData);
  const [selectedSite, setSelectedSite] = useState<WatchSite | null>(null);
  const [fabHovered, setFabHovered] = useState(false);

  useEffect(() => {
    if (sites.length > 0 && !selectedSite) {
      setSelectedSite(sites[0]);
    }
  }, [sites, selectedSite]);

  useEffect(() => {
    if (selectedSite) {
      const updatedSite = sites.find(s => s.id === selectedSite.id);
      if (updatedSite) {
        setSelectedSite(updatedSite);
      }
    }
  }, [sites]);

  const handleSiteSelect = (siteId: string) => {
    const site = sites.find(s => s.id === siteId);
    if (site) {
      setSelectedSite(site);
    }
  };

  return (
    <Box className="page-container watch-page">
      <Grid container spacing={2} className="grid-container">
        {/* Active Sites List */}
        <Grid size={{ xs: 12, md: 4 }} className="grid-item">
          <Paper className="paper-container">
            <ActiveSites
              selectedSite={selectedSite?.id || null}
              onSiteSelect={handleSiteSelect}
            />
          </Paper>
        </Grid>

        {/* Site Details and Map/Logs */}
        <Grid size={{ xs: 12, md: 8 }} className="grid-item">
          <Grid container spacing={2} sx={{
            height: '100%',
            width: '100%',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            margin: 0,
            overflow: 'hidden'
          }}>
            {/* Site Details */}
            <Grid size={12} sx={{
              height: '50%',
              minHeight: 0,
              flex: '1 1 50%',
              overflow: 'hidden'
            }}>
              <Paper className="paper-container">
                <SiteDetails selectedSite={selectedSite?.id || null} />
              </Paper>
            </Grid>

            {/* Map and Logs */}
            <Grid size={12} sx={{
              height: '50%',
              minHeight: 0,
              flex: '1 1 50%',
              overflow: 'hidden'
            }}>
              <Paper className="paper-container">
                <MapAndLogs selectedSite={selectedSite?.id || null} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* FAB Container */}
      <Box
        className="fab-container"
        onMouseEnter={() => setFabHovered(true)}
        onMouseLeave={() => setFabHovered(false)}
      >
        {/* Live Monitoring */}
        <Zoom in={fabHovered} timeout={200} style={{ transitionDelay: fabHovered ? '100ms' : '0ms' }}>
          <Tooltip title="Live Monitoring" placement="left">
            <Fab
              size="large"
              className="fab-primary"
            >
              <Visibility />
            </Fab>
          </Tooltip>
        </Zoom>

        {/* Security Alert */}
        <Zoom in={fabHovered} timeout={200} style={{ transitionDelay: fabHovered ? '50ms' : '0ms' }}>
          <Tooltip title="Security Alert" placement="left">
            <Fab
              size="large"
              className="fab-primary"
            >
              <Security />
            </Fab>
          </Tooltip>
        </Zoom>

        {/* Add New Site */}
        <Zoom in={fabHovered} timeout={200} style={{ transitionDelay: fabHovered ? '50ms' : '0ms' }}>
          <Tooltip title="Add New Site" placement="left">
            <Fab
              size="large"
              className="fab-primary"
            >
              <LocationOn />
            </Fab>
          </Tooltip>
        </Zoom>

        {/* Main FAB */}
        <Fab
          color="primary"
          className={`fab-primary ${fabHovered ? 'fab-rotate' : 'fab-rotate-reset'}`}
        >
          <Add />
        </Fab>
      </Box>
    </Box>
  );
};

export default WatchLayout;
