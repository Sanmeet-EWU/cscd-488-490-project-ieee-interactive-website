import axios from "axios"; // Import axios for making HTTP requests


// Create an axios instance with a default base URL and headers
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Base URL for the API server
  headers: {
    "Content-Type": "application/json", // Set the default content type to JSON
  },
});

// Define a generic request function to handle various HTTP methods and endpoints
const request = async (method, endpoint, data = null, config = {}) => {
  try {
    // Create a configuration object for the axios request
    const requestConfig = {
      method, // HTTP method (GET, POST, PUT, DELETE, etc.)
      url: endpoint, // API endpoint to be called
      ...config, // Spread any additional config options provided
    };

    // Only attach data to the request if it's not null
    if (data !== null) {
      requestConfig.data = data;
    }

    // Make the API request using the configured axios instance
    const response = await api(requestConfig);

    // Return the data from the response
    return response.data;
  } catch (error) {
    // Log the error with method and endpoint details
    console.error(`API ${method.toUpperCase()} Error at ${endpoint}:`, error);
    // Throw the error message from the response, or a default error message
    throw error.response?.data || error.message;
  }
};

export default request; // Export the request function as the default export
