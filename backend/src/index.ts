import express, { Request, Response} from "express";
import axios from 'axios';
import * as dotenv from 'dotenv';
import cors from 'cors';


dotenv.config()


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

let accessToken = "";
let tokenExpiryTime = 0;

app.use(cors({
    origin: 'http://localhost:3001', // Replace with your frontend's origin
    methods: ['GET', 'POST'], // Allowed HTTP methods
    credentials: true // If you need to include cookies or authentication headers
  }));

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

app.get('/auth/token', ensureValidToken, (req: Request, res: Response) => {
    res.status(200).json({ accessToken });
  });  


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

app.post('/artificial-intelligence', async (req: Request, res: Response): Promise<any>=> {
  try {
    console.log('Middleware works, request reached the handler.');
    const { prompt } = req.body;

    if (!prompt) {
      console.log('Prompt is missing.');
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('Received prompt:', prompt);

    const apiKey = process.env.API_KEY;
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Gemini API response:', response.data);
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Error interacting with the Gemini API:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Gemini API' });
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