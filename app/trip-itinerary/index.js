import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TripItinerary() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false  // Changed from true to false to avoid conflicts
    })
  }, []);

  const navigateToHome = () => {
    router.push('/home');
  }

  const navigateToItinerary = () => {
    // Stay on itinerary page
    router.push('/trip-itinerary');
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
    router.push('/create-itinerary');
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trip Itinerary</Text>
        <TouchableOpacity 
          onPress={navigateToProfile} 
          style={styles.profileButton} // Added specific style for better touch area
        >
          <Ionicons name="person-circle" size={40} color="black" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
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
          onPress={navigateToItinerary}
        >
          <Ionicons name="calendar" size={24} color="#3478F6" />
          <Text style={[styles.footerText, { color: '#3478F6' }]}>Expence Tracker</Text>
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
    padding: 10,  // Added padding to increase touch area
    zIndex: 10,   // Ensure it's above other elements
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 60, // Space for the footer
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