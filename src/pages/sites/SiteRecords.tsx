import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Info as InfoIcon,
  ChecklistRtl as ChecklistIcon,
  Schedule as ShiftsIcon,
  Assessment as ReportsIcon,
  Receipt as InvoiceIcon,
  Badge as LicenceIcon,
  Tour as ToursIcon,
  LocationOn as CheckpointsIcon,
  Add,
} from '@mui/icons-material';
import type { SiteMember } from '../../data/siteData';
import SiteInfo from './siteInfo';
import CheckList from './checkList';
import Shifts from './Shifts';
import ReportComponent from './report';
import SiteInvoice from './siteInvoice';
import Licence from './Licence';
import Checkpoint from './Checkpoint';
import CheckpointTour from './CheckpointTour';
import Rate from './Rate';
import Visitors from './Visitors';

interface SiteRecordsProps {
  site: SiteMember | null;
  sites?: SiteMember[];
  onSitesUpdate?: (sites: SiteMember[]) => void;
}

const SiteRecords: React.FC<SiteRecordsProps> = ({ site, sites, onSitesUpdate }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  // Get map URL based on selected site
  const getMapUrl = () => {
    if (!site) {
      // Default location (California)
      return "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d224040.29506090918!2d-119.4179!3d36.7783!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQ2JzQyLjAiTiAxMTnCsDI1JzA0LjQiVw!5e0!3m2!1sen!2sus!4v1642000000000!5m2!1sen!2sus";
    }

    const siteLocations = {
      '1': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.8!2d-116.9711!3d33.7455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80db6c5c5c5c5c5c%3A0x5c5c5c5c5c5c5c5c!2s2369%20W%20Florida%20Ave%2C%20Hemet%2C%20CA%2092545%2C%20USA!5e0!3m2!1sen!2sus!4v1642000000000!5m2!1sen!2sus", 
      '2': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.5!2d-119.0187!3d35.3733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ea6bc8b2b2b2b2%3A0x2b2b2b2b2b2b2b2b!2s6710%20Colony%20St%2C%20Bakersfield%2C%20CA!5e0!3m2!1sen!2sus!4v1642000000000!5m2!1sen!2sus", 
      '3': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.1!2d-118.4437!3d34.1522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc85c85c85c8%3A0x5c85c85c85c85c85!2s14644%20Ventura%20Boulevard%2C%20Sherman%20Oaks%2C%20CA!5e0!3m2!1sen!2sus!4v1642000000000!5m2!1sen!2sus", 
      '4': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.5!2d-118.2437!3d34.0522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sus!4v1642000000000!5m2!1sen!2sus", 
      '5': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.1!2d-117.9311!3d33.8121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcd7d12b3b5e6b%3A0x2ef62f8418225cfa!2sFullerton%2C%20CA%2C%20USA!5e0!3m2!1sen!2sus!4v1642000000000!5m2!1sen!2sus",
      '6': "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d224040.29506090918!2d77.125436!3d28.670807000000003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03986aaaaaab%3A0xe1fbe446251ca22!2sRashtriya%20Ayurveda%20Vidyapeeth%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1747915427085!5m2!1sen!2sin"
    };

    return siteLocations[site.id as keyof typeof siteLocations] || siteLocations['6'];
  };

  // Get site address for overlay
  const getSiteAddress = () => {
    if (!site) {
      return "Select a site to view location";
    }

    const siteAddresses = {
      '1': "2369 W Florida Ave, Hemet, CA 92545, USA",
      '2': "6710 Colony St, Bakersfield, CA, USA",
      '3': "14644 Ventura Boulevard, Sherman Oaks, CA, USA",
      '4': "Downtown Los Angeles, CA, USA",
      '5': "Fullerton, CA, USA",
      '6': "Rashtriya Ayurveda Vidyapeeth, New Delhi, India"
    };

    return siteAddresses[site.id as keyof typeof siteAddresses] || site.address || "Address not available";
  };

  const tabs = [
    { label: 'Site Info', icon: <InfoIcon />, value: 0 },
    { label: 'Checklist', icon: <ChecklistIcon />, value: 1 },
    { label: 'Shifts', icon: <ShiftsIcon />, value: 2 },
    { label: 'Reports', icon: <ReportsIcon />, value: 3 },
    { label: 'Site Invoice', icon: <InvoiceIcon />, value: 4 },
    { label: 'Licence', icon: <LicenceIcon />, value: 5 },
    { label: 'Tours', icon: <ToursIcon />, value: 6 },
    { label: 'Checkpoints', icon: <CheckpointsIcon />, value: 7 },
    // { label: 'Settings', value: 8 },
    { label: 'Visitors', value: 8 },
    { label: 'Rates', value: 9 },
  ];

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return (
          <Box sx={{ p: 3 }}>
            <SiteInfo selectedSite={site} />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ p: 3 }}>
            <CheckList />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ p: 3 }}>
            <Shifts selectedSite={site} sites={sites} onSitesUpdate={onSitesUpdate} />
          </Box>
        );
      case 3:
        return (
          <Box sx={{ p: 3 }}>
            <ReportComponent selectedSite={site} />
          </Box>
        );
      case 4:
        return (
          <Box sx={{ p: 3 }}>
            <SiteInvoice />
          </Box>
        );
      case 5:
        return (
          <Licence siteId={site?.id} />
        );
      case 6:
        return (
          <CheckpointTour siteId={site?.id} />
        );
      case 7:
        return (
          <Checkpoint siteId={site?.id} />
        );
      case 8:
        return (
          <Box>
            <Visitors />
          </Box>
        );
      case 9:
        return (
          <Rate siteId={site?.id} />
        );
      default:
        return null;
    }
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
        mb: 3
      }}>
        <iframe
          src={getMapUrl()}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={site ? `${site.name} Location Map` : "Site Location Map"}
        />

        {/* Map Info Overlay */}
        <Box sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'var(--clr-bg-overlay)',
          p: 2,
          borderTop: '1px solid var(--clr-border-light)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box sx={{
              width: 8,
              height: 8,
              backgroundColor: 'var(--clr-info)',
              borderRadius: '50%',
              mr: 1
            }} />
            <Box>
              <Typography variant="body2" sx={{
                color: 'var(--clr-text-primary)',
                fontWeight: 600,
                fontSize: '13px'
              }}>
                {site ? site.name : "No Site Selected"}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px' }}>
                {getSiteAddress()}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{
              width: 16,
              height: 16,
              backgroundColor: 'var(--clr-purple-light)',
              borderRadius: '2px',
              mr: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography variant="caption" sx={{ color: 'white', fontSize: '10px' }}>
                ✓
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Enforce Geofence for Start Duty
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Tabs Section */}
      <Box sx={{ minHeight: '500px' }}>
        <Paper sx={{ borderRadius: 0, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            className='staff-tabs'
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              backgroundColor: '#f5f5f5',
            }}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                icon={tab.icon}
                label={tab.label}
                iconPosition="start"
                sx={{
                  '& .MuiSvgIcon-root': {
                    fontSize: '1rem',
                    mr: 1,
                  },
                }}
              />
            ))}
          </Tabs>
        </Paper>

        <Box sx={{
          minHeight: '400px',
          backgroundColor: '#fff',
          border: '1px solid #e0e0e0',
          borderTop: 'none'
        }}>
          {renderTabContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default SiteRecords;
