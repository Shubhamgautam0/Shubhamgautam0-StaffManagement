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
import { type Shift, type SiteMember, shiftColors, payRates, billRates, calculateDuration, SiteData } from '../../data/siteData';
import { staffData, type StaffMember } from '../../data/staffData';

interface AddShiftDrawerProps {
  open: boolean;
  onClose: () => void;
  onSave: (shift: Shift) => void;
  selectedDate: Date;
  selectedSite?: SiteMember | null;
  preSelectedStaff?: string[]; // Array of staff IDs to pre-select
  viewMode?: 'site' | 'staff'; // Determines which section to show/hide
}

const AddShiftDrawer: React.FC<AddShiftDrawerProps> = ({
  open,
  onClose,
  onSave,
  selectedDate,
  selectedSite,
  preSelectedStaff = [],
  viewMode = 'site', // Default to site view
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [staffSearchTerm, setStaffSearchTerm] = useState('');
  const [siteSearchTerm, setSiteSearchTerm] = useState('');
  const [selectedSiteId, setSelectedSiteId] = useState<string>(selectedSite?.id || '');
  const [formData, setFormData] = useState({
    siteName: selectedSite?.name || '',
    date: selectedDate.toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '17:00',
    staffRequired: 1,
    color: shiftColors[0],
    payRate: '',
    billRate: '',
    assignedStaff: preSelectedStaff || [],
  });

  // Update form data when props change
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      siteName: selectedSite?.name || '',
      date: selectedDate.toISOString().split('T')[0],
      assignedStaff: preSelectedStaff || [],
    }));
  }, [selectedSite, selectedDate, preSelectedStaff]);

  // Filter available staff based on search term
  const filteredStaff = staffData.filter(staff =>
    staff.name.toLowerCase().includes(staffSearchTerm.toLowerCase()) &&
    staff.status === 'Active'
  );

  console.log('Filtered Staff:', filteredStaff);
  console.log('Staff Search Term:', staffSearchTerm);
  console.log('All Staff Data:', staffData);

  // Filter available sites based on search term
  const filteredSites = SiteData.filter(site =>
    site.name.toLowerCase().includes(siteSearchTerm.toLowerCase()) &&
    site.status === 'Mysite'
  );

  // Get selected site details
  const getSelectedSite = () => {
    return SiteData.find(site => site.id === selectedSiteId) || selectedSite;
  };

  // Get assigned staff details
  const getAssignedStaffDetails = () => {
    return formData.assignedStaff.map(staffId => {
      const staff = staffData.find(s => s.id === staffId);
      return staff;
    }).filter(Boolean) as StaffMember[];
  };

  // Handle staff selection
  const handleStaffToggle = (staffId: string) => {
    console.log('HandleStaffToggle - Staff ID:', staffId);
    console.log('HandleStaffToggle - Current assigned staff:', formData.assignedStaff);

    setFormData(prev => {
      const newAssignedStaff = prev.assignedStaff.includes(staffId)
        ? prev.assignedStaff.filter(id => id !== staffId)
        : [...prev.assignedStaff, staffId];

      console.log('HandleStaffToggle - New assigned staff:', newAssignedStaff);

      return {
        ...prev,
        assignedStaff: newAssignedStaff
      };
    });
  };

  // Handle site selection
  const handleSiteSelect = (site: SiteMember) => {
    setSelectedSiteId(site.id);
    setFormData(prev => ({
      ...prev,
      siteName: site.name
    }));
    setSiteSearchTerm(''); // Clear search after selection
  };

  // Update form data when selectedSite, selectedDate, or selectedSiteId changes
  useEffect(() => {
    const currentSite = getSelectedSite();
    setFormData(prev => ({
      ...prev,
      siteName: currentSite?.name || selectedSite?.name || '',
      date: selectedDate.toISOString().split('T')[0],
      assignedStaff: preSelectedStaff || [],
    }));
  }, [selectedSite, selectedDate, selectedSiteId, preSelectedStaff]);

  const handleSave = () => {
    const currentSite = getSelectedSite();
    console.log('HandleSave - Current site:', currentSite);
    console.log('HandleSave - Form data:', formData);
    console.log('HandleSave - Selected site ID:', selectedSiteId);

    if (formData.siteName && currentSite) {
      // Get staff details for assigned staff
      const assignedStaffDetails = getAssignedStaffDetails();

      const newShift: Shift = {
        id: `shift-${Date.now()}`,
        siteId: currentSite.id,
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
      console.log('HandleSave - New shift:', newShift);
      onSave(newShift);
      handleClose();
    } else {
      console.error('HandleSave - Missing site or site name:', {
        siteName: formData.siteName,
        currentSite,
        selectedSiteId
      });
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
                  {/* Site Selection - Only show in staff view mode */}
                  {viewMode === 'staff' && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" sx={{
                        mb: 1,
                        color: 'var(--clr-text-secondary)',
                        fontSize: '14px'
                      }}>
                        Site <span style={{ color: 'var(--clr-orange)' }}>*</span>
                      </Typography>
                      <TextField
                        fullWidth
                        placeholder="Search Site"
                        value={siteSearchTerm}
                        onChange={(e) => setSiteSearchTerm(e.target.value)}
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
                  )}

                  {/* Site Display for Site View Mode */}
                  {viewMode === 'site' && selectedSite && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" sx={{
                        mb: 1,
                        color: 'var(--clr-text-secondary)',
                        fontSize: '14px'
                      }}>
                        Site
                      </Typography>
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        border: '1px solid var(--clr-border-light)',
                        borderRadius: 1,
                        backgroundColor: 'var(--clr-info-light)'
                      }}>
                        <Avatar sx={{
                          bgcolor: 'var(--clr-info)',
                          color: 'var(--clr-white)',
                          width: 40,
                          height: 40,
                          fontSize: '16px',
                          fontWeight: 600
                        }}>
                          {selectedSite.initials || selectedSite.name.charAt(0)}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--clr-text-primary)' }}>
                            {selectedSite.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'var(--clr-text-secondary)' }}>
                            {selectedSite.address}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )}

                  {/* Selected Site Display - Only in staff view mode */}
                  {viewMode === 'staff' && getSelectedSite() && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, p: 2, border: '1px solid var(--clr-border-light)', borderRadius: 1, backgroundColor: 'var(--clr-success-light)' }}>
                      <Avatar sx={{
                        bgcolor: 'var(--clr-success)',
                        color: 'var(--clr-white)',
                        width: 40,
                        height: 40,
                        fontSize: '16px',
                        fontWeight: 600
                      }}>
                        {getSelectedSite()?.initials || getSelectedSite()?.name.charAt(0)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--clr-text-primary)' }}>
                          {getSelectedSite()?.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'var(--clr-text-secondary)' }}>
                          {getSelectedSite()?.address}
                        </Typography>
                      </Box>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          setSelectedSiteId('');
                          setFormData(prev => ({ ...prev, siteName: '' }));
                        }}
                        sx={{
                          minWidth: '60px',
                          height: '24px',
                          fontSize: '11px',
                          borderColor: 'var(--clr-error)',
                          color: 'var(--clr-error)',
                          '&:hover': {
                            backgroundColor: 'var(--clr-error)',
                            color: 'var(--clr-white)',
                          },
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                  )}

                  {/* Available Sites List - Only in staff view mode */}
                  {viewMode === 'staff' && siteSearchTerm && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" sx={{
                        mb: 2,
                        color: 'var(--clr-text-secondary)',
                        fontSize: '14px'
                      }}>
                        Available Sites {filteredSites.length > 0 && `(${filteredSites.length})`}
                      </Typography>
                      <Box sx={{
                        maxHeight: 200,
                        overflow: 'auto',
                        border: '1px solid var(--clr-border-light)',
                        borderRadius: 1,
                        backgroundColor: 'var(--clr-white)'
                      }}>
                        {filteredSites.length === 0 ? (
                          <Box sx={{ p: 3, textAlign: 'center' }}>
                            <Typography variant="body2" sx={{ color: 'var(--clr-text-secondary)' }}>
                              No sites found matching your search
                            </Typography>
                          </Box>
                        ) : (
                          filteredSites.map((site) => (
                            <Box
                              key={site.id}
                              onClick={() => handleSiteSelect(site)}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                p: 2,
                                cursor: 'pointer',
                                borderBottom: '1px solid var(--clr-border-light)',
                                backgroundColor: selectedSiteId === site.id
                                  ? 'var(--clr-success-light)'
                                  : 'transparent',
                                '&:hover': {
                                  backgroundColor: selectedSiteId === site.id
                                    ? 'var(--clr-success-light)'
                                    : 'var(--clr-bg-light)',
                                },
                                '&:last-child': {
                                  borderBottom: 'none',
                                },
                              }}
                            >
                              <Avatar sx={{
                                bgcolor: 'var(--clr-info)',
                                color: 'var(--clr-white)',
                                width: 36,
                                height: 36,
                                fontSize: '14px',
                                fontWeight: 600
                              }}>
                                {site.initials || site.name.charAt(0)}
                              </Avatar>
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="body2" sx={{
                                  fontWeight: 500,
                                  color: 'var(--clr-text-primary)',
                                  fontSize: '14px'
                                }}>
                                  {site.name}
                                </Typography>
                                <Typography variant="caption" sx={{
                                  color: 'var(--clr-text-secondary)',
                                  fontSize: '12px'
                                }}>
                                  {site.customerName} • {site.status}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {selectedSiteId === site.id ? (
                                  <Chip
                                    label="✓ Selected"
                                    size="small"
                                    sx={{
                                      backgroundColor: 'var(--clr-success)',
                                      color: 'var(--clr-white)',
                                      fontSize: '11px',
                                      height: '24px',
                                      fontWeight: 600,
                                    }}
                                  />
                                ) : (
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSiteSelect(site);
                                    }}
                                    sx={{
                                      minWidth: '60px',
                                      height: '24px',
                                      fontSize: '11px',
                                      borderColor: 'var(--clr-purple)',
                                      color: 'var(--clr-purple)',
                                      '&:hover': {
                                        backgroundColor: 'var(--clr-purple)',
                                        color: 'var(--clr-white)',
                                      },
                                    }}
                                  >
                                    Select
                                  </Button>
                                )}
                              </Box>
                            </Box>
                          ))
                        )}
                      </Box>
                    </Box>
                  )}

                  {/* Quick Add Buttons for Sites - Only in staff view mode */}
                  {viewMode === 'staff' && !siteSearchTerm && !getSelectedSite() && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="caption" sx={{
                        color: 'var(--clr-text-tertiary)',
                        fontSize: '12px',
                        mb: 1,
                        display: 'block'
                      }}>
                        Quick Select Sites:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {SiteData.filter(site => site.status === 'Mysite').slice(0, 4).map((site) => (
                          <Button
                            key={site.id}
                            variant="outlined"
                            size="small"
                            onClick={() => handleSiteSelect(site)}
                            startIcon={
                              <Avatar sx={{
                                bgcolor: 'var(--clr-info)',
                                color: 'var(--clr-white)',
                                width: 20,
                                height: 20,
                                fontSize: '10px',
                                fontWeight: 600
                              }}>
                                {site.initials || site.name.charAt(0)}
                              </Avatar>
                            }
                            sx={{
                              borderColor: 'var(--clr-border-light)',
                              color: 'var(--clr-text-primary)',
                              fontSize: '12px',
                              textTransform: 'none',
                              '&:hover': {
                                borderColor: 'var(--clr-info)',
                                backgroundColor: 'var(--clr-info-light)',
                              },
                            }}
                          >
                            {site.name.split(' ')[0]}
                          </Button>
                        ))}
                      </Box>
                    </Box>
                  )}

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

              {/* Scheduled Staff Section - Show in site view mode OR when no staff pre-selected in staff view */}
              {(() => {
                const shouldShow = (viewMode === 'site' || (viewMode === 'staff' && preSelectedStaff.length === 0));
                console.log('Staff Section - Should show:', shouldShow, 'ViewMode:', viewMode, 'PreSelectedStaff:', preSelectedStaff);
                return shouldShow;
              })() && (
                <Accordion
                  defaultExpanded={true}
                  sx={{ mb: 3, boxShadow: 'none', border: '1px solid var(--clr-border-light)' }}
                >
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
                              bgcolor: staff.color || 'var(--clr-success)',
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
              )}

              {/* Pre-selected Staff Display - Show in staff view mode when staff is pre-selected */}
              {viewMode === 'staff' && preSelectedStaff.length > 0 && (
                <Accordion sx={{ mb: 3, boxShadow: 'none', border: '1px solid var(--clr-border-light)' }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--clr-text-primary)' }}>
                      Assigned Staff
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" sx={{
                        mb: 2,
                        color: 'var(--clr-text-secondary)',
                        fontSize: '14px'
                      }}>
                        Pre-selected Staff ({formData.assignedStaff.length})
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {getAssignedStaffDetails().map((staff) => (
                          <Chip
                            key={staff.id}
                            label={staff.name}
                            onDelete={() => handleStaffToggle(staff.id)}
                            avatar={
                              <Avatar sx={{
                                bgcolor: staff.color || 'var(--clr-success)',
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

                    {/* Option to add more staff */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" sx={{
                        mb: 1,
                        color: 'var(--clr-text-secondary)',
                        fontSize: '14px'
                      }}>
                        Add More Staff
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

                    {/* Available Staff List for adding more - Always Show */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" sx={{
                        mb: 2,
                        color: 'var(--clr-text-secondary)',
                        fontSize: '14px'
                      }}>
                        Available Staff {filteredStaff.filter(staff => !formData.assignedStaff.includes(staff.id)).length > 0 && `(${filteredStaff.filter(staff => !formData.assignedStaff.includes(staff.id)).length})`}
                      </Typography>
                      <Box sx={{
                        maxHeight: staffSearchTerm ? 200 : 150,
                        overflow: 'auto',
                        border: '1px solid var(--clr-border-light)',
                        borderRadius: 1,
                        backgroundColor: 'var(--clr-white)'
                      }}>
                        {filteredStaff.filter(staff => !formData.assignedStaff.includes(staff.id)).length === 0 ? (
                          <Box sx={{ p: 3, textAlign: 'center' }}>
                            <Typography variant="body2" sx={{ color: 'var(--clr-text-secondary)' }}>
                              {staffSearchTerm ? 'No staff found matching your search' : 'All available staff have been added'}
                            </Typography>
                          </Box>
                        ) : (
                          filteredStaff.filter(staff => !formData.assignedStaff.includes(staff.id)).map((staff) => (
                            <Box
                              key={staff.id}
                              onClick={(e) => {
                                e.preventDefault();
                                console.log('Clicking staff in pre-selected section:', staff.id);
                                console.log('Current form data before toggle:', formData);
                                handleStaffToggle(staff.id);
                              }}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                p: 2,
                                cursor: 'pointer',
                                borderBottom: '1px solid var(--clr-border-light)',
                                '&:hover': {
                                  backgroundColor: 'var(--clr-bg-light)',
                                },
                                '&:last-child': {
                                  borderBottom: 'none',
                                },
                              }}
                            >
                              <Avatar sx={{
                                bgcolor: staff.color || 'var(--clr-purple)',
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
                                  color: 'var(--clr-text-primary)',
                                  fontSize: '14px'
                                }}>
                                  {staff.name}
                                </Typography>
                                <Typography variant="caption" sx={{
                                  color: 'var(--clr-text-secondary)',
                                  fontSize: '12px'
                                }}>
                                  {staff.phone} • {staff.status}
                                </Typography>
                              </Box>
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('Add button clicked for staff:', staff.id);
                                  handleStaffToggle(staff.id);
                                }}
                                sx={{
                                  minWidth: '60px',
                                  height: '24px',
                                  fontSize: '11px',
                                  borderColor: 'var(--clr-purple)',
                                  color: 'var(--clr-purple)',
                                  '&:hover': {
                                    backgroundColor: 'var(--clr-purple)',
                                    color: 'var(--clr-white)',
                                  },
                                }}
                              >
                                Add
                              </Button>
                            </Box>
                          ))
                        )}
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              )}
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
