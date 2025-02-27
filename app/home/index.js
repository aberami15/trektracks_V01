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

  return (
    <View style={styles.container}>
      {/* Header: Trektracks! title and profile icon */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trektracks!</Text>
        <TouchableOpacity>
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
          <View style={styles.destinationCard}>
            <Image 
              source={require('../../assets/images/beach.jpg')} 
              style={styles.destinationImage} 
            />
            <Text style={styles.destinationName}>Beach</Text>
          </View>

          {/* Mountain Card */}
          <View style={styles.destinationCard}>
            <Image 
              source={require('../../assets/images/mountain.webp')} 
              style={styles.destinationImage} 
            />
            <Text style={styles.destinationName}>Mountain</Text>
          </View>

          {/* Sunset Card */}
          <View style={styles.destinationCard}>
            <Image 
              source={require('../../assets/images/sunset.jpg')}
              style={styles.destinationImage} 
            />
            <Text style={styles.destinationName}>Sunset</Text>
          </View>

          {/* City Card */}
          <View style={styles.destinationCard}>
            <Image 
              source={require('../../assets/images/city.jpg')} 
              style={styles.destinationImage} 
            />
            <Text style={styles.destinationName}>Mountain</Text>
          </View>

          {/* Forest Card */}
          <View style={styles.destinationCard}>
            <Image 
              source={require('../../assets/images/forest.jpg')} 
              style={styles.destinationImage} 
            />
            <Text style={styles.destinationName}>Mountain</Text>
          </View>

          {/* Lake Card */}
          <View style={styles.destinationCard}>
            <Image 
              source={require('../../assets/images/lake.jpg')} 
              style={styles.destinationImage} 
            />
            <Text style={styles.destinationName}>Mountain</Text>
          </View>

          {/* Ancient places Card */}
          <View style={styles.destinationCard}>
            <Image 
              source={require('../../assets/images/dalada.jpg')} 
              style={styles.destinationImage} 
            />
            <Text style={styles.destinationName}>Mountain</Text>
          </View>

          {/* Waterfall Card */}
          <View style={styles.destinationCard}>
            <Image 
              source={require('../../assets/images/waterfall.jpg')} 
              style={styles.destinationImage} 
            />
            <Text style={styles.destinationName}>Mountain</Text>
          </View>

          {/* island */}
          <View style={styles.destinationCard}>
            <Image 
              source={require('../../assets/images/island.jpg')} 
              style={styles.destinationImage} 
            />
            <Text style={styles.destinationName}>Mountain</Text>
          </View>

        </ScrollView>
      </View>

      {/* Recently Visited Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recently Visited</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.recentlyVisitedScroll}>
          {/* Sigiriya Rock Fortress Card */}
          <View style={styles.locationCard}>
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
          </View>

          {/* Mirissa Beach Card */}
          <View style={styles.locationCard}>
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
          </View>

          {/* Temple of the Sacred Tooth Relic Card */}
          <View style={styles.locationCard}>
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
          </View>

          {/* Galle Fort Card */}
          <View style={styles.locationCard}>
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
          </View>
        </ScrollView>
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
});