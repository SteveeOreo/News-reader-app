import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

export default function NewsCard({ article }) {
  return (
    <Link
      to={`/article/${encodeURIComponent(article.title)}`}
      state={{ article }}
      className="block bg-white rounded-xl shadow-md hover:shadow-lg transition p-4"
    >
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover rounded-md"
        />
      )}

      <h2 className="mt-3 text-lg font-semibold line-clamp-2">
        {article.title}
      </h2>
      <p className="text-gray-600 text-sm mt-1">
        {article.source?.name} • {formatDate(article.publishedAt)}
      </p>

      <p className="text-gray-700 text-sm mt-2 line-clamp-3">
        {article.description}
      </p>
    </Link>
  );
}
