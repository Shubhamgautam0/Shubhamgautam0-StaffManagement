import React, { useState, useEffect } from 'react';
import { Box, Paper, Grid, Fab, Tooltip, Zoom, Container } from '@mui/material';

import StaffList from './StaffList';
import StaffDetails from './StaffDetails';
import StaffRecords from './StaffRecords';
import AddStaffForm from './AddStaffForm';
import StaffTimesheetTable from './StaffTimesheetTable';
import type { StaffMember } from '../../data/staffData';
import { staffData } from '../../data/staffData';
import { Add, Person, Schedule } from '@mui/icons-material';

const StaffPage: React.FC = () => {
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [fabHovered, setFabHovered] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [showTimesheetTable, setShowTimesheetTable] = useState(false);

  // Auto-select first staff member on component mount
  useEffect(() => {
    if (staffData.length > 0 && !selectedStaff && !showAddForm && !showEditForm) {
      setSelectedStaff(staffData[0]);
    }
  }, [selectedStaff, showAddForm, showEditForm]);

  const handleStaffSelect = (staff: StaffMember) => {
    setSelectedStaff(staff);
  };

  const handleAddNewPerson = () => {
    setShowAddForm(true);
    setShowEditForm(false);
    setSelectedStaff(null);
  };

  const handleEditPerson = (staff: StaffMember) => {
    setEditingStaff(staff);
    setShowEditForm(true);
    setShowAddForm(false);
    setSelectedStaff(null);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setShowEditForm(false);
    setEditingStaff(null);
  };

  const handleSubmitStaff = (staffData: StaffMember) => {
    if (showEditForm && editingStaff) {
      // Edit mode
      console.log('Updating staff:', staffData);
      const updatedStaff = { ...staffData, id: editingStaff.id };
      setStaffList(prev =>
        prev.map(staff =>
          staff.id === editingStaff.id ? updatedStaff : staff
        )
      );
      setSelectedStaff(updatedStaff);
      setShowEditForm(false);
      setEditingStaff(null);
    } else {
      // Add mode
      console.log('Adding new staff:', staffData);
      setStaffList(prev => [...prev, staffData]);
      setSelectedStaff(staffData);
      setShowAddForm(false);
    }
  };

  const handleTimesheet = () => {
    setShowTimesheetTable(true);
  };

  const handleCloseTimesheetTable = () => {
    setShowTimesheetTable(false);
  };

  return (
    <Box className="page-container" sx={{
      '@media (max-width: 768px)': {
        height: 'auto',
        minHeight: 'calc(100vh - 64px)',
        overflowY: 'auto'
      }
    }}>
      <Grid container spacing={2} className="grid-container" sx={{
        '@media (max-width: 768px)': {
          height: 'auto',
          maxHeight: 'none',
          flexDirection: 'column'
        }
      }}>
        {/* Staff List */}
        <Grid size={{ xs: 12, md: (showAddForm || showEditForm) ? 6 : 4 }} className="grid-item">
          <Paper className="paper-container">
            <StaffList onStaffSelect={handleStaffSelect} newStaffList={staffList} />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: (showAddForm || showEditForm) ? 6 : 8 }} className="grid-item">
          {showAddForm ? (
            <AddStaffForm
              mode="add"
              onClose={handleCloseForm}
              onSubmit={handleSubmitStaff}
            />
          ) : showEditForm && editingStaff ? (
            <AddStaffForm
              mode="edit"
              initialData={{
                firstName: editingStaff.name.split(' ')[0] || '',
                lastName: editingStaff.name.split(' ')[1] || '',
                phoneNumber: editingStaff.phone || '',
                gender: (editingStaff.gender as 'Male' | 'Female' | 'Other') || 'Male',
                employeeId: editingStaff.employeeId || '',
                username: editingStaff.username || '',
                email: editingStaff.email || '',
                address: editingStaff.address || '',
                unitNumber: editingStaff.unitNumber || '',
                licenceExpireDate: editingStaff.licenceExpireDate || '',
                password: '',
              }}
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
                  <StaffDetails
                    staff={selectedStaff}
                    onEditClick={handleEditPerson}
                  />
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

      {/* Timesheet Table Dialog */}
      {showTimesheetTable && (
        <StaffTimesheetTable onClose={handleCloseTimesheetTable} />
      )}
    </Box>
  );
};

export default StaffPage;
