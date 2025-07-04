import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
} from '@mui/material';
import {
  Assignment,
  Schedule,
  AccessTime,
  Visibility,
  Security,
  Settings,
} from '@mui/icons-material';
import type { StaffMember } from '../../data/staffData';

interface StaffRecordsProps {
  staff: StaffMember | null;
}

const StaffRecords: React.FC<StaffRecordsProps> = ({ staff }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const tabs = [
    { id: 0, label: 'Records', icon: Assignment },
    { id: 1, label: 'Schedule', icon: Schedule },
    { id: 2, label: 'Timesheet', icon: AccessTime },
    { id: 3, label: 'Availability', icon: Visibility },
    { id: 4, label: 'Licence & Certification', icon: Security },
    { id: 5, label: 'Duty Settings', icon: Settings },
    { id: 6, label: 'More' },
  ];

  if (!staff) {
    return (
      <Box
        sx={{
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'white',
          color: '#666',
        }}
      >
        <Assignment sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          No Data Found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Select a staff member to view records
        </Typography>
      </Box>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Records
        return (
          <Box
            sx={{
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
            }}
          >
            <Assignment sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              No Data Found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No records available for this staff member
            </Typography>
          </Box>
        );
      case 1: // Schedule
        return (
          <Box
            sx={{
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
            }}
          >
            <Schedule sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Schedule
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Schedule information will be displayed here
            </Typography>
          </Box>
        );
      case 2: // Timesheet
        return (
          <Box
            sx={{
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
            }}
          >
            <AccessTime sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Timesheet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Timesheet data will be displayed here
            </Typography>
          </Box>
        );
      case 3: // Availability
        return (
          <Box
            sx={{
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
            }}
          >
            <Visibility sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Availability
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Staff availability information will be displayed here
            </Typography>
          </Box>
        );
      case 4: 
        return (
          <Box
            sx={{
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
            }}
          >
            <Security sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Licence & Certification
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Licence and certification details will be displayed here
            </Typography>
          </Box>
        );
      case 5: 
        return (
          <Box
            sx={{
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
            }}
          >
            <Settings sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Duty Settings
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Duty settings and preferences will be displayed here
            </Typography>
          </Box>
        );
      case 6: 
        return (
          <Box
            sx={{
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              More Options
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Additional options and settings will be displayed here
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Paper sx={{ bgcolor: 'white', height: '100%' }}>
      {/* Tabs */}
      <Box sx={{ borderBottom: '1px solid #e0e0e0', overflow: 'auto' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            px: 2,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '14px',
              color: '#666',
              minWidth: 'auto',
              padding: '12px 16px',
              '&.Mui-selected': {
                color: '#1976d2',
                fontWeight: 600,
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#1976d2',
            },
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  {tab.icon && <tab.icon sx={{ fontSize: 18 }} />}
                  {tab.label}
                </Box>
              }
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ p: 3 }}>
        {renderTabContent()}
      </Box>
    </Paper>
  );
};

export default StaffRecords;
