import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Profile() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, []);

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{width: 24}} /> {/* Empty view for header alignment */}
      </View>
      
      {/* Profile content */}
      <View style={styles.content}>
        <Ionicons name="person-circle" size={100} color="#333" />
        <Text style={styles.profileMessage}>This is a profile page!</Text>
        <Text style={styles.subMessage}>Navigation is working correctly</Text>
      </View>
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
    marginBottom: 30,
  },
  headerTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 24,
    color: '#333',
  },
  backButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  profileMessage: {
    fontFamily: 'outfit-bold',
    fontSize: 24,
    color: '#333',
    marginTop: 20,
  },
  subMessage: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  }
});