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
import { staffData, getStaffByStatus } from '../../data/staffData';
import type { StaffMember } from '../../data/staffData';


interface StaffListProps {
  onStaffSelect: (staff: StaffMember) => void;
}

const StaffList: React.FC<StaffListProps> = ({ onStaffSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const getFilteredStaff = () => {
    let filtered = staffData;
    
    // Filter by tab
    if (activeTab === 1) {
      filtered = getStaffByStatus('Active');
    } else if (activeTab === 2) {
      filtered = getStaffByStatus('Old Version');
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(staff =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.phone.includes(searchTerm)
      );
    }
    
    return filtered;
  };

  const getTabCounts = () => {
    const all = staffData.length;
    const active = getStaffByStatus('Active').length;
    const expiring = getStaffByStatus('Old Version').length;
    return { all, active, expiring };
  };

  const { all, active, expiring } = getTabCounts();
  const filteredStaff = getFilteredStaff();

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'white' }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, flex: 1 }}>
            Staff
          </Typography>
            <Box />
          <IconButton size="small">
            <MoreVert />
          </IconButton>
        </Box>

        {/* Search */}
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

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '14px',
              color: '#666',
              minWidth: 'auto',
              padding: '8px 16px',
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

      {/* Add Button */}
    </Box>
  );
};

export default StaffList;
