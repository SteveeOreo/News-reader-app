// src/pages/ArticleDetailsPage.jsx
import { useLocation } from "react-router-dom";

export default function ArticleDetailsPage() {
  const { state } = useLocation();
  const article = state?.article;

  if (!article) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-semibold text-red-600">No article found</h1>
        <p className="text-gray-600 mt-2">Please go back and select a valid article.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
      )}

      <h1 className="text-2xl font-bold mt-4">{article.title}</h1>
      <p className="text-gray-600 mt-2">
        By {article.author || "Unknown"} | {article.source?.name || "Unknown Source"} |{" "}
        {new Date(article.publishedAt).toLocaleDateString()}
      </p>

      <p className="mt-4 text-lg">{article.description}</p>
      <p className="mt-4 text-gray-700">{article.content}</p>

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Read Original
      </a>
    </div>
  );
}
