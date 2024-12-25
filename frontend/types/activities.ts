export interface ActivityResponse {
    data: Activity[];
  }
  
  export interface Activity {
    type: string; // Always "activity"
    id: string; // Unique identifier for the activity
    self: SelfLink; // Contains link and methods
    name: string; // Name of the activity
    shortDescription: string; // Short description
    description: string; // Full description
    geoCode: GeoCode; // Geographical information
    price: Price; // Pricing information
    pictures: string[]; // Array of picture URLs
    bookingLink: string; // URL to book the activity
    minimumDuration: string; // Minimum duration for the activity
  }
  
  export interface SelfLink {
    href: string; // URL for the activity resource
    methods: string[]; // Supported HTTP methods (e.g., "GET")
  }
  
  export interface GeoCode {
    latitude: number; // Latitude of the location
    longitude: number; // Longitude of the location
  }
  
  export interface Price {
    amount: string; // Price amount as a string
    currencyCode: string; // Currency code (e.g., "USD")
  }
  