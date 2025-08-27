// src/pages/HomePage.jsx
import { useEffect } from "react";
import { useNewsStore } from "../store/newsStore";
import NewsList from "../components/NewsList";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import NewsCard from "../components/NewsCard";

export default function HomePage() {
  const { articles, loading, error, fetchTopHeadlines } = useNewsStore();

  useEffect(() => {
    fetchTopHeadlines();
  }, [fetchTopHeadlines]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <main className="max-w-6xl mx-auto p-4 pt-6">
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && articles.length > 0 && (
          <>
            {/* Featured Article */}
            <div className="mb-8">
              <NewsCard article={articles[0]} imageHeightClass="h-96" />
            </div>

            {/* Other Articles */}
            <h3 className="text-lg font-semibold mb-4">Latest Headlines</h3>
            <NewsList articles={articles.slice(1)} />
          </>
        )}
      </main>
    </div>
  );
}
