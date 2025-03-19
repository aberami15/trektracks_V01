import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TripItinerary() {
  const navigation = useNavigation();
  const router = useRouter();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    fetchTrips();
  }, []);

  const navigateToHome = () => {
    router.push('/home');
  }

  const navigateToExpenseTracker = () => {
    // Navigate to the budget planner page
    router.push('/budget-planner');
  }

  const fetchTrips = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get the token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      const response = await fetch('http://10.31.25.1:5000/api/trips/mytrip', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.data) {
        setTrips(data.data);
      } else {
        // No trips or empty data
        setTrips([]);
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
      setError(error.message);
      // Don't show alert, just set the error state
    } finally {
      setLoading(false);
    }
  };

  const navigateToFav = () => {
    // Navigate to favorites page
    router.push('/save-favourite');
  }

  const navigateToRecentTrips = () => {
    router.push('/recent-trips');
  }

  const navigateToProfile = () => {
    // Explicit function for profile navigation
    console.log("Navigating to profile");
    router.push('/profile');
  }

  const handleCreateItinerary = () => {
    // Navigate to create itinerary form
    router.push('/create-trip');
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Trip</Text>
        <TouchableOpacity 
          onPress={navigateToProfile} 
          style={styles.profileButton}
        >
          <Ionicons name="person-circle" size={40} color="black" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3478F6" />
            <Text style={styles.loadingText}>Loading trips...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={60} color="#FF3B30" />
            <Text style={styles.errorTitle}>Oops!</Text>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={fetchTrips}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : trips.length > 0 ? (
          // Render trips here
          <View>
            <Text style={styles.sectionTitle}>Your Upcoming Trips</Text>
            {trips.map((trip, index) => (
              <View key={index} style={styles.tripCard}>
                <Text style={styles.tripDestination}>{trip.destination}</Text>
                <Text style={styles.tripDate}>
                  {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                </Text>
                <Text style={styles.tripType}>{trip.tripType || 'Trip'}</Text>
                
                <View style={styles.tripButtonsContainer}>
                  <TouchableOpacity 
                    style={styles.tripButton}
                    onPress={() => router.push('/plan-display')}
                  >
                    <Text style={styles.tripButtonText}>View Plan</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.tripButton, styles.budgetButton]}
                    onPress={() => router.push('/budget-planner')}
                  >
                    <Text style={styles.tripButtonText}>Budget</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          // Empty state
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={80} color="#ccc" />
            <Text style={styles.emptyTitle}>No Upcoming Trips</Text>
            <Text style={styles.emptyText}>
              Your upcoming trip itineraries will appear here. Plan your next adventure!
            </Text>
            <TouchableOpacity 
              style={styles.createButton}
              onPress={handleCreateItinerary}
            >
              <Text style={styles.createButtonText}>Create Trip</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerItem} 
          onPress={navigateToHome}
        >
          <Ionicons name="home" size={24} color="#777" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerItem}
          onPress={navigateToExpenseTracker}
        >
          <Ionicons name="wallet" size={24} color="#3478F6" />
          <Text style={[styles.footerText, { color: '#3478F6' }]}>Expense</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.footerItem}
          onPress={navigateToFav}
        >
          <Ionicons name="heart" size={24} color="#777" />
          <Text style={styles.footerText}>Favourites</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerItem}
          onPress={navigateToRecentTrips}
        >
          <Ionicons name="time" size={24} color="#777" />
          <Text style={styles.footerText}>Recent</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 28,
    color: '#333',
  },
  profileButton: {
    padding: 10,
    zIndex: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  loadingContainer: {
    padding: 50,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    padding: 50,
    alignItems: 'center',
  },
  errorTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    color: '#333',
    marginTop: 15,
    marginBottom: 5,
  },
  errorText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#3478F6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  retryButtonText: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: 'white',
  },
  sectionTitle: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
    color: '#333',
    marginBottom: 15,
  },
  tripCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tripDestination: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  tripDate: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  tripType: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#3478F6',
    marginBottom: 15,
  },
  tripButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tripButton: {
    backgroundColor: '#3478F6',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  budgetButton: {
    backgroundColor: '#4CAF50',
    marginRight: 0,
  },
  tripButtonText: {
    fontFamily: 'outfit-medium',
    fontSize: 14,
    color: 'white',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 120,
  },
  emptyTitle: {
    fontFamily: 'outfit-medium',
    fontSize: 22,
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  createButton: {
    backgroundColor: 'black',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  createButtonText: {
    fontFamily: 'outfit-medium',
    color: 'white',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    paddingBottom: 5,
  },
  footerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  footerText: {
    fontFamily: 'outfit',
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
});