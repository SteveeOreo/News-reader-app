// This file sets up a Zustand store for managing news articles and their state.

// First, we need to install Zustand. In your terminal, run:
// npm install zustand

import { create } from 'zustand';

// Assuming your fetch functions are in `services/newsAPI.js`
// We will import the function to get top headlines.
import { fetchTopHeadlines } from '../services/newsAPI';

// The store holds our state and actions.
// State includes the articles array, and boolean/string for loading/error states.
const useNewsStore = create((set) => ({
  // --- State ---
  // The array to hold our fetched news articles.
  articles: [],
  // A boolean to indicate if data is currently being loaded.
  isLoading: false,
  // A string to hold any error messages.
  error: null,

  // --- Actions ---
  /**
   * Fetches the top headlines and updates the store's state.
   * This action handles the entire data fetching lifecycle, including
   * setting loading and error states.
   */
  fetchArticles: async () => {
    // Set loading to true and clear any previous errors.
    set({ isLoading: true, error: null });
    try {
      // Call the API function to get the articles.
      const articles = await fetchTopHeadlines();
      // On success, update the articles and set loading to false.
      set({ articles, isLoading: false });
    } catch (err) {
      // If there's an error, store the error message and set loading to false.
      console.error("Failed to fetch articles:", err);
      set({ error: "Failed to fetch articles. Please try again.", isLoading: false });
    }
  },

  /**
   * Updates the articles state directly. This can be useful for
   * other parts of your app that might manipulate the articles.
   * @param {Array} newArticles The new array of articles.
   */
  setArticles: (newArticles) => set({ articles: newArticles }),

  /**
   * Updates the loading state directly.
   * @param {boolean} loadingState The new loading state.
   */
  setLoading: (loadingState) => set({ isLoading: loadingState }),
  
  /**
   * Updates the error state directly.
   * @param {string|null} errorState The new error message or null.
   */
  setError: (errorState) => set({ error: errorState }),

}));

export default useNewsStore;

