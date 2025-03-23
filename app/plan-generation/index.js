import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  ActivityIndicator,
  Platform
} from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Config from '../../config';
import Footer from '../footer';

export default function PlanGeneration() {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = params.q;
  
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    fetchTripDetail();
  }, []);
   
  const fetchTripDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setError("No authentication token found");
        return;
      }
      
      const response = await fetch(`${Config.BASE_URL}/trips/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        setError(`Failed to load trip details (${response.status})`);
        return;
      }
      
      const responseData = await response.json();
      
      if (responseData.data) {
        setFormData(responseData.data);
      }
    } catch (error) {
      console.error('Error fetching trip:', error);
      setError('Failed to load trip details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  
  const handleSubmit = async () => {
    setError(null);
    
    if(formData.plan) {
      router.push(`/show-plan?q=${id}`);
    }
    else{
      if (!formData.from || !formData.destination) {
        setError('Please enter both start and end locations');
        return;
      }
      
      setLoading(true);
      
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          setError("No authentication token found");
          return;
        }
        
        const dataToSend = {
          tripId: id,
          endDate: formData.endDate,
          startDate: formData.startDate,
          startLocation: formData.from,
          endLocation: formData.destination,
          numPersons: formData.numPersons,
          tripPreference: formData.tripType,
          travelerType: formData.tripType,
          transportMode: formData.vehicle
        };
        
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
        
        router.push(`/show-plan?q=${id}`);
      } catch (error) {
        console.error('Error generating itinerary:', error);
        setError(error.message || 'Failed to generate itinerary');
      } finally {
        setLoading(false);
      }
    }
  };
  
  return (
    <View style={styles.container}>
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
          <Text style={styles.loadingText}>
            {formData.id ? "Generating your itinerary..." : "Loading trip details..."}
          </Text>
        </View>
      )}
      
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.formContainer}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        
        <Text style={styles.formTitle}>Plan Your Sri Lanka Adventure</Text>
        <Text style={styles.formSubtitle}>Fill in the details and we'll generate a custom itinerary for you</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Starting From</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., Colombo Airport"
            value={formData.from}
            onChangeText={(text) => handleInputChange('from', text)}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ending At</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., Colombo City"
            value={formData.destination}
            onChangeText={(text) => handleInputChange('destination', text)}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Start Date</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={formData.startDate}
            onChangeText={(text) => handleInputChange('startDate', text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>End Date</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={formData.endDate}
            onChangeText={(text) => handleInputChange('endDate', text)}
          />
        </View>

        <TouchableOpacity 
            style={[styles.button, loading && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : formData.plan ? (
              <>
                <Text style={styles.buttonText}>View Itinerary</Text>
                <Ionicons name="eye" size={20} color="white" style={styles.buttonIcon} />
              </>
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
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 50, paddingHorizontal: 20, paddingBottom: 15, backgroundColor: 'white' },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  backButtonText: { color: '#3478F6', marginLeft: 5, fontSize: 16 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, color: '#333' },
  scrollContainer: { flex: 1 },
  formContainer: { padding: 20, paddingBottom: 100 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, color: '#333', marginBottom: 8 },
  input: { backgroundColor: 'white', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#ddd', fontSize: 16 },
  button: { backgroundColor: '#3478F6', padding: 18, borderRadius: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16 },
  buttonIcon: { marginLeft: 10 },
  spacer: { height: 50 },
});

