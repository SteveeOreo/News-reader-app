// src/services/newsAPI.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY; // put your API key in .env
const BASE_URL = "https://newsapi.org/v2";

// Fetch top headlines (optionally by category)
export const fetchTopHeadlines = async (category = null) => {
  const url = `${BASE_URL}/top-headlines`;
  const params = {
    country: "us",
    apiKey: API_KEY,
  };
  if (category) params.category = category;

  const response = await axios.get(url, { params });
  return response.data.articles;
};

// Search for articles
export const searchArticles = async (query) => {
  const url = `${BASE_URL}/everything`;
  const params = {
    q: query,
    sortBy: "publishedAt",
    apiKey: API_KEY,
  };

  const response = await axios.get(url, { params });
  return response.data.articles;
};
