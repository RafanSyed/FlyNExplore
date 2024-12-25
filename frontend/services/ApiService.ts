import axios from "axios";

// Use the base URL from the environment variable
const ApiService = axios.create({
  baseURL: process.env.ApiService, // Ensure this variable is set correctly in your .env file
  headers: {
    "Content-Type": "application/json", // Add any default headers
  },
});

export default ApiService;
