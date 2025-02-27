// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// import React, { useEffect } from 'react'
// import { useNavigation, useRouter } from 'expo-router'
// import { signOut } from 'firebase/auth';
// import { auth } from '../../configs/FirebaseConfig';

// export default function Home() {
//   const navigation = useNavigation();
//   const router = useRouter();

//   useEffect(() => {
//     navigation.setOptions({
//       headerShown: false
//     })
//   }, [])

//   const handleSignOut = () => {
//     signOut(auth).then(() => {
//       // Sign-out successful, redirect to login
//       router.replace('/');
//     }).catch((error) => {
//       // An error happened
//       console.error("Sign out error:", error);
//     });
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.welcomeText}>Welcome to TrekTracks!</Text>
      
//       <View style={styles.contentContainer}>
//         <Text style={styles.subText}>You've successfully logged in.</Text>
//         <Text style={styles.regularText}>
//           This is your home page where you can track your treks and adventures.
//         </Text>
//       </View>

//       <TouchableOpacity 
//         style={styles.signOutButton}
//         onPress={handleSignOut}
//       >
//         <Text style={styles.buttonText}>Sign Out</Text>
//       </TouchableOpacity>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 25,
//     paddingTop: 60,
//     backgroundColor: 'white',
//   },
//   welcomeText: {
//     fontFamily: 'outfit-bold',
//     fontSize: 28,
//     marginBottom: 20,
//   },
//   contentContainer: {
//     marginTop: 30,
//     marginBottom: 40,
//   },
//   subText: {
//     fontFamily: 'outfit-medium',
//     fontSize: 20,
//     marginBottom: 15,
//   },
//   regularText: {
//     fontFamily: 'outfit',
//     fontSize: 16,
//     lineHeight: 24,
//     color: '#555',
//   },
//   signOutButton: {
//     padding: 16,
//     backgroundColor: 'black',
//     borderRadius: 15,
//     marginTop: 'auto',
//   },
//   buttonText: {
//     color: 'white',
//     textAlign: 'center',
//     fontFamily: 'outfit-medium',
//     fontSize: 16,
//   }
// })

import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { signOut } from 'firebase/auth';
import { auth } from '../../configs/FirebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Home() {
  const navigation = useNavigation();
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful, redirect to login
      router.replace('/');
    }).catch((error) => {
      // An error happened
      console.error("Sign out error:", error);
    });
  }

  const handleProfilePress = () => {
    // Navigate to profile page (to be implemented)
    console.log("Navigate to profile");
    // router.push('/profile');
  }

  return (
    <View style={styles.container}>
      {/* Header with welcome message and profile photo */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.appNameText}>TrekTracks</Text>
        </View>
        
        <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
          {/* You can replace this with actual user profile image */}
          <View style={styles.profileImageContainer}>
            <Ionicons name="person-circle" size={40} color="#333" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for places to trek..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.subText}>Your Adventures Await</Text>
        <Text style={styles.regularText}>
          Discover amazing trekking spots and track your adventures with TrekTracks.
        </Text>
      </View>

      {/* Sign Out Button - Keeping this for now */}
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
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#555',
  },
  appNameText: {
    fontFamily: 'outfit-bold',
    fontSize: 24,
    color: '#000',
  },
  profileButton: {
    padding: 5,
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    marginBottom: 25,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#333',
  },
  contentContainer: {
    marginBottom: 30,
  },
  subText: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
    marginBottom: 10,
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