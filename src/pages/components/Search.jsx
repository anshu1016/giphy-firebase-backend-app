import { useEffect, useState } from "react";
import { useGIF } from "../../context/GIFContext.jsx";
import { useBookmarks } from "../../context/BookmarkContext.jsx";
import axios from "axios";
import { FaUserCircle, FaSignOutAlt, FaHeart } from "react-icons/fa";
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const Search = () => {
  const { word, setWord, gifs, setGifs } = useGIF();
  const { bookmarks, addBookmark, removeBookmark, isBookmarked } =
    useBookmarks();
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();
  const api_key = import.meta.env.VITE_GIPHY_ENDPOINT_KEY;

  // Debounced API call
  const searchWord = debounce(async (term) => {
    if (term.trim() === "") return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${term}`
      );
      const data = response.data.data;
      setGifs(data);
    } catch (err) {
      console.error("Error fetching GIFs:", err);
      // Optional: Show a user-friendly error message
    } finally {
      setLoading(false);
    }
  }, 1000);

  const handleInput = (e) => {
    setWord(e.target.value);
  };

  useEffect(() => {
    searchWord(word);
  }, [word]);

  return (
    <div className="relative min-h-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <header className="flex items-center justify-between p-4 bg-white bg-opacity-80 border-b border-gray-300">
        <input
          type="text"
          className="w-full max-w-4xl p-3 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={word}
          onChange={handleInput}
          placeholder="Search for GIFs..."
          aria-label="Search for GIFs"
        />
        <div className="flex space-x-4 relative">
          <Link to="/bookmarkss" aria-label="Go to bookmarks">
            <FaHeart className="text-xl cursor-pointer text-red-500 hover:text-red-700" />
          </Link>
          <div className="relative group">
            <FaUserCircle
              className="text-xl cursor-pointer text-gray-700 hover:text-gray-900"
              aria-label="User profile"
            />
            {user && (
              <div className="absolute right-0 hidden group-hover:block bg-white text-black p-4 rounded-lg shadow-lg">
                <p className="text-sm font-bold">{user.name}</p>
                <p className="text-sm">{user.email}</p>
              </div>
            )}
          </div>
          <FaSignOutAlt
            className="text-xl cursor-pointer text-gray-700 hover:text-gray-900"
            onClick={logout}
            aria-label="Log out"
          />
        </div>
      </header>
      <main className="p-4">
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <Bars color="#00BFFF" height={80} width={80} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gifs && gifs.length > 0 ? (
              gifs.map((gif) => (
                <div key={gif.id} className="relative cursor-pointer">
                  <img
                    src={gif.images.fixed_height.url}
                    alt={gif.title}
                    className="w-full h-auto rounded-lg shadow-lg transition-transform transform hover:scale-105"
                    loading="lazy"
                  />
                  <FaHeart
                    className={`absolute top-2 right-2 text-2xl cursor-pointer transition-colors ${
                      isBookmarked(gif.id) ? "text-red-500" : "text-white"
                    }`}
                    onClick={() =>
                      isBookmarked(gif.id)
                        ? removeBookmark(gif.id)
                        : addBookmark(gif.id)
                    }
                    aria-label={
                      isBookmarked(gif.id)
                        ? "Remove from bookmarks"
                        : "Add to bookmarks"
                    }
                  />
                </div>
              ))
            ) : (
              <p className="text-white text-center">No GIFs found</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;
