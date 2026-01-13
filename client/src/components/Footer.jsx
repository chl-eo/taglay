import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Stack,
  IconButton,
  Divider,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTwitter, faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#6d2e2e',
        color: '#f1cfcf',
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 4, md: 8 }}
          justifyContent="space-between"
        >
          {/* About Section */}
          <Box sx={{ maxWidth: 300 }}>
            <Typography
              variant="h6"
              sx={{
                color: '#fff',
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                mb: 2,
              }}
            >
              Beyond Beauty
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: '#e4b1b1', lineHeight: 1.8 }}
            >
              Sharing my favorite makeup products, skincare routines, and beauty tips 
              to help you discover your own radiant glow.
            </Typography>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                color: '#fff',
                fontWeight: 600,
                mb: 2,
              }}
            >
              Quick Links
            </Typography>
            <Stack spacing={1}>
              {[
                { label: 'Home', path: '/' },
                { label: 'Articles', path: '/articles' },
                { label: 'About', path: '/about' },
              ].map((link) => (
                <Typography
                  key={link.label}
                  component={Link}
                  to={link.path}
                  variant="body2"
                  sx={{
                    color: '#e4b1b1',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: '#fff',
                    },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>
          </Box>

          {/* Contact Section */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                color: '#fff',
                fontWeight: 600,
                mb: 2,
              }}
            >
              Contact
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ color: '#e4b1b1' }}>
                chleonicolemontano@gmail.com
              </Typography>
              <Typography variant="body2" sx={{ color: '#e4b1b1' }}>
                09**-***-****
              </Typography>
            </Stack>
          </Box>

          {/* Social Links */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                color: '#fff',
                fontWeight: 600,
                mb: 2,
              }}
            >
              Follow Me
            </Typography>
            <Stack direction="row" spacing={1}>
              {[
                { icon: faInstagram, url: 'https://instagram.com' },
                { icon: faTiktok, url: 'https://tiktok.com' },
                { icon: faFacebook, url: 'https://facebook.com' },
                { icon: faTwitter, url: 'https://twitter.com' },
              ].map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: '#e4b1b1',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: '#fff',
                      bgcolor: '#b26e6e',
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </IconButton>
              ))}
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 4 }} />

        {/* Footer Bottom */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" sx={{ color: '#e4b1b1' }}>
            © {currentYear} Beyond Beauty. All rights reserved.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#e4b1b1',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            Made with <FavoriteIcon sx={{ fontSize: 16, color: '#d79191' }} /> for beauty lovers
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;