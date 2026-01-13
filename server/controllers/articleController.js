const Article = require('../models/Article');

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
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

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

    content = content.filter(item => item && item.trim() !== '');

    const articleData = {
      name: req.body.name,
      title: req.body.title,
      content: content,
      isActive: req.body.isActive === 'true' || req.body.isActive === true,
    };

    // Cloudinary returns full URL in req.file.path
    if (req.file) {
      articleData.image = req.file.path;
    }

    const article = await Article.create(articleData);
    res.status(201).json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'An article with this name already exists' });
    }
    res.status(400).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    console.log('Update body:', req.body);
    console.log('Update file:', req.file);

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

    content = content.filter(item => item && item.trim() !== '');

    const articleData = {
      name: req.body.name,
      title: req.body.title,
      content: content,
      isActive: req.body.isActive === 'true' || req.body.isActive === true,
    };

    // Cloudinary returns full URL in req.file.path
    if (req.file) {
      articleData.image = req.file.path;
    }

    const article = await Article.findByIdAndUpdate(
      req.params.id,
      articleData,
      { new: true }
    );

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

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
      isActive: true,
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
  getArticleByName,
};