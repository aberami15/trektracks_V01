// This page is created to sync the Ai part. this may have changes.

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
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';

export default function CreateItinerary() {
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
  const [searchText, setSearchText] = useState('');

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

  const handleSaveItinerary = async () => {
    if (!destination) {
      ToastAndroid.show('Please enter a destination', ToastAndroid.SHORT);
      return;
    }

    if (!days) {
      ToastAndroid.show('Please select number of days', ToastAndroid.SHORT);
      return;
    }

    try {
      setLoading(true);
      
      // Create itinerary data object
      const itineraryData = {
        destination,
        days,
        travelerCategory,
        tripType,
        vehicle,
        budget,
        createdAt: new Date()
      };

      console.log("Creating itinerary:", itineraryData);
      
      
      
    } catch (error) {
      console.error("Error creating itinerary: ", error);
      ToastAndroid.show('Failed to create itinerary', ToastAndroid.SHORT);
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

    // Navigate to budget overview page
    router.push('/budget-planner');

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
        <Ionicons name="arrow-back" size={24} color="#333" />
       </TouchableOpacity>

      {/* Header with profile photo */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}></Text>
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
                value={searchText}
                onChangeText={setSearchText}
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

          {/* Days */}
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

          {/* Budget - New field */}
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
              onPress={() => router.push('/budget-planner')}
            >
              <Text style={styles.generatePlanText}>Create Trip</Text>
            </TouchableOpacity>
          </View>
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


