import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles } from '../../services/ArticleService';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Paper,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SparklesIcon from '@mui/icons-material/AutoAwesome';
import DiamondIcon from '@mui/icons-material/Diamond';
import BrushIcon from '@mui/icons-material/Brush';
import PaletteIcon from '@mui/icons-material/Palette';
import StarIcon from '@mui/icons-material/Star';

// Base URL for images
const BASE_URL = import.meta.env.VITE_LOCAL_HOST;

// Custom Beauty Theme
const beautyTheme = createTheme({
  palette: {
    primary: {
      light: '#f1cfcf',
      main: '#d79191',
      dark: '#6d2e2e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#e4b1b1',
      main: '#b26e6e',
      dark: '#6d2e2e',
      contrastText: '#fff',
    },
    background: {
      default: '#fffafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#6d2e2e',
      secondary: '#b26e6e',
    },
  },
  typography: {
    fontFamily: '"Playfair Display", "Georgia", serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    body1: {
      fontFamily: '"Inter", "Helvetica", sans-serif',
    },
    body2: {
      fontFamily: '"Inter", "Helvetica", sans-serif',
    },
    button: {
      fontFamily: '"Inter", "Helvetica", sans-serif',
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: '12px 28px',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(109, 46, 46, 0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
  },
});

function HomePage() {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        const { data } = await fetchArticles();
        const activeArticles = (data?.articles || [])
          .filter((article) => article.isActive)
          .slice(0, 3);
        setFeaturedArticles(activeArticles);
      } catch (err) {
        console.error('Error loading articles', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  return (
    <ThemeProvider theme={beautyTheme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        
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
              bottom: -50,
              left: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.15)',
            }}
          />

          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <Stack spacing={3}>
                  <Chip
                    label="Beauty & Skincare"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.9)',
                      color: 'primary.dark',
                      fontWeight: 600,
                      width: 'fit-content',
                    }}
                  />
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      color: '#6d2e2e',
                      lineHeight: 1.2,
                    }}
                  >
                    Discover Your
                    <br />
                    <Box component="span" sx={{ color: '#fff' }}>
                      Beyond Beauty
                    </Box>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.125rem',
                      color: '#6d2e2e',
                      opacity: 0.9,
                      maxWidth: 500,
                    }}
                  >
                    Explore my favorite makeup products, skincare routines, and beauty tips 
                    that help you glow from within. Your journey to radiant beauty starts here.
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
                    <Button
                      component={Link}
                      to="/articles"
                      variant="contained"
                      size="large"
                      sx={{
                        bgcolor: '#6d2e2e',
                        '&:hover': { bgcolor: '#5a2525' },
                      }}
                      startIcon={<FavoriteIcon />}
                    >
                      Browse Favorites
                    </Button>
                    <Button
                      component={Link}
                      to="/about"
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: '#6d2e2e',
                        color: '#6d2e2e',
                        '&:hover': {
                          borderColor: '#5a2525',
                          bgcolor: 'rgba(109, 46, 46, 0.05)',
                        },
                      }}
                    >
                      About Me
                    </Button>
                  </Stack>

                  {/* Stats */}
                  <Stack direction="row" spacing={4} sx={{ pt: 4 }}>
                    <Box>
                      <Typography variant="h4" sx={{ color: '#6d2e2e', fontWeight: 700 }}>
                        20+
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6d2e2e', opacity: 0.8 }}>
                        Product Reviews
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h4" sx={{ color: '#6d2e2e', fontWeight: 700 }}>
                        ☆
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6d2e2e', opacity: 0.8 }}>
                        Holy Grails
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h4" sx={{ color: '#6d2e2e', fontWeight: 700 }}>
                        100%
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6d2e2e', opacity: 0.8 }}>
                        Honest Reviews
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 4,
                      bgcolor: 'rgba(255,255,255,0.9)',
                      maxWidth: 400,
                    }}
                  >
                    <Box
                      component="img"
                      src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80"
                      alt="Makeup products flatlay"
                      sx={{
                        width: '100%',
                        height: 350,
                        objectFit: 'cover',
                        borderRadius: 3,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 2,
                        color: 'text.secondary',
                        textAlign: 'center',
                        fontStyle: 'italic',
                      }}
                    >
                      "You are imperfect, permanently and inevitably flawed. And you are beautiful."  Amy Bloom 
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Chip
              label="Categories"
              sx={{
                bgcolor: '#f1cfcf',
                color: '#6d2e2e',
                fontWeight: 600,
                mb: 2,
              }}
            />
            <Typography
              variant="h2"
              sx={{ color: 'text.primary', fontSize: { xs: '2rem', md: '2.5rem' } }}
            >
              What You'll Find Here
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', mt: 2, maxWidth: 600, mx: 'auto' }}
            >
              From everyday essentials to splurge-worthy treats, discover curated beauty content
            </Typography>
          </Box>

          <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 4,
            maxWidth: 700,
            mx: 'auto',
          }}
        >
          {[
            {
              icon: <BrushIcon sx={{ fontSize: 40 }} />,
              title: 'Makeup Reviews',
              description:
                'Honest reviews of foundations, lipsticks, eyeshadows, and more from drugstore to high-end.',
            },
            {
              icon: <DiamondIcon sx={{ fontSize: 40 }} />,
              title: 'Skincare Favorites',
              description:
                'My tried-and-true skincare products that keep my skin healthy, hydrated, and glowing.',
            },
            {
              icon: <PaletteIcon sx={{ fontSize: 40 }} />,
              title: 'Beauty Tips',
              description:
                'Application techniques, color matching tips, and secrets to achieving flawless looks.',
            },
          ].map((feature, index) => (
            <Card
              key={index}
              sx={{
                width: 300,
                textAlign: 'center',
                p: 3,
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
                {feature.icon}
                </Box>
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ color: 'text.primary', mb: 2, fontWeight: 600 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>

        {/* Featured Articles Section */}
        <Box sx={{ bgcolor: '#f1cfcf', py: { xs: 8, md: 10 } }}>
          <Container maxWidth="lg">
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              sx={{ mb: 6 }}
            >
              <Box>
                <Chip
                  icon={<StarIcon />}
                  label="Featured"
                  sx={{
                    bgcolor: '#fff',
                    color: '#6d2e2e',
                    fontWeight: 600,
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h2"
                  sx={{ color: '#6d2e2e', fontSize: { xs: '2rem', md: '2.5rem' } }}
                >
                  Latest Favorites
                </Typography>
              </Box>
              <Button
                component={Link}
                to="/articles"
                variant="outlined"
                sx={{
                  borderColor: '#6d2e2e',
                  color: '#6d2e2e',
                  mt: { xs: 2, sm: 0 },
                  '&:hover': {
                    borderColor: '#5a2525',
                    bgcolor: 'rgba(109, 46, 46, 0.05)',
                  },
                }}
              >
                View All Articles
              </Button>
            </Stack>

            {isLoading ? (
              <Typography sx={{ color: '#6d2e2e' }}>Loading articles...</Typography>
            ) : featuredArticles.length > 0 ? (
              <Grid container spacing={4}>
                {featuredArticles.map((article) => {
                  const words = article.content.join(' ').split(' ').length;
                  const minutes = Math.max(2, Math.ceil(words / 70));

                  return (
                    <Grid item xs={12} md={4} key={article.name}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 12px 40px rgba(109, 46, 46, 0.2)',
                          },
                        }}
                      >
                        {article.image ? (
                          <CardMedia
                            component="img"
                            height="200"
                            image={`${BASE_URL}${article.image}`}
                            alt={article.title}
                            sx={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <Box
                            sx={{
                              height: 200,
                              bgcolor: '#e4b1b1',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <FavoriteIcon sx={{ fontSize: 60, color: '#fff', opacity: 0.5 }} />
                          </Box>
                        )}
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                            <Chip
                              label="Beauty"
                              size="small"
                              sx={{
                                bgcolor: '#f1cfcf',
                                color: '#6d2e2e',
                                fontWeight: 500,
                              }}
                            />
                            <Typography
                              variant="caption"
                              sx={{ color: 'text.secondary', alignSelf: 'center' }}
                            >
                              {minutes} min read
                            </Typography>
                          </Stack>
                          <Typography
                            variant="h6"
                            sx={{
                              color: 'text.primary',
                              fontWeight: 600,
                              mb: 1,
                              lineHeight: 1.3,
                            }}
                          >
                            {article.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary', mb: 2 }}
                          >
                            {article.content[0].substring(0, 100)}...
                          </Typography>
                          <Button
                            component={Link}
                            to={`/articles/${article.name}`}
                            variant="text"
                            sx={{
                              color: '#b26e6e',
                              fontWeight: 600,
                              p: 0,
                              '&:hover': {
                                bgcolor: 'transparent',
                                color: '#6d2e2e',
                              },
                            }}
                          >
                            Read More →
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <Typography sx={{ color: '#6d2e2e' }}>No articles available yet.</Typography>
            )}
          </Container>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #6d2e2e 0%, #b26e6e 100%)',
            py: { xs: 8, md: 10 },
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            <AutoAwesomeIcon sx={{ fontSize: 50, color: '#f1cfcf', mb: 3 }} />
            <Typography
              variant="h3"
              sx={{
                color: '#fff',
                mb: 2,
                fontSize: { xs: '1.75rem', md: '2.25rem' },
              }}
            >
              Want to Know My Holy Grails?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#f1cfcf',
                mb: 4,
                maxWidth: 500,
                mx: 'auto',
              }}
            >
              Discover the products I reach for every single day and can't live without.
            </Typography>
            <Button
              component={Link}
              to="/articles"
              variant="contained"
              size="large"
              sx={{
                bgcolor: '#fff',
                color: '#6d2e2e',
                '&:hover': {
                  bgcolor: '#f1cfcf',
                },
              }}
              startIcon={<FavoriteIcon />}
            >
              See My Favorites
            </Button>
          </Container>
        </Box>

        {/* Footer */}
        <Box sx={{ bgcolor: '#6d2e2e', py: 4 }}>
          <Container maxWidth="lg">
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Typography variant="body2" sx={{ color: '#f1cfcf' }}>
                © 2026 Beyond Beauty. Made with ♡
              </Typography>
              <Stack direction="row" spacing={3}>
                <Typography
                  component={Link}
                  to="/articles"
                  variant="body2"
                  sx={{ color: '#f1cfcf', textDecoration: 'none', '&:hover': { color: '#fff' } }}
                >
                  Articles
                </Typography>
                <Typography
                  component={Link}
                  to="/about"
                  variant="body2"
                  sx={{ color: '#f1cfcf', textDecoration: 'none', '&:hover': { color: '#fff' } }}
                >
                  About
                </Typography>
              </Stack>
            </Stack>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default HomePage;