// src/components/NewsCard.jsx
import { Link } from "react-router-dom";
import { useState } from "react";

export default function NewsCard({ article, imageHeightClass = "h-48" }) {
  const [imageError, setImageError] = useState(false);

  // Reset imageError when article changes (important for lists)
  // This is a simplified approach. A more robust solution might use a unique key
  // for the image or reset the state upon article prop change if this component
  // is reused without full re-mounts. For now, this is a direct fix for onError.
  // useEffect(() => {
  //   setImageError(false);
  // }, [article.urlToImage]);

  return (
    <Link
      to={`/article/${encodeURIComponent(article.title)}`}
      state={{ article }}
      className="group block bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
    >
      {/* Image */}
      {article.urlToImage && !imageError ? (
        <img
          src={article.urlToImage}
          alt={article.title}
          className={`w-full ${imageHeightClass} object-cover group-hover:scale-105 transition-transform`}
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          className={`w-full ${imageHeightClass} bg-gray-200 flex items-center justify-center text-gray-500`}
        >
          No Image
        </div>
      )}

      {/* Text */}
      <div className="p-4">
        <h2 className="font-bold text-lg md:text-xl text-gray-900 group-hover:text-red-700">
          {article.title}
        </h2>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {article.description || "Click to read more..."}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          {article.source?.name} •{" "}
          {new Date(article.publishedAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}
