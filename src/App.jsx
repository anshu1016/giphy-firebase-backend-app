// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SignIn from "./pages/auth/Signin.jsx";
import SignUp from "./pages/auth/SignUp.jsx";
import Search from "./pages/components/Search.jsx";
import BookmarkPage from "./pages/components/BookmarkPage.jsx";
import PrivateRoute from "./pages/auth/PrivateRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Search />
            </PrivateRoute>
          }
        />
        <Route
          path="/bookmarkss"
          element={
            <PrivateRoute>
              <BookmarkPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
