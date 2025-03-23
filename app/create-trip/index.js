import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
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
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';
import Footer from '../footer';
import Config from '../../config';

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
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState('');

  // Calendar modal states
  const [startCalendarVisible, setStartCalendarVisible] = useState(false);
  const [endCalendarVisible, setEndCalendarVisible] = useState(false);
  
  // Modal visibility states for other dropdowns
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [tripTypeModalVisible, setTripTypeModalVisible] = useState(false);
  const [vehicleModalVisible, setVehicleModalVisible] = useState(false);

  // Get today's date in YYYY-MM-DD format for calendar min date
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  // Options for dropdowns
  const travelerCategories = ["Solo", "Couple", "Family", "Friends", "Group Tour"];
  const tripTypes = ["Adventure", "Relaxation", "Cultural", "Devotional", "Food & Cuisine", "Nature", "Photography"];
  const vehicleOptions = ["Car", "Public Transport", "Bike", "Walking", "Plane", "Train", "Bus"];

  const handleSaveItinerary = async () => {
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

    if (!currentLocation) {
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
      
      const tokenPromise = AsyncStorage.getItem('token');
      const token2 = await tokenPromise;
      if (!token2) {
        console.error("No authentication token found");
        setLoading(false);
        return;
      }
      const decodedToken = jwtDecode(token2);
      const x = decodedToken.id;
      const userId = x;

      // Create request payload
      const tripData = {
        destination: destination,
        startDate: startDate,
        from: currentLocation,
        endDate: endDate,
        travelerCategory: travelerCategory,
        tripType: tripType,
        vehicle: vehicle,
        budget: parseInt(budget), // Convert to number
        currency: "LKR", // Hardcoded as mentioned in your data model
        description: description,
        userId: userId
      };
      
      console.log("Creating trip with data:", tripData);
      
      // Make API request
      const response = await fetch(`${Config.BASE_URL}/trips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tripData)
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

  // Calendar modal for date selection
  const renderCalendarModal = (visible, setVisible, title, selectedDate, setSelectedDate, minDate) => (
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
          
          <Calendar
            current={selectedDate || today}
            minDate={minDate || today}
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
              setVisible(false);
            }}
            markedDates={{
              [selectedDate]: {selected: true, marked: true, selectedColor: '#2A9D8F'}
            }}
            theme={{
              selectedDayBackgroundColor: '#2A9D8F',
              todayTextColor: '#2A9D8F',
              arrowColor: '#2A9D8F',
            }}
          />
        </View>
      </View>
    </Modal>
  );

  const handleGeneratePlan = () => {
    // First save the itinerary
    handleSaveItinerary();
  };

  const handleBack = () => {
    router.back(); // Navigate back to the previous screen
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
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Your Trip</Text>
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
          showsVerticalScrollIndicator={false}
        >
          {/* Current Location */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Current Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your current location"
              value={currentLocation}
              onChangeText={setCurrentLocation}
            />
          </View>

          {/* Destination */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Destination</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter destination"
              value={destination}
              onChangeText={setDestination}
            />
          </View>

          {/* Date Row */}
          <View style={styles.dateRow}>
            {/* Start Date */}
            <View style={[styles.inputContainer, {flex: 1, marginRight: 10}]}>
              <Text style={styles.inputLabel}>Start Date</Text>
              <TouchableOpacity 
                style={styles.dateInput}
                onPress={() => setStartCalendarVisible(true)}
              >
                <Text style={[styles.dateText, !startDate && styles.placeholderText]}>
                  {startDate || "Select date"}
                </Text>
                <Ionicons name="calendar-outline" size={20} color="#777" />
              </TouchableOpacity>
            </View>

            {/* End Date */}
            <View style={[styles.inputContainer, {flex: 1}]}>
              <Text style={styles.inputLabel}>End Date</Text>
              <TouchableOpacity 
                style={styles.dateInput}
                onPress={() => setEndCalendarVisible(true)}
              >
                <Text style={[styles.dateText, !endDate && styles.placeholderText]}>
                  {endDate || "Select date"}
                </Text>
                <Ionicons name="calendar-outline" size={20} color="#777" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Budget */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Budget (LKR)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your budget"
              value={budget}
              onChangeText={setBudget}
              keyboardType="numeric"
            />
          </View> 

          {/* Traveler Category */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Traveller Category</Text>
            <TouchableOpacity 
              style={styles.dropdownInput}
              onPress={() => setCategoryModalVisible(true)}
            >
              <Text style={[styles.dropdownText, !travelerCategory && styles.placeholderText]}>
                {travelerCategory || "Select traveler category"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#777" />
            </TouchableOpacity>
          </View>

          {/* Trip Type */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Trip Type</Text>
            <TouchableOpacity 
              style={styles.dropdownInput}
              onPress={() => setTripTypeModalVisible(true)}
            >
              <Text style={[styles.dropdownText, !tripType && styles.placeholderText]}>
                {tripType || "Select trip type"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#777" />
            </TouchableOpacity>
          </View>

          {/* Vehicle */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Vehicle</Text>
            <TouchableOpacity 
              style={styles.dropdownInput}
              onPress={() => setVehicleModalVisible(true)}
            >
              <Text style={[styles.dropdownText, !vehicle && styles.placeholderText]}>
                {vehicle || "Select vehicle"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#777" />
            </TouchableOpacity>
          </View>

          {/* Description */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description</Text>
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

          {/* Error message if there's an error */}
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            
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

      <Footer/>

      {/* Calendar Modals */}
      {renderCalendarModal(
        startCalendarVisible,
        setStartCalendarVisible,
        "Select Start Date",
        startDate,
        setStartDate,
        today
      )}

      {renderCalendarModal(
        endCalendarVisible,
        setEndCalendarVisible,
        "Select End Date",
        endDate,
        setEndDate,
        startDate || today
      )}

      {/* Dropdown Modals for other fields */}
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
    backgroundColor: '#CFECEC', // Warm, light sand color background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#43BFC7', // Sri Lankan green color
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  backButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'outfit-bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  inputContainer: {
    marginBottom: 22,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'outfit-medium',
    color: '#333333',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'outfit',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    elevation: 2,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    elevation: 2,
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'outfit',
    color: '#333333',
  },
  dropdownInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    elevation: 2,
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: 'outfit',
    color: '#333333',
  },
  placeholderText: {
    color: '#9E9E9E',
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'outfit',
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    textAlignVertical: 'top',
    elevation: 2,
  },
  errorContainer: {
    backgroundColor: '#FFECEC',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
  errorText: {
    color: '#D32F2F',
    fontFamily: 'outfit',
    fontSize: 14,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 30,
  },
  generatePlanButton: {
    backgroundColor: '#5F9EA0', 
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    elevation: 3,
  },
  generatePlanText: {
    fontFamily: 'outfit-bold',
    fontSize: 16,
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    backgroundColor: '#5F9EA0',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: '#333333',
  },
  dropdownList: {
    maxHeight: 300,
  },
  dropdownItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#333333',
  },
  dropdownItemSelected: {
    backgroundColor: 'rgba(0, 153, 112, 0.1)', // Light green background for selected item
  },
  dropdownItemTextSelected: {
    color: '#009970', // Green text for selected item
    fontFamily: 'outfit-medium',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
    color: '#333333',
    marginBottom: 15,
    marginTop: 5,
  },
  inputIcon: {
    marginRight: 10,
    color: '#009970',
  },
  formHeader: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#009970',
    flexDirection: 'row',
    alignItems: 'center',
  },
  formHeaderText: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  calendarTheme: {
    backgroundColor: '#FFFFFF',
    calendarBackground: '#FFFFFF',
    textSectionTitleColor: '#009970',
    selectedDayBackgroundColor: '#009970',
    selectedDayTextColor: '#FFFFFF',
    todayTextColor: '#F7B500',
    dayTextColor: '#333333',
    textDisabledColor: '#D9E1E8',
    dotColor: '#F7B500',
    selectedDotColor: '#FFFFFF',
    arrowColor: '#009970',
    monthTextColor: '#333333',
    indicatorColor: '#009970',
    textDayFontFamily: 'outfit',
    textMonthFontFamily: 'outfit-medium',
    textDayHeaderFontFamily: 'outfit-medium',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 14,
  },
});