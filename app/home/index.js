
import { View, Text, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { signOut } from 'firebase/auth';
import { auth } from '../../configs/FirebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Home() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, []);

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
        />
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
            {/* Beach Card */}
            <TouchableOpacity 
              style={styles.destinationCard}
              onPress={() => router.push('/destinations/beaches')}
            >
            <Image 
                  source={require('../../assets/images/beach.jpg')} 
                  style={styles.destinationImage} 
            />
            <Text style={styles.destinationName}>Beach</Text>
            </TouchableOpacity>

            {/* Mountain Card */}
            <TouchableOpacity 
              style={styles.destinationCard}
              onPress={() => router.push('/destinations/mountains')}
            >
              <Image 
                source={require('../../assets/images/mountain.webp')} 
                style={styles.destinationImage} 
              />
              <Text style={styles.destinationName}>Mountain</Text>
            </TouchableOpacity>

            {/* Sunset Card */}
            <TouchableOpacity 
              style={styles.destinationCard}
              onPress={() => router.push('/destinations/sunsets')}
            >
              <Image 
                source={require('../../assets/images/sunset.jpg')} 
                style={styles.destinationImage} 
              />
              <Text style={styles.destinationName}>sunset</Text>
            </TouchableOpacity>

            {/* City Card */}
<TouchableOpacity 
  style={styles.destinationCard}
  onPress={() => router.push('/destinations/cities')}
>
  <Image 
    source={require('../../assets/images/city.jpg')} 
    style={styles.destinationImage} 
  />
  <Text style={styles.destinationName}>City</Text>
</TouchableOpacity>


            {/* Forest Card */}
<TouchableOpacity 
  style={styles.destinationCard}
  onPress={() => router.push('/destinations/forests')}
>
  <Image 
    source={require('../../assets/images/forest.jpg')} 
    style={styles.destinationImage} 
  />
  <Text style={styles.destinationName}>Forest</Text>
</TouchableOpacity>

            {/* Lake Card */}
<TouchableOpacity 
  style={styles.destinationCard}
  onPress={() => router.push('/destinations/lakes')}
>
  <Image 
    source={require('../../assets/images/lake.jpg')} 
    style={styles.destinationImage} 
  />
  <Text style={styles.destinationName}>Lake</Text>
</TouchableOpacity>

            {/* Ancient Places Card */}
<TouchableOpacity 
  style={styles.destinationCard}
  onPress={() => router.push('/destinations/ancient-places')}
>
  <Image 
    source={require('../../assets/images/dalada.jpg')} 
    style={styles.destinationImage} 
  />
  <Text style={styles.destinationName}>Ancient Place</Text>
</TouchableOpacity>


            {/* Waterfall Card */}
<TouchableOpacity 
  style={styles.destinationCard}
  onPress={() => router.push('/destinations/waterfalls')}
>
  <Image 
    source={require('../../assets/images/waterfall.jpg')} 
    style={styles.destinationImage} 
  />
  <Text style={styles.destinationName}>Waterfall</Text>
</TouchableOpacity>


            {/* island */}
            <TouchableOpacity 
  style={styles.destinationCard}
  onPress={() => router.push('/destinations/islands')}
>
  <Image 
    source={require('../../assets/images/island.jpg')} 
    style={styles.destinationImage} 
  />
  <Text style={styles.destinationName}>Island</Text>
</TouchableOpacity>

          </ScrollView>
        </View>

        {/* recommendations */}
        <View style={[styles.sectionContainer, { marginBottom: 80 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended places</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.recentlyVisitedScroll}>
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