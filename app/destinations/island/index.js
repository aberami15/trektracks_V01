// Create this file at app/destinations/islands/index.js

import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import Footer from '../../footer';


export default function Island() {
  const navigation = useNavigation();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredIslands, setFilteredIslands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Define categories
  const categories = [
    "All",
    "Northern Islands", 
    "Eastern Islands", 
    "Southern Islands", 
    "Western Islands", 
    "Inland Islands"
  ];

  // Define islands data grouped by category
  const islandsData = [
    // Northern Islands (Jaffna Peninsula Area)
    { id: 1, name: "Delft Island (Neduntheevu)", location: "Jaffna Peninsula", description: "Known for wild ponies and ancient baobab trees", category: "Northern Islands", isPopular: true },
    { id: 2, name: "Nainativu (Nagadeepa)", location: "Jaffna Peninsula", description: "Site of important Buddhist and Hindu temples", category: "Northern Islands", isPopular: true },
    { id: 3, name: "Analaitivu", location: "Jaffna Peninsula", description: "One of the inhabited islands in Jaffna", category: "Northern Islands" },
    { id: 4, name: "Eluvaitivu", location: "Jaffna Peninsula", description: "Small northern island", category: "Northern Islands" },
    { id: 5, name: "Karaitivu", location: "Jaffna Peninsula", description: "Connected to Jaffna peninsula", category: "Northern Islands" },
    { id: 6, name: "Pungudutivu", location: "Jaffna Peninsula", description: "One of the larger populated islands near Jaffna", category: "Northern Islands" },
    { id: 7, name: "Kayts Island (Velanai)", location: "Jaffna Peninsula", description: "Connected by causeway to Jaffna", category: "Northern Islands" },
    { id: 8, name: "Mandaitivu", location: "Jaffna Peninsula", description: "Small island connected by causeway", category: "Northern Islands" },
    { id: 9, name: "Kachchativu", location: "Palk Strait", description: "Island with ownership transferred to Sri Lanka from India in 1974", category: "Northern Islands" },
    { id: 10, name: "Pallavarayankaddu", location: "Jaffna Peninsula", description: "Small northern island", category: "Northern Islands" },
    { id: 11, name: "Erumaitivu", location: "Jaffna Peninsula", description: "Small island in the north", category: "Northern Islands" },
    { id: 12, name: "Kurikadduwan", location: "Jaffna Peninsula", description: "Near Punkudutivu", category: "Northern Islands" },
    { id: 13, name: "Palaitivu", location: "Jaffna Peninsula", description: "Small island off Jaffna", category: "Northern Islands" },
    { id: 14, name: "Karainagar Island", location: "Jaffna Peninsula", description: "Connected to mainland by causeway", category: "Northern Islands" },
    
    // Eastern Islands
    { id: 15, name: "Pigeon Island", location: "Trincomalee", description: "National park near Trincomalee", category: "Eastern Islands", isPopular: true },
    { id: 16, name: "Kokkilai Island", location: "Northeast", description: "In the northeast region", category: "Eastern Islands" },
    { id: 17, name: "Dutch Bay Island", location: "Trincomalee", description: "Near Trincomalee", category: "Eastern Islands" },
    { id: 18, name: "Pulmoddai Islands", location: "Pulmoddai", description: "Small islands near Pulmoddai", category: "Eastern Islands" },
    { id: 19, name: "Sober Island", location: "Trincomalee", description: "In Trincomalee harbor", category: "Eastern Islands" },
    { id: 20, name: "Chapel Island", location: "Trincomalee", description: "Small island in Trincomalee", category: "Eastern Islands" },
    { id: 21, name: "Round Island", location: "Trincomalee", description: "In Trincomalee harbor area", category: "Eastern Islands" },
    { id: 22, name: "Pearl Island", location: "Trincomalee", description: "Near Trincomalee", category: "Eastern Islands" },
    { id: 23, name: "Norway Island", location: "Trincomalee", description: "In the Trincomalee harbor", category: "Eastern Islands" },
    { id: 24, name: "York Island", location: "Eastern Waters", description: "In the eastern waters", category: "Eastern Islands" },
    
    // Southern Islands
    { id: 25, name: "Taprobane Island", location: "Weligama", description: "Small island with a single villa", category: "Southern Islands", isPopular: true },
    { id: 26, name: "Pigeon Island (Rumassala)", location: "Galle", description: "Near Galle", category: "Southern Islands" },
    { id: 27, name: "Barberyn Island", location: "Beruwala", description: "With historic lighthouse (Beruwala Lighthouse Island)", category: "Southern Islands", isPopular: true },
    { id: 28, name: "Great Basses", location: "Southern Coast", description: "Important maritime landmark with reef", category: "Southern Islands" },
    { id: 29, name: "Little Basses", location: "Southern Coast", description: "Important maritime landmark with reef", category: "Southern Islands" },
    { id: 30, name: "Foul Point Island", location: "Trincomalee", description: "Near Trincomalee", category: "Southern Islands" },
    { id: 31, name: "Urumalai Island", location: "South", description: "Small southern island", category: "Southern Islands" },
    { id: 32, name: "Kachchativu (South)", location: "South", description: "Small island in the south", category: "Southern Islands" },
    { id: 33, name: "Galpokuna Island", location: "Southern Coast", description: "Off the southern coast", category: "Southern Islands" },
    
    // Western Islands
    { id: 34, name: "Crow Island", location: "Colombo", description: "Near Colombo (now connected to mainland)", category: "Western Islands" },
    { id: 35, name: "Adam's Bridge Islands", location: "Northwest", description: "Chain of limestone shoals between India and Sri Lanka", category: "Western Islands", isPopular: true },
    { id: 36, name: "Karuwalaya Island", location: "Northwest", description: "In the northwestern waters", category: "Western Islands" },
    { id: 37, name: "Negombo Lagoon Islands", location: "Negombo", description: "Small islands in Negombo Lagoon", category: "Western Islands" },
    { id: 38, name: "Puttalam Lagoon Islands", location: "Puttalam", description: "Islands in Puttalam Lagoon", category: "Western Islands" },
    { id: 39, name: "Muthurajawela Islets", location: "Western Province", description: "In the wetland area", category: "Western Islands" },
    
    // Central/Inland Islands (Reservoir and Lake Islands)
    { id: 40, name: "Kotmale Reservoir Islands", location: "Central Province", description: "Islands in Kotmale Reservoir", category: "Inland Islands" },
    { id: 41, name: "Victoria Reservoir Islands", location: "Central Province", description: "Islands in Victoria Reservoir", category: "Inland Islands" },
    { id: 42, name: "Randenigala Reservoir Islands", location: "Central Province", description: "Islands in Randenigala Reservoir", category: "Inland Islands" },
    { id: 43, name: "Mahaweli River Islands", location: "Central Province", description: "Islands in Mahaweli River system", category: "Inland Islands" },
    { id: 44, name: "Maduru Oya Islands", location: "Eastern Province", description: "Islands in Maduru Oya Reservoir", category: "Inland Islands" },
    { id: 45, name: "Senanayake Samudra Islands", location: "Eastern Province", description: "Islands in Senanayake Samudra", category: "Inland Islands" },
    { id: 46, name: "Rantambe Islands", location: "Central Province", description: "Islands in Rantambe Reservoir", category: "Inland Islands" },
    { id: 47, name: "Castlereagh Islands", location: "Central Province", description: "Castlereagh Reservoir islands", category: "Inland Islands" },
    { id: 48, name: "Maussakele Islands", location: "Central Province", description: "Maussakele Reservoir islands", category: "Inland Islands" },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    setFilteredIslands(islandsData);
  }, []);

  useEffect(() => {
    let filtered = islandsData;
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(island => 
        island.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        island.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        island.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        island.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(island => island.category === selectedCategory);
    }
    
    setFilteredIslands(filtered);
  }, [searchQuery, selectedCategory]);


  // Function to count access types (accessible by land)
  const countAccessibleByLand = () => {
    // Islands connected by causeway or now connected to mainland
    return 5; // Approximation based on descriptions
  }

  // Function to count popular islands
  const countPopularIslands = () => {
    return islandsData.filter(island => island.isPopular).length;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Islands</Text>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Ionicons name="person-circle" size={32} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search islands, locations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{islandsData.length}</Text>
          <Text style={styles.statLabel}>Islands</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{countAccessibleByLand()}</Text>
          <Text style={styles.statLabel}>Land Access</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{countPopularIslands()}</Text>
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

      {/* Islands Listings */}
      <ScrollView 
        style={styles.contentContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentInnerContainer}
      >
        <Text style={styles.sectionTitle}>Explore Sri Lanka's Beautiful Islands</Text>
        
        {filteredIslands.map((island) => (
          <TouchableOpacity 
            key={island.id} 
            style={styles.islandCard}
            onPress={() => {
              // Navigate to individual island detail page (to be implemented)
              console.log(`Clicked on ${island.name}`);
            }}
          >
            <View style={styles.islandInfo}>
              {island.isPopular && <View style={styles.popularBadge}><Text style={styles.popularText}>Popular</Text></View>}
              <Text style={styles.islandName}>{island.name}</Text>
              <View style={styles.islandDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="location" size={16} color="#3478F6" />
                  <Text style={styles.detailText}>{island.location}</Text>
                </View>
                <View style={styles.detailRow}>
                  <MaterialIcons name="category" size={16} color="#009688" />
                  <Text style={styles.detailText}>{island.category}</Text>
                </View>
              </View>
              {island.description ? (
                <Text style={styles.islandDescription} numberOfLines={2}>
                  {island.description}
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
    backgroundColor: '#009688', // Teal color for islands
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
  islandCard: {
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
  islandInfo: {
    padding: 14,
    paddingTop: 12,
  },
  popularBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#009688', // Teal color for islands
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  popularText: {
    color: 'white',
    fontFamily: 'outfit',
    fontSize: 10,
  },
  islandName: {
    fontFamily: 'outfit-bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    paddingRight: 60, // Space for the popular badge
  },
  islandDetails: {
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
  islandDescription: {
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