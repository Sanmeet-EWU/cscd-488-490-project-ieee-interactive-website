import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Admin.css";
import { FaUser, FaLock } from "react-icons/fa";


// Admin component for rendering the admin login page
const Admin = () => {
  const navigate = useNavigate(); // Initialize navigation hook

  // Earls update
  const { login, isAuthenticated } = useAuth(); // Destructure login function and authentication status from context

  // State for form data: username and password
  const [formData, setFormData] = useState({
    username: "",
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
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true); // Set loading state to true during login request
    setError(""); // Clear previous errors

    try {
      // Attempt login with provided username and password
      const success = await login(formData.username, formData.password);
      if (success) {
        // Navigate to admin dashboard on successful login
        navigate("/admin-dashboard");
      } else {
        // Set error message if login failed
        setError("Invalid username or password");
      }
    } catch (error) {
      // Handle any errors during the login process
      setError("An error occurred during login");
      console.error("Login error:", error);
    } finally {
      // Reset loading state regardless of outcome
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
          <form onSubmit={handleSubmit}>
            {/* Username input field */}
            <div className="form-group">
              <label htmlFor="username"></label>
              <div className="input-icon">
                <FaUser size={14} /> {/* Icon representing user */}
              </div>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={isLoading}
                required
                placeholder="Username"
              />
            </div>
            {/* Password input field */}
            <div className="form-group">
              <label htmlFor="password"></label>
              <div className="input-icon">
                <FaLock size={14} /> {/* Icon representing password */}
              </div>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
                placeholder="Password"
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
