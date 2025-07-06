import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  MoreVert,
} from '@mui/icons-material';
import type { StaffMember } from '../../data/staffData';

interface StaffDetailsProps {
  staff: StaffMember | null;
}

const StaffDetails: React.FC<StaffDetailsProps> = ({ staff }) => {
  if (!staff) {
    return (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'white',
          color: '#666',
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            bgcolor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <Phone sx={{ fontSize: 32, color: '#ccc' }} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          No Data Found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Select a staff member to view details
        </Typography>
      </Box>
    );
  }

  // const getStatusChip = (status: StaffMember['status']) => {
  //   switch (status) {
  //     case 'Old Version':
  //       return (
  //         <Chip
  //           label="Old Version"
  //           size="small"
  //           sx={{
  //             backgroundColor: '#fff3cd',
  //             color: '#856404',
  //             fontSize: '11px',
  //             height: '20px',
  //           }}
  //         />
  //       );
  //     case 'Disabled':
  //       return (
  //         <Chip
  //           label="Disabled"
  //           size="small"
  //           sx={{
  //             backgroundColor: '#f8d7da',
  //             color: '#721c24',
  //             fontSize: '11px',
  //             height: '20px',
  //           }}
  //         />
  //       );
  //     default:
  //       return (
  //         <Chip
  //           label="Active"
  //           size="small"
  //           sx={{
  //             backgroundColor: '#d4edda',
  //             color: '#155724',
  //             fontSize: '11px',
  //             height: '20px',
  //           }}
  //         />
  //       );
  //   }
  // };

  return (
    <Box sx={{ height: '100%', bgcolor: 'white', overflow: 'auto' }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
          <Avatar
            sx={{
              bgcolor: '#4caf50',
              color: 'white',
              fontWeight: 'bold',
              width: 64,
              height: 64,
              fontSize: '24px',
              mr: 3,
            }}
          >
            {staff.initials}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {staff.name}
              </Typography>
              {/* {getStatusChip(staff.status)} */}
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              {staff.name.toLowerCase()} | FEMALE
            </Typography>
          </Box>
          <IconButton>
            <MoreVert />
          </IconButton>
        </Box>

        {/* Contact Information */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Phone sx={{ color: '#666', fontSize: 20 }} />
            <Typography variant="body1">{staff.phone}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Email sx={{ color: '#666', fontSize: 20 }} />
            <Typography variant="body1" color={staff.email ? 'inherit' : 'text.secondary'}>
              {staff.email || 'Email not available'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LocationOn sx={{ color: '#666', fontSize: 20 }} />
            <Typography variant="body1" color={staff.address ? 'inherit' : 'text.secondary'}>
              {staff.address || 'Address not available'}
            </Typography>
          </Box>
        </Box>

        {/* Area Tags */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Area Tags:
          </Typography>
          <input type="text"
          style={{height: '5vh', border: 'none', borderBottom: '1px solid #e0e0e0', width: '100%', }}
          placeholder="Enter area tags" />
        </Box>
      </Box>
    </Box>
  );
};

export default StaffDetails;
