import React, { useEffect, useState } from 'react';
import { Box, Paper, Grid, Fab, Tooltip, Zoom } from '@mui/material';

import SiteList from './SiteList';
import SiteDetails from './SiteDetails';
import SiteRecords from './SiteRecords';
import AddSiteForm from './AddSiteForm';
import SiteInvoice from './siteInvoice';
import AddMobileCarForm from '../../components/forms/AddMobileCarForm';
import { SiteData, type SiteMember, addSite } from '../../data/siteData';
import { Add, CarCrashOutlined, LocationCity, Map } from '@mui/icons-material';

const SiteLayout: React.FC = () => {
  const [sites, setSites] = useState<SiteMember[]>(SiteData);
  const [selectedSite, setSelectedSite] = useState<SiteMember | null>(null);
  const [fabHovered, setFabHovered] = useState(false);
  const [activeForm, setActiveForm] = useState<string | null>(null);

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

  const handleAddSite = () => {
    setActiveForm('addSite');
  };

  const handleSaveSite = (siteData: any) => {
    const success = addSite(siteData);
    if (success) {
      setSites([...SiteData]);
      setActiveForm(null);
      const newSite = SiteData[SiteData.length - 1];
      setSelectedSite(newSite);
    }
  };

  const handleCancelAddSite = () => {
    setActiveForm(null);
  };

  const handleSiteInvoice = () => {
    setActiveForm('invoice');
  };

  const handleCloseSiteInvoice = () => {
    setActiveForm(null);
  };

  const handleAddMobileCar = () => {
    setActiveForm('mobileCar');
  };

  const handleSaveMobileCar = (mobileCarData: any) => {
    console.log('Mobile car data:', mobileCarData);
    setActiveForm(null);
  };

  const handleCancelAddMobileCar = () => {
    setActiveForm(null);
  };

  const handleSiteUpdate = (updatedSite: SiteMember) => {
    // Update the sites array
    const updatedSites = sites.map(site =>
      site.id === updatedSite.id ? updatedSite : site
    );
    setSites(updatedSites);

    // Update selected site if it's the one being edited
    if (selectedSite && selectedSite.id === updatedSite.id) {
      setSelectedSite(updatedSite);
    }
  };

  return (
    <Box className="page-container sites-page">
      <Grid container spacing={2} className="grid-container">
        <Grid size={{ xs: 12, sm: 12, md: 4 }} className="grid-item">
          <Paper className="paper-container">
            <SiteList onSiteSelect={handleSiteSelect} selectedSite={selectedSite} sites={sites} />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }} className="grid-item">
          {activeForm === 'addSite' ? (
            <Paper className="paper-container">
              <AddSiteForm onSave={handleSaveSite} onCancel={handleCancelAddSite} />
            </Paper>
          ) : activeForm === 'invoice' ? (
            <Paper className="paper-container">
              <SiteInvoice onClose={handleCloseSiteInvoice} />
            </Paper>
          ) : activeForm === 'mobileCar' ? (
            <Paper className="paper-container">
              <AddMobileCarForm onSave={handleSaveMobileCar} onCancel={handleCancelAddMobileCar} />
            </Paper>
          ) : (
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
                  <SiteDetails
                    site={selectedSite}
                    onSiteUpdate={handleSiteUpdate}
                  />
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
          )}
        </Grid>
      </Grid>

      <Box
        className="fab-container"
        onMouseEnter={() => setFabHovered(true)}
        onMouseLeave={() => setFabHovered(false)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          display: 'flex',
          flexDirection: 'column-reverse',
          alignItems: 'center',
          gap: 2,
          zIndex: 1300
        }}
      >
        {/* Main FAB - Always visible */}
        <Fab
          color="primary"
          className={`fab-primary ${fabHovered ? 'fab-rotate' : 'fab-rotate-reset'}`}
          sx={{
            zIndex: 1302,
            pointerEvents: 'auto'
          }}
          onClick={() => setActiveForm(null)}
        >
          <Add />
        </Fab>

        {/* Add new site */}
        <Zoom in={fabHovered} timeout={200} style={{ transitionDelay: fabHovered ? '0ms' : '0ms' }}>
          <Tooltip title="Add new site" placement="left">
            <Fab
              size="medium"
              onClick={handleAddSite}
              className="fab-primary"
              sx={{
                zIndex: 1301,
                pointerEvents: 'auto'
              }}
            >
              <Map />
            </Fab>
          </Tooltip>
        </Zoom>

        {/* Add Mobile Car */}
        <Zoom in={fabHovered} timeout={200} style={{ transitionDelay: fabHovered ? '100ms' : '0ms' }}>
          <Tooltip title="Mobile car" placement="left">
            <Fab
              size="medium"
              onClick={handleAddMobileCar}
              className="fab-primary"
              sx={{
                zIndex: 1301,
                pointerEvents: 'auto'
              }}
            >
              <CarCrashOutlined />
            </Fab>
          </Tooltip>
        </Zoom>

        {/* Site Invoice */}
        <Zoom in={fabHovered} timeout={200} style={{ transitionDelay: fabHovered ? '50ms' : '0ms' }}>
          <Tooltip title="Site Invoice" placement="left">
            <Fab
              size="medium"
              onClick={handleSiteInvoice}
              className="fab-primary"
              sx={{
                zIndex: 1301,
                pointerEvents: 'auto'
              }}
            >
              <LocationCity />
            </Fab>
          </Tooltip>
        </Zoom>
      </Box>
    </Box>
  );
};

export default SiteLayout;