import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import axios from "axios";

const TravelForm = () => {
  const [formData, setFormData] = useState({
    startLocation: "",
    endLocation: "",
    startDate: "",
    endDate: "",
    numPersons: "",
  });

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://YOUR_SERVER_IP:5000/api/travel", formData);
      alert("Trip Preferences Submitted Successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to Submit!");
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text>Start Location:</Text>
      <TextInput 
        placeholder="Enter start location" 
        onChangeText={(text) => handleInputChange("startLocation", text)} 
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <Text>End Location:</Text>
      <TextInput 
        placeholder="Enter end location" 
        onChangeText={(text) => handleInputChange("endLocation", text)} 
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <Text>Start Date (YYYY-MM-DD):</Text>
      <TextInput 
        placeholder="Enter start date" 
        onChangeText={(text) => handleInputChange("startDate", text)} 
        style={{ borderBottomWidth: 1, marginBottom: 10 }} 
      />

      <Text>End Date (YYYY-MM-DD):</Text>
      <TextInput 
        placeholder="Enter end date" 
        onChangeText={(text) => handleInputChange("endDate", text)} 
        style={{ borderBottomWidth: 1, marginBottom: 10 }} 
      />

      <Text>Number of Persons:</Text>
      <TextInput 
        keyboardType="numeric" 
        placeholder="Enter number of persons" 
        onChangeText={(text) => handleInputChange("numPersons", text)} 
        style={{ borderBottomWidth: 1, marginBottom: 10 }} 
      />

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default TravelForm;
