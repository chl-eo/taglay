import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLoginClick = () => {
    navigate('auth/signin');
    setMobileOpen(false);
  };

  const handleRegisterClick = () => {
    navigate('auth/signup');
    setMobileOpen(false);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Articles', path: '/articles' },
  ];

  const isActive = (path) => location.pathname === path;

  // Mobile Drawer
  const drawer = (
    <Box
      sx={{
        width: 280,
        height: '100%',
        bgcolor: '#6d2e2e',
        color: '#fff',
        p: 3,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <AutoAwesomeIcon sx={{ color: '#f1cfcf' }} />
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
            }}
          >
            Beyond Beauty
          </Typography>
        </Stack>
        <IconButton onClick={handleDrawerToggle} sx={{ color: '#fff' }}>
          <CloseIcon />
        </IconButton>
      </Stack>

      <List>
        {navLinks.map((link) => (
          <ListItem
            key={link.label}
            component={Link}
            to={link.path}
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: 2,
              mb: 1,
              bgcolor: isActive(link.path) ? 'rgba(255,255,255,0.15)' : 'transparent',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            <ListItemText
              primary={link.label}
              sx={{
                '& .MuiListItemText-primary': {
                  color: '#fff',
                  fontWeight: isActive(link.path) ? 600 : 400,
                },
              }}
            />
          </ListItem>
        ))}
      </List>

      <Stack spacing={2} sx={{ mt: 4 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleLoginClick}
          sx={{
            borderColor: '#f1cfcf',
            color: '#fff',
            borderRadius: 30,
            py: 1.2,
            '&:hover': {
              borderColor: '#fff',
              bgcolor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          Login
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={handleRegisterClick}
          sx={{
            bgcolor: '#f1cfcf',
            color: '#6d2e2e',
            borderRadius: 30,
            py: 1.2,
            '&:hover': {
              bgcolor: '#fff',
            },
          }}
        >
          Register
        </Button>
      </Stack>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={2}
        sx={{
          bgcolor: '#6d2e2e',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ py: 1, px: { xs: 0 } }}>
            {/* Logo */}
            <Stack
              component={Link}
              to="/"
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{
                textDecoration: 'none',
                color: '#fff',
              }}
            >
              <AutoAwesomeIcon sx={{ color: '#f1cfcf' }} />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                Beyond Beauty
              </Typography>
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Navigation */}
            <Stack
              direction="row"
              spacing={1}
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 3 }}
            >
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  component={Link}
                  to={link.path}
                  sx={{
                    color: '#fff',
                    fontWeight: isActive(link.path) ? 600 : 500,
                    position: 'relative',
                    px: 2,
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 6,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: isActive(link.path) ? '60%' : '0%',
                      height: 2,
                      bgcolor: '#f1cfcf',
                      borderRadius: 1,
                      transition: 'width 0.3s ease',
                    },
                    '&:hover::after': {
                      width: '60%',
                    },
                    '&:hover': {
                      bgcolor: 'transparent',
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Stack>

            {/* Desktop Buttons */}
            <Stack
              direction="row"
              spacing={2}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <Button
                variant="outlined"
                onClick={handleLoginClick}
                sx={{
                  borderColor: '#f1cfcf',
                  color: '#fff',
                  borderRadius: 30,
                  px: 3,
                  '&:hover': {
                    borderColor: '#fff',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                onClick={handleRegisterClick}
                sx={{
                  bgcolor: '#f1cfcf',
                  color: '#6d2e2e',
                  borderRadius: 30,
                  px: 3,
                  '&:hover': {
                    bgcolor: '#fff',
                  },
                }}
              >
                Register
              </Button>
            </Stack>

            {/* Mobile Menu Button */}
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                display: { xs: 'flex', md: 'none' },
                color: '#fff',
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Navbar;