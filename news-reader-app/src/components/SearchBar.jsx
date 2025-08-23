// src/components/SearchBar.jsx
import { useState } from "react";
import useNewsStore from "../store/newsStore";
import { searchArticles } from "../services/newsAPI";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const { setArticles, setLoading, setError } = useNewsStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const results = await searchArticles(query);
      setArticles(results);
    } catch (err) {
      setError("Failed to fetch search results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for news..."
        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
}
