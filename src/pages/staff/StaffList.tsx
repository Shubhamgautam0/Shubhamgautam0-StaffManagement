import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Search,
  MoreVert,
  Phone,
} from '@mui/icons-material';
import { staffData } from '../../data/staffData';
import type { StaffMember } from '../../data/staffData';


interface StaffListProps {
  onStaffSelect: (staff: StaffMember) => void;
  newStaffList?: StaffMember[];
}

const StaffList: React.FC<StaffListProps> = ({ onStaffSelect, newStaffList = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const getFilteredStaff = () => {
    // Combine original staff data with new staff
    const allStaff = [...staffData, ...newStaffList];
    let filtered = allStaff;

    if (activeTab === 1) {
      filtered = allStaff.filter(staff => staff.status === 'Active');
    } else if (activeTab === 2) {
      filtered = allStaff.filter(staff => staff.status === 'Old Version');
    }

    if (searchTerm) {
      filtered = filtered.filter(staff =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.phone.includes(searchTerm)
      );
    }

    return filtered;
  };

  const getTabCounts = () => {
    const allStaff = [...staffData, ...newStaffList];
    const all = allStaff.length;
    const active = allStaff.filter(staff => staff.status === 'Active').length;
    const expiring = allStaff.filter(staff => staff.status === 'Old Version').length;
    return { all, active, expiring };
  };

  const { all, active, expiring } = getTabCounts();
  const filteredStaff = getFilteredStaff();

  return (
    <Box className="staff-list-container">
      <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex',justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" className="staff-list-title">
            Staff
          </Typography>
            <Box />
          <IconButton size="small">
            <MoreVert />
          </IconButton>
        </Box>

        <TextField
          fullWidth
          placeholder="Search Staff by Name, Phone Number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#666' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
          }}
        />

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          className='staff-tabs'
          variant='scrollable'
        >
          <Tab label={`All Staff (${all})`} />
          <Tab label={`Active Staff (${active})`} />
          <Tab label={`Expiring Skills (${expiring})`} />
        </Tabs>
      </Box>

      {/* Staff List */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List sx={{ p: 0 }}>
          {filteredStaff.map((staff) => (
            <ListItem key={staff.id} disablePadding>
              <ListItemButton
                onClick={() => onStaffSelect(staff)}
                sx={{
                  p: 2,
                  borderBottom: '1px solid #f0f0f0',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: '#4caf50',
                      color: 'white',
                      fontWeight: 'bold',
                      width: 40,
                      height: 40,
                    }}
                  >
                    {staff.initials}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {staff.name}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Phone sx={{ fontSize: 14, color: '#666' }} />
                      <Typography variant="body2" color="text.secondary">
                        {staff.phone}
                      </Typography>
                    </Box>
                  }
                />
                <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                  <MoreVert />
                </IconButton>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

    </Box>
  );
};

export default StaffList;
