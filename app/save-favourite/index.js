import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Config from '../../config';
import { jwtDecode } from 'jwt-decode';
import Ionicons from '@expo/vector-icons/Ionicons';
import Footer from '../footer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SaveFavourite() {
  const navigation = useNavigation();
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    
    // Fetch user token and decode to get user ID
    const getUserIdAndFetchFavorites = async () => {
      try {
        setLoading(true);
        const tokenPromise = AsyncStorage.getItem('token');
        const token2 = await tokenPromise;
        if (!token2) {
          console.error("No authentication token found");
          setLoading(false);
          return;
        }
        const decodedToken = jwtDecode(token2);
        const x = decodedToken.id;
        setUserId(x);
        
        await fetchFavorites(x);
      } catch (err) {
        console.error('Error getting user:', err);
        setError('Failed to authenticate. Please log in again.');
        setLoading(false);
      }
    };
    
    getUserIdAndFetchFavorites();
  }, []);
  
  const fetchFavorites = async (userId) => {
    try {
      const response = await fetch(`${Config.BASE_URL}/places/favourites/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const trips = await response.json();
      console.log(trips);
      if (trips.success) {
        setFavorites(trips.data || []);
      } else {
        setError(trips.message || 'Failed to fetch favorites');
      }
    } catch (err) {
      console.error('Fetch favorites error:', err);
      setError('Could not load your favorites. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (placeId) => {
    try {
      setRemovingId(placeId);
      
      // Get current token
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'You need to be logged in to remove favorites');
        setRemovingId(null);
        return;
      }
      
      // Call API to remove favorite
      const response = await fetch(`${Config.BASE_URL}/places/favourites/remove/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: placeId,
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Remove from local state without fetching again
        setFavorites(prevFavorites => 
          prevFavorites.filter(favorite => favorite._id !== placeId)
        );
        Alert.alert('Success', 'Place removed from favorites');
      } else {
        Alert.alert('Error', result.message || 'Failed to remove favorite');
      }
    } catch (err) {
      console.error('Remove favorite error:', err);
      Alert.alert('Error', 'Could not remove favorite. Please try again.');
    } finally {
      setRemovingId(null);
    }
  };

  const confirmRemove = (placeId, placeName) => {
   removeFavorite(placeId)
  };

  const navigateToProfile = () => {
    console.log("Navigating to profile");
    router.push('/profile');
  }

  const handleAddFavorite = () => {
    router.push('/home');
  }

  const handleRefresh = () => {
    if (userId) {
      setLoading(true);
      setError(null);
      fetchFavorites(userId);
    }
  }

  // Render loading state
  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="black" />
        <Text style={styles.loadingText}>Loading your favorite places...</Text>
        <Footer />
      </View>
    );
  }

  // Render error state
  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Ionicons name="alert-circle-outline" size={70} color="#ff6b6b" />
        <Text style={styles.errorTitle}>Oops!</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={handleRefresh}
        >
          <Text style={styles.createButtonText}>Try Again</Text>
        </TouchableOpacity>
        <Footer />
      </View>
    );
  }

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.favoriteItem}>
      <TouchableOpacity 
        style={styles.favoriteContent}
        onPress={() => router.push(`/place-details/${item._id}`)}
      >
        {item.images && item.images.length > 0 && (
          <Image 
            source={{ uri: item.images[0] }} 
            style={styles.favoriteImage}
            resizeMode="cover"
          />
        )}
        <View style={styles.favoriteDetails}>
          <Text style={styles.favoriteName}>{item.name}</Text>
          <Text style={styles.favoriteLocation}>
            {item.location && item.location.coordinates 
              ? `Lat: ${item.location.coordinates.lat}, Long: ${item.location.coordinates.lng}`
              : item.address || 'No location available'}
          </Text>
          <Text style={styles.favoriteDescription} numberOfLines={2}>
            {item.description || 'No description available'}
          </Text>
          {item.category && item.category.length > 0 && (
            <View style={styles.categoryContainer}>
              {item.category.map((cat, index) => (
                <View key={index} style={styles.categoryTag}>
                  <Text style={styles.categoryText}>{cat}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </TouchableOpacity>
      
      {/* Delete button */}
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => confirmRemove(item._id, item.name)}
        disabled={removingId === item._id}
      >
        {removingId === item._id ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Ionicons name="trash-outline" size={20} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );

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
      <View style={styles.content}>
        {favorites.length > 0 ? (
          <FlatList
            data={favorites}
            renderItem={renderFavoriteItem}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.favoritesList}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={80} color="#ccc" />
            <Text style={styles.emptyTitle}>No Favorite Places Yet</Text>
            <Text style={styles.emptyText}>
              Explore Sri Lanka and save your favorite destinations for quick access on your next trip!
            </Text>
            <TouchableOpacity 
              style={styles.createButton}
              onPress={handleAddFavorite}
            >
              <Text style={styles.createButtonText}>Discover Places</Text>
            </TouchableOpacity>
          </View>
        )}
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
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
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
  favoritesList: {
    paddingBottom: 20,
  },
  favoriteItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
    position: 'relative',
  },
  favoriteContent: {
    flexDirection: 'column',
  },
  favoriteImage: {
    width: '100%',
    height: 150,
  },
  favoriteDetails: {
    padding: 16,
    paddingRight: 50, // Space for delete button
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
    marginBottom: 8,
  },
  favoriteDescription: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ff4b4b',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  categoryTag: {
    backgroundColor: '#e6f2ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 5,
  },
  categoryText: {
    fontFamily: 'outfit',
    fontSize: 12,
    color: '#0066cc',
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
  loadingText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#555',
    marginTop: 12,
  },
  errorTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 22,
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
});