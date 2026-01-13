import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchArticleByName } from '../../services/ArticleService';
import NotFoundPage from '../NotFoundPage.jsx';
import {
  Box,
  Container,
  Typography,
  Stack,
  Chip,
  Button,
  Paper,
  CircularProgress,
  Divider,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// Base URL for images (without /api)
const BASE_URL = import.meta.env.VITE_LOCAL_HOST;

function ArticlePage() {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setIsLoading(true);
        setError('');
        const { data } = await fetchArticleByName(name);
        const fetchedArticle = data?.article;
        if (fetchedArticle && fetchedArticle.isActive !== false) {
          setArticle(fetchedArticle);
        } else {
          setArticle(null);
        }
      } catch (err) {
        if (err?.response?.status === 404) {
          setArticle(null);
        } else {
          console.error('Error loading article', err);
          setError('Unable to load this article right now.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [name]);

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#fffafa',
        }}
      >
        <Stack spacing={2} alignItems="center">
          <CircularProgress sx={{ color: '#d79191' }} />
          <Typography variant="body1" sx={{ color: '#b26e6e' }}>
            Loading article...
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#fffafa',
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Typography variant="body1" sx={{ color: '#b26e6e' }}>
            {error}
          </Typography>
          <Button
            component={Link}
            to="/articles"
            variant="outlined"
            sx={{
              borderColor: '#d79191',
              color: '#6d2e2e',
              borderRadius: 30,
              '&:hover': {
                borderColor: '#6d2e2e',
                bgcolor: '#f1cfcf',
              },
            }}
          >
            Back to Articles
          </Button>
        </Stack>
      </Box>
    );
  }

  if (!article) {
    return <NotFoundPage />;
  }

  const contentArray = Array.isArray(article.content)
    ? article.content
    : article.content
      ? [article.content]
      : [];

  const words = contentArray.join(' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(2, Math.ceil(words / 70));

  return (
    <Box sx={{ bgcolor: '#fffafa', minHeight: '100vh' }}>
      {/* Hero Section with Image */}
      <Box
        sx={{
          background: article.image
            ? 'transparent'
            : 'linear-gradient(135deg, #f1cfcf 0%, #e4b1b1 50%, #d79191 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Article Image as Hero */}
        {article.image ? (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: { xs: 300, md: 450 },
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src={`${BASE_URL}${article.image}`}
              alt={article.title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* Gradient Overlay */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '60%',
                background: 'linear-gradient(to top, rgba(109, 46, 46, 0.9) 0%, transparent 100%)',
              }}
            />
            {/* Back Button */}
            <Button
              component={Link}
              to="/articles"
              startIcon={<ArrowBackIcon />}
              sx={{
                position: 'absolute',
                top: 20,
                left: 20,
                bgcolor: 'rgba(255,255,255,0.9)',
                color: '#6d2e2e',
                borderRadius: 30,
                px: 2,
                '&:hover': {
                  bgcolor: '#fff',
                },
              }}
            >
              Back
            </Button>
            {/* Title Overlay */}
            <Container
              maxWidth="md"
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                pb: 4,
                mx: 'auto',
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    icon={<FavoriteIcon sx={{ fontSize: 16 }} />}
                    label="Beauty"
                    size="small"
                    sx={{
                      bgcolor: '#f1cfcf',
                      color: '#6d2e2e',
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    icon={<AccessTimeIcon sx={{ fontSize: 16 }} />}
                    label={`${minutes} min read`}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: '#fff',
                    }}
                  />
                </Stack>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    color: '#fff',
                    fontSize: { xs: '1.75rem', md: '2.5rem' },
                    lineHeight: 1.2,
                  }}
                >
                  {article.title}
                </Typography>
              </Stack>
            </Container>
          </Box>
        ) : (
          // Fallback Hero without Image
          <Box sx={{ py: { xs: 6, md: 8 } }}>
            <Container maxWidth="md">
              <Button
                component={Link}
                to="/articles"
                startIcon={<ArrowBackIcon />}
                sx={{
                  color: '#6d2e2e',
                  mb: 3,
                  '&:hover': {
                    bgcolor: 'rgba(109, 46, 46, 0.05)',
                  },
                }}
              >
                Back to Articles
              </Button>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    icon={<FavoriteIcon sx={{ fontSize: 16 }} />}
                    label="Beauty"
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.9)',
                      color: '#6d2e2e',
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    icon={<AccessTimeIcon sx={{ fontSize: 16 }} />}
                    label={`${minutes} min read`}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(109, 46, 46, 0.2)',
                      color: '#6d2e2e',
                    }}
                  />
                </Stack>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    color: '#6d2e2e',
                    fontSize: { xs: '1.75rem', md: '2.5rem' },
                    lineHeight: 1.2,
                  }}
                >
                  {article.title}
                </Typography>
              </Stack>
            </Container>
          </Box>
        )}
      </Box>

      {/* Article Content */}
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            bgcolor: '#fff',
            boxShadow: '0 4px 20px rgba(109, 46, 46, 0.08)',
          }}
        >
          {/* Article Body */}
          <Box sx={{ mb: 4 }}>
            {contentArray.map((paragraph, idx) => (
              <Typography
                key={`${article.name}-${idx}`}
                variant="body1"
                sx={{
                  color: '#5a4a4a',
                  lineHeight: 1.9,
                  fontSize: '1.1rem',
                  mb: 3,
                  '&:last-child': {
                    mb: 0,
                  },
                }}
              >
                {paragraph}
              </Typography>
            ))}
          </Box>

          <Divider sx={{ borderColor: '#f1cfcf', my: 4 }} />

          {/* Tags Section */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 4 }}>
            <LocalOfferIcon sx={{ color: '#b26e6e', fontSize: 20 }} />
            <Typography variant="body2" sx={{ color: '#b26e6e', mr: 1 }}>
              Tags:
            </Typography>
            {['Beauty', 'Skincare', 'Favorites'].map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  bgcolor: '#f1cfcf',
                  color: '#6d2e2e',
                  fontSize: '0.75rem',
                }}
              />
            ))}
          </Stack>

          {/* CTA Card */}
          <Box
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              background: 'linear-gradient(135deg, #f1cfcf 0%, #e4b1b1 100%)',
              textAlign: 'center',
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 40, color: '#6d2e2e', mb: 2 }} />
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                color: '#6d2e2e',
                mb: 1,
              }}
            >
              Discover More Favorites
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: '#6d2e2e', opacity: 0.9, mb: 3, maxWidth: 400, mx: 'auto' }}
            >
              Explore more of my favorite beauty products and skincare recommendations.
            </Typography>
            <Button
              component={Link}
              to="/articles"
              variant="contained"
              sx={{
                bgcolor: '#6d2e2e',
                color: '#fff',
                borderRadius: 30,
                px: 4,
                '&:hover': {
                  bgcolor: '#5a2525',
                },
              }}
              startIcon={<FavoriteIcon />}
            >
              Browse All Articles
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* Bottom CTA */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6d2e2e 0%, #b26e6e 100%)',
          py: { xs: 6, md: 8 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Playfair Display", serif',
              color: '#fff',
              mb: 2,
              fontSize: { xs: '1.5rem', md: '2rem' },
            }}
          >
            Enjoyed This Article?
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
            Learn more about my beauty journey and the story behind Beyond Beauty.
          </Typography>
          <Button
            component={Link}
            to="/about"
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
          >
            About Me
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default ArticlePage;