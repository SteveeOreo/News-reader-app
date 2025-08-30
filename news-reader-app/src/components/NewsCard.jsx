import { Link } from "react-router-dom";
import { useState } from "react";

export default function NewsCard({ article, imageHeightClass = "h-48" }) {
  const [imageError, setImageError] = useState(false);

  // The new API provides a `uuid` which is a perfect unique identifier for a key.
  // The title can sometimes have characters that need encoding. The uuid is safer.
  const articleId = article.uuid || encodeURIComponent(article.title);

  return (
    <Link
      to={`/article/${articleId}`}
      state={{ article }}
      className="group block bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition h-full flex flex-col"
    >
      {/* --- CHANGE #1: Use `article.image_url` for the image source --- */}
      {article.image_url && !imageError ? (
        <img
          src={article.image_url}
          alt={article.title}
          className={`w-full ${imageHeightClass} object-cover group-hover:scale-105 transition-transform`}
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          className={`w-full ${imageHeightClass} bg-gray-200 flex items-center justify-center text-gray-500`}
        >
          No Image Available
        </div>
      )}

      {/* Text content - flex-grow ensures this part expands to fill space */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="font-bold text-lg md:text-xl text-gray-900 group-hover:text-red-700 flex-grow">
          {article.title}
        </h2>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {/* --- CHANGE #2: Use `article.snippet` as it's more common in this API --- */}
          {article.snippet || article.description || "Click to read more..."}
        </p>
        <p className="text-xs text-gray-500 mt-3">
          {/* --- CHANGE #3: The source is a simple string now --- */}
          {article.source} • {" "}
          {/* --- CHANGE #4: Use `article.published_on` for the date --- */}
          {new Date(article.published_on).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}
