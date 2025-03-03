import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';

export default function SigiriyaDetail() {
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
        <Image source={require('../../assets/images/sigiriya.jpg')} style={styles.headerImage} />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <View style={styles.imageOverlay}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>4.9</Text>
          </View>
        </View>
      </View>
      
      <ScrollView style={styles.contentContainer}>
        {/* Title and Location */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sigiriya Rock Fortress</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color="#3478F6" />
            <Text style={styles.locationText}>Matale District, Central Province</Text>
          </View>
        </View>
        
        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.longDescription}>
            Rising dramatically from the central plains, the enigmatic rocky outcrop of Sigiriya is perhaps Sri Lanka's single most dramatic sight. Near-vertical walls soar to a flat-topped summit that contains the ruins of an ancient civilization, thought to be once the epicentre of the short-lived kingdom of Kassapa. The site was both a palace and fortress, and the name Sigiriya derives from the Sanskrit for 'Lion Rock', a reference to the way visitors traditionally began their final ascent to the top, through the open jaws and throat of a lion. Today only the enormous paws remain, carved into the bedrock and leading to the stairs.
          </Text>
        </View>
        
        {/* Visiting Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visiting Information</Text>
          
          <View style={styles.infoItem}>
            <MaterialIcons name="access-time" size={18} color="#333" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Opening Hours</Text>
              <Text style={styles.infoText}>7:00 AM - 5:30 PM (daily)</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <MaterialIcons name="attach-money" size={18} color="#333" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Entry Fee</Text>
              <Text style={styles.infoText}>LKR 5,000 for foreign tourists, LKR 50 for locals</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <MaterialIcons name="wb-sunny" size={18} color="#333" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Best Time to Visit</Text>
              <Text style={styles.infoText}>Early morning (7-9 AM) or late afternoon (3-5 PM) to avoid the heat</Text>
            </View>
          </View>
        </View>
        
        {/* Highlights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Highlights</Text>
          
          <View style={styles.bulletItem}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>Lion's Paw Entrance</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>Ancient Frescoes</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>Mirror Wall</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>Water Gardens</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>Boulder Gardens</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>Summit Palace Ruins</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>Panoramic Views</Text>
          </View>
        </View>
        
        {/* Tips and Advice */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tips & Advice</Text>
          
          <View style={styles.bulletItem}>
            <Ionicons name="information-circle-outline" size={16} color="#3478F6" />
            <Text style={styles.bulletText}>Wear comfortable shoes for climbing</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <Ionicons name="information-circle-outline" size={16} color="#3478F6" />
            <Text style={styles.bulletText}>Bring water and a hat for sun protection</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <Ionicons name="information-circle-outline" size={16} color="#3478F6" />
            <Text style={styles.bulletText}>Allow 3-4 hours for a complete visit</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <Ionicons name="information-circle-outline" size={16} color="#3478F6" />
            <Text style={styles.bulletText}>Beware of wasps during certain seasons</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <Ionicons name="information-circle-outline" size={16} color="#3478F6" />
            <Text style={styles.bulletText}>Photography restrictions apply for the frescoes</Text>
          </View>
        </View>
        
        {/* Nearby Attractions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Attractions</Text>
          
          <View style={styles.bulletItem}>
            <Ionicons name="pin-outline" size={16} color="#3478F6" />
            <Text style={styles.bulletText}>Dambulla Cave Temple (17 km)</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <Ionicons name="pin-outline" size={16} color="#3478F6" />
            <Text style={styles.bulletText}>Pidurangala Rock (1 km)</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <Ionicons name="pin-outline" size={16} color="#3478F6" />
            <Text style={styles.bulletText}>Minneriya National Park (26 km)</Text>
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