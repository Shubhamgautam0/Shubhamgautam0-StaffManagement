import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import {
  Close,
} from '@mui/icons-material';

interface WriteReportFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (reportData: any) => void;
}

interface ReportData {
  reportType: string;
  reportName: string;
  content: string;
}

const WriteReportForm: React.FC<WriteReportFormProps> = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState<ReportData>({
    reportType: '',
    reportName: '',
    content: '',
  });

  const handleInputChange = (field: keyof ReportData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
    // Reset form after save
    setFormData({
      reportType: '',
      reportName: '',
      content: '',
    });
  };

  const handleCancel = () => {
    // Reset form on cancel
    setFormData({
      reportType: '',
      reportName: '',
      content: '',
    });
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 400,
          backgroundColor: 'var(--clr-white)',
          borderLeft: '1px solid var(--clr-border-light)',
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 3,
          borderBottom: '1px solid var(--clr-border-light)',
        }}>
          <Typography variant="h6" sx={{
            fontWeight: 600,
            color: 'var(--clr-text-primary)',
          }}>
            Write Report
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: 'var(--clr-text-secondary)',
              '&:hover': {
                backgroundColor: 'var(--clr-bg-light)',
              },
            }}
          >
            <Close />
          </IconButton>
        </Box>

        {/* Form Content */}
        <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Report Type */}
          <Box>
            <Typography variant="body2" sx={{
              color: 'var(--clr-text-primary)',
              fontWeight: 500,
              mb: 1,
            }}>
              Report Type <span style={{ color: 'var(--clr-error)' }}>*</span>
            </Typography>
            <TextField
              fullWidth
              placeholder="Report name"
              value={formData.reportType}
              onChange={(e) => handleInputChange('reportType', e.target.value)}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'var(--clr-bg-lightest)',
                  '& fieldset': {
                    borderColor: 'var(--clr-border-light)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--clr-purple)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--clr-purple)',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'var(--clr-text-tertiary)',
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* Report Content - Large Text Area */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <TextField
              fullWidth
              multiline
              rows={20}
              placeholder="Write your report here..."
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              sx={{
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  height: '100%',
                  alignItems: 'flex-start',
                  backgroundColor: 'var(--clr-bg-lightest)',
                  '& fieldset': {
                    borderColor: 'var(--clr-border-light)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--clr-purple)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--clr-purple)',
                  },
                },
                '& .MuiInputBase-input': {
                  height: '100% !important',
                  overflow: 'auto !important',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'var(--clr-text-tertiary)',
                  opacity: 1,
                },
              }}
            />
          </Box>
        </Box>

        {/* Footer Buttons */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          gap: 2,
          p: 3,
          borderTop: '1px solid var(--clr-border-light)',
        }}>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!formData.reportType.trim()}
            sx={{
              backgroundColor: 'var(--clr-purple)',
              color: 'var(--clr-white)',
              textTransform: 'none',
              px: 3,
              py: 1,
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'var(--clr-purple-dark)',
              },
              '&:disabled': {
                backgroundColor: 'var(--clr-text-tertiary)',
                color: 'var(--clr-white)',
              },
            }}
          >
            Save
          </Button>
          <Button
            variant="text"
            onClick={handleCancel}
            sx={{
              color: 'var(--clr-text-secondary)',
              textTransform: 'none',
              px: 3,
              py: 1,
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'var(--clr-bg-light)',
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default WriteReportForm;
