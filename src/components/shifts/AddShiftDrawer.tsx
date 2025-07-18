import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Close,
  ExpandMore,
  Schedule,
  CalendarToday,
} from '@mui/icons-material';
import { type Shift, type SiteMember, shiftColors, payRates, billRates, calculateDuration } from '../../data/siteData';
import { staffData, type StaffMember } from '../../data/staffData';

interface AddShiftDrawerProps {
  open: boolean;
  onClose: () => void;
  onSave: (shift: Shift) => void;
  selectedDate: Date;
  selectedSite?: SiteMember | null;
}

const AddShiftDrawer: React.FC<AddShiftDrawerProps> = ({
  open,
  onClose,
  onSave,
  selectedDate,
  selectedSite,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [staffSearchTerm, setStaffSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    siteName: selectedSite?.name || '',
    date: selectedDate.toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '17:00',
    staffRequired: 1,
    color: shiftColors[0],
    payRate: '',
    billRate: '',
    assignedStaff: [] as string[],
  });

  // Filter available staff based on search term
  const filteredStaff = staffData.filter(staff =>
    staff.name.toLowerCase().includes(staffSearchTerm.toLowerCase()) &&
    staff.status === 'Active'
  );

  // Get assigned staff details
  const getAssignedStaffDetails = () => {
    return formData.assignedStaff.map(staffId => {
      const staff = staffData.find(s => s.id === staffId);
      return staff;
    }).filter(Boolean) as StaffMember[];
  };

  // Handle staff selection
  const handleStaffToggle = (staffId: string) => {
    setFormData(prev => ({
      ...prev,
      assignedStaff: prev.assignedStaff.includes(staffId)
        ? prev.assignedStaff.filter(id => id !== staffId)
        : [...prev.assignedStaff, staffId]
    }));
  };

  // Update form data when selectedSite or selectedDate changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      siteName: selectedSite?.name || '',
      date: selectedDate.toISOString().split('T')[0],
    }));
  }, [selectedSite, selectedDate]);

  const handleSave = () => {
    if (formData.siteName && selectedSite) {
      // Get staff details for assigned staff
      const assignedStaffDetails = getAssignedStaffDetails();

      const newShift: Shift = {
        id: `shift-${Date.now()}`,
        siteId: selectedSite.id,
        siteName: formData.siteName,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        staffRequired: formData.staffRequired,
        assignedStaff: formData.assignedStaff,
        assignedStaffNames: assignedStaffDetails.map(staff => staff.name),
        assignedStaffInitials: assignedStaffDetails.map(staff => staff.initials),
        color: formData.color,
        status: 'scheduled',
        payRate: formData.payRate,
        billRate: formData.billRate,
      };
      onSave(newShift);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      siteName: selectedSite?.name || '',
      date: selectedDate.toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '17:00',
      staffRequired: 1,
      color: shiftColors[0],
      payRate: '',
      billRate: '',
      assignedStaff: [],
    });
    setStaffSearchTerm('');
    setActiveTab(0);
    onClose();
  };

  const duration = calculateDuration(formData.startTime, formData.endTime);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            width: 600,
            maxWidth: '90vw',
          }
        }
      }}
    >
      <Box sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 3,
          borderBottom: '1px solid var(--clr-border-light)'
        }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--clr-text-primary)' }}>
              {`${formData.startTime} - ${formData.endTime}`}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--clr-text-secondary)', mt: 0.5 }}>
              {new Date(formData.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </Typography>
          </Box>
          <IconButton onClick={handleClose} sx={{ color: 'var(--clr-text-tertiary)' }}>
            <Close />
          </IconButton>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: '1px solid var(--clr-border-light)' }}>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                color: 'var(--clr-text-secondary)',
              },
              '& .MuiTab-root.Mui-selected': {
                color: 'var(--clr-purple)',
                fontWeight: 600,
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'var(--clr-purple)',
              },
            }}
          >
            <Tab label="Shift Info" />
            <Tab label="Rates" />
          </Tabs>
        </Box>

        {/* Content */}
        <Box sx={{ 
          flex: 1,
          p: 3,
          overflow: 'auto'
        }}>
          {activeTab === 0 && (
            <Box>
              <Accordion defaultExpanded sx={{ mb: 3, boxShadow: 'none', border: '1px solid var(--clr-border-light)' }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--clr-text-primary)' }}>
                    Scheduled Shift
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Avatar sx={{ 
                      bgcolor: 'var(--clr-warning)', 
                      color: 'var(--clr-white)',
                      width: 48,
                      height: 48,
                      fontSize: '18px',
                      fontWeight: 600
                    }}>
                      {selectedSite?.name.charAt(0) || 'A'}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--clr-text-primary)' }}>
                      {selectedSite?.name || 'APPLE SCHOOL POST'}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex',justifyContent: 'space-around', gap: 2 }}>
                    {/* Shift Date */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ 
                      mb: 1,
                      color: 'var(--clr-text-secondary)',
                      fontSize: '14px'
                    }}>
                      Shift Date <span style={{ color: 'var(--clr-orange)' }}>*</span>
                    </Typography>
                    <TextField
                      type="date"
                      fullWidth
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className='input-field'
                    />
                  </Box>

                  {/* Color Selection */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ 
                      mb: 1,
                      color: 'var(--clr-text-secondary)',
                      fontSize: '14px'
                    }}>
                      Color
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        value={formData.color}
                        onChange={(e) => setFormData({...formData, color: e.target.value})}
                        renderValue={(value) => (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                              sx={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                backgroundColor: value,
                              }}
                            />
                          </Box>
                        )}
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--clr-border-light)',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--clr-border-medium)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--clr-purple)',
                          },
                        }}
                      >
                        {shiftColors.map((color) => (
                          <MenuItem key={color} value={color}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box
                                sx={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: '50%',
                                  backgroundColor: color,
                                }}
                              />
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  </Box>

                  {/* Shift Time */}
                  <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{
                        mb: 1,
                        color: 'var(--clr-text-secondary)',
                        fontSize: '14px'
                      }}>
                        Shift Time <span style={{ color: 'var(--clr-orange)' }}>*</span>
                      </Typography>
                      <TextField
                        type="time"
                        fullWidth
                        value={formData.startTime}
                        onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                        className='input-field'
                      />
                    </Box>

                    <Typography sx={{
                      color: 'var(--clr-text-secondary)',
                      mx: 1,
                      mt: 3
                    }}>
                      to
                    </Typography>

                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{
                        mb: 1,
                        color: 'var(--clr-text-secondary)',
                        fontSize: '14px'
                      }}>
                        &nbsp;
                      </Typography>
                      <TextField
                        type="time"
                        fullWidth
                        value={formData.endTime}
                        onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                        className='input-field'
                      />
                    </Box>

                    <Typography sx={{
                      color: 'var(--clr-info)',
                      fontWeight: 600,
                      fontSize: '14px',
                      mt: 3,
                      ml: 2
                    }}>
                      {duration}
                    </Typography>
                  </Box>

                  {/* Number of Staff Required */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{
                      mb: 1,
                      color: 'var(--clr-text-secondary)',
                      fontSize: '14px'
                    }}>
                      Number of staff Required <span style={{ color: 'var(--clr-orange)' }}>*</span>
                    </Typography>
                    <TextField
                      type="number"
                      fullWidth
                      value={formData.staffRequired}
                      onChange={(e) => setFormData({...formData, staffRequired: parseInt(e.target.value) || 1})}
                      className='input-field'
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>

              {/* Scheduled Staff Section */}
              <Accordion sx={{ mb: 3, boxShadow: 'none', border: '1px solid var(--clr-border-light)' }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--clr-text-primary)' }}>
                    Scheduled Staff
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{
                      mb: 1,
                      color: 'var(--clr-text-secondary)',
                      fontSize: '14px'
                    }}>
                      Staff <span style={{ color: 'var(--clr-orange)' }}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Search Staff"
                      value={staffSearchTerm}
                      onChange={(e) => setStaffSearchTerm(e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'var(--clr-border-light)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'var(--clr-border-medium)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'var(--clr-purple)',
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Selected Staff */}
                  {formData.assignedStaff.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" sx={{
                        mb: 2,
                        color: 'var(--clr-text-secondary)',
                        fontSize: '14px'
                      }}>
                        Selected Staff ({formData.assignedStaff.length})
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {getAssignedStaffDetails().map((staff) => (
                          <Chip
                            key={staff.id}
                            label={staff.name}
                            onDelete={() => handleStaffToggle(staff.id)}
                            avatar={
                              <Avatar sx={{
                                bgcolor: 'var(--clr-success)',
                                color: 'var(--clr-white)',
                                fontSize: '12px',
                                fontWeight: 600
                              }}>
                                {staff.initials}
                              </Avatar>
                            }
                            sx={{
                              backgroundColor: 'var(--clr-success-light)',
                              color: 'var(--clr-success-dark)',
                              '& .MuiChip-deleteIcon': {
                                color: 'var(--clr-success-dark)',
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {/* Available Staff List */}
                  {staffSearchTerm && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" sx={{
                        mb: 2,
                        color: 'var(--clr-text-secondary)',
                        fontSize: '14px'
                      }}>
                        Available Staff
                      </Typography>
                      <Box sx={{
                        maxHeight: 200,
                        overflow: 'auto',
                        border: '1px solid var(--clr-border-light)',
                        borderRadius: 1
                      }}>
                        {filteredStaff.map((staff) => (
                          <Box
                            key={staff.id}
                            onClick={() => handleStaffToggle(staff.id)}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 2,
                              p: 2,
                              cursor: 'pointer',
                              borderBottom: '1px solid var(--clr-border-light)',
                              backgroundColor: formData.assignedStaff.includes(staff.id)
                                ? 'var(--clr-success-light)'
                                : 'transparent',
                              '&:hover': {
                                backgroundColor: formData.assignedStaff.includes(staff.id)
                                  ? 'var(--clr-success-light)'
                                  : 'var(--clr-bg-light)',
                              },
                              '&:last-child': {
                                borderBottom: 'none',
                              },
                            }}
                          >
                            <Avatar sx={{
                              bgcolor: 'var(--clr-success)',
                              color: 'var(--clr-white)',
                              width: 32,
                              height: 32,
                              fontSize: '12px',
                              fontWeight: 600
                            }}>
                              {staff.initials}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="body2" sx={{
                                fontWeight: 500,
                                color: 'var(--clr-text-primary)'
                              }}>
                                {staff.name}
                              </Typography>
                              <Typography variant="caption" sx={{
                                color: 'var(--clr-text-secondary)'
                              }}>
                                {staff.phone}
                              </Typography>
                            </Box>
                            {formData.assignedStaff.includes(staff.id) && (
                              <Chip
                                label="Selected"
                                size="small"
                                sx={{
                                  backgroundColor: 'var(--clr-success)',
                                  color: 'var(--clr-white)',
                                  fontSize: '10px',
                                  height: '20px',
                                }}
                              />
                            )}
                          </Box>
                        ))}
                        {filteredStaff.length === 0 && (
                          <Box sx={{
                            p: 3,
                            textAlign: 'center',
                            color: 'var(--clr-text-secondary)'
                          }}>
                            <Typography variant="body2">
                              No staff found matching "{staffSearchTerm}"
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            </Box>
          )}

          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" sx={{ 
                mb: 3,
                fontWeight: 600,
                color: 'var(--clr-text-primary)'
              }}>
                Rates
              </Typography>

              {/* Pay Rates */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ 
                  mb: 1,
                  color: 'var(--clr-text-secondary)',
                  fontSize: '14px'
                }}>
                  Pay Rates
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={formData.payRate}
                    onChange={(e) => setFormData({...formData, payRate: e.target.value})}
                    displayEmpty
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--clr-border-light)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--clr-border-medium)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--clr-purple)',
                      },
                    }}
                  >
                    <MenuItem value="">Select one</MenuItem>
                    {payRates.map((rate) => (
                      <MenuItem key={rate} value={rate}>{rate}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Bill Rates */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ 
                  mb: 1,
                  color: 'var(--clr-text-secondary)',
                  fontSize: '14px'
                }}>
                  Bill Rates
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={formData.billRate}
                    onChange={(e) => setFormData({...formData, billRate: e.target.value})}
                    displayEmpty
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--clr-border-light)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--clr-border-medium)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--clr-purple)',
                      },
                    }}
                  >
                    <MenuItem value="">Select one</MenuItem>
                    {billRates.map((rate) => (
                      <MenuItem key={rate} value={rate}>{rate}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          )}
        </Box>

        {/* Footer Actions */}
        <Box sx={{
          display: 'flex',
          gap: 2,
          p: 3,
          borderTop: '1px solid var(--clr-border-light)',
          justifyContent: 'flex-start'
        }}>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!formData.siteName}
            sx={{
              backgroundColor: 'var(--clr-purple)',
              color: 'var(--clr-white)',
              px: 4,
              py: 1.5,
              textTransform: 'uppercase',
              fontWeight: 600,
              fontSize: '12px',
              '&:hover': {
                backgroundColor: 'var(--clr-purple-light)',
              },
              '&:disabled': {
                backgroundColor: 'var(--clr-text-light)',
              },
            }}
          >
            PUBLISH
          </Button>
          <Button
            variant="outlined"
            onClick={handleSave}
            disabled={!formData.siteName}
            sx={{
              color: 'var(--clr-purple)',
              borderColor: 'var(--clr-purple)',
              px: 4,
              py: 1.5,
              textTransform: 'uppercase',
              fontWeight: 600,
              fontSize: '12px',
              '&:hover': {
                borderColor: 'var(--clr-purple-light)',
                backgroundColor: 'var(--clr-bg-purple-light)',
              },
              '&:disabled': {
                color: 'var(--clr-text-light)',
                borderColor: 'var(--clr-text-light)',
              },
            }}
          >
            SAVE
          </Button>
          <Button
            onClick={handleClose}
            sx={{
              color: 'var(--clr-text-secondary)',
              px: 4,
              py: 1.5,
              textTransform: 'uppercase',
              fontWeight: 600,
              fontSize: '12px',
              '&:hover': {
                backgroundColor: 'var(--clr-border-lightest)',
              },
            }}
          >
            CANCEL
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default AddShiftDrawer;
