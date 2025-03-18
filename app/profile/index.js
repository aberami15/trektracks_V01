import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  TextInput,
  Modal
} from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import { signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../configs/FirebaseConfig';

export default function Profile() {
  const navigation = useNavigation();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    
    // Fetch user data directly from auth
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.error("No authentication token found");
          setLoading(false);
          return;
        }

        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedToken = JSON.parse(window.atob(base64));
        
        const userId = decodedToken.id;
        
        // Make API call to fetch user data
        const response = await fetch(`http://localhost:5000/api/auth/user/${userId}`);
        console.log(response)
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const userData = await response.json();
        console.log(userData);
        setUserData(userData);
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  const handleSignOut = async() => {
    try {
      console.log("Signing out...");
      await AsyncStorage.removeItem('token');
      router.replace('/');
    }
    catch(error) {
      console.error("Sign out error:", error);
    }
  }

  const handleBudgetPress = () => {
    // Navigate to budget details page
    console.log("Navigating to budget planner");
    router.push('/budget-planner'); // Direct to the budget planner page
  };

  const handleEmergencyContacts = () => {
    // Navigate to emergency contacts page
    console.log("Navigate to emergency contacts");
    router.push('/emergency-contacts');
  };

  const handleEditPhone = () => {
    setNewPhoneNumber(userData?.phone !== "Not provided" ? userData.phone : "");
    setPhoneModalVisible(true);
  };

  const handleSavePhone = async () => {
    try {
      // Basic validation
      if (!newPhoneNumber || newPhoneNumber.trim() === "") {
        Alert.alert("Invalid Input", "Please enter a valid phone number");
        return;
      }

      // Update the phone number in user data
      setUserData({
        ...userData,
        phone: newPhoneNumber
      });

      // In a real app, you would also update this in Firebase
      // Note: Updating phone number in Firebase Auth requires SMS verification,
      // so this is just a local update for demonstration

      // Close the modal
      setPhoneModalVisible(false);

      // Show success message
      Alert.alert("Success", "Phone number updated successfully");
    } catch (error) {
      console.error("Error updating phone:", error);
      Alert.alert("Error", "Failed to update phone number");
    }
  };

  // Show loading indicator while fetching user data
  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#3478F6" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </SafeAreaView>
    );
  }

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
                {userData?.photoURL ? (
                  <Image
                    source={{ uri: userData.photoURL }}
                    style={styles.image}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/profile.png')}
                    style={styles.image}
                  />
                )}
              </View>
            </View>
            <View style={styles.nameContainer}>
              <Ionicons name="person" size={24} color="#333" />
              <Text style={styles.nameText}>
                {userData?.user.username || "User"}
              </Text>
            </View>
          </View>

          {/* Icon Row Section */}
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconItem}>
              <Ionicons name="map" size={28} color="#333" />
              <Text style={styles.iconText}>Travel History</Text>
            </TouchableOpacity>
            

            <TouchableOpacity style={styles.iconItem}>
              <Ionicons name="star" size={28} color="#333" />
              <Text style={styles.iconText}>Reviews</Text>
            </TouchableOpacity>
          </View>

          {/* Contact Info Section with Edit Button */}
          <View style={styles.detailItem}>
            <Ionicons name="call" size={20} color="#3478F6" />
            <View style={styles.detailText}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{userData?.user.phoneNumber || "Not provided"}</Text>
            </View>
            <TouchableOpacity onPress={handleEditPhone} style={styles.editButton}>
              <Feather name="edit-2" size={18} color="#3478F6" />
            </TouchableOpacity>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="mail" size={20} color="#3478F6" />
            <View style={styles.detailText}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{userData?.user.email || "Not provided"}</Text>
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

      {/* Edit Phone Number Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={phoneModalVisible}
        onRequestClose={() => setPhoneModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Phone Number</Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="Enter your phone number"
              value={newPhoneNumber}
              onChangeText={setNewPhoneNumber}
              keyboardType="phone-pad"
            />
            
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => setPhoneModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]} 
                onPress={handleSavePhone}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
    fontFamily: 'outfit-medium',
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
  editButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
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
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'outfit-medium',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center'
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    fontFamily: 'outfit',
    marginBottom: 20
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5
  },
  cancelButton: {
    backgroundColor: '#f2f2f2',
  },
  saveButton: {
    backgroundColor: '#3478F6',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'outfit-medium'
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'outfit-medium'
  }
});