import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import {
  Add,
} from '@mui/icons-material';
import AddCheckpointTourForm from './forms/AddCheckpointTourForm';
import {
  getSiteCheckpointTours,
  removeSiteCheckpointTour,
  type CheckpointTour as CheckpointTourType
} from '../../data/siteData';

interface CheckpointTourProps {
  siteId?: string;
}

function CheckpointTour({ siteId }: CheckpointTourProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [tours, setTours] = useState<CheckpointTourType[]>([]);

  // Load checkpoint tours for the site
  useEffect(() => {
    if (siteId) {
      const existingTours = getSiteCheckpointTours(siteId);
      setTours(existingTours);
    }
  }, [siteId]);

  const handleAddTour = () => {
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
  };

  const handleTourAdded = () => {
    // Refresh the tours list
    if (siteId) {
      const updatedTours = getSiteCheckpointTours(siteId);
      setTours(updatedTours);
    }
  };

  const handleRemoveTour = (tourId: string) => {
    if (siteId) {
      const success = removeSiteCheckpointTour(siteId, tourId);
      if (success) {
        const updatedTours = getSiteCheckpointTours(siteId);
        setTours(updatedTours);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        mb: 3
      }}>
        <Typography variant="h4" sx={{
          fontWeight: 600,
          color: '#333',
          fontSize: '28px',
          mb: 2
        }}>
          Checkpoint Tours
        </Typography>
        <Button
          variant="text"
          startIcon={<Add />}
          onClick={handleAddTour}
          className="btn-text"
        >
          Add Checkpoint Tours
        </Button>
      </Box>

      {/* Tours List */}
      <Box>
        {tours.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {tours.map((tour) => (
              <Paper
                key={tour.id}
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
                      {tour.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                      Type: {tour.type}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      Duration: {tour.timeDuration.type} - {tour.timeDuration.timeLimit}
                    </Typography>
                    <Typography variant="body2" sx={{ color: tour.isActive ? '#4caf50' : '#f44336' }}>
                      Status: {tour.isActive ? 'Active' : 'Inactive'}
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleRemoveTour(tour.id)}
                    sx={{ color: '#f44336', borderColor: '#f44336' }}
                  >
                    Remove
                  </Button>
                </Box>
              </Paper>
            ))}
          </Box>
        ) : (
          <Paper sx={{
            p: 4,
            textAlign: 'center',
            border: '1px solid #f0f0f0',
            boxShadow: 'none'
          }}>
            <Typography variant="body1" sx={{ color: '#666' }}>
              No checkpoint tours created yet. Click "Add Checkpoint Tours" to create one.
            </Typography>
          </Paper>
        )}
      </Box>

      {/* Add Checkpoint Tour Form Drawer */}
      <AddCheckpointTourForm
        open={showAddForm}
        onClose={handleCloseForm}
        siteId={siteId}
        onTourAdded={handleTourAdded}
      />
    </Box>
  );
}

export default CheckpointTour;
