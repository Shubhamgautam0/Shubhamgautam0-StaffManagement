import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Edit,
  Delete,
  Save,
  Cancel
} from '@mui/icons-material';

interface CustomReport {
  id: string;
  name: string;
  type: 'office' | 'incident' | 'daily-activity';
  description: string;
  siteId: string;
  siteName: string;
  date: string;
  startTime: string;
  endTime: string;
  dutyStatus: 'Duty Started' | 'Duty Not Started' | 'Duty Completed';
  staffName: string;
  staffInitials: string;
  reportStatus: 'All' | 'Not Sent' | 'Approved';
  timeDuration: string;
  status: 'active' | 'draft' | 'archived';
  color: string;
  // New fields from dialog
  priority?: string;
  assignToAllSites?: boolean;
  fields?: any[];
  createdDate?: string;
}

interface ReportDetailsProps {
  report: CustomReport | null;
  onReportUpdate: (updatedReport: CustomReport) => void;
}

const ReportDetails: React.FC<ReportDetailsProps> = ({
  report,
  onReportUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedReport, setEditedReport] = useState<CustomReport | null>(null);

  useEffect(() => {
    setEditedReport(report);
  }, [report]);

  if (!report) {
    return (
      <Paper className="report-detail-container">
        <Box className="report-detail-empty">
          <Typography variant="h6" color="textSecondary">
            Select a report to view details
          </Typography>
        </Box>
      </Paper>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedReport && onReportUpdate) {
      onReportUpdate(editedReport);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedReport(report);
    setIsEditing(false);
  };

  const handleFieldChange = (field: keyof CustomReport, value: any) => {
    if (editedReport) {
      setEditedReport({
        ...editedReport,
        [field]: value
      });
    }
  };

  return (
    <Paper className="report-detail-container">
      <Box className="report-detail-header">
        <Box className="report-detail-profile">
          <Box
            className="report-detail-circle"
            style={{ backgroundColor: report.color }}
          >
          </Box>
          <Box className="report-detail-info">
            <Typography variant="h5" className="report-detail-name">
              {editedReport?.name || report.name}
            </Typography>
          </Box>
        </Box>

        <Box className="report-detail-actions">
          {isEditing ? (
            <>
              <IconButton className="report-action-button" onClick={handleSave}>
                <Save />
              </IconButton>
              <IconButton className="report-action-button" onClick={handleCancel}>
                <Cancel />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton className="report-action-button" onClick={handleEdit}>
                <Edit />
              </IconButton>
              <IconButton className="report-action-button">
                <Delete />
              </IconButton>
            </>
          )}
        </Box>
      </Box>

      <Box className="report-detail-content">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Row 1: Report Name and Type */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              label="Report Name"
              value={editedReport?.name || ''}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              disabled={!isEditing}
              variant="outlined"
              sx={{ flex: 1, minWidth: '200px' }}
            />
            <FormControl disabled={!isEditing} sx={{ flex: 1, minWidth: '200px' }}>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={editedReport?.type || ''}
                onChange={(e) => handleFieldChange('type', e.target.value)}
                label="Report Type"
              >
                <MenuItem value="office">Office</MenuItem>
                <MenuItem value="incident">Incident</MenuItem>
                <MenuItem value="daily-activity">Daily Activity</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Row 2: Priority and Site Name */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {editedReport?.priority && (
              <FormControl disabled={!isEditing} sx={{ flex: 1, minWidth: '200px' }}>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={editedReport?.priority || ''}
                  onChange={(e) => handleFieldChange('priority', e.target.value)}
                  label="Priority"
                >
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            )}
            <TextField
              label="Site Name"
              value={editedReport?.siteName || ''}
              onChange={(e) => handleFieldChange('siteName', e.target.value)}
              disabled={!isEditing}
              variant="outlined"
              sx={{ flex: 1, minWidth: '200px' }}
            />
          </Box>

          {/* Row 3: Date and Times */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              label="Date"
              type="date"
              value={editedReport?.date || ''}
              onChange={(e) => handleFieldChange('date', e.target.value)}
              disabled={!isEditing}
              variant="outlined"
              sx={{ flex: 1, minWidth: '150px' }}
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              label="Start Time"
              type="time"
              value={editedReport?.startTime || ''}
              onChange={(e) => handleFieldChange('startTime', e.target.value)}
              disabled={!isEditing}
              variant="outlined"
              sx={{ flex: 1, minWidth: '150px' }}
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              label="End Time"
              type="time"
              value={editedReport?.endTime || ''}
              onChange={(e) => handleFieldChange('endTime', e.target.value)}
              disabled={!isEditing}
              variant="outlined"
              sx={{ flex: 1, minWidth: '150px' }}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Box>

          {/* Row 4: Staff and Status */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              label="Staff Name"
              value={editedReport?.staffName || ''}
              onChange={(e) => handleFieldChange('staffName', e.target.value)}
              disabled={!isEditing}
              variant="outlined"
              sx={{ flex: 1, minWidth: '200px' }}
            />
            <FormControl disabled={!isEditing} sx={{ flex: 1, minWidth: '200px' }}>
              <InputLabel>Duty Status</InputLabel>
              <Select
                value={editedReport?.dutyStatus || ''}
                onChange={(e) => handleFieldChange('dutyStatus', e.target.value)}
                label="Duty Status"
              >
                <MenuItem value="Duty Started">Duty Started</MenuItem>
                <MenuItem value="Duty Not Started">Duty Not Started</MenuItem>
                <MenuItem value="Duty Completed">Duty Completed</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Row 5: Report Status */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <FormControl disabled={!isEditing} sx={{ flex: 1, minWidth: '200px' }}>
              <InputLabel>Report Status</InputLabel>
              <Select
                value={editedReport?.reportStatus || ''}
                onChange={(e) => handleFieldChange('reportStatus', e.target.value)}
                label="Report Status"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Not Sent">Not Sent</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Description */}
          <TextField
            fullWidth
            label="Description"
            value={editedReport?.description || ''}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            disabled={!isEditing}
            variant="outlined"
            multiline
            rows={4}
            placeholder="Enter report description..."
          />

          {/* Custom Fields */}
          {editedReport?.fields && editedReport.fields.length > 0 && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Custom Fields
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {editedReport.fields.map((field: any, index: number) => (
                  <TextField
                    key={index}
                    fullWidth
                    label={field.name}
                    type={field.type === 'Number' ? 'number' : field.type === 'Date' ? 'date' : 'text'}
                    disabled={!isEditing}
                    variant="outlined"
                    required={field.required}
                    multiline={field.type === 'Textarea'}
                    rows={field.type === 'Textarea' ? 3 : 1}
                    slotProps={field.type === 'Date' ? { inputLabel: { shrink: true } } : undefined}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default ReportDetails;
