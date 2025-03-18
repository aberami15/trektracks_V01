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
  const [days, setDays] = useState('');

  // Plan state
  const [showPlan, setShowPlan] = useState(false);
  const [plan, setPlan] = useState('');
  const [generatingPlan, setGeneratingPlan] = useState(false);

  // Modal visibility states
  const [startDateModalVisible, setStartDateModalVisible] = useState(false);
  const [endDateModalVisible, setEndDateModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [tripTypeModalVisible, setTripTypeModalVisible] = useState(false);
  const [vehicleModalVisible, setVehicleModalVisible] = useState(false);
  const [daysModalVisible, setDaysModalVisible] = useState(false);
  const [planModalVisible, setPlanModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  // Options for dropdowns
  const travelerCategories = ["Solo", "Couple", "Family", "Friends", "Group Tour"];
  const tripTypes = ["Adventure", "Relaxation", "Cultural", "Devotional", "Food & Cuisine", "Nature", "Photography", "Religious"];
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

  // Options for days dropdown
  const daysOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "14", "21", "30"];
  const dateOptions = generateDateOptions();

  // Calculate days between start and end dates
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const differenceInTime = end - start;
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)) + 1;
      setDays(differenceInDays.toString());
    }
  }, [startDate, endDate]);

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
      setLoading(true); // Set loading to true
      
      // First save the trip to the database
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          destination: destination,
          startDate: startDate,
          from: currentLocation,
          endDate: endDate,
          travelerCategory: travelerCategory,
          tripType: tripType,
          vehicle: vehicle,
          budget: budget,
          description: description
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to save trip');
      }
      
      const savedTrip = await response.json();
      console.log("Trip saved:", savedTrip);
      
      // Calculate the number of days for the trip
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      
      // Now call Gemini API to generate a travel plan
      const geminiResponse = await fetch('http://localhost:5000/api/gemini/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          travelerCategory: travelerCategory || "Solo",  // Default to Solo if not specified
          tripType: tripType || "Adventure",  // Default to Adventure if not specified
          destination: destination,
          from: currentLocation,
          days: days.toString(),
          budget: budget,
          vehicle: vehicle || "Car"  // Default to Car if not specified
        })
      });
      
      if (!geminiResponse.ok) {
        console.error("Failed to generate plan, but trip was saved");
        // Continue anyway since the trip was saved
      } else {
        const planData = await geminiResponse.json();
        console.log("Generated plan:", planData);
        
        // Optionally update the trip with the generated plan
        if (savedTrip.data && savedTrip.data._id) {
          const updateResponse = await fetch(`http://localhost:5000/api/trips/${savedTrip.data._id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              generatedPlan: planData.data.plan
            })
          });
          console.log("Updated trip with plan:", await updateResponse.json());
        }
      }
      
      setLoading(false);
      router.push('/trip-itinerary');
      
    } catch (error) {
      console.error("Error creating itinerary: ", error);
      ToastAndroid.show('Failed to create itinerary', ToastAndroid.SHORT);
      setLoading(false);
    }
  };

  const handleGeneratePlan = async () => {
    // Validate required fields
    if (!destination || !currentLocation || !days || !travelerCategory || !tripType || !vehicle || !budget) {
      ToastAndroid.show('Please fill all the required fields', ToastAndroid.SHORT);
      return;
    }

    try {
      setGeneratingPlan(true);
      
      // Call the Gemini API through our backend
      const response = await fetch('http://localhost:5000/api/gemini/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          travelerCategory,
          tripType,
          destination,
          from: currentLocation,
          days,
          budget,
          vehicle
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setPlan(data.data.plan);
      setShowPlan(true);
      setPlanModalVisible(true);
      
    } catch (error) {
      console.error("Error generating plan: ", error);
      ToastAndroid.show('Failed to generate plan', ToastAndroid.SHORT);
    } finally {
      setGeneratingPlan(false);
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
    <SafeAreaView style={styles.container}>
      {/* Back Button to Homepage */}
      <TouchableOpacity onPress={() => router.push('/trip-itinerary')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={20} color="#333" />
      </TouchableOpacity>

      {/* Header with profile photo */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create a New Trip</Text>
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

          {/* Days */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Duration (Days)</Text>
            <View style={styles.dropdownField}>
              <Text style={[styles.dropdownText, !days && styles.placeholderText]}>
                {days || "Calculated from dates"}
              </Text>
              <Ionicons name="time-outline" size={20} color="#999" style={styles.dropdownIcon} />
            </View>
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

          {/* Generate Plan Button */}
          <TouchableOpacity 
            style={styles.generatePlanButton}
            onPress={handleGeneratePlan}
            disabled={generatingPlan}
          >
            {generatingPlan ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <>
                <Text style={styles.generatePlanText}>Generate Trip Plan</Text>
                <Ionicons name="document-text" size={18} color="white" style={{ marginLeft: 8 }} />
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.aiSuggestButton}
            onPress={() => {
              // Call the AI API for suggestions
              if (destination) {
                // Logic to fetch AI suggestions for the selected destination
                fetch(`http://localhost:5000/api/gemini/generate-plan`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  destination: destination,
                  days: startDate && endDate ? 
                    Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) : 3,
                  tripType: tripType || 'General',
                  vehicle: vehicle || 'Mixed'
                })
              })
              .then(response => response.json())
              .then(data => {
                // Show suggestions to the user
                alert("AI Suggestions: " + data.data.plan.substring(0, 200) + "...");
                // You could show this in a modal or dedicated section
              })
              .catch(error => {
                console.error("Error getting AI suggestions:", error);
              });
            } else {
              alert("Please enter a destination first");
            }
          }}
        >
          <Ionicons name="bulb-outline" size={18} color="#3478F6" />
          <Text style={styles.aiSuggestText}>Get AI Suggestions</Text>
        </TouchableOpacity>


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
              style={styles.createTripButton}
              onPress={handleSaveItinerary}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.createTripText}>Create Trip</Text>
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

      {/* Generated Plan Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={planModalVisible}
        onRequestClose={() => setPlanModalVisible(false)}
      >
        <View style={styles.planModalOverlay}>
          <View style={styles.planModalContent}>
            <View style={styles.planModalHeader}>
              <Text style={styles.planModalTitle}>Your Trip Plan</Text>
              <TouchableOpacity onPress={() => setPlanModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.planContent}>
              <Text style={styles.planText}>{plan}</Text>
            </ScrollView>

            <View style={styles.planModalButtonContainer}>
              <TouchableOpacity 
                style={styles.planModalButton}
                onPress={() => {
                  setPlanModalVisible(false);
                  handleSaveItinerary();
                }}
              >
                <Text style={styles.planModalButtonText}>Save Plan & Create Trip</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  generatePlanButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    flexDirection: 'row',
  },
  generatePlanText: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: 'white',
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
  createTripButton: {
    backgroundColor: '#3478F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  createTripText: {
    fontFamily: 'outfit-medium',
    fontSize: 14,
    color: 'white',
  },
  // Plan Modal Styles
  planModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  planModalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingBottom: 20,
    maxHeight: '80%',
  },
  planModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  planModalTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: '#333',
  },
  planContent: {
    padding: 20,
    maxHeight: 400,
  },
  planText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  planModalButtonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f2f2f2',
  },
  planModalButton: {
    backgroundColor: '#3478F6',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  planModalButtonText: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: 'white',
  },
  aiSuggestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f7ff',
    borderWidth: 1,
    borderColor: '#3478F6',
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 15,
  },
  aiSuggestText: {
    color: '#3478F6',
    fontFamily: 'outfit-medium',
    fontSize: 15,
    marginLeft: 8,
  },
});