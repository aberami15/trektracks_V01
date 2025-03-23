import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import React from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Footer() {
  const navigation = useNavigation();
  const router = useRouter();
  
  // Get the current route to set active tab dynamically
  const currentRoute = router.pathname;
  
  // Animation values for each tab
  const [homeScale] = React.useState(new Animated.Value(currentRoute === '/home' ? 1.1 : 1));
  const [tripsScale] = React.useState(new Animated.Value(currentRoute === '/trip-itinerary' ? 1.1 : 1));
  const [favScale] = React.useState(new Animated.Value(currentRoute === '/save-favourite' ? 1.1 : 1));
  const [emergencyScale] = React.useState(new Animated.Value(currentRoute === '/emergency-contacts' ? 1.1 : 1));
  
  // Handle tab press with animation
  const handleTabPress = (route, scaleValue) => {
    // Reset all scales
    Animated.parallel([
      Animated.spring(homeScale, { toValue: 1, useNativeDriver: true }),
      Animated.spring(tripsScale, { toValue: 1, useNativeDriver: true }),
      Animated.spring(favScale, { toValue: 1, useNativeDriver: true }),
      Animated.spring(emergencyScale, { toValue: 1, useNativeDriver: true })
    ]).start();
    
    // Animate the pressed tab
    Animated.spring(scaleValue, {
      toValue: 1.1,
      friction: 4,
      tension: 140,
      useNativeDriver: true
    }).start();
    
    // Navigate to the route
    router.push(route);
  };
  
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => handleTabPress('/home', homeScale)}
      >
        <Animated.View style={{ transform: [{ scale: homeScale }] }}>
          <Ionicons 
            name={currentRoute === '/home' ? "home" : "home-outline"} 
            size={26} 
            color={currentRoute === '/home' ? '#2A9D8F' : '#262626'} 
          />
        </Animated.View>
        <Text style={[
          styles.footerText, 
          currentRoute === '/home' ? styles.activeText : null
        ]}>
          <Text style={currentRoute === '/home' ? styles.boldText : null}>Home</Text>
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => handleTabPress('/trip-itinerary', tripsScale)}
      >
        <Animated.View style={{ transform: [{ scale: tripsScale }] }}>
          <Ionicons 
            name={currentRoute === '/trip-itinerary' ? "calendar" : "calendar-outline"} 
            size={26} 
            color={currentRoute === '/trip-itinerary' ? '#2A9D8F' : '#262626'} 
          />
        </Animated.View>
        <Text style={[
          styles.footerText, 
          currentRoute === '/trip-itinerary' ? styles.activeText : null
        ]}>
          <Text style={currentRoute === '/trip-itinerary' ? styles.boldText : null}>My Trips</Text>
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => handleTabPress('/save-favourite', favScale)}
      >
        <Animated.View style={{ transform: [{ scale: favScale }] }}>
          <Ionicons 
            name={currentRoute === '/save-favourite' ? "heart" : "heart-outline"} 
            size={26} 
            color={currentRoute === '/save-favourite' ? '#2A9D8F' : '#262626'} 
          />
        </Animated.View>
        <Text style={[
          styles.footerText, 
          currentRoute === '/save-favourite' ? styles.activeText : null
        ]}>
          <Text style={currentRoute === '/save-favourite' ? styles.boldText : null}>Favourites</Text>
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => handleTabPress('/emergency-contacts', emergencyScale)}
      >
        <Animated.View style={{ transform: [{ scale: emergencyScale }] }}>
          <MaterialIcons 
            name="contact-emergency" 
            size={26} 
            color={currentRoute === '/emergency-contacts' ? '#2A9D8F' : '#262626'} 
            style={{opacity: currentRoute === '/emergency-contacts' ? 1 : 0.9}}
          />
        </Animated.View>
        <Text style={[
          styles.footerText, 
          currentRoute === '/emergency-contacts' ? styles.activeText : null
        ]}>
          <Text style={currentRoute === '/emergency-contacts' ? styles.boldText : null}>Emergency</Text>
        </Text>
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
    borderTopColor: '#DBDBDB', // Instagram-like border color
    paddingBottom: 5,
  },
  footerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingTop: 8,
  },
  footerText: {
    fontFamily: 'outfit',
    fontSize: 12,
    marginTop: 2,
    color: '#262626', // Instagram-like dark gray
  },
  activeText: {
    color: '#2A9D8F',
    fontFamily: 'outfit-medium',
  },
  boldText: {
    fontFamily: 'outfit-bold',
    fontWeight: 'bold',
  }
});