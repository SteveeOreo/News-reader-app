import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchArticles } from "../services/newsAPI";
import NewsList from "../components/NewsList";

export default function SearchResultsPage() {
  const { query } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchArticles(query);
        setArticles(data);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError("Failed to fetch search results. Please try again later.");
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      getSearchResults();
    } else {
      setArticles([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
      {loading && <p>Loading search results...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && articles.length === 0 && (
        <p>No articles found for "{query}".</p>
      )}
      {!loading && !error && articles.length > 0 && (
        <NewsList articles={articles} />
      )}
    </div>
  );
}
