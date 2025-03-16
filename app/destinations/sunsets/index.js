import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Sunsets() {
  const navigation = useNavigation();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSunsets, setFilteredSunsets] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  // Define sunset data from the comprehensive list
  const sunsetsData = [
    // Beach Sunset Locations - Western Coast
    { id: 1, name: "Negombo Beach", location: "Western Coast", category: "Beach", description: "Wide sandy beach with palm trees silhouetted against orange skies" },
    { id: 2, name: "Mount Lavinia Beach", location: "Western Coast", category: "Beach", description: "Popular sunset spot near Colombo with views of fishing boats" },
    { id: 3, name: "Bentota Beach", location: "Western Coast", category: "Beach", description: "Luxury resorts offering sunset views over the Indian Ocean" },
    { id: 4, name: "Hikkaduwa Beach", location: "Western Coast", category: "Beach", description: "Famous for sunsets with surfers in the foreground" },
    { id: 5, name: "Galle Face Green", location: "Western Coast", category: "Beach", description: "Urban sunset spot in Colombo with food vendors and crowds" },
    { id: 6, name: "Beruwala Beach", location: "Western Coast", category: "Beach", description: "Golden sunsets near the lighthouse point" },
    { id: 7, name: "Induruwa Beach", location: "Western Coast", category: "Beach", description: "Quiet beach with uninterrupted sunset views" },
    { id: 8, name: "Kalutara Beach", location: "Western Coast", category: "Beach", description: "Sunsets near the Kalutara Temple and river mouth" },
    
    // Beach Sunset Locations - Southern Coast
    { id: 9, name: "Unawatuna Beach", location: "Southern Coast", category: "Beach", description: "Sunset views from Jungle Beach or the main beach" },
    { id: 10, name: "Mirissa Beach", location: "Southern Coast", category: "Beach", description: "Iconic sunset views from Parrot Rock" },
    { id: 11, name: "Tangalle Beach", location: "Southern Coast", category: "Beach", description: "Dramatic rock formations silhouetted at sunset" },
    { id: 12, name: "Weligama Bay", location: "Southern Coast", category: "Beach", description: "Wide bay with fishing catamarans coming home at sunset" },
    { id: 13, name: "Koggala Beach", location: "Southern Coast", category: "Beach", description: "Famous for stilt fishermen silhouettes during sunset" },
    { id: 14, name: "Dickwella Beach", location: "Southern Coast", category: "Beach", description: "Sunset views from Hiriketiya Bay" },
    { id: 15, name: "Polhena Beach", location: "Southern Coast", category: "Beach", description: "Quiet sunset spot in Matara" },
    { id: 16, name: "Goyambokka Beach", location: "Southern Coast", category: "Beach", description: "Secluded cove with intimate sunset setting" },
    
    // Beach Sunset Locations - Eastern Coast
    { id: 17, name: "Arugam Bay", location: "Eastern Coast", category: "Beach", description: "Sunset views over the lagoon (as beach faces east)" },
    { id: 18, name: "Pasikudah Bay", location: "Eastern Coast", category: "Beach", description: "Colorful skies at sunset (though facing east)" },
    { id: 19, name: "Uppuveli Beach", location: "Eastern Coast", category: "Beach", description: "Evening glows after sunset" },
    { id: 20, name: "Nilaveli Beach", location: "Eastern Coast", category: "Beach", description: "Sunset views from Pigeon Island lookout" },
    { id: 21, name: "Trincomalee Harbor", location: "Eastern Coast", category: "Beach", description: "Sunset views over the natural harbor" },
    { id: 22, name: "Marble Beach", location: "Eastern Coast", category: "Beach", description: "Secluded bay with evening colors" },
    
    // Beach Sunset Locations - Northern Coast
    { id: 23, name: "Casuarina Beach", location: "Northern Coast", category: "Beach", description: "Pristine sunset views in Jaffna" },
    { id: 24, name: "Mannar Island", location: "Northern Coast", category: "Beach", description: "Spectacular sunsets near Adam's Bridge" },
    { id: 25, name: "Kankesanthurai Beach", location: "Northern Coast", category: "Beach", description: "Northernmost sunset views" },
    { id: 26, name: "Delft Island Beaches", location: "Northern Coast", category: "Beach", description: "Remote and pristine sunset location" },
    { id: 27, name: "Talaimannar", location: "Northern Coast", category: "Beach", description: "Sunset views towards India across Palk Strait" },
    
    // Mountain & Highland Sunset Views - Central Highlands
    { id: 28, name: "Lipton's Seat", location: "Central Highlands", category: "Mountain", description: "Tea plantation sunset views in Haputale" },
    { id: 29, name: "World's End, Horton Plains", location: "Central Highlands", category: "Mountain", description: "Dramatic cliff with sunset views (park closes at 6pm)" },
    { id: 30, name: "Little Adam's Peak", location: "Central Highlands", category: "Mountain", description: "Easy hike with sunset views over Ella Gap" },
    { id: 31, name: "Ella Rock", location: "Central Highlands", category: "Mountain", description: "Panoramic sunset views over southern Sri Lanka" },
    { id: 32, name: "Hanthana Mountain Range", location: "Central Highlands", category: "Mountain", description: "Sunset views near Kandy" },
    { id: 33, name: "Knuckles Mountain Range", location: "Central Highlands", category: "Mountain", description: "Various viewpoints for sunset" },
    { id: 34, name: "Bible Rock (Bathalegala)", location: "Central Highlands", category: "Mountain", description: "Distinctive rock formation with sunset views" },
    { id: 35, name: "Pidurutalagala", location: "Central Highlands", category: "Mountain", description: "Highest point in Sri Lanka with sunset views (permit required)" },
    { id: 36, name: "Riverston", location: "Central Highlands", category: "Mountain", description: "Twin peaks with sunset viewing" },
    
    // Mountain & Highland Sunset Views - Hill Stations
    { id: 37, name: "Nuwara Eliya Golf Course", location: "Hill Stations", category: "Mountain", description: "Evening views over the course and mountains" },
    { id: 38, name: "Haputale Town Viewpoint", location: "Hill Stations", category: "Mountain", description: "Street viewpoints with mountain sunset views" },
    { id: 39, name: "Bandarawela Hotel", location: "Hill Stations", category: "Mountain", description: "Historic hotel with veranda sunset views" },
    { id: 40, name: "Ambuluwawa Tower", location: "Hill Stations", category: "Mountain", description: "Multi-religious tower with 360° sunset views" },
    { id: 41, name: "Rahala Mountain Resort", location: "Hill Stations", category: "Mountain", description: "Viewpoint near Kandy" },
    { id: 42, name: "98 Acres Resort", location: "Hill Stations", category: "Mountain", description: "Luxury resort with perfect sunset viewing terraces in Ella" },
    { id: 43, name: "Ella Gap Viewpoint", location: "Hill Stations", category: "Mountain", description: "Famous street viewpoint in Ella town" },
    { id: 44, name: "Pattipola", location: "Hill Stations", category: "Mountain", description: "Highest railway station with evening mountain views" },
    { id: 45, name: "Idalgashinna", location: "Hill Stations", category: "Mountain", description: "Remote mountain railway sunset views" },
    
    // Sacred Mountains & Sunset Pilgrimage Spots
    { id: 46, name: "Adam's Peak (Sri Pada)", location: "Sacred Sites", category: "Mountain", description: "Sacred mountain with spectacular sunset and sunrise" },
    { id: 47, name: "Mihintale", location: "Sacred Sites", category: "Mountain", description: "Buddhist sacred site with sunset views from the stupa" },
    { id: 48, name: "Sigiriya (Lion Rock)", location: "Sacred Sites", category: "Mountain", description: "Ancient rock fortress with evening views" },
    { id: 49, name: "Pidurangala Rock", location: "Sacred Sites", category: "Mountain", description: "Perfect spot to watch sunset over Sigiriya" },
    { id: 50, name: "Aradhana Gala", location: "Sacred Sites", category: "Mountain", description: "Sunset views at Mihintale" },
    { id: 51, name: "Dambulla Cave Temple", location: "Sacred Sites", category: "Mountain", description: "Viewpoint near the caves" },
    { id: 52, name: "Aluviharaya Rock Temple", location: "Sacred Sites", category: "Mountain", description: "Evening atmosphere at cliffside temple" },
    
    // Cultural & Urban Sunset Spots - Ancient Cities
    { id: 53, name: "Polonnaruwa Lake", location: "Ancient Cities", category: "Cultural", description: "Ancient city lake with sunset reflections" },
    { id: 54, name: "Tissa Wewa", location: "Ancient Cities", category: "Cultural", description: "Lake in Tissamaharama with sunset views" },
    { id: 55, name: "Anuradhapura Sacred City", location: "Ancient Cities", category: "Cultural", description: "Various lakes and dagobas for sunset" },
    { id: 56, name: "Yapahuwa Rock Fortress", location: "Ancient Cities", category: "Cultural", description: "Ancient stairs leading to sunset views" },
    { id: 57, name: "Kalamatiya Bird Sanctuary", location: "Ancient Cities", category: "Cultural", description: "Sunset over wetlands and ancient lands" },
    { id: 58, name: "Kataragama Sacred Precinct", location: "Ancient Cities", category: "Cultural", description: "Evening prayers and sunset" },
    { id: 59, name: "Kandy Lake", location: "Ancient Cities", category: "Cultural", description: "Urban lake with mountain backdrop at sunset" },
    { id: 60, name: "Minneriya Tank", location: "Ancient Cities", category: "Cultural", description: "Ancient reservoir with elephants at sunset" },
    
    // Cultural & Urban Sunset Spots - Modern Urban
    { id: 61, name: "Colombo Lotus Tower", location: "Urban Viewpoints", category: "Cultural", description: "Tallest structure in South Asia with sunset viewing deck" },
    { id: 62, name: "One Galle Face Mall", location: "Urban Viewpoints", category: "Cultural", description: "Rooftop sunset views over Colombo harbor" },
    { id: 63, name: "Cinnamon Red Rooftop", location: "Urban Viewpoints", category: "Cultural", description: "Urban hotel with sunset views over Colombo" },
    { id: 64, name: "Sky Lounge, Kingsbury Hotel", location: "Urban Viewpoints", category: "Cultural", description: "Colombo waterfront sunset spot" },
    { id: 65, name: "Diyatha Uyana", location: "Urban Viewpoints", category: "Cultural", description: "Park in Colombo with sunset over Diyawanna Lake" },
    { id: 66, name: "Independence Square", location: "Urban Viewpoints", category: "Cultural", description: "Evening atmosphere at national monument" },
    { id: 67, name: "Gangaramaya Temple View", location: "Urban Viewpoints", category: "Cultural", description: "Beira Lake views at sunset" },
    { id: 68, name: "Altitude Lounge, Colombo", location: "Urban Viewpoints", category: "Cultural", description: "Rooftop bar with sunset viewing" },
    
    // Special Landscape Sunset Experiences - Lakes & Reservoirs
    { id: 69, name: "Gregory Lake, Nuwara Eliya", location: "Lakes & Reservoirs", category: "Landscape", description: "Lake sunset with mountain backdrop" },
    { id: 70, name: "Castlereagh Reservoir", location: "Lakes & Reservoirs", category: "Landscape", description: "Scenic dam with sunset reflections" },
    { id: 71, name: "Maskeliya Reservoir", location: "Lakes & Reservoirs", category: "Landscape", description: "Views of Adam's Peak at sunset" },
    { id: 72, name: "Victoria Reservoir", location: "Lakes & Reservoirs", category: "Landscape", description: "Large dam with mountain backdrop at sunset" },
    { id: 73, name: "Randenigala Reservoir", location: "Lakes & Reservoirs", category: "Landscape", description: "Remote lake with pristine sunset views" },
    { id: 74, name: "Udawalawe Reservoir", location: "Lakes & Reservoirs", category: "Landscape", description: "Evening elephant viewing at water's edge" },
    { id: 75, name: "Sorabora Lake", location: "Lakes & Reservoirs", category: "Landscape", description: "Ancient reservoir with historical atmosphere at sunset" },
    { id: 76, name: "Ulhitiya Reservoir", location: "Lakes & Reservoirs", category: "Landscape", description: "Off-the-beaten-path sunset views" },
    
    // Special Landscape Sunset Experiences - Wildlife & Nature
    { id: 77, name: "Kumana National Park", location: "Wildlife & Nature", category: "Landscape", description: "Sunset over wetlands with birds returning to roost" },
    { id: 78, name: "Yala National Park", location: "Wildlife & Nature", category: "Landscape", description: "Sunset safari with wildlife silhouettes" },
    { id: 79, name: "Bundala National Park", location: "Wildlife & Nature", category: "Landscape", description: "Coastal sunset over lagoons with flamingos" },
    { id: 80, name: "Wilpattu National Park", location: "Wildlife & Nature", category: "Landscape", description: "Sunset over natural lakes (villus)" },
    { id: 81, name: "Horton Plains", location: "Wildlife & Nature", category: "Landscape", description: "High altitude plains with unique evening light" },
    { id: 82, name: "Wasgamuwa National Park", location: "Wildlife & Nature", category: "Landscape", description: "Riverside sunset with elephant herds" },
    { id: 83, name: "Minneriya National Park", location: "Wildlife & Nature", category: "Landscape", description: "Famous for \"The Gathering\" of elephants at sunset" },
    { id: 84, name: "Kaudulla National Park", location: "Wildlife & Nature", category: "Landscape", description: "Open grasslands with elephants at sunset" },
    
    // Special Landscape Sunset Experiences - Rivers & Waterfalls
    { id: 85, name: "Mahaweli River View, Kandy", location: "Rivers & Waterfalls", category: "Landscape", description: "Riverside sunset views" },
    { id: 86, name: "Victoria Falls Viewpoint", location: "Rivers & Waterfalls", category: "Landscape", description: "Sunset at Sri Lanka's widest waterfall" },
    { id: 87, name: "Bambarakanda Falls", location: "Rivers & Waterfalls", category: "Landscape", description: "Evening light at Sri Lanka's highest waterfall" },
    { id: 88, name: "Kaluganga River Mouth", location: "Rivers & Waterfalls", category: "Landscape", description: "Where river meets sea at sunset" },
    { id: 89, name: "Bentota River Cruise", location: "Rivers & Waterfalls", category: "Landscape", description: "Evening boat rides with sunset views" },
    { id: 90, name: "Madu River", location: "Rivers & Waterfalls", category: "Landscape", description: "Sunset boat safaris through mangroves" },
    { id: 91, name: "Deduru Oya Reservoir", location: "Rivers & Waterfalls", category: "Landscape", description: "Sunset from the dam" },
    { id: 92, name: "Lunugamvehera Reservoir", location: "Rivers & Waterfalls", category: "Landscape", description: "Sunset over the water between national parks" },
    
    // Unique & Special Sunset Experiences - Train Journeys
    { id: 93, name: "Ella to Haputale Train", location: "Train Journeys", category: "Special", description: "Famous railway sunset views" },
    { id: 94, name: "Coastal Line (Colombo to Galle)", location: "Train Journeys", category: "Special", description: "Ocean sunset from moving train" },
    { id: 95, name: "Polgahawela to Kandy Train", location: "Train Journeys", category: "Special", description: "Mountain sunset views" },
    { id: 96, name: "Nanu Oya to Ella Train", location: "Train Journeys", category: "Special", description: "Highland sunset from scenic railway" },
    { id: 97, name: "Batticaloa Line", location: "Train Journeys", category: "Special", description: "Eastern sunset views over paddy fields" },
    
    // Unique & Special Sunset Experiences - Boat & Water
    { id: 98, name: "Sunset Sailing, Mirissa", location: "Boat & Water", category: "Special", description: "Ocean sunset on sailing catamarans" },
    { id: 99, name: "Negombo Lagoon Boat Tour", location: "Boat & Water", category: "Special", description: "Sunset through mangroves" },
    { id: 100, name: "Dutch Canal Boat Trip", location: "Boat & Water", category: "Special", description: "Colonial waterway sunset cruise" },
    { id: 101, name: "Whale Watching Sunset Return, Mirissa", location: "Boat & Water", category: "Special", description: "Late afternoon whale tours" },
    { id: 102, name: "Koggala Lake Boat Safari", location: "Boat & Water", category: "Special", description: "Sunset views of island temples and birds" },
    { id: 103, name: "Ahangama Traditional Fishing Dhow", location: "Boat & Water", category: "Special", description: "Evening fishing experience" },
    { id: 104, name: "Batticaloa Lagoon", location: "Boat & Water", category: "Special", description: "Sunset boat ride in the \"singing fish\" lagoon" },
    { id: 105, name: "Jaffna Islands Boat Tour", location: "Boat & Water", category: "Special", description: "Northern island sunset experience" },
    
    // Remote & Less-Known Sunset Spots
    { id: 106, name: "Mannar Salt Pans", location: "Remote Spots", category: "Special", description: "Reflective sunset over salt evaporation ponds" },
    { id: 107, name: "Jaffna Lagoon Viewpoints", location: "Remote Spots", category: "Special", description: "Northern water sunset views" },
    { id: 108, name: "Trincomalee War Cemetery", location: "Remote Spots", category: "Special", description: "Peaceful sunset over historic site" },
    { id: 109, name: "Panama Beach", location: "Remote Spots", category: "Special", description: "Remote eastern sunset spot" },
    { id: 110, name: "Monaragala Hill", location: "Remote Spots", category: "Special", description: "Countryside sunset from hilltop" },
    { id: 111, name: "Ampara Rice Fields", location: "Remote Spots", category: "Special", description: "Sunset over eastern agricultural landscapes" },
    { id: 112, name: "Puttalam Lagoon", location: "Remote Spots", category: "Special", description: "Northwestern coastal sunset" },
    { id: 113, name: "Wanathavilluwa", location: "Remote Spots", category: "Special", description: "Remote northwestern sunset landscapes" },
    { id: 114, name: "Mullaitivu Beaches", location: "Remote Spots", category: "Special", description: "Developing northern areas with pristine sunsets" },
    { id: 115, name: "Knuckles Cloud Forest", location: "Remote Spots", category: "Special", description: "Atmospheric sunset through misty mountains" },
    { id: 116, name: "Maduru Oya National Park", location: "Remote Spots", category: "Special", description: "Remote sunset over ancient lands" },
    { id: 117, name: "Laggala-Pallegama", location: "Remote Spots", category: "Special", description: "Hidden mountain sunset views" },
    { id: 118, name: "Senanayake Samudra", location: "Remote Spots", category: "Special", description: "Largest reservoir with sunset reflections" },
    { id: 119, name: "Lahugala Tank", location: "Remote Spots", category: "Special", description: "Ancient tank with elephants at sunset" },
    { id: 120, name: "Ritigala Mountain", location: "Remote Spots", category: "Special", description: "Mysterious ancient ruins at sunset" }
  ];

  const categories = ['All', 'Beach', 'Mountain', 'Cultural', 'Landscape', 'Special'];

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    setFilteredSunsets(sunsetsData);
  }, []);

  useEffect(() => {
    let filtered = sunsetsData;
    
    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(sunset => sunset.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(sunset => 
        sunset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sunset.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sunset.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredSunsets(filtered);
  }, [searchQuery, activeCategory]);

  const navigateToHome = () => {
    router.push('/home');
  }

  const navigateToItinerary = () => {
    router.push('/trip-itinerary');
  }

  const navigateToRecentTrips = () => {
    router.push('/recent-trips');
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sunset Spots</Text>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Ionicons name="person-circle" size={32} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search sunset locations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category bar with fixed height */}
      <View style={styles.categoryView}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoryContainer}
          contentContainerStyle={styles.categoryContent}
        >
          {categories.map((category) => (
            <TouchableOpacity 
              key={category} 
              style={[
                styles.categoryButton, 
                activeCategory === category && styles.activeCategoryButton
              ]}
              onPress={() => setActiveCategory(category)}
            >
              <Text 
                style={[
                  styles.categoryText, 
                  activeCategory === category && styles.activeCategoryText
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Stats Section - Immediately below categories */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{sunsetsData.length}</Text>
          <Text style={styles.statLabel}>Locations</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Categories</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>27</Text>
          <Text style={styles.statLabel}>Beach Spots</Text>
        </View>
      </View>

      {/* Content scroll - includes title and cards */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>
          {activeCategory === 'All' 
            ? 'Explore Sri Lanka\'s Beautiful Sunset Spots' 
            : `${activeCategory} Sunset Locations`}
        </Text>
        
        {filteredSunsets.map((sunset) => (
          <TouchableOpacity 
            key={sunset.id} 
            style={styles.sunsetCard}
            onPress={() => {
              // Navigate to individual sunset detail page (to be implemented)
              console.log(`Clicked on ${sunset.name}`);
            }}
          >
            <View style={styles.sunsetInfo}>
              <Text style={styles.sunsetName}>{sunset.name}</Text>
              <View style={styles.categoryTag}>
                <Text style={styles.categoryTagText}>{sunset.category}</Text>
              </View>
              <View style={styles.sunsetDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="location" size={16} color="#FF7F50" />
                  <Text style={styles.detailText}>{sunset.location}</Text>
                </View>
              </View>
              {sunset.description ? (
                <Text style={styles.sunsetDescription} numberOfLines={2}>
                  {sunset.description}
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
  );
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
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    marginHorizontal: 20,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#666',
    height: 24,
  },
  categoryView: { 
    height: 30,
  },
  categoryContainer: {
    paddingHorizontal: 15,
    height: 30,
  },
  categoryContent: {
    paddingRight: 10,
    height: 30,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 3,
    borderRadius: 15,
    marginRight: 8,
    backgroundColor: '#E8E8E8',
    height: 30,
    justifyContent: 'center',
  },
  activeCategoryButton: {
    backgroundColor: '#FF7F50',
  },
  categoryText: {
    fontFamily: 'outfit-medium',
    fontSize: 13,
    color: '#555',
    lineHeight: 13,
  },
  activeCategoryText: {
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 12,
  },
  statItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statValue: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
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
    marginBottom: 12,
  },
  sunsetCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation:2,
},
sunsetInfo: {
  padding: 16,
  position: 'relative',
},
sunsetName: {
  fontFamily: 'outfit-bold',
  fontSize: 18,
  color: '#333',
  marginBottom: 6,
  paddingRight: 70,
},
categoryTag: {
  position: 'absolute',
  right: 16,
  top: 16,
  backgroundColor: '#FFDAB9',
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 20,
},
categoryTagText: {
  fontFamily: 'outfit',
  fontSize: 12,
  color: '#FF7F50',
},
sunsetDetails: {
  flexDirection: 'row',
  marginBottom: 8,
  flexWrap: 'wrap',
  alignItems: 'center',
},
detailRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 15,
  marginBottom: 4,
},
detailText: {
  fontFamily: 'outfit',
  fontSize: 14,
  color: '#666',
  marginLeft: 4,
},
sunsetDescription: {
  fontFamily: 'outfit',
  fontSize: 14,
  color: '#777',
  lineHeight: 20,
  marginTop: 2,
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



