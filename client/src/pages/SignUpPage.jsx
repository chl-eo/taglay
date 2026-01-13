import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/UserService';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Grid,
  InputAdornment,
  IconButton,
  Alert,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    contactNumber: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await registerUser(formData);
      alert('Registration successful! Please sign in.');
      navigate('/auth/signin');
    } catch (err) {
      console.error('Registration failed:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Common TextField styles
  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      '& fieldset': {
        borderColor: '#e4b1b1',
      },
      '&:hover fieldset': {
        borderColor: '#d79191',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#b26e6e',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#b26e6e',
      '&.Mui-focused': {
        color: '#6d2e2e',
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f1cfcf 0%, #e4b1b1 50%, #d79191 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.2)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -80,
          left: -80,
          width: 250,
          height: 250,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.15)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: -50,
          width: 150,
          height: 150,
          borderRadius: '50%',
          bgcolor: 'rgba(109, 46, 46, 0.1)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: -30,
          width: 100,
          height: 100,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.2)',
        }}
      />

      <Container maxWidth="sm">
        <Stack spacing={4} alignItems="center">
          {/* Logo & Header */}
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                textDecoration: 'none',
              }}
            >
              <AutoAwesomeIcon sx={{ color: '#6d2e2e', fontSize: 32 }} />
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  color: '#6d2e2e',
                }}
              >
                Beyond Beauty
              </Typography>
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                color: '#6d2e2e',
                mt: 2,
              }}
            >
              Join Us
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#6d2e2e', opacity: 0.8 }}
            >
              Create an account to start your beauty journey
            </Typography>
          </Stack>

          {/* Sign Up Card */}
          <Paper
            elevation={0}
            sx={{
              width: '100%',
              p: { xs: 3, sm: 5 },
              borderRadius: 4,
              bgcolor: 'rgba(255,255,255,0.95)',
              boxShadow: '0 10px 40px rgba(109, 46, 46, 0.15)',
            }}
          >
            <Stack spacing={3}>
              <Stack spacing={1} textAlign="center">
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 600,
                    color: '#6d2e2e',
                  }}
                >
                  Create Account
                </Typography>
                <Typography variant="body2" sx={{ color: '#b26e6e' }}>
                  Fill in your details below
                </Typography>
              </Stack>

              {/* Error Alert */}
              {error && (
                <Alert
                  severity="error"
                  sx={{
                    bgcolor: '#fff0f0',
                    color: '#6d2e2e',
                    '& .MuiAlert-icon': {
                      color: '#d79191',
                    },
                  }}
                >
                  {error}
                </Alert>
              )}

              {/* Form */}
              <Box component="form" onSubmit={handleRegister}>
                <Stack spacing={3}>
                  {/* First Name & Last Name */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonOutlineIcon sx={{ color: '#b26e6e' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={textFieldStyles}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonOutlineIcon sx={{ color: '#b26e6e' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={textFieldStyles}
                      />
                    </Grid>
                  </Grid>

                  {/* Username & Age */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonOutlineIcon sx={{ color: '#b26e6e' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={textFieldStyles}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CakeOutlinedIcon sx={{ color: '#b26e6e' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={textFieldStyles}
                      />
                    </Grid>
                  </Grid>

                  {/* Gender & Contact Number */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth sx={textFieldStyles}>
                        <InputLabel sx={{ color: '#b26e6e' }}>Gender</InputLabel>
                        <Select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          label="Gender"
                          required
                          sx={{
                            borderRadius: 2,
                          }}
                        >
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Contact Number"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneOutlinedIcon sx={{ color: '#b26e6e' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={textFieldStyles}
                      />
                    </Grid>
                  </Grid>

                  {/* Email */}
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon sx={{ color: '#b26e6e' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={textFieldStyles}
                  />

                  {/* Address */}
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeOutlinedIcon sx={{ color: '#b26e6e' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={textFieldStyles}
                  />

                  {/* Password */}
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon sx={{ color: '#b26e6e' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePassword}
                            edge="end"
                            sx={{ color: '#b26e6e' }}
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={textFieldStyles}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      bgcolor: '#6d2e2e',
                      color: '#fff',
                      borderRadius: 30,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      mt: 2,
                      '&:hover': {
                        bgcolor: '#5a2525',
                      },
                      '&:disabled': {
                        bgcolor: '#d79191',
                        color: '#fff',
                      },
                    }}
                    startIcon={<FavoriteIcon />}
                  >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                  </Button>
                </Stack>
              </Box>

              {/* Footer */}
              <Typography
                variant="body2"
                sx={{
                  textAlign: 'center',
                  color: '#b26e6e',
                  pt: 2,
                }}
              >
                Already have an account?{' '}
                <Box
                  component={Link}
                  to="/auth/signin"
                  sx={{
                    color: '#6d2e2e',
                    fontWeight: 600,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Sign In
                </Box>
              </Typography>
            </Stack>
          </Paper>

          {/* Terms */}
          <Typography
            variant="caption"
            sx={{
              color: '#6d2e2e',
              opacity: 0.7,
              textAlign: 'center',
            }}
          >
            By signing up, you agree to our Terms of Service and Privacy Policy
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default SignUpPage;