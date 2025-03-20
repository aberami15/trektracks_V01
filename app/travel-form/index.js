import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import axios from "axios";
import DatePicker from "react-native-datepicker";
import DropDownPicker from "react-native-dropdown-picker";

const TravelForm = () => {
  const [formData, setFormData] = useState({
    startLocation: "",
    endLocation: "",
    startDate: "",
    endDate: "",
    numPersons: "",
    travelerType: "",
    tripPreference: "",
    transportMode: "",
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
      <TextInput placeholder="Enter start location" onChangeText={(text) => handleInputChange("startLocation", text)} />

      <Text>End Location:</Text>
      <TextInput placeholder="Enter end location" onChangeText={(text) => handleInputChange("endLocation", text)} />

      <Text>Start Date:</Text>
      <DatePicker style={{ width: 200 }} date={formData.startDate} mode="date" onDateChange={(date) => handleInputChange("startDate", date)} />

      <Text>End Date:</Text>
      <DatePicker style={{ width: 200 }} date={formData.endDate} mode="date" onDateChange={(date) => handleInputChange("endDate", date)} />

      <Text>Number of Persons:</Text>
      <TextInput keyboardType="numeric" placeholder="Enter number of persons" onChangeText={(text) => handleInputChange("numPersons", text)} />

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default TravelForm;
