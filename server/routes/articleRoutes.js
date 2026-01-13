const express = require('express');
const { 
  getArticles, 
  createArticle, 
  updateArticle, 
  toggleArticleStatus, 
  getArticleByName 
} = require('../controllers/articleController');
const upload = require('../middleware/upload'); // ← Add this

const router = express.Router();

// GET methods 
router.get('/', getArticles);
router.get('/:name', getArticleByName);

// POST - create (with optional image upload)
router.post('/', upload.single('image'), createArticle); // ← Updated

// PUT and PATCH - update (with optional image upload)
router.put('/:id', upload.single('image'), updateArticle); // ← Updated
router.patch('/:id/toggle', toggleArticleStatus);

module.exports = router;