import express, { Request, Response} from "express";
import axios from 'axios';
import * as dotenv from 'dotenv';


dotenv.config()


const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

let accessToken = "";
let tokenExpiryTime = 0;

const fetchAccessToken = async (): Promise<void> => {
    try {
      console.log("Fetching access token...");
  
      const response = await axios.post("https://test.api.amadeus.com/v1/security/oauth2/token", //will probs have to replace the link with a varialble for safe use 
        "grant_type=client_credentials&client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET, 
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
  
      accessToken = response.data.access_token;
      tokenExpiryTime = Date.now() + response.data.expires_in * 1000; // Save token expiry time
      console.log("Access token fetched successfully:", accessToken);
    } catch (error: any) {
      console.error("Error fetching access token:", error.response?.data || error.message);
      throw new Error("Failed to fetch access token");
    }
};


const ensureValidToken = async (req: Request, res: Response, next: Function): Promise<void> => {
    try {
        // If token is missing or expired, fetch a new one
        if (!accessToken || Date.now() >= tokenExpiryTime) {
          console.log("Access token missing or expired. Fetching a new one...");
          await fetchAccessToken();
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Failed to authenticate with Amadeus API" });
    }
};


app.get('/reference-data/locations', ensureValidToken, async (req: Request, res: Response) => {

   try {
        const queryParams = req.query
        const response = await axios.get(`https://test.api.amadeus.com/v1/reference-data/locations`, { //will probs have to replace the link with a varialble for safe use 
           params: {
               ...queryParams
           },
           headers: {
               Authorization: `Bearer ${accessToken}`,
           },
        });
        res.status(200).json(response.data);
        console.log(response.data)    
   } catch (error: any) {
        console.error('API Error:', error.message);
        res.status(500).json({ message: 'Error fetching data', error: error.message });
   }
});

app.get('/reference-data/locations/hotels/by-city', ensureValidToken, async (req: Request, res: Response) => {

    try {
         const queryParams = req.query
         const response = await axios.get(`https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city`, { //will probs have to replace the link with a varialble for safe use 
            params: {
                ...queryParams
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
         });
         res.status(200).json(response.data);
         console.log(response.data)    
    } catch (error: any) {
         console.error('API Error:', error.message);
         res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
});

app.get('/reference-data/locations/cities', ensureValidToken, async (req: Request, res: Response) => {

    try {
         const queryParams = req.query
         const response = await axios.get(`https://test.api.amadeus.com/v1/reference-data/locations/cities`, { //will probs have to replace the link with a varialble for safe use 
            params: {
                ...queryParams
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
         });
         res.status(200).json(response.data);
         console.log(response.data)    
    } catch (error: any) {
         console.error('API Error:', error.message);
         res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
});

app.get('/shopping/activities', ensureValidToken, async (req: Request, res: Response) => {

    try {
         const queryParams = req.query
         const response = await axios.get(`https://test.api.amadeus.com/v1/shopping/activities`, { //will probs have to replace the link with a varialble for safe use 
            params: {
                ...queryParams
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
         });
         res.status(200).json(response.data);
         console.log(response.data)    
    } catch (error: any) {
         console.error('API Error:', error.message);
         res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
});

app.get('/shopping/flight-offers', ensureValidToken, async (req: Request, res: Response) => {

    try {
         const queryParams = req.query
         const response = await axios.get(`https://test.api.amadeus.com/v2/shopping/flight-offers`, { //will probs have to replace the link with a varialble for safe use 
            params: {
                ...queryParams
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
         });
         res.status(200).json(response.data);
         console.log(response.data)    
    } catch (error: any) {
         console.error('API Error:', error.message);
         res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
});


app.listen(PORT, async () => {
    try {
      console.log(`Server is running on port ${PORT}`);
      await fetchAccessToken(); // Fetch an initial token on server start
    } catch (error: any) {
      console.error("Failed to initialize server:", error.message);
    }
  });