import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import Footer from '../footer';

export default function RecentTrips() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, []);

  

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.push('/trip-itinerary')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Recent Trips</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Ionicons name="person-circle" size={40} color="black" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Trip Card */}
        <View style={styles.tripCard}>
          <Image 
            source={require('../../assets/images/sigiriya.jpg')} 
            style={styles.tripImage} 
          />
          <View style={styles.tripInfo}>
            <Text style={styles.tripDate}>January 15, 2025</Text>
            <Text style={styles.tripTitle}>Sigiriya Adventure</Text>
            <View style={styles.tripDetails}>
              <View style={styles.tripDetail}>
                <Ionicons name="location" size={16} color="#3478F6" />
                <Text style={styles.tripDetailText}>Central Province</Text>
              </View>
              <View style={styles.tripDetail}>
                <Ionicons name="time" size={16} color="#3478F6" />
                <Text style={styles.tripDetailText}>2 days</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Sample Trip Card */}
        <View style={styles.tripCard}>
          <Image 
            source={require('../../assets/images/beach.jpg')} 
            style={styles.tripImage} 
          />
          <View style={styles.tripInfo}>
            <Text style={styles.tripDate}>December 24, 2024</Text>
            <Text style={styles.tripTitle}>Beach Weekend Getaway</Text>
            <View style={styles.tripDetails}>
              <View style={styles.tripDetail}>
                <Ionicons name="location" size={16} color="#3478F6" />
                <Text style={styles.tripDetailText}>Southern Province</Text>
              </View>
              <View style={styles.tripDetail}>
                <Ionicons name="time" size={16} color="#3478F6" />
                <Text style={styles.tripDetailText}>3 days</Text>
              </View>
            </View>
          </View>
        </View>
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
    marginBottom: 20,
    paddingTop: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 28,
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 60, // Space for the footer
  },
  tripCard: {
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
  tripImage: {
    width: '100%',
    height: 150,
  },
  tripInfo: {
    padding: 15,
  },
  tripDate: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#777',
  },
  tripTitle: {
    fontFamily: 'outfit-medium',
    fontSize: 18,
    color: '#333',
    marginVertical: 5,
  },
  tripDetails: {
    flexDirection: 'row',
    marginTop: 5,
  },
  tripDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  tripDetailText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
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