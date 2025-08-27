import { useLocation, Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

export default function ArticleDetailsPage() {
  const location = useLocation();
  const article = location.state?.article;

  if (!article) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-semibold">No article found</h1>
        <p className="text-gray-600 mt-2">
          Try going back to the homepage to browse more news.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
      )}

      <h1 className="text-2xl font-bold mt-4">{article.title}</h1>
      <p className="text-gray-500 text-sm mt-1">
        {article.author ? `By ${article.author}` : "Unknown Author"} •{" "}
        {article.source?.name} • {formatDate(article.publishedAt)}
      </p>

      <p className="text-gray-700 mt-4 leading-relaxed">{article.content || article.description}</p>

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Read Original
      </a>
    </div>
  );
}
