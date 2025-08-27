import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFavoritesStore } from "../store/favoritesStore";
import { formatDate } from "../utils/formatDate";

export default function ArticleDetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const article = state?.article;
  const [imageError, setImageError] = useState(false);

  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const saved = isFavorite(article?.title);

  if (!article) {
    return (
      <div className="p-6">
        <p className="text-red-600">No article data found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {article.urlToImage && !imageError ? (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-64 object-cover rounded-lg"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
          No Image
        </div>
      )}

      <h1 className="text-2xl font-bold mt-4">{article.title}</h1>
      <p className="text-gray-600 text-sm">
        {article.author || "Unknown"} • {article.source?.name} •{" "}
        {formatDate(article.publishedAt)}
      </p>

      <p className="mt-4 text-gray-800">
        {article.content || article.description}
      </p>

      <div className="flex items-center gap-4 mt-6">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Read Original
        </a>

        <button
          onClick={() =>
            saved ? removeFavorite(article.title) : addFavorite(article)
          }
          className={`px-4 py-2 rounded-lg ${
            saved ? "bg-red-500 text-white" : "bg-green-500 text-white"
          }`}
        >
          {saved ? "Unsave" : "Save"}
        </button>
      </div>
    </div>
  );
}
