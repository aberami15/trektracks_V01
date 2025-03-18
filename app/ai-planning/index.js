// app/ai-planning/index.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Modal,
  FlatList,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';

export default function AIPlanningScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  
  // Form state
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState('');
  const [travelerCategory, setTravelerCategory] = useState('');
  const [tripType, setTripType] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [budget, setBudget] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [error, setError] = useState(null);
  
  // Modal visibility states
  const [daysModalVisible, setDaysModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [tripTypeModalVisible, setTripTypeModalVisible] = useState(false);
  const [vehicleModalVisible, setVehicleModalVisible] = useState(false);

  // Configure API URL based on where the app is running
  const API_URL = Platform.select({
    android: 'http://10.0.2.2:5000', // Android emulator default
    ios: 'http://localhost:5000',    // iOS simulator
    web: 'http://localhost:5000',    // Web
  });

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  // Options for dropdowns
  const daysOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "14"];
  const travelerCategories = ["Solo", "Couple", "Family", "Friends", "Group Tour"];
  const tripTypes = ["Adventure", "Relaxation", "Cultural", "Devotional", "Food & Cuisine", "Nature", "Photography"];
  const vehicleOptions = ["Car", "Public Transport", "Bike", "Walking", "Mixed"];

  const handleGeneratePlan = async () => {
    if (!destination) {
      alert('Please enter a destination');
      return;
    }

    if (!days) {
      alert('Please select number of days');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log("Sending request to:", `${API_URL}/api/ai-plan/generate`);
      console.log("Request data:", {
        destination,
        days,
        travelerCategory,
        tripType,
        vehicle,
        budget,
      });
      
      // API call to generate plan
      const response = await fetch(`${API_URL}/api/ai-plan/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          destination,
          days,
          travelerCategory,
          tripType,
          vehicle,
          budget,
        }),
      });

      console.log("Response status:", response.status);
      
      const responseText = await response.text();
      console.log("Response text:", responseText);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${responseText}`);
      }

      const data = JSON.parse(responseText);
      setGeneratedPlan(data.data.plan);
      
    } catch (error) {
      console.error('Error generating plan:', error);
      setError(error.message || 'An error occurred while generating the plan');
    } finally {
      setLoading(false);
    }
  };

  // Helper for dropdown rendering
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Trip Planner</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!generatedPlan ? (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Let AI plan your perfect Sri Lanka trip</Text>
            <Text style={styles.formSubtitle}>Fill in the details and our AI will create a custom itinerary just for you</Text>
            
            {/* Destination */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Destination</Text>
              <View style={styles.inputField}>
                <TextInput
                  style={styles.input}
                  placeholder="Where do you want to go in Sri Lanka?"
                  value={destination}
                  onChangeText={setDestination}
                />
              </View>
            </View>
            
            {/* Days */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Days</Text>
              <TouchableOpacity 
                style={styles.dropdownField}
                onPress={() => setDaysModalVisible(true)}
              >
                <Text style={days ? styles.dropdownText : styles.placeholderText}>
                  {days || "Select number of days"}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#999" />
              </TouchableOpacity>
            </View>
            
            {/* Traveler Category */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Traveler Category</Text>
              <TouchableOpacity 
                style={styles.dropdownField}
                onPress={() => setCategoryModalVisible(true)}
              >
                <Text style={travelerCategory ? styles.dropdownText : styles.placeholderText}>
                  {travelerCategory || "Select traveler category"}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#999" />
              </TouchableOpacity>
            </View>
            
            {/* Trip Type */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Trip Type</Text>
              <TouchableOpacity 
                style={styles.dropdownField}
                onPress={() => setTripTypeModalVisible(true)}
              >
                <Text style={tripType ? styles.dropdownText : styles.placeholderText}>
                  {tripType || "Select trip type"}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#999" />
              </TouchableOpacity>
            </View>
            
            {/* Vehicle */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Transportation</Text>
              <TouchableOpacity 
                style={styles.dropdownField}
                onPress={() => setVehicleModalVisible(true)}
              >
                <Text style={vehicle ? styles.dropdownText : styles.placeholderText}>
                  {vehicle || "Select transportation type"}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#999" />
              </TouchableOpacity>
            </View>
            
            {/* Budget */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Budget (LKR)</Text>
              <View style={styles.inputField}>
                <TextInput
                  style={styles.input}
                  placeholder="Approximate budget in LKR"
                  value={budget}
                  onChangeText={setBudget}
                  keyboardType="numeric"
                />
              </View>
            </View>
            
            {/* Generate Button */}
            <TouchableOpacity 
              style={[styles.generateButton, loading && styles.disabledButton]}
              onPress={handleGeneratePlan}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.generateButtonText}>Generate AI Travel Plan</Text>
              )}
            </TouchableOpacity>
            
            {error && (
              <Text style={styles.errorText}>{error}</Text>
            )}
          </View>
        ) : (
          <View style={styles.planContainer}>
            <Text style={styles.planTitle}>Your AI-Generated Travel Plan</Text>
            <Text style={styles.planSubtitle}>
              Destination: {destination} • {days} Days • {tripType || 'Mixed'} Trip
            </Text>
            
            <View style={styles.planContent}>
              <Text style={styles.planText}>{generatedPlan}</Text>
            </View>
            
            <View style={styles.actionsContainer}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => setGeneratedPlan(null)}
              >
                <Ionicons name="refresh" size={18} color="white" />
                <Text style={styles.actionButtonText}>Generate New Plan</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.saveButton]}
                onPress={() => {
                  // Save the plan logic would go here
                  alert('Plan saved successfully!');
                }}
              >
                <Ionicons name="save" size={18} color="white" />
                <Text style={styles.actionButtonText}>Save Plan</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
        "Select Transportation", 
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
    color: '#333',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'outfit-medium',
    color: '#333',
    marginBottom: 8,
  },
  inputField: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  input: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#333',
    paddingVertical: 12,
  },
  dropdownField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  dropdownText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#999',
  },
  generateButton: {
    backgroundColor: '#3478F6',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#a0c4ff',
  },
  generateButtonText: {
    color: 'white',
    fontFamily: 'outfit-medium',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontFamily: 'outfit',
    fontSize: 14,
    marginTop: 15,
    textAlign: 'center',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  modalTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: '#333',
  },
  dropdownList: {
    maxHeight: 400,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#333',
  },
  // Generated plan styles
  planContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  planTitle: {
    fontSize: 22,
    fontFamily: 'outfit-bold',
    color: '#333',
    marginBottom: 8,
  },
  planSubtitle: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: '#666',
    marginBottom: 20,
  },
  planContent: {
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  planText: {
    fontFamily: 'outfit',
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  actionButton: {
    backgroundColor: '#3478F6',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  saveButton: {
    backgroundColor: '#34C759',
  },
  actionButtonText: {
    color: 'white',
    fontFamily: 'outfit-medium',
    fontSize: 14,
  },
});