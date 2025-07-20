import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  Radio,
  RadioGroup,
  FormControlLabel,
  IconButton,
  Paper,
  Chip,
} from '@mui/material';
import {
  Add,
  Search,
  Close,
} from '@mui/icons-material';
import {
  getLicenceTypes,
  addLicenceType,
  getSiteLicences,
  addSiteLicence,
  removeSiteLicence,
  type LicenceType,
  type SiteLicence
} from '../../data/siteData';

interface LicenceProps {
  siteId?: string;
}

function Licence({ siteId }: LicenceProps) {
  const [showLicenceDialog, setShowLicenceDialog] = useState(false);
  const [showAddTypeDialog, setShowAddTypeDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLicenceType, setSelectedLicenceType] = useState('');
  const [newLicenceType, setNewLicenceType] = useState('');
  const [siteLicences, setSiteLicences] = useState<SiteLicence[]>([]);

  // Available licence types
  const [licenceTypes, setLicenceTypes] = useState<LicenceType[]>([]);

  // Load data when component mounts or siteId changes
  useEffect(() => {
    // Load licence types
    const types = getLicenceTypes();
    setLicenceTypes(types);

    // Load existing licences for the site
    if (siteId) {
      const existingLicences = getSiteLicences(siteId);
      setSiteLicences(existingLicences);
    }
  }, [siteId]);

  // Filter licence types based on search
  const filteredLicenceTypes = licenceTypes.filter(type =>
    type.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddLicence = () => {
    setShowLicenceDialog(true);
  };

  const handleCloseLicenceDialog = () => {
    setShowLicenceDialog(false);
    setSearchTerm('');
    setSelectedLicenceType('');
  };

  const handleAddNewLicenceType = () => {
    setShowAddTypeDialog(true);
  };

  const handleSaveNewLicenceType = () => {
    if (newLicenceType.trim()) {
      const newType = addLicenceType(newLicenceType);
      setLicenceTypes(prev => [...prev, newType]);
      setNewLicenceType('');
      setShowAddTypeDialog(false);
    }
  };

  const handleSelectLicenceType = (typeId: string) => {
    setSelectedLicenceType(typeId);
  };

  const handleSaveLicence = () => {
    if (selectedLicenceType && siteId) {
      const licenceType = licenceTypes.find(type => type.id === selectedLicenceType);
      if (licenceType) {
        const success = addSiteLicence(siteId, {
          type: licenceType.name
        });

        if (success) {
          // Refresh the licences list
          const updatedLicences = getSiteLicences(siteId);
          setSiteLicences(updatedLicences);
          handleCloseLicenceDialog();
        }
      }
    }
  };

  const handleRemoveLicence = (licenceId: string) => {
    if (siteId) {
      const success = removeSiteLicence(siteId, licenceId);
      if (success) {
        // Refresh the licences list
        const updatedLicences = getSiteLicences(siteId);
        setSiteLicences(updatedLicences);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ p: 4, height: '100%' }}>
        {/* Header */}
        <Box>
          <Typography variant="h4" sx={{
            fontWeight: 600,
            color: '#333',
            fontSize: '28px',
            mb: 2
          }}>
            Licences & certifications
          </Typography>
          <Button
            variant="text"
            startIcon={<Add />}
            onClick={handleAddLicence}
            className="btn-text"
          >
            Add Licences
          </Button>
        </Box>

        {/* Existing Licences */}
        <Box sx={{ mt: 4 }}>
          {siteLicences.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {siteLicences.map((licence) => (
                <Paper
                  key={licence.id}
                  sx={{
                    p: 3,
                    border: '1px solid #f0f0f0',
                    boxShadow: 'none',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {licence.type}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleRemoveLicence(licence.id)}
                    sx={{ color: '#f44336', borderColor: '#f44336' }}
                  >
                    Remove
                  </Button>
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
                No licences added yet. Click "Add Licences" to get started.
              </Typography>
            </Paper>
          )}
        </Box>
      </Box>

      {/* Licence Selection Dialog */}
      <Dialog
        open={showLicenceDialog}
        onClose={handleCloseLicenceDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            height: '80vh',
            maxHeight: '80vh'
          }
        }}
      >
        <DialogTitle sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <Typography variant="h6">Licence and Certifications</Typography>
          <IconButton onClick={handleCloseLicenceDialog}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          {/* Search Field */}
          <Box sx={{ p: 3, borderBottom: '1px solid #f0f0f0' }}>
            <TextField
              fullWidth
              placeholder="Search or add license..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                }
              }}
            />
          </Box>

          {/* Licence Types List */}
          <Box sx={{ p: 2 }}>
            <RadioGroup
              value={selectedLicenceType}
              onChange={(e) => handleSelectLicenceType(e.target.value)}
            >
              {filteredLicenceTypes.map((type) => (
                <FormControlLabel
                  key={type.id}
                  value={type.id}
                  control={<Radio />}
                  label={type.name}
                  sx={{
                    py: 1,
                    '& .MuiFormControlLabel-label': {
                      fontSize: '16px'
                    }
                  }}
                />
              ))}
            </RadioGroup>
          </Box>

          {/* Add New Licence Type Button */}
          <Box sx={{ p: 3, borderTop: '1px solid #f0f0f0' }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddNewLicenceType}
              sx={{
                backgroundColor: '#6366F1',
                '&:hover': {
                  backgroundColor: '#5856EB'
                }
              }}
            >
              ADD NEW LICENSE TYPE
            </Button>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, borderTop: '1px solid #f0f0f0' }}>
          <Button
            onClick={handleCloseLicenceDialog}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveLicence}
            variant="contained"
            disabled={!selectedLicenceType}
            sx={{
              backgroundColor: '#6366F1',
              '&:hover': {
                backgroundColor: '#5856EB'
              }
            }}
          >
            Add Licence
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add New Licence Type Dialog */}
      <Dialog
        open={showAddTypeDialog}
        onClose={() => setShowAddTypeDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Licence Type</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Licence Type Name"
            value={newLicenceType}
            onChange={(e) => setNewLicenceType(e.target.value)}
            placeholder="Enter new licence type name"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddTypeDialog(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveNewLicenceType}
            variant="contained"
            disabled={!newLicenceType.trim()}
          >
            Add Type
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Licence;
