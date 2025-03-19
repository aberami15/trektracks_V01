// utils/api.js
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configure the base API URL based on platform
export const API_URL = Platform.select({
  android: __DEV__ ? 'http://10.0.2.2:5000' : 'https://your-production-server.com',
  ios: __DEV__ ? 'http://localhost:5000' : 'https://your-production-server.com',
  web: __DEV__ ? 'http://localhost:5000' : 'https://your-production-server.com',
  default: __DEV__ ? 'http://localhost:5000' : 'https://your-production-server.com'
});

// For testing with Expo Go on real devices, uncomment and set your computer's IP
// export const API_URL = 'http://192.168.1.XXX:5000'; // Replace with your computer's IP

// Helper function for API calls with auth
export const callAPI = async (endpoint, method = 'GET', data = null) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const config = {
      method,
      headers
    };
    
    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      config.body = JSON.stringify(data);
    }
    
    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};