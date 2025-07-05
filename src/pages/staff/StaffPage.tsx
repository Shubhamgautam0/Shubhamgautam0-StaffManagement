import React, { useState } from 'react';
import { Box, Paper, Grid, Fab, Tooltip, Zoom } from '@mui/material';

import StaffList from './StaffList';
import StaffDetails from './StaffDetails';
import StaffRecords from './StaffRecords';
import AddStaffForm from './AddStaffForm';
import type { StaffMember } from '../../data/staffData';
import { Add, Person, Schedule } from '@mui/icons-material';

const StaffPage: React.FC = () => {
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [fabHovered, setFabHovered] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [staffList, setStaffList] = useState<StaffMember[]>([]);

  const handleStaffSelect = (staff: StaffMember) => {
    setSelectedStaff(staff);
  };

  const handleAddNewPerson = () => {
    setShowAddForm(true);
    setSelectedStaff(null); 
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
  };

  const handleSubmitStaff = (newStaff: StaffMember) => {
    setStaffList(prev => [...prev, newStaff]);
    setShowAddForm(false);
    // Optionally select the newly added staff
    setSelectedStaff(newStaff);
  };

  const handleTimesheet = () => {
    console.log('Timesheet clicked');
    // Add your logic here
  };

  return (
    <Box className="page-container">
      <Grid container spacing={2} className="grid-container">
        {/* Staff List */}
        <Grid size={{ xs: 12, md: showAddForm ? 6 : 4 }} className="grid-item">
          <Paper className="paper-container">
            <StaffList onStaffSelect={handleStaffSelect} newStaffList={staffList} />
          </Paper>
        </Grid>

        {/* Staff Details and Records OR Add Staff Form */}
        <Grid size={{ xs: 12, md: showAddForm ? 6 : 8 }} className="grid-item">
          {showAddForm ? (
            <AddStaffForm
              onClose={handleCloseForm}
              onSubmit={handleSubmitStaff}
            />
          ) : (
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
                <Paper className="paper-container">
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
                <Paper className="paper-container">
                  <StaffRecords staff={selectedStaff} />
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
      >
        {/* Add New Person */}
        <Zoom in={fabHovered} timeout={200} style={{ transitionDelay: fabHovered ? '100ms' : '0ms' }}>
          <Tooltip title="Add New Person" placement="left">
            <Fab
              size="large"
              onClick={handleAddNewPerson}
              className="fab-primary"
            >
              <Person />
            </Fab>
          </Tooltip>
        </Zoom>

        {/* Timesheet */}
        <Zoom in={fabHovered} timeout={200} style={{ transitionDelay: fabHovered ? '50ms' : '0ms' }}>
          <Tooltip title="Timesheet" placement="left">
            <Fab
              size="large"
              onClick={handleTimesheet}
              className="fab-primary"
            >
              <Schedule />
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

export default StaffPage;
