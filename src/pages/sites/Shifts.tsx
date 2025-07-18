import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import {
  CalendarMonth,
  MoreVert,
} from '@mui/icons-material';
import Calendar from '../staff/Calender';
import AddShiftDrawer from '../../components/shifts/AddShiftDrawer';
import { type Shift, type SiteMember, SiteData, formatTime, formatShiftDate } from '../../data/siteData';

interface ShiftsProps {
  selectedSite?: SiteMember | null;
  sites?: SiteMember[];
  onSitesUpdate?: (sites: SiteMember[]) => void;
}

const Shifts: React.FC<ShiftsProps> = ({ selectedSite, sites: propSites, onSitesUpdate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddShiftDrawer, setShowAddShiftDrawer] = useState(false);

  const sites = propSites || SiteData;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const formatSelectedDate = (date: Date) => {
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const currentSite = selectedSite
    ? sites.find(site => site.id === selectedSite.id) || selectedSite
    : sites[0];


    const getShiftsForDate = (date: Date, site: SiteMember | null): Shift[] => {
    if (!site || !site.shifts) return [];
    const dateString = date.toISOString().split('T')[0];
    return site.shifts.filter(shift => shift.date === dateString);
  };

  const shiftsForSelectedDate = getShiftsForDate(selectedDate, currentSite);



  const handleAddShift = () => {
    setShowAddShiftDrawer(true);
  };

  const handleSaveShift = (newShift: Shift) => {
    if (onSitesUpdate) {
      // Update parent state
      const updatedSites = sites.map(site =>
        site.id === newShift.siteId
          ? { ...site, shifts: [...site.shifts, newShift] }
          : site
      );
      onSitesUpdate(updatedSites);
    }
  };

  return (
    <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: 'var(--clr-text-primary)' }}>
        Shifts
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, flex: 1 }}>
        {/* Calendar Section */}
        <Box sx={{ flex: 1 }}>
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </Box>

        {/* Right Panel */}
        <Box sx={{
          width: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}>
          {/* Selected Date Display */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant="h6" sx={{
              fontWeight: 500,
              color: 'var(--clr-text-primary)'
            }}>
              {formatSelectedDate(selectedDate)}
            </Typography>

            <Button
              variant="outlined"
              onClick={handleAddShift}
              sx={{
                color: 'var(--clr-purple)',
                borderColor: 'var(--clr-purple)',
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                '&:hover': {
                  borderColor: 'var(--clr-purple)',
                  backgroundColor: 'var(--clr-bg-purple-light)',
                }
              }}
            >
              ADD NEW SHIFT
            </Button>
          </Box>



          {/* Shifts List */}
          {shiftsForSelectedDate.length > 0 ? (
            <Box sx={{ mt: 3 }}>
              {shiftsForSelectedDate.map((shift) => (
                <Card key={shift.id} sx={{
                  mb: 2,
                  border: '1px solid var(--clr-border-light)',
                  boxShadow: 'none'
                }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box sx={{ flex: 1 }}>

                        <Box sx={{ display: 'flex', gap: 6, mb: 1 }}>
                          <Box>
                            <Typography variant="body2" sx={{
                              color: 'var(--clr-text-secondary)',
                              fontSize: '12px'
                            }}>
                              Start time
                            </Typography>
                            <Typography variant="body2" sx={{
                              color: 'var(--clr-text-primary)',
                              fontWeight: 500
                            }}>
                              {formatTime(shift.startTime)}
                            </Typography>
                          </Box>

                          <Box>
                            <Typography variant="body2" sx={{
                              color: 'var(--clr-text-secondary)',
                              fontSize: '12px'
                            }}>
                              End time
                            </Typography>
                            <Typography variant="body2" sx={{
                              color: 'var(--clr-text-primary)',
                              fontWeight: 500
                            }}>
                              {formatTime(shift.endTime)}
                            </Typography>
                          </Box>

                          <Box>
                            <Typography variant="body2" sx={{
                              color: 'var(--clr-text-secondary)',
                              fontSize: '12px'
                            }}>
                              Required
                            </Typography>
                            <Typography variant="body2" sx={{
                              color: 'var(--clr-text-primary)',
                              fontWeight: 500
                            }}>
                              {shift.staffRequired}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Button
                        size="small"
                        sx={{ color: 'var(--clr-text-tertiary)', minWidth: 'auto', p: 0.5 }}
                      >
                        <MoreVert />
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 4
              }}>
                <CalendarMonth sx={{
                  fontSize: 60,
                  color: 'var(--clr-border-light)'
                }} />
              </Box>

              <Box sx={{
                textAlign: 'center',
                mt: 2
              }}>
                <Typography variant="h6" sx={{
                  color: 'var(--clr-text-secondary)',
                  fontWeight: 500
                }}>
                  No Shifts Found
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Box>

      {/* Add Shift Drawer */}
      <AddShiftDrawer
        open={showAddShiftDrawer}
        onClose={() => setShowAddShiftDrawer(false)}
        onSave={handleSaveShift}
        selectedDate={selectedDate}
        selectedSite={currentSite}
      />
    </Box>
  );
};

export default Shifts;
