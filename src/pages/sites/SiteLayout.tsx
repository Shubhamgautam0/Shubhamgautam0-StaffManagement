import React, { useEffect, useState } from 'react';
import { Box, Paper, Grid, Fab, Tooltip, Zoom } from '@mui/material';

import SiteList from './SiteList';
import SiteDetails from './SiteDetails';
import SiteRecords from './SiteRecords';
import { SiteData, type SiteMember } from '../../data/siteData';
import { Add, CarCrashOutlined, LocationCity, Map } from '@mui/icons-material';

const SiteLayout: React.FC = () => {
  const [sites, setSites] = useState<SiteMember[]>(SiteData);
  const [selectedSite, setSelectedSite] = useState<SiteMember | null>(null);
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

  const handleSiteSelect = (site: SiteMember) => {
    const updatedSite = sites.find(s => s.id === site.id) || site;
    setSelectedSite(updatedSite);
  };

  return (
    <Box className="page-container sites-page">
      <Grid container spacing={2} className="grid-container" >
        <Grid size={{ xs: 12, md: 4 }} className="grid-item">
          <Paper className="paper-container">
            <SiteList onSiteSelect={handleSiteSelect} selectedSite={selectedSite} sites={sites} />
          </Paper>
        </Grid>

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
                <SiteDetails site={selectedSite} />
              </Paper>
            </Grid>

            {/* Site Records */}
            <Grid size={12} sx={{
              height: '50%',
              minHeight: 0,
              flex: '1 1 50%',
              overflow: 'hidden'
            }}>
              <Paper className="paper-container">
                <SiteRecords site={selectedSite} sites={sites} onSitesUpdate={setSites} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box
              className="fab-container"
              onMouseEnter={() => setFabHovered(true)}
              onMouseLeave={() => setFabHovered(false)}
            >
              {/* Add New Person */}
              <Zoom in={fabHovered} timeout={200} style={{ transitionDelay: fabHovered ? '100ms' : '0ms' }}>
                <Tooltip title="Mobile car" placement="left">
                  <Fab
                    size="large"
                    // onClick={handleAddNewPerson}
                    className="fab-primary"
                  >
                    <CarCrashOutlined />
                  </Fab>
                </Tooltip>
              </Zoom>
      
              {/* Timesheet */}
              <Zoom in={fabHovered} timeout={200} style={{ transitionDelay: fabHovered ? '50ms' : '0ms' }}>
                <Tooltip title="Site Invoice" placement="left">
                  <Fab
                    size="large"
                    // onClick={handleTimesheet}
                    className="fab-primary"
                  >
                    <LocationCity />
                  </Fab>
                </Tooltip>
              </Zoom>
              {/* Timesheet */}
              <Zoom in={fabHovered} timeout={200} style={{ transitionDelay: fabHovered ? '50ms' : '0ms' }}>
                <Tooltip title="Add new site" placement="left">
                  <Fab
                    size="large"
                    // onClick={handleTimesheet}
                    className="fab-primary"
                  >
                    <Map />
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

export default SiteLayout;