import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleList from '../../components/ArticleList';
import { fetchArticles } from '../../services/ArticleService';
import {
  Box,
  Container,
  Typography,
  Stack,
  Chip,
  Button,
  CircularProgress,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FavoriteIcon from '@mui/icons-material/Favorite';

function ArticleListPage() {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        const { data } = await fetchArticles();
        const activeArticles = (data?.articles || []).filter((article) => article.isActive);
        setArticleList(activeArticles);
      } catch (err) {
        console.error('Error loading articles', err);
        setError('Unable to load articles right now.');
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

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
            Loading favorites...
          </Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#fffafa', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f1cfcf 0%, #e4b1b1 50%, #d79191 100%)',
          py: { xs: 8, md: 10 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.2)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -30,
            left: -30,
            width: 120,
            height: 120,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.15)',
          }}
        />

        <Container maxWidth="md">
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Chip
              icon={<FavoriteIcon />}
              label="My Collection"
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
              Chleo's Favorites
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
              A curated collection of my most-loved beauty products, skincare essentials, 
              and makeup must-haves that I reach for again and again.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Articles Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        {error ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
            }}
          >
            <Typography variant="body1" sx={{ color: '#b26e6e' }}>
              {error}
            </Typography>
          </Box>
        ) : articleList.length > 0 ? (
          <ArticleList articles={articleList} />
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              px: 3,
              bgcolor: '#f1cfcf',
              borderRadius: 4,
            }}
          >
            <FavoriteIcon sx={{ fontSize: 60, color: '#d79191', mb: 2 }} />
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#6d2e2e',
                mb: 1,
              }}
            >
              No favorites yet
            </Typography>
            <Typography variant="body1" sx={{ color: '#b26e6e' }}>
              Check back soon for new product reviews and recommendations!
            </Typography>
          </Box>
        )}
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
          <AutoAwesomeIcon sx={{ fontSize: 50, color: '#f1cfcf', mb: 3 }} />
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Playfair Display", serif',
              color: '#fff',
              mb: 2,
              fontSize: { xs: '1.75rem', md: '2.25rem' },
            }}
          >
            Want to Know More?
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
            Learn about my beauty journey and how I discover these amazing products.
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
            startIcon={<FavoriteIcon />}
          >
            About Me
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default ArticleListPage;