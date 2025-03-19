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
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';

export default function AiTripPlanner() {
  const navigation = useNavigation();
  const router = useRouter();
  
  // Form state
  const [destination, setDestination] = useState('');
  const [from, setFrom] = useState('');
  const [days, setDays] = useState('');
  const [travelerCategory, setTravelerCategory] = useState('');
  const [tripType, setTripType] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [budget, setBudget] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState('');
  const [showPlan, setShowPlan] = useState(false);

  // Modal visibility states
  const [daysModalVisible, setDaysModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [tripTypeModalVisible, setTripTypeModalVisible] = useState(false);
  const [vehicleModalVisible, setVehicleModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  // Options for dropdowns
  const daysOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "14", "21", "30"];
  const travelerCategories = ["Solo", "Couple", "Family", "Friends", "Group Tour"];
  const tripTypes = ["Adventure", "Relaxation", "Cultural", "Devotional", "Food & Cuisine", "Nature", "Photography"];
  const vehicleOptions = ["Car", "Public Transport", "Bike", "Walking", "Plane", "Train", "Bus"];

  const handleGeneratePlan = async () => {
    // Validate inputs
    if (!destination || !from || !days || !travelerCategory || !tripType || !vehicle || !budget) {
      Alert.alert('Missing Information', 'Please fill in all fields to generate your plan');
      return;
    }

    try {
      setLoading(true);
      
      // Create payload
      const payload = {
        destination,
        from,
        days,
        travelerCategory,
        tripType,
        vehicle,
        budget
      };

      console.log("Generating AI plan with:", payload);
      
      // Configure API URL based on environment
      const API_URL = Platform.select({
        android: 'http://10.31.25.1:5000', // Your local IP address
        ios: 'http://10.31.25.1:5000',     // Your local IP address
        default: 'http://localhost:5000'    // For web testing
      });
      
      // Make API call to Gemini endpoint
      const response = await fetch(`${API_URL}/api/gemini/generate-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate plan');
      }
      
      const data = await response.json();
      
      // Handle successful response
      if (data.status === 'success' && data.data?.plan) {
        setGeneratedPlan(data.data.plan);
        setShowPlan(true);
      } else {
        throw new Error('No plan received from API');
      }
      
    } catch (error) {
      console.error('Error generating plan:', error);
      Alert.alert('Error', error.message || 'Failed to generate trip plan');
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

  // Plan result modal
  const PlanResultModal = () => (
    <Modal
      animationType="slide"
      transparent={false}
      visible={showPlan}
      onRequestClose={() => setShowPlan(false)}
    >
      <SafeAreaView style={styles.planModalContainer}>
        <View style={styles.planModalHeader}>
          <TouchableOpacity onPress={() => setShowPlan(false)} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.planModalTitle}>Your AI Trip Plan</Text>
          <TouchableOpacity onPress={() => {
            // Here you would save the plan to user's saved plans
            Alert.alert('Success', 'Trip plan saved successfully!');
            setShowPlan(false);
          }}>
            <Ionicons name="bookmark" size={24} color="#3478F6" />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.planContent}>
          <Text style={styles.planDestination}>{destination} Trip Plan</Text>
          <Text style={styles.planSubtitle}>{days} days • {tripType} • {travelerCategory}</Text>
          
          <View style={styles.planTextContainer}>
            <Text style={styles.planText}>{generatedPlan}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Trip Planner</Text>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Ionicons name="person-circle" size={32} color="#333" />
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
          <Text style={styles.introText}>
            Let our AI create a customized travel itinerary for your Sri Lanka adventure.
          </Text>

          {/* From Location */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>From</Text>
            <View style={styles.inputField}>
              <TextInput
                style={styles.input}
                placeholder="Your starting location"
                value={from}
                onChangeText={setFrom}
              />
              <Ionicons name="location-outline" size={20} color="#999" style={styles.inputIcon} />
            </View>
          </View>

          {/* Destination */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Destination</Text>
            <View style={styles.inputField}>
              <TextInput
                style={styles.input}
                placeholder="Where are you going?"
                value={destination}
                onChangeText={setDestination}
              />
              <Ionicons name="location" size={20} color="#999" style={styles.inputIcon} />
            </View>
          </View>

          {/* Days */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Days</Text>
            <TouchableOpacity 
              style={styles.dropdownField}
              onPress={() => setDaysModalVisible(true)}
            >
              <Text style={[styles.dropdownText, !days && styles.placeholderText]}>
                {days || "How many days?"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#999" style={styles.dropdownIcon} />
            </TouchableOpacity>
          </View>

          {/* Traveler Category */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Traveler Type</Text>
            <TouchableOpacity 
              style={styles.dropdownField}
              onPress={() => setCategoryModalVisible(true)}
            >
              <Text style={[styles.dropdownText, !travelerCategory && styles.placeholderText]}>
                {travelerCategory || "Select traveler type"}
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
            <Text style={styles.inputLabel}>Transportation</Text>
            <TouchableOpacity 
              style={styles.dropdownField}
              onPress={() => setVehicleModalVisible(true)}
            >
              <Text style={[styles.dropdownText, !vehicle && styles.placeholderText]}>
                {vehicle || "Select main transportation"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#999" style={styles.dropdownIcon} />
            </TouchableOpacity>
          </View>

          {/* Budget */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Budget (LKR)</Text>
            <View style={styles.inputField}>
              <TextInput
                style={styles.input}
                placeholder="Your budget in LKR"
                value={budget}
                onChangeText={setBudget}
                keyboardType="numeric"
              />
              <Ionicons name="wallet-outline" size={20} color="#999" style={styles.inputIcon} />
            </View>
          </View>

          {/* Generate Button */}
          <TouchableOpacity 
            style={[styles.generateButton, loading && styles.disabledButton]}
            onPress={handleGeneratePlan}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" style={{ marginRight: 10 }} />
            ) : (
              <Ionicons name="bulb-outline" size={20} color="white" style={{ marginRight: 10 }} />
            )}
            <Text style={styles.generateButtonText}>
              {loading ? 'Generating Plan...' : 'Generate AI Trip Plan'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

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
        "Select Traveler Type", 
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

      {/* Plan Result Modal */}
      <PlanResultModal />

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerItem} 
          onPress={() => router.push('/home')}
        >
          <Ionicons name="home" size={24} color="#777" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerItem}
          onPress={() => router.push('/trip-itinerary')}
        >
          <Ionicons name="calendar" size={24} color="#777" />
          <Text style={styles.footerText}>Itinerary</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerItem}
          onPress={() => router.push('/save-favourite')}
        >
          <Ionicons name="heart" size={24} color="#777" />
          <Text style={styles.footerText}>Favorites</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerItem}
          onPress={() => router.push('/recent-trips')}
        >
          <Ionicons name="time" size={24} color="#777" />
          <Text style={styles.footerText}>Recent</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'outfit-bold',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  introText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 25,
    lineHeight: 22,
    fontFamily: 'outfit',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'outfit-medium',
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: 'outfit',
  },
  inputIcon: {
    marginLeft: 10,
  },
  dropdownField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  dropdownText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: 'outfit',
  },
  placeholderText: {
    color: '#999',
  },
  dropdownIcon: {
    marginLeft: 10,
  },
  generateButton: {
    flexDirection: 'row',
    backgroundColor: '#3478F6',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#9EB8E3',
  },
  generateButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'outfit-medium',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'outfit-bold',
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
    fontSize: 16,
    color: '#333',
    fontFamily: 'outfit',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    paddingBottom: 5,
  },
  footerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
    fontFamily: 'outfit',
  },
  planModalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  planModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  planModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'outfit-bold',
  },
  planContent: {
    flex: 1,
    padding: 20,
  },
  planDestination: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    fontFamily: 'outfit-bold',
  },
  planSubtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
    fontFamily: 'outfit',
  },
  planTextContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  planText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    fontFamily: 'outfit',
  },
});