import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Chip,
} from '@mui/material';
import { Close, Check } from '@mui/icons-material';
import type { CustomReport } from '../../data/reportsData';
import AddNewReportDialog from './AddNewReportDialog';

interface CustomReportsDrawerProps {
  open: boolean;
  onClose: () => void;
  reports: CustomReport[];
  onReportsUpdate: (reports: CustomReport[]) => void;
}

const CustomReportsDrawer: React.FC<CustomReportsDrawerProps> = ({
  open,
  onClose,
  reports,
  onReportsUpdate,
}) => {
  const [searchText, setSearchText] = useState('');
  const [showAddNewReport, setShowAddNewReport] = useState(false);
  const [filteredReports, setFilteredReports] = useState(reports);

  React.useEffect(() => {
    if (searchText.trim()) {
      const filtered = reports.filter(report =>
        report.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredReports(filtered);
    } else {
      setFilteredReports(reports);
    }
  }, [searchText, reports]);

  const handleReportToggle = (reportId: string) => {
    const updatedReports = reports.map(report =>
      report.id === reportId ? { ...report, selected: !report.selected } : report
    );
    onReportsUpdate(updatedReports);
  };

  const handleSave = () => {
    onClose();
  };

  const handleCreateCustomReport = () => {
    setShowAddNewReport(true);
  };

  const handleAddNewReport = (newReport: CustomReport) => {
    const updatedReports = [...reports, newReport];
    onReportsUpdate(updatedReports);
    setShowAddNewReport(false);
  };

  const showCreateOption = searchText.trim() && 
    !reports.some(report => report.name.toLowerCase() === searchText.toLowerCase());

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: 480,
            maxWidth: '90vw',
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
            borderBottom: '1px solid #e0e0e0'
          }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                Custom Reports
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
                Add Report
              </Typography>
            </Box>
            <IconButton onClick={onClose} sx={{ color: '#999' }}>
              <Close />
            </IconButton>
          </Box>

          {/* Content */}
          <Box sx={{
            flex: 1,
            p: 3,
            overflow: 'auto'
          }}>
            {/* Search Field */}
            <TextField
              fullWidth
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search / Create New Report..."
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'var(--clr-bg-white)',
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

            {/* Reports List */}
            <List sx={{ maxHeight: '400px', overflow: 'auto' }}>
              {filteredReports.map((report) => (
                <ListItem
                  key={report.id}
                  sx={{
                    px: 0,
                    py: 1,
                    borderBottom: '1px solid var(--clr-border-lightest)',
                    '&:last-child': {
                      borderBottom: 'none',
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: report.color,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={report.name}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '14px',
                        color: 'var(--clr-text-secondary)',
                      }
                    }}
                  />
                  {report.selected && (
                    <Check sx={{ color: 'var(--clr-purple)', fontSize: 20 }} />
                  )}
                  <Checkbox
                    checked={report.selected}
                    onChange={() => handleReportToggle(report.id)}
                    sx={{
                      color: 'var(--clr-text-light)',
                      '&.Mui-checked': {
                        color: 'var(--clr-purple)',
                      },
                      ml: 1,
                    }}
                  />
                </ListItem>
              ))}
            </List>

            {/* Create Custom Report Option */}
            {showCreateOption && (
              <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid var(--clr-border-lighter)' }}>
                <Button
                  onClick={handleCreateCustomReport}
                  sx={{
                    color: 'var(--clr-purple)',
                    textTransform: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    p: 0,
                    '&:hover': {
                      backgroundColor: 'var(--clr-bg-transparent)',
                      textDecoration: 'underline',
                    }
                  }}
                >
                  + Create Custom Report
                </Button>
                <Typography variant="body2" sx={{ color: 'var(--clr-text-tertiary)', mt: 0.5 }}>
                  {searchText}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Footer Actions */}
          <Box sx={{
            display: 'flex',
            gap: 2,
            p: 3,
            borderTop: '1px solid #e0e0e0',
            justifyContent: 'flex-start'
          }}>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                backgroundColor: 'var(--clr-purple)',
                color: 'white',
                px: 4,
                py: 1.5,
                textTransform: 'uppercase',
                fontWeight: 600,
                fontSize: '12px',
                '&:hover': {
                  backgroundColor: '#7c4dff',
                },
              }}
            >
              SAVE
            </Button>
            <Button
              onClick={onClose}
              sx={{
                color: '#666',
                px: 4,
                py: 1.5,
                textTransform: 'uppercase',
                fontWeight: 600,
                fontSize: '12px',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              CANCEL
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Add New Report Dialog */}
      <AddNewReportDialog
        open={showAddNewReport}
        onClose={() => setShowAddNewReport(false)}
        onSave={handleAddNewReport}
        reportName={searchText}
      />
    </>
  );
};

export default CustomReportsDrawer;
