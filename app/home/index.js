import { View, Text, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { signOut } from 'firebase/auth';
import { auth, db } from '../../configs/FirebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';
import Footer from '../footer';
import Config from '../../config';

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
      const response = await fetch(`${Config.BASE_URL}/places/search?q=${encodeURIComponent(searchText)}`);
      
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
    router.push('/profile');
  }

  const formatCategoryName = (category) => {
    if (category === 'ancient-places') return 'Ancient Place';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const getCategoryImage = (category) => {

    const imageMapping = { 'ancient-places': 'dalada' };
    const imageName = imageMapping[category] || category;
    try {
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
        default: return require('../../assets/images/beach.jpg');
      }
    } catch (error) {
      console.error(`Error loading image for ${category}:`, error);
      return require('../../assets/images/beach.jpg');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header section */}
      {/* Header with integrated welcome message and search */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trektracks!</Text>
        <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
          <Ionicons name="person-circle" size={40} color="white" />
        </TouchableOpacity>
      </View>
      
      {/* Welcome message */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Discover Sri Lanka's</Text>
        <Text style={styles.welcomeHighlight}>Hidden Treasures</Text>
      </View>
      
      {/* Search section - moved up */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search destinations, activities..."
          placeholderTextColor="#999"
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

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Plan Adventure Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Plan Your Adventure</Text>
          </View>
          
          <View style={styles.planAdventureCard}>
            <View style={styles.planAdventureContent}>
              <Text style={styles.planAdventureTitle}>AI-Powered Trip Planning</Text>
              <Text style={styles.planAdventureDescription}>
                Create a personalized Sri Lanka itinerary with our AI assistant. Get custom recommendations based on your preferences.
              </Text>
              <TouchableOpacity 
                style={styles.planAdventureButton}
                onPress={() => router.push('/create-trip')}
              >
                <Text style={styles.planAdventureButtonText}>Create New Trip</Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.planAdventureImageContainer}>
              <Ionicons name="map" size={80} color="white" />
            </View>
          </View>
        </View>
     
        {/* Popular Destinations Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Destinations</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.destinationsScroll}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="white" />
                <Text style={styles.loadingText}>Loading categories...</Text>
              </View>
            ) : categories.length > 0 ? (
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
                  <View style={styles.destinationOverlay} />
                  <Text style={styles.destinationName}>{formatCategoryName(category)}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>No categories available</Text>
              </View>
            )}
          </ScrollView>
        </View>

        {/* Recommended Places / Search Results Section */}
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
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.recentlyVisitedScroll}>
            {isSearching ? (
              // Show loading indicator while searching
              <View style={styles.searchLoadingContainer}>
                <ActivityIndicator size="large" color="white" />
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
              <>
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

      <Footer/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#43BFC7', // Changed to a richer teal shade
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10, // Reduced bottom padding
  },
  headerTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 28,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  welcomeContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10, // Reduced padding to move search bar up
  },
  welcomeText: {
    fontFamily: 'outfit',
    fontSize: 22,
    color: 'white',
  },
  welcomeHighlight: {
    fontFamily: 'outfit-bold',
    fontSize: 32,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20, // Reduced margin bottom
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)', // Subtle border
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: '#5F9EA0',
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
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: 'outfit-medium',
    fontSize: 22,
    color: '#333',
  },
  viewAllText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#2A9D8F',
  },
  planAdventureCard: {
    backgroundColor: '#43BFC7',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  planAdventureContent: {
    flex: 3,
  },
  planAdventureImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planAdventureTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  planAdventureDescription: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
    lineHeight: 20,
  },
  planAdventureButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'white',
  },
  planAdventureButtonText: {
    fontFamily: 'outfit-medium',
    fontSize: 14,
    color: 'white',
    marginRight: 8,
  },
  destinationsScroll: {
    paddingLeft: 20,
  },
  destinationCard: {
    marginRight: 15,
    width: 140,
    height: 170,
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  destinationImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  destinationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  destinationName: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  loadingContainer: {
    width: 140,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: 'rgba(42, 157, 143, 0.2)',
    borderRadius: 16,
  },
  loadingText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#2A9D8F',
    marginTop: 10,
  },
  errorText: {
    fontFamily: 'outfit-medium',
    fontSize: 14,
    color: '#E74C3C',
  },
  recentlyVisitedScroll: {
    paddingHorizontal: 20,
  },
  locationCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  locationImage: {
    width: '100%',
    height: 200,
  },
  categoryTag: {
    position: 'absolute',
    left: 10,
    top: 10,
    backgroundColor: '#2A9D8F',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  categoryText: {
    color: 'white',
    fontFamily: 'outfit-medium',
    fontSize: 12,
  },
  ratingContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  ratingText: {
    color: 'white',
    fontFamily: 'outfit-medium',
    fontSize: 14,
    marginLeft: 4,
  },
  locationInfo: {
    padding: 16,
  },
  locationName: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
    color: '#333',
    marginBottom: 8,
  },
  locationDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2A9D8F',
    marginRight: 8,
  },
  locationPlace: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#666',
  },
  searchLoadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(42, 157, 143, 0.2)',
    borderRadius: 20,
    padding: 40,
    marginBottom: 20,
  },
  searchErrorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#FDEAEA',
    borderRadius: 20,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#2A9D8F',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 15,
  },
  retryText: {
    color: 'white',
    fontFamily: 'outfit-medium',
    fontSize: 14,
  }
});