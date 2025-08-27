import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTopHeadlines } from "../services/newsAPI";

export default function CategoryPage() {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      try {
        const data = await fetchTopHeadlines(category);
        setArticles(data);
      } catch (error) {
        console.error("Error fetching category articles:", error);
        setArticles([]); // Clear articles on error
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, [category]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 capitalize">{category} News</h1>
      {loading ? (
        <p>Loading articles...</p>
      ) : articles.length === 0 ? (
        <p>No articles found for {category}.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600 text-sm mb-4">
                  {article.description}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
