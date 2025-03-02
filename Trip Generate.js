import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PreferenceScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Preference</Text>
        <View style={styles.profilePic}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.profileImage}
          />
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Where to?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Where to?"
            placeholderTextColor="#999"
          />
          <Ionicons name="search" size={20} color="#777" style={styles.inputIcon} />
        </View>

        <Text style={styles.label}>Destination</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter destination"
            placeholderTextColor="#999"
          />
          <Ionicons name="search" size={20} color="#777" style={styles.inputIcon} />
        </View>

        <Text style={styles.label}>Days</Text>
        <View style={styles.dropdownContainer}>
          <TextInput
            style={styles.dropdown}
            placeholder="Select number of days"
            placeholderTextColor="#999"
            editable={false}
          />
          <Ionicons name="chevron-down" size={20} color="#777" style={styles.dropdownIcon} />
        </View>

        <Text style={styles.label}>Traveller Category</Text>
        <View style={styles.dropdownContainer}>
          <TextInput
            style={styles.dropdown}
            placeholder="Select category"
            placeholderTextColor="#999"
            editable={false}
          />
          <Ionicons name="chevron-down" size={20} color="#777" style={styles.dropdownIcon} />
        </View>

        <Text style={styles.label}>Trip Type</Text>
        <View style={styles.dropdownContainer}>
          <TextInput
            style={styles.dropdown}
            placeholder="Select trip type"
            placeholderTextColor="#999"
            editable={false}
          />
          <Ionicons name="chevron-down" size={20} color="#777" style={styles.dropdownIcon} />
        </View>

        <Text style={styles.label}>Vehicle</Text>
        <View style={styles.dropdownContainer}>
          <TextInput
            style={styles.dropdown}
            placeholder="Select vehicle"
            placeholderTextColor="#999"
            editable={false}
          />
          <Ionicons name="chevron-down" size={20} color="#777" style={styles.dropdownIcon} />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton}>
          <Ionicons name="bookmark-outline" size={20} color="#fff" />
          <Text style={styles.saveButtonText}>Save for Later</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.generateButton}
          onPress={() => navigation.navigate('BudgetPlanner')}
        >
          <Text style={styles.generateButtonText}>Generate Plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1621',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  inputIcon: {
    padding: 5,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  dropdown: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  dropdownIcon: {
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#79C7FF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#fff',
    marginLeft: 5,
  },
  generateButton: {
    backgroundColor: '#79C7FF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  generateButtonText: {
    color: '#333',
    fontWeight: '500',
  },
});

export default PreferenceScreen;