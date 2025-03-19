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
  Platform, 
  Modal, 
  FlatList,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';

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
    if (!start || !end) return 1;
    
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays || 1; // Default to 1 day if calculation fails
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

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/gemini/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          destination: destination,
          startDate: startDate,
          from: currentLocation || 'Colombo',
          endDate: endDate,
          travelerCategory: travelerCategory,
          tripType: tripType,
          vehicle: vehicle,
          budget: budget,
          description: description
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `API request failed with status ${response.status}`);
      }

      console.log("Trip saved successfully");
      return true;
    } catch (error) {
      console.error("Error creating trip:", error);
      ToastAndroid.show('Failed to create trip', ToastAndroid.LONG);
      return false;
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

  const handleGeneratePlan = async () => {
    try {
      // First save the trip data
      const saveSuccess = await handleSaveItinerary();
      if (!saveSuccess) {
        throw new Error('Failed to save trip data');
      }
      
      // Show loading state
      setLoading(true);
      
      // Prepare data for the Gemini API
      const token = localStorage.getItem('token');
      const tripDetails = {
        travelerCategory: travelerCategory || "Solo",
        tripType: tripType || "Adventure",
        destination: destination,
        from: currentLocation || "Colombo",
        days: calculateDays(startDate, endDate).toString(),
        budget: budget || "50000",
        vehicle: vehicle || "Car"
      };
      
      // Call the Gemini API
      const response = await fetch('http://localhost:5000/api/gemini/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(tripDetails)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      // Store the generated plan in localStorage (temporary solution)
      if (data && data.data && data.data.plan) {
        localStorage.setItem('generatedPlan', data.data.plan);
        
        // Navigate to a plan display page
        router.push('/plan-display');
      } else {
        throw new Error('Received invalid plan data from API');
      }
    } catch (error) {
      console.error("Error generating plan:", error);
      Alert.alert(
        "Generation Error",
        "Failed to generate travel plan. Please try again.",
        [{ text: "OK" }]
      );
      // Navigate anyway to avoid user being stuck
      router.push('/budget-planner');
    } finally {
      setLoading(false);
    }
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
                placeholder="Search destination"
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
            <Text style={styles.inputLabel}>Description</Text>
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
              style={styles.generatePlanButton}
              onPress={handleGeneratePlan}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.generatePlanText}>Create Trip</Text>
              )}
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
  },
  generatePlanText: {
    fontFamily: 'outfit-medium',
    fontSize: 14,
    color: 'white',
  },
});