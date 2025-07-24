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
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormGroup
} from '@mui/material';
import {
  Edit,
  Delete,
  Save,
  Cancel,
  Close
} from '@mui/icons-material';
import AddReportFieldDialog from '../../components/reports/AddReportFieldDialog';

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
  // State for managing custom field addition
  const [showAddField, setShowAddField] = useState(false);
  // State for field values
  const [fieldValues, setFieldValues] = useState<{[key: string]: any}>({});

  useEffect(() => {
    setEditedReport(report);
  }, [report]);

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

  const handleDeleteField = (fieldIndex: number) => {
    if (editedReport && editedReport.fields) {
      const updatedFields = editedReport.fields.filter((_, index) => index !== fieldIndex);
      setEditedReport({
        ...editedReport,
        fields: updatedFields
      });
    }
  };

  const handleAddNewField = (field: any) => {
    if (editedReport) {
      const updatedFields = [...(editedReport.fields || []), field];
      setEditedReport({
        ...editedReport,
        fields: updatedFields
      });
    }
    setShowAddField(false);
  };

  const handleFieldValueChange = (fieldId: string, value: any) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const renderField = (field: any, index: number) => {
    const fieldId = field.id || `field-${index}`;
    const currentValue = fieldValues[fieldId] || '';

    switch (field.type) {
      case 'Dropdown':
        return (
          <FormControl fullWidth disabled={!isEditing}>
            <InputLabel>{field.name}</InputLabel>
            <Select
              value={currentValue}
              onChange={(e) => handleFieldValueChange(fieldId, e.target.value)}
              label={field.name}
              required={field.required}
            >
              {field.options?.map((option: string, optionIndex: number) => (
                <MenuItem key={optionIndex} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case 'Radio':
        return (
          <FormControl component="fieldset" disabled={!isEditing}>
            <Typography variant="body2" sx={{ mb: 1, color: '#666', fontSize: '12px' }}>
              {field.name} {field.required && '*'}
            </Typography>
            <RadioGroup
              value={currentValue}
              onChange={(e) => handleFieldValueChange(fieldId, e.target.value)}
            >
              {field.options?.map((option: string, optionIndex: number) => (
                <FormControlLabel
                  key={optionIndex}
                  value={option}
                  control={<Radio size="small" />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );

      case 'Checkbox':
        return (
          <FormControl component="fieldset" disabled={!isEditing}>
            <Typography variant="body2" sx={{ mb: 1, color: '#666', fontSize: '12px' }}>
              {field.name} {field.required && '*'}
            </Typography>
            <FormGroup>
              {field.options?.map((option: string, optionIndex: number) => (
                <FormControlLabel
                  key={optionIndex}
                  control={
                    <Checkbox
                      size="small"
                      checked={Array.isArray(currentValue) ? currentValue.includes(option) : false}
                      onChange={(e) => {
                        const currentArray = Array.isArray(currentValue) ? currentValue : [];
                        if (e.target.checked) {
                          handleFieldValueChange(fieldId, [...currentArray, option]);
                        } else {
                          handleFieldValueChange(fieldId, currentArray.filter((item: string) => item !== option));
                        }
                      }}
                    />
                  }
                  label={option}
                />
              ))}
            </FormGroup>
          </FormControl>
        );

      default:
        return (
          <TextField
            fullWidth
            label={field.name}
            type={
              field.type === 'Number' ? 'number' :
              field.type === 'Date' ? 'date' :
              field.type === 'Time' ? 'time' :
              field.type === 'Email' ? 'email' :
              field.type === 'Phone' ? 'tel' :
              'text'
            }
            value={currentValue}
            onChange={(e) => handleFieldValueChange(fieldId, e.target.value)}
            disabled={!isEditing}
            variant="outlined"
            required={field.required}
            multiline={field.type === 'Textarea'}
            rows={field.type === 'Textarea' ? 3 : 1}
            slotProps={field.type === 'Date' || field.type === 'Time' ? { inputLabel: { shrink: true } } : undefined}
          />
        );
    }
  };

  return (
    <Paper className="report-detail-container">
      <Box className="report-detail-header">
        <Box className="report-detail-profile">
          <Box
            className="report-detail-circle"
            style={{ backgroundColor: report?.color || '#2196F3' }}
          >
          </Box>
          <Box className="report-detail-info">
            <Typography variant="h5" className="report-detail-name">
              {editedReport?.name || report?.name || 'New Report'}
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
          {/* Always show Report Name and Type - these are required */}
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

          {/* Custom Fields from Dialog */}
          {editedReport?.fields && editedReport.fields.length > 0 && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Custom Fields
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {editedReport.fields.map((field: any, index: number) => (
                  <Box key={index} sx={{ position: 'relative' }}>
                    {renderField(field, index)}
                    {isEditing && (
                      <IconButton
                        onClick={() => handleDeleteField(index)}
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          color: '#666',
                          width: 24,
                          height: 24,
                          '&:hover': {
                            backgroundColor: '#f5f5f5',
                            color: '#f44336'
                          }
                        }}
                        size="small"
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* ADD FIELD Button */}
          {isEditing && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="outlined"
                onClick={() => setShowAddField(true)}
                sx={{
                  borderColor: 'var(--clr-purple-light)',
                  color: 'var(--clr-purple)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  fontSize: '12px',
                  px: 3,
                  py: 1,
                }}
              >
                ADD FIELD
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* Add Field Dialog */}
      <AddReportFieldDialog
        open={showAddField}
        onClose={() => setShowAddField(false)}
        onSave={handleAddNewField}
      />
    </Paper>
  );
};

export default ReportDetails;
