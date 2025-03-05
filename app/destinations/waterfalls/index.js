// Create this file at app/destinations/waterfalls/index.js

import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function Waterfalls() {
  const navigation = useNavigation();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWaterfalls, setFilteredWaterfalls] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Define categories
  const categories = [
    "All",
    "Famous Waterfalls", 
    "Central Highlands", 
    "Southern Region", 
    "Northern & Eastern", 
    "Less Known"
  ];

  // Define waterfalls data grouped by category
  const waterfallsData = [
    // Famous Waterfalls
    { id: 1, name: "Bambarakanda Falls", location: "Kalupahana", description: "Highest waterfall in Sri Lanka (263m)", category: "Famous Waterfalls", isPopular: true },
    { id: 2, name: "Baker's Falls", location: "Horton Plains", description: "Located in Horton Plains National Park", category: "Famous Waterfalls", isPopular: true },
    { id: 3, name: "Diyaluma Falls", location: "Koslanda", description: "Second highest waterfall (220m)", category: "Famous Waterfalls", isPopular: true },
    { id: 4, name: "St. Clair's Falls", location: "Talawakele", description: "Called the 'Little Niagara of Sri Lanka'", category: "Famous Waterfalls", isPopular: true },
    { id: 5, name: "Devon Falls", location: "Nuwara Eliya", description: "Named after a British coffee planter", category: "Famous Waterfalls", isPopular: true },
    { id: 6, name: "Ravana Falls", location: "Ella", description: "Associated with the Ramayana legend", category: "Famous Waterfalls", isPopular: true },
    { id: 7, name: "Dunhinda Falls", location: "Badulla", description: "Known as the 'Bridal Falls'", category: "Famous Waterfalls", isPopular: true },
    { id: 8, name: "Bopath Ella", location: "Kuruwita", description: "Shaped like a Bo leaf", category: "Famous Waterfalls", isPopular: true },
    { id: 9, name: "Aberdeen Falls", location: "Nuwara Eliya", description: "Located in Nuwara Eliya district", category: "Famous Waterfalls", isPopular: true },
    { id: 10, name: "Laxapana Falls", location: "Maskeliya", description: "Powers a major hydroelectric plant", category: "Famous Waterfalls", isPopular: true },
    
    // Central Highlands Waterfalls
    { id: 11, name: "World's End Waterfall", location: "Horton Plains", description: "Near the famous World's End cliff", category: "Central Highlands" },
    { id: 12, name: "Ramboda Falls", location: "Ramboda", description: "Three-tiered waterfall", category: "Central Highlands", isPopular: true },
    { id: 13, name: "Lovers Leap Falls", location: "Nuwara Eliya", description: "Has a tragic legend associated with it", category: "Central Highlands" },
    { id: 14, name: "Bomburu Ella", location: "Welimada", description: "Consisting of multiple cascades", category: "Central Highlands" },
    { id: 15, name: "Gerandi Ella", location: "Horton Plains", description: "In the Horton Plains region", category: "Central Highlands" },
    { id: 16, name: "Elgin Falls", location: "Dickoya", description: "Near Dickoya", category: "Central Highlands" },
    { id: 17, name: "Nuwara Eliya Falls", location: "Nuwara Eliya", description: "Within the hill station", category: "Central Highlands" },
    { id: 18, name: "Kotmale Ella", location: "Kotmale", description: "Near the Kotmale reservoir", category: "Central Highlands" },
    { id: 19, name: "Puna Ella", location: "Balangoda", description: "In the Balangoda area", category: "Central Highlands" },
    { id: 20, name: "Galagama Falls", location: "Kandy", description: "In the Kandyan hills", category: "Central Highlands" },
    { id: 21, name: "Kurundu Ella", location: "Nuwara Eliya", description: "In the tea country", category: "Central Highlands" },
    { id: 22, name: "Surathali Falls", location: "Hatton", description: "Near Hatton", category: "Central Highlands" },
    
    // Southern Region Waterfalls
    { id: 23, name: "Kirindi Ella", location: "Badulla", description: "In the Badulla district", category: "Southern Region" },
    { id: 24, name: "Duwili Ella", location: "Belihuloya", description: "'Smoky Falls' in Belihuloya", category: "Southern Region" },
    { id: 25, name: "Pahanthuda Ella", location: "Ratnapura", description: "'Lamp Falls'", category: "Southern Region" },
    { id: 26, name: "Brahmana Ella", location: "Haputale", description: "In the Haputale region", category: "Southern Region" },
    { id: 27, name: "Galdola Falls", location: "Deniyaya", description: "In the Deniyaya area", category: "Southern Region" },
    { id: 28, name: "Kohilawala Falls", location: "Kalutara", description: "Near Kalutara", category: "Southern Region" },
    { id: 29, name: "Kudawa Falls", location: "Sinharaja", description: "Within Sinharaja Forest Reserve", category: "Southern Region" },
    { id: 30, name: "Narangala Falls", location: "Uva", description: "In Uva province", category: "Southern Region" },
    { id: 31, name: "Maturata Falls", location: "Nuwara Eliya", description: "In the Nuwara Eliya district", category: "Southern Region" },
    { id: 32, name: "Veli Ella", location: "Badulla", description: "In the Badulla district", category: "Southern Region" },
    { id: 33, name: "Wellawaya Falls", location: "Wellawaya", description: "Near Wellawaya town", category: "Southern Region" },
    
    // Northern and Eastern Waterfalls
    { id: 34, name: "Sera Ella", location: "Laggala", description: "In Laggala", category: "Northern & Eastern" },
    { id: 35, name: "Huluganga Falls", location: "Huluganga", description: "On the Huluganga River", category: "Northern & Eastern" },
    { id: 36, name: "Ranmudu Ella", location: "Kandy", description: "In the Kandy district", category: "Northern & Eastern" },
    { id: 37, name: "Ratna Ella Falls", location: "Hasalaka", description: "In Hasalaka", category: "Northern & Eastern" },
    { id: 38, name: "Kumbuk River Falls", location: "Eastern Province", description: "In the East", category: "Northern & Eastern" },
    { id: 39, name: "Lakshapana Falls", location: "Maskeliya", description: "In the Maskeliya area", category: "Northern & Eastern" },
    { id: 40, name: "Sudugala Falls", location: "Adam's Peak", description: "In the Adam's Peak wilderness", category: "Northern & Eastern" },
    { id: 41, name: "Hulu Ganga Falls", location: "Kandy", description: "Near Kandy", category: "Northern & Eastern" },
    { id: 42, name: "Moray Falls", location: "Central Highlands", description: "In the highlands", category: "Northern & Eastern" },
    
    // Less Known Waterfalls
    { id: 43, name: "Jodu Ella", location: "Ratnapura", description: "Twin falls", category: "Less Known" },
    { id: 44, name: "Dehena Ella", location: "Uva", description: "In the Uva region", category: "Less Known" },
    { id: 45, name: "Nil Diya Pokuna Falls", location: "Central Province", description: "'Blue Water Pool'", category: "Less Known" },
    { id: 46, name: "Gartmore Falls", location: "Tea Country", description: "Near the tea plantations", category: "Less Known" },
    { id: 47, name: "Kolapathana Ella", location: "Central Province", description: "In the central province", category: "Less Known" },
    { id: 48, name: "Gehangala Ella", location: "Ratnapura", description: "Off the beaten path", category: "Less Known" },
    { id: 49, name: "Katugas Ella", location: "Kitulgala", description: "In the Kitulgala area", category: "Less Known" },
    { id: 50, name: "Wewessa Falls", location: "Kithulgala", description: "Near Kithulgala", category: "Less Known" },
    { id: 51, name: "Katulewa Falls", location: "Sabaragamuwa", description: "In the Sabaragamuwa province", category: "Less Known" },
    { id: 52, name: "Sinhagala Falls", location: "Central Highlands", description: "In the central highlands", category: "Less Known" },
    { id: 53, name: "Gomma Falls", location: "Kithulgala", description: "In the Kithulgala region", category: "Less Known" },
    { id: 54, name: "Oliyagankele Falls", location: "Kandy", description: "Off the beaten path", category: "Less Known" },
    { id: 55, name: "Handapan Ella", location: "Ella", description: "Described as curtain-like", category: "Less Known" },
    { id: 56, name: "Galagediyana Falls", location: "Matale", description: "In the Matale region", category: "Less Known" },
    { id: 57, name: "Asupini Ella", location: "Kalutara", description: "In the Kalutara district", category: "Less Known" },
    { id: 58, name: "Olu Ella", location: "Central Province", description: "'Lotus Falls'", category: "Less Known" },
    { id: 59, name: "Hunnasgiriya Falls", location: "Central Highlands", description: "In the central highlands", category: "Less Known" },
    { id: 60, name: "Vallamai Falls", location: "Nuwara Eliya", description: "In the Nuwara Eliya district", category: "Less Known" },
    { id: 61, name: "Mapanana Falls", location: "Southwest", description: "In the southwest", category: "Less Known" },
    { id: 62, name: "Kalupahana Falls", location: "Sabaragamuwa", description: "In the Sabaragamuwa province", category: "Less Known" },
    { id: 63, name: "Nanunukula Falls", location: "Eastern Highlands", description: "In the eastern highlands", category: "Less Known" },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    setFilteredWaterfalls(waterfallsData);
  }, []);

  useEffect(() => {
    let filtered = waterfallsData;
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(waterfall => 
        waterfall.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        waterfall.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        waterfall.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        waterfall.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(waterfall => waterfall.category === selectedCategory);
    }
    
    setFilteredWaterfalls(filtered);
  }, [searchQuery, selectedCategory]);

  const navigateToHome = () => {
    router.push('/home');
  }

  const navigateToItinerary = () => {
    router.push('/trip-itinerary');
  }

  const navigateToRecentTrips = () => {
    router.push('/recent-trips');
  }

  // Function to count tall waterfalls (> 100m)
  const countTallWaterfalls = () => {
    // This is an estimate since we don't have heights for all waterfalls
    return 8; // Bambarakanda, Diyaluma, St. Clair's, Devon, Aberdeen, Laxapana, etc.
  }

  // Function to count popular waterfalls
  const countPopularWaterfalls = () => {
    return waterfallsData.filter(waterfall => waterfall.isPopular).length;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Waterfalls</Text>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Ionicons name="person-circle" size={32} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search waterfalls, locations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{waterfallsData.length}</Text>
          <Text style={styles.statLabel}>Waterfalls</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{countTallWaterfalls()}</Text>
          <Text style={styles.statLabel}>Tall Falls</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{countPopularWaterfalls()}</Text>
          <Text style={styles.statLabel}>Popular</Text>
        </View>
      </View>

      {/* Category Filter using FlatList */}
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        style={styles.categoryList}
        contentContainerStyle={styles.categoryContainer}
        renderItem={({item}) => (
          <TouchableOpacity 
            style={[
              styles.categoryButton,
              selectedCategory === item && styles.selectedCategoryButton
            ]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text 
              style={[
                styles.categoryText,
                selectedCategory === item && styles.selectedCategoryText
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Waterfalls Listings */}
      <ScrollView 
        style={styles.contentContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentInnerContainer}
      >
        <Text style={styles.sectionTitle}>Explore Sri Lanka's Cascading Waters</Text>
        
        {filteredWaterfalls.map((waterfall) => (
          <TouchableOpacity 
            key={waterfall.id} 
            style={styles.waterfallCard}
            onPress={() => {
              // Navigate to individual waterfall detail page (to be implemented)
              console.log(`Clicked on ${waterfall.name}`);
            }}
          >
            <View style={styles.waterfallInfo}>
              {waterfall.isPopular && <View style={styles.popularBadge}><Text style={styles.popularText}>Popular</Text></View>}
              <Text style={styles.waterfallName}>{waterfall.name}</Text>
              <View style={styles.waterfallDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="location" size={16} color="#3478F6" />
                  <Text style={styles.detailText}>{waterfall.location}</Text>
                </View>
                <View style={styles.detailRow}>
                  <MaterialIcons name="category" size={16} color="#03A9F4" />
                  <Text style={styles.detailText}>{waterfall.category}</Text>
                </View>
              </View>
              {waterfall.description ? (
                <Text style={styles.waterfallDescription} numberOfLines={2}>
                  {waterfall.description}
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.spaceAtBottom} />
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
    backgroundColor: '#f5f5f5',
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
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
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
    marginBottom: 8, // Proper spacing
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
  categoryList: {
    maxHeight: 34,
    minHeight: 34,
    marginTop: 2, // Small top margin
    marginBottom: 8,
  },
  categoryContainer: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
  },
  selectedCategoryButton: {
    backgroundColor: '#03A9F4', // Waterfall blue color
  },
  categoryText: {
    fontFamily: 'outfit-medium',
    fontSize: 12,
    color: '#666',
  },
  selectedCategoryText: {
    color: 'white',
  },
  contentContainer: {
    flex: 1,
  },
  contentInnerContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'outfit-medium',
    fontSize: 17,
    color: '#555',
    marginBottom: 12,
  },
  waterfallCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  waterfallInfo: {
    padding: 14,
    paddingTop: 12,
  },
  popularBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#03A9F4', // Changed to blue for waterfalls
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  popularText: {
    color: 'white',
    fontFamily: 'outfit',
    fontSize: 10,
  },
  waterfallName: {
    fontFamily: 'outfit-bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    paddingRight: 60, // Space for the popular badge
  },
  waterfallDetails: {
    flexDirection: 'row',
    marginBottom: 6,
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
  waterfallDescription: {
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