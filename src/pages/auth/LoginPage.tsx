import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Link,
  Button,
  Paper,
  Container,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import loginBg from '../../assets/images/login-bg.png';

interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    username: '',
    password: '',
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
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
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      console.log('Login successful:', formData);
      navigate('/watch');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 0,
        },
      }}
    >
      {/* Back to Home Button */}
      <Button
        onClick={handleBackToHome}
        sx={{
          position: 'absolute',
          top: 24,
          left: 24,
          color: 'white',
          zIndex: 10,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        ← Back to Home
      </Button>

      {/* Login Form Container */}
      <Container maxWidth="sm" sx={{ zIndex: 1 }}>
        <Paper
          elevation={24}
          sx={{
            p: 4,
            borderRadius: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            maxWidth: '480px',
            margin: '0 auto',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{
              fontWeight: 600,
              color: 'var(--clr-text-primary)',
              mb: 1,
              fontSize: '28px'
            }}>
              Login with Novagems
            </Typography>
            <Typography variant="body1" sx={{
              color: 'var(--clr-text-secondary)',
              fontSize: '16px'
            }}>
              Enter your details below.
            </Typography>
          </Box>

          {/* Username Field */}
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

          {/* Password Field */}
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

          {/* Forgot Password Link */}
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

          {/* Login Button */}
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
              '&:hover': {
                backgroundColor: 'var(--clr-purple-light)',
              },
            }}
          >
            LOGIN
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
