// app/destinations/ancient-places/index.js

import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import Footer from '../../footer';


export default function AncientPlaces() {
  const navigation = useNavigation();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Define categories
  const categories = [
    "All",
    "Ancient Cities", 
    "Religious Sites", 
    "Engineering Marvels", 
    "Royal Residences", 
    "Rock Art", 
    "Prehistoric Sites", 
    "Sacred Mountains"
  ];

  // Define ancient places data grouped by category
  const placesData = [
    // Ancient Cities and Major Sites
    { id: 1, name: "Anuradhapura", location: "North Central Province", description: "First ancient capital (4th century BCE to 11th century CE)", category: "Ancient Cities", isPopular: true },
    { id: 2, name: "Polonnaruwa", location: "North Central Province", description: "Second ancient capital (11th-13th centuries CE)", category: "Ancient Cities", isPopular: true },
    { id: 3, name: "Sigiriya", location: "Central Province", description: "Ancient rock fortress and palace (5th century CE)", category: "Ancient Cities", isPopular: true },
    { id: 4, name: "Dambulla Cave Temple", location: "Central Province", description: "Ancient Buddhist cave complex (1st century BCE)", category: "Religious Sites", isPopular: true },
    { id: 5, name: "Kandy", location: "Central Province", description: "Last royal capital of Sri Lanka", category: "Ancient Cities", isPopular: true },
    { id: 6, name: "Yapahuwa", location: "North Western Province", description: "Medieval palace and fortress", category: "Ancient Cities" },
    { id: 7, name: "Mihintale", location: "North Central Province", description: "Birthplace of Buddhism in Sri Lanka", category: "Religious Sites", isPopular: true },
    { id: 8, name: "Tissamaharama", location: "Southern Province", description: "Ancient capital of southern Sri Lanka", category: "Ancient Cities" },
    
    // Lesser-Known Ancient Cities and Capitals
    { id: 9, name: "Panduwasnuwara", location: "North Western Province", description: "Ancient capital before Polonnaruwa", category: "Ancient Cities" },
    { id: 10, name: "Kurunegala", location: "North Western Province", description: "Brief medieval capital (13th century)", category: "Ancient Cities" },
    { id: 11, name: "Dambadeniya", location: "North Western Province", description: "Medieval capital (13th century)", category: "Ancient Cities" },
    { id: 12, name: "Gampola", location: "Central Province", description: "14th century capital", category: "Ancient Cities" },
    { id: 13, name: "Kotte", location: "Western Province", description: "15th-16th century capital", category: "Ancient Cities" },
    { id: 14, name: "Sitawaka", location: "Western Province", description: "16th century kingdom", category: "Ancient Cities" },
    { id: 15, name: "Ruhuna", location: "Southern Province", description: "Ancient kingdom in southern Sri Lanka", category: "Ancient Cities" },
    { id: 16, name: "Tambapanni", location: "North Western Province", description: "Legendary first settlement of King Vijaya", category: "Ancient Cities" },
    
    // Ancient Religious Complexes
    { id: 17, name: "Sri Maha Bodhi", location: "Anuradhapura", description: "Oldest documented tree (planted 288 BCE)", category: "Religious Sites", isPopular: true },
    { id: 18, name: "Isurumuniya", location: "North Central Province", description: "Rock temple with notable carvings", category: "Religious Sites" },
    { id: 19, name: "Aluvihara Rock Cave Temple", location: "Central Province", description: "Where Buddhist texts were first written", category: "Religious Sites" },
    { id: 20, name: "Ramba Viharaya", location: "Southern Province", description: "Ancient temple complex in southern Sri Lanka", category: "Religious Sites" },
    { id: 21, name: "Kataragama", location: "Uva Province", description: "Ancient multi-religious site", category: "Religious Sites", isPopular: true },
    { id: 22, name: "Sithulpawwa", location: "Southern Province", description: "2nd century BCE rock temple", category: "Religious Sites" },
    { id: 23, name: "Tantirimale", location: "Northern Province", description: "Ancient temple with rock-cut Buddha figures", category: "Religious Sites" },
    { id: 24, name: "Rajagala (Rassagala)", location: "Eastern Province", description: "Massive ancient Buddhist monastery complex", category: "Religious Sites" },
    { id: 25, name: "Girihadu Seya", location: "Northern Province", description: "Claimed to be the first stupa in Sri Lanka", category: "Religious Sites" },
    { id: 26, name: "Neelagiri Seya", location: "North Central Province", description: "Recently excavated ancient stupa", category: "Religious Sites" },
    
    // Hidden Gem Monasteries and Cave Temples
    { id: 27, name: "Ritigala", location: "North Central Province", description: "Mysterious forest monastery ruins", category: "Religious Sites" },
    { id: 28, name: "Pidurangala", location: "Central Province", description: "Ancient rock temple near Sigiriya", category: "Religious Sites" },
    { id: 29, name: "Dimbulagala", location: "Eastern Province", description: "Rock monastery with ancient cave inscriptions", category: "Religious Sites" },
    { id: 30, name: "Arankele", location: "North Western Province", description: "Forest monastery with walking meditation paths", category: "Religious Sites" },
    { id: 31, name: "Kaludiya Pokuna", location: "North Central Province", description: "Ancient monastery with black water pond", category: "Religious Sites" },
    { id: 32, name: "Maligawila", location: "Uva Province", description: "Site of massive Buddha statues", category: "Religious Sites" },
    { id: 33, name: "Buduruwagala", location: "Uva Province", description: "Seven Buddha figures carved into rock", category: "Rock Art" },
    { id: 34, name: "Mulkirigala", location: "Southern Province", description: "Rock temple with multiple cave levels", category: "Religious Sites" },
    
    // Ancient Engineering Marvels
    { id: 35, name: "Abhayagiri Dagoba", location: "Anuradhapura", description: "Once among world's tallest structures", category: "Engineering Marvels", isPopular: true },
    { id: 36, name: "Jetavanaramaya", location: "Anuradhapura", description: "Massive brick stupa", category: "Engineering Marvels", isPopular: true },
    { id: 37, name: "Ruwanwelisaya", location: "Anuradhapura", description: "Ancient stupa of significant religious importance", category: "Engineering Marvels", isPopular: true },
    { id: 38, name: "Lovamahapaya", location: "Anuradhapura", description: "Ancient multi-storied palace (Brazen Palace)", category: "Engineering Marvels" },
    { id: 39, name: "Kuttam Pokuna", location: "Anuradhapura", description: "Advanced ancient hydraulic systems (Twin Ponds)", category: "Engineering Marvels" },
    { id: 40, name: "Biso Kotuwa", location: "North Central Province", description: "Ancient sluice gate technology", category: "Engineering Marvels" },
    { id: 41, name: "Yoda Ela", location: "North Central Province", description: "Giant's Canal - ancient irrigation canal", category: "Engineering Marvels" },
    { id: 42, name: "Kalawewa", location: "North Central Province", description: "Massive ancient reservoir", category: "Engineering Marvels" },
    { id: 43, name: "Parakrama Samudra", location: "Polonnaruwa", description: "Ancient man-made reservoir", category: "Engineering Marvels", isPopular: true },
    
    // Ancient Rock Carvings and Art Sites
    { id: 44, name: "Avukana Buddha", location: "North Central Province", description: "12-meter standing Buddha statue", category: "Rock Art", isPopular: true },
    { id: 45, name: "Gal Vihara", location: "Polonnaruwa", description: "Four Buddha images carved from single rock face", category: "Rock Art", isPopular: true },
    { id: 46, name: "Lankathilaka Image House", location: "Polonnaruwa", description: "Massive brick-built shrine", category: "Religious Sites" },
    { id: 47, name: "Tivanka Image House", location: "Polonnaruwa", description: "Temple with unique bent Buddha statue", category: "Religious Sites" },
    { id: 48, name: "Reswehera", location: "North Western Province", description: "Rock carved site with Buddha statues", category: "Rock Art" },
    { id: 49, name: "Aukana Buddha Statue", location: "North Central Province", description: "Large standing Buddha statue", category: "Rock Art" },
    { id: 50, name: "Dova Rock Temple", location: "Southern Province", description: "Ancient rock carvings", category: "Rock Art" },
    { id: 51, name: "Pulligoda Galge", location: "Eastern Province", description: "Cave with rare paintings using yellow pigment", category: "Rock Art" },
    
    // Ancient Royal Residences and Pleasure Gardens
    { id: 52, name: "Sigiriya Royal Gardens", location: "Central Province", description: "One of the oldest landscaped gardens", category: "Royal Residences", isPopular: true },
    { id: 53, name: "Kumara Pokuna", location: "Polonnaruwa", description: "Royal bathing pool", category: "Royal Residences" },
    { id: 54, name: "Royal Palace of Polonnaruwa", location: "Polonnaruwa", description: "King Parakramabahu's palace", category: "Royal Residences", isPopular: true },
    { id: 55, name: "Alahana Pirivena", location: "Polonnaruwa", description: "Royal monastery complex", category: "Royal Residences" },
    { id: 56, name: "Vessagiriya", location: "Anuradhapura", description: "Ancient monastic complex and royal retreat", category: "Royal Residences" },
    { id: 57, name: "Ranmasu Uyana", location: "Anuradhapura", description: "Ancient royal pleasure garden with mysterious markings", category: "Royal Residences" },
    
    // Prehistoric and Early Settlement Sites
    { id: 58, name: "Fa-Hien Cave", location: "Western Province", description: "Evidence of prehistoric humans (Pahiyangala)", category: "Prehistoric Sites" },
    { id: 59, name: "Bellan-Bandi Palassa", location: "Uva Province", description: "Mesolithic site", category: "Prehistoric Sites" },
    { id: 60, name: "Ibbankatuwa Megalithic Tombs", location: "Central Province", description: "Ancient burial site", category: "Prehistoric Sites" },
    { id: 61, name: "Pomparippu", location: "North Western Province", description: "Bronze Age settlement", category: "Prehistoric Sites" },
    { id: 62, name: "Pathirajawela", location: "Southern Province", description: "Early Iron Age site", category: "Prehistoric Sites" },
    { id: 63, name: "Anuradhapura Citadel", location: "North Central Province", description: "Early urban settlement", category: "Ancient Cities" },
    
    // Sacred Mountain Sites
    { id: 64, name: "Sri Pada (Adam's Peak)", location: "Central Province", description: "Ancient pilgrimage mountain", category: "Sacred Mountains", isPopular: true },
    { id: 65, name: "Mihintale Sacred Mountain", location: "North Central Province", description: "Where Buddhism was introduced", category: "Sacred Mountains", isPopular: true },
    { id: 66, name: "Dolukanda", location: "North Western Province", description: "Mountain with ancient ruins", category: "Sacred Mountains" },
    { id: 67, name: "Kokebe", location: "North Central Province", description: "Mountain with ancient monastery ruins", category: "Sacred Mountains" },
    { id: 68, name: "Dimbulagala", location: "Eastern Province", description: "Sacred mountain range with ancient monastery", category: "Sacred Mountains" },
    
    // Mysterious and Enigmatic Sites
    { id: 69, name: "Stargate of Ranmasu Uyana", location: "Anuradhapura", description: "Mysterious carved star map", category: "Rock Art" },
    { id: 70, name: "Wahalkada Stone Pillars", location: "Northern Province", description: "Mysterious ancient columns", category: "Engineering Marvels" },
    { id: 71, name: "Dorawaka-kanda", location: "Central Province", description: "Rock with mysterious carved channels", category: "Rock Art" },
    { id: 72, name: "Werapokuna", location: "North Central Province", description: "Cave complex with inscriptions and carvings", category: "Rock Art" },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    setFilteredPlaces(placesData);
  }, []);

  useEffect(() => {
    let filtered = placesData;
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(place => 
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(place => place.category === selectedCategory);
    }
    
    setFilteredPlaces(filtered);
  }, [searchQuery, selectedCategory]);

  // Function to count UNESCO sites
  const countUNESCOSites = () => {
    return 3; // Anuradhapura, Polonnaruwa, Sigiriya
  }

  // Function to count popular sites
  const countPopularSites = () => {
    return placesData.filter(place => place.isPopular).length;
  }

  // Function to get icon based on category
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Ancient Cities':
        return <MaterialIcons name="location-city" size={16} color="#9C27B0" />;
      case 'Religious Sites':
        return <FontAwesome5 name="dharmachakra" size={16} color="#FF9800" />;
      case 'Engineering Marvels':
        return <MaterialIcons name="architecture" size={16} color="#795548" />;
      case 'Royal Residences':
        return <FontAwesome5 name="crown" size={14} color="#FFC107" />;
      case 'Rock Art':
        return <FontAwesome5 name="monument" size={16} color="#607D8B" />;
      case 'Prehistoric Sites':
        return <FontAwesome5 name="bone" size={16} color="#8BC34A" />;
      case 'Sacred Mountains':
        return <FontAwesome5 name="mountain" size={16} color="#4CAF50" />;
      default:
        return <Ionicons name="location" size={16} color="#3478F6" />;
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ancient Places</Text>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Ionicons name="person-circle" size={32} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search places, locations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{placesData.length}</Text>
          <Text style={styles.statLabel}>Sites</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{countUNESCOSites()}</Text>
          <Text style={styles.statLabel}>UNESCO</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{countPopularSites()}</Text>
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

      {/* Ancient Places Listings */}
      <ScrollView 
        style={styles.contentContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentInnerContainer}
      >
        <Text style={styles.sectionTitle}>Explore Sri Lanka's Rich Heritage</Text>
        
        {filteredPlaces.map((place) => (
          <TouchableOpacity 
            key={place.id} 
            style={styles.placeCard}
            onPress={() => {
              // Navigate to individual place detail page (to be implemented)
              console.log(`Clicked on ${place.name}`);
            }}
          >
            <View style={styles.placeInfo}>
              {place.isPopular && <View style={styles.popularBadge}><Text style={styles.popularText}>Popular</Text></View>}
              <Text style={styles.placeName}>{place.name}</Text>
              <View style={styles.placeDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="location" size={16} color="#3478F6" />
                  <Text style={styles.detailText}>{place.location}</Text>
                </View>
                <View style={styles.detailRow}>
                  {getCategoryIcon(place.category)}
                  <Text style={styles.detailText}>{place.category}</Text>
                </View>
              </View>
              {place.description ? (
                <Text style={styles.placeDescription} numberOfLines={2}>
                  {place.description}
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
    marginBottom: 14, // Increased from 2 to 8 for better spacing
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
    backgroundColor: '#3478F6',
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
  placeCard: {
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
  placeInfo: {
    padding: 14,
    paddingTop: 12,
  },
  popularBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  popularText: {
    color: 'white',
    fontFamily: 'outfit',
    fontSize: 10,
  },
  placeName: {
    fontFamily: 'outfit-bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    paddingRight: 60, // Space for the popular badge
  },
  placeDetails: {
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
  placeDescription: {
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