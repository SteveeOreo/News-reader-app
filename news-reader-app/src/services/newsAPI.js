import axios from "axios";

const API_TOKEN = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://api.thenewsapi.com/v1/news/all";

export const fetchArticles = async (category = null) => {
  try {
    const params = {
      api_token: API_TOKEN,
      language: "en",
      limit: 30, // --- ADDED: Request more articles ---
    };
    if (category) {
      params.categories = category;
    }

    const response = await axios.get(BASE_URL, { params });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

export const searchArticles = async (query) => {
  try {
    const params = {
      api_token: API_TOKEN,
      search: query,
      language: "en",
      sort: "relevance_score",
      limit: 30, // --- ADDED: Request more articles ---
    };

    const response = await axios.get(BASE_URL, { params });
    return response.data.data;
  } catch (error) {
    console.error("Error searching articles:", error);
    return [];
  }
};
