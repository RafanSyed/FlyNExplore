export const getAccessToken = async (): Promise<string> => {
    try {
        const response = await fetch('http://localhost:3000/auth/token'); // Adjust the URL based on your backend deployment
        const data = await response.json();
        return data.accessToken;
    } catch (error) {
        console.error('Error fetching access token:', error);
        throw new Error('Unable to fetch access token');
    }
};
