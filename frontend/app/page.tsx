"use client";

import React, { useState } from "react";

// AI function to fetch the weekly schedule
const getWeeklySchedule = async (cityName: string) => {
  try {
    const response = await fetch("http://localhost:3000/artificial-intelligence", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `Provide a detailed weekly schedule of activities for ${cityName} as a JSON object. The object should have keys for each day of the week ("Monday" to "Sunday"). Each day should be an array of objects, and each object should include the following fields: "name" (activity name), "time" (e.g., "10:00 AM"), "location" (e.g., "City Park"), "latitude" (decimal), and "longitude" (decimal). Example format: { "Monday": [{ "name": "Visit City Park", "time": "10:00 AM", "location": "City Park", "latitude": 27.94752, "longitude": -82.45843 }], "Tuesday": [], ... }. Return only the JSON object.`,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Extract and parse the JSON from the AI response
    const rawText = data.candidates[0].content.parts[0].text;
    const jsonText = rawText.replace(/```json|```/g, "").trim(); // Remove Markdown syntax
    return JSON.parse(jsonText); // Parse the cleaned JSON string
  } catch (error) {
    console.error("Error fetching weekly schedule:", error);
    throw error;
  }
};

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // City search input
  const [schedule, setSchedule] = useState<any>(null); // Weekly schedule data
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch weekly schedule
  const fetchWeeklySchedule = async (cityName: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getWeeklySchedule(cityName);
      setSchedule(data);
    } catch (err) {
      setError("Failed to fetch schedule. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      fetchWeeklySchedule(searchTerm);
    }
  };

  return (
    <div style={{ fontFamily: 'Times New Roman, Times, serif', backgroundColor: "#f3f4f6", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Plan Your Week Using AI</h1>

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

      {/* Error Message */}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {/* Weekly Schedule */}
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      {schedule && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "10px", margin: "20px" }}>
          {Object.keys(schedule).map((day, index) => (
            <div
              key={day}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "10px",
                backgroundColor: index % 2 === 0 ? "#d9eaf7" : "#e8f7d9",
              }}
            >
              <h3 style={{ textAlign: "center", marginBottom: "10px", color: "#0056b3" }}>{day}</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {schedule[day].map((activity: any, index: number) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "10px",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <strong>{activity.name}</strong> <br />
                    Time: {activity.time} <br />
                    Location: {activity.location} <br />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
