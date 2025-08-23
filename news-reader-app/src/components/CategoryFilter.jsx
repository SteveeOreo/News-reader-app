import useNewsStore from "../store/newsStore";
import { fetchTopHeadlines } from "../services/newsAPI";

const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

export default function CategoryFilter() {
  const { setArticles, setLoading, setError } = useNewsStore();

  const handleCategoryClick = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const results = await fetchTopHeadlines("us", category);
      setArticles(results);
    } catch (err) {
      setError("Failed to fetch category news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 flex-wrap p-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleCategoryClick(cat)}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
}
