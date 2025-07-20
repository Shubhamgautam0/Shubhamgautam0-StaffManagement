import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Checkbox,
  Drawer,
  IconButton,
  FormControlLabel,
  Chip,
} from '@mui/material';
import {
  Close,
  CameraAlt,
  QrCode,
  Nfc,
  Description,
  PhotoCamera,
} from '@mui/icons-material';
import {
  addSiteCheckpoint,
  type SiteCheckpoint
} from '../../../data/siteData';

interface AddCheckpointFormProps {
  open: boolean;
  onClose: () => void;
  siteId?: string;
  onCheckpointAdded?: () => void;
}

function AddCheckpointForm({ open, onClose, siteId, onCheckpointAdded }: AddCheckpointFormProps) {
  const [formData, setFormData] = useState<Partial<SiteCheckpoint>>({
    name: '',
    qrCode: '',
    nfcTag: '',
    instructions: '',
    attachments: [],
    isReportingCheckpoint: false,
    reportRequired: false,
    attachmentRequired: false,
    photoRequired: false,
    photoTimeLimit: 10
  });

  const handleInputChange = (field: keyof SiteCheckpoint, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: keyof SiteCheckpoint, checked: boolean) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  const handleSave = () => {
    if (formData.name?.trim() && siteId) {
      const checkpointData = {
        name: formData.name.trim(),
        qrCode: formData.qrCode || '',
        nfcTag: formData.nfcTag || '',
        instructions: formData.instructions || '',
        attachments: formData.attachments || [],
        isReportingCheckpoint: formData.isReportingCheckpoint || false,
        reportRequired: formData.reportRequired || false,
        attachmentRequired: formData.attachmentRequired || false,
        photoRequired: formData.photoRequired || false,
        photoTimeLimit: formData.photoTimeLimit || 10,
        createdDate: new Date().toISOString().split('T')[0]
      };

      const success = addSiteCheckpoint(siteId, checkpointData);
      
      if (success) {
        onCheckpointAdded?.();
        handleClose();
      }
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      qrCode: '',
      nfcTag: '',
      instructions: '',
      attachments: [],
      isReportingCheckpoint: false,
      reportRequired: false,
      attachmentRequired: false,
      photoRequired: false,
      photoTimeLimit: 10
    });
    onClose();
  };

  const handleClearQR = () => {
    setFormData(prev => ({ ...prev, qrCode: '' }));
  };

  const handleClearNFC = () => {
    setFormData(prev => ({ ...prev, nfcTag: '' }));
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 600 },
          maxWidth: '100vw'
        }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 3,
          borderBottom: '1px solid #f0f0f0'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Add Checkpoint
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
          {/* Checkpoint Name */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Checkpoint Name"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter checkpoint name"
              required
            />
          </Box>

          {/* QR Code and NFC Tag */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{
                border: '2px dashed #ddd',
                borderRadius: 1,
                p: 3,
                textAlign: 'center',
                minHeight: 120,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fafafa'
              }}>
                <QrCode sx={{ fontSize: 40, color: '#999', mb: 1 }} />
                <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                  QR Code Scan
                </Typography>
                <Button
                  variant="text"
                  onClick={handleClearQR}
                  sx={{ color: '#ff9800' }}
                >
                  Clear QR
                </Button>
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={{
                border: '2px dashed #ddd',
                borderRadius: 1,
                p: 3,
                textAlign: 'center',
                minHeight: 120,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fafafa'
              }}>
                <Nfc sx={{ fontSize: 40, color: '#999', mb: 1 }} />
                <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                  NFC Tag Scan
                </Typography>
                <Button
                  variant="text"
                  onClick={handleClearNFC}
                  sx={{ color: '#ff9800' }}
                >
                  Clear NFC
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Instructions */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 1, color: '#666' }}>
              Instructions
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Instructions"
              value={formData.instructions || ''}
              onChange={(e) => handleInputChange('instructions', e.target.value)}
            />
          </Box>

          {/* Attachments */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 1, color: '#666' }}>
              Attachments
            </Typography>
            <Box sx={{
              border: '1px dashed #ddd',
              borderRadius: 1,
              p: 2,
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              backgroundColor: '#fafafa'
            }}>
              <CameraAlt sx={{ color: '#999' }} />
              <Typography variant="body2" sx={{ color: '#666' }}>
                Add Attachments
              </Typography>
              <Typography variant="body2" sx={{ color: '#999' }}>
                20 maximum
              </Typography>
            </Box>
          </Box>

          {/* Checkboxes */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isReportingCheckpoint || false}
                    onChange={(e) => handleCheckboxChange('isReportingCheckpoint', e.target.checked)}
                  />
                }
                label="Make Reporting Checkpoint"
              />
              {formData.isReportingCheckpoint && (
                <Chip label="Reporting Checkpoint" size="small" color="success" />
              )}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.reportRequired || false}
                    onChange={(e) => handleCheckboxChange('reportRequired', e.target.checked)}
                  />
                }
                label="Report Required"
              />
              <Description sx={{ color: '#6366F1' }} />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.attachmentRequired || false}
                    onChange={(e) => handleCheckboxChange('attachmentRequired', e.target.checked)}
                  />
                }
                label="Attachment Required"
              />
              <PhotoCamera sx={{ color: '#6366F1' }} />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.photoRequired || false}
                    onChange={(e) => handleCheckboxChange('photoRequired', e.target.checked)}
                  />
                }
                label="Photo required within 10 sec of scan"
              />
              <PhotoCamera sx={{ color: '#6366F1' }} />
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{
          p: 3,
          borderTop: '1px solid #f0f0f0',
          display: 'flex',
          gap: 2,
          justifyContent: 'flex-end'
        }}>
          <Button
            onClick={handleClose}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!formData.name?.trim()}
            sx={{
              backgroundColor: '#6366F1',
              '&:hover': {
                backgroundColor: '#5856EB'
              }
            }}
          >
            SAVE
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default AddCheckpointForm;
