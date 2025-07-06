import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Select,
  MenuItem,
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
import Calendar from './Calender';
import Availability from './Availability';
import Licence_Certification from './Licence_Certification';
import Timesheet from './Timesheet';
import StaffInformation from './StaffInformation';

interface StaffRecordsProps {
  staff: StaffMember | null;
}

const StaffRecords: React.FC<StaffRecordsProps> = ({ staff }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [recordType, setRecordType] = useState<'Records' | 'Notes'>('Records'); 


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
    { id: 6, label: 'Staff Information' },
    { id: 7, label: 'More' },
    
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
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', m: '30px 30px 0 30px' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Record
              </Typography>
              <Select
                value={recordType}
                onChange={(e) => setRecordType(e.target.value as 'Records' | 'Notes')}
                className='item-selector'
              >
                <MenuItem value="Records">Records</MenuItem>
                <MenuItem value="Notes">Notes</MenuItem>
              </Select>
            </Box>
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
          </Box>
        );
      case 1: // Schedule
        return (
          <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto'
          }}>
            <Box>
              <Typography variant='body1' sx={{ fontWeight: 600, m: 2 }}>
                Schedule
                </Typography>
            </Box>
            <Calendar />
          </Box>
        );
      case 2: // Timesheet
        return (
          <Box>
            <Timesheet />
          </Box>
        );
      case 3: // Availability
        return (
          <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto'
          }}>
            <Availability />
          </Box>
        );
      case 4:
        return (
          <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto'
          }}>
            <Licence_Certification />
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
          <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto'
          }}>
            <StaffInformation />
          </Box>
        );
      case 7:
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
    <Paper sx={{
      bgcolor: 'white',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      
    }}>
      <Box sx={{ borderBottom: '1px solid #e0e0e0', flexShrink: 0, overflow: 'auto' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          className="staff-tabs"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {tab.icon && <tab.icon sx={{ fontSize: 18 }} />}
                  {tab.label}
                </Box>
              }
            />
          ))}
        </Tabs>
      </Box>

      <Box sx={{
        flex: 1,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {renderTabContent()}
      </Box>
    </Paper>
  );
};

export default StaffRecords;
