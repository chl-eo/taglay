const Article = require('../models/Article');
const fs = require('fs');
const path = require('path');

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json({ articles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createArticle = async (req, res) => {
  try {
    console.log('=== CREATE ARTICLE ===');
    console.log('Body:', req.body);
    console.log('File:', req.file);

    // Validate required fields
    if (!req.body.name || !req.body.title || !req.body.content) {
      return res.status(400).json({ 
        message: 'Missing required fields: name, title, and content are required' 
      });
    }

    // Safely parse content
    let content;
    try {
      content = typeof req.body.content === 'string' 
        ? JSON.parse(req.body.content) 
        : req.body.content;
    } catch (e) {
      // If parsing fails, split by newline or wrap in array
      content = req.body.content.includes('\n') 
        ? req.body.content.split('\n') 
        : [req.body.content];
    }

    // Filter out empty strings from content
    content = content.filter(item => item && item.trim() !== '');

    if (content.length === 0) {
      return res.status(400).json({ message: 'Content cannot be empty' });
    }

    const articleData = {
      name: req.body.name,
      title: req.body.title,
      content: content,
      isActive: req.body.isActive === 'true' || req.body.isActive === true,
    };

    // Add image path if file was uploaded
    if (req.file) {
      articleData.image = `/uploads/articles/${req.file.filename}`;
    }

    console.log('Article data to save:', articleData);

    const article = await Article.create(articleData);
    console.log('Article created successfully:', article._id);
    res.status(201).json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ message: 'An article with this name already exists' });
    }
    
    res.status(400).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    console.log('=== UPDATE ARTICLE ===');
    console.log('ID:', req.params.id);
    console.log('Body:', req.body);
    console.log('File:', req.file);

    // Safely parse content
    let content;
    try {
      content = typeof req.body.content === 'string' 
        ? JSON.parse(req.body.content) 
        : req.body.content;
    } catch (e) {
      content = req.body.content.includes('\n') 
        ? req.body.content.split('\n') 
        : [req.body.content];
    }

    // Filter out empty strings
    content = content.filter(item => item && item.trim() !== '');

    const articleData = {
      name: req.body.name,
      title: req.body.title,
      content: content,
      isActive: req.body.isActive === 'true' || req.body.isActive === true,
    };

    // If new image uploaded
    if (req.file) {
      // Delete old image if exists
      const oldArticle = await Article.findById(req.params.id);
      if (oldArticle && oldArticle.image) {
        const oldImagePath = path.join(__dirname, '..', oldArticle.image);
        console.log('Deleting old image:', oldImagePath);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      articleData.image = `/uploads/articles/${req.file.filename}`;
    }

    console.log('Article data to update:', articleData);

    const article = await Article.findByIdAndUpdate(
      req.params.id,
      articleData,
      { new: true }
    );

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    console.log('Article updated successfully:', article._id);
    res.json(article);
  } catch (error) {
    console.error('Error updating article:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({ message: 'An article with this name already exists' });
    }
    
    res.status(400).json({ message: error.message });
  }
};

const toggleArticleStatus = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    article.isActive = !article.isActive;
    await article.save();
    res.json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getArticleByName = async (req, res) => {
  try {
    const article = await Article.findOne({ 
      name: req.params.name, 
      isActive: true 
    });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json({ article });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  getArticles, 
  createArticle, 
  updateArticle, 
  toggleArticleStatus, 
  getArticleByName 
};