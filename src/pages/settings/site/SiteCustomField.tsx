import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField,
  Button,
  IconButton,
  InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface CustomField {
  id: string;
  name: string;
}

const SiteCustomField: React.FC = () => {
  const [customFields, setCustomFields] = useState<CustomField[]>([
    { id: '1', name: 'guard' }
  ]);

  const [newFieldName, setNewFieldName] = useState('');

  const addCustomField = () => {
    if (newFieldName.trim()) {
      const newField: CustomField = {
        id: Date.now().toString(),
        name: newFieldName.trim()
      };
      setCustomFields([...customFields, newField]);
      setNewFieldName('');
    }
  };

  const removeCustomField = (id: string) => {
    setCustomFields(customFields.filter(field => field.id !== id));
  };

  const updateCustomField = (id: string, name: string) => {
    setCustomFields(customFields.map(field => 
      field.id === id ? { ...field, name } : field
    ));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Site - Custom Field
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Add custom fields to the Sites
        </Typography>
        <IconButton 
          sx={{ 
            border: '1px dashed #ccc',
            borderRadius: 1,
            p: 1
          }}
        >
          <AddIcon />
        </IconButton>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={addCustomField}
          sx={{ 
            backgroundColor: '#5c6bc0',
            '&:hover': {
              backgroundColor: '#3f51b5'
            }
          }}
        >
          ADD CUSTOM FIELD
        </Button>
      </Box>

      {/* Existing Custom Fields */}
      <Box sx={{ mb: 3 }}>
        {customFields.map((field) => (
          <Box 
            key={field.id}
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 2,
              p: 2,
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              backgroundColor: '#fafafa'
            }}
          >
            <IconButton 
              size="small" 
              sx={{ mr: 1, color: 'text.secondary' }}
            >
              <DragIndicatorIcon />
            </IconButton>
            
            <TextField
              value={field.name}
              onChange={(e) => updateCustomField(field.id, e.target.value)}
              variant="outlined"
              size="small"
              sx={{ 
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white'
                }
              }}
            />
            
            <IconButton 
              size="small" 
              sx={{ ml: 1, color: 'text.secondary' }}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        ))}
      </Box>

      {/* Add New Field Input */}
      <Box sx={{ mb: 4 }}>
        <TextField
          placeholder="Enter custom field name"
          value={newFieldName}
          onChange={(e) => setNewFieldName(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addCustomField();
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DragIndicatorIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton 
                  size="small" 
                  onClick={addCustomField}
                  disabled={!newFieldName.trim()}
                >
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white'
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default SiteCustomField;
