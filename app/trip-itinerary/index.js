import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import Footer from '../footer';
import Config from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TripItinerary() {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [aiGeneratedPlan, setAiGeneratedPlan] = useState('');
  const [loadingPlan, setLoadingPlan] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });

    // Get user info
    const getUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // Basic token parsing - in a real app you might want more validation
          const tokenData = JSON.parse(atob(token.split('.')[1]));
          setUser(tokenData);
          return tokenData.id;
        }
      } catch (error) {
        console.error('Error getting user info:', error);
      }
      return null;
    };

    // Fetch trips
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const userId = await getUserInfo();
        
        if (!userId) {
          console.error('No user ID found');
          setLoading(false);
          return;
        }

        const response = await fetch(`${Config.BASE_URL}/trips/mytrip/${userId}`);
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status === 'success') {
          setTrips(data.data || []);
        } else {
          console.error('Failed to fetch trips:', data.message);
        }
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  // Fetch AI plan if ID is provided
  useEffect(() => {
    // If we have an ID parameter, fetch the AI plan
    if (params.id) {
      const fetchTripPlan = async () => {
        setLoadingPlan(true);
        try {
          const response = await fetch(`${Config.BASE_URL}/travel/${params.id}`);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch trip plan: ${response.status}`);
          }
          
          const data = await response.json();
          if (data.status === 'success' && data.data.aiGeneratedPlan) {
            setAiGeneratedPlan(data.data.aiGeneratedPlan);
          }
        } catch (error) {
          console.error('Error fetching AI plan:', error);
        } finally {
          setLoadingPlan(false);
        }
      };
      
      fetchTripPlan();
    }
  }, [params.id]);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Calculate trip duration
  const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return '';
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
  };

  // Handle trip deletion
  const handleDeleteTrip = async (tripId) => {
    if (!tripId) return;
    
    try {
      const response = await fetch(`${Config.BASE_URL}/trips/${tripId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete trip');
      }
      
      // Update the trips list after deletion
      setTrips(trips.filter(trip => trip._id !== tripId));
      
    } catch (error) {
      console.error('Error deleting trip:', error);
      alert('Failed to delete trip: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.push('/home')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#3478F6" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Trips</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Ionicons name="person-circle" size={40} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3478F6" />
            <Text style={styles.loadingText}>Loading your trips...</Text>
          </View>
        ) : trips.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="map-outline" size={80} color="#ccc" />
            <Text style={styles.emptyTitle}>No Trips Yet</Text>
            <Text style={styles.emptyText}>Start planning your first adventure in Sri Lanka.</Text>
            <TouchableOpacity 
              style={styles.createTripButton}
              onPress={() => router.push('/create-trip')}
            >
              <Text style={styles.createTripButtonText}>Create New Trip</Text>
              <Ionicons name="add-circle-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* AI Generated Itinerary Section */}
            {(aiGeneratedPlan || loadingPlan) && (
              <View style={styles.aiPlanContainer}>
                <Text style={styles.sectionTitle}>AI Generated Itinerary</Text>
                
                {loadingPlan ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#3478F6" />
                    <Text style={styles.loadingText}>Loading your personalized itinerary...</Text>
                  </View>
                ) : (
                  <View style={styles.aiPlanContent}>
                    <Text style={styles.aiPlanText}>{aiGeneratedPlan}</Text>
                  </View>
                )}
              </View>
            )}

            {/* Trips List */}
            <View style={styles.tripsList}>
              <Text style={styles.listTitle}>Your Trips</Text>
              
              {trips.map((trip, index) => (
                <View key={index} style={styles.tripCard}>
                  <View style={styles.tripHeader}>
                    <Text style={styles.tripDestination}>{trip.destination}</Text>
                    <TouchableOpacity 
                      onPress={() => handleDeleteTrip(trip._id)}
                      style={styles.deleteButton}
                    >
                      <MaterialIcons name="delete" size={20} color="#FF3B30" />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.tripDateRow}>
                    <View style={styles.tripDateItem}>
                      <Text style={styles.tripDateLabel}>From</Text>
                      <Text style={styles.tripDate}>{formatDate(trip.startDate)}</Text>
                    </View>
                    <View style={styles.tripDateSeparator} />
                    <View style={styles.tripDateItem}>
                      <Text style={styles.tripDateLabel}>To</Text>
                      <Text style={styles.tripDate}>{formatDate(trip.endDate)}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.tripDetails}>
                    <View style={styles.tripDetailItem}>
                      <Ionicons name="time-outline" size={16} color="#3478F6" />
                      <Text style={styles.tripDetailText}>
                        {calculateDuration(trip.startDate, trip.endDate)}
                      </Text>
                    </View>
                    
                    <View style={styles.tripDetailItem}>
                      <Ionicons name="location-outline" size={16} color="#3478F6" />
                      <Text style={styles.tripDetailText}>
                        {trip.from} to {trip.destination}
                      </Text>
                    </View>
                    
                    {trip.budget > 0 && (
                      <View style={styles.tripDetailItem}>
                        <Ionicons name="wallet-outline" size={16} color="#3478F6" />
                        <Text style={styles.tripDetailText}>
                          Budget: LKR {trip.budget.toLocaleString()}
                        </Text>
                      </View>
                    )}
                    
                    {trip.travelCategory && (
                      <View style={styles.tripDetailItem}>
                        <Ionicons name="people-outline" size={16} color="#3478F6" />
                        <Text style={styles.tripDetailText}>
                          {trip.travelCategory}
                        </Text>
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.tripActions}>
                    <TouchableOpacity 
                      style={styles.tripActionButton}
                      onPress={() => router.push(`/budget-planner?q=${encodeURIComponent(trip._id)}`)}
                    >
                      <Ionicons name="calculator-outline" size={16} color="white" />
                      <Text style={styles.tripActionText}>Budget</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.tripActionButton}
                      onPress={() => router.push(`/trip-itinerary?id=${encodeURIComponent(trip._id)}`)}
                    >
                      <Ionicons name="document-text-outline" size={16} color="white" />
                      <Text style={styles.tripActionText}>Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
              
              <TouchableOpacity 
                style={styles.createTripButton}
                onPress={() => router.push('/create-trip')}
              >
                <Text style={styles.createTripButtonText}>Create New Trip</Text>
                <Ionicons name="add-circle-outline" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 22,
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingBottom: 80, // Extra padding for footer
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#666',
    marginTop: 15,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 22,
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  tripsList: {
    marginBottom: 20,
  },
  listTitle: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
    color: '#333',
    marginBottom: 15,
  },
  tripCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  tripDestination: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    color: '#333',
  },
  deleteButton: {
    padding: 5,
  },
  tripDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 10,
    padding: 15,
  },
  tripDateItem: {
    flex: 1,
    alignItems: 'center',
  },
  tripDateLabel: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  tripDate: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: '#333',
  },
  tripDateSeparator: {
    height: 30,
    width: 1,
    backgroundColor: '#e8e8e8',
    marginHorizontal: 15,
  },
  tripDetails: {
    marginBottom: 20,
  },
  tripDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tripDetailText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  tripActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tripActionButton: {
    backgroundColor: '#3478F6',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  tripActionText: {
    fontFamily: 'outfit-medium',
    fontSize: 14,
    color: 'white',
    marginLeft: 5,
  },
  createTripButton: {
    backgroundColor: '#3478F6',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  createTripButtonText: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: 'white',
    marginRight: 8,
  },
  aiPlanContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
  },
  aiPlanContent: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  aiPlanText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});