// Replace 'YOUR_API_KEY' with the key you copied from the News API dashboard.
const API_KEY =  import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

/**
 * Fetches the top headlines from the News API.
 * @param {string} country The country code (e.g., 'us', 'gb', 'in').
 * @returns {Promise<Array>} A promise that resolves with an array of articles.
 */
export const fetchTopHeadlines = async (country = 'us') => {
  try {
    const response = await fetch(
      `${BASE_URL}/top-headlines?country=${country}&apiKey=${API_KEY}`
    );

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();

    // The API response contains an 'articles' array
    return data.articles;
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    return []; // Return an empty array on error
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
      `${BASE_URL}/everything?q=${query}&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error searching for articles:', error);
    return [];
  }
};