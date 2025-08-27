// src/components/NewsList.jsx
import NewsCard from "./NewsCard";

export default function NewsList({ articles }) {
  if (!articles || articles.length === 0) {
    return (
      <p className="text-center text-gray-600 mt-10">
        No news articles found.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
      {articles.map((article, idx) => (
        <NewsCard key={idx} article={article} />
      ))}
    </div>
  );
}
