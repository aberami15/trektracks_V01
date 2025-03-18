import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TripItinerary() {
  const navigation = useNavigation();
  const router = useRouter();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false  // Changed from true to false to avoid conflicts
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
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/trips/mytrip`, {
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
      console.log("Fetched trips:", data);
        
      // Make sure to set the correct data structure
      if (data && data.data) {
        setTrips(data.data);
      } else {
        console.warn("Unexpected data structure:", data);
        setTrips([]);
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
      setTrips([]);
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
    router.push('/ai-planning');
  }

  const handleViewTrip = (tripId) => {
    // Navigate to trip plan view
    router.push(`/trip-plan?id=${tripId}`);
  }

  const renderTripItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.tripCard}
      onPress={() => handleViewTrip(item._id)}
    >
      <View style={styles.tripCardHeader}>
        <Text style={styles.tripDestination}>{item.from} → {item.destination}</Text>
        <View style={styles.dateContainer}>
          <Ionicons name="calendar-outline" size={16} color="#666" />
          <Text style={styles.tripDate}>
            {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
          </Text>
        </View>
      </View>

      <View style={styles.tripDetails}>
        {item.travelerCategory && (
          <View style={styles.tripDetailItem}>
            <Ionicons name="people-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.travelerCategory}</Text>
          </View>
        )}
        
        {item.tripType && (
          <View style={styles.tripDetailItem}>
            <Ionicons name="compass-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.tripType}</Text>
          </View>
        )}
        
        {item.vehicle && (
          <View style={styles.tripDetailItem}>
            <Ionicons name="car-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.vehicle}</Text>
          </View>
        )}
        
        {item.budget && (
          <View style={styles.tripDetailItem}>
            <Ionicons name="wallet-outline" size={16} color="#666" />
            <Text style={styles.detailText}>LKR {Number(item.budget).toLocaleString()}</Text>
          </View>
        )}
      </View>

      <View style={styles.tripCardFooter}>
        <TouchableOpacity 
          style={styles.viewButton}
          onPress={() => handleViewTrip(item._id)}
        >
          <Text style={styles.viewButtonText}>View Details</Text>
          <Ionicons name="chevron-forward" size={16} color="#3478F6" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

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
      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3478F6" />
            <Text style={styles.loadingText}>Loading trips...</Text>
          </View>
        ) : trips.length > 0 ? (
          <FlatList
            data={trips}
            renderItem={renderTripItem}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.tripsList}
          />
        ) : (
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
      </View>

      {/* Create Trip FAB */}
      {trips.length > 0 && (
        <TouchableOpacity 
          style={styles.fabButton}
          onPress={handleCreateItinerary}
        >
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      )}

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
    marginBottom: 60, // Space for the footer
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#666',
    marginTop: 10,
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
    backgroundColor: '#3478F6',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  createButtonText: {
    fontFamily: 'outfit-medium',
    color: 'white',
    fontSize: 16,
  },
  tripsList: {
    paddingBottom: 80,
  },
  tripCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tripCardHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  tripDestination: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripDate: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  tripDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  tripDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 8,
  },
  detailText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  tripCardFooter: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f2f2f2',
    alignItems: 'flex-end',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewButtonText: {
    fontFamily: 'outfit-medium',
    fontSize: 14,
    color: '#3478F6',
    marginRight: 5,
  },
  fabButton: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3478F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
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