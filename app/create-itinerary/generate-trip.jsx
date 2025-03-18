import { View, Text, ActivityIndicator, Button } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

export default function GenerateTrip({ route }) {
  const [loading, setLoading] = useState(false);
  const [tripPlan, setTripPlan] = useState('');
  const [error, setError] = useState(null); // Add error state

  const { destination, days, travelerCategory, tripType, vehicle } = route.params;

  const fetchTripPlan = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await axios.post('http://your-backend-url.com/api/generate-trip', {
        destination,
        days,
        travelerCategory,
        tripType,
        vehicle,
      });
      setTripPlan(response.data);
    } catch (err) {
      console.error('Error fetching trip plan:', err);
      setError('Failed to generate trip plan. Please try again.'); // Set error message
    }
    setLoading(false);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>AI-Generated Trip Plan</Text>
      {loading ? (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 10 }}>Generating your trip plan...</Text>
        </View>
      ) : error ? (
        <Text style={{ color: 'red', marginTop: 20 }}>{error}</Text>
      ) : (
        <Text style={{ marginTop: 20 }}>{tripPlan}</Text>
      )}
      <Button title="Generate Plan" onPress={fetchTripPlan} />
    </View>
  );
}