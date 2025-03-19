import { Platform } from 'react-native';

// IMPORTANT: Edit this with your actual machine's local IP address where the server is running
const LOCAL_IP = '192.168.36.221'; // ← REPLACE THIS with your computer's IP address

// API URL configuration
export const API_URL = Platform.select({
  // For React Native apps
  native: `http://${LOCAL_IP}:5000`,
  // For web
  default: 'http://localhost:5000',
});

// Debug info
console.log(`API URL configured as: ${API_URL}`);