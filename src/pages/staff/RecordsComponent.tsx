import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  TextField,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import {
  Assignment,
  Add,
  Close,
} from '@mui/icons-material';
import { getStaffRecords, addStaffRecord, type StaffRecord } from '../../data/staffData';

interface RecordsComponentProps {
  staffId: string;
  staffName: string;
  recordType: 'Records' | 'Notes';
  setRecordType: (type: 'Records' | 'Notes') => void;
}

function RecordsComponent({ staffId, staffName, recordType, setRecordType }: RecordsComponentProps) {
  const [records, setRecords] = useState<StaffRecord[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newRecord, setNewRecord] = useState({
    title: '',
    content: '',
    type: 'note' as 'information' | 'note'
  });
  const [saveMessage, setSaveMessage] = useState<string>('');

  // Load staff records when component mounts or staffId changes
  useEffect(() => {
    if (staffId) {
      const staffRecords = getStaffRecords(staffId);
      setRecords(staffRecords);
    }
  }, [staffId]);

  // Filter records based on selected type
  const filteredRecords = records.filter(record => {
    if (recordType === 'Records') {
      return record.type === 'information';
    } else {
      return record.type === 'note';
    }
  });

  const handleAddRecord = () => {
    if (newRecord.title && newRecord.content) {
      const recordData = {
        type: recordType === 'Records' ? 'information' as const : 'note' as const,
        title: newRecord.title,
        content: newRecord.content,
        date: new Date().toISOString().split('T')[0],
        createdBy: 'Admin'
      };

      const success = addStaffRecord(staffId, recordData);
      if (success) {
        // Refresh records
        const updatedRecords = getStaffRecords(staffId);
        setRecords(updatedRecords);
        setSaveMessage(`${recordType.slice(0, -1)} added successfully!`);
        setTimeout(() => setSaveMessage(''), 3000);
        handleCloseDialog();
      } else {
        setSaveMessage(`Failed to add ${recordType.toLowerCase()}. Please try again.`);
        setTimeout(() => setSaveMessage(''), 3000);
      }
    }
  };

  const handleCloseDialog = () => {
    setShowAddDialog(false);
    setNewRecord({
      title: '',
      content: '',
      type: 'note'
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        p: 3,
        borderBottom: '1px solid #f0f0f0'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--clr-text-primary)' }}>
          Record
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Select
            value={recordType}
            onChange={(e) => setRecordType(e.target.value as 'Records' | 'Notes')}
            size="small"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="Records">Records</MenuItem>
            <MenuItem value="Notes">Notes</MenuItem>
          </Select>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setShowAddDialog(true)}
            sx={{
              backgroundColor: '#6366F1',
              '&:hover': {
                backgroundColor: '#5856EB'
              }
            }}
          >
            Add {recordType.slice(0, -1)}
          </Button>
        </Box>
      </Box>

      {/* Save Message */}
      {saveMessage && (
        <Box sx={{ p: 3, pb: 0 }}>
          <Alert severity={saveMessage.includes('successfully') ? 'success' : 'error'}>
            {saveMessage}
          </Alert>
        </Box>
      )}

      {/* Records List */}
      <Box sx={{ p: 3 }}>
        {filteredRecords.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}>
            <Assignment sx={{ fontSize: 64, color: 'var(--clr-text-secondary)', opacity: 0.5 }} />
            <Typography variant="h6" sx={{ color: 'var(--clr-text-secondary)' }}>
              No Data Found
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--clr-text-secondary)' }}>
              No {recordType.toLowerCase()} available for this staff member
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {filteredRecords.map((record) => (
              <Paper
                key={record.id}
                sx={{
                  p: 3,
                  border: '1px solid #f0f0f0',
                  boxShadow: 'none',
                  borderRadius: 1
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--clr-text-primary)' }}>
                    {record.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--clr-text-secondary)' }}>
                    {formatDate(record.date)}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ color: 'var(--clr-text-primary)', mb: 1 }}>
                  {record.content}
                </Typography>
                {record.createdBy && (
                  <Typography variant="body2" sx={{ color: 'var(--clr-text-secondary)' }}>
                    Created by: {record.createdBy}
                  </Typography>
                )}
              </Paper>
            ))}
          </Box>
        )}
      </Box>

      {/* Add Record Dialog */}
      <Dialog
        open={showAddDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 1
        }}>
          <Typography variant="h6">Add {recordType.slice(0, -1)}</Typography>
          <Button
            onClick={handleCloseDialog}
            sx={{ minWidth: 'auto', p: 1 }}
          >
            <Close />
          </Button>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
            <Box>
              <Typography variant="body2" sx={{ mb: 1, color: 'var(--clr-text-secondary)' }}>
                Title *
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder={`Enter ${recordType.slice(0, -1).toLowerCase()} title`}
                value={newRecord.title}
                onChange={(e) => setNewRecord(prev => ({ ...prev, title: e.target.value }))}
              />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 1, color: 'var(--clr-text-secondary)' }}>
                Content *
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                size="small"
                placeholder={`Enter ${recordType.slice(0, -1).toLowerCase()} content`}
                value={newRecord.content}
                onChange={(e) => setNewRecord(prev => ({ ...prev, content: e.target.value }))}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddRecord}
            variant="contained"
            disabled={!newRecord.title || !newRecord.content}
            sx={{
              backgroundColor: '#6366F1',
              '&:hover': {
                backgroundColor: '#5856EB'
              }
            }}
          >
            Add {recordType.slice(0, -1)}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default RecordsComponent;
