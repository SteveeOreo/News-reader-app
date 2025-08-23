// pages/HomePage.jsx
import { useEffect, useState } from "react";
import useNewsStore from "../store/newsStore";
import NewsList from "../components/NewsList";

export default function HomePage() {
  const { articles, isLoading, error, fetchArticles, search } = useNewsStore();

  const [category, setCategory] = useState("general");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState(""); // tracks current search

  useEffect(() => {
    if (!activeSearch) {
      fetchArticles("us", category);
    }
  }, [category, activeSearch, fetchArticles]);

  const categories = [
    "general",
    "business",
    "technology",
    "sports",
    "health",
    "science",
    "entertainment",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      search(searchTerm.trim());
      setActiveSearch(searchTerm.trim());
    } else {
      setActiveSearch("");
      fetchArticles("us", category);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* App Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-blue-700">
        News Reader
      </h1>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-center gap-2 mb-6"
      >
        <input
          type="text"
          placeholder="Search for news..."
          className="w-full md:w-2/3 border p-2 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {/* Category Selector */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Mobile: Dropdown */}
        <select
          className="md:hidden border p-2 rounded"
          value={category}
          onChange={(e) => {
            setActiveSearch("");
            setCategory(e.target.value);
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        {/* Desktop: Buttons */}
        <div className="hidden md:flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveSearch("");
                setCategory(cat);
              }}
              className={`px-4 py-2 rounded transition ${
                category === cat && !activeSearch
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Section Title */}
      <h2 className="text-xl md:text-2xl font-bold mb-4">
        {activeSearch
          ? `Search Results for "${activeSearch}"`
          : `Top Headlines (${category.charAt(0).toUpperCase() + category.slice(1)})`}
      </h2>

      {/* News Content */}
      {isLoading && <p>Loading news...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && !error && <NewsList articles={articles} />}
    </div>
  );
}
