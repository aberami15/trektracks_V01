// Create this file at app/destinations/lakes/index.js

import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import Footer from '../../footer'


export default function Lake() {
  const navigation = useNavigation();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLakes, setFilteredLakes] = useState([]);

  // Define lakes data grouped by category
  const lakesData = [
    // Natural Lakes
    { id: 1, name: "Bolgoda Lake", location: "Western Province", description: "Largest natural lake in Sri Lanka", category: "Natural Lakes" },
    { id: 2, name: "Batticaloa Lagoon", location: "Eastern Province", description: "Famous for 'singing fish' phenomenon", category: "Natural Lakes" },
    { id: 3, name: "Koggala Lake", location: "Southern Province", description: "Known for stilt fishermen and bird islands", category: "Natural Lakes" },
    { id: 4, name: "Madu Ganga", location: "Southern Province", description: "Complex coastal ecosystem with mangroves", category: "Natural Lakes" },
    { id: 5, name: "Lunugamvehera Tank", location: "Southern Province", description: "Natural lake and wildlife habitat", category: "Natural Lakes" },
    { id: 6, name: "Kokkilai Lagoon", location: "Northern Province", description: "Important bird area and wetland", category: "Natural Lakes" },
    { id: 7, name: "Nayaru Lagoon", location: "Eastern Province", description: "Coastal lagoon with rich ecosystem", category: "Natural Lakes" },
    { id: 8, name: "Jaffna Lagoon", location: "Northern Province", description: "Large lagoon in the Jaffna Peninsula", category: "Natural Lakes" },
    { id: 9, name: "Mundel Lake", location: "North Western Province", description: "Coastal lake with fishing communities", category: "Natural Lakes" },
    { id: 10, name: "Rekawa Lagoon", location: "Southern Province", description: "Important turtle nesting site", category: "Natural Lakes" },
    { id: 11, name: "Lahugala Lake", location: "Eastern Province", description: "Frequented by elephants and wildlife", category: "Natural Lakes" },
    { id: 12, name: "Tissa Wewa (Tissamaharama)", location: "Southern Province", description: "Natural lake with historical significance", category: "Natural Lakes" },

    // Ancient Tanks (Historical Reservoirs)
    { id: 13, name: "Parakrama Samudra", location: "North Central Province", description: "Sea of Parakrama, ancient irrigation marvel", category: "Ancient Tanks" },
    { id: 14, name: "Minneriya Tank", location: "North Central Province", description: "Famous for 'The Gathering' of elephants", category: "Ancient Tanks" },
    { id: 15, name: "Kala Wewa", location: "North Central Province", description: "Ancient irrigation tank built in 5th century", category: "Ancient Tanks" },
    { id: 16, name: "Kantale Tank", location: "Eastern Province", description: "Historic reservoir with ancient engineering", category: "Ancient Tanks" },
    { id: 17, name: "Sorabora Wewa", location: "Uva Province", description: "Ancient tank with historical significance", category: "Ancient Tanks" },
    { id: 18, name: "Kandalama Tank", location: "Central Province", description: "Ancient reservoir near Dambulla", category: "Ancient Tanks" },
    { id: 19, name: "Giritale Tank", location: "North Central Province", description: "Ancient irrigation tank near Polonnaruwa", category: "Ancient Tanks" },
    { id: 20, name: "Nachchaduwa Tank", location: "North Central Province", description: "Ancient irrigation reservoir", category: "Ancient Tanks" },
    { id: 21, name: "Nuwarawewa", location: "North Central Province", description: "Ancient tank in Anuradhapura", category: "Ancient Tanks" },
    { id: 22, name: "Basawakkulama Tank", location: "North Central Province", description: "One of the oldest reservoirs in Sri Lanka", category: "Ancient Tanks" },
    { id: 23, name: "Tissa Wewa (Anuradhapura)", location: "North Central Province", description: "Ancient tank in sacred city", category: "Ancient Tanks" },
    { id: 24, name: "Abhaya Wewa", location: "North Central Province", description: "Ancient tank in Anuradhapura", category: "Ancient Tanks" },
    { id: 25, name: "Polonnaruwa Wewa", location: "North Central Province", description: "Ancient reservoir in historic city", category: "Ancient Tanks" },
    { id: 26, name: "Mahavilachchiya Tank", location: "North Central Province", description: "Ancient irrigation work", category: "Ancient Tanks" },
    { id: 27, name: "Yodha Wewa", location: "North Central Province", description: "Giant's Tank, ancient irrigation marvel", category: "Ancient Tanks" },
    { id: 28, name: "Huruluwewa", location: "North Central Province", description: "Ancient tank with rich biodiversity", category: "Ancient Tanks" },
    { id: 29, name: "Ridiyagama Tank", location: "Southern Province", description: "Ancient reservoir with historical significance", category: "Ancient Tanks" },
    { id: 30, name: "Badagiriya Tank", location: "Southern Province", description: "Ancient irrigation reservoir", category: "Ancient Tanks" },
    { id: 31, name: "Mahagama Tank", location: "Southern Province", description: "Historical irrigation tank", category: "Ancient Tanks" },
    { id: 32, name: "Thabbowa Wewa", location: "North Western Province", description: "Ancient reservoir with wildlife", category: "Ancient Tanks" },
    { id: 33, name: "Pimburettewa", location: "North Central Province", description: "Ancient irrigation work", category: "Ancient Tanks" },
    { id: 34, name: "Kaudulla Tank", location: "North Central Province", description: "Ancient tank known for elephant gathering", category: "Ancient Tanks" },
    { id: 35, name: "Padaviya Tank", location: "Northern Province", description: "One of the largest ancient reservoirs", category: "Ancient Tanks" },
    { id: 36, name: "Dewahuwa Tank", location: "Central Province", description: "Ancient irrigation reservoir", category: "Ancient Tanks" },

    // Modern Reservoirs
    { id: 37, name: "Senanayake Samudra", location: "Eastern Province", description: "Sri Lanka's first major modern reservoir", category: "Modern Reservoirs" },
    { id: 38, name: "Victoria Reservoir", location: "Central Province", description: "Major hydroelectric reservoir on Mahaweli River", category: "Modern Reservoirs" },
    { id: 39, name: "Randenigala Reservoir", location: "Central Province", description: "Major hydroelectric dam on Mahaweli River", category: "Modern Reservoirs" },
    { id: 40, name: "Kotmale Reservoir", location: "Central Province", description: "Picturesque reservoir in hill country", category: "Modern Reservoirs" },
    { id: 41, name: "Udawalawe Reservoir", location: "Sabaragamuwa Province", description: "Created by damming the Walawe River", category: "Modern Reservoirs" },
    { id: 42, name: "Lunugamvehera Reservoir", location: "Southern Province", description: "Major irrigation reservoir", category: "Modern Reservoirs" },
    { id: 43, name: "Rajangana Reservoir", location: "North Western Province", description: "Modern irrigation reservoir", category: "Modern Reservoirs" },
    { id: 44, name: "Deduru Oya Reservoir", location: "North Western Province", description: "Recently built major irrigation reservoir", category: "Modern Reservoirs" },
    { id: 45, name: "Rajanganaya Tank", location: "North Central Province", description: "Large modern irrigation reservoir", category: "Modern Reservoirs" },
    { id: 46, name: "Mahakandarawa Tank", location: "North Central Province", description: "Rehabilitated ancient tank", category: "Modern Reservoirs" },
    { id: 47, name: "Chandrikawewa", location: "Southern Province", description: "Named after former president's wife", category: "Modern Reservoirs" },
    { id: 48, name: "Malwathu Oya Reservoir", location: "Northern Province", description: "Irrigation reservoir", category: "Modern Reservoirs" },
    { id: 49, name: "Iranamadu Tank", location: "Northern Province", description: "Major irrigation reservoir in Northern Province", category: "Modern Reservoirs" },
    { id: 50, name: "Akkarayan Tank", location: "Northern Province", description: "Irrigation reservoir in Northern Province", category: "Modern Reservoirs" },
    { id: 51, name: "Rambaken Oya Reservoir", location: "Eastern Province", description: "Modern irrigation project", category: "Modern Reservoirs" },
    { id: 52, name: "Maduru Oya Reservoir", location: "Eastern Province", description: "Major reservoir in Mahaweli system", category: "Modern Reservoirs" },
    { id: 53, name: "Inginimitiya Reservoir", location: "North Western Province", description: "Modern irrigation reservoir", category: "Modern Reservoirs" },
    { id: 54, name: "Polgolla Reservoir", location: "Central Province", description: "Diversion reservoir in Mahaweli system", category: "Modern Reservoirs" },
    { id: 55, name: "Bowatenna Reservoir", location: "Central Province", description: "Part of the Mahaweli Development program", category: "Modern Reservoirs" },
    { id: 56, name: "Hakwatuna Oya Reservoir", location: "North Western Province", description: "Modern irrigation reservoir", category: "Modern Reservoirs" },
    { id: 57, name: "Kala Oya Reservoir", location: "North Western Province", description: "Modern irrigation project", category: "Modern Reservoirs" },
    { id: 58, name: "Moragahakanda Reservoir", location: "Central Province", description: "Newest major reservoir in Sri Lanka", category: "Modern Reservoirs" },

    // Scenic Lakes
    { id: 59, name: "Nuwara Eliya Lake", location: "Central Province", description: "Also known as Gregory Lake, popular tourist destination", category: "Scenic Lakes" },
    { id: 60, name: "Kandy Lake", location: "Central Province", description: "Artificial lake in the heart of Kandy city", category: "Scenic Lakes" },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    setFilteredLakes(lakesData);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = lakesData.filter(lake => 
        lake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lake.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lake.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lake.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLakes(filtered);
    } else {
      setFilteredLakes(lakesData);
    }
  }, [searchQuery]);


  // Function to count unique categories
  const countCategories = () => {
    const categories = new Set(lakesData.map(lake => lake.category));
    return categories.size;
  }

  // Function to count ancient tanks
  const countAncientTanks = () => {
    return lakesData.filter(lake => lake.category === "Ancient Tanks").length;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lakes</Text>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Ionicons name="person-circle" size={32} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search lakes, locations, or categories..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{lakesData.length}</Text>
          <Text style={styles.statLabel}>Lakes</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{countCategories()}</Text>
          <Text style={styles.statLabel}>Categories</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{countAncientTanks()}</Text>
          <Text style={styles.statLabel}>Ancient Tanks</Text>
        </View>
      </View>

      {/* Lake Listings */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Explore Sri Lanka's Beautiful Lakes</Text>
        
        {filteredLakes.map((lake) => (
          <TouchableOpacity 
            key={lake.id} 
            style={styles.lakeCard}
            onPress={() => {
            }}
          >
            <View style={styles.lakeInfo}>
              <Text style={styles.lakeName}>{lake.name}</Text>
              <View style={styles.lakeDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="location" size={16} color="#3478F6" />
                  <Text style={styles.detailText}>{lake.location}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="water" size={16} color="#00BCD4" />
                  <Text style={styles.detailText}>{lake.category}</Text>
                </View>
              </View>
              {lake.description ? (
                <Text style={styles.lakeDescription} numberOfLines={2}>
                  {lake.description}
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
  lakeCard: {
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
  lakeInfo: {
    padding: 15,
  },
  lakeName: {
    fontFamily: 'outfit-bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  lakeDetails: {
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
  lakeDescription: {
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