import { create } from "zustand";

export const useFavoritesStore = create((set) => ({
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],

  addFavorite: (article) =>
    set((state) => {
      const updated = [...state.favorites, article];
      localStorage.setItem("favorites", JSON.stringify(updated));
      return { favorites: updated };
    }),

  removeFavorite: (title) =>
    set((state) => {
      const updated = state.favorites.filter((a) => a.title !== title);
      localStorage.setItem("favorites", JSON.stringify(updated));
      return { favorites: updated };
    }),

  isFavorite: (title) =>
    JSON.parse(localStorage.getItem("favorites"))?.some((a) => a.title === title),
}));
