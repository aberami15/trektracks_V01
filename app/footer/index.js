import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Footer() {
  const navigation = useNavigation();
  const router = useRouter();
  
  // Get the current route to set active tab dynamically
  const currentRoute = router.pathname;

  return (
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerItem} 
          onPress={() => router.push('/home')}
        >
          <Ionicons name="home" size={24} color={currentRoute === '/home' ? '#3478F6' : '#034C53'} />
          <Text style={[styles.footerText, { color: currentRoute === '/home' ? '#3478F6' : '#034C53' }]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerItem}
          onPress={() => router.push('/trip-itinerary')}
        >
          <Ionicons name="calendar" size={24} color={currentRoute === '/trip-itinerary' ? '#3478F6' : '#034C53'} />
          <Text style={[styles.footerText, { color: currentRoute === '/trip-itinerary' ? '#3478F6' : '#034C53' }]}>My Trips</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerItem}
          onPress={() => router.push('/save-favourite')}
        >
          <Ionicons name="heart" size={24} color={currentRoute === '/save-favourite' ? '#3478F6' : '#034C53'} />
          <Text style={[styles.footerText, { color: currentRoute === '/save-favourite' ? '#3478F6' : '#034C53' }]}>Favourites</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerItem}
          onPress={() => router.push('/emergency-contacts')}
        >
          <MaterialIcons name="contact-emergency" size={24} color={currentRoute === '/emergency-contacts' ? '#3478F6' : '#034C53'} />
          <Text style={[styles.footerText, { color: currentRoute === '/emergency-contacts' ? '#3478F6' : '#034C53' }]}>Emergency</Text>
        </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
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
    marginTop: 4,
  },
});
