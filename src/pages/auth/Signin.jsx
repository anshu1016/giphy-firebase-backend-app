import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase";

const SignIn = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth(app); // Initialize Firebase Authentication

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePassChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Use the user's ID token for authentication
        const token = await user.getIdToken();

        login({
          uid: user.uid,
          email: user.email,
          name: user.displayName || "Anonymous",
          token,
        });

        setEmail("");
        setPassword("");
        setError("");
        navigate("/"); // Redirect to home or another page
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Email and password are required!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold mb-4 text-center">Sign In</h3>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={handleEmailChange}
              value={email}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={handlePassChange}
              value={password}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Your Password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
