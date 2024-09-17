import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const API_URL_SIGNUP = "http://localhost:8080/signup";

const SignUp = () => {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePassChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && email && password) {
      setLoading(true);
      try {
        const response = await axios.post(API_URL_SIGNUP, {
          name,
          email,
          password,
        });

        const { uid, token, name: userName } = response.data;

        login({ uid, email, name: userName, token });

        setSuccess("User Signed Up Successfully!");
        setName("");
        setEmail("");
        setPassword("");
        setError("");
      } catch (err) {
        console.error("Error during sign up:", err);
        setError(err.response?.data || "Something went wrong");
        setSuccess("");
      } finally {
        setLoading(false);
      }
    } else {
      setError("All fields are required!");
      setSuccess("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold mb-4 text-center">Sign Up</h3>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && (
          <div className="fixed top-4 right-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              onChange={handleNameChange}
              value={name}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Your Name"
            />
          </div>

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
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-600 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
