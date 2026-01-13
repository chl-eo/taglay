import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ArticleList.css';

// Base URL for images (without /api)
const BASE_URL = import.meta.env.VITE_LOCAL_HOST;

function ArticleList({ articles }) {
  return (
    <div className="article-list">
      {articles.map((article) => {
        const words = article.content.join(' ').split(' ').length;
        const minutes = Math.max(2, Math.ceil(words / 70));

        return (
          <Link
            key={article.name}
            to={`/articles/${article.name}`}
            className="article-card"
          >
            {/* Article Image */}
            {article.image ? (
              <div className="article-card__image">
                <img
                  src={article.image?.startsWith('http') ? article.image : `${BASE_URL}${article.image}`}

                  alt={article.title}
                />
              </div>
            ) : (
              <div className="article-card__image article-card__image--placeholder">
                <span>No Image</span>
              </div>
            )}

            <div className="article-card__content">
              <div className="article-card__meta">
                <span className="pill">React guide</span>
                <span className="muted">{minutes} min read</span>
              </div>
              <h3>{article.title}</h3>
              <p>{article.content[0].substring(0, 140)}...</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ArticleList;