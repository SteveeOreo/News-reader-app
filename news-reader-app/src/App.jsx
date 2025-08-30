import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import CategoryPage from "./pages/CategoryPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import ArticleDetailsPage from "./pages/ArticleDetailsPage";
import SavedArticlesPage from "./pages/SavedArticlesPage";

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/search/:query" element={<SearchResultsPage />} />
        <Route path="/article/:id" element={<ArticleDetailsPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* redirect anything unknown back home */}
        <Route path="/saved" element={<SavedArticlesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  );
}
