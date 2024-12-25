export interface HotelResponse {
    data: Hotel[];
  }
  
  export interface Hotel {
    chainCode: string;
    iataCode: string;
    dupeId: number;
    name: string;
    hotelId: string;
    geoCode: GeoCode;
    address: Address;
    distance: Distance;
  }
  
  export interface GeoCode {
    latitude: number;
    longitude: number;
  }
  
  export interface Address {
    countryCode: string;
  }
  
  export interface Distance {
    value: number;
    unit: string;
  }
  