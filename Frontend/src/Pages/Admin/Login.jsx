import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";


// Admin component for rendering the admin login page
const Admin = () => {
  const navigate = useNavigate(); // Initialize navigation hook
  const { login, isAuthenticated } = useAuth(); // Destructure login function and authentication status from context

  // State for form data: email and password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State to hold error messages
  const [error, setError] = useState("");
  // State to track whether a login request is in progress
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to the admin dashboard if the user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin-dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Handle changes to form fields and update formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the corresponding field in formData
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear any existing error when user starts typing
    setError("");
  };

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate("/admin-dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred during login");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="login-container">
        <div className="login-box">
          {/* Heading for the login form */}
          <h2>Admin Login</h2>
          {/* Display error message if any */}
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit} className="admin-login-form">
            {/* Email input field */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {/* Password input field */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {/* Submit button: disabled while loading */}
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
