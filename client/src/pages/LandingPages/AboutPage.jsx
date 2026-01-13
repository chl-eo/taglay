import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  Button,
  Avatar,
  Paper,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SpaIcon from '@mui/icons-material/Spa';
import BrushIcon from '@mui/icons-material/Brush';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import StarIcon from '@mui/icons-material/Star';

function AboutPage() {
  return (
    <Box sx={{ bgcolor: '#fffafa', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f1cfcf 0%, #e4b1b1 50%, #d79191 100%)',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 250,
            height: 250,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.2)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -40,
            left: -40,
            width: 150,
            height: 150,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.15)',
          }}
        />

        <Container maxWidth="md">
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Chip
              icon={<AutoAwesomeIcon />}
              label="About Me"
              sx={{
                bgcolor: 'rgba(255,255,255,0.9)',
                color: '#6d2e2e',
                fontWeight: 600,
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                color: '#6d2e2e',
                fontSize: { xs: '2rem', md: '3rem' },
                lineHeight: 1.2,
              }}
            >
              Hi, I'm Your Beauty Guide
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#6d2e2e',
                opacity: 0.9,
                maxWidth: 600,
                fontSize: '1.1rem',
                lineHeight: 1.8,
              }}
            >
              Welcome to Beyond Beauty! I'm passionate about helping you discover products that 
              make you feel confident and beautiful. Here, I share honest reviews, skincare tips, 
              and my favorite beauty finds.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Profile Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: '#f1cfcf',
                position: 'relative',
              }}
            >
              <Box
                component="img"
                src="http://localhost:8000/uploads/articles/0114696c-d162-448b-900d-9af10c2ef139.jpeg"
                alt="About me"
                sx={{
                  width: '100%',
                  height: 400,
                  objectFit: 'cover',
                  borderRadius: 3,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -20,
                  right: -20,
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: '#6d2e2e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FavoriteIcon sx={{ color: '#f1cfcf', fontSize: 36 }} />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack spacing={3}>
              <Chip
                label="My Story"
                sx={{
                  bgcolor: '#f1cfcf',
                  color: '#6d2e2e',
                  fontWeight: 600,
                  width: 'fit-content',
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 600,
                  color: '#6d2e2e',
                  fontSize: { xs: '1.75rem', md: '2.25rem' },
                }}
              >
                Chleo Nicole Montaño
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: '#b26e6e', lineHeight: 1.8 }}
              >
                My journey into the world of beauty started years ago when I struggled to find 
                products that actually worked for my skin. After countless trials, errors, and 
                empty wallets, I decided to share what I've learned with others.
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: '#b26e6e', lineHeight: 1.8 }}
              >
                Whether you're a makeup newbie or a skincare expert, I hope my honest reviews 
                and tips help you on your own beauty journey. Remember, beauty isn't about perfection 
                — it's about feeling good in your own skin. ♥ 
              </Typography>

              {/* Stats */}
              <Stack direction="row" spacing={4} sx={{ pt: 2 }}>
                {[
                  { number: '20+', label: 'Reviews' },
                  { number: '3+', label: 'Years' },
                  { number: '100%', label: 'Honest' },
                ].map((stat, index) => (
                  <Box key={index} textAlign="center">
                    <Typography
                      variant="h4"
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 700,
                        color: '#6d2e2e',
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#b26e6e' }}>
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Values Section */}
      <Box sx={{ bgcolor: '#f1cfcf', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: 6 }}>
            <Chip
              icon={<StarIcon />}
              label="My Values"
              sx={{
                bgcolor: '#fff',
                color: '#6d2e2e',
                fontWeight: 600,
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                color: '#6d2e2e',
                fontSize: { xs: '1.75rem', md: '2.25rem' },
              }}
            >
              What I Believe In
            </Typography>
          </Stack>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 4,
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            {[
              {
                icon: <VolunteerActivismIcon sx={{ fontSize: 40 }} />,
                title: 'Honest Reviews',
                description:
                  'No sponsored fluff here. I only recommend products I genuinely love and use myself.',
              },
              {
                icon: <SpaIcon sx={{ fontSize: 40 }} />,
                title: 'Self-Care First',
                description:
                  'Beauty is about feeling good, not meeting impossible standards. Your routine should bring you joy.',
              },
              {
                icon: <BrushIcon sx={{ fontSize: 40 }} />,
                title: 'Every Budget Welcome',
                description:
                  'Great beauty doesn\'t require a fortune. I share finds from drugstore gems to splurge-worthy treats.',
              },
            ].map((value, index) => (
              <Card
                key={index}
                sx={{
                  width: 340,
                  textAlign: 'center',
                  p: 3,
                  borderRadius: 4,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(109, 46, 46, 0.15)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: '#f1cfcf',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    color: '#6d2e2e',
                  }}
                >
                  {value.icon}
                </Box>
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      color: '#6d2e2e',
                      mb: 2,
                      fontWeight: 600,
                    }}
                  >
                    {value.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#b26e6e' }}>
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Journey Timeline */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: 6 }}>
          <Chip
            label="My Journey"
            sx={{
              bgcolor: '#f1cfcf',
              color: '#6d2e2e',
              fontWeight: 600,
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              color: '#6d2e2e',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
            }}
          >
            How It All Started
          </Typography>
        </Stack>

        <Stack spacing={0}>
          {[
            {
              year: '2022',
              title: 'The Beginning',
              description:
                'Started experimenting with skincare after struggling with my skin for years. Began documenting what worked and what didn\'t.',
            },
            {
              year: '2023',
              title: 'Growing Passion',
              description:
                'Dove deeper into understanding ingredients, formulations, and what makes products truly effective.',
            },
            {
              year: '2024',
              title: 'Beyond Beauty Born',
              description:
                'Launched this blog to share my discoveries, honest reviews, and help others on their beauty journey.',
            },
            {
              year: 'Today',
              title: 'Still Learning',
              description:
                'Continuing to explore new products, trends, and ways to help you find your perfect beauty routine.',
            },
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                gap: 3,
                position: 'relative',
                pb: 4,
              }}
            >
              {/* Timeline Line */}
              {index < 3 && (
                <Box
                  sx={{
                    position: 'absolute',
                    left: 39,
                    top: 50,
                    width: 2,
                    height: 'calc(100% - 30px)',
                    bgcolor: '#e4b1b1',
                  }}
                />
              )}

              {/* Year Circle */}
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: '#6d2e2e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  zIndex: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: index === 3 ? '0.75rem' : '0.875rem',
                  }}
                >
                  {item.year}
                </Typography>
              </Box>

              {/* Content */}
              <Box sx={{ pt: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    color: '#6d2e2e',
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#b26e6e', lineHeight: 1.7 }}>
                  {item.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6d2e2e 0%, #b26e6e 100%)',
          py: { xs: 8, md: 10 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <FavoriteIcon sx={{ fontSize: 50, color: '#f1cfcf', mb: 3 }} />
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Playfair Display", serif',
              color: '#fff',
              mb: 2,
              fontSize: { xs: '1.75rem', md: '2.25rem' },
            }}
          >
            Let's Connect!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#f1cfcf',
              mb: 4,
              maxWidth: 500,
              mx: 'auto',
              lineHeight: 1.8,
            }}
          >
            Have questions or product recommendations? I'd love to hear from you! 
            Check out my articles or reach out anytime.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              component={Link}
              to="/articles"
              variant="contained"
              size="large"
              sx={{
                bgcolor: '#fff',
                color: '#6d2e2e',
                borderRadius: 30,
                px: 4,
                '&:hover': {
                  bgcolor: '#f1cfcf',
                },
              }}
              startIcon={<AutoAwesomeIcon />}
            >
              Browse Articles
            </Button>
            <Button
              component="a"
              href="mailto:chleonicolemontano@gmail.com"
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#f1cfcf',
                color: '#fff',
                borderRadius: 30,
                px: 4,
                '&:hover': {
                  borderColor: '#fff',
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Get in Touch
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default AboutPage;