// src/store/newsStore.js
import { create } from "zustand";
import { fetchTopHeadlines as apiFetchTopHeadlines, searchArticles as apiSearchArticles } from "../services/newsAPI";

export const useNewsStore = create((set) => ({
  articles: [],
  loading: false,
  error: null,

  // Fetch headlines
  fetchTopHeadlines: async (category = null) => {
    set({ loading: true, error: null });
    try {
      const articles = await apiFetchTopHeadlines(category);
      set({ articles, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Search
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
