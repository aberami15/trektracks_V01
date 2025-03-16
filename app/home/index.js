import { View, Text, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { signOut } from 'firebase/auth';
import { auth, db } from '../../configs/FirebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Home() {
  const navigation = useNavigation();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
    
    // Fetch categories from REST API endpoint
    const fetchCategories = async () => {
      setLoading(false)
      setDefaultCategories();
    };
    
    const setDefaultCategories = () => {
      setCategories([
        'beach',
        'mountain',
        'sunset',
        'city',
        'forest',
        'lake',
        'ancient-places',
        'waterfall',
        'island'
      ]);
    };
    
    fetchCategories();
  }, []);

  // Function to handle search
  const handleSearch = async () => {
    if (!searchText.trim()) return;
    
    setIsSearching(true);
    setSearchError(null);
    
    try {
      const response = await fetch(`http://localhost:5000/api/places/search?q=${encodeURIComponent(searchText)}`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setSearchResults(data.data);
      } else {
        setSearchError('Failed to get search results');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchError('An error occurred while searching');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Function to clear search
  const clearSearch = () => {
    setSearchText('');
    setSearchResults([]);
    setSearchError(null);
  };

  // Function to get image for search results
  const getPlaceImage = (category) => {
    category = category ? category.toLowerCase() : 'beach';
    
    try {
      // Dynamic requires aren't supported in React Native, so we need to map each case
      switch (category) {
        case 'beach': return require('../../assets/images/beach.jpg');
        case 'mountain': return require('../../assets/images/mountain.webp');
        case 'adventure': return require('../../assets/images/waterfall.jpg');
        case 'cultural': return require('../../assets/images/dalada.jpg');
        case 'sunset': return require('../../assets/images/sunset.jpg');
        case 'city': return require('../../assets/images/city.jpg');
        case 'forest': return require('../../assets/images/forest.jpg');
        case 'lake': return require('../../assets/images/lake.jpg');
        case 'historic': case 'historical': return require('../../assets/images/sigiriya.jpg');
        case 'ancient': case 'ancient-places': return require('../../assets/images/dalada.jpg');
        case 'waterfall': return require('../../assets/images/waterfall.jpg');
        case 'island': return require('../../assets/images/island.jpg');
        default: return require('../../assets/images/beach.jpg'); // Fallback
      }
    } catch (error) {
      console.error(`Error loading image for ${category}:`, error);
      return require('../../assets/images/beach.jpg'); // Fallback image
    }
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      router.replace('/');
    }).catch((error) => {
      console.error("Sign out error:", error);
    });
  }

  const handleProfilePress = () => {
    // Navigate to profile page
    router.push('/profile');
  }

  const navigateToHome = () => {
    // Stay on home page or navigate to it if coming from elsewhere
    router.push('/home');
  }

  const navigateToItinerary = () => {
    // Navigate to trip itinerary page
    router.push('/trip-itinerary');
  }

  const navigateToRecentTrips = () => {
    // Navigate to recent trips page
    router.push('/recent-trips');
  }

  // Function to format category name for display
  const formatCategoryName = (category) => {
    if (category === 'ancient-places') return 'Ancient Place';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Function to handle image paths
  const getCategoryImage = (category) => {
    // This is a mapping to handle any special cases with image names
    const imageMapping = {
      'ancient-places': 'dalada' // If the image name differs from the route name
    };
    
    const imageName = imageMapping[category] || category;
    
    try {
      // Dynamic requires aren't supported in React Native, so we need to map each case
      switch (imageName) {
        case 'beach': return require('../../assets/images/beach.jpg');
        case 'mountain': return require('../../assets/images/mountain.webp');
        case 'sunset': return require('../../assets/images/sunset.jpg');
        case 'city': return require('../../assets/images/city.jpg');
        case 'forest': return require('../../assets/images/forest.jpg');
        case 'lake': return require('../../assets/images/lake.jpg');
        case 'dalada': return require('../../assets/images/dalada.jpg');
        case 'waterfall': return require('../../assets/images/waterfall.jpg');
        case 'island': return require('../../assets/images/island.jpg');
        default: return require('../../assets/images/beach.jpg'); // Fallback
      }
    } catch (error) {
      console.error(`Error loading image for ${category}:`, error);
      return require('../../assets/images/beach.jpg'); // Fallback image
    }
  };

  return (
    <View style={styles.container}>
      {/* Header: Trektracks! title and profile icon */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trektracks!</Text>
        <TouchableOpacity onPress={handleProfilePress}>
          <Ionicons name="person-circle" size={40} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search destinations, activities..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {searchText.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={clearSearch}
          >
            <Ionicons name="close-circle" size={20} color="#777" />
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={handleSearch}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Main Scrollable Content */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Popular Destinations Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Destinations</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.destinationsScroll}>
            {loading ? (
              // Show loading spinner while fetching categories
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3478F6" />
                <Text style={styles.loadingText}>Loading categories...</Text>
              </View>
            ) : categories.length > 0 ? (
              // Dynamically render category cards
              categories.map((category, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.destinationCard}
                  onPress={() => router.push(`/destinations/${category}`)}
                >
                  <Image 
                    source={getCategoryImage(category)}
                    style={styles.destinationImage}
                  />
                  <Text style={styles.destinationName}>{formatCategoryName(category)}</Text>
                </TouchableOpacity>
              ))
            ) : (
              // Show message if no categories found
              <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>No categories available</Text>
              </View>
            )}
          </ScrollView>
        </View>

        {/* recommendations or search results */}
        <View style={[styles.sectionContainer, { marginBottom: 80 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {searchResults.length > 0 ? `Search Results (${searchResults.length})` : 'Recommended places'}
            </Text>
            {searchResults.length > 0 ? (
              <TouchableOpacity onPress={clearSearch}>
                <Text style={styles.viewAllText}>Clear Results</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.recentlyVisitedScroll}>
            {isSearching ? (
              // Show loading indicator while searching
              <View style={styles.searchLoadingContainer}>
                <ActivityIndicator size="large" color="#3478F6" />
                <Text style={styles.loadingText}>Searching...</Text>
              </View>
            ) : searchError ? (
              // Show error message if search failed
              <View style={styles.searchErrorContainer}>
                <Text style={styles.errorText}>{searchError}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={handleSearch}>
                  <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
              </View>
            ) : searchResults.length > 0 ? (
              // Show search results
              searchResults.map((place) => (
                <TouchableOpacity 
                  key={place._id} 
                  style={styles.locationCard}
                  onPress={() => router.push(`/placedetails?q=${encodeURIComponent(place._id)}`)}
                >
                  <Image 
                    source={place.images && place.images[0] ? { uri: place.images[0] } : getPlaceImage(place.category[0])} 
                    style={styles.locationImage} 
                  />
                  <View style={styles.categoryTag}>
                    <Text style={styles.categoryText}>{place.category}</Text>
                  </View>
                  {place.averageRating > 0 && (
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={16} color="#FFD700" />
                      <Text style={styles.ratingText}>{place.averageRating.toFixed(1)}</Text>
                    </View>
                  )}
                  <View style={styles.locationInfo}>
                    <Text style={styles.locationName}>{place.name}</Text>
                    <View style={styles.locationDetail}>
                      <View style={styles.locationDot} />
                      <Text style={styles.locationPlace}>
                        {place.contactInfo && place.contactInfo.phone ? place.contactInfo.phone : 'No contact info'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              // Show default recommended places when not searching
              <>
                {/* Sigiriya Rock Fortress Card */}
                <TouchableOpacity 
                  style={styles.locationCard}
                  onPress={() => router.push('/sigiriya')}
                >
                  <Image 
                    source={require('../../assets/images/sigiriya.jpg')} 
                    style={styles.locationImage} 
                  />
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>4.9</Text>
                  </View>
                  <View style={styles.locationInfo}>
                    <Text style={styles.locationName}>Sigiriya Rock Fortress</Text>
                    <View style={styles.locationDetail}>
                      <View style={styles.locationDot} />
                      <Text style={styles.locationPlace}>Matale District, Central Province</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Mirissa Beach Card */}
                <TouchableOpacity 
                  style={styles.locationCard}
                  onPress={() => router.push('/mirissa-beach')}
                >
                  <Image 
                    source={require('../../assets/images/mirissa.jpg')} 
                    style={styles.locationImage} 
                  />
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>4.7</Text>
                  </View>
                  <View style={styles.locationInfo}>
                    <Text style={styles.locationName}>Mirissa Beach</Text>
                    <View style={styles.locationDetail}>
                      <View style={styles.locationDot} />
                      <Text style={styles.locationPlace}>Southern Province</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Temple of the Sacred Tooth Relic Card */}
                <TouchableOpacity 
                  style={styles.locationCard}
                  onPress={() => router.push('/tooth-temple')}
                >
                  <Image 
                    source={require('../../assets/images/dalada.jpg')} 
                    style={styles.locationImage} 
                  />
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>4.8</Text>
                  </View>
                  <View style={styles.locationInfo}>
                    <Text style={styles.locationName}>Temple of the Sacred Tooth Relic</Text>
                    <View style={styles.locationDetail}>
                      <View style={styles.locationDot} />
                      <Text style={styles.locationPlace}>Kandy, Central Province</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Galle Fort Card */}
                <TouchableOpacity 
                  style={styles.locationCard}
                  onPress={() => router.push('/galle-fort')}
                >
                  <Image 
                    source={require('../../assets/images/gallefort.jpg')} 
                    style={styles.locationImage} 
                  />
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>4.7</Text>
                  </View>
                  <View style={styles.locationInfo}>
                    <Text style={styles.locationName}>Galle Fort</Text>
                    <View style={styles.locationDetail}>
                      <View style={styles.locationDot} />
                      <Text style={styles.locationPlace}>Galle, Southern Province</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerItem} 
          onPress={navigateToHome}
        >
          <Ionicons name="home" size={24} color="#3478F6" />
          <Text style={[styles.footerText, { color: '#3478F6' }]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerItem}
          onPress={navigateToItinerary}
        >
          <Ionicons name="calendar" size={24} color="#777" />
          <Text style={styles.footerText}>Itinerary</Text>
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
  loadingContainer: {
    width: 200,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  loadingText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  errorText: {
    fontFamily: 'outfit-medium',
    fontSize: 14,
    color: '#FF3B30',
  },
  searchLoadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginBottom: 15,
  },
  searchErrorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff0f0',
    borderRadius: 12,
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: '#3478F6',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
  },
  retryText: {
    color: 'white',
    fontFamily: 'outfit-medium',
    fontSize: 14,
  },
  categoryTag: {
    position: 'absolute',
    left: 10,
    top: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryText: {
    color: 'white',
    fontFamily: 'outfit',
    fontSize: 12,
  },
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
    marginBottom: 15,
  },
  headerTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 28,
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    marginHorizontal: 20,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#666',
  },
  clearButton: {
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: '#3478F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 8,
  },
  searchButtonText: {
    color: 'white',
    fontFamily: 'outfit-medium',
    fontSize: 14,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
    color: '#333',
  },
  seeAllText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#3478F6',
  },
  viewAllText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#3478F6',
  },
  destinationsScroll: {
    paddingLeft: 20,
  },
  destinationCard: {
    marginRight: 15,
    width: 120,
    alignItems: 'center',
  },
  destinationImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 5,
  },
  destinationName: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  recentlyVisitedScroll: {
    paddingHorizontal: 20,
  },
  locationCard: {
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
  locationImage: {
    width: '100%',
    height: 180,
  },
  ratingContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratingText: {
    color: 'white',
    fontFamily: 'outfit-medium',
    fontSize: 14,
    marginLeft: 3,
  },
  locationInfo: {
    padding: 15,
  },
  locationName: {
    fontFamily: 'outfit-medium',
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  locationDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  locationPlace: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#666',
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