import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Checkbox,
  Button,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { Close, KeyboardArrowDown } from '@mui/icons-material';

interface NotificationDrawerProps {
  open: boolean;
  onClose: () => void;
}

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ open, onClose }) => {
  const [selectedCount, setSelectedCount] = useState(0);
  const [bulkActionValue, setBulkActionValue] = useState('Bulk Action');

  const handleClose = () => {
    setSelectedCount(0);
    setBulkActionValue('');
    onClose();
  };

  const handleBulkActionChange = (event: any) => {
    setBulkActionValue(event.target.value);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            width: 600,
            maxWidth: '90vw',
          }
        }
      }}
    >
      <Box sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--clr-white)'
      }}>
        {/* Header */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 3,
          borderBottom: '1px solid var(--clr-border-light)'
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            color: 'var(--clr-text-primary)',
            fontSize: '20px'
          }}>
            Notifications
          </Typography>
          <IconButton 
            onClick={handleClose} 
            sx={{ 
              color: 'var(--clr-text-tertiary)',
              '&:hover': {
                backgroundColor: 'var(--clr-bg-light)',
              }
            }}
          >
            <Close />
          </IconButton>
        </Box>

        {/* Selection and Bulk Action Bar */}
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 3,
          borderBottom: '1px solid var(--clr-border-light)',
          backgroundColor: 'var(--clr-bg-lightest)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Checkbox
              checked={selectedCount > 0}
              indeterminate={selectedCount > 0}
              sx={{
                color: 'var(--clr-purple)',
                '&.Mui-checked': {
                  color: 'var(--clr-purple)',
                },
                '&.MuiCheckbox-indeterminate': {
                  color: 'var(--clr-purple)',
                },
              }}
            />
            <Typography variant="body2" sx={{ 
              color: 'var(--clr-text-secondary)',
              fontSize: '14px'
            }}>
              {selectedCount} selected
            </Typography>
          </Box>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={bulkActionValue}
              onChange={handleBulkActionChange}
              displayEmpty
              IconComponent={KeyboardArrowDown}
              sx={{
                fontSize: '14px',
                '& .MuiSelect-select': {
                  py: 1,
                  color: 'var(--clr-text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--clr-border-light)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--clr-border-medium)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--clr-purple)',
                },
              }}
            >
              <MenuItem value="Bulk Action" >
                Bulk Action
              </MenuItem>
              <MenuItem value="delete">Delete</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Content */}
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'var(--clr-text-secondary)',
              fontWeight: 500,
              fontSize: '18px'
            }}
          >
            No Notifications Found
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default NotificationDrawer;
