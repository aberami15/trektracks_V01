import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
// Make sure this file is saved as save-favourite/index.js for proper Expo Router file-based routing

export default function SaveFavourite() {
  const navigation = useNavigation();
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false  // Hide the header
    })
    
    // This would typically fetch saved favorites from storage or API
    // For now we'll use dummy data
    setFavorites([]);
  }, []);

  const navigateToHome = () => {
    router.push('/home');
  }

  const navigateToItinerary = () => {
    router.push('/trip-itinerary');
  }

  const navigateToFav = () => {
    // Stay on favorites page
    router.push('/save-favourite');
  }

  const navigateToRecentTrips = () => {
    router.push('/recent-trips');
  }

  const navigateToProfile = () => {
    console.log("Navigating to profile");
    router.push('/profile');
  }

  const handleAddFavorite = () => {
    // Navigate to search or add favorite place
    router.push('/search-places');
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorite Places</Text>
        <TouchableOpacity 
          onPress={navigateToProfile} 
          style={styles.profileButton}
        >
          <Ionicons name="person-circle" size={40} color="black" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {favorites.length > 0 ? (
          <FlatList
            data={favorites}
            renderItem={({ item }) => (
              <View style={styles.favoriteItem}>
                <Text style={styles.favoriteName}>{item.name}</Text>
                <Text style={styles.favoriteLocation}>{item.location}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={80} color="#ccc" />
            <Text style={styles.emptyTitle}>No Favorite Places</Text>
            <Text style={styles.emptyText}>
              Save your favorite destinations, restaurants, and attractions for easy access.
            </Text>
            <TouchableOpacity 
              style={styles.createButton}
              onPress={handleAddFavorite}
            >
              <Text style={styles.createButtonText}>Add Favorite</Text>
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
          onPress={navigateToItinerary}
        >
          <Ionicons name="calendar" size={24} color="#777" />
          <Text style={styles.footerText}>Expence Tracker</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerItem}
          onPress={navigateToFav}
        >
          <Ionicons name="heart" size={24} color="#3478F6" />
          <Text style={[styles.footerText, { color: '#3478F6' }]}>Favorites</Text>
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
  favoriteItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  favoriteName: {
    fontFamily: 'outfit-medium',
    fontSize: 18,
    color: '#333',
    marginBottom: 6,
  },
  favoriteLocation: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#777',
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