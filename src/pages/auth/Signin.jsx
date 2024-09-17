import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import useAuth for login

const API_URL_SIGNIN = "http://localhost:8080/signin";

const SignIn = () => {
  const { login } = useAuth(); // Access login function from AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePassChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      try {
        const response = await axios.post(API_URL_SIGNIN, { email, password });
        const { token, uid, name } = response.data;

        // Login the user and store token
        login({ uid, email, name, token });

        setEmail("");
        setPassword("");
        setError("");
      } catch (err) {
        setError(err.response?.data || "Something went wrong");
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
