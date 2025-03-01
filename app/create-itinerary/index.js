import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  ToastAndroid,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';

export default function CreateItinerary() {
  const navigation = useNavigation();
  const router = useRouter();
  
  // Form state
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState('3'); // Default 3 days
  const [travelMode, setTravelMode] = useState('');
  const [travelerCategory, setTravelerCategory] = useState('');
  const [preference, setPreference] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  // Options for selection
  const travelModes = ["Car", "Public Transport", "Bike", "Walking", "Plane", "Train", "Bus"];
  const travelerCategories = ["Solo", "Couple", "Family", "Friends", "Group Tour"];
  const preferences = ["Adventure", "Relaxation", "Cultural", "Devotional", "Food & Cuisine", "Nature", "Photography"];

  const handleSaveItinerary = async () => {
    if (!destination) {
      ToastAndroid.show('Please enter a destination', ToastAndroid.SHORT);
      return;
    }

    if (!days || isNaN(parseInt(days)) || parseInt(days) < 1) {
      ToastAndroid.show('Please enter a valid number of days', ToastAndroid.SHORT);
      return;
    }

    try {
      setLoading(true);
      
      // Create itinerary data object
      const itineraryData = {
        destination,
        days: parseInt(days),
        travelMode,
        travelerCategory,
        preference,
        createdAt: new Date()
      };

      console.log("Creating itinerary:", itineraryData);
      
      // TODO: Save to Firestore if needed
      // For now, we'll just simulate success
      
      setTimeout(() => {
        ToastAndroid.show('Itinerary created successfully!', ToastAndroid.SHORT);
        router.push('/trip-itinerary');
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error creating itinerary: ", error);
      ToastAndroid.show('Failed to create itinerary', ToastAndroid.SHORT);
      setLoading(false);
    }
  };

  // Render option selection button
  const renderOptionButton = (option, selectedOption, setOption) => (
    <TouchableOpacity
      style={[
        styles.optionButton,
        selectedOption === option ? styles.selectedOption : {}
      ]}
      onPress={() => setOption(option)}
    >
      <Text 
        style={[
          styles.optionText,
          selectedOption === option ? styles.selectedOptionText : {}
        ]}
      >
        {option}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.leftHeader}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Itinerary</Text>
        </View>
      </View>

      {/* Form Content */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* Destination */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Destination *</Text>
            <TextInput
              style={styles.input}
              placeholder="Where are you going?"
              value={destination}
              onChangeText={setDestination}
            />
          </View>

          {/* Number of Days */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Number of Days *</Text>
            <TextInput
              style={styles.input}
              placeholder="How many days?"
              value={days}
              onChangeText={setDays}
              keyboardType="numeric"
            />
          </View>

          {/* Travel Mode */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Travel Mode</Text>
            <View style={styles.optionsContainer}>
              {travelModes.map((mode) => (
                <View key={mode} style={styles.optionWrapper}>
                  {renderOptionButton(mode, travelMode, setTravelMode)}
                </View>
              ))}
            </View>
          </View>

          {/* Traveler Category */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Traveler Category</Text>
            <View style={styles.optionsContainer}>
              {travelerCategories.map((category) => (
                <View key={category} style={styles.optionWrapper}>
                  {renderOptionButton(category, travelerCategory, setTravelerCategory)}
                </View>
              ))}
            </View>
          </View>

          {/* Preference */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Trip Preference</Text>
            <View style={styles.optionsContainer}>
              {preferences.map((pref) => (
                <View key={pref} style={styles.optionWrapper}>
                  {renderOptionButton(pref, preference, setPreference)}
                </View>
              ))}
            </View>
          </View>

          {/* Create Button */}
          <TouchableOpacity 
            style={styles.createButton}
            onPress={handleSaveItinerary}
            disabled={loading}
          >
            <Text style={styles.createButtonText}>
              {loading ? 'Creating...' : 'Create Itinerary'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingTop: 50,
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
    paddingBottom: 100,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    fontSize: 16,
    fontFamily: 'outfit',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  optionWrapper: {
    padding: 5,
  },
  optionButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  selectedOption: {
    backgroundColor: '#3478F6',
    borderColor: '#3478F6',
  },
  optionText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#333',
  },
  selectedOptionText: {
    color: 'white',
    fontFamily: 'outfit-medium',
  },
  createButton: {
    backgroundColor: 'black',
    borderRadius: 15,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'outfit-medium',
  },
});