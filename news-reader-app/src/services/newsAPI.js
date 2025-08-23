// services/newsAPI.js

// API key from your .env file
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

/**
 * Fetches the top headlines from the News API.
 * @param {string} country The country code (default 'us').
 * @param {string} category The news category (default 'general').
 * @returns {Promise<Array>} A promise that resolves with an array of articles.
 */
export const fetchTopHeadlines = async (country = "us", category = "general") => {
  try {
    const response = await fetch(
      `${BASE_URL}/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    return [];
  }
};

/**
 * Fetches articles based on a search query.
 * @param {string} query The search term.
 * @returns {Promise<Array>} A promise that resolves with an array of articles.
 */
export const searchArticles = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("Error searching for articles:", error);
    return [];
  }
};
