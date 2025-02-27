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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.leftHeader}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#5edfff" />
          </TouchableOpacity>
          <Text style={styles.profileName}>My Profile</Text>
        </View>

        <View style={styles.rightHeader}>
          <Feather name="settings" size={24} color="#5edfff" style={styles.headerIcon} />
          <MaterialIcons name="notifications" size={24} color="#5edfff" />
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
              <Ionicons name="person" size={24} color="#fff" />
              <Text style={styles.nameText}>John</Text>
            </View>
          </View>

          {/* Icon Row Section */}
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconItem}>
              <Ionicons name="map" size={28} color="#fff" />
              <Text style={styles.iconText}>Travel History</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconItem}>
              <Ionicons name="wallet" size={28} color="#fff" />
              <Text style={styles.iconText}>Budget</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconItem}>
              <Ionicons name="star" size={28} color="#fff" />
              <Text style={styles.iconText}>Reviews</Text>
            </TouchableOpacity>
          </View>

          {/* Contact Info Section */}
          <View style={styles.detailItem}>
            <Ionicons name="call" size={20} color="#5edfff" />
            <View style={styles.detailText}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>+94777342436</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="mail" size={20} color="#5edfff" />
            <View style={styles.detailText}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>hchamad@gmail.com</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Logout Button with Icon */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <Text style={styles.logoutText}>Log Out</Text>
          <Ionicons name="exit-outline" size={20} color="#5edfff" style={{ marginLeft: 8 }}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#031f2a',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#0a3a4a',
    paddingTop: 50, // Added to prevent content from being hidden under status bar
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 28
  },
  rightHeader: {
    flexDirection: 'column',
    gap: 8
  },
  profileName: {
    color: '#5edfff',
    fontSize: 18,
    fontWeight: '600'
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    padding: 25,
    paddingBottom: 80
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 15
  },
  outerBorder: {
    width: 134,
    height: 134,
    borderRadius: 67,
    borderWidth: 2,
    borderColor: '#b3b3b3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#0a3a4a',
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
    color: '#fff',
    fontSize: 20,
    fontWeight: '600'
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 15
  },
  iconItem: {
    alignItems: 'center',
    gap: 8
  },
  iconText: {
    color: '#5edfff',
    fontSize: 14
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#0a3a4a'
  },
  detailText: {
    flex: 1
  },
  label: {
    color: '#7d9ca5',
    fontSize: 15
  },
  value: {
    color: '#fff',
    fontSize: 16
  },
  logoutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 25,
    backgroundColor: '#031f2a'
  },
  logoutButton: {
    backgroundColor: '#0a3a4a',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#5edfff'
  },
  logoutText: {
    color: '#5edfff',
    fontSize: 16,
    fontWeight: '600'
  }
});
