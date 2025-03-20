// Create this file at app/destinations/cities/index.js

import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import Footer from '../../footer'

export default function City() {
  const navigation = useNavigation();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);

  // Define cities data organized by province
  const citiesData = [
    // Western Province
    { id: 1, name: "Colombo", location: "Western Province", description: "Capital and largest city of Sri Lanka" },
    { id: 2, name: "Sri Jayawardenepura Kotte", location: "Western Province", description: "Administrative capital of Sri Lanka" },
    { id: 3, name: "Moratuwa", location: "Western Province", description: "Major suburb and municipality south of Colombo" },
    { id: 4, name: "Negombo", location: "Western Province", description: "Major coastal city known for fishing and tourism" },
    { id: 5, name: "Kesbewa", location: "Western Province", description: "Urban center within the Colombo District" },
    { id: 6, name: "Maharagama", location: "Western Province", description: "Major suburb of Colombo" },
    { id: 7, name: "Kaduwela", location: "Western Province", description: "Suburban area east of Colombo" },
    
    // Central Province
    { id: 8, name: "Kandy", location: "Central Province", description: "Cultural capital and UNESCO World Heritage site" },
    { id: 9, name: "Nuwara Eliya", location: "Central Province", description: "Hill country city known as 'Little England'" },
    { id: 10, name: "Matale", location: "Central Province", description: "City known for spice gardens and ancient temples" },
    { id: 11, name: "Dambulla", location: "Central Province", description: "Home to the famous Golden Temple and cave temples" },
    
    // Southern Province
    { id: 12, name: "Galle", location: "Southern Province", description: "Historic city with Dutch colonial fort (UNESCO site)" },
    { id: 13, name: "Matara", location: "Southern Province", description: "Coastal city with Dutch colonial heritage" },
    { id: 14, name: "Hambantota", location: "Southern Province", description: "Port city and administrative hub of Hambantota District" },
    
    // Northern Province
    { id: 15, name: "Jaffna", location: "Northern Province", description: "Cultural and economic capital of Northern Province" },
    { id: 16, name: "Kilinochchi", location: "Northern Province", description: "Main town in Kilinochchi District" },
    { id: 17, name: "Mullaitivu", location: "Northern Province", description: "Coastal town in northeastern Sri Lanka" },
    { id: 18, name: "Vavuniya", location: "Northern Province", description: "Gateway city to the Northern Province" },
    
    // Eastern Province
    { id: 19, name: "Trincomalee", location: "Eastern Province", description: "Port city with one of the finest natural harbors in the world" },
    { id: 20, name: "Batticaloa", location: "Eastern Province", description: "City known for its lagoons and 'singing fish'" },
    { id: 21, name: "Kalmunai", location: "Eastern Province", description: "Major urban center in the eastern coast" },
    
    // North Western Province
    { id: 22, name: "Kurunegala", location: "North Western Province", description: "Major commercial city surrounded by rock formations" },
    { id: 23, name: "Puttalam", location: "North Western Province", description: "Coastal city known for salt production and fishing" },
    { id: 24, name: "Chilaw", location: "North Western Province", description: "Coastal city known for coconut and fishing industries" },
    { id: 25, name: "Kuliyapitiya", location: "North Western Province", description: "Commercial center in the Kurunegala District" },
    
    // North Central Province
    { id: 26, name: "Anuradhapura", location: "North Central Province", description: "Ancient capital and UNESCO World Heritage site" },
    { id: 27, name: "Polonnaruwa", location: "North Central Province", description: "Medieval capital and UNESCO World Heritage site" },
    
    // Uva Province
    { id: 28, name: "Badulla", location: "Uva Province", description: "Capital city of Uva Province in the hill country" },
    { id: 29, name: "Bandarawela", location: "Uva Province", description: "Hill country city known for its mild climate" },
    
    // Sabaragamuwa Province
    { id: 30, name: "Ratnapura", location: "Sabaragamuwa Province", description: "Known as the 'City of Gems'" },
    { id: 31, name: "Kegalle", location: "Sabaragamuwa Province", description: "City surrounded by rubber and coconut plantations" },
    
    // Additional Notable Cities
    { id: 32, name: "Bentota", location: "Southern Province", description: "Popular beach resort town" },
    { id: 33, name: "Sigiriya", location: "Central Province", description: "Ancient rock fortress and palace ruins" },
    { id: 34, name: "Hikkaduwa", location: "Southern Province", description: "Coastal resort town famous for surfing and coral reefs" },
    { id: 35, name: "Ella", location: "Uva Province", description: "Hill country town popular with travelers" },
    { id: 36, name: "Arugam Bay", location: "Eastern Province", description: "Popular surfing destination on the east coast" }
  ];

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    setFilteredCities(citiesData);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = citiesData.filter(city => 
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities(citiesData);
    }
  }, [searchQuery]);

  // const navigateToHome = () => {
  //   router.push('/home');
  // }

  // const navigateToItinerary = () => {
  //   router.push('/trip-itinerary');
  // }

  // const navigateToRecentTrips = () => {
  //   router.push('/recent-trips');
  // }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cities</Text>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Ionicons name="person-circle" size={32} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search cities or provinces..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{citiesData.length}</Text>
          <Text style={styles.statLabel}>Cities</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>9</Text>
          <Text style={styles.statLabel}>Provinces</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>3</Text>
          <Text style={styles.statLabel}>UNESCO Sites</Text>
        </View>
      </View>

      {/* City Listings */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Explore Sri Lanka's Vibrant Cities</Text>
        
        {filteredCities.map((city) => (
          <TouchableOpacity 
            key={city.id} 
            style={styles.cityCard}
            onPress={() => {
              // Navigate to individual city detail page (to be implemented)
              console.log(`Clicked on ${city.name}`);
            }}
          >
            <View style={styles.cityInfo}>
              <Text style={styles.cityName}>{city.name}</Text>
              <View style={styles.cityDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="location" size={16} color="#3478F6" />
                  <Text style={styles.detailText}>{city.location}</Text>
                </View>
              </View>
              {city.description ? (
                <Text style={styles.cityDescription} numberOfLines={2}>
                  {city.description}
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.spaceAtBottom} />
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <Footer/>
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
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 22,
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
    marginBottom: 15,
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  statValue: {
    fontFamily: 'outfit-bold',
    fontSize: 16,
    color: '#333',
  },
  statLabel: {
    fontFamily: 'outfit',
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'outfit-medium',
    fontSize: 18,
    color: '#555',
    marginBottom: 15,
  },
  cityCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cityInfo: {
    padding: 15,
  },
  cityName: {
    fontFamily: 'outfit-bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  cityDetails: {
    flexDirection: 'row',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 4,
  },
  detailText: {
    fontFamily: 'outfit',
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  cityDescription: {
    fontFamily: 'outfit',
    fontSize: 13,
    color: '#777',
    lineHeight: 18,
  },
  spaceAtBottom: {
    height: 80,
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