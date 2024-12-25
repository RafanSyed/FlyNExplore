// Types for Flight Search Parameters
export interface FlightSearchParams {
    home: string; // Origin airport code
    away: string; // Destination airport code
    depart: string; // Departure date in YYYY-MM-DD format
    adults: number; // Number of adults
    returnDate?: string; // Optional return date
    maxPrice?: string; // Optional max price
    nonStop?: boolean; // Optional non-stop flight preference
  }
  
  // Types for Flight Offer API Response
  export interface FlightOfferResponse {
    meta: {
      count: number;
      links: {
        self: string;
      };
    };
    data: FlightOffer[];
    dictionaries: Dictionaries;
  }
  
  export interface FlightOffer {
    type: string;
    id: string;
    price: {
      currency: string;
      total: string;
      base: string;
    };
    itineraries: Itinerary[];
    validatingAirlineCodes: string[];
  }
  
  export interface Itinerary {
    duration: string;
    segments: Segment[];
  }
  
  export interface Segment {
    departure: LocationDetails;
    arrival: LocationDetails;
    carrierCode: string;
    number: string;
    aircraft: {
      code: string;
    };
    operating?: {
      carrierCode: string;
    };
    duration: string;
    id: string;
    numberOfStops: number;
  }
  
  export interface LocationDetails {
    iataCode: string;
    terminal?: string;
    at: string; // Date and time of departure or arrival
  }
  
  export interface Dictionaries {
    locations: Record<string, Location>;
    aircraft: Record<string, string>;
    carriers: Record<string, string>;
    currencies: Record<string, string>;
  }
  
  export interface Location {
    cityCode: string;
    countryCode: string;
  }
  