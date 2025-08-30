import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNewsStore } from "../store/newsStore";
import NewsCard from "../components/NewsCard"; // Corrected import
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export default function CategoryPage() {
  const { category } = useParams();
  const { articles, loading, error, fetchArticles } = useNewsStore();

  useEffect(() => {
    fetchArticles(category);
  }, [category, fetchArticles]);

  console.log("Number of articles in category:", articles.length);

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 capitalize">
        {category} News
      </h1>

      {loading && <LoadingSpinner />}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && articles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Using the correct NewsCard component */}
          {articles.map((article) => (
            <NewsCard key={article.uuid} article={article} />
          ))}
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <p className="text-center text-gray-500">
          No articles found for {category}.
        </p>
      )}
    </div>
  );
}
