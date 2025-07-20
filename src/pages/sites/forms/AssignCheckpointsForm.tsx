import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Drawer,
  IconButton,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputAdornment,
  Paper,
} from '@mui/material';
import {
  Close,
  Search,
} from '@mui/icons-material';
import { getSiteCheckpoints, type SiteCheckpoint } from '../../../data/siteData';

interface AssignCheckpointsFormProps {
  open: boolean;
  onClose: () => void;
  siteId?: string;
  onCheckpointsAssigned?: (checkpointIds: string[]) => void;
  selectedCheckpoints?: string[];
}

function AssignCheckpointsForm({ 
  open, 
  onClose, 
  siteId, 
  onCheckpointsAssigned,
  selectedCheckpoints = []
}: AssignCheckpointsFormProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [checkpoints, setCheckpoints] = useState<SiteCheckpoint[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>(selectedCheckpoints);

  // Load checkpoints when component mounts or siteId changes
  useEffect(() => {
    if (siteId && open) {
      const siteCheckpoints = getSiteCheckpoints(siteId);
      setCheckpoints(siteCheckpoints);
    }
  }, [siteId, open]);

  // Update selected checkpoints when prop changes
  useEffect(() => {
    setSelectedIds(selectedCheckpoints);
  }, [selectedCheckpoints]);

  // Filter checkpoints based on search
  const filteredCheckpoints = checkpoints.filter(checkpoint =>
    checkpoint.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (checkpointId: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, checkpointId]);
    } else {
      setSelectedIds(prev => prev.filter(id => id !== checkpointId));
    }
  };

  const handleSave = () => {
    onCheckpointsAssigned?.(selectedIds);
    handleClose();
  };

  const handleClose = () => {
    setSearchTerm('');
    onClose();
  };

  const handleCancel = () => {
    setSelectedIds(selectedCheckpoints); // Reset to original selection
    handleClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 500 },
          maxWidth: '100vw',
          marginLeft: { sm: '500px' } // Offset to show beside the main form
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
            Assign Checkpoints
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
          {/* Search Field */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Search Checkpoint..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Checkpoints List */}
          <Box>
            {filteredCheckpoints.length > 0 ? (
              <List sx={{ p: 0 }}>
                {filteredCheckpoints.map((checkpoint) => (
                  <ListItem
                    key={checkpoint.id}
                    sx={{
                      p: 0,
                      mb: 1
                    }}
                  >
                    <Paper
                      sx={{
                        width: '100%',
                        p: 2,
                        border: '1px solid #f0f0f0',
                        boxShadow: 'none',
                        borderRadius: 1,
                        backgroundColor: selectedIds.includes(checkpoint.id) ? '#f3f4f6' : 'white'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemIcon sx={{ minWidth: 'auto', mr: 2 }}>
                          <Checkbox
                            checked={selectedIds.includes(checkpoint.id)}
                            onChange={(e) => handleCheckboxChange(checkpoint.id, e.target.checked)}
                            color="primary"
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {checkpoint.name}
                            </Typography>
                          }
                          secondary={
                            <Box>
                              {checkpoint.instructions && (
                                <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
                                  {checkpoint.instructions}
                                </Typography>
                              )}
                              <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                                {checkpoint.isReportingCheckpoint && (
                                  <Typography variant="caption" sx={{ 
                                    backgroundColor: '#e8f5e8', 
                                    color: '#2e7d32', 
                                    px: 1, 
                                    py: 0.5, 
                                    borderRadius: 1 
                                  }}>
                                    Reporting
                                  </Typography>
                                )}
                                {checkpoint.reportRequired && (
                                  <Typography variant="caption" sx={{ 
                                    backgroundColor: '#e3f2fd', 
                                    color: '#1976d2', 
                                    px: 1, 
                                    py: 0.5, 
                                    borderRadius: 1 
                                  }}>
                                    Report Required
                                  </Typography>
                                )}
                                {checkpoint.photoRequired && (
                                  <Typography variant="caption" sx={{ 
                                    backgroundColor: '#fff3e0', 
                                    color: '#f57c00', 
                                    px: 1, 
                                    py: 0.5, 
                                    borderRadius: 1 
                                  }}>
                                    Photo Required
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          }
                        />
                      </Box>
                    </Paper>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Paper sx={{
                p: 4,
                textAlign: 'center',
                border: '1px solid #f0f0f0',
                boxShadow: 'none'
              }}>
                <Typography variant="body1" sx={{ color: '#666' }}>
                  {searchTerm ? 'No checkpoints found matching your search.' : 'No checkpoints available. Create checkpoints first to assign them to tours.'}
                </Typography>
              </Paper>
            )}
          </Box>

          {/* Selected Count */}
          {selectedIds.length > 0 && (
            <Box sx={{ mt: 3, p: 2, backgroundColor: '#f8f9fa', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ color: '#666' }}>
                {selectedIds.length} checkpoint{selectedIds.length !== 1 ? 's' : ''} selected
              </Typography>
            </Box>
          )}
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
            onClick={handleCancel}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              backgroundColor: '#6366F1',
              '&:hover': {
                backgroundColor: '#5856EB'
              }
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default AssignCheckpointsForm;
