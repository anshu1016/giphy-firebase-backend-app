import { createContext, useContext, useState } from "react";

const BookmarksContext = createContext();

export const BookmarksProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(new Set());

  const addBookmark = (gifId) => {
    setBookmarks((prev) => new Set(prev).add(gifId));
  };

  const removeBookmark = (gifId) => {
    setBookmarks((prev) => {
      const updated = new Set(prev);
      updated.delete(gifId);
      return updated;
    });
  };

  const isBookmarked = (gifId) => bookmarks.has(gifId);

  return (
    <BookmarksContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarksContext);
