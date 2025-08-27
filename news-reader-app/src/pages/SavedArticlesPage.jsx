import { useFavoritesStore } from "../store/favoritesStore";
import NewsCard from "../components/NewsCard";

export default function SavedArticlesPage() {
  const { favorites } = useFavoritesStore();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Saved Articles</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600">No saved articles yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
