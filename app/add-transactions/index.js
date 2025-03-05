import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform } from 'react-native';

const ExpenseEntry = () => {
  const [expenses, setExpenses] = useState({ food: '', accommodation: '', fuel: '', ticket: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Configure API URL based on where the app is running
  const API_URL = Platform.select({
    android: 'http://10.31.25.1:5000', // Your local IP address
    ios: 'http://10.31.25.1:5000',     // Your local IP address
    default: 'http://localhost:5000'    // For web testing
  });

  const handleInputChange = (name, value) => {
    setExpenses({ ...expenses, [name]: value });
  };

  const handleSubmit = async () => {
    // Validate inputs
    if (Object.values(expenses).some(value => value === '' || isNaN(Number(value)))) {
      Alert.alert('Error', 'Please enter valid numbers for all fields');
      return;
    }

    setIsLoading(true);
    try {
      const expenseData = {
        userId: '64f1a2b3c4d5e6f7a8b9c0d1',
        food: Number(expenses.food),
        accommodation: Number(expenses.accommodation),
        fuel: Number(expenses.fuel),
        ticket: Number(expenses.ticket),
      };

      console.log('Attempting to connect to:', `${API_URL}/api/expenses`); // Debug log

      const response = await fetch(`${API_URL}/api/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(expenseData),
      });

      console.log('Response status:', response.status); // Debug log

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to save expense');
      }

      setExpenses({ food: '', accommodation: '', fuel: '', ticket: '' });
      Alert.alert('Success', 'Expense added successfully!');
    } catch (error) {
      console.error('Network Error Details:', error);
      Alert.alert(
        'Error',
        'Failed to save expense. Please check your network connection and try again.\n' +
        'Make sure your device is connected to the same network as the server.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Expense Entry</Text>
      <View style={styles.formContainer}>
        {Object.keys(expenses).map((key) => (
          <View key={key} style={styles.inputGroup}>
            <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder={`Enter ${key} cost`}
              value={expenses[key]}
              onChangeText={(value) => handleInputChange(key, value)}
            />
          </View>
        ))}
        <TouchableOpacity
          style={[styles.button, isLoading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Saving...' : 'Add Entry'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#031f2a',
    padding: 20,
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
    marginBottom: 15,
  },
  label: {
    color: '#5edfff',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#1a4a5a',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
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
  },
});

export default ExpenseEntry;
