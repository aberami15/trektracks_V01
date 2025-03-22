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
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import Config from '../../config';
import Footer from '../footer';

export default function PlanGeneration() {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = params.q;
  
  // Initialize form data with proper structure
  const [formData, setFormData] = useState({});
  
  const [loading, setLoading] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    
    fetchTripDetail();
  }, []);
   
  const fetchTripDetail = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error("No authentication token found");
      }
      
      const response = await fetch(`${Config.BASE_URL}/trips/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const responseData = await response.json();
      console.log("Trip details:", responseData.data);
      
      if (responseData.data) {
        // Convert string dates to Date objects if they're strings
        let tripData = { ...responseData.data };
        
        if (typeof tripData.startDate === 'string') {
          tripData.startDate = new Date(tripData.startDate);
        }
        
        if (typeof tripData.endDate === 'string') {
          tripData.endDate = new Date(tripData.endDate);
        }
        
        setFormData(tripData);
      }
    } catch (error) {
      console.error('Error fetching trip:', error);
      Alert.alert('Error', 'Failed to load trip details');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  
  // Handle date changes
  const onStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
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
    if (!date) return "";
    
    try {
      const dateObj = new Date(date);
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      console.log(dateObj.toLocaleDateString('en-US', options))
      return dateObj.toLocaleDateString('en-US', options); 
    } catch (error) {
      console.error("Error formatting date:", error);
      return String(date);
    }
  };
  
  // Submit form
  const handleSubmit = async () => {
    // Validate form
    if (!formData.from || !formData.destination) {
      Alert.alert('Missing Information', 'Please enter both start and end locations');
      return;
    }
    
    setLoading(true);
    
    try {
      // Get user ID from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error("No authentication token found");
      }
      
      // Prepare data to send
      const dataToSend = {
        tripId:id,
        endDate: formData.endDate,
        startDate: formData.startDate,
        startLocation: formData.from,
        endLocation: formData.destination,
        numPersons: formData.numPersons,
        tripPreference : formData.tripType,
        travelerType: formData.tripType,
        transportMode: formData.vehicle
      };
      
      // Make API call
      const response = await fetch(`${Config.BASE_URL}/travel/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate itinerary');
      }
      
      const responseData = await response.json();
      console.log(responseData)
      
      // Success - Navigate to show plan page
      Alert.alert(
        'Itinerary Generated',
        'Your AI-generated itinerary is ready to view!',
        [
          {
            text: 'View Itinerary',
            onPress: () => router.push(`/show-plan?q=${encodeURIComponent(id)}`)
          }
        ]
      );
    } catch (error) {
      console.error('Error generating itinerary:', error);
      Alert.alert('Error', error.message || 'Failed to generate itinerary');
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
        <Text style={styles.headerTitle}>Generate Trip</Text>
      </View>
      
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#3478F6" />
          <Text style={styles.loadingText}>Loading trip details...</Text>
        </View>
      )}
      
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.formContainer}>
        <Text style={styles.formTitle}>Plan Your Sri Lanka Adventure</Text>
        <Text style={styles.formSubtitle}>Fill in the details and we'll generate a custom itinerary for you</Text>
        
        {/* Start Location */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Starting From</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., Colombo Airport"
            value={formData.from}
            onChangeText={(text) => handleInputChange('from', text)}
          />
        </View>
        
        {/* End Location */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ending At</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., Colombo City"
            value={formData.destination}
            onChangeText={(text) => handleInputChange('destination', text)}
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
                value={
                  formData.startDate instanceof Date && !isNaN(formData.startDate)
                    ? formData.startDate
                    : new Date()
                }
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
                value={
                  formData.endDate instanceof Date && !isNaN(formData.endDate)
                    ? formData.endDate
                    : new Date(Date.now() + 86400000 * 7)
                }
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onEndDateChange}
                minimumDate={
                  formData.startDate instanceof Date && !isNaN(formData.startDate)
                    ? new Date(formData.startDate.getTime() + 86400000)
                    : new Date(Date.now() + 86400000)
                }
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
            value={formData.numPersons ? String(formData.numPersons) : ""}
            onChangeText={(text) => handleInputChange('numPersons', text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
          />
        </View>
        
        {/* Traveler Type */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Traveler Type</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., Solo, Family, Group"
            value={formData.tripType}
            onChangeText={(text) => handleInputChange('tripType', text)}
          />
        </View>
        
        {/* Transport Mode */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Transport Mode</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., Public Transport, Private Car"
            value={formData.vehicle}
            onChangeText={(text) => handleInputChange('vehicle', text)}
          />
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
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'outfit-medium',
    color: '#333',
  }
});