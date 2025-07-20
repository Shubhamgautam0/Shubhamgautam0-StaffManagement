import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Checkbox,
  IconButton,
  Paper,
  Chip,
} from '@mui/material';
import {
  Search,
  Tune,
  Add,
} from '@mui/icons-material';
import {
  getSiteCheckpoints,
  removeSiteCheckpoint,
  type SiteCheckpoint
} from '../../data/siteData';
import AddCheckpointForm from './forms/AddCheckpointForm';

interface CheckpointProps {
  siteId?: string;
}

function Checkpoint({ siteId }: CheckpointProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [checkpoints, setCheckpoints] = useState<SiteCheckpoint[]>([]);

  // Load checkpoints for the site
  useEffect(() => {
    if (siteId) {
      const existingCheckpoints = getSiteCheckpoints(siteId);
      setCheckpoints(existingCheckpoints);
    }
  }, [siteId]);

  // Filter checkpoints based on search
  const filteredCheckpoints = checkpoints.filter(checkpoint =>
    checkpoint.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCheckpoint = () => {
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
  };

  const handleCheckpointAdded = () => {
    // Refresh the checkpoints list
    if (siteId) {
      const updatedCheckpoints = getSiteCheckpoints(siteId);
      setCheckpoints(updatedCheckpoints);
    }
  };

  const handleRemoveCheckpoint = (checkpointId: string) => {
    if (siteId) {
      const success = removeSiteCheckpoint(siteId, checkpointId);
      if (success) {
        // Refresh the checkpoints list
        const updatedCheckpoints = getSiteCheckpoints(siteId);
        setCheckpoints(updatedCheckpoints);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Controls */}
      <Box sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        mb: 3,
        pb: 2,
        borderBottom: '1px solid #f0f0f0'
      }}>
        {/* Select All Checkbox */}
        <Checkbox />

        {/* Search Field */}
        <TextField
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
          sx={{ flex: 1, maxWidth: 400 }}
        />

        {/* Filter Button */}
        <IconButton>
          <Tune />
        </IconButton>

        {/* Add Checkpoint Button */}
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddCheckpoint}
          sx={{
            backgroundColor: '#6366F1',
            '&:hover': {
              backgroundColor: '#5856EB'
            }
          }}
        >
          Add Checkpoint
        </Button>
      </Box>

      {/* Checkpoints List */}
      <Box>
        {filteredCheckpoints.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {filteredCheckpoints.map((checkpoint) => (
              <Paper
                key={checkpoint.id}
                sx={{
                  p: 3,
                  border: '1px solid #f0f0f0',
                  boxShadow: 'none',
                  borderRadius: 1
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {checkpoint.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {checkpoint.isReportingCheckpoint && (
                        <Chip label="Reporting Checkpoint" size="small" color="success" />
                      )}
                      {checkpoint.reportRequired && (
                        <Chip label="Report Required" size="small" color="primary" />
                      )}
                      {checkpoint.attachmentRequired && (
                        <Chip label="Attachment Required" size="small" color="secondary" />
                      )}
                      {checkpoint.photoRequired && (
                        <Chip label="Photo Required" size="small" color="warning" />
                      )}
                    </Box>
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleRemoveCheckpoint(checkpoint.id)}
                    sx={{ color: '#f44336', borderColor: '#f44336' }}
                  >
                    Remove
                  </Button>
                </Box>
              </Paper>
            ))}
          </Box>
        ) : (
          <Box sx={{
            textAlign: 'center',
            py: 8,
            color: '#666'
          }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              No Data Found
            </Typography>
            <Typography variant="body2">
              No checkpoints available. Click "Add Checkpoint" to create one.
            </Typography>
          </Box>
        )}
      </Box>

      {/* Add Checkpoint Form Drawer */}
      <AddCheckpointForm
        open={showAddForm}
        onClose={handleCloseForm}
        siteId={siteId}
        onCheckpointAdded={handleCheckpointAdded}
      />
    </Box>
  );
}

export default Checkpoint;
