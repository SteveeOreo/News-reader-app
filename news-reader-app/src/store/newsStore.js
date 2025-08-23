// store/newsStore.js
import { create } from "zustand";
import { fetchTopHeadlines, searchArticles } from "../services/newsAPI";

const useNewsStore = create((set) => ({
  // --- State ---
  articles: [],
  isLoading: false,
  error: null,

  // --- Actions ---
  /**
   * Fetches top headlines by country & category.
   */
  fetchArticles: async (country = "us", category = "general") => {
    set({ isLoading: true, error: null });
    try {
      const articles = await fetchTopHeadlines(country, category);
      set({ articles, isLoading: false });
    } catch (err) {
      console.error("Failed to fetch articles:", err);
      set({
        error: "Failed to fetch articles. Please try again.",
        isLoading: false,
      });
    }
  },

  /**
   * Searches articles by query.
   */
  searchArticles: async (query) => {
    set({ isLoading: true, error: null });
    try {
      const articles = await searchArticles(query);
      set({ articles, isLoading: false });
    } catch (err) {
      console.error("Search failed:", err);
      set({
        error: "Search failed. Please try again.",
        isLoading: false,
      });
    }
  },

  /**
   * Directly update articles.
   */
  setArticles: (newArticles) => set({ articles: newArticles }),

  /**
   * Directly update loading state.
   */
  setLoading: (loadingState) => set({ isLoading: loadingState }),

  /**
   * Directly update error state.
   */
  setError: (errorState) => set({ error: errorState }),
}));

export default useNewsStore;
