import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Pagination,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  ArrowBack,
  Search,
  FilterList,
  Download,
  Close,
  TableChart,
} from '@mui/icons-material';
import { staffData, type StaffMember } from '../../data/staffData';
import { SiteData, type Shift } from '../../data/siteData';
import { getStaffShifts, type StaffShiftInfo } from '../../data/dataManager';

interface TimesheetEntry {
  id: string;
  siteName: string;
  payrollHrs: number;
  fullName: string;
  scheduledTime: string;
  scheduleStartDate: string;
  selected?: boolean;
}

interface StaffTimesheetTableProps {
  onClose: () => void;
}

function StaffTimesheetTable({ onClose }: StaffTimesheetTableProps) {
  const [timesheetEntries, setTimesheetEntries] = useState<TimesheetEntry[]>([]);
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [dateFilter, setDateFilter] = useState('Last 7 Days');
  const [groupBy, setGroupBy] = useState('Staff');

  // Generate timesheet data from staff and site data
  const generateTimesheetData = (): TimesheetEntry[] => {
    const entries: TimesheetEntry[] = [];
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Get all staff shifts for the last 7 days
    staffData.forEach(staff => {
      const staffShifts = getStaffShifts(staff.id, {
        start: sevenDaysAgo,
        end: today
      });

      staffShifts.forEach(shift => {
        const startTime = new Date(`2000-01-01T${shift.startTime}`);
        const endTime = new Date(`2000-01-01T${shift.endTime}`);

        // Handle overnight shifts
        if (endTime < startTime) {
          endTime.setDate(endTime.getDate() + 1);
        }

        const durationMs = endTime.getTime() - startTime.getTime();
        const durationHours = durationMs / (1000 * 60 * 60);

        entries.push({
          id: `${shift.shiftId}-${shift.staffId}`,
          siteName: shift.siteName,
          payrollHrs: Math.round(durationHours * 10) / 10, // Round to 1 decimal
          fullName: shift.staffName,
          scheduledTime: `${shift.startTime} - ${shift.endTime}`,
          scheduleStartDate: shift.date
        });
      });
    });

    return entries.sort((a, b) => new Date(b.scheduleStartDate).getTime() - new Date(a.scheduleStartDate).getTime());
  };

  // Load timesheet data
  useEffect(() => {
    const data = generateTimesheetData();
    setTimesheetEntries(data);
  }, []);

  // Filter data based on search and date
  const filteredEntries = timesheetEntries.filter(entry => {
    const matchesSearch =
      entry.siteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.fullName.toLowerCase().includes(searchTerm.toLowerCase());

    // Date filtering for last 7 days (already handled in generateTimesheetData)
    return matchesSearch;
  });

  // Group data if needed
  const groupedEntries = groupBy === 'Staff'
    ? filteredEntries.sort((a, b) => a.fullName.localeCompare(b.fullName))
    : groupBy === 'Site'
    ? filteredEntries.sort((a, b) => a.siteName.localeCompare(b.siteName))
    : filteredEntries.sort((a, b) => new Date(b.scheduleStartDate).getTime() - new Date(a.scheduleStartDate).getTime());

  // Pagination
  const totalPages = Math.ceil(groupedEntries.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedEntries = groupedEntries.slice(startIndex, startIndex + rowsPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEntries(paginatedEntries.map(entry => entry.id));
    } else {
      setSelectedEntries([]);
    }
  };

  const handleSelectEntry = (entryId: string, checked: boolean) => {
    if (checked) {
      setSelectedEntries(prev => [...prev, entryId]);
    } else {
      setSelectedEntries(prev => prev.filter(id => id !== entryId));
    }
  };

  const isAllSelected = paginatedEntries.length > 0 && 
    paginatedEntries.every(entry => selectedEntries.includes(entry.id));

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const getDateRangeDisplay = () => {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const formatDisplayDate = (date: Date) => {
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    };

    return `Last 7 Days: ${formatDisplayDate(sevenDaysAgo)} - ${formatDisplayDate(today)}`;
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          height: '90vh',
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        borderBottom: '1px solid #f0f0f0',
        pb: 2
      }}>
        <IconButton onClick={onClose} size="small">
          <ArrowBack />
        </IconButton>
        <Typography variant="body2" sx={{ color: 'var(--clr-text-secondary)' }}>
          Back
        </Typography>
        <Typography variant="body1" sx={{ color: 'var(--clr-text-secondary)' }}>
          Work Week: Tue - Mon
        </Typography>
        <Chip 
          label="Download History" 
          variant="outlined" 
          size="small"
          icon={<Download />}
          sx={{ ml: 'auto' }}
        />
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {/* Header Controls */}
        <Box sx={{ 
          p: 3, 
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap'
        }}>
          <Select
            value="Staff Timesheet"
            size="small"
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="Staff Timesheet">Staff Timesheet</MenuItem>
          </Select>

          <TextField
            placeholder="Search Staff"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 200 }}
          />

          <Select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
            size="small"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="Staff">Group by: Staff</MenuItem>
            <MenuItem value="Site">Group by: Site</MenuItem>
            <MenuItem value="Date">Group by: Date</MenuItem>
          </Select>

          <Button
            variant="outlined"
            size="small"
            startIcon={<FilterList />}
            sx={{ ml: 'auto' }}
          >
            Filter Bill Rates
          </Button>

          <Button
            variant="outlined"
            size="small"
            startIcon={<FilterList />}
          >
            Filter Pay Rates
          </Button>

          <Button
            variant="outlined"
            size="small"
            startIcon={<FilterList />}
          >
            Filter Staff
          </Button>

          <Chip
            label={getDateRangeDisplay()}
            variant="outlined"
            size="small"
          />

          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: '#6366F1',
              '&:hover': {
                backgroundColor: '#5856EB'
              }
            }}
          >
            Table Action
          </Button>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isAllSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    indeterminate={
                      selectedEntries.length > 0 && 
                      selectedEntries.length < paginatedEntries.length
                    }
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    SITE NAME
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    PAYROLL HRS
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    FULL NAME
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    SCHEDULED TIME
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    SCHEDULE START DATE
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedEntries.map((entry) => (
                <TableRow 
                  key={entry.id}
                  hover
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: '#f8f9fa' 
                    }
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedEntries.includes(entry.id)}
                      onChange={(e) => handleSelectEntry(entry.id, e.target.checked)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {entry.siteName}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">
                      {entry.payrollHrs}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {entry.fullName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {entry.scheduledTime}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(entry.scheduleStartDate)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{
          p: 2,
          borderTop: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="body2" sx={{ color: 'var(--clr-text-secondary)' }}>
            {groupedEntries.length} per page
          </Typography>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
            size="small"
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default StaffTimesheetTable;
