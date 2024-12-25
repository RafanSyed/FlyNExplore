"use client";

import React, { useState } from "react";
import { getAccessToken } from "@/services/AccessToken";
import { ActivityResponse } from "@/types/activities";

const ActivityPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // For the city search input
  const [activities, setActivities] = useState<ActivityResponse | null>(null); // To store fetched activities
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Function to parse the AI API response
  const parseAIResponse = (response: any) => {
    try {
      // Extract the text
      const rawText = response.candidates[0].content.parts[0].text;

      // Remove Markdown syntax (```json and ```) and trim whitespace
      const jsonText = rawText.replace(/```json|```/g, "").trim();

      // Parse the cleaned JSON string
      return JSON.parse(jsonText);
    } catch (error) {
      console.error("Error parsing AI response:", error);
      throw new Error("Invalid response format from AI API");
    }
  };

  // Function to fetch longitude and latitude using AI
  const getLongitudeAndLatitude = async (cityName: string) => {
    try {
      const response = await fetch("http://localhost:3000/artificial-intelligence", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Give me the latitude and longitude of ${cityName} as a JSON object with keys "latitude" and "longitude". Don't return anything else except the JSON object. Here's an example of a city name Tampa: the output should be { "latitude": 27.94752, "longitude": -82.45843 }`,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return parseAIResponse(data);
    } catch (error) {
      console.error("Error fetching latitude and longitude:", error);
      throw error;
    }
  };

  // Function to fetch activities data
  const getActivities = async (latitude: number, longitude: number) => {
    try {
      const token = await getAccessToken();
      const queryParams = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      });
      const response = await fetch(
        `http://localhost:3000/shopping/activities?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: ActivityResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching activities:", error);
      throw error;
    }
  };

  // Handle search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError(null);

    try {
      const { latitude, longitude } = await getLongitudeAndLatitude(searchTerm);
      const activityData = await getActivities(latitude, longitude);
      setActivities(activityData);
    } catch (err) {
      setError("Failed to fetch activities. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Explore Local Attractions</h1>
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Enter city name (e.g., Tampa)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          required
          style={{
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "300px",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Error State */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display Results */}
      {activities && activities.data.length > 0 ? (
        <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", listStyle: "none", padding: 0 }}>
          {activities.data.map((activity) => (
            <li key={activity.id} style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "10px", backgroundColor: "#f9f9f9" }}>
              <h3>{activity.name}</h3>
              <img
                src={activity.pictures[0] || "https://via.placeholder.com/300"}
                alt={activity.name}
                style={{ width: "100%", borderRadius: "10px" }}
              />
              <p>{activity.description}</p>
              <p>
                <a href={activity.bookingLink} target="_blank" rel="noopener noreferrer" style={{ color: "blue", textDecoration: "underline" }}>
                  Book Now
                </a>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        activities && <p>No activities found for this city.</p>
      )}
    </div>
  );
};

export default ActivityPage;
