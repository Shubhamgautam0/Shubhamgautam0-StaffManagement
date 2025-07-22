import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Chip,
  Avatar,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import {
  MoreVert,
} from '@mui/icons-material';
import { type Report, type SiteMember } from '../../data/siteData';

interface ReportProps {
  selectedSite?: SiteMember | null;
}

const ReportComponent: React.FC<ReportProps> = ({ selectedSite }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [downloadOption, setDownloadOption] = useState('Download');
  const [timeRange, setTimeRange] = useState('Last Week');
  const [reportingEmails, setReportingEmails] = useState('');
  const [searchResults, setSearchResults] = useState<Report[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [autoApprove, setAutoApprove] = useState(false);

 const handleSearch = () => {
  if (!selectedSite || !startDate || !endDate) return;

  // Filter reports based on date range
  const filteredReports = selectedSite.reports?.filter(report => {
    const reportDate = new Date(report.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return reportDate >= start && reportDate <= end;
  }) || [];

  setSearchResults(filteredReports);
  setShowResults(true);
};

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedReports(searchResults.map(report => report.id));
    } else {
      setSelectedReports([]);
    }
  };

  const handleSelectReport = (reportId: string, checked: boolean) => {
    if (checked) {
      setSelectedReports([...selectedReports, reportId]);
    } else {
      setSelectedReports(selectedReports.filter(id => id !== reportId));
    }
  };

  const getFilteredResults = () => {
    switch (selectedTab) {
      case 0: return searchResults; // All
      case 1: return searchResults.filter(r => r.reportStatus === 'Not Sent');
      case 2: return searchResults.filter(r => r.reportStatus === 'Approved');
      default: return searchResults;
    }
  };

  const filteredResults = getFilteredResults();

  return (
    <Box sx={{ p: 4, height: '100%' }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4
      }}>
        <Typography variant="h4" sx={{
          fontWeight: 600,
          color: '#333',
          fontSize: '28px'
        }}>
          Reports
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Select
            value={downloadOption}
            onChange={(e) => setDownloadOption(e.target.value)}
            className='item-selector'
          >
            <MenuItem value="Download">Download</MenuItem>
            <MenuItem value="PDF">PDF</MenuItem>
            <MenuItem value="Excel">Excel</MenuItem>
            <MenuItem value="CSV">CSV</MenuItem>
          </Select>

          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className='item-selector'
          >
            <MenuItem value="Last Week">Last Week</MenuItem>
            <MenuItem value="Last Month">Last Month</MenuItem>
            <MenuItem value="Last 3 Months">Last 3 Months</MenuItem>
            <MenuItem value="Custom Range">Custom Range</MenuItem>
          </Select>
        </Box>
      </Box>

      {/* Date Range Section */}
      <Box sx={{
        display: 'flex',
        gap: 3,
        alignItems: 'flex-end',
        mb: 4
      }}>
        {/* Start Date */}
        <Box sx={{ flex: 1, maxWidth: 300 }}>
          <Typography variant="body2" className='form-field-label' >
            Start Date
          </Typography>
          <TextField
            fullWidth
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Select start date"
            type='date'
            className='input-field'
          />
        </Box>

        {/* End Date */}
        <Box sx={{ flex: 1, maxWidth: 300 }}>
          <Typography variant="body2" className='form-field-label' >
            End Date
          </Typography>
          <TextField
            fullWidth
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="Select end date"
            type='date'
            className='input-field'
          />
        </Box>

        {/* Search Button */}
        <Button
          variant="contained"
          className='btn-primary'
          sx={{ height: '50px', }}
          onClick={handleSearch}
        >
          SEARCH
        </Button>
      </Box>

      <Box sx={{ maxWidth: 600 }}>
        <Typography variant="body2" className='form-field-label' >
          Reporting Emails
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={1}
          value={reportingEmails}
          onChange={(e) => setReportingEmails(e.target.value)}
          placeholder="Add New Email and Press enter...."
          className='input-field'
        />
      </Box>

      {/* Search Results */}
      {showResults && searchResults.length > 0 && (
        <Box sx={{ mt: 4 }}>
          {/* Tabs and Auto Approve */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 500,
                  color: 'var(--clr-text-secondary)',
                  minWidth: 'auto',
                  px: 2,
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
              <Tab label="All" />
              <Tab label="Not Sent" />
              <Tab label="Approved" />
            </Tabs>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Checkbox
                checked={autoApprove}
                onChange={(e) => setAutoApprove(e.target.checked)}
                sx={{
                  color: 'var(--clr-text-secondary)',
                  '&.Mui-checked': {
                    color: 'var(--clr-purple)',
                  },
                }}
              />
              <Typography variant="body2" sx={{ color: 'var(--clr-text-secondary)' }}>
                Auto Approve
              </Typography>
            </Box>
          </Box>

          {/* Reports Count */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}>
            <Typography variant="h6" sx={{
              color: 'var(--clr-orange)',
              fontWeight: 600
            }}>
              All
            </Typography>
            <Typography variant="body2" sx={{
              color: 'var(--clr-text-secondary)'
            }}>
              {filteredResults.length} Reports
            </Typography>
          </Box>

          {/* Table */}
          <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid var(--clr-border-light)' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'var(--clr-bg-lightest)' }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedReports.length === filteredResults.length && filteredResults.length > 0}
                      indeterminate={selectedReports.length > 0 && selectedReports.length < filteredResults.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      sx={{
                        color: 'var(--clr-text-secondary)',
                        '&.Mui-checked': {
                          color: 'var(--clr-purple)',
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{
                      fontWeight: 600,
                      color: 'var(--clr-text-secondary)',
                      fontSize: '12px'
                    }}>
                      SELECT ALL
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{
                      fontWeight: 600,
                      color: 'var(--clr-text-secondary)',
                      fontSize: '12px'
                    }}>
                      DATE
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{
                      fontWeight: 600,
                      color: 'var(--clr-text-secondary)',
                      fontSize: '12px'
                    }}>
                      TIME DURATION
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{
                      fontWeight: 600,
                      color: 'var(--clr-text-secondary)',
                      fontSize: '12px'
                    }}>
                      START DUTY STATUS
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{
                      fontWeight: 600,
                      color: 'var(--clr-text-secondary)',
                      fontSize: '12px'
                    }}>
                      STAFF
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredResults.map((report) => (
                  <TableRow key={report.id} sx={{ '&:hover': { backgroundColor: 'var(--clr-bg-lightest)' } }}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedReports.includes(report.id)}
                        onChange={(e) => handleSelectReport(report.id, e.target.checked)}
                        sx={{
                          color: 'var(--clr-text-secondary)',
                          '&.Mui-checked': {
                            color: 'var(--clr-purple)',
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{
                        color: 'var(--clr-text-primary)',
                        fontWeight: 500
                      }}>
                        {new Date(report.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{
                        color: 'var(--clr-text-primary)',
                        fontWeight: 500
                      }}>
                        {report.timeDuration}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={report.dutyStatus}
                        size="small"
                        sx={{
                          backgroundColor: report.dutyStatus === 'Duty Started'
                            ? 'var(--clr-success-light)'
                            : 'var(--clr-error-light)',
                          color: report.dutyStatus === 'Duty Started'
                            ? 'var(--clr-success)'
                            : 'var(--clr-error)',
                          fontSize: '11px',
                          fontWeight: 500,
                          height: '24px',
                          borderRadius: '12px'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            backgroundColor: 'var(--clr-success)',
                            color: 'var(--clr-white)',
                            fontSize: '12px',
                            fontWeight: 600
                          }}
                        >
                          {report.staffInitials}
                        </Avatar>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" sx={{ color: 'var(--clr-text-tertiary)' }}>
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* No Results Message */}
      {showResults && searchResults.length === 0 && (
        <Box sx={{
          mt: 4,
          textAlign: 'center',
          py: 4,
          border: '1px solid var(--clr-border-light)',
          borderRadius: 1,
          backgroundColor: 'var(--clr-bg-lightest)'
        }}>
          <Typography variant="h6" sx={{
            color: 'var(--clr-text-secondary)',
            fontWeight: 500
          }}>
            No Reports Found
          </Typography>
          <Typography variant="body2" sx={{
            color: 'var(--clr-text-tertiary)',
            mt: 1
          }}>
            No reports found for the selected date range.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ReportComponent;
