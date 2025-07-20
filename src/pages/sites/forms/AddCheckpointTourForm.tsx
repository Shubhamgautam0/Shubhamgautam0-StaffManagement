import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Drawer,
  IconButton,
  Switch,
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Fab,
  InputAdornment,
} from '@mui/material';
import {
  Close,
  Add,
  Edit,
  Assignment,
  AccessTime,
} from '@mui/icons-material';
import { Zoom, Tooltip } from '@mui/material';
import AddCheckpointForm from './AddCheckpointForm';
import AssignCheckpointsForm from './AssignCheckpointsForm';
import {
  addSiteCheckpointTour,
  type CheckpointTour as CheckpointTourType
} from '../../../data/siteData';

interface AddCheckpointTourFormProps {
  open: boolean;
  onClose: () => void;
  siteId?: string;
  onTourAdded?: () => void;
}

function AddCheckpointTourForm({ open, onClose, siteId, onTourAdded }: AddCheckpointTourFormProps) {
  const [formData, setFormData] = useState<Partial<CheckpointTourType>>({
    name: 'Route A',
    isActive: true,
    type: 'Static',
    timeDuration: {
      type: 'Regular Interval',
      timeLimit: '01 hrs 00 mins'
    },
    assignedCheckpoints: []
  });

  const [showAddCheckpointForm, setShowAddCheckpointForm] = useState(false);
  const [showAssignCheckpointsForm, setShowAssignCheckpointsForm] = useState(false);
  const [fabHovered, setFabHovered] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = () => {
    if (formData.name?.trim() && siteId) {
      const tourData = {
        name: formData.name.trim(),
        isActive: formData.isActive || false,
        type: formData.type || 'Static',
        timeDuration: formData.timeDuration || { type: 'Regular Interval', timeLimit: '01 hrs 00 mins' },
        assignedCheckpoints: formData.assignedCheckpoints || [],
        createdDate: new Date().toISOString().split('T')[0]
      };

      const success = addSiteCheckpointTour(siteId, tourData);

      if (success) {
        onTourAdded?.();
        handleClose();
      }
    }
  };

  const handleClose = () => {
    setFormData({
      name: 'Route A',
      isActive: true,
      type: 'Static',
      timeDuration: {
        type: 'Regular Interval',
        timeLimit: '01 hrs 00 mins'
      },
      assignedCheckpoints: []
    });
    setShowAddCheckpointForm(false);
    setShowAssignCheckpointsForm(false);
    onClose();
  };

  const handleCreateCheckpoint = () => {
    setShowAddCheckpointForm(true);
  };

  const handleAssignCheckpoints = () => {
    setShowAssignCheckpointsForm(true);
  };

  const handleCheckpointAdded = () => {
    setShowAddCheckpointForm(false);
    // Refresh checkpoints if needed
  };

  const handleCheckpointsAssigned = (checkpointIds: string[]) => {
    setFormData(prev => ({ ...prev, assignedCheckpoints: checkpointIds }));
    setShowAssignCheckpointsForm(false);
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 500 },
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
              Checkpoint Tour
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
            {/* Active Tour Toggle */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Active Tour
              </Typography>
              <Switch
                checked={formData.isActive || false}
                onChange={(e) => handleInputChange('isActive', e.target.checked)}
                color="primary"
              />
            </Box>

            {/* Tour Name */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1, color: '#666' }}>
                Tour Name
              </Typography>
              <TextField
                fullWidth
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Route A"
                size="small"
              />
            </Box>

            {/* Type */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1, color: '#666' }}>
                Type
              </Typography>
              <RadioGroup
                value={formData.type || 'Static'}
                onChange={(e) => handleInputChange('type', e.target.value)}
                row
              >
                <FormControlLabel
                  value="Static"
                  control={<Radio />}
                  label="Static"
                />
                <FormControlLabel
                  value="Mobile Patrol"
                  control={<Radio />}
                  label="Mobile Patrol"
                />
              </RadioGroup>
            </Box>

            {/* Time Duration */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                Time Duration
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: '#666' }}>
                    Type
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      value={formData.timeDuration?.type || 'Regular Interval'}
                      onChange={(e) => handleInputChange('timeDuration.type', e.target.value)}
                    >
                      <MenuItem value="Regular Interval">Regular Interval</MenuItem>
                      <MenuItem value="Custom Interval">Custom Interval</MenuItem>
                      <MenuItem value="One Time">One Time</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: '#666' }}>
                    Time Limit
                  </Typography>
                  <TextField
                    type="time"
                    fullWidth
                    value={formData.timeDuration?.timeLimit || '01 hrs 00 mins'}
                    onChange={(e) => handleInputChange('timeDuration.timeLimit', e.target.value)}
                    size="small"
                  />
                </Box>
              </Box>
            </Box>

            {/* Floating Action Buttons */}
            <Box
              className="fab-container"
              onMouseEnter={() => setFabHovered(true)}
              onMouseLeave={() => setFabHovered(false)}
              sx={{
                position: 'fixed',
                right: 40,
                bottom: 120,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                zIndex: 1000
              }}
            >

              {/* Assign Checkpoints */}
              <Zoom in={fabHovered} timeout={200} style={{ transitionDelay: fabHovered ? '50ms' : '0ms' }}>
                <Tooltip title="Assign Checkpoints" placement="left">
                  <Fab
                    size="large"
                    onClick={handleAssignCheckpoints}
                    className="fab-primary"
                    sx={{
                      backgroundColor: '#8B5CF6',
                      '&:hover': { backgroundColor: '#7C3AED' }
                    }}
                  >
                    <Assignment />
                  </Fab>
                </Tooltip>
              </Zoom>

              {/* Edit Tour */}
              <Zoom in={fabHovered} timeout={200} style={{ transitionDelay: fabHovered ? '50ms' : '0ms' }}>
                <Tooltip title="Edit Tour" placement="left">
                  <Fab
                    size="large"
                    onClick={handleAssignCheckpoints}
                    className="fab-primary"
                    sx={{
                      backgroundColor: '#10B981',
                      color: 'white',
                      '&:hover': { backgroundColor: '#059669' }
                    }}
                  >
                    <Edit />
                  </Fab>
                </Tooltip>
              </Zoom>

              {/* Main FAB */}
              <Fab
                color="primary"
                className={`fab-primary ${fabHovered ? 'fab-rotate' : 'fab-rotate-reset'}`}
                sx={{
                  backgroundColor: '#6366F1',
                  '&:hover': { backgroundColor: '#5856EB' }
                }}
              >
                <Add />
              </Fab>
            </Box>
          </Box>

          {/* Footer */}
          <Box sx={{
            p: 3,
            borderTop: '1px solid #f0f0f0'
          }}>
            <Button
              onClick={handleSave}
              variant="contained"
              fullWidth
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

      {/* Add Checkpoint Form */}
      <AddCheckpointForm
        open={showAddCheckpointForm}
        onClose={() => setShowAddCheckpointForm(false)}
        siteId={siteId}
        onCheckpointAdded={handleCheckpointAdded}
      />

      {/* Assign Checkpoints Form */}
      <AssignCheckpointsForm
        open={showAssignCheckpointsForm}
        onClose={() => setShowAssignCheckpointsForm(false)}
        siteId={siteId}
        onCheckpointsAssigned={handleCheckpointsAssigned}
        selectedCheckpoints={formData.assignedCheckpoints || []}
      />
    </>
  );
}

export default AddCheckpointTourForm;
