export interface Airport {
    meta: Meta;
    data: AirportLocation[];
  }
  
  export interface Meta {
    count: number;
    links: {
      self: string;
    };
  }
  
  export interface AirportLocation {
    type: string;
    subType: string;
    name: string;
    detailedName: string;
    id: string;
    self: {
      href: string;
      methods: string[];
    };
    timeZoneOffset: string;
    iataCode: string;
    geoCode: GeoCode;
    address: Address;
    analytics: Analytics;
  }
  
  export interface GeoCode {
    latitude: number;
    longitude: number;
  }
  
  export interface Address {
    cityName: string;
    cityCode: string;
    countryName: string;
    countryCode: string;
    stateCode: string;
    regionCode: string;
  }
  
  export interface Analytics {
    travelers: {
      score: number;
    };
  }
  