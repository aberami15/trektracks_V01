// Create this file at app/destinations/forests/index.js

import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import Footer from '../../footer'

export default function Forest() {
  const navigation = useNavigation();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredForests, setFilteredForests] = useState([]);

  // Define forests data grouped by category
  const forestsData = [
    // Rainforests and Wet Zone Forests
    { id: 1, name: "Sinharaja Forest Reserve", location: "Wet Zone", description: "UNESCO World Heritage Site and biodiversity hotspot", category: "Rainforests and Wet Zone Forests" },
    { id: 2, name: "Kanneliya Forest Reserve", location: "Southern Province", description: "Part of the Kanneliya-Dediyagala-Nakiyadeniya (KDN) complex", category: "Rainforests and Wet Zone Forests" },
    { id: 3, name: "Dediyagala Forest Reserve", location: "Southern Province", description: "Important watershed area and biodiversity haven", category: "Rainforests and Wet Zone Forests" },
    { id: 4, name: "Nakiyadeniya Forest Reserve", location: "Southern Province", description: "Rich in endemic species and wildlife", category: "Rainforests and Wet Zone Forests" },
    { id: 5, name: "Kottawa Forest Reserve", location: "Southern Province", description: "Home to a rich variety of flora and fauna", category: "Rainforests and Wet Zone Forests" },
    { id: 6, name: "Hiyare Forest Reserve", location: "Southern Province", description: "Important freshwater reservoir and biodiversity area", category: "Rainforests and Wet Zone Forests" },
    { id: 7, name: "Mulatiyana Forest Reserve", location: "Southern Province", description: "Pristine forest area with rich biodiversity", category: "Rainforests and Wet Zone Forests" },
    { id: 8, name: "Dellawa Forest Reserve", location: "Southern Province", description: "Rainforest with high botanical importance", category: "Rainforests and Wet Zone Forests" },
    { id: 9, name: "Diyadawa Forest Reserve", location: "Southern Province", description: "Key watershed forest with diverse ecosystem", category: "Rainforests and Wet Zone Forests" },
    { id: 10, name: "Walankanda Forest Reserve", location: "Western Province", description: "Important forest area in the wet zone", category: "Rainforests and Wet Zone Forests" },
    { id: 11, name: "Kudawa Forest Reserve", location: "Sabaragamuwa Province", description: "Gateway to Sinharaja with high biodiversity", category: "Rainforests and Wet Zone Forests" },
    { id: 12, name: "Morapitiya-Runakanda Forest Reserve", location: "Western Province", description: "Valuable rainforest ecosystem", category: "Rainforests and Wet Zone Forests" },
    { id: 13, name: "Delwala Forest Reserve", location: "Sabaragamuwa Province", description: "Diverse rainforest with endemic species", category: "Rainforests and Wet Zone Forests" },
    { id: 14, name: "Gilimmale-Eratne Forest Reserve", location: "Sabaragamuwa Province", description: "Rich forest area with diverse habitats", category: "Rainforests and Wet Zone Forests" },

    // Montane and Sub-montane Forests
    { id: 15, name: "Knuckles Forest Reserve", location: "Central Province", description: "UNESCO World Heritage Site also known as Dumbara Forest", category: "Montane and Sub-montane Forests" },
    { id: 16, name: "Hakgala Strict Nature Reserve", location: "Central Province", description: "One of the oldest nature reserves in Sri Lanka", category: "Montane and Sub-montane Forests" },
    { id: 17, name: "Horton Plains National Park", location: "Central Province", description: "Cloud forest plateau with unique biodiversity", category: "Montane and Sub-montane Forests" },
    { id: 18, name: "Pidurutalagala Forest Reserve", location: "Central Province", description: "Surrounds Sri Lanka's highest mountain", category: "Montane and Sub-montane Forests" },
    { id: 19, name: "Namunukula Forest Reserve", location: "Uva Province", description: "Montane forest with diverse highland species", category: "Montane and Sub-montane Forests" },
    { id: 20, name: "Peak Wilderness Sanctuary", location: "Central Province", description: "Forests surrounding Adam's Peak", category: "Montane and Sub-montane Forests" },
    { id: 21, name: "Handapan Ella Plains", location: "Uva Province", description: "High-altitude forest ecosystem", category: "Montane and Sub-montane Forests" },
    { id: 22, name: "Thangamale Sanctuary", location: "Central Province", description: "Important bird area with highland forests", category: "Montane and Sub-montane Forests" },
    { id: 23, name: "Conical Hill Forest Reserve", location: "Central Province", description: "High-altitude forest with unique ecosystem", category: "Montane and Sub-montane Forests" },
    { id: 24, name: "Agra-Bopats Forest Reserve", location: "Central Province", description: "Montane forest area with diverse habitats", category: "Montane and Sub-montane Forests" },
    { id: 25, name: "Dothalugala Forest Reserve", location: "Knuckles Range", description: "Important part of the Knuckles ecosystem", category: "Montane and Sub-montane Forests" },

    // Dry Zone Forests
    { id: 26, name: "Wilpattu National Park", location: "North Western Province", description: "Largest and oldest national park with diverse habitats", category: "Dry Zone Forests" },
    { id: 27, name: "Yala National Park", location: "Southern/Eastern Province", description: "Famous for leopards and diverse dry zone forests", category: "Dry Zone Forests" },
    { id: 28, name: "Hurulu Forest Reserve", location: "North Central Province", description: "UNESCO Biosphere Reserve with dry monsoon forest", category: "Dry Zone Forests" },
    { id: 29, name: "Ritigala Strict Nature Reserve", location: "North Central Province", description: "Ancient forest on an isolated mountain", category: "Dry Zone Forests" },
    { id: 30, name: "Kahalla-Pallekele Forest Reserve", location: "North Western Province", description: "Important forest corridor for elephants", category: "Dry Zone Forests" },
    { id: 31, name: "Minneriya-Giritale Nature Reserve", location: "North Central Province", description: "Forests around ancient reservoirs", category: "Dry Zone Forests" },
    { id: 32, name: "Wasgomuwa National Park", location: "North Central Province", description: "Pristine dry zone forest with diverse wildlife", category: "Dry Zone Forests" },
    { id: 33, name: "Maduru Oya National Park", location: "Eastern Province", description: "Forest protection area with ancient reservoirs", category: "Dry Zone Forests" },
    { id: 34, name: "Somawathie Chaitya National Park", location: "Eastern Province", description: "Riverine forest with cultural significance", category: "Dry Zone Forests" },
    { id: 35, name: "Kumana National Park", location: "Eastern Province", description: "Also known as Yala East, important bird area", category: "Dry Zone Forests" },
    { id: 36, name: "Angammedilla National Park", location: "North Central Province", description: "Forest connecting several protected areas", category: "Dry Zone Forests" },
    { id: 37, name: "Gal Oya National Park", location: "Eastern Province", description: "Forests surrounding Sri Lanka's largest reservoir", category: "Dry Zone Forests" },
    { id: 38, name: "Flood Plains National Park", location: "Eastern Province", description: "Unique riverine forest ecosystem", category: "Dry Zone Forests" },
    { id: 39, name: "Victoria-Randenigala-Rantambe Sanctuary", location: "Central Province", description: "Forests surrounding three major reservoirs", category: "Dry Zone Forests" },
    { id: 40, name: "Maduruoya Forest Reserve", location: "Eastern Province", description: "Important watershed forest area", category: "Dry Zone Forests" },
    { id: 41, name: "Polonnaruwa Nature Reserve", location: "North Central Province", description: "Forest surrounding ancient capital city", category: "Dry Zone Forests" },
    { id: 42, name: "Sigiriya Sanctuary", location: "Central Province", description: "Forest surrounding the ancient rock fortress", category: "Dry Zone Forests" },
    { id: 43, name: "Anuradhapura Sanctuary", location: "North Central Province", description: "Forest protecting the sacred ancient city", category: "Dry Zone Forests" },
    { id: 44, name: "Mihintale Sanctuary", location: "North Central Province", description: "Forest around the cradle of Buddhism in Sri Lanka", category: "Dry Zone Forests" },

    // Urban and Semi-urban Forests
    { id: 45, name: "Udawattakele Forest Reserve", location: "Kandy", description: "Historical forest sanctuary in Kandy city", category: "Urban and Semi-urban Forests" },
    { id: 46, name: "Gannoruwa Forest Reserve", location: "Central Province", description: "Semi-urban forest with research station", category: "Urban and Semi-urban Forests" },
    { id: 47, name: "Meegahakiula Forest", location: "Uva Province", description: "Semi-urban forest with diverse ecosystem", category: "Urban and Semi-urban Forests" },
    { id: 48, name: "Dambulla Forest Reserve", location: "Central Province", description: "Forest surrounding the famous cave temples", category: "Urban and Semi-urban Forests" },
    { id: 49, name: "Wasgamuwa Forest Reserve", location: "Central Province", description: "Important forest with rich biodiversity", category: "Urban and Semi-urban Forests" },

    // Coastal and Mangrove Forests
    { id: 50, name: "Kalametiya Mangrove Forest", location: "Southern Province", description: "Important coastal wetland with mangroves", category: "Coastal and Mangrove Forests" },
    { id: 51, name: "Panama Forest Reserve", location: "Eastern Province", description: "Coastal forest with unique ecosystem", category: "Coastal and Mangrove Forests" },
    { id: 52, name: "Batticaloa Mangrove Forests", location: "Eastern Province", description: "Important mangrove ecosystem on east coast", category: "Coastal and Mangrove Forests" },
    { id: 53, name: "Muthurajawela Marsh", location: "Western Province", description: "Largest coastal peat bog with mangroves", category: "Coastal and Mangrove Forests" },
    { id: 54, name: "Rekawa Mangrove Forest", location: "Southern Province", description: "Important turtle nesting site with mangroves", category: "Coastal and Mangrove Forests" },
    { id: 55, name: "Puttalam Lagoon Mangroves", location: "North Western Province", description: "Extensive mangrove ecosystem", category: "Coastal and Mangrove Forests" },
    { id: 56, name: "Koggala Mangrove Forest", location: "Southern Province", description: "Coastal mangroves with rich biodiversity", category: "Coastal and Mangrove Forests" },
    { id: 57, name: "Negombo Lagoon Mangroves", location: "Western Province", description: "Urban-adjacent mangrove ecosystem", category: "Coastal and Mangrove Forests" },
    { id: 58, name: "Jaffna Peninsula Mangroves", location: "Northern Province", description: "Northernmost mangrove forests in Sri Lanka", category: "Coastal and Mangrove Forests" },
    { id: 59, name: "Trincomalee Mangrove Forests", location: "Eastern Province", description: "Mangroves around natural harbor", category: "Coastal and Mangrove Forests" },

    // Other Forest Reserves
    { id: 60, name: "Auwana Forest Reserve", location: "Uva Province", description: "Important forest area with diverse habitats", category: "Other Forest Reserves" },
    { id: 61, name: "Eluwankulama Forest Reserve", location: "North Western Province", description: "Dry zone forest with unique biodiversity", category: "Other Forest Reserves" },
    { id: 62, name: "Galway's Land National Park", location: "Central Province", description: "Small forest park near Nuwara Eliya", category: "Other Forest Reserves" },
    { id: 63, name: "Haldummulla Forest Reserve", location: "Uva Province", description: "Montane forest area with rich biodiversity", category: "Other Forest Reserves" },
    { id: 64, name: "Idalgashinna Forest Reserve", location: "Uva Province", description: "High-altitude forest with unique ecosystem", category: "Other Forest Reserves" },
    { id: 65, name: "Kirigalpotta Forest Reserve", location: "Central Province", description: "Forest surrounding Sri Lanka's second highest peak", category: "Other Forest Reserves" },
    { id: 66, name: "Labugama-Kalatuwawa Forest Reserve", location: "Western Province", description: "Protected watershed for Colombo water supply", category: "Other Forest Reserves" },
    { id: 67, name: "Lunugamvehera National Park", location: "Southern Province", description: "Forest corridor connecting protected areas", category: "Other Forest Reserves" },
    { id: 68, name: "Madolsima Forest Reserve", location: "Uva Province", description: "Highland forest with rich biodiversity", category: "Other Forest Reserves" },
    { id: 69, name: "Namaltalawa Forest Reserve", location: "Uva Province", description: "Important forest with diverse flora", category: "Other Forest Reserves" },
    { id: 70, name: "Nuwaragala Forest Reserve", location: "Eastern Province", description: "Remote forest area with diverse wildlife", category: "Other Forest Reserves" },
    { id: 71, name: "Ohiya Forest Reserve", location: "Uva Province", description: "High-altitude forest with unique ecosystem", category: "Other Forest Reserves" },
    { id: 72, name: "Palapathwela Forest Reserve", location: "Central Province", description: "Important forest area with diverse habitats", category: "Other Forest Reserves" },
    { id: 73, name: "Singhapura Forest", location: "North Western Province", description: "Dry zone forest with endemic species", category: "Other Forest Reserves" },
    { id: 74, name: "Tangamalai Nature Reserve", location: "Eastern Province", description: "Important forest area with diverse ecosystem", category: "Other Forest Reserves" },
    { id: 75, name: "Udawalawe National Park", location: "Sabaragamuwa/Uva Province", description: "Forest surrounding Udawalawe reservoir", category: "Other Forest Reserves" },
    { id: 76, name: "Weerasolli Forest Reserve", location: "Eastern Province", description: "Important forest area with diverse habitats", category: "Other Forest Reserves" }
  ];

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    setFilteredForests(forestsData);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = forestsData.filter(forest => 
        forest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        forest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        forest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        forest.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredForests(filtered);
    } else {
      setFilteredForests(forestsData);
    }
  }, [searchQuery]);


  // Function to count unique categories
  const countCategories = () => {
    const categories = new Set(forestsData.map(forest => forest.category));
    return categories.size;
  }

  // Function to count UNESCO sites
  const countUNESCOSites = () => {
    return forestsData.filter(forest => 
      forest.description.includes("UNESCO") || 
      forest.name.includes("Sinharaja") || 
      forest.name.includes("Knuckles")
    ).length;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Forests</Text>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Ionicons name="person-circle" size={32} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search forests, locations, or categories..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{forestsData.length}</Text>
          <Text style={styles.statLabel}>Forests</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{countCategories()}</Text>
          <Text style={styles.statLabel}>Categories</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{countUNESCOSites()}</Text>
          <Text style={styles.statLabel}>UNESCO Sites</Text>
        </View>
      </View>

      {/* Forest Listings */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Explore Sri Lanka's Lush Forests</Text>
        
        {filteredForests.map((forest) => (
          <TouchableOpacity 
            key={forest.id} 
            style={styles.forestCard}
            onPress={() => {
            }}
          >
            <View style={styles.forestInfo}>
              <Text style={styles.forestName}>{forest.name}</Text>
              <View style={styles.forestDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="location" size={16} color="#3478F6" />
                  <Text style={styles.detailText}>{forest.location}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="leaf" size={16} color="#4CAF50" />
                  <Text style={styles.detailText}>{forest.category}</Text>
                </View>
              </View>
              {forest.description ? (
                <Text style={styles.forestDescription} numberOfLines={2}>
                  {forest.description}
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
  forestCard: {
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
  forestInfo: {
    padding: 15,
  },
  forestName: {
    fontFamily: 'outfit-bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  forestDetails: {
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
  forestDescription: {
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