import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover rounded"
        />
      )}
      <h3 className="font-bold mt-2">{article.title}</h3>
      <p className="text-sm text-gray-600">{article.description}</p>

      <Link
        to={`/article/${encodeURIComponent(article.title)}`} 
        state={{ article }} // pass the article as route state
        className="text-blue-600 underline mt-2 block"
      >
        Read more
      </Link>
    </div>
  );
}
