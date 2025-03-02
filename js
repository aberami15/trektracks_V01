import React, { useState } from 'react';np
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';

const Stack = createStackNavigator();

// Preference Screen
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