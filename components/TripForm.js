import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import Config from '../config';

const TripForm = ({ navigation, router, isAIPlanner = false }) => {
  // Form state
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState('');
  const [from, setFrom] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelerCategory, setTravelerCategory] = useState('');
  const [tripType, setTripType] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiPlanLoading, setAIPlanLoading] = useState(false);
  const [aiPlanResult, setAIPlanResult] = useState(null);
  const [error, setError] = useState(null);

  // Modal visibility states
  const [daysModalVisible, setDaysModalVisible] = useState(false);
  const [startDateModalVisible, setStartDateModalVisible] = useState(false);
  const [endDateModalVisible, setEndDateModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [tripTypeModalVisible, setTripTypeModalVisible] = useState(false);
  const [vehicleModalVisible, setVehicleModalVisible] = useState(false);

  // Options for dropdowns
  const daysOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "14", "21", "30"];
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

  const handleSaveRegularTrip = async () => {
    // Validate required fields
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

    if (!from) {
      ToastAndroid.show('Please enter your current location', ToastAndroid.SHORT);
      return;
    }

    if (!budget) {
      ToastAndroid.show('Please enter your budget', ToastAndroid.SHORT);
      return;
    }

    // Validate that end date is after start date
    if (new Date(endDate) <= new Date(startDate)) {
      ToastAndroid.show('End date must be after start date', ToastAndroid.SHORT);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      
      if (!token) {
        ToastAndroid.show('Authentication required. Please login again.', ToastAndroid.LONG);
        router.replace('/auth/sign-in');
        return;
      }
      
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      // Create request payload
      const tripData = {
        destination: destination,
        startDate: startDate,
        from: from,
        endDate: endDate,
        travelCategory: travelerCategory,
        tripType: tripType,
        vehicle: vehicle,
        budget: parseInt(budget), // Convert to number
        currency: "LKR", // Hardcoded as mentioned in your data model
        description: description,
        userId: userId
      };
      
      console.log("Creating trip with data:", tripData);
      
      // Make API request
      const response = await fetch(`${Config.BASE_URL}/api/ai/generate-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tripDetails)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Server responded with status ${response.status}`);
      }
      
      const responseData = await response.json();
      console.log("Trip created successfully:", responseData);
      
      ToastAndroid.show('Trip created successfully!', ToastAndroid.LONG);
      router.push('/trip-itinerary');
    } catch (error) {
      console.error("Error creating trip:", error);
      setError(error.message || 'Failed to create trip. Please try again.');
      ToastAndroid.show(error.message || 'Failed to create trip', ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAIPlan = async () => {
    // Validate required fields for AI plan
    if (!destination) {
      ToastAndroid.show('Please enter a destination', ToastAndroid.SHORT);
      return;
    }

    if (!days) {
      ToastAndroid.show('Please select number of days', ToastAndroid.SHORT);
      return;
    }

    if (!from) {
      ToastAndroid.show('Please enter your current location', ToastAndroid.SHORT);
      return;
    }

    if (!budget) {
      ToastAndroid.show('Please enter your budget', ToastAndroid.SHORT);
      return;
    }

    try {
      setAIPlanLoading(true);
      setError(null);

      // Create request payload for Gemini AI trip plan
      const tripDetails = {
        travelerCategory: travelerCategory || 'Solo',
        tripType: tripType || 'Cultural',
        destination: destination,
        from: from,
        days: days,
        budget: budget,
        vehicle: vehicle || 'Car'
      };
      
      console.log("Generating AI trip plan with data:", tripDetails);
      
      // Call the Gemini API endpoint
      const response = await fetch(`${Config.BASE_URL}/gemini/generate-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tripDetails)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Server responded with status ${response.status}`);
      }
      
      const responseData = await response.json();
      console.log("AI Plan generated successfully:", responseData);
      
      // Store the AI plan result
      setAIPlanResult(responseData.data.plan);
      
      ToastAndroid.show('Trip plan generated successfully!', ToastAndroid.LONG);
      
      // Navigate to plan display page or save the plan
      // For now, we'll just navigate to budget planner
      router.push({
        pathname: '/budget-planner',
        params: { aiPlan: encodeURIComponent(JSON.stringify(responseData.data.plan)) }
      });
    } catch (error) {
      console.error("Error generating AI plan:", error);
      setError(error.message || 'Failed to generate AI plan. Please try again.');
      ToastAndroid.show(error.message || 'Failed to generate AI plan', ToastAndroid.LONG);
    } finally {
      setAIPlanLoading(false);
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

  const handleSaveForLater = () => {
    if (!destination) {
      ToastAndroid.show('Please enter a destination', ToastAndroid.SHORT);
      return;
    }

    ToastAndroid.show('Saved for later!', ToastAndroid.SHORT);
    // Implement save for later functionality
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Current Location / From */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Current Location</Text>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Enter your current location"
              value={from}
              onChangeText={setFrom}
            />
            <Ionicons name="location" size={20} color="#999" style={styles.searchIcon} />
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
            <Ionicons name="location" size={20} color="#999" style={styles.dropdownIcon} />
          </View>
        </View>

        {/* Days (for AI Plan) or Start/End Date (for regular trip) */}
        {isAIPlanner ? (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Days</Text>
            <TouchableOpacity 
              style={styles.dropdownField}
              onPress={() => setDaysModalVisible(true)}
            >
              <Text style={[styles.dropdownText, !days && styles.placeholderText]}>
                {days || "Select number of days"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#999" style={styles.dropdownIcon} />
            </TouchableOpacity>
          </View>
        ) : (
          <>
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
          </>
        )}

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

        {/* Description (only for regular trip) */}
        {!isAIPlanner && (
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
        )}

        {/* Error message if there's an error */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={styles.saveForLaterButton}
            onPress={handleSaveForLater}
            disabled={loading || aiPlanLoading}
          >
            <Ionicons name="bookmark-outline" size={18} color="#333" />
            <Text style={styles.saveForLaterText}>Save for Later</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.generatePlanButton}
            onPress={isAIPlanner ? handleGenerateAIPlan : handleSaveRegularTrip}
            disabled={loading || aiPlanLoading}
          >
            {loading || aiPlanLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.generatePlanText}>
                {isAIPlanner ? 'Generate AI Plan' : 'Create Trip'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Dropdown Modals */}
      {renderDropdownModal(
        daysModalVisible, 
        setDaysModalVisible, 
        "Select Number of Days", 
        daysOptions, 
        days, 
        setDays
      )}

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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  errorText: {
    color: '#d32f2f',
    fontFamily: 'outfit',
    fontSize: 14,
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

export default TripForm;