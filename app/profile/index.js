import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Image,
  ScrollView
} from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../../configs/FirebaseConfig';

export default function Profile() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      router.replace('/');
    }).catch((error) => {
      console.error("Sign out error:", error);
    });
  }

  const handleEmergencyContacts = () => {
    // Navigate to emergency contacts page
    // You can replace this with your actual navigation logic
    console.log("Navigate to emergency contacts");
    // Example: router.push('/emergency-contacts');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.leftHeader}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.profileName}>My Profile</Text>
        </View>

        <View style={styles.rightHeader}>
          <Feather name="settings" size={24} color="#333" style={styles.headerIcon} />
          <MaterialIcons name="notifications" size={24} color="#333" />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          {/* Profile Section with Double Border */}
          <View style={styles.profileImageContainer}>
            <View style={styles.outerBorder}>
              <View style={styles.profileImage}>
                <Image
                  source={require('../../assets/images/profile.png')}
                  style={styles.image}
                />
              </View>
            </View>
            <View style={styles.nameContainer}>
              <Ionicons name="person" size={24} color="#333" />
              <Text style={styles.nameText}>John</Text>
            </View>
          </View>

          {/* Icon Row Section */}
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconItem}>
              <Ionicons name="map" size={28} color="#333" />
              <Text style={styles.iconText}>Travel History</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconItem}>
              <Ionicons name="wallet" size={28} color="#333" />
              <Text style={styles.iconText}>Budget</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconItem}>
              <Ionicons name="star" size={28} color="#333" />
              <Text style={styles.iconText}>Reviews</Text>
            </TouchableOpacity>
          </View>

          {/* Contact Info Section */}
          <View style={styles.detailItem}>
            <Ionicons name="call" size={20} color="#3478F6" />
            <View style={styles.detailText}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>+94777342436</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="mail" size={20} color="#3478F6" />
            <View style={styles.detailText}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>hchamad@gmail.com</Text>
            </View>
          </View>

          {/* Emergency Contacts Button */}
          <TouchableOpacity 
            style={styles.emergencyButton} 
            onPress={handleEmergencyContacts}
          >
            <Ionicons name="alert-circle" size={20} color="white" />
            <Text style={styles.emergencyText}>Emergency Contacts</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Logout Button with Icon */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <Text style={styles.logoutText}>Log Out</Text>
          <Ionicons name="exit-outline" size={20} color="white" style={{ marginLeft: 8 }}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    paddingTop: 50, // Added to prevent content from being hidden under status bar
    backgroundColor: 'white',
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 0
  },
  rightHeader: {
    flexDirection: 'row',
    gap: 15
  },
  profileName: {
    color: '#333',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'outfit-bold'
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    padding: 25,
    paddingBottom: 100
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 25
  },
  outerBorder: {
    width: 134,
    height: 134,
    borderRadius: 67,
    borderWidth: 2,
    borderColor: '#3478F6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e8e8e8',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 15
  },
  nameText: {
    color: '#333',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'outfit-medium'
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 25,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconItem: {
    alignItems: 'center',
    gap: 8
  },
  iconText: {
    color: '#3478F6',
    fontSize: 14,
    fontFamily: 'outfit'
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  detailText: {
    flex: 1
  },
  label: {
    color: '#666',
    fontSize: 15,
    fontFamily: 'outfit'
  },
  value: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'outfit-medium'
  },
  emergencyButton: {
    flexDirection: 'row',
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emergencyText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'outfit-medium',
    marginLeft: 8
  },
  logoutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 25,
    backgroundColor: '#f2f2f2'
  },
  logoutButton: {
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'outfit-medium'
  }
});