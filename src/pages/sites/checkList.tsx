import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Divider,
  IconButton,
  Drawer,
} from '@mui/material';
import {
  Search,
  Add,
  Close,
  DragIndicator,
  MoreVert,
} from '@mui/icons-material';
import Textfield from '../textField/TextField';

interface ChecklistItem {
  id: string;
  name: string;
  instructions: string;
}

const CheckList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    {
      id: '1',
      name: 'qwerty',
      instructions: '',
    }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    instructions: '',
  });

  // Handler functions
  const handleAddNewItem = () => {
    setShowAddForm(true);
  };

  const handleAddItem = () => {
    setShowAddForm(true);
  };

  const handleSaveItem = () => {
    if (formData.name.trim()) {
      const newItem: ChecklistItem = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        instructions: formData.instructions.trim(),
      };
      setChecklistItems([...checklistItems, newItem]);
      setFormData({ name: '', instructions: '' });
      setShowAddForm(false);
    }
  };

  const handleCancelForm = () => {
    setFormData({ name: '', instructions: '' });
    setShowAddForm(false);
  };

  const filteredItems = checklistItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4
      }}>
        <Typography variant="h4" sx={{
          fontWeight: 600,
          color: '#333',
          fontSize: '28px'
        }}>
          Checklist
        </Typography>

        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={handleAddNewItem}
          sx={{
            color: 'var(--clr-purple)',
            borderColor: '#8e6ec8',
            textTransform: 'none',
            fontSize: '14px',
            fontWeight: 500,
            px: 3,
            py: 1,
            '&:hover': {
              borderColor: '#7c4dff',
              backgroundColor: 'rgba(142, 110, 200, 0.04)',
            },
          }}
        >
          Add New Item
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search Checklist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#999', fontSize: 20 }} />
                </InputAdornment>
              ),
            },
          }}
          className='input-field'
        />
      </Box>

      {/* Checklist Items */}
      <Box sx={{ mb: 3 }}>
        {filteredItems.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              py: 2,
              borderBottom: '1px solid #f0f0f0',
              '&:last-child': {
                borderBottom: 'none',
              }
            }}
          >
            <DragIndicator sx={{ color: '#ccc', cursor: 'grab' }} />

            <Typography
              sx={{
                flex: 1,
                fontSize: '14px',
                color: '#333',
              }}
            >
              {item.name}
            </Typography>

            <IconButton size="small" sx={{ color: '#999' }}>
              <MoreVert />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Divider sx={{ borderColor: '#e0e0e0' }} />

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={showAddForm}
        onClose={handleCancelForm}
        slotProps={{
          paper: {
            sx: {
              width: 400,
              maxWidth: '90vw',
            }
          }
        }}
      >
        <Box sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 3,
            borderBottom: '1px solid #e0e0e0'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
              Add Item
            </Typography>
            <IconButton onClick={handleCancelForm} sx={{ color: '#999' }}>
              <Close />
            </IconButton>
          </Box>

          {/* Content */}
          <Box sx={{
            flex: 1,
            p: 3,
            overflow: 'auto'
          }}>
            <Textfield
              label="Name"
              value={formData.name}
              onChange={(value) => setFormData({...formData, name: value})}
              placeholder="Name"
              required={true}
            />

            <Box sx={{ mb: 3 }}>
              <Textfield
                label="Instructions"
                value={formData.instructions}
                onChange={(value) => setFormData({...formData, instructions: value})}
                placeholder="Instructions"
                multiline={true}
                rows={4}
                required={false}
              />
            </Box>
          </Box>

          {/* Footer Actions */}
          <Box sx={{
            p: 3,
            borderTop: '1px solid #e0e0e0',
            display: 'flex',
            gap: 2,
            justifyContent: 'flex-start'
          }}>
            <Button
              variant="contained"
              onClick={handleSaveItem}
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
                  backgroundColor: 'var(--clr-purple-light)',
                },
                '&:disabled': {
                  backgroundColor: '#ccc',
                },
              }}
            >
              SAVE
            </Button>
            <Button
              onClick={handleCancelForm}
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
    </Box>
  );
};

export default CheckList;
