import { useEffect } from "react";
import { useNewsStore } from "../store/newsStore";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import NewsCard from "../components/NewsCard";

export default function HomePage() {
  // Get articles data and loading states from my news store
  const { articles, loading, error, fetchArticles } = useNewsStore();

  useEffect(() => {
    // Load articles when the page first renders
    fetchArticles();
  }, [fetchArticles]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content area */}
      <main className="max-w-6xl mx-auto p-4 pt-6">
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && articles.length > 0 && (
          <>
            {/* Show the first article as a featured story */}
            <div className="mb-8">
              <NewsCard article={articles[0]} imageHeightClass="h-96" />
            </div>

            {/* Grid of remaining articles */}
            <h3 className="text-lg font-semibold mb-4">Latest Headlines</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {articles.map((article) => (
                <NewsCard key={article.uuid} article={article} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
