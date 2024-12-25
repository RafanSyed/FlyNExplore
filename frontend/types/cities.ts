export interface CityResponse {
    meta: Meta;
    data: CityLocation[];
  }
  
  export interface Meta {
    count: number;
    links: {
      self: string;
    };
  }
  
  export interface CityLocation {
    type: string;
    subType: string;
    name: string;
    iataCode?: string; // Optional since some cities do not have an IATA code
    address: Address;
    geoCode: GeoCode;
  }
  
  export interface Address {
    countryCode: string;
    stateCode: string;
  }
  
  export interface GeoCode {
    latitude: number;
    longitude: number;
  }
  