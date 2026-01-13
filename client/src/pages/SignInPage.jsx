import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/UserService';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Chip,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FavoriteIcon from '@mui/icons-material/Favorite';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data } = await loginUser({ email, password });
      console.log('Login successful:', data);

      localStorage.setItem('token', data.token);
      localStorage.setItem('firstName', data.firstName);
      localStorage.setItem('type', data.type);

      navigate('/dashboard/dash-articles', {
        state: { firstName: data.firstName, type: data.type },
      });
    } catch (err) {
      console.error('Login failed:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
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
          top: '50%',
          left: -50,
          width: 150,
          height: 150,
          borderRadius: '50%',
          bgcolor: 'rgba(109, 46, 46, 0.1)',
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
              Welcome Back
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#6d2e2e', opacity: 0.8 }}
            >
              Sign in to manage your beauty collection and let others know your favorites!
            </Typography>
          </Stack>

          {/* Sign In Card */}
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
                  Sign In
                </Typography>
                <Typography variant="body2" sx={{ color: '#b26e6e' }}>
                  Use your email and password to continue
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
              <Box component="form" onSubmit={handleLogin}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon sx={{ color: '#b26e6e' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
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
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    sx={{
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
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                    sx={{
                      bgcolor: '#6d2e2e',
                      color: '#fff',
                      borderRadius: 30,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'none',
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
                    {isLoading ? 'Signing in...' : 'Sign In'}
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
                Don't have an account?{' '}
                <Box
                  component={Link}
                  to="/auth/signup"
                  sx={{
                    color: '#6d2e2e',
                    fontWeight: 600,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Sign Up
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
            By signing in, you agree to our Terms of Service and Privacy Policy
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default SignInPage;