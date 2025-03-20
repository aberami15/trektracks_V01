import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import TripForm from '../../components/TripForm';
import Footer from '../footer';

export default function CreateItinerary() {
  const navigation = useNavigation();
  const router = useRouter();
  
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with profile photo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/trip-itinerary')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Trip Planner</Text>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Image
            source={require('../../assets/images/profile.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Form Content */}
      <TripForm 
        navigation={navigation} 
        router={router} 
        isAIPlanner={true} 
      />
      
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: '#333',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'outfit-bold'
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  }
});