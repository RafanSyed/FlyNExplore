
// // "use client";

// // import React, { useState } from "react";
// // import { FlightOffer, FlightSearchParams } from "@/types/flights";
// // import { getAccessToken } from "@/services/AccessToken";

// // const getFlights = async (params: FlightSearchParams) => {
// //   try {
// //     const token = await getAccessToken();

// //     const queryParams = new URLSearchParams({
// //       originLocationCode: params.home,
// //       destinationLocationCode: params.away,
// //       departureDate: params.depart,
// //       adults: params.adults.toString(),
// //     });

// //     if (params.returnDate) queryParams.append("returnDate", params.returnDate);
// //     if (params.nonStop) queryParams.append("nonStop", params.nonStop.toString());

// //     const response = await fetch(
// //       `http://localhost:3000/shopping/flight-offers?${queryParams.toString()}`,
// //       {
// //         method: "GET",
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           "Content-Type": "application/json",
// //         },
// //       }
// //     );

// //     if (!response.ok) {
// //       throw new Error(`HTTP error! Status: ${response.status}`);
// //     }

// //     const data = await response.json();

// //     return data.data.map((flight: FlightOffer) => {
// //       const itinerary = flight.itineraries[0];
// //       const segment = itinerary.segments[0];

// //       return {
// //         price: flight.price.total,
// //         carrier: segment.carrierCode,
// //         numStops: segment.numberOfStops,
// //         departure: segment.departure.iataCode,
// //         arrival: segment.arrival.iataCode,
// //       };
// //     });
// //   } catch (error) {
// //     console.error("Error fetching flights:", error);
// //     throw error;
// //   }
// // };

// // const FlightSearchPage: React.FC = () => {
// //   const [fromCity, setFromCity] = useState<string>("");
// //   const [toCity, setToCity] = useState<string>("");
// //   const [departDate, setDepartDate] = useState<string>("");
// //   const [returnDate, setReturnDate] = useState<string>("");
// //   const [isNonStop, setIsNonStop] = useState<boolean>(false);
// //   const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);
// //   const [flights, setFlights] = useState<any[]>([]);
// //   const [error, setError] = useState<string | null>(null);
// //   const [loading, setLoading] = useState<boolean>(false);

// //   const handleSearch = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError(null);

// //     try {
// //       const params: FlightSearchParams = {
// //         home: fromCity,
// //         away: toCity,
// //         depart: departDate,
// //         adults: 1,
// //         nonStop: isNonStop,
// //       };

// //       if (isRoundTrip) params.returnDate = returnDate;

// //       const results = await getFlights(params);
// //       setFlights(results);
// //     } catch (err) {
// //       setError("Failed to fetch flights. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flights-page">
// //       <h1>Search Flights</h1>
// //       <form onSubmit={handleSearch} className="flights-form">
// //         <div className="input-group">
// //           <label htmlFor="fromCity">From:</label>
// //           <input
// //             type="text"
// //             id="fromCity"
// //             placeholder="Departure airport (e.g., TPA)"
// //             value={fromCity}
// //             onChange={(e) => setFromCity(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <div className="input-group">
// //           <label htmlFor="toCity">To:</label>
// //           <input
// //             type="text"
// //             id="toCity"
// //             placeholder="Arrival airport (e.g., BKK)"
// //             value={toCity}
// //             onChange={(e) => setToCity(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <div className="input-group">
// //           <label htmlFor="departDate">Departure Date:</label>
// //           <input
// //             type="date"
// //             id="departDate"
// //             value={departDate}
// //             onChange={(e) => setDepartDate(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <div className="input-group">
// //           <label htmlFor="returnDate">Return Date:</label>
// //           <input
// //             type="date"
// //             id="returnDate"
// //             value={returnDate}
// //             onChange={(e) => setReturnDate(e.target.value)}
// //             disabled={!isRoundTrip}
// //           />
// //         </div>

// //         <div className="checkbox-group">
// //           <label>
// //             <input
// //               type="checkbox"
// //               checked={isNonStop}
// //               onChange={(e) => setIsNonStop(e.target.checked)}
// //             />
// //             Non-Stop
// //           </label>
// //         </div>

// //         <div className="checkbox-group">
// //           <label>
// //             <input
// //               type="checkbox"
// //               checked={isRoundTrip}
// //               onChange={(e) => setIsRoundTrip(e.target.checked)}
// //             />
// //             Round Trip
// //           </label>
// //         </div>

// //         <button type="submit" disabled={loading} className="search-button">
// //           {loading ? "Searching..." : "Search Flights"}
// //         </button>
// //       </form>

// //       {error && <p className="error-message">{error}</p>}

// //       <div className="flights-results">
// //         <h2>Flight Results:</h2>
// //         {flights.length > 0 ? (
// //           <ul>
// //             {flights.map((flight, index) => (
// //               <li key={index} className="flight-item">
// //                 <strong>Price:</strong> {flight.price} EUR
// //                 <br />
// //                 <strong>Carrier:</strong> {flight.carrier}
// //                 <br />
// //                 <strong>Stops:</strong> {flight.numStops}
// //                 <br />
// //                 <strong>Departure:</strong> {flight.departure}
// //                 <br />
// //                 <strong>Arrival:</strong> {flight.arrival}
// //               </li>
// //             ))}
// //           </ul>
// //         ) : (
// //           <p>No results found.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default FlightSearchPage;

// "use client";

// import React, { useState } from "react";
// import { FlightOffer, FlightSearchParams } from "@/types/flights";
// import { getAccessToken } from "@/services/AccessToken";

// const getFlights = async (params: FlightSearchParams) => {
//   try {
//     const token = await getAccessToken();

//     const queryParams = new URLSearchParams({
//       originLocationCode: params.home,
//       destinationLocationCode: params.away,
//       departureDate: params.depart,
//       adults: params.adults.toString(),
//     });

//     if (params.returnDate) queryParams.append("returnDate", params.returnDate);
//     if (params.nonStop) queryParams.append("nonStop", params.nonStop.toString());

//     const response = await fetch(
//       `http://localhost:3000/shopping/flight-offers?${queryParams.toString()}`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();

//     return data.data.map((flight: FlightOffer) => {
//       const itinerary = flight.itineraries[0];
//       const segment = itinerary.segments[0];

//       return {
//         price: flight.price.total,
//         carrier: flight.validatingAirlineCodes[0], // Use carrier code from validatingAirlineCodes
//         numStops: segment.numberOfStops,
//         departure: {
//           iataCode: segment.departure.iataCode,
//           time: segment.departure.at,
//         },
//         arrival: {
//           iataCode: segment.arrival.iataCode,
//           time: segment.arrival.at,
//         },
//       };
//     });
//   } catch (error) {
//     console.error("Error fetching flights:", error);
//     throw error;
//   }
// };

// const FlightSearchPage: React.FC = () => {
//   const [fromCity, setFromCity] = useState<string>("");
//   const [toCity, setToCity] = useState<string>("");
//   const [departDate, setDepartDate] = useState<string>("");
//   const [returnDate, setReturnDate] = useState<string>("");
//   const [isNonStop, setIsNonStop] = useState<boolean>(false);
//   const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);
//   const [flights, setFlights] = useState<any[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleSearch = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const params: FlightSearchParams = {
//         home: fromCity,
//         away: toCity,
//         depart: departDate,
//         adults: 1,
//         nonStop: isNonStop,
//       };

//       if (isRoundTrip) params.returnDate = returnDate;

//       const results = await getFlights(params);
//       setFlights(results);
//     } catch (err) {
//       setError("Failed to fetch flights. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flights-page">
//       <h1>Search Flights</h1>
//       <form onSubmit={handleSearch} className="flights-form">
//         <div className="input-group">
//           <label htmlFor="fromCity">From:</label>
//           <input
//             type="text"
//             id="fromCity"
//             placeholder="Departure airport (e.g., TPA)"
//             value={fromCity}
//             onChange={(e) => setFromCity(e.target.value)}
//             required
//           />
//         </div>

//         <div className="input-group">
//           <label htmlFor="toCity">To:</label>
//           <input
//             type="text"
//             id="toCity"
//             placeholder="Arrival airport (e.g., BKK)"
//             value={toCity}
//             onChange={(e) => setToCity(e.target.value)}
//             required
//           />
//         </div>

//         <div className="input-group">
//           <label htmlFor="departDate">Departure Date:</label>
//           <input
//             type="date"
//             id="departDate"
//             value={departDate}
//             onChange={(e) => setDepartDate(e.target.value)}
//             required
//           />
//         </div>

//         <div className="input-group">
//           <label htmlFor="returnDate">Return Date:</label>
//           <input
//             type="date"
//             id="returnDate"
//             value={returnDate}
//             onChange={(e) => setReturnDate(e.target.value)}
//             disabled={!isRoundTrip}
//           />
//         </div>

//         <div className="checkbox-group">
//           <label>
//             <input
//               type="checkbox"
//               checked={isNonStop}
//               onChange={(e) => setIsNonStop(e.target.checked)}
//             />
//             Non-Stop
//           </label>
//         </div>

//         <div className="checkbox-group">
//           <label>
//             <input
//               type="checkbox"
//               checked={isRoundTrip}
//               onChange={(e) => setIsRoundTrip(e.target.checked)}
//             />
//             Round Trip
//           </label>
//         </div>

//         <button type="submit" disabled={loading} className="search-button">
//           {loading ? "Searching..." : "Search Flights"}
//         </button>
//       </form>

//       {error && <p className="error-message">{error}</p>}

//       <div className="flights-results">
//         <h2>Flight Results:</h2>
//         {flights.length > 0 ? (
//           <ul className="flight-list">
//             {flights.map((flight, index) => (
//               <li key={index} className="flight-item">
//                 <div className="flight-header">
//                   <h3>{flight.carrier}</h3>
//                 </div>
//                 <div className="flight-details">
//                   <div className="flight-route">
//                     <p>
//                       <strong>Departure:</strong> {flight.departure.iataCode} at{" "}
//                       {new Date(flight.departure.time).toLocaleTimeString()}
//                     </p>
//                     <p>
//                       <strong>Arrival:</strong> {flight.arrival.iataCode} at{" "}
//                       {new Date(flight.arrival.time).toLocaleTimeString()}
//                     </p>
//                   </div>
//                   <div className="flight-price">
//                     <strong>{flight.price} EUR</strong>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No results found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FlightSearchPage;

"use client";

import React, { useState } from "react";
import { FlightOffer, FlightSearchParams } from "@/types/flights";
import { getAccessToken } from "@/services/AccessToken";

const getFlights = async (params: FlightSearchParams) => {
  try {
    const token = await getAccessToken();

    const queryParams = new URLSearchParams({
      originLocationCode: params.home,
      destinationLocationCode: params.away,
      departureDate: params.depart,
      adults: params.adults.toString(),
    });

    if (params.returnDate) queryParams.append("returnDate", params.returnDate);
    if (params.nonStop) queryParams.append("nonStop", params.nonStop.toString());

    const response = await fetch(
      `http://localhost:3000/shopping/flight-offers?${queryParams.toString()}`,
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

    // Convert EUR to USD (assume 1 EUR = 1.1 USD for simplicity)
    const conversionRate = 1.1;

    return data.data.map((flight: FlightOffer) => {
      const itinerary = flight.itineraries[0];
      const segment = itinerary.segments[0];

      return {
        price: (parseFloat(flight.price.total) * conversionRate).toFixed(2), // Convert to USD and format
        carrier:
          data.dictionaries.carriers[flight.validatingAirlineCodes[0]] || "Unknown Carrier",
        numStops: segment.numberOfStops,
        departure: {
          iataCode: segment.departure.iataCode,
          time: segment.departure.at,
        },
        arrival: {
          iataCode: segment.arrival.iataCode,
          time: segment.arrival.at,
        },
      };
    });
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};

const FlightSearchPage: React.FC = () => {
  const [fromCity, setFromCity] = useState<string>("");
  const [toCity, setToCity] = useState<string>("");
  const [departDate, setDepartDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [isNonStop, setIsNonStop] = useState<boolean>(false);
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);
  const [flights, setFlights] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const params: FlightSearchParams = {
        home: fromCity,
        away: toCity,
        depart: departDate,
        adults: 1,
        nonStop: isNonStop,
      };

      if (isRoundTrip) params.returnDate = returnDate;

      const results = await getFlights(params);
      setFlights(results);
    } catch (err) {
      setError("Failed to fetch flights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flights-page">
      <h1>Search Flights</h1>
      <form onSubmit={handleSearch} className="flights-form">
        <div className="input-group">
          <label htmlFor="fromCity">From:</label>
          <input
            type="text"
            id="fromCity"
            placeholder="Departure airport (e.g., TPA)"
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="toCity">To:</label>
          <input
            type="text"
            id="toCity"
            placeholder="Arrival airport (e.g., BKK)"
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="departDate">Departure Date:</label>
          <input
            type="date"
            id="departDate"
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="returnDate">Return Date:</label>
          <input
            type="date"
            id="returnDate"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            disabled={!isRoundTrip}
          />
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={isNonStop}
              onChange={(e) => setIsNonStop(e.target.checked)}
            />
            Non-Stop
          </label>
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={isRoundTrip}
              onChange={(e) => setIsRoundTrip(e.target.checked)}
            />
            Round Trip
          </label>
        </div>

        <button type="submit" disabled={loading} className="search-button">
          {loading ? "Searching..." : "Search Flights"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="flights-results">
        <h2>Flight Results:</h2>
        {flights.length > 0 ? (
          <ul className="flight-list">
            {flights.map((flight, index) => (
              <li key={index} className="flight-item">
                <div className="flight-header">
                  <h3>{flight.carrier}</h3>
                </div>
                <div className="flight-details">
                  <div className="flight-route">
                    <p>
                      <strong>Departure:</strong> {flight.departure.iataCode} at{" "}
                      {new Date(flight.departure.time).toLocaleString()}
                    </p>
                    <p>
                      <strong>Arrival:</strong> {flight.arrival.iataCode} at{" "}
                      {new Date(flight.arrival.time).toLocaleString()}
                    </p>
                  </div>
                  <div className="flight-price">
                    <strong>${flight.price}</strong>
                  </div>
                </div>
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

export default FlightSearchPage;
