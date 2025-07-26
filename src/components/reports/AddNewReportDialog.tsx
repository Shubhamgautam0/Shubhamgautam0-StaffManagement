import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { Close, DragIndicator, Cancel } from '@mui/icons-material';
import {  priorityColors } from '../../data/reportsData';
import type { CustomReport, ReportField } from '../../data/reportsData';
import AddReportFieldDialog from './AddReportFieldDialog';

interface AddNewReportDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (report: CustomReport) => void;
  reportName: string;
}

const AddNewReportDialog: React.FC<AddNewReportDialogProps> = ({
  open,
  onClose,
  onSave,
  reportName,
}) => {
  const [formData, setFormData] = useState({
    name: reportName,
    assignToAllSites: false,
    priority: 'low',
  });
  const [fields, setFields] = useState<ReportField[]>([]);
  const [showAddField, setShowAddField] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);

  React.useEffect(() => {
    setFormData(prev => ({ ...prev, name: reportName }));
  }, [reportName]);

  const handleSave = () => {
    if (formData.name.trim()) {
      const newReport: CustomReport = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        color: priorityColors[formData.priority as keyof typeof priorityColors],
        selected: false,
        fields,
      };
      onSave(newReport);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      assignToAllSites: false,
      priority: 'low',
    });
    setFields([]);
    onClose();
  };

  const handleAddField = (field: ReportField) => {
    setFields([...fields, field]);
    setShowAddField(false);
  };

  const handleRemoveField = (fieldId: string) => {
    setFields(fields.filter(field => field.id !== fieldId));
  };

  const getPriorityColor = (priority: string) => {
    return priorityColors[priority as keyof typeof priorityColors] || 'var(--clr-success)';
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 600,
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
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
              Add New Report
            </Typography>
            <IconButton onClick={handleClose} sx={{ color: '#999' }}>
              <Close />
            </IconButton>
          </Box>

          {/* Content */}
          <Box sx={{
            flex: 1,
            p: 3,
            overflow: 'auto'
          }}>
          {/* Assign to all sites */}
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.assignToAllSites}
                onChange={(e) => setFormData({...formData, assignToAllSites: e.target.checked})}
                sx={{
                  color: '#ccc',
                  '&.Mui-checked': {
                    color: 'var(--clr-purple-light)',
                  },
                }}
              />
            }
            label={
              <Typography sx={{ fontSize: '14px', color: '#999' }}>
                Assign to all sites
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {/* Priority and Report Name */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'flex-end' }}>
            <Box sx={{ minWidth: 120 }}>
              <Typography variant="body2" sx={{
                mb: 1,
                color: 'var(--clr-text-secondary)',
                fontSize: '12px'
              }}>
                Priority <span style={{ color: 'var(--clr-orange)' }}>*</span>
              </Typography>
              <Box sx={{ position: 'relative' }}>
                <Box
                  onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: getPriorityColor(formData.priority),
                    cursor: 'pointer',
                    border: '2px solid var(--clr-white)',
                    boxShadow: '0 2px 4px var(--clr-bg-shadow)',
                  }}
                />
                {showPriorityDropdown && (
                  <Box sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    mt: 1,
                    p: 1,
                    backgroundColor: 'var(--clr-bg-white)',
                    border: '1px solid var(--clr-border-light)',
                    borderRadius: 1,
                    boxShadow: '0 4px 8px var(--clr-bg-shadow)',
                    zIndex: 1000,
                    display: 'flex',
                    gap: 1,
                  }}>
                    {Object.entries(priorityColors).map(([priority, color]) => (
                      <Box
                        key={priority}
                        onClick={() => {
                          setFormData({...formData, priority});
                          setShowPriorityDropdown(false);
                        }}
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          backgroundColor: color,
                          cursor: 'pointer',
                          border: formData.priority === priority ? '2px solid var(--clr-text-primary)' : '1px solid var(--clr-border-dark)',
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{
                mb: 1,
                color: 'var(--clr-text-secondary)',
                fontSize: '12px'
              }}>
                Report Name
              </Typography>
              <TextField
                fullWidth
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Report Name"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#c0c0c0',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--clr-purple-light)',
                    },
                  },
                }}
              />
            </Box>

            <Button
              variant="outlined"
              onClick={() => setShowAddField(true)}
              sx={{
                color: 'var(--clr-purple)',
                borderColor: 'var(--clr-purple-light)',
                textTransform: 'uppercase',
                fontSize: '12px',
                fontWeight: 600,
                px: 3,
                py: 1.5,
                // '&:hover': {
                //   borderColor: 'var(--clr-purple)',
                //   backgroundColor: 'rgba(142, 110, 200, 0.04)',
                // },
              }}
            >
              ADD FIELD
            </Button>
          </Box>

          {/* Fields List */}
          {fields.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" sx={{ 
                mb: 2,
                color: '#666',
                fontSize: '12px',
                fontWeight: 500
              }}>
                Fields
              </Typography>
              {fields.map((field) => (
                <Box
                  key={field.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    mb: 1,
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    backgroundColor: '#fafafa',
                  }}
                >
                  <DragIndicator sx={{ color: '#999', cursor: 'grab' }} />
                  <Typography sx={{ flex: 1, fontSize: '14px', color: '#666' }}>
                    {field.name}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveField(field.id)}
                    sx={{ color: '#999' }}
                  >
                    <Cancel />
                  </IconButton>
                </Box>
              ))}
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
              disabled={!formData.name.trim()}
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
                '&:disabled': {
                  backgroundColor: '#ccc',
                },
              }}
            >
              ADD
            </Button>
            <Button
              onClick={handleClose}
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

      {/* Add Field Dialog */}
      <AddReportFieldDialog
        open={showAddField}
        onClose={() => setShowAddField(false)}
        onSave={handleAddField}
      />
    </>
  );
};

export default AddNewReportDialog;
