import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, StatusBar, ActivityIndicator, TextInput, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import Config from '../../config';

export default function PlaceDetails() {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = params.q;
  
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [text, setText] = useState('');
  const [review, setReview] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    
    // Fetch place details from API
    const fetchPlaceDetails = async () => {
      try {
        // Check if this is one of the default places without a valid MongoDB ID
        if (id === 'sigiriya' || id === 'tooth-temple' || id === 'galle-fort') {
          // Use mock data for demonstration purposes
          setTimeout(() => {
            const mockPlace = {
              _id: id,
              name: id === 'sigiriya' ? 'Sigiriya Rock Fortress' : 
                    id === 'tooth-temple' ? 'Temple of the Sacred Tooth Relic' : 'Galle Fort',
              description: 'This is a beautiful historical place with stunning views and rich cultural heritage.',
              category: id === 'sigiriya' ? 'Historical' : 
                        id === 'tooth-temple' ? 'Cultural' : 'Historical',
              location: id === 'sigiriya' ? 'Matale District, Central Province' : 
                        id === 'tooth-temple' ? 'Kandy, Central Province' : 'Galle, Southern Province',
              images: [],
              averageRating: id === 'sigiriya' ? 4.9 : 
                            id === 'tooth-temple' ? 4.8 : 4.7,
              openingHours: {
                open: '8:00 AM',
                close: '6:00 PM'
              },
              contactInfo: {
                phone: '+94 123 456 789',
                email: 'info@example.com'
              },
              highlights: [
                'Ancient Architecture',
                'Historical Significance',
                'Scenic Views',
                'Cultural Heritage'
              ],
              tips: [
                'Visit early morning to avoid crowds',
                'Wear comfortable shoes for walking',
                'Bring plenty of water'
              ],
              nearbyAttractions: [
                'Dambulla Cave Temple (15 km)',
                'Polonnaruwa Ancient City (67 km)',
                'Minneriya National Park (26 km)'
              ],
              reviews: [
                "Beautiful place!",
                "Must visit when in Sri Lanka",
                "Incredible historical site"
              ]
            };
            
            setPlace(mockPlace);
            setLoading(false);
          }, 1000);
          return;
        }
        
        // Fetch from API for real MongoDB IDs
        const response = await fetch(`${Config.BASE_URL}/places/${id}`);
        console.log(response)
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status === 'success' && data.data) {
          // Add some additional fields for the UI that might not be in the API response
          const placeData = {
            ...data.data,
            location: data.data.location || 'Sri Lanka',
            highlights: [
              'Beautiful Scenery',
              'Local Culture',
              'Natural Beauty',
              data.data.category === 'Beach' ? 'Swimming & Surfing' : 'Sightseeing',
              data.data.category === 'Beach' ? 'Sunset Views' : 'Photography Spots'
            ],
            tips: [
              'Visit during off-peak hours',
              'Bring appropriate clothing',
              'Check local weather before visiting',
              'Respect local customs and traditions'
            ],
            nearbyAttractions: [
              'Local markets and shops',
              'Traditional restaurants',
              'Cultural landmarks'
            ]
          };
          setPlace(placeData);
        } else {
          setError('Failed to get place details');
        }
      } catch (error) {
        console.error('Error fetching place details:', error);
        setError('An error occurred while fetching place details');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceDetails();
  }, [id]);

  // Function to get image based on category
  const getCategoryImage = (category) => {
    category = category ? category.toLowerCase() : 'beach';
    
    try {
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
        default: return require('../../assets/images/beach.jpg');
      }
    } catch (error) {
      console.error(`Error loading image for ${category}:`, error);
      return require('../../assets/images/beach.jpg');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3478F6" />
        <Text style={styles.loadingText}>Loading place details...</Text>
      </View>
    );
  }

  if (error || !place) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={60} color="#FF3B30" />
        <Text style={styles.errorText}>{error || 'Place not found'}</Text>
        <TouchableOpacity 
          style={styles.backToHomeButton} 
          onPress={() => router.push('/home')}
        >
          <Text style={styles.backToHomeText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const addReview = async() => {
    if(review === '') {
      return ToastAndroid.show('Please enter review', ToastAndroid.LONG);
    }
    
    try {
      const response = await fetch(`${Config.BASE_URL}/places/review/${place._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviews: review,
        })
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      // Update the place object with the new review
      if (place.reviews) {
        // Add the new review to the existing reviews array
        setPlace({
          ...place,
          reviews: [review, ...place.reviews]
        });
      } else {
        // Create a new reviews array if none exists
        setPlace({
          ...place,
          reviews: [review]
        });
      }
      
      console.log("Review added successfully");
      ToastAndroid.show('Review added successfully', ToastAndroid.SHORT);
      setReview(''); // Clear the input field
    } catch (error) {
      console.error('Review save error:', error);
      ToastAndroid.show(error.message || "Review save failed", ToastAndroid.LONG);
    }
  };

  // Get image source - use first image from API or fallback to local image
  const imageSource = place.images && place.images.length > 0 
    ? { uri: place.images[0] }
    : getCategoryImage(place.category);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header Image with Back Button */}
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.headerImage} />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <View style={styles.imageOverlay}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{place.averageRating?.toFixed(1) || '4.5'}</Text>
          </View>
        </View>
      </View>
      
      <ScrollView style={styles.contentContainer}>
        {/* Title and Location */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{place.name}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color="#3478F6" />
            <Text style={styles.locationText}>
              {place.location.coordinates 
                ? `${place.location.coordinates.lat}, ${place.location.coordinates.lng}` 
                : place.location}
            </Text>
          </View>
        </View>
        
        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.longDescription}>
            {place.description}
          </Text>
        </View>
        
        {/* Visiting Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visiting Information</Text>
          
          <View style={styles.infoItem}>
            <MaterialIcons name="access-time" size={18} color="#333" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Opening Hours</Text>
              <Text style={styles.infoText}>
                {place.openingHours && place.openingHours.open === '24/7' 
                  ? 'Open 24/7' 
                  : place.openingHours 
                    ? `${place.openingHours.open} - ${place.openingHours.close}` 
                    : 'Public access - check locally for restrictions'}
              </Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <MaterialIcons name="attach-money" size={18} color="#333" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Entry Fee</Text>
              <Text style={styles.infoText}>
                {place.entryFee || (place.category === 'Beach' ? 'Free' : 'Check locally')}
              </Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <MaterialIcons name="wb-sunny" size={18} color="#333" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Best Time to Visit</Text>
              <Text style={styles.infoText}>
                {place.bestTimeToVisit || 'November to April (dry season)'}
              </Text>
            </View>
          </View>
        </View>
        
        {/* Highlights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Highlights</Text>
          
          {place.highlights && place.highlights.map((highlight, index) => (
            <View key={index} style={styles.bulletItem}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>{highlight}</Text>
            </View>
          ))}
        </View>
        
        {/* Tips and Advice */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tips & Advice</Text>
          
          {place.tips && place.tips.map((tip, index) => (
            <View key={index} style={styles.bulletItem}>
              <Ionicons name="information-circle-outline" size={16} color="#3478F6" />
              <Text style={styles.bulletText}>{tip}</Text>
            </View>
          ))}
        </View>
        
        {/* Contact Information */}
        {place.contactInfo && (place.contactInfo.phone || place.contactInfo.email) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            
            {place.contactInfo.phone && (
              <View style={styles.bulletItem}>
                <Ionicons name="call-outline" size={16} color="#3478F6" />
                <Text style={styles.bulletText}>{place.contactInfo.phone}</Text>
              </View>
            )}
            
            {place.contactInfo.email && (
              <View style={styles.bulletItem}>
                <Ionicons name="mail-outline" size={16} color="#3478F6" />
                <Text style={styles.bulletText}>{place.contactInfo.email}</Text>
              </View>
            )}
          </View>
        )}
        
        {/* Nearby Attractions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Attractions</Text>
          
          {place.nearbyAttractions && place.nearbyAttractions.map((attraction, index) => (
            <View key={index} style={styles.bulletItem}>
              <Ionicons name="pin-outline" size={16} color="#3478F6" />
              <Text style={styles.bulletText}>{attraction}</Text>
            </View>
          ))}
        </View>
        
        {/* Reviews Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          
          {place.reviews && place.reviews.length > 0 ? (
            <View style={styles.reviewsContainer}>
              {place.reviews.map((reviewText, index) => (
                <View key={index} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewUser}>Visitor {index + 1}</Text>
                  </View>
                  <Text style={styles.reviewText}>{reviewText}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noReviewsText}>No reviews yet. Be the first to leave a review!</Text>
          )}
        </View>
           
        {/* Text Box for Review */}
        <View style={styles.textBoxContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Write your review here..."
            value={review}
            onChangeText={setReview}
            multiline
          />
        </View>
          
        {/* Add Review Button */}
        <TouchableOpacity 
          style={styles.addReview} 
          onPress={addReview}
        >
          <Text style={styles.addReviewText}>Add your review</Text>
          <Ionicons name="add-circle-outline" size={20} color="black" style={styles.addIcon} />
        </TouchableOpacity>
        
        {/* Add to Itinerary Button */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add to Itinerary</Text>
          <Ionicons name="add-circle-outline" size={20} color="white" style={styles.addIcon} />
        </TouchableOpacity>
        
        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textBoxContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  textInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: 16,
    fontFamily: 'outfit',
    color: '#444',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#666',
    marginTop: 15,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: '#FF3B30',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  backToHomeButton: {
    backgroundColor: '#3478F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backToHomeText: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: '#fff',
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  ratingContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: 'white',
    fontFamily: 'outfit-medium',
    fontSize: 14,
    marginLeft: 4,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingTop: 20,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 24,
    color: '#333',
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  longDescription: {
    fontFamily: 'outfit',
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  infoLabel: {
    fontFamily: 'outfit-medium',
    fontSize: 15,
    color: '#333',
  },
  infoText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingRight: 15,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3478F6',
    marginTop: 7,
    marginRight: 10,
  },
  bulletText: {
    fontFamily: 'outfit',
    fontSize: 15,
    color: '#444',
    flex: 1,
    marginLeft: 8,
  },
  // Reviews styles
  reviewsContainer: {
    marginTop: 5,
  },
  reviewCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reviewUser: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: '#333',
  },
  reviewText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  noReviewsText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: '#3478F6',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  addReview:{
    backgroundColor: '#34C760',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  addButtonText: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: 'white',
  },
  addReviewText:{
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: 'black',
  },
  addIcon: {
    marginLeft: 8,
  },
  footer: {
    height: 30, // Extra space at the bottom
  }
});