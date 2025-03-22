import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import Footer from '../footer';
import Config from '../../config';

export default function TripItinerary() {
  const navigation = useNavigation();
  const router = useRouter();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

 
  const fetchTrips = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error("No authentication token found");
      }
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      const response = await fetch(`${Config.BASE_URL}/trips/mytrip/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      
      setTrips(responseData.data || []);
    } catch (error) {
      console.error('Error fetching trips:', error);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  const navigateToProfile = () => {
    // Explicit function for profile navigation
    console.log("Navigating to profile");
    router.push('/profile');
  }

  const deleteTrip = async (id) => {
    try {
      Alert.alert(
        "Delete Trip",
        "Are you sure you want to delete this trip?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Delete",
            onPress: async () => {
              try {
                const response = await fetch(`${Config.BASE_URL}/trips/${id}`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });

                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                // After successful deletion, refresh the trips list
                fetchTrips();
                Alert.alert("Success", "Trip deleted successfully");
              } catch (error) {
                console.error('Error deleting trip:', error);
                Alert.alert("Error", "Failed to delete the trip");
              }
            },
            style: "destructive"
          }
        ]
      );
    } catch (error) {
      console.error('Error in delete function:', error);
      Alert.alert("Error", "Something went wrong");
    }
  }

  const handleCreateTrip = () => {
    // Navigate to create itinerary form
    router.push('/create-trip');
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const renderTripCard = (trip) => {
    return (
      <TouchableOpacity 
        key={trip._id}
        style={styles.tripCard}
        onPress={() => router.push(`/budget-planner?q=${encodeURIComponent(trip._id)}`)}
      >
        <View style={styles.tripHeader}>
          <Text style={styles.tripName}>{trip.name}</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>
              {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
            </Text>
          </View>
        </View>

        <View style={styles.tripDetails}>
          <View style={styles.tripDetailRow}>
            <View style={styles.detailItem}>
              <MaterialIcons name="flight-takeoff" size={18} color="#37A794" />
              <Text style={styles.detailLabel}>From:</Text>
              <Text style={styles.detailText}>{trip.from}</Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialIcons name="flight-land" size={18} color="#37A794" />
              <Text style={styles.detailLabel}>To:</Text>
              <Text style={styles.detailText}>{trip.destination}</Text>
            </View>
          </View>

          <View style={styles.tripDetailRow}>
            <View style={styles.detailItem}>
              <MaterialIcons name="account-balance-wallet" size={18} color="#37A794" />
              <Text style={styles.detailLabel}>Budget:</Text>
              <Text style={styles.detailText}>{trip.budget}</Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialIcons name="directions-car" size={18} color="#37A794" />
              <Text style={styles.detailLabel}>Vehicle:</Text>
              <Text style={styles.detailText}>{trip.vehicle}</Text>
            </View>
          </View>

          <View style={styles.tripDetailRow}>
            <View style={styles.detailItem}>
              <MaterialIcons name="group" size={18} color="#37A794"/>
              <Text style={styles.detailLabel}>Category:</Text>
              <Text style={styles.detailText}>{trip.tripType}</Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialIcons name="category" size={18} color="#37A794" />
              <Text style={styles.detailLabel}>Type:</Text>
              <Text style={styles.detailText}>{trip.tripType}</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            

            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => deleteTrip(trip._id)}
            >
              <MaterialIcons name="delete" size={18} color="#FF3B30" />
              <Text style={[styles.actionButtonText, {color: '#FF3B30'}]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Trips</Text>
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
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Loading trips...</Text>
          </View>
        ) : trips && trips.length > 0 ? (
          <View style={styles.tripCardsContainer}>
            {trips.map(trip => renderTripCard(trip))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={80} color="#ccc" />
            <Text style={styles.emptyTitle}>No Upcoming Trips</Text>
            <Text style={styles.emptyText}>
              Your upcoming trip itineraries will appear here. Plan your next adventure!
            </Text>
          </View>
        )}
        
        {/* Create Trip Button - always visible, regardless of whether trips exist */}
        <View style={styles.createButtonContainer}>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={handleCreateTrip}
          >
            <Text style={styles.createButtonText}>Create Trip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA', // Light blue-gray background
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
    color: '#2C3E50', // Dark blue-gray
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
  tripCardsContainer: {
    marginBottom: 20,
  },
  tripCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  tripHeader: {
    backgroundColor: '#37A794', // Teal (ocean color)
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  tripName: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateLabel: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  tripDetails: {
    padding: 15,
  },
  tripDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontFamily: 'outfit-medium',
    fontSize: 14,
    color: '#5D7A96', // Blue-gray
    marginLeft: 5,
    marginRight: 5,
  },
  detailText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#2C3E50', // Dark blue-gray
  },
  descriptionContainer: {
    marginTop: 5,
    marginBottom: 15,
  },
  descriptionLabel: {
    fontFamily: 'outfit-medium',
    fontSize: 14,
    color: '#5D7A96', // Blue-gray
    marginBottom: 3,
  },
  descriptionText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#2C3E50', // Dark blue-gray
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#EFF4F7', // Light blue-gray
    paddingTop: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  actionButtonText: {
    fontFamily: 'outfit-medium',
    fontSize: 14,
    color: '#37A794', // Teal (ocean color)
    marginLeft: 5,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 120,
  },
  emptyTitle: {
    fontFamily: 'outfit-medium',
    fontSize: 22,
    color: '#2C3E50', // Dark blue-gray
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#5D7A96', // Blue-gray
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  createButtonContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  createButton: {
    backgroundColor: '#1C6E85', // Deep ocean blue
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  createButtonText: {
    fontFamily: 'outfit-medium',
    color: 'white',
    fontSize: 16,
  }
});