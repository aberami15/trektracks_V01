import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform, Modal } from 'react-native';
import Footer from '../footer';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import Config from '../../config';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the back icon

export default function ExpenseEntry() {
  const router = useRouter();
  const [expense, setExpense] = useState({
    date: new Date(),
    category: '',
    description: '',
    amount: ''
  });
  const params = useLocalSearchParams();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transaction, setTransaction] = useState({});
  const id = params.q;

  const categories = ['Food', 'Accommodation', 'Fuel', 'Ticket'];

  const handleInputChange = (name, value) => {
    setExpense({ ...expense, [name]: value });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setExpense({ ...expense, date: selectedDate });
    }
  };

  const handleCategorySelect = (category) => {
    setExpense({ ...expense, category });
    setShowCategoryModal(false);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleSubmit = async () => {
    // Validate inputs
    if (!expense.category) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    if (!expense.amount || isNaN(Number(expense.amount))) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    try {
      const expenseData = {
        date: expense.date.toISOString(),
        category: expense.category.toLowerCase(),
        description: expense.description,
        amount: Number(expense.amount),
      };


      const response = await fetch(`${Config.BASE_URL}/trips/expense/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(expenseData),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to save expense');
      }

      // Reset form
      setExpense({
        date: new Date(),
        category: '',
        description: '',
        amount: ''
      });
      Alert.alert('Success', 'Expense added successfully!');
      router.push(`/budget-planner?q=${encodeURIComponent(id)}`)
    } catch (error) {
      console.error('Network Error Details:', error);
      Alert.alert(
        'Error',
        'Failed to save expense. Please check your network connection and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push(`/budget-planner?q=${encodeURIComponent(id)}`);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color="#5edfff" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Expense Entry</Text>
        <View style={styles.formContainer}>
          {/* Date Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.inputText}>{formatDate(expense.date)}</Text>
            </TouchableOpacity>
          </View>

          {/* Category Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowCategoryModal(true)}
            >
              <Text style={[styles.inputText, !expense.category && styles.placeholderText]}>
                {expense.category || 'Select a category'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Description Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter a short description"
              placeholderTextColor="#aaa"
              value={expense.description}
              onChangeText={(value) => handleInputChange('description', value)}
            />
          </View>

          {/* Amount Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter amount"
              placeholderTextColor="#aaa"
              value={expense.amount}
              onChangeText={(value) => handleInputChange('amount', value)}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              Add Entry
            </Text>
          </TouchableOpacity>

        </View>

        {/* Category Selection Modal */}
        <Modal
          visible={showCategoryModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowCategoryModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Category</Text>

              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={styles.categoryItem}
                  onPress={() => handleCategorySelect(category)}
                >
                  <Text style={styles.categoryText}>{category}</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowCategoryModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#031f2a',
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  backButtonText: {
    color: '#5edfff',
    fontSize: 16,
    marginLeft: 5,
  },
  title: {
    color: '#5edfff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#0a3a4a',
    padding: 20,
    borderRadius: 15,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#5edfff',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1a4a5a',
    color: '#fff',
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
  },
  inputText: {
    color: '#fff',
  },
  placeholderText: {
    color: '#aaa',
  },
  button: {
    backgroundColor: '#5edfff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#031f2a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#0a3a4a',
    borderRadius: 15,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    color: '#5edfff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  categoryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1a4a5a',
  },
  categoryText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 15,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#1a4a5a',
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#5edfff',
    fontWeight: 'bold',
  },
});