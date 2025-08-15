import { useEffect } from "react";
import useNewsStore from "../store/newsStore";

export default function Home() {
  const { articles, isLoading, error, fetchArticles } = useNewsStore();

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  if (isLoading) return <p className="p-4">Loading latest news...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        articles.map((article, index) => (
          <div
            key={index}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-48 object-cover rounded"
              />
            )}
            <h3 className="font-bold mt-2">{article.title}</h3>
            <p className="text-sm text-gray-600">{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mt-2 block"
            >
              Read more
            </a>
          </div>
        ))
      )}
    </div>
  );
}