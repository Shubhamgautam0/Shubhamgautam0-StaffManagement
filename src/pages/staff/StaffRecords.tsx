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
import StaffSchedule from './StaffSchedule';
import DutySettings from './DutySettings';
import RecordsComponent from './RecordsComponent';

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

  // Staff will always be available now due to auto-selection
  if (!staff) {
    return null;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Records
        return staff ? (
          <RecordsComponent
            staffId={staff.id}
            staffName={staff.name}
            recordType={recordType}
            setRecordType={setRecordType}
          />
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: 'var(--clr-text-secondary)' }}>
              No staff selected
            </Typography>
          </Box>
        );
      case 1: // Schedule
        return staff ? (
          <StaffSchedule
            staffId={staff.id}
            staffName={staff.name}
            staffInitials={staff.initials}
            staffColor={staff.color}
          />
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: 'var(--clr-text-secondary)' }}>
              No staff selected
            </Typography>
          </Box>
        );
      case 2: // Timesheet
        return staff ? (
          <Timesheet
            staffId={staff.id}
            staffName={staff.name}
          />
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: 'var(--clr-text-secondary)' }}>
              No staff selected
            </Typography>
          </Box>
        );
      case 3: // Availability
        return staff ? (
          <Availability
            staffId={staff.id}
            staffName={staff.name}
          />
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: 'var(--clr-text-secondary)' }}>
              No staff selected
            </Typography>
          </Box>
        );
      case 4:
        return staff ? (
          <Licence_Certification
            staffId={staff.id}
            staffName={staff.name}
          />
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: 'var(--clr-text-secondary)' }}>
              No staff selected
            </Typography>
          </Box>
        );
      case 5:
        return staff ? (
          <DutySettings
            staffId={staff.id}
            staffName={staff.name}
          />
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: 'var(--clr-text-secondary)' }}>
              No staff selected
            </Typography>
          </Box>
        );
      case 6:
        return staff ? (
          <StaffInformation
            staffId={staff.id}
            staffName={staff.name}
          />
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: 'var(--clr-text-secondary)' }}>
              No staff selected
            </Typography>
          </Box>
        );
      case 7:
        return (
        <Box className="staff-records-empty">
            <Typography variant="h6" className="staff-records-empty-title">
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
    <Paper className="staff-records-container">
      <Box className="staff-records-tabs-container">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          className="staff-tabs"
          centered
          sx={{backgroundColor: '#f5f5f5'}}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              label={
                <Box className="staff-records-tab-icon">
                  {tab.icon && <tab.icon />}
                  {tab.label}
                </Box>
              }
            />
          ))}
        </Tabs>
      </Box>

      <Box className="staff-records-content">
        {renderTabContent()}
      </Box>
    </Paper>
  );
};

export default StaffRecords;
