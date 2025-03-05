import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';

export default function GalleFortDetail() {
  const navigation = useNavigation();
  const router = useRouter();
  
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header Image with Back Button */}
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/gallefort.jpg')} style={styles.headerImage} />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <View style={styles.imageOverlay}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>4.7</Text>
          </View>
        </View>
      </View>
      
      <ScrollView style={styles.contentContainer}>
        {/* Title and Location */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Galle Fort</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color="#3478F6" />
            <Text style={styles.locationText}>Galle, Southern Province</Text>
          </View>
        </View>
        
        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.longDescription}>
            The historic Galle Fort, built by the Portuguese in 1588 and extensively fortified by the Dutch in the mid-1600s, represents the interaction between European architectural styles and South Asian traditions. Today, the fort's quaint narrow streets are lined with Dutch-colonial buildings, ancient mosques, grand mansions, museums, and quirky shops. This perfectly preserved colonial township within massive granite walls offers a rare glimpse into the past with a vibrant present atmosphere, full of boutique shops, cafes, and hotels.
          </Text>
        </View>
        
        {/* Visiting Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visiting Information</Text>
          
          <View style={styles.infoItem}>
            <MaterialIcons name="access-time" size={18} color="#333" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Opening Hours</Text>
              <Text style={styles.infoText}>Open 24 hours (fortified area), individual attractions vary</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <MaterialIcons name="attach-money" size={18} color="#333" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Entry Fee</Text>
              <Text style={styles.infoText}>Free to enter the fort area, individual attractions have separate fees</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <MaterialIcons name="wb-sunny" size={18} color="#333" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Best Time to Visit</Text>
              <Text style={styles.infoText}>Late afternoon for sunset views from the ramparts</Text>
            </View>
          </View>
        </View>
        
        {/* Highlights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Highlights</Text>
          
          <View style={styles.bulletItem}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>The Clock Tower</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>Old Dutch Hospital</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>Maritime Museum</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>Meeran Mosque</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>Lighthouse</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>Rampart Walls</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>Flag Rock</Text>
          </View>
        </View>
        
        {/* Tips and Advice */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tips & Advice</Text>
          
          <View style={styles.bulletItem}>
            <Ionicons name="information-circle-outline" size={16} color="#3478F6" />
            <Text style={styles.bulletText}>Explore early morning or late afternoon to avoid the heat</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <Ionicons name="information-circle-outline" size={16} color="#3478F6" />
            <Text style={styles.bulletText}>Allow a full day to properly explore the fort</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <Ionicons name="information-circle-outline" size={16} color="#3478F6" />
            <Text style={styles.bulletText}>Walk the ramparts at sunset for spectacular views</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <Ionicons name="information-circle-outline" size={16} color="#3478F6" />
            <Text style={styles.bulletText}>Many shops close on Sundays or for prayer times</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <Ionicons name="information-circle-outline" size={16} color="#3478F6" />
            <Text style={styles.bulletText}>Stay overnight within the fort for a unique experience</Text>
          </View>
        </View>
        
        {/* Nearby Attractions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Attractions</Text>
          
          <View style={styles.bulletItem}>
            <Ionicons name="pin-outline" size={16} color="#3478F6" />
            <Text style={styles.bulletText}>Unawatuna Beach (6 km)</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <Ionicons name="pin-outline" size={16} color="#3478F6" />
            <Text style={styles.bulletText}>Japanese Peace Pagoda (7 km)</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <Ionicons name="pin-outline" size={16} color="#3478F6" />
            <Text style={styles.bulletText}>Jungle Beach (8 km)</Text>
          </View>
        </View>
        
        {/* Add to Itinerary Button */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add to Itinerary</Text>
          <Ionicons name="add-circle-outline" size={20} color="white" style={styles.addIcon} />
        </TouchableOpacity>
        
        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 60,
    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  ratingContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: 'white',
    fontFamily: 'outfit-medium',
    fontSize: 14,
    marginLeft: 4,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingTop: 20,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 24,
    color: '#333',
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  longDescription: {
    fontFamily: 'outfit',
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  infoLabel: {
    fontFamily: 'outfit-medium',
    fontSize: 15,
    color: '#333',
  },
  infoText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingRight: 15,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3478F6',
    marginTop: 7,
    marginRight: 10,
  },
  bulletText: {
    fontFamily: 'outfit',
    fontSize: 15,
    color: '#444',
    flex: 1,
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: '#3478F6',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  addButtonText: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: 'white',
  },
  addIcon: {
    marginLeft: 8,
  },
  footer: {
    height: 30, // Extra space at the bottom
  }
});