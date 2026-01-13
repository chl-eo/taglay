import React, { useState, useEffect, useRef } from 'react';
import { fetchArticles, createArticle, updateArticle, toggleArticleStatus } from '../../services/ArticleService';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  Stack,
  Typography,
  Modal,
  Box,
  TextField,
  Switch,
  IconButton,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Base URL without /api for serving static files (images)
const BASE_URL = import.meta.env.VITE_LOCAL_HOST;

// Modal Style - Beauty Theme
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  maxHeight: '90vh',
  overflow: 'auto',
  bgcolor: '#fffafa',
  borderRadius: 4,
  boxShadow: '0 10px 40px rgba(109, 46, 46, 0.2)',
  p: 4,
};

// Image Preview Style - Beauty Theme
const imagePreviewStyle = {
  width: '100%',
  maxHeight: 200,
  objectFit: 'cover',
  borderRadius: 3,
  border: '2px solid #f1cfcf',
};

// Upload Box Style - Beauty Theme
const uploadBoxStyle = {
  border: '2px dashed #d79191',
  borderRadius: 3,
  padding: 20,
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: '#fffafa',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: '#6d2e2e',
    backgroundColor: '#f1cfcf',
  },
};

// TextField Style - Beauty Theme
const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    '& fieldset': {
      borderColor: '#e4b1b1',
    },
    '&:hover fieldset': {
      borderColor: '#d79191',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6d2e2e',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#b26e6e',
    '&.Mui-focused': {
      color: '#6d2e2e',
    },
  },
};

function DashArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editArticleId, setEditArticleId] = useState(null);
  const [newArticle, setNewArticle] = useState({
    name: '',
    title: '',
    content: [],
    isActive: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const { data } = await fetchArticles();
      setArticles(data.articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleOpen = () => {
    setIsEditing(false);
    setNewArticle({
      name: '',
      title: '',
      content: [],
      isActive: true,
    });
    setImageFile(null);
    setImagePreview(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditArticleId(null);
    setImageFile(null);
    setImagePreview(null);
  };

  const handleEdit = (id) => {
    const articleToEdit = articles.find((article) => article._id === id);
    if (articleToEdit) {
      setNewArticle(articleToEdit);
      setEditArticleId(id);
      setIsEditing(true);
      setImageFile(null);
      if (articleToEdit.image) {
        setImagePreview(`${BASE_URL}${articleToEdit.image}`);
      } else {
        setImagePreview(null);
      }
      setOpen(true);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSaveArticle = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newArticle.name);
      formData.append('title', newArticle.title);
      formData.append('content', JSON.stringify(newArticle.content));
      formData.append('isActive', newArticle.isActive);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (isEditing) {
        await updateArticle(editArticleId, formData);
      } else {
        await createArticle(formData);
      }
      loadArticles();
      handleClose();
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleToggleActive = async (id) => {
    try {
      await toggleArticleStatus(id);
      loadArticles();
    } catch (error) {
      console.error('Error toggling article status:', error);
    }
  };

  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      renderCell: (params) => (
        params.row.image ? (
          <Box
            component="img"
            src={params.row.image?.startsWith('http') ? params.row.image : `${BASE_URL}${params.row.image}`}
            alt={params.row.name}
            sx={{
              width: 50,
              height: 50,
              objectFit: 'cover',
              borderRadius: 2,
              border: '2px solid #f1cfcf',
            }}
          />
        ) : (
          <Box
            sx={{
              width: 50,
              height: 50,
              backgroundColor: '#f1cfcf',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FavoriteIcon sx={{ color: '#d79191', fontSize: 20 }} />
          </Box>
        )
      ),
    },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'title', headerName: 'Title', flex: 1 },
    {
      field: 'isActive',
      headerName: 'Active',
      flex: 1,
      renderCell: (params) => (
        <Switch
          checked={params.row.isActive}
          onChange={() => handleToggleActive(params.row._id)}
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: '#6d2e2e',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#d79191',
            },
            '& .MuiSwitch-track': {
              backgroundColor: '#e4b1b1',
            },
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleEdit(params.row._id)}
            sx={{
              bgcolor: '#6d2e2e',
              color: '#fff',
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#5a2525',
              },
            }}
          >
            Edit
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            color: '#6d2e2e',
          }}
        >
          Articles
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={handleOpen}
          sx={{
            bgcolor: '#6d2e2e',
            color: '#fff',
            borderRadius: 30,
            px: 3,
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              bgcolor: '#5a2525',
            },
          }}
        >
          Add Article
        </Button>
      </Stack>

      <DataGrid
        rows={articles}
        columns={columns}
        getRowId={(row) => row._id}
        loading={loading}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        disableSelectionOnClick
        rowHeight={70}
        sx={{
          border: 'none',
          bgcolor: '#fff',
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(109, 46, 46, 0.08)',
          '& .MuiDataGrid-columnHeaders': {
            bgcolor: '#f1cfcf',
            color: '#6d2e2e',
            fontWeight: 600,
            borderRadius: '12px 12px 0 0',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 600,
            color: '#6d2e2e',
          },
          '& .MuiDataGrid-row': {
            '&:hover': {
              bgcolor: '#fffafa',
            },
          },
          '& .MuiDataGrid-cell': {
            borderColor: '#f1cfcf',
            color: '#5a4a4a',
          },
          '& .MuiDataGrid-footerContainer': {
            bgcolor: '#fffafa',
            borderTop: '1px solid #f1cfcf',
          },
          '& .MuiTablePagination-root': {
            color: '#6d2e2e',
          },
          '& .MuiDataGrid-selectedRowCount': {
            color: '#b26e6e',
          },
          '& .MuiCircularProgress-root': {
            color: '#d79191',
          },
        }}
      />

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              color: '#6d2e2e',
              mb: 1,
            }}
          >
            {isEditing ? 'Edit Article' : 'Add New Article'}
          </Typography>
          <Typography variant="body2" sx={{ color: '#b26e6e', mb: 3 }}>
            {isEditing
              ? 'Update the article details below'
              : 'Fill in the details for your new article'}
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="Name"
              value={newArticle.name}
              onChange={(e) => setNewArticle({ ...newArticle, name: e.target.value })}
              fullWidth
              sx={textFieldStyle}
            />
            <TextField
              label="Title"
              value={newArticle.title}
              onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
              fullWidth
              sx={textFieldStyle}
            />
            <TextField
              label="Content"
              multiline
              rows={4}
              value={newArticle.content.join('\n')}
              onChange={(e) =>
                setNewArticle({ ...newArticle, content: e.target.value.split('\n') })
              }
              fullWidth
              sx={textFieldStyle}
            />

            {/* Image Upload Section */}
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: '#6d2e2e', mb: 1 }}
              >
                Article Image
              </Typography>
              <Typography variant="caption" sx={{ color: '#b26e6e' }}>
                Optional - Add a cover image for your article
              </Typography>
            </Box>

            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />

            {imagePreview ? (
              <Box sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Preview"
                  sx={imagePreviewStyle}
                />
                <IconButton
                  onClick={handleRemoveImage}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    '&:hover': {
                      backgroundColor: '#f1cfcf',
                    },
                  }}
                >
                  <DeleteIcon sx={{ color: '#6d2e2e' }} />
                </IconButton>
              </Box>
            ) : (
              <Box sx={uploadBoxStyle} onClick={handleUploadClick}>
                <CloudUploadIcon sx={{ fontSize: 48, color: '#b26e6e', mb: 1 }} />
                <Typography variant="body1" sx={{ color: '#6d2e2e', fontWeight: 500 }}>
                  Click to upload an image
                </Typography>
                <Typography variant="caption" sx={{ color: '#b26e6e' }}>
                  JPEG, PNG, GIF, or WebP (max 5MB)
                </Typography>
              </Box>
            )}
          </Stack>

          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                borderColor: '#d79191',
                color: '#6d2e2e',
                borderRadius: 30,
                px: 3,
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#6d2e2e',
                  bgcolor: '#f1cfcf',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveArticle}
              sx={{
                bgcolor: '#6d2e2e',
                color: '#fff',
                borderRadius: 30,
                px: 4,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: '#5a2525',
                },
              }}
            >
              {isEditing ? 'Save Changes' : 'Add Article'}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default DashArticleListPage;