import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const categories = [
  "Tech",
  "Sports",
  "Entertainment",
  "Science",
  "Health",
  "Business",
];

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("isLoggedIn");
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery("");
      // Close mobile search after they submit
      if (isMobileSearchVisible) setIsMobileSearchVisible(false);
    }
  };

  return (
    <header className="bg-red-700 text-white sticky top-0 z-50 shadow-md">
      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden text-2xl p-2 -ml-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          ☰
        </button>

        {/* My brand logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide flex-grow text-center md:flex-grow-0 md:text-left"
        >
          REDFOX NEWS
        </Link>

        {/* Category navigation for desktop */}
        <nav className="hidden md:flex space-x-4 ml-8 items-center">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat.toLowerCase()}`}
              className="px-3 py-1 bg-red-800 hover:bg-red-600 rounded-full text-sm font-medium transition whitespace-nowrap"
            >
              {cat}
            </Link>
          ))}
        </nav>

        {/* Search and login buttons for desktop */}
        <div className="hidden md:flex items-center space-x-4 ml-auto">
          {/* Search functionality */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-white rounded-full overflow-hidden"
          >
            <input
              type="text"
              placeholder="Search news"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 text-gray-700 focus:outline-none w-48"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white font-semibold hover:bg-red-500 transition"
              aria-label="Search"
            >
              🔍
            </button>
          </form>

          {isLoggedIn ? (
            <button
              className="px-4 py-1 border border-white rounded hover:bg-white hover:text-red-700 transition"
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                setIsLoggedIn(false);
                navigate("/"); // Take them back to homepage
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/signin"
                className="px-4 py-1 border border-white rounded hover:bg-white hover:text-red-700 transition"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="px-4 py-1 bg-white text-red-700 rounded hover:bg-gray-100 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Search icon for mobile */}
        <button
          className="md:hidden text-2xl p-2 -mr-2 focus:outline-none"
          onClick={() => setIsMobileSearchVisible(!isMobileSearchVisible)}
          aria-label="Toggle mobile search"
        >
          🔍
        </button>
      </div>

      {/* Mobile search form - shows when search icon is tapped */}
      {isMobileSearchVisible && (
        <div className="md:hidden px-4 pb-2">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-white rounded-full overflow-hidden"
          >
            <input
              type="text"
              placeholder="Search news"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 text-gray-700 flex-grow focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white font-semibold hover:bg-red-500 transition rounded-r-full"
              aria-label="Submit search"
            >
              🔍
            </button>
          </form>
        </div>
      )}

      {/* Mobile navigation menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-red-800 py-2 shadow-lg z-40">
          <nav className="flex flex-col items-start px-4 space-y-2">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/category/${cat.toLowerCase()}`}
                className="w-full text-left px-3 py-2 text-white hover:bg-red-700 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {cat}
              </Link>
            ))}
            {/* Login/logout options for mobile */}
            {isLoggedIn ? (
              <Link
                to="/"
                className="w-full text-left px-3 py-2 text-white hover:bg-red-700 rounded"
                onClick={() => {
                  localStorage.removeItem("isLoggedIn");
                  setIsLoggedIn(false);
                  setIsMobileMenuOpen(false);
                  navigate("/");
                }}
              >
                Logout
              </Link>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="w-full text-left px-3 py-2 text-white hover:bg-red-700 rounded"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="w-full text-left px-3 py-2 text-white hover:bg-red-700 rounded"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
