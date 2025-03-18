import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';

export default function TripPlan() {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const tripId = params.id;

  const [loading, setLoading] = useState(true);
  const [tripData, setTripData] = useState(null);
  const [plan, setPlan] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    
    fetchTripData();
  }, [tripId]);

  const fetchTripData = async () => {
    try {
      setLoading(true);
      
      if (!tripId) {
        throw new Error('Trip ID is missing');
      }
      
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/trips/${tripId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch trip data');
      }
      
      const data = await response.json();
      setTripData(data.data);
      
      // Set plan from description if it exists
      // In a real implementation, you might have a separate field for the plan
      if (data.data.description) {
        setPlan(data.data.description);
      }
      
    } catch (error) {
      console.error('Error fetching trip data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditTrip = () => {
    // Navigate to edit trip page
    router.push(`/edit-trip/${tripId}`);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3478F6" />
        <Text style={styles.loadingText}>Loading trip plan...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trip Plan</Text>
        <TouchableOpacity onPress={handleEditTrip}>
          <Ionicons name="create-outline" size={24} color="#3478F6" />
        </TouchableOpacity>
      </View>

      {/* Trip Details */}
      {tripData && (
        <View style={styles.tripDetailsContainer}>
          <Text style={styles.destinationText}>
            {tripData.from} → {tripData.destination}
          </Text>
          <View style={styles.tripInfoRow}>
            <View style={styles.tripInfoItem}>
              <Ionicons name="calendar-outline" size={16} color="#666" />
              <Text style={styles.tripInfoText}>
                {new Date(tripData.startDate).toLocaleDateString()} - {new Date(tripData.endDate).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.tripInfoItem}>
              <Ionicons name="people-outline" size={16} color="#666" />
              <Text style={styles.tripInfoText}>{tripData.travelerCategory || 'Not specified'}</Text>
            </View>
          </View>
          <View style={styles.tripInfoRow}>
            <View style={styles.tripInfoItem}>
              <Ionicons name="car-outline" size={16} color="#666" />
              <Text style={styles.tripInfoText}>{tripData.vehicle || 'Not specified'}</Text>
            </View>
            <View style={styles.tripInfoItem}>
              <Ionicons name="wallet-outline" size={16} color="#666" />
              <Text style={styles.tripInfoText}>
                LKR {tripData.budget ? Number(tripData.budget).toLocaleString() : 'Not specified'}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Trip Plan */}
      <ScrollView style={styles.planContainer}>
        {plan ? (
          <Text style={styles.planText}>{plan}</Text>
        ) : (
          <View style={styles.noplanContainer}>
            <Ionicons name="document-text-outline" size={60} color="#ccc" />
            <Text style={styles.noplanText}>No detailed plan is available for this trip.</Text>
            <TouchableOpacity 
              style={styles.generateButton}
              onPress={() => router.push(`/create-trip?edit=${tripId}`)}
            >
              <Text style={styles.generateButtonText}>Generate Plan</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity 
          style={styles.budgetButton}
          onPress={() => router.push(`/budget-planner?tripId=${tripId}`)}
        >
          <Ionicons name="wallet-outline" size={20} color="white" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Budget Planner</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingText: {
    marginTop: 10,
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    color: '#333',
  },
  tripDetailsContainer: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  destinationText: {
    fontFamily: 'outfit-bold',
    fontSize: 22,
    color: '#333',
    marginBottom: 10,
  },
  tripInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  tripInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripInfoText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  planContainer: {
    flex: 1,
    padding: 20,
  },
  planText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  noplanContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 50,
  },
  noplanText: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  generateButton: {
    backgroundColor: '#3478F6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  generateButtonText: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: 'white',
  },
  actionButtonsContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f2f2f2',
  },
  budgetButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: 'white',
  },
});