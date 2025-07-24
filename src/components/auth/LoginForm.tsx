import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  IconButton,
  InputAdornment,
  Link,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface LoginFormProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: (credentials: { username: string; password: string }) => void;
}

interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ open, onClose, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    username: '',
    password: '',
  });

  const handleClose = () => {
    setFormData({ username: '', password: '' });
    setErrors({ username: '', password: '' });
    onClose();
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = { username: '', password: '' };
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      onLoginSuccess(formData);
      handleClose();
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '480px',
          }
        }
      }}
    >
      <DialogContent sx={{ padding: '32px' }}>
        <Typography variant="h4" sx={{
          fontWeight: 600,
          color: 'var(--clr-text-primary)',
          mb: 1,
          fontSize: '28px'
        }}>
          Login with Staff Management
        </Typography>
        <Typography variant="body1" sx={{
          color: 'var(--clr-text-secondary)',
          mb: 4,
          fontSize: '16px'
        }}>
          Enter your details below.
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{
            color: 'var(--clr-text-secondary)',
            mb: 1,
            fontSize: '14px'
          }}>
            Username
          </Typography>
          <TextField
            fullWidth
            placeholder="Username"
            value={formData.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            onKeyDown={handleKeyPress}
            error={!!errors.username}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontSize: '16px',
              },
            }}
          />
          {errors.username && (
            <Typography variant="caption" sx={{
              color: 'var(--clr-scarlet)',
              fontSize: '12px',
              mt: 0.5,
              display: 'block'
            }}>
              {errors.username}
            </Typography>
          )}
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{
            color: 'var(--clr-text-secondary)',
            mb: 1,
            fontSize: '14px'
          }}>
            Password
          </Typography>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            onKeyDown={handleKeyPress}
            error={!!errors.password}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      sx={{ color: 'var(--clr-text-secondary)' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontSize: '16px',
              },
            }}
          />
          {errors.password && (
            <Typography variant="caption" sx={{
              color: 'var(--clr-scarlet)',
              fontSize: '12px',
              mt: 0.5,
              display: 'block'
            }}>
              {errors.password}
            </Typography>
          )}
        </Box>

        <Box sx={{ textAlign: 'right', mb: 3 }}>
          <Link
            href="#"
            sx={{
              color: 'var(--clr-purple)',
              textDecoration: 'none',
              fontSize: '14px',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Forgot Password ?
          </Link>
        </Box>

        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          sx={{
            backgroundColor: 'var(--clr-purple)',
            color: 'white',
            py: 1.5,
            fontSize: '16px',
            fontWeight: 600,
            borderRadius: '8px',
            textTransform: 'uppercase',
          }}
        >
          LOGIN
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;
