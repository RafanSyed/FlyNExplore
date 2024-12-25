

"use client";

import React, { useState } from "react";
import { getAccessToken } from "@/services/AccessToken";

const getHotels = async (iataCode: string) => {
  try {
    const token = await getAccessToken();

    const queryParams = new URLSearchParams({
      cityCode: iataCode,
    });

    const response = await fetch(
      `http://localhost:3000/reference-data/locations/hotels/by-city?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data.data.map((hotel: any) => ({
      name: hotel.name,
      hotelId: hotel.hotelId,
    }));
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw error;
  }
};

const HotelSearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hotels, setHotels] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const results = await getHotels(searchTerm);
      setHotels(results);
    } catch (err) {
      setError("Failed to fetch hotels. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hotels-page">
      <h1>Search Hotels</h1>
      <form onSubmit={handleSearch} className="hotels-form">
        <input
          type="text"
          placeholder="Enter city IATA code (e.g., TPA)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search Hotels"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="hotels-results">
        <h2>Hotel Results:</h2>
        {hotels.length > 0 ? (
          <ul>
            {hotels.map((hotel, index) => (
              <li key={index} className="hotel-item">
                {/* Make the hotel's name a clickable link to a Google search */}
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(hotel.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hotel-link"
                >
                  {hotel.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default HotelSearchPage;
