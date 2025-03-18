import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Modal
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { API_BASE_URL } from '../../configs/apiConfig';

const AiTripPlanner = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    days: '',
    budget: '',
    interests: '',
    travelStyle: 'moderate', // default value
    travelDate: new Date().toISOString().split('T')[0]
  });
  
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [error, setError] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = async () => {
    // Validate inputs
    if (!formData.origin || !formData.destination || !formData.days) {
      setError('Please fill in origin, destination, and number of days');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Construct the prompt for Gemini
      const prompt = `I'm planning a ${formData.days}-day trip from ${formData.origin} to ${formData.destination} in Sri Lanka. 
      ${formData.budget ? `My budget is approximately ${formData.budget} LKR.` : 'I have a moderate budget.'} 
      ${formData.interests ? `I'm particularly interested in ${formData.interests}.` : ''}
      
      Please provide me with a detailed day-by-day itinerary including:
      
      Transportation:
      - Best way to travel between locations
      - Estimated transportation costs
      - Recommended departure times
      - Travel duration
      
      Accommodation:
      - 2-3 recommended hotels/guesthouses for each night
      - Estimated room rates
      - Contact details or booking information if available
      
      Food:
      - Recommended restaurants for breakfast, lunch, and dinner each day
      - Must-try local dishes at each place
      - Estimated meal costs
      
      Attractions & Activities:
      - Must-visit places in and around ${formData.destination}
      - Entrance fees for each attraction
      - Opening and closing times
      - Recommended duration at each spot
      
      Shopping:
      - Best places to shop for souvenirs and local products
      - Recommended markets or stores
      - Operating hours
      
      My travel style is ${formData.travelStyle}. Please provide a complete day-by-day schedule with approximate timings to maximize my experience.`;
      
      // Make request to your backend that interfaces with Gemini API
      const response = await fetch(`${API_BASE_URL}/api/ai/generate-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate trip plan');
      }
      
      const data = await response.json();
      setAiResponse(data.response || '');
      setModalVisible(true);
      
    } catch (err) {
      console.error('Error generating trip plan:', err);
      setError(err.message || 'Failed to generate trip plan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2cc3e5" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Trip Planner</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Trip Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Origin</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Colombo Wellawatte"
              value={formData.origin}
              onChangeText={(text) => handleInputChange('origin', text)}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Destination</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Nuwara Eliya"
              value={formData.destination}
              onChangeText={(text) => handleInputChange('destination', text)}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Number of Days</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 3"
              keyboardType="numeric"
              value={formData.days}
              onChangeText={(text) => handleInputChange('days', text)}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Budget (LKR, Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 50000"
              keyboardType="numeric"
              value={formData.budget}
              onChangeText={(text) => handleInputChange('budget', text)}
            />
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Interests (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="e.g., tea plantations, hiking, local cuisine"
              value={formData.interests}
              onChangeText={(text) => handleInputChange('interests', text)}
              multiline
              numberOfLines={3}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Travel Style</Text>
            <View style={styles.styleOptions}>
              <TouchableOpacity
                style={[
                  styles.styleOption,
                  formData.travelStyle === 'budget' && styles.selectedOption
                ]}
                onPress={() => handleInputChange('travelStyle', 'budget')}
              >
                <Text style={styles.styleOptionText}>Budget</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.styleOption,
                  formData.travelStyle === 'moderate' && styles.selectedOption
                ]}
                onPress={() => handleInputChange('travelStyle', 'moderate')}
              >
                <Text style={styles.styleOptionText}>Moderate</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.styleOption,
                  formData.travelStyle === 'luxury' && styles.selectedOption
                ]}
                onPress={() => handleInputChange('travelStyle', 'luxury')}
              >
                <Text style={styles.styleOptionText}>Luxury</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.generateButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.generateButtonText}>Generate Trip Plan</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Modal to display AI response */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Your Trip Plan</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <Text style={styles.aiResponseText}>{aiResponse}</Text>
          </ScrollView>
          
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                // Save the plan logic here
                setModalVisible(false);
                // Navigate to saved plans or home
                router.push('/home');
              }}
            >
              <Text style={styles.saveButtonText}>Save Plan</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2cc3e5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formSection: {
    marginBottom: 24,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  styleOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  styleOption: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#2cc3e5',
  },
  styleOptionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
  },
  generateButton: {
    backgroundColor: '#2cc3e5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  generateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  aiResponseText: {
    fontSize: 16,
    lineHeight: 24,
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#2cc3e5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AiTripPlanner;