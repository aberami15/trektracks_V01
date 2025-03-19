import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView,
  ToastAndroid, KeyboardAvoidingView, Platform, Modal, FlatList, Image, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORTANT: Replace with your actual server IP address
const SERVER_IP = '192.168.x.x'; // ← CHANGE THIS to your computer's local IP

export default function CreateTrip() {
  const navigation = useNavigation();
  const router = useRouter();
  
  // Form state
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelerCategory, setTravelerCategory] = useState('');
  const [tripType, setTripType] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');

  // Modal visibility states
  const [startDateModalVisible, setStartDateModalVisible] = useState(false);
  const [endDateModalVisible, setEndDateModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [tripTypeModalVisible, setTripTypeModalVisible] = useState(false);
  const [vehicleModalVisible, setVehicleModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  // Options for dropdowns
  const travelerCategories = ["Solo", "Couple", "Family", "Friends", "Group Tour"];
  const tripTypes = ["Adventure", "Relaxation", "Cultural", "Devotional", "Food & Cuisine", "Nature", "Photography"];
  const vehicleOptions = ["Car", "Public Transport", "Bike", "Walking", "Plane", "Train", "Bus"];

  // Generate date options for next 365 days
  const generateDateOptions = () => {
    const dateOptions = [];
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      dateOptions.push(formattedDate);
    }
    
    return dateOptions;
  };

  const dateOptions = generateDateOptions();

  // Helper function to calculate days between dates
  const calculateDays = (start, end) => {
    if (!start || !end) return "1";
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    return diffDays.toString();
  };

  const handleSaveItinerary = async () => {
    if (!destination) {
      ToastAndroid.show('Please enter a destination', ToastAndroid.SHORT);
      return;
    }

    if (!startDate) {
      ToastAndroid.show('Please select start date', ToastAndroid.SHORT);
      return;
    }

    if (!endDate) {
      ToastAndroid.show('Please select end date', ToastAndroid.SHORT);
      return;
    }

    if (!currentLocation) {
      ToastAndroid.show('Please enter your current location', ToastAndroid.SHORT);
      return;
    }

    try {
      setLoading(true);
      // Get token (using await with AsyncStorage)
      let token;
      try {
        token = await AsyncStorage.getItem('token');
      } catch (error) {
        console.error("Error getting token:", error);
        token = null;
      }

      console.log("Generating AI plan with:", {
        travelerCategory: travelerCategory || 'Solo',
        tripType: tripType || 'General',
        destination: destination,
        from: currentLocation,
        days: calculateDays(startDate, endDate),
        budget: budget || '50000',
        vehicle: vehicle || 'Public Transport'
      });

      // DIRECT HTTP call instead of using a helper
      const apiUrl = Platform.select({
        // Use 10.0.2.2 for Android emulator
        android: `http://10.0.2.2:5000`,
        // Use localhost for iOS
        ios: `http://localhost:5000`,
        // For testing on physical devices, use your computer's IP
        default: `http://${SERVER_IP}:5000`
      });

      console.log(`Using API URL: ${apiUrl}`);

      // First attempt to ping server to test connectivity
      try {
        const pingResponse = await fetch(`${apiUrl}/test`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (pingResponse.ok) {
          console.log("Server connectivity test successful");
        } else {
          console.error("Server ping failed:", await pingResponse.text());
        }
      } catch (pingError) {
        console.error("Server ping error:", pingError);
        Alert.alert(
          "Server Connection Error",
          `Cannot connect to server. Make sure your backend is running and check the IP address: ${apiUrl}`
        );
        setLoading(false);
        return;
      }

      // Now call the Gemini API endpoint
      const response = await fetch(`${apiUrl}/api/gemini/generate-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({
          travelerCategory: travelerCategory || 'Solo',
          tripType: tripType || 'General',
          destination: destination,
          from: currentLocation,
          days: calculateDays(startDate, endDate),
          budget: budget || '50000',
          vehicle: vehicle || 'Public Transport'
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error: ${response.status} - ${errorText}`);
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("Generated plan:", data);
      
      // Save the trip information
      const tripData = {
        destination: destination,
        startDate: startDate,
        from: currentLocation,
        endDate: endDate,
        travelCategory: travelerCategory || 'Solo',
        tripType: tripType || 'General',
        vehicle: vehicle || 'Public Transport',
        budget: budget || '50000',
        description: description || ''
      };

      try {
        const tripResponse = await fetch(`${apiUrl}/api/trips`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
          },
          body: JSON.stringify(tripData)
        });

        const tripResult = await tripResponse.json();
        console.log("Trip saved:", tripResult);
      } catch (tripError) {
        console.error("Error saving trip:", tripError);
        // Continue anyway to show the generated plan
      }

      // Navigate with the plan data - using a simplified approach
      if (data && data.data && data.data.plan) {
        try {
          // Store plan in AsyncStorage for retrieval
          await AsyncStorage.setItem('generatedPlan', data.data.plan);
          
          // Navigate to plan display page
          router.push('/plan-display');
        } catch (navError) {
          console.error("Navigation error:", navError);
          Alert.alert(
            "Success, but navigation failed",
            "Your plan was generated successfully, but we couldn't navigate to the display page."
          );
        }
      } else {
        Alert.alert(
          "Generation Error",
          "Plan was generated but the response format was unexpected."
        );
      }
    } catch (error) {
      console.error("Error creating itinerary:", error);
      Alert.alert(
        "Error",
        `Failed to create itinerary: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const renderDropdownItem = (item, setSelected, closeModal) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => {
        setSelected(item);
        closeModal();
      }}
    >
      <Text style={styles.dropdownItemText}>{item}</Text>
    </TouchableOpacity>
  );

  // Generic dropdown modal
  const renderDropdownModal = (visible, setVisible, title, data, selectedValue, setSelectedValue) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={data}
            renderItem={({ item }) => renderDropdownItem(item, setSelectedValue, () => setVisible(false))}
            keyExtractor={(item) => item}
            style={styles.dropdownList}
          />
        </View>
      </View>
    </Modal>
  );

  const handleGeneratePlan = () => {
    // First save the itinerary
    handleSaveItinerary();
  };

  const handleSaveForLater = () => {
    if (!destination) {
      ToastAndroid.show('Please enter a destination', ToastAndroid.SHORT);
      return;
    }

    ToastAndroid.show('Saved for later!', ToastAndroid.SHORT);
    // Implement save for later functionality
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button to Homepage */}
      <TouchableOpacity onPress={() => router.push('/trip-itinerary')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={20} color="#333" />
      </TouchableOpacity>

      {/* Header with profile photo */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fill This Out!</Text>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Image
            source={require('../../assets/images/profile.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
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
          {/* Search Text */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Current Location</Text>
            <View style={styles.searchInputContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Enter your current location"
                value={currentLocation}
                onChangeText={setCurrentLocation}
              />
              <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            </View>
          </View>

          {/* Destination */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Destination</Text>
            <View style={styles.dropdownField}>
              <TextInput
                style={styles.input}
                placeholder="Enter destination"
                value={destination}
                onChangeText={setDestination}
              />
              <Ionicons name="search" size={20} color="#999" style={styles.dropdownIcon} />
            </View>
          </View>

          {/* Start Date - New field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Start Date</Text>
            <TouchableOpacity 
              style={styles.dropdownField}
              onPress={() => setStartDateModalVisible(true)}
            >
              <Text style={[styles.dropdownText, !startDate && styles.placeholderText]}>
                {startDate || "Select start date"}
              </Text>
              <Ionicons name="calendar" size={20} color="#999" style={styles.dropdownIcon} />
            </TouchableOpacity>
          </View>

          {/* End Date - New field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>End Date</Text>
            <TouchableOpacity 
              style={styles.dropdownField}
              onPress={() => setEndDateModalVisible(true)}
            >
              <Text style={[styles.dropdownText, !endDate && styles.placeholderText]}>
                {endDate || "Select end date"}
              </Text>
              <Ionicons name="calendar" size={20} color="#999" style={styles.dropdownIcon} />
            </TouchableOpacity>
          </View>

          {/* Budget */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Budget (LKR)</Text>
            <View style={styles.dropdownField}>
              <TextInput
                style={styles.input}
                placeholder="Enter your budget"
                value={budget}
                onChangeText={setBudget}
                keyboardType="numeric"
              />
              <Ionicons name="wallet-outline" size={20} color="#999" style={styles.dropdownIcon} />
            </View>
          </View> 

          {/* Traveler Category */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Traveller Category</Text>
            <TouchableOpacity 
              style={styles.dropdownField}
              onPress={() => setCategoryModalVisible(true)}
            >
              <Text style={[styles.dropdownText, !travelerCategory && styles.placeholderText]}>
                {travelerCategory || "Select traveler category"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#999" style={styles.dropdownIcon} />
            </TouchableOpacity>
          </View>

          {/* Trip Type */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Trip Type</Text>
            <TouchableOpacity 
              style={styles.dropdownField}
              onPress={() => setTripTypeModalVisible(true)}
            >
              <Text style={[styles.dropdownText, !tripType && styles.placeholderText]}>
                {tripType || "Select trip type"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#999" style={styles.dropdownIcon} />
            </TouchableOpacity>
          </View>

          {/* Vehicle */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Vehicle</Text>
            <TouchableOpacity 
              style={styles.dropdownField}
              onPress={() => setVehicleModalVisible(true)}
            >
              <Text style={[styles.dropdownText, !vehicle && styles.placeholderText]}>
                {vehicle || "Select vehicle"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#999" style={styles.dropdownIcon} />
            </TouchableOpacity>
          </View>

          {/* Description - New field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description (Optional)</Text>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                placeholder="Enter trip description"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity 
              style={styles.saveForLaterButton}
              onPress={handleSaveForLater}
            >
              <Ionicons name="bookmark-outline" size={18} color="#333" />
              <Text style={styles.saveForLaterText}>Save for Later</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.generatePlanButton, loading && styles.disabledButton]}
              onPress={handleGeneratePlan}
              disabled={loading}
            >
              <Text style={styles.generatePlanText}>
                {loading ? 'Creating...' : 'Create Trip'}
              </Text>
              {loading && <ActivityIndicator size="small" color="white" style={{marginLeft: 8}} />}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Dropdown Modals */}
      {renderDropdownModal(
        startDateModalVisible, 
        setStartDateModalVisible, 
        "Select Start Date", 
        dateOptions, 
        startDate, 
        setStartDate
      )}

      {renderDropdownModal(
        endDateModalVisible, 
        setEndDateModalVisible, 
        "Select End Date", 
        dateOptions, 
        endDate, 
        setEndDate
      )}

      {renderDropdownModal(
        categoryModalVisible, 
        setCategoryModalVisible, 
        "Select Traveler Category", 
        travelerCategories, 
        travelerCategory, 
        setTravelerCategory
      )}

      {renderDropdownModal(
        tripTypeModalVisible, 
        setTripTypeModalVisible, 
        "Select Trip Type", 
        tripTypes, 
        tripType, 
        setTripType
      )}

      {renderDropdownModal(
        vehicleModalVisible, 
        setVehicleModalVisible, 
        "Select Vehicle", 
        vehicleOptions, 
        vehicle, 
        setVehicle
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 50, 
    left: 20, 
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    color: '#333',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'outfit-bold'
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'outfit',
  },
  searchIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'outfit',
  },
  dropdownField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 50,
  },
  dropdownText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'outfit',
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  dropdownIcon: {
    marginLeft: 10,
  },
  // For the description text area
  textAreaContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
  },
  textArea: {
    fontFamily: 'outfit',
    fontSize: 16,
    minHeight: 100,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  modalTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: '#333',
  },
  dropdownList: {
    maxHeight: 300,
  },
  dropdownItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  dropdownItemText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#333',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  saveForLaterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  saveForLaterText: {
    fontFamily: 'outfit-medium',
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  generatePlanButton: {
    backgroundColor: '#3478F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  disabledButton: {
    backgroundColor: '#a0c0f0',
  },
  generatePlanText: {
    fontFamily: 'outfit-medium',
    fontSize: 14,
    color: 'white',
  },
});