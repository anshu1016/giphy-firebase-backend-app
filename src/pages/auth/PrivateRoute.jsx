/* eslint-disable react/prop-types */
// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  // If the user is not authenticated, redirect to sign-in
  return user ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
