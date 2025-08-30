import { create } from "zustand";
import { fetchArticles as apiFetchArticles, searchArticles as apiSearchArticles } from "../services/newsAPI";

export const useNewsStore = create((set) => ({
  articles: [],
  loading: false,
  error: null,

  // Fetch articles (can be filtered by category)
  fetchArticles: async (category = null) => {
    set({ loading: true, error: null });
    try {
      const articles = await apiFetchArticles(category);
      set({ articles, loading: false });
    } catch (err) { // This was the line with the missing brace
      set({ error: err.message, loading: false });
    }
  },

  // Search for articles
  searchArticles: async (query) => {
    set({ loading: true, error: null });
    try {
      const articles = await apiSearchArticles(query);
      set({ articles, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

