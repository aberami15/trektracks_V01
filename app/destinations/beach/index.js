// Create this file at app/beaches/index.js

import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import Footer from '../../footer'


export default function Beach() {
  const navigation = useNavigation();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBeaches, setFilteredBeaches] = useState([]);
  

  // Define beach data from the comprehensive list
  const beachesData = [
    { id: 1, name: "Kalpitiya Beach", location: "Kalpitiya Peninsula", description: "Known for kitesurfing and dolphin watching" },
    { id: 2, name: "Alankuda Beach", location: "Kalpitiya Peninsula", description: "Pristine beach in the Kalpitiya Peninsula" },
    { id: 3, name: "Kudawa Beach", location: "Kalpitiya", description: "Fishing village beach" },
    { id: 4, name: "Dutch Bay Beach", location: "Kalpitiya", description: "Historic area with colonial influences" },
    { id: 5, name: "Palavi Beach", location: "Puttalam", description: "Near Puttalam town" },
    { id: 6, name: "Negombo Beach", location: "Negombo", description: "Popular beach close to the international airport" },
    { id: 7, name: "Lewis Place Beach", location: "Negombo", description: "Northern section of Negombo" },
    { id: 8, name: "Brown's Beach", location: "Negombo", description: "Central Negombo beach area" },
    { id: 9, name: "Dungalpitiya Beach", location: "Negombo", description: "Quiet beach north of Negombo" },
    { id: 10, name: "Waikkal Beach", location: "Between Negombo and Chilaw", description: "Peaceful beach area" },
    { id: 11, name: "Uswetakeiyawa Beach", location: "Western Province", description: "Between Negombo and Colombo" },
    { id: 12, name: "Mount Lavinia Beach", location: "Colombo", description: "Famous urban beach in Colombo suburbs" },
    { id: 13, name: "Wellawatte Beach", location: "Colombo", description: "City beach in Colombo" },
    { id: 14, name: "Dehiwala Beach", location: "Colombo", description: "Urban beach south of Colombo city" },
    { id: 15, name: "Galle Face Green Beach", location: "Colombo", description: "Small beach strip in central Colombo" },
    { id: 16, name: "Kalutara Beach", location: "Kalutara", description: "Long stretch of beach near Kalutara town" },
    { id: 17, name: "Wadduwa Beach", location: "Western Province", description: "Quiet beach town south of Colombo" },
    { id: 18, name: "Beruwala Beach", location: "Western Province", description: "Gateway to the southern beach destinations" },
    { id: 19, name: "Moragalla Beach", location: "Beruwala", description: "Northern end of Beruwala" },
    { id: 20, name: "Maggona Beach", location: "Western Province", description: "Small fishing village beach" },
    { id: 21, name: "Bentota Beach", location: "Southern Province", description: "Prominent tourist destination known for water sports" },
    { id: 22, name: "Paradise Island Beach", location: "Bentota", description: "Part of Bentota beach strip" },
    { id: 23, name: "Ventura Beach", location: "Bentota", description: "Southern end of Bentota" },
    { id: 24, name: "Induruwa Beach", location: "Southern Province", description: "Quiet beach south of Bentota" },
    { id: 25, name: "Balapitiya Beach", location: "Southern Province", description: "Known for river safaris and nearby attractions" },
    { id: 26, name: "Kosgoda Beach", location: "Southern Province", description: "Famous for its turtle hatcheries" },
    { id: 27, name: "Ambalangoda Beach", location: "Southern Province", description: "Known for traditional mask making and fishing" },
    { id: 28, name: "Akurala Beach", location: "Southern Province", description: "Small beach between Kosgoda and Hikkaduwa" },
    { id: 29, name: "Hikkaduwa Beach", location: "Southern Province", description: "Famous for surfing, coral reefs and beach parties" },
    { id: 30, name: "Narigama Beach", location: "Hikkaduwa", description: "Northern section of Hikkaduwa" },
    { id: 31, name: "Thiranagama Beach", location: "Hikkaduwa", description: "Part of greater Hikkaduwa beach area" },
    { id: 32, name: "Dodanduwa Beach", location: "Southern Province", description: "Small beach town south of Hikkaduwa" },
    { id: 33, name: "Boossa Beach", location: "Southern Province", description: "Quiet beach between Hikkaduwa and Galle" },
    { id: 34, name: "Galle Beach", location: "Galle", description: "Small beach near the historic Galle Fort" },
    { id: 35, name: "Unawatuna Beach", location: "Galle", description: "Popular crescent-shaped beach south of Galle" },
    { id: 36, name: "Thalpe Beach", location: "Southern Province", description: "Upscale beach area with boutique hotels" },
    { id: 37, name: "Dalawella Beach", location: "Southern Province", description: "Known for the famous palm tree rope swing" },
    { id: 38, name: "Mihiripenna Beach", location: "Southern Province", description: "Quiet beach between Unawatuna and Koggala" },
    { id: 39, name: "Jungle Beach", location: "Unawatuna", description: "Secluded beach near Unawatuna, requires a short hike" },
    { id: 40, name: "Koggala Beach", location: "Southern Province", description: "Long stretch of beach known for stilt fishermen" },
    { id: 41, name: "Kabalana Beach", location: "Southern Province", description: "Popular surf point also called \"The Rock\"" },
    { id: 42, name: "Ahangama Beach", location: "Southern Province", description: "Surf destination with traditional fishing culture" },
    { id: 43, name: "Midigama Beach", location: "Southern Province", description: "Known for multiple surf breaks" },
    { id: 44, name: "Weligama Bay", location: "Southern Province", description: "Wide bay beach famous for beginner surfing" },
    { id: 45, name: "Mirissa Beach", location: "Southern Province", description: "Popular beach known for whale watching" },
    { id: 46, name: "Polhena Beach", location: "Matara", description: "Natural protected swimming area in Matara" },
    { id: 47, name: "Madiha Beach", location: "Southern Province", description: "Small beach town between Mirissa and Matara" },
    { id: 48, name: "Dondra Beach", location: "Southern Province", description: "Southernmost point of Sri Lanka" },
    { id: 49, name: "Matara Beach", location: "Matara", description: "Urban beach near Matara Fort" },
    { id: 50, name: "Mawella Beach", location: "Southern Province", description: "Less crowded beach near Dickwella" },
    { id: 51, name: "Hiriketiya Beach", location: "Southern Province", description: "Horseshoe-shaped bay popular with surfers" },
    { id: 52, name: "Dickwella Beach", location: "Southern Province", description: "Long beach on the southern coast" },
    { id: 53, name: "Tangalle Beach", location: "Southern Province", description: "Large beach area in southern Sri Lanka" },
    { id: 54, name: "Medaketiya Beach", location: "Tangalle", description: "Main beach in Tangalle town" },
    { id: 55, name: "Goyambokka Beach", location: "Southern Province", description: "Small scenic cove near Tangalle" },
    { id: 56, name: "Amanwella Beach", location: "Southern Province", description: "Secluded luxury beach area" },
    { id: 57, name: "Seenimodera Beach", location: "Southern Province", description: "Also known as \"Silent Beach\"" },
    { id: 58, name: "Rekawa Beach", location: "Southern Province", description: "Famous for turtle nesting" },
    { id: 59, name: "Hambantota Beach", location: "Hambantota", description: "Beach near the southern port city" },
    { id: 60, name: "Kalametiya Beach", location: "Southern Province", description: "Near bird sanctuary" },
    { id: 61, name: "Bundala Beach", location: "Southern Province", description: "Adjacent to Bundala National Park" },
    { id: 62, name: "Palatupana Beach", location: "Southern Province", description: "Near the entrance to Yala National Park" },
    { id: 63, name: "Pottuvil Point", location: "Eastern Province", description: "Beginning of Arugam Bay area" },
    { id: 64, name: "Arugam Bay", location: "Eastern Province", description: "Internationally renowned surf destination" },
    { id: 65, name: "Whisky Point", location: "Arugam Bay", description: "Surf spot north of Arugam Bay" },
    { id: 66, name: "Peanut Farm Beach", location: "Arugam Bay", description: "Secluded surf spot" },
    { id: 67, name: "Elephant Rock Beach", location: "Arugam Bay", description: "Named after the elephant-shaped rock" },
    { id: 68, name: "Okanda Beach", location: "Eastern Province", description: "Sacred pilgrimage site and surf spot" },
    { id: 69, name: "Panama Beach", location: "Eastern Province", description: "Remote beach south of Arugam Bay" },
    { id: 70, name: "Pasikudah Beach", location: "Eastern Province", description: "Shallow bay with turquoise water" },
    { id: 71, name: "Kalkudah Beach", location: "Eastern Province", description: "Long, largely undeveloped beach" },
    { id: 72, name: "Batticaloa Beach", location: "Eastern Province", description: "Beach near the lagoon city" },
    { id: 73, name: "Kallady Beach", location: "Batticaloa", description: "Known for \"singing sands\" phenomenon" },
    { id: 74, name: "Dutch Bar Beach", location: "Eastern Province", description: "Sand strip between lagoon and sea" },
    { id: 75, name: "Trincomalee Beach", location: "Trincomalee", description: "Beach in the historic port city" },
    { id: 76, name: "Uppuveli Beach", location: "Trincomalee", description: "Developing beach destination north of Trincomalee" },
    { id: 77, name: "Nilaveli Beach", location: "Trincomalee", description: "Long, white sand beach" },
    { id: 78, name: "Marble Beach", location: "Trincomalee", description: "Also known as Marble Bay Beach, managed by Sri Lankan Air Force" },
    { id: 79, name: "Arisimale Beach", location: "Trincomalee", description: "Remote beach in the Trincomalee district" },
    { id: 80, name: "Kuchchaveli Beach", location: "Trincomalee", description: "Developing beach area north of Trincomalee" },
    { id: 81, name: "Casuarina Beach", location: "Jaffna", description: "Popular beach in Karainagar (Karaitivu Island)" },
    { id: 82, name: "Kankesanthurai Beach", location: "Jaffna", description: "Historic beach in northern Jaffna (KKS Beach)" },
    { id: 83, name: "Manalkadu Beach", location: "Northern Province", description: "Sand dune beach area" },
    { id: 84, name: "Point Pedro Beach", location: "Jaffna", description: "Northernmost beach in Sri Lanka" },
    { id: 85, name: "Alaiyaddy Beach", location: "Jaffna", description: "On the northwest coast of the peninsula" },
    { id: 86, name: "Kayts Beach", location: "Jaffna", description: "Beach on Velanai Island" },
    { id: 87, name: "Delft Island Beach", location: "Jaffna", description: "Remote beach on Delft (Neduntheevu) Island" },
    { id: 88, name: "Mannar Beach", location: "Mannar", description: "Near the historic Mannar town" },
    { id: 89, name: "Talaimannar Beach", location: "Mannar", description: "Westernmost point, close to India" },
    { id: 90, name: "Arippu Beach", location: "Northern Province", description: "Historic pearl fishing area" },
    { id: 91, name: "Wilpattu Beach", location: "North Western Province", description: "Adjacent to Wilpattu National Park" },
    { id: 92, name: "Silavathurai Beach", location: "Northern Province", description: "Fishing village beach" },
    { id: 93, name: "Mullikulam Beach", location: "Mannar", description: "Remote beach in Mannar district" },
    { id: 94, name: "Thoduwawa Beach", location: "North Western Province", description: "Fishing village beach north of Chilaw" },
    { id: 95, name: "Chilaw Beach", location: "North Western Province", description: "Beach near Chilaw town" },
    { id: 96, name: "Marawila Beach", location: "North Western Province", description: "Small resort area" },
    { id: 97, name: "Nattandiya Beach", location: "North Western Province", description: "Quiet coastal area" },
    { id: 98, name: "Mundal Beach", location: "North Western Province", description: "Near Mundal Lake" },
    { id: 99, name: "Udappuwa Beach", location: "North Western Province", description: "Remote fishing village" },
    { id: 100, name: "Rumassala Beach", location: "Southern Province", description: "Associated with the Ramayana legend" },
    { id: 101, name: "Kahandamodara Beach", location: "Southern Province", description: "Where the Walawe river meets the sea" },
    { id: 102, name: "Godawaya Beach", location: "Southern Province", description: "Archaeological site and beach" },
    { id: 103, name: "Nilwella Beach", location: "Southern Province", description: "Small crescent-shaped bay" },
    { id: 104, name: "Werala Beach", location: "Southern Province", description: "Small beach in southern coast" },
    { id: 105, name: "Kudawella Beach", location: "Southern Province", description: "Known for the natural phenomenon \"Hummanaya\" blowhole" },
    { id: 106, name: "Thalaramba Beach", location: "Southern Province", description: "Quiet beach in the deep south" },
    { id: 107, name: "Ussangoda Beach", location: "Southern Province", description: "Beach near an ancient meteorite crater site" },
    { id: 108, name: "Kappalady Lagoon Beach", location: "Kalpitiya", description: "Kite surfing destination in Kalpitiya" }
  ];

  const filterCategories = [
    {
      id: 'location',
      title: 'Location',
      options: ['Southern Province', 'Eastern Province', 'Northern Province', 'Western Province', 'North Western Province']
    },
    {
      id: 'activity',
      title: 'Activities',
      options: ['Surfing', 'Turtle Watching', 'Dolphin Watching', 'Kitesurfing', 'Swimming']
    },
    {
      id: 'popularity',
      title: 'Popularity',
      options: ['Popular', 'Hidden Gem']
    }
  ];

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    setFilteredBeaches(beachesData);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = beachesData.filter(beach => 
        beach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        beach.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        beach.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBeaches(filtered);
    } else {
      setFilteredBeaches(beachesData);
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
        <Text style={styles.headerTitle}>Beaches</Text>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Ionicons name="person-circle" size={32} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search beaches or locations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{beachesData.length}</Text>
          <Text style={styles.statLabel}>Beaches</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>15</Text>
          <Text style={styles.statLabel}>Provinces</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>24</Text>
          <Text style={styles.statLabel}>Surf Spots</Text>
        </View>
      </View>

      {/* Beach Listings */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Explore Sri Lanka's Beautiful Beaches</Text>
        
        {filteredBeaches.map((beach) => (
          <TouchableOpacity 
            key={beach.id} 
            style={styles.beachCard}
            onPress={() => {
            }}
          >
            <View style={styles.beachInfo}>
              <Text style={styles.beachName}>{beach.name}</Text>
              <View style={styles.beachDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="location" size={16} color="#3478F6" />
                  <Text style={styles.detailText}>{beach.location}</Text>
                </View>
              </View>
              {beach.description ? (
                <Text style={styles.beachDescription} numberOfLines={2}>
                  {beach.description}
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.spaceAtBottom} />
      </ScrollView>

      <Footer/>
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
  beachCard: {
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
  beachInfo: {
    padding: 15,
  },
  beachName: {
    fontFamily: 'outfit-bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  beachDetails: {
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
  beachDescription: {
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