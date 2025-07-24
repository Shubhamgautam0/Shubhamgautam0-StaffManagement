import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../../components/auth';
import loginBg from '../../assets/images/login-bg.png';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleLoginSuccess = (credentials: { username: string; password: string }) => {
    console.log('Login successful:', credentials);
    navigate('/watch');
  };

  return (
    <Box
      className="home-page"
      sx={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Box className="home-header">
        <Box className="home-logo">
          <Typography variant="h5" className="logo-text">
            novagems
          </Typography>
          <Typography variant="body2" className="phone-number">
            +1 (604) 628-7015
          </Typography>
        </Box>
        <Button
          variant="contained"
          className="login-button"
          onClick={handleLoginOpen}
        >
          Login
        </Button>
      </Box>

      <Box className="home-content">
        <Typography variant="h1" className="main-title">
          Power up with New Generation
          <br />
          Management System
        </Typography>
        <Typography variant="h6" className="subtitle">
          Novagems is staff management system.Available on all major platform.
        </Typography>
      </Box>

      {/* Background Geometric Shapes */}
      <Box className="geometric-shapes">
        <Box className="shape shape-1" />
        <Box className="shape shape-2" />
        <Box className="shape shape-3" />
      </Box>

      {/* Login Form */}
      <LoginForm
        open={loginOpen}
        onClose={handleLoginClose}
        onLoginSuccess={handleLoginSuccess}
      />
    </Box>
  );
};

export default HomePage;
