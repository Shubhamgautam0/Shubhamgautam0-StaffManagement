import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  Card,
  CardContent,
  Chip,
  Avatar,
  Divider,
} from '@mui/material';
import { Close, Person, Schedule, Work, MoreHoriz } from '@mui/icons-material';
import { getAllRequests, getRequestsByStatus, type Request } from '../../data/requestData';

interface RequestDrawerProps {
  open: boolean;
  onClose: () => void;
}

const RequestDrawer: React.FC<RequestDrawerProps> = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [filterValue, setFilterValue] = useState('All');
  const [requests, setRequests] = useState<Request[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([]);

  useEffect(() => {
    if (open) {
      const allRequests = getAllRequests();
      setRequests(allRequests);
      filterRequests(allRequests, activeTab, filterValue);
    }
  }, [open, activeTab, filterValue]);

  const filterRequests = (allRequests: Request[], tabIndex: number, filter: string) => {
    let statusFiltered: Request[] = [];

    switch (tabIndex) {
      case 0: // Pending
        statusFiltered = getRequestsByStatus('pending');
        break;
      case 1: // Completed
        statusFiltered = getRequestsByStatus('completed');
        break;
      case 2: // Cancelled/Rejected
        statusFiltered = getRequestsByStatus('cancelled/rejected');
        break;
      default:
        statusFiltered = allRequests;
    }

    // Apply additional filters based on filterValue
    let finalFiltered = statusFiltered;
    if (filter !== 'All') {
      const today = new Date();
      const filterDate = new Date();

      switch (filter) {
        case 'Today':
          filterDate.setHours(0, 0, 0, 0);
          finalFiltered = statusFiltered.filter(req =>
            new Date(req.requestedDate) >= filterDate
          );
          break;
        case 'This Week':
          filterDate.setDate(today.getDate() - 7);
          finalFiltered = statusFiltered.filter(req =>
            new Date(req.requestedDate) >= filterDate
          );
          break;
        case 'This Month':
          filterDate.setMonth(today.getMonth() - 1);
          finalFiltered = statusFiltered.filter(req =>
            new Date(req.requestedDate) >= filterDate
          );
          break;
      }
    }

    setFilteredRequests(finalFiltered);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleFilterChange = (event: any) => {
    setFilterValue(event.target.value);
  };

  const handleClose = () => {
    setActiveTab(0);
    setFilterValue('All');
    setRequests([]);
    setFilteredRequests([]);
    onClose();
  };

  const getRequestIcon = (type: Request['type']) => {
    switch (type) {
      case 'leave':
        return <Schedule sx={{ fontSize: 20 }} />;
      case 'shift_change':
        return <Work sx={{ fontSize: 20 }} />;
      case 'overtime':
        return <MoreHoriz sx={{ fontSize: 20 }} />;
      default:
        return <Person sx={{ fontSize: 20 }} />;
    }
  };

  const getStatusColor = (status: Request['status']) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'completed':
        return 'success';
      case 'cancelled':
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: Request['priority']) => {
    switch (priority) {
      case 'high':
        return 'var(--clr-scarlet)';
      case 'medium':
        return 'var(--clr-pumpkin)';
      case 'low':
        return 'var(--clr-success)';
      default:
        return 'var(--clr-text-secondary)';
    }
  };

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
        flexDirection: 'column',
        backgroundColor: 'var(--clr-white)'
      }}>
        {/* Header */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 3,
          borderBottom: '1px solid var(--clr-border-light)'
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            color: 'var(--clr-text-primary)',
            fontSize: '20px'
          }}>
            Requests
          </Typography>
          <IconButton 
            onClick={handleClose} 
            sx={{ 
              color: 'var(--clr-text-tertiary)',
              '&:hover': {
                backgroundColor: 'var(--clr-bg-light)',
              }
            }}
          >
            <Close />
          </IconButton>
        </Box>

        {/* Tabs and Filter */}
        <Box sx={{ 
          borderBottom: '1px solid var(--clr-border-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 3,
          py: 1
        }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                color: 'var(--clr-text-secondary)',
                fontSize: '14px',
                minWidth: 'auto',
                px: 2,
              },
              '& .MuiTab-root.Mui-selected': {
                color: 'var(--clr-purple)',
                fontWeight: 600,
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'var(--clr-purple)',
                height: 3,
              },
            }}
          >
            <Tab label="Pending" />
            <Tab label="Completed" />
            <Tab label="Cancelled/Rejected" />
          </Tabs>

          <FormControl size="small" sx={{ minWidth: 80 }}>
            <Select
              value={filterValue}
              onChange={handleFilterChange}
              displayEmpty
              sx={{
                fontSize: '14px',
                '& .MuiSelect-select': {
                  py: 1,
                  color: 'var(--clr-text-secondary)',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Today">Today</MenuItem>
              <MenuItem value="This Week">This Week</MenuItem>
              <MenuItem value="This Month">This Month</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Content */}
        <Box sx={{
          flex: 1,
          overflow: 'auto',
          p: 3
        }}>
          {filteredRequests.length === 0 ? (
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              minHeight: '300px'
            }}>
              <Typography
                variant="h6"
                sx={{
                  color: 'var(--clr-text-secondary)',
                  fontWeight: 500,
                  fontSize: '18px'
                }}
              >
                No Requests Found
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {filteredRequests.map((request) => (
                <Card
                  key={request.id}
                  sx={{
                    border: '1px solid var(--clr-border-light)',
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Avatar sx={{
                        bgcolor: 'var(--clr-bg-light)',
                        color: 'var(--clr-text-secondary)',
                        width: 40,
                        height: 40
                      }}>
                        {getRequestIcon(request.type)}
                      </Avatar>

                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography variant="h6" sx={{
                            fontWeight: 600,
                            fontSize: '16px',
                            color: 'var(--clr-text-primary)'
                          }}>
                            {request.title}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Chip
                              label={request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              color={getStatusColor(request.status) as any}
                              size="small"
                              sx={{ fontSize: '12px' }}
                            />
                            <Box sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              backgroundColor: getPriorityColor(request.priority),
                              mt: 1
                            }} />
                          </Box>
                        </Box>

                        <Typography variant="body2" sx={{
                          color: 'var(--clr-text-secondary)',
                          mb: 2,
                          lineHeight: 1.5
                        }}>
                          {request.description}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="caption" sx={{
                              color: 'var(--clr-text-tertiary)',
                              fontSize: '12px'
                            }}>
                              Requested by
                            </Typography>
                            <Typography variant="body2" sx={{
                              color: 'var(--clr-text-primary)',
                              fontWeight: 500,
                              fontSize: '14px'
                            }}>
                              {request.requestedBy}
                            </Typography>
                          </Box>

                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="caption" sx={{
                              color: 'var(--clr-text-tertiary)',
                              fontSize: '12px'
                            }}>
                              {request.status === 'pending' ? 'Requested' : 'Responded'}
                            </Typography>
                            <Typography variant="body2" sx={{
                              color: 'var(--clr-text-primary)',
                              fontWeight: 500,
                              fontSize: '14px'
                            }}>
                              {new Date(request.status === 'pending' ? request.requestedDate : request.responseDate || request.requestedDate).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>

                        {request.responseMessage && (
                          <Box sx={{ mt: 2, p: 2, backgroundColor: 'var(--clr-bg-light)', borderRadius: 1 }}>
                            <Typography variant="caption" sx={{
                              color: 'var(--clr-text-tertiary)',
                              fontSize: '12px'
                            }}>
                              Response
                            </Typography>
                            <Typography variant="body2" sx={{
                              color: 'var(--clr-text-secondary)',
                              fontSize: '14px',
                              mt: 0.5
                            }}>
                              {request.responseMessage}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default RequestDrawer;
