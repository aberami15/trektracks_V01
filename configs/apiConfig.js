import AsyncStorage from '@react-native-async-storage/async-storage';

const getApiBaseUrl = () => {
  // This function returns the appropriate base URL depending on environment
  // For a real app, you would have these URLs in your environment variables
  
  // For development on an Android emulator
  const ANDROID_EMULATOR_URL = 'http://10.0.2.2:5000';
  
  // For development on actual devices on same WiFi network as dev machine
  // Replace with your actual local IP
  const LOCAL_NETWORK_URL = 'http://10.31.25.1:5000';
  
  // For production (would be your actual deployed API)
  const PRODUCTION_URL = 'https://api.yourdomain.com';

  // For testing purposes, we'll use the LOCAL_NETWORK_URL
  return LOCAL_NETWORK_URL;
};

export const API_BASE_URL = getApiBaseUrl();

// HTTP request helper with error handling
export const fetchApi = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Set default headers
    if (!options.headers) {
      options.headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
    }
    
    // Get token from AsyncStorage if available
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        options.headers.Authorization = `Bearer ${token}`;
      }
    } catch (storageError) {
      console.log('Failed to get token from storage:', storageError);
      // Continue without the token
    }
    
    console.log(`Fetching ${url} with options:`, options);
    
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (!response.ok) {
      // Format error message
      const errorMessage = data.message || `API error with status ${response.status}`;
      throw new Error(errorMessage);
    }
    
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};