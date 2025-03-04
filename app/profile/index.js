import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../configs/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function Profile() {
  const navigation = useNavigation();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          console.log("Auth user data:", currentUser);
          
          // Fetch user data from Firestore
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            const firestoreData = userSnap.data();
            console.log("Firestore user data:", firestoreData);
            setUserData(firestoreData);
          } else {
            // If no document exists yet, use basic auth info
            setUserData({
              name: currentUser.displayName || "User",
              email: currentUser.email,
              phone: currentUser.phoneNumber || "Not provided"
            });
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      router.replace('/');
    }).catch((error) => {
      console.error("Sign out error:", error);
    });
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
                {userData?.fullName || userData?.name || auth.currentUser?.displayName || "User"}
              </Text>
            </View>
          </View>

          {/* Icon Row Section */}
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconItem}>
              <Ionicons name="map" size={28} color="#333" />
              <Text style={styles.iconText}>Travel History</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconItem} onPress={handleBudgetPress}>
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
              <Text style={styles.value}>{userData?.phone || userData?.phoneNumber || "Not provided"}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="mail" size={20} color="#3478F6" />
            <View style={styles.detailText}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{userData?.email || auth.currentUser?.email || "Not provided"}</Text>
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