import { useEffect, useState } from "react";
import { useBookmarks } from "../../context/BookmarkContext";
import { FaHeart, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookmarkPage = () => {
  const { bookmarks, removeBookmark } = useBookmarks();
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookmarkedGifs = async () => {
      try {
        setLoading(true);
        const api_key = import.meta.env.VITE_GIPHY_ENDPOINT_KEY;
        const promises = Array.from(bookmarks).map((id) =>
          axios.get(`https://api.giphy.com/v1/gifs/${id}?api_key=${api_key}`)
        );
        const responses = await Promise.all(promises);
        setGifs(responses.map((res) => res.data.data));
      } catch (err) {
        console.error("Error fetching bookmarked GIFs:", err);
        setError("Failed to load bookmarked GIFs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedGifs();
  }, [bookmarks]);

  return (
    <div className="p-4 bg-neutral-950">
      <header className="flex items-center mb-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-white hover:text-gray-400"
          aria-label="Back to search"
        >
          <FaArrowLeft className="text-xl mr-2" />
          Back to Search
        </button>
      </header>
      <h2 className="text-2xl font-bold text-white mb-4">Bookmarked GIFs</h2>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-white">Loading...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-white">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gifs.length > 0 ? (
            gifs.map((gif) => (
              <div key={gif.id} className="relative cursor-pointer">
                <img
                  src={gif.images.fixed_height.url}
                  alt={gif.title}
                  className="w-full h-auto rounded-lg shadow-lg transition-transform transform hover:scale-105"
                  loading="lazy"
                />
                <FaHeart
                  className="absolute top-2 right-2 text-2xl cursor-pointer text-red-500"
                  onClick={() => removeBookmark(gif.id)}
                  aria-label="Remove from bookmarks"
                />
              </div>
            ))
          ) : (
            <p className="text-white text-center">No Bookmarked GIFs</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookmarkPage;
