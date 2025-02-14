import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuth") === "true", // Retrieve authentication status
  );

  useEffect(() => {
    // Ensure authentication persists after page reload
    if (localStorage.getItem("isAuth") === "true") {
      setIsAuthenticated(true);
      setCurrentUser({ username: "admin" }); // You might fetch user details from backend
    }
  }, []);

  const login = async (username, password) => {
    try {
      if (username === "admin" && password === "ieee2024") {
        setCurrentUser({ username });
        setIsAuthenticated(true);
        localStorage.setItem("isAuth", "true"); // Store auth state in localStorage
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      setCurrentUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("isAuth"); // Remove auth state
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      return false;
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
