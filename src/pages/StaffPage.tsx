import React, { useState } from 'react';
import { Box, Paper, Grid, Fab } from '@mui/material';

import StaffList from './StaffList';
import StaffDetails from './StaffDetails';
import StaffRecords from './StaffRecords';
import type { StaffMember } from '../data/staffData';
import { Add } from '@mui/icons-material';

const StaffPage: React.FC = () => {
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  const handleStaffSelect = (staff: StaffMember) => {
    setSelectedStaff(staff);
  };

  return (
    <Box sx={{
      height: 'calc(100vh - 64px)', 
      width: '100vw',
      bgcolor: '#f5f5f5',
      p: 2,
      overflow: 'hidden',
      boxSizing: 'border-box',
      marginTop: '64px', 
    }}>
      <Grid container spacing={2} sx={{
        height: 'calc(100vh - 64px - 32px)', 
        width: 'calc(100vw - 32px)',
        maxHeight: 'calc(100vh - 64px - 32px)',
        maxWidth: 'calc(100vw - 32px)',
        margin: 0,
        overflow: 'hidden'
      }}>
        {/* Staff List */}
        <Grid size={{ xs: 12, md: 4 }} sx={{
          height: '100%',
          minHeight: 0,
          overflow: 'hidden'
        }}>
          <Paper sx={{
            height: '100%',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box'
          }}>
            <StaffList onStaffSelect={handleStaffSelect} />
          </Paper>
        </Grid>

        {/* Staff Details and Records */}
        <Grid size={{ xs: 12, md: 8 }} sx={{
          height: '100%',
          minHeight: 0,
          overflow: 'hidden'
        }}>
          <Grid container spacing={2} sx={{
            height: '100%',
            width: '100%',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            margin: 0,
            overflow: 'hidden'
          }}>
            {/* Staff Details */}
            <Grid size={12} sx={{
              height: '50%',
              minHeight: 0,
              flex: '1 1 50%',
              overflow: 'hidden'
            }}>
              <Paper sx={{
                height: '100%',
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box'
              }}>
                <StaffDetails staff={selectedStaff} />
              </Paper>
            </Grid>

            {/* Staff Records */}
            <Grid size={12} sx={{
              height: '50%',
              minHeight: 0,
              flex: '1 1 50%',
              overflow: 'hidden'
            }}>
              <Paper sx={{
                height: '100%',
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box'
              }}>
                <StaffRecords staff={selectedStaff} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
        <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          bgcolor: '#6366f1',
          '&:hover': {
            bgcolor: '#5b5bd6',
          },
        }}
      >
        <Add />
      </Fab>
    </Box>
  );
};

export default StaffPage;
