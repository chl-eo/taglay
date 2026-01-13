import axios from 'axios';
import constants from '../constants';

const API = axios.create({
  baseURL: `${constants.HOST}/articles`,
});

export const fetchArticles = () => API.get('/');

export const fetchArticleByName = (name) => API.get(`/${name}`);

export const createArticle = (formData) => {
  return API.post('/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateArticle = (id, formData) => {
  return API.put(`/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const toggleArticleStatus = (id) => API.patch(`/${id}/toggle`);