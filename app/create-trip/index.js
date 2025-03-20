import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  ActivityIndicator,
  Alert,
  Platform
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import Config from '../../config';
import Footer from '../footer';

export default function CreateTrip() {
  const navigation = useNavigation();
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    startLocation: '',
    endLocation: '',
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)), // Default to 1 week
    numPersons: '1',
    travelerType: 'Solo',
    tripPreference: 'General',
    transportMode: 'Public Transport',
  });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  
  // Dropdown options
  const travelerTypes = ['Solo', 'Couple', 'Family', 'Friends', 'Group'];
  const preferenceTypes = ['General', 'Adventure', 'Cultural', 'Beach', 'Nature', 'Wildlife', 'Luxury'];
  const transportModes = ['Public Transport', 'Private Car', 'Tuk Tuk', 'Rental Vehicle', 'Tour Bus'];
  
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    
    // Get user ID from AsyncStorage
    const getUserId = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // Decode token to get user ID (simplified version)
          // In reality, you might want to make an API call to get user info
          const tokenParts = token.split('.');
          if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            setUserId(payload.id);
          }
        }
      } catch (error) {
        console.error('Error getting user ID:', error);
      }
    };
    
    getUserId();
  }, []);
  
  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  
  // Handle date changes
  const onStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setFormData({ ...formData, startDate: selectedDate });
      
      // Update end date if it's before start date
      if (formData.endDate < selectedDate) {
        const newEndDate = new Date(selectedDate);
        newEndDate.setDate(selectedDate.getDate() + 1);
        setFormData(prev => ({
          ...prev,
          startDate: selectedDate,
          endDate: newEndDate
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          startDate: selectedDate
        }));
      }
    }
  };
  
  const onEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      if (selectedDate > formData.startDate) {
        setFormData({ ...formData, endDate: selectedDate });
      } else {
        Alert.alert("Invalid Date", "End date must be after start date");
      }
    }
  };
  
  // Format date for display
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  // Submit form
  const handleSubmit = async () => {
    // Validate form
    if (!formData.startLocation || !formData.endLocation) {
      Alert.alert('Missing Information', 'Please enter both start and end locations');
      return;
    }
    
    setLoading(true);
    
    try {
      // Add user ID to form data
      const dataToSend = {
        ...formData,
        userId: userId
      };
      
      // Make API call
      const response = await fetch(`${Config.BASE_URL}/api/travel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create trip');
      }
      
      const responseData = await response.json();
      
      // Success - Navigate to trip details page
      Alert.alert(
        'Trip Created',
        'Your trip was created successfully and an AI-generated itinerary has been created!',
        [
          {
            text: 'View Itinerary',
            onPress: () => router.push(`/trip-itinerary?id=${responseData.data.tripId}`)
          }
        ]
      );
    } catch (error) {
      console.error('Error creating trip:', error);
      Alert.alert('Error', error.message || 'Failed to create trip');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#3478F6" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Trip</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.formContainer}>
        <Text style={styles.formTitle}>Plan Your Sri Lanka Adventure</Text>
        <Text style={styles.formSubtitle}>Fill in the details and we'll generate a custom itinerary for you</Text>
        
        {/* Start Location */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Starting From</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., Colombo Airport"
            value={formData.startLocation}
            onChangeText={(text) => handleInputChange('startLocation', text)}
          />
        </View>
        
        {/* End Location */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ending At</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., Colombo City"
            value={formData.endLocation}
            onChangeText={(text) => handleInputChange('endLocation', text)}
          />
        </View>
        
        {/* Date Row */}
        <View style={styles.dateRow}>
          {/* Start Date */}
          <View style={styles.dateInputGroup}>
            <Text style={styles.label}>Start Date</Text>
            <TouchableOpacity 
              style={styles.dateInput}
              onPress={() => setShowStartDatePicker(true)}
            >
              <Text style={styles.dateText}>{formatDate(formData.startDate)}</Text>
              <Ionicons name="calendar" size={20} color="#3478F6" />
            </TouchableOpacity>
            {showStartDatePicker && (
              <DateTimePicker
                value={formData.startDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onStartDateChange}
                minimumDate={new Date()}
              />
            )}
          </View>
          
          {/* End Date */}
          <View style={styles.dateInputGroup}>
            <Text style={styles.label}>End Date</Text>
            <TouchableOpacity 
              style={styles.dateInput}
              onPress={() => setShowEndDatePicker(true)}
            >
              <Text style={styles.dateText}>{formatDate(formData.endDate)}</Text>
              <Ionicons name="calendar" size={20} color="#3478F6" />
            </TouchableOpacity>
            {showEndDatePicker && (
              <DateTimePicker
                value={formData.endDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onEndDateChange}
                minimumDate={new Date(formData.startDate.getTime() + 86400000)} // +1 day from start date
              />
            )}
          </View>
        </View>
        
        {/* Number of Persons */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Number of Travelers</Text>
          <TextInput
            style={styles.input}
            placeholder="Number of persons"
            value={formData.numPersons}
            onChangeText={(text) => handleInputChange('numPersons', text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
          />
        </View>
        
        {/* Traveler Type */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Traveler Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.travelerType}
              onValueChange={(value) => handleInputChange('travelerType', value)}
              style={styles.picker}
            >
              {travelerTypes.map((type) => (
                <Picker.Item key={type} label={type} value={type} />
              ))}
            </Picker>
          </View>
        </View>
        
        {/* Trip Preference */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Trip Preference</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.tripPreference}
              onValueChange={(value) => handleInputChange('tripPreference', value)}
              style={styles.picker}
            >
              {preferenceTypes.map((type) => (
                <Picker.Item key={type} label={type} value={type} />
              ))}
            </Picker>
          </View>
        </View>
        
        {/* Transport Mode */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Transport Mode</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.transportMode}
              onValueChange={(value) => handleInputChange('transportMode', value)}
              style={styles.picker}
            >
              {transportModes.map((mode) => (
                <Picker.Item key={mode} label={mode} value={mode} />
              ))}
            </Picker>
          </View>
        </View>
        
        {/* Submit Button */}
        <TouchableOpacity 
          style={[styles.button, loading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <Text style={styles.buttonText}>Generate Itinerary</Text>
              <Ionicons name="paper-plane" size={20} color="white" style={styles.buttonIcon} />
            </>
          )}
        </TouchableOpacity>
        
        <View style={styles.spacer}></View>
      </ScrollView>
      
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#3478F6',
    marginLeft: 5,
    fontSize: 16,
    fontFamily: 'outfit-medium',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
    fontFamily: 'outfit-bold',
    marginRight: 40, // Offset for back button to center the title
  },
  scrollContainer: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
    paddingBottom: 100, // Extra padding for footer
  },
  formTitle: {
    fontSize: 22,
    fontFamily: 'outfit-bold',
    color: '#333',
    marginBottom: 10,
  },
  formSubtitle: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: '#666',
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'outfit-medium',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    fontFamily: 'outfit',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateInputGroup: {
    width: '48%', // Just under 50% to give a little gap
  },
  dateInput: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'outfit',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#3478F6',
    padding: 18,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#a0c0f0',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'outfit-medium',
  },
  buttonIcon: {
    marginLeft: 10,
  },
  spacer: {
    height: 50, // Space at the bottom of the form
  },
});