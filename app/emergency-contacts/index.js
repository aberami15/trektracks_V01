import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  Linking,
  Alert
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';

export default function EmergencyContacts() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  const handleCall = (phoneNumber, serviceName) => {
    Alert.alert(
      "Emergency Call",
      `Are you sure you want to call ${serviceName}?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Call", 
          onPress: () => {
            Linking.openURL(`tel:${phoneNumber}`);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.leftHeader}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Emergency Contacts</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Emergency services section */}
        <Text style={styles.sectionTitle}>Emergency Services</Text>
        
        {/* Medical Emergency */}
        <TouchableOpacity 
          style={styles.emergencyCard}
          onPress={() => handleCall("119", "Ambulance Service")}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#FF3B30' }]}>
            <FontAwesome5 name="ambulance" size={24} color="white" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Medical Emergency</Text>
            <Text style={styles.cardDescription}>Call ambulance services for medical emergencies</Text>
          </View>
          <TouchableOpacity 
            style={styles.callButton}
            onPress={() => handleCall("119", "Ambulance Service")}
          >
            <Ionicons name="call" size={20} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Police Emergency */}
        <TouchableOpacity 
          style={styles.emergencyCard}
          onPress={() => handleCall("118", "Police Emergency")}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#3478F6' }]}>
            <Ionicons name="shield" size={24} color="white" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Police Emergency</Text>
            <Text style={styles.cardDescription}>Report theft, assault or any crime</Text>
          </View>
          <TouchableOpacity 
            style={styles.callButton}
            onPress={() => handleCall("118", "Police Emergency")}
          >
            <Ionicons name="call" size={20} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Fire Emergency */}
        <TouchableOpacity 
          style={styles.emergencyCard}
          onPress={() => handleCall("110", "Fire Emergency")}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#FF9500' }]}>
            <MaterialIcons name="local-fire-department" size={24} color="white" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Fire Emergency</Text>
            <Text style={styles.cardDescription}>Call fire department for fire emergencies</Text>
          </View>
          <TouchableOpacity 
            style={styles.callButton}
            onPress={() => handleCall("110", "Fire Emergency")}
          >
            <Ionicons name="call" size={20} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Tourist Police */}
        <TouchableOpacity 
          style={styles.emergencyCard}
          onPress={() => handleCall("1912", "Tourist Police")}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#5856D6' }]}>
            <MaterialIcons name="tour" size={24} color="white" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Tourist Police</Text>
            <Text style={styles.cardDescription}>Special assistance for tourists in emergency</Text>
          </View>
          <TouchableOpacity 
            style={styles.callButton}
            onPress={() => handleCall("1912", "Tourist Police")}
          >
            <Ionicons name="call" size={20} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Embassy Section - Example */}
        <Text style={styles.sectionTitle}>Embassy Contacts</Text>
        
        <TouchableOpacity 
          style={styles.emergencyCard}
          onPress={() => handleCall("+94112422788", "US Embassy")}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#34C759' }]}>
            <FontAwesome5 name="flag-usa" size={24} color="white" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>US Embassy</Text>
            <Text style={styles.cardDescription}>US Embassy in Sri Lanka</Text>
          </View>
          <TouchableOpacity 
            style={styles.callButton}
            onPress={() => handleCall("+94112422788", "US Embassy")}
          >
            <Ionicons name="call" size={20} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Notes at bottom */}
        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>
            In case of emergency, please call the appropriate number above. 
            These numbers are specific to Sri Lanka. If traveling in another country, 
            please update with local emergency numbers.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  },
  headerTitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'outfit-bold'
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: '#333',
    marginTop: 20,
    marginBottom: 15,
  },
  emergencyCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  cardDescription: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#666',
  },
  callButton: {
    backgroundColor: '#FF3B30',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteContainer: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  noteText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  }
});