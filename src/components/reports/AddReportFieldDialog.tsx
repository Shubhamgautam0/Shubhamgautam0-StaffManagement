import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  FormControlLabel,
  Chip,
} from '@mui/material';
import { Close, Add } from '@mui/icons-material';
import { fieldTypes } from '../../data/reportsData';
import type { ReportField } from '../../data/reportsData';

interface AddReportFieldDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (field: ReportField) => void;
}

const AddReportFieldDialog: React.FC<AddReportFieldDialogProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [fieldData, setFieldData] = useState({
    name: '',
    type: 'Text',
    required: false,
  });

  const [dropdownOptions, setDropdownOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState('');

  const handleSave = () => {
    if (fieldData.name.trim()) {
      // Validate that dropdown/radio/checkbox fields have options
      if ((fieldData.type === 'Dropdown' || fieldData.type === 'Radio' || fieldData.type === 'Checkbox') && dropdownOptions.length === 0) {
        return; // Don't save if no options provided for these field types
      }

      const newField: ReportField = {
        id: Date.now().toString(),
        name: fieldData.name.trim(),
        type: fieldData.type,
        required: fieldData.required,
        ...(fieldData.type === 'Dropdown' || fieldData.type === 'Radio' || fieldData.type === 'Checkbox'
          ? { options: dropdownOptions }
          : {})
      };
      onSave(newField);
      handleClose();
    }
  };

  const handleClose = () => {
    setFieldData({
      name: '',
      type: 'Text',
      required: false,
    });
    setDropdownOptions([]);
    setNewOption('');
    onClose();
  };

  const handleAddOption = () => {
    if (newOption.trim() && !dropdownOptions.includes(newOption.trim())) {
      setDropdownOptions([...dropdownOptions, newOption.trim()]);
      setNewOption('');
    }
  };

  const handleRemoveOption = (optionToRemove: string) => {
    setDropdownOptions(dropdownOptions.filter(option => option !== optionToRemove));
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: 400,
          maxWidth: '90vw',
        }
      }}
    >
      <Box sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 3,
          borderBottom: '1px solid #e0e0e0'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
            Add Report Field
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: '#999' }}>
            <Close />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{
          flex: 1,
          p: 3,
          overflow: 'auto'
        }}>
        {/* Field Name */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ 
            mb: 1,
            color: '#666',
            fontSize: '12px',
            fontWeight: 500
          }}>
            Field Name
          </Typography>
          <TextField
            fullWidth
            value={fieldData.name}
            onChange={(e) => setFieldData({...fieldData, name: e.target.value})}
            placeholder="Field Name"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
                '& fieldset': {
                  borderColor: '#e0e0e0',
                },
                '&:hover fieldset': {
                  borderColor: '#c0c0c0',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--clr-purple-light)',
                },
              },
            }}
          />
        </Box>

        {/* Field Type */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ 
            mb: 1,
            color: '#666',
            fontSize: '12px',
            fontWeight: 500
          }}>
            Field Type
          </Typography>
          <FormControl fullWidth>
            <Select
              value={fieldData.type}
              onChange={(e) => setFieldData({...fieldData, type: e.target.value})}
              sx={{
                backgroundColor: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#c0c0c0',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--clr-purple-light)',
                },
              }}
            >
              {fieldTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Required Field Checkbox */}
        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={fieldData.required}
                onChange={(e) => setFieldData({...fieldData, required: e.target.checked})}
                sx={{
                  color: '#ccc',
                  '&.Mui-checked': {
                    color: 'var(--clr-purple-light)',
                  },
                }}
              />
            }
            label={
              <Typography sx={{ fontSize: '14px', color: '#666' }}>
                Make this a required field
              </Typography>
            }
          />
        </Box>

        {/* Dropdown Options - Show only for Dropdown, Radio, Checkbox types */}
        {(fieldData.type === 'Dropdown' || fieldData.type === 'Radio' || fieldData.type === 'Checkbox') && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{
              mb: 1,
              color: '#666',
              fontSize: '12px',
              fontWeight: 500
            }}>
              Options
            </Typography>

            {/* Add new option */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                size="small"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="Add option"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddOption();
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#c0c0c0',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--clr-purple-light)',
                    },
                  },
                }}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={handleAddOption}
                disabled={!newOption.trim()}
                sx={{
                  minWidth: 'auto',
                  px: 2,
                  borderColor: 'var(--clr-purple-light)',
                  color: 'var(--clr-purple-light)',
                  '&:hover': {
                    borderColor: '#7c4dff',
                    backgroundColor: 'rgba(124, 77, 255, 0.04)',
                  },
                }}
              >
                <Add sx={{ fontSize: '16px' }} />
              </Button>
            </Box>

            {/* Display added options */}
            {dropdownOptions.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {dropdownOptions.map((option, index) => (
                  <Chip
                    key={index}
                    label={option}
                    onDelete={() => handleRemoveOption(option)}
                    size="small"
                    sx={{
                      backgroundColor: '#f5f5f5',
                      '& .MuiChip-deleteIcon': {
                        color: '#666',
                        '&:hover': {
                          color: '#f44336',
                        },
                      },
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
        )}
        </Box>

        {/* Footer Actions */}
        <Box sx={{
          display: 'flex',
          gap: 2,
          p: 3,
          borderTop: '1px solid #e0e0e0',
          justifyContent: 'flex-start'
        }}>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={
              !fieldData.name.trim() ||
              ((fieldData.type === 'Dropdown' || fieldData.type === 'Radio' || fieldData.type === 'Checkbox') && dropdownOptions.length === 0)
            }
            sx={{
              backgroundColor: 'var(--clr-purple-light)',
              color: 'white',
              px: 4,
              py: 1.5,
              textTransform: 'uppercase',
              fontWeight: 600,
              fontSize: '12px',
              '&:hover': {
                backgroundColor: '#7c4dff',
              },
              '&:disabled': {
                backgroundColor: '#ccc',
              },
            }}
          >
            ADD
          </Button>
          <Button
            onClick={handleClose}
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
  );
};

export default AddReportFieldDialog;
