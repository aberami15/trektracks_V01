import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { Component, useEffect , useState} from 'react'
import {jwtDecode} from 'jwt-decode';
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

  useEffect(() => {
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

  const handleCreateTrip = () => {
    // Navigate to create itinerary form
    router.push('/create-trip');
  }

  const DirectToExpTrack = () => {
    // Navigate to budget overview page 
    router.push('/budget-planner');
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
        onPress={() => console.log(`Navigate to trip detail for ${trip._id}`)}
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
              <MaterialIcons name="flight-takeoff" size={18} color="#3478F6" />
              <Text style={styles.detailLabel}>From:</Text>
              <Text style={styles.detailText}>{trip.from}</Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialIcons name="flight-land" size={18} color="#3478F6" />
              <Text style={styles.detailLabel}>To:</Text>
              <Text style={styles.detailText}>{trip.destination}</Text>
            </View>
          </View>

          <View style={styles.tripDetailRow}>
            <View style={styles.detailItem}>
              <MaterialIcons name="account-balance-wallet" size={18} color="#3478F6" />
              <Text style={styles.detailLabel}>Budget:</Text>
              <Text style={styles.detailText}>{trip.budget}</Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialIcons name="directions-car" size={18} color="#3478F6" />
              <Text style={styles.detailLabel}>Vehicle:</Text>
              <Text style={styles.detailText}>{trip.vehicle}</Text>
            </View>
          </View>

          <View style={styles.tripDetailRow}>
            <View style={styles.detailItem}>
              <MaterialIcons name="group" size={18} color="#3478F6" />
              <Text style={styles.detailLabel}>Category:</Text>
              <Text style={styles.detailText}>{trip.tripType}</Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialIcons name="category" size={18} color="#3478F6" />
              <Text style={styles.detailLabel}>Type:</Text>
              <Text style={styles.detailText}>{trip.tripType}</Text>
            </View>
          </View>

          {/* <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>Description:</Text>
            <Text style={styles.descriptionText}>{trip.description}</Text>
          </View> */}

          <View style={styles.actionButtons}>
          <TouchableOpacity 
          style={styles.actionButton}
          onPress={DirectToExpTrack}>
              <MaterialIcons name="edit" size={18} color="#3478F6" />
              <Text style={styles.actionButtonText}>View Expence</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialIcons name="edit" size={18} color="#3478F6" />
              <Text style={styles.actionButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialIcons name="delete" size={18} color="#FF3B30" />
              <Text style={[styles.actionButtonText, {color: '#FF3B30'}]}>Delete</Text>
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
        <Text style={styles.headerTitle}>My Trip</Text>
        <TouchableOpacity 
          onPress={navigateToProfile} 
          style={styles.profileButton} // Added specific style for better touch area
        >
          <Ionicons name="person-circle" size={40} color="black" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {trips && trips.length  > 0 ? (
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
      <Footer/>
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
    padding: 10,  // Added padding to increase touch area
    zIndex: 10,   // Ensure it's above other elements
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 60, // Space for the footer
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
    backgroundColor: '#3478F6',
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
    color: '#555',
    marginLeft: 5,
    marginRight: 5,
  },
  detailText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#333',
  },
  descriptionContainer: {
    marginTop: 5,
    marginBottom: 15,
  },
  descriptionLabel: {
    fontFamily: 'outfit-medium',
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  descriptionText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
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
    color: '#3478F6',
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