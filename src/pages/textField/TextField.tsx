import React from 'react';
import {
    Box,
    Typography,
    TextField,
    FormHelperText,
} from '@mui/material';

interface CustomTextFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    error?: boolean;
    helperText?: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    multiline?: boolean;
    rows?: number;
    InputLabelProps?: any;
    [key: string]: any;
}

const Textfield: React.FC<CustomTextFieldProps> = ({
    label,
    value,
    onChange,
    required = false,
    error = false,
    helperText,
    type = 'text',
    placeholder,
    disabled = false,
    multiline = false,
    rows,
    InputLabelProps,
    ...props
}) => {
    return (
        <Box className="form-field mb-3">
            <Typography variant="body2" className="form-field-label">
                {label} {required && <span style={{ color: '#d32f2f' }}>*</span>}
            </Typography>
            <TextField
                fullWidth
                size="small"
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                error={error}
                placeholder={placeholder}
                disabled={disabled}
                multiline={multiline}
                rows={rows}
                InputLabelProps={InputLabelProps}
                className="input-field"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '4px',
                    },
                }}
                {...props}
            />
            {error && helperText && (
                <FormHelperText error sx={{ mt: 0.5 }}>
                    {helperText}
                </FormHelperText>
            )}
        </Box>
    );
};

export default Textfield;