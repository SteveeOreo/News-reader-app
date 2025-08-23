// src/components/ArticleCard.jsx

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
  
        {article.description && (
          <p className="text-sm text-gray-600 mt-1">{article.description}</p>
        )}
  
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline mt-2 block"
        >
          Read more
        </a>
      </div>
    );
  }
  