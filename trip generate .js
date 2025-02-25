import React, { useState } from 'react';
import { View, Text, TextInput, Picker, Button, StyleSheet, Alert } from 'react-native';

const TravelPlanGenerator = () => {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState('');
  const [travellerCategory, setTravellerCategory] = useState('solo');
  const [tripType, setTripType] = useState('leisure');
  const [vehicle, setVehicle] = useState('car');

  const saveForLater = () => {
    Alert.alert('Success', 'Preferences saved for later!');
  };

  const generatePlan = () => {
    Alert.alert('Generating Plan', 'Your travel plan is being generated...');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Preference</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Where to?</Text>
        <TextInput
          style={styles.input}
          placeholder="Destination"
          value={destination}
          onChangeText={setDestination}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Days</Text>
        <TextInput
          style={styles.input}
          placeholder="Days"
          value={days}
          onChangeText={setDays}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Traveller Category</Text>
        <Picker
          selectedValue={travellerCategory}
          style={styles.picker}
          onValueChange={(itemValue) => setTravellerCategory(itemValue)}
        >
          <Picker.Item label="Solo" value="solo" />
          <Picker.Item label="Family" value="family" />
          <Picker.Item label="Couple" value="couple" />
        </Picker>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Trip Type</Text>
        <Picker
          selectedValue={tripType}
          style={styles.picker}
          onValueChange={(itemValue) => setTripType(itemValue)}
        >
          <Picker.Item label="Leisure" value="leisure" />
          <Picker.Item label="Business" value="business" />
          <Picker.Item label="Adventure" value="adventure" />
        </Picker>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Vehicle</Text>
        <Picker
          selectedValue={vehicle}
          style={styles.picker}
          onValueChange={(itemValue) => setVehicle(itemValue)}
        >
          <Picker.Item label="Car" value="car" />
          <Picker.Item label="Bike" value="bike" />
          <Picker.Item label="Bus" value="bus" />
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Save for Later" onPress={saveForLater} />
        <Button title="Generate Plan" onPress={generatePlan} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default TravelPlanGenerator;