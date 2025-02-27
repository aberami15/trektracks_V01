import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { signOut } from 'firebase/auth';
import { auth } from '../../configs/FirebaseConfig';

export default function Home() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful, redirect to login
      router.replace('/');
    }).catch((error) => {
      // An error happened
      console.error("Sign out error:", error);
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to TrekTracks!</Text>
      
      <View style={styles.contentContainer}>
        <Text style={styles.subText}>You've successfully logged in.</Text>
        <Text style={styles.regularText}>
          This is your home page where you can track your treks and adventures.
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.signOutButton}
        onPress={handleSignOut}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 60,
    backgroundColor: 'white',
  },
  welcomeText: {
    fontFamily: 'outfit-bold',
    fontSize: 28,
    marginBottom: 20,
  },
  contentContainer: {
    marginTop: 30,
    marginBottom: 40,
  },
  subText: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
    marginBottom: 15,
  },
  regularText: {
    fontFamily: 'outfit',
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  signOutButton: {
    padding: 16,
    backgroundColor: 'black',
    borderRadius: 15,
    marginTop: 'auto',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    fontSize: 16,
  }
})