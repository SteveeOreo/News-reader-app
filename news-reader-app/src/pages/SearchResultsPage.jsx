import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNewsStore } from "../store/newsStore";
import NewsList from "../components/NewsList";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export default function SearchResultsPage() {
  const { query } = useParams();
  // Use the store to get state and actions
  const { articles, loading, error, searchArticles } = useNewsStore();

  useEffect(() => {
    // Fetch search results when the component mounts or the query changes
    if (query) {
      searchArticles(query);
    }
  }, [query, searchArticles]);

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Search Results for "{query}"</h1>
      
      {/* Loading state */}
      {loading && <LoadingSpinner />}
      
      {/* Error state */}
      {error && <ErrorMessage message={error} />}
      
      {/* Success state - articles found */}
      {!loading && !error && articles.length > 0 && (
        <NewsList articles={articles} />
      )}
      
      {/* Success state - no articles found */}
      {!loading && !error && articles.length === 0 && (
        <p className="text-center text-gray-500">No articles found for "{query}".</p>
      )}
    </div>
  );
}
