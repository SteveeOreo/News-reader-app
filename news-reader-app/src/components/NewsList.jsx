// src/components/NewsList.jsx
import ArticleCard from "./ArticleCard";

export default function NewsList({ articles }) {
  if (!articles || articles.length === 0) {
    return <p>No articles found.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <ArticleCard key={index} article={article} />
      ))}
    </div>
  );
}
