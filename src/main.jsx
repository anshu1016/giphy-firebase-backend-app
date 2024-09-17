import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GIFContextProvider } from "./context/GIFContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { BookmarksProvider } from "./context/BookmarkContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GIFContextProvider>
          <BookmarksProvider>
            <App />
          </BookmarksProvider>
        </GIFContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
