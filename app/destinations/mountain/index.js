// Create this file at app/mountains/index.js

import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import Footer from '../../footer'


export default function Mountain() {
  const navigation = useNavigation();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMountains, setFilteredMountains] = useState([]);

  // Define mountain data from the comprehensive list
  const mountainsData = [
    { id: 1, name: "Central Massif", height: "", location: "Central Sri Lanka", description: "Core mountain range in central Sri Lanka" },
    { id: 2, name: "Knuckles Mountain Range (Dumbara Hills)", height: "", location: "Central Province", description: "Named for its knuckle-like appearance" },
    { id: 3, name: "Rakwana Mountains", height: "", location: "Southwestern Sri Lanka", description: "Southwestern part of the central highlands" },
    { id: 4, name: "Sabaragamuwa Ridges", height: "", location: "Southern Sri Lanka", description: "Part of the southern highland complex" },
    { id: 5, name: "Namunukula Range", height: "", location: "Badulla", description: "Eastern highlands around Badulla" },
    { id: 6, name: "Hanthana Range", height: "", location: "Kandy", description: "Near Kandy" },
    { id: 7, name: "Dolosbage Range", height: "", location: "Central Province", description: "Near Nawalapitiya" },
    { id: 8, name: "Pidurutalagala (Mount Pedro)", height: "2,524m", location: "Nuwara Eliya District", description: "Highest mountain in Sri Lanka" },
    { id: 9, name: "Kirigalpotta", height: "2,395m", location: "Nuwara Eliya District", description: "Second highest peak" },
    { id: 10, name: "Totapola", height: "2,357m", location: "Nuwara Eliya District", description: "Third highest" },
    { id: 11, name: "Kudahagala", height: "2,341m", location: "Nuwara Eliya District", description: "Fourth highest" },
    { id: 12, name: "Conical Hill", height: "2,166m", location: "Nuwara Eliya District", description: "" },
    { id: 13, name: "Great Western", height: "2,140m", location: "Nuwara Eliya District", description: "" },
    { id: 14, name: "Kikilimana", height: "2,135m", location: "Nuwara Eliya District", description: "" },
    { id: 15, name: "Namunukula", height: "2,036m", location: "Badulla District", description: "Eastern highlands" },
    { id: 16, name: "Bible Rock (Bathalegala)", height: "1,977m", location: "Kegalle District", description: "Distinctive flat-topped mountain" },
    { id: 17, name: "Kabaragala", height: "1,951m", location: "Central Highlands", description: "" },
    { id: 18, name: "Gombaniya (Knuckles Peak)", height: "1,906m", location: "Central Province", description: "Highest point in the Knuckles Range" },
    { id: 19, name: "Thotupola Kanda", height: "1,892m", location: "Nuwara Eliya District", description: "" },
    { id: 20, name: "Sri Pada (Adam's Peak)", height: "1,868m", location: "Ratnapura District", description: "Sacred mountain with Buddha's footprint" },
    { id: 21, name: "Dimbulugala", height: "1,857m", location: "Knuckles Range", description: "" },
    { id: 22, name: "Kalupahana", height: "1,830m", location: "Ratnapura District", description: "" },
    { id: 23, name: "Dumbanagala", height: "1,822m", location: "Knuckles Range", description: "" },
    { id: 24, name: "Lakegala", height: "1,810m", location: "Knuckles Range", description: "Distinctive rock peak" },
    { id: 25, name: "Kolapathana", height: "1,808m", location: "Nuwara Eliya District", description: "" },
    { id: 26, name: "Idalgashinna", height: "1,798m", location: "Badulla District", description: "" },
    { id: 27, name: "Hakgala", height: "1,745m", location: "Nuwara Eliya District", description: "Famous for botanical gardens" },
    { id: 28, name: "Kotagala", height: "1,738m", location: "Nuwara Eliya District", description: "" },
    { id: 29, name: "Single Tree Mountain", height: "1,738m", location: "Nuwara Eliya District", description: "" },
    { id: 30, name: "Westminster Abbey", height: "1,736m", location: "Central Highlands", description: "" },
    { id: 31, name: "Dothalugala", height: "1,720m", location: "Knuckles Range", description: "" },
    { id: 32, name: "Reverse Slope", height: "1,679m", location: "Central Highlands", description: "" },
    { id: 33, name: "Poolbank", height: "1,654m", location: "Nuwara Eliya District", description: "" },
    { id: 34, name: "Gonakele", height: "1,651m", location: "Badulla District", description: "" },
    { id: 35, name: "Narangala", height: "1,638m", location: "Knuckles Range", description: "" },
    { id: 36, name: "Wangedigala", height: "1,631m", location: "Knuckles Range", description: "" },
    { id: 37, name: "Kalugala", height: "1,625m", location: "Knuckles Range", description: "" },
    { id: 38, name: "Koboneelagala", height: "1,621m", location: "Knuckles Range", description: "" },
    { id: 39, name: "Ellawala Kanda", height: "1,615m", location: "Badulla District", description: "" },
    { id: 40, name: "One Tree Hill (Pattipola Kanda)", height: "1,527m", location: "Badulla District", description: "" },
    { id: 41, name: "Thangappuwa", height: "1,512m", location: "Knuckles Range", description: "" },
    { id: 42, name: "Yakungala", height: "1,505m", location: "Badulla District", description: "" },
    { id: 43, name: "Kehelpathdoruwegala", height: "1,503m", location: "Knuckles Range", description: "" },
    { id: 44, name: "Ritigala", height: "1,488m", location: "North Central Province", description: "Isolated peak with ancient monastery ruins" },
    { id: 45, name: "Dimbulagala (Gunner's Quoin)", height: "1,489m", location: "Eastern Province", description: "Ancient Buddhist monastery" },
    { id: 46, name: "Hunnasgiriya", height: "1,440m", location: "Kandy District", description: "" },
    { id: 47, name: "Maragala", height: "1,429m", location: "Badulla District", description: "" },
    { id: 48, name: "Morakandalama", height: "1,408m", location: "Badulla District", description: "" },
    { id: 49, name: "Deeyagala", height: "1,387m", location: "Knuckles Range", description: "" },
    { id: 50, name: "Gommaliya", height: "1,375m", location: "Knuckles Range", description: "" },
    { id: 51, name: "Knuckles", height: "1,365m", location: "Knuckles Range", description: "Second highest point in Knuckles Range" },
    { id: 52, name: "Ella Rock", height: "1,319m", location: "Badulla District", description: "Popular hiking destination" },
    { id: 53, name: "Pinitenna Kanda", height: "1,320m", location: "Nuwara Eliya District", description: "" },
    { id: 54, name: "Balangoda Kanda", height: "1,318m", location: "Ratnapura District", description: "" },
    { id: 55, name: "Telulla", height: "1,316m", location: "Badulla District", description: "" },
    { id: 56, name: "Kabaragala (in Knuckles)", height: "1,300m", location: "Knuckles Range", description: "" },
    { id: 57, name: "Etugala", height: "1,284m", location: "Knuckles Range", description: "" },
    { id: 58, name: "Moragahakanda", height: "1,276m", location: "Matale District", description: "" },
    { id: 59, name: "Alagalla", height: "1,250m", location: "Kandy District", description: "Also known as 'Potato Range'" },
    { id: 60, name: "Algalla Kanda", height: "1,248m", location: "Central Province", description: "" },
    { id: 61, name: "Batadombakanda", height: "1,234m", location: "Ratnapura District", description: "" },
    { id: 62, name: "Bellankanda", height: "1,230m", location: "Knuckles Range", description: "" },
    { id: 63, name: "Lunugala", height: "1,226m", location: "Badulla District", description: "" },
    { id: 64, name: "Doluwakanda", height: "1,224m", location: "Matale District", description: "" },
    { id: 65, name: "Little Adam's Peak", height: "1,141m", location: "Badulla District", description: "Popular hiking spot near Ella" },
    { id: 66, name: "Hanthana Peak", height: "1,145m", location: "Kandy District", description: "Highest in Hanthana Range" },
    { id: 67, name: "Dolukanda", height: "1,127m", location: "Kurunegala District", description: "" },
    { id: 68, name: "Ramboda Pass", height: "1,127m", location: "Nuwara Eliya District", description: "Important mountain pass" },
    { id: 69, name: "Batalegala (Bible Rock)", height: "1,114m", location: "Kegalle District", description: "Distinctive flat-topped formation" },
    { id: 70, name: "Ambuluwawa", height: "1,065m", location: "Kandy District", description: "Multi-religious tower" },
    { id: 71, name: "Niriella", height: "1,060m", location: "Ratnapura District", description: "" },
    { id: 72, name: "Eratna Kanda", height: "1,029m", location: "Ratnapura District", description: "" },
    { id: 73, name: "Kiribathgala", height: "1,025m", location: "Ratnapura District", description: "" },
    { id: 74, name: "Beragala", height: "1,020m", location: "Badulla District", description: "" },
    { id: 75, name: "Gomaragala", height: "1,012m", location: "Badulla District", description: "" },
    { id: 76, name: "Viharakanda", height: "1,008m", location: "Matale District", description: "" },
    { id: 77, name: "Kandahena Kanda", height: "1,006m", location: "Kegalle District", description: "" },
    { id: 78, name: "Monaragala", height: "906m", location: "Monaragala District", description: "Distinctive rock formation" },
    { id: 79, name: "Kokagala", height: "915m", location: "Monaragala District", description: "" },
    { id: 80, name: "Galpottayaya", height: "912m", location: "Ampara District", description: "" },
    { id: 81, name: "Medamahanuwara", height: "908m", location: "Kandy District", description: "" },
    { id: 82, name: "Dolukanda (Kurunegala)", height: "936m", location: "Kurunegala District", description: "" },
    { id: 83, name: "Yakdessakanda", height: "895m", location: "Matale District", description: "" },
    { id: 84, name: "Embekka Peak", height: "825m", location: "Kandy District", description: "" },
    { id: 85, name: "Gonagala", height: "821m", location: "Badulla District", description: "" },
    { id: 86, name: "Naminigala", height: "815m", location: "Monaragala District", description: "" },
    { id: 87, name: "Kadugannawa", height: "805m", location: "Kandy District", description: "Historic mountain pass" },
    { id: 88, name: "Riverston", height: "798m", location: "Matale District", description: "Scenic viewpoint" },
    { id: 89, name: "Nilgala", height: "789m", location: "Monaragala District", description: "" },
    { id: 90, name: "Petiyagala", height: "786m", location: "Badulla District", description: "" },
    { id: 91, name: "Wahakotte", height: "765m", location: "Matale District", description: "" },
    { id: 92, name: "Mawanella Range", height: "762m", location: "Kegalle District", description: "" },
    { id: 93, name: "Kokebe Rock", height: "673m", location: "North Central Province", description: "" },
    { id: 94, name: "Dorawakkanda", height: "667m", location: "Kegalle District", description: "" },
    { id: 95, name: "Gongala", height: "665m", location: "Matara District", description: "" },
    { id: 96, name: "Ehetuwewa", height: "650m", location: "North Western Province", description: "" },
    { id: 97, name: "Delmalla", height: "648m", location: "Monaragala District", description: "" },
    { id: 98, name: "Aranayaka", height: "640m", location: "Kegalle District", description: "" },
    { id: 99, name: "Pilimathalawa", height: "632m", location: "Kandy District", description: "" },
    { id: 100, name: "Gommunnawa", height: "630m", location: "Kegalle District", description: "" },
    { id: 101, name: "Doloswala", height: "621m", location: "Ratnapura District", description: "" },
    { id: 102, name: "Maragala (smaller peak)", height: "598m", location: "Monaragala District", description: "" },
    { id: 103, name: "Ethgala", height: "589m", location: "Kurunegala District", description: "" },
    { id: 104, name: "Galahagama", height: "582m", location: "Ratnapura District", description: "" },
    { id: 105, name: "Bogawantalawa", height: "580m", location: "Nuwara Eliya District", description: "" },
    { id: 106, name: "Walalgoda", height: "578m", location: "Galle District", description: "" },
    { id: 107, name: "Balangoda", height: "570m", location: "Ratnapura District", description: "" },
    { id: 108, name: "Ginigathhena", height: "564m", location: "Nuwara Eliya District", description: "" },
    { id: 109, name: "Hataramanana", height: "552m", location: "Ratnapura District", description: "" },
    { id: 110, name: "Lahugala", height: "514m", location: "Eastern Province", description: "Near wildlife sanctuary" },
    { id: 111, name: "Yudaganawa", height: "500m (approx.)", location: "Eastern Province", description: "" },
    { id: 112, name: "Diggala", height: "497m", location: "Kegalle District", description: "" },
    { id: 113, name: "Mawathagama", height: "456m", location: "Kurunegala District", description: "" },
    { id: 114, name: "Katugastota", height: "450m", location: "Kandy District", description: "" },
    { id: 115, name: "Bulutota", height: "443m", location: "Ratnapura District", description: "" },
    { id: 116, name: "Bintenna", height: "436m", location: "Monaragala District", description: "Historic area" },
    { id: 117, name: "Kuruwita", height: "425m", location: "Ratnapura District", description: "" },
    { id: 118, name: "Bulathkohupitiya", height: "410m", location: "Kegalle District", description: "" },
    { id: 119, name: "Sigiriya (Lion Rock)", height: "349m", location: "Central Province", description: "Ancient rock fortress (UNESCO site)" },
    { id: 120, name: "Pidurangala", height: "344m", location: "Central Province", description: "Adjacent to Sigiriya" },
    { id: 121, name: "Mihintale", height: "300m", location: "North Central Province", description: "Religious and historical significance" },
    { id: 122, name: "Aruggoda", height: "289m", location: "Kegalle District", description: "" },
    { id: 123, name: "Ridiyagama", height: "276m", location: "Hambantota District", description: "" },
    { id: 124, name: "Ritigala (lower peak)", height: "255m", location: "North Central Province", description: "" },
    { id: 125, name: "Padiyathalawa", height: "240m", location: "Eastern Province", description: "" },
    { id: 126, name: "Yapahuwa", height: "100m (approx.)", location: "North Western Province", description: "Ancient fortress built on a rock" },
    { id: 127, name: "Dimbulaga", height: "246m", location: "North Central Province", description: "" },
    { id: 128, name: "Galagedara", height: "237m", location: "Kandy District", description: "" },
    { id: 129, name: "Alawwa", height: "225m", location: "Kurunegala District", description: "" },
    { id: 130, name: "Meetotamulla", height: "212m", location: "Colombo District", description: "" },
    { id: 131, name: "Mausakanda", height: "206m", location: "North Western Province", description: "" },
    { id: 132, name: "Godakawela", height: "184m", location: "Ratnapura District", description: "" },
    { id: 133, name: "Dampara", height: "176m", location: "Eastern Province", description: "" },
    { id: 134, name: "Rathugala", height: "170m", location: "Eastern Province", description: "" },
    { id: 135, name: "Kataragama", height: "156m", location: "Uva Province", description: "Sacred mountain" },
    { id: 136, name: "Deraniyagala", height: "145m", location: "Kegalle District", description: "" },
    { id: 137, name: "Wilpattu Mountains", height: "135m", location: "North Western Province", description: "" },
    { id: 138, name: "Thanthirimale", height: "130m", location: "North Central Province", description: "" },
    { id: 139, name: "Mulkirigala", height: "125m", location: "Southern Province", description: "Rock temple" },
    { id: 140, name: "Kudumbigala", height: "114m", location: "Eastern Province", description: "Ancient monastery" },
    { id: 141, name: "Rassagala", height: "105m", location: "Polonnaruwa District", description: "" },
    { id: 142, name: "Galapitagala", height: "100m", location: "Anuradhapura District", description: "" },
    { id: 143, name: "Tantirimale", height: "98m", location: "North Central Province", description: "" },
    { id: 144, name: "Rajarata Hills", height: "90m", location: "North Central Province", description: "" },
    { id: 145, name: "Dewagiri", height: "85m", location: "Ampara District", description: "" },
    { id: 146, name: "Galneva", height: "76m", location: "North Western Province", description: "" },
    { id: 147, name: "Kebilittakanda", height: "68m", location: "Southern Province", description: "" },
    { id: 148, name: "Dambulla Rock", height: "65m", location: "Central Province", description: "Famous cave temple site" },
    { id: 149, name: "Anawilundawa", height: "45m", location: "North Western Province", description: "" },
    { id: 150, name: "Kaluwalagala", height: "42m", location: "Moneragala District", description: "" },
    { id: 151, name: "Thoppigala (Baron's Cap)", height: "40m", location: "Eastern Province", description: "" },
    { id: 152, name: "Kahagollewa", height: "37m", location: "North Central Province", description: "" },
    { id: 153, name: "Punkudathivu Hill", height: "32m", location: "Northern Province", description: "" },
    { id: 154, name: "Medawachchiya", height: "30m", location: "North Central Province", description: "" },
    { id: 155, name: "Madhu Road", height: "28m", location: "Northern Province", description: "" },
    { id: 156, name: "Mannar Island Hill", height: "25m", location: "Northern Province", description: "" },
    { id: 157, name: "Talaimannar", height: "20m", location: "Northern Province", description: "" }
  ];

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    setFilteredMountains(mountainsData);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = mountainsData.filter(mountain => 
        mountain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mountain.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMountains(filtered);
    } else {
      setFilteredMountains(mountainsData);
    }
  }, [searchQuery]);

 

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mountains</Text>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Ionicons name="person-circle" size={32} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search mountains or locations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Mountain Listings */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Explore Sri Lanka's Majestic Peaks</Text>
        
        {filteredMountains.map((mountain) => (
          <TouchableOpacity 
            key={mountain.id} 
            style={styles.mountainCard}
            onPress={() => {
            }}
          >
            <View style={styles.mountainInfo}>
              <Text style={styles.mountainName}>{mountain.name}</Text>
              <View style={styles.mountainDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="resize" size={16} color="#3478F6" />
                  <Text style={styles.detailText}>{mountain.height}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="location" size={16} color="#3478F6" />
                  <Text style={styles.detailText}>{mountain.location}</Text>
                </View>
              </View>
              {mountain.description ? (
                <Text style={styles.mountainDescription} numberOfLines={2}>
                  {mountain.description}
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
  mountainCard: {
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
  mountainInfo: {
    padding: 15,
  },
  mountainName: {
    fontFamily: 'outfit-bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  mountainDetails: {
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
  mountainDescription: {
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