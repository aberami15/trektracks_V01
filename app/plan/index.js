import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';

const PlanScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    setIsCalendarVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Date Picker Section */}
      <TouchableOpacity 
        style={styles.dateContainer}
        onPress={() => setIsCalendarVisible(true)}
      >
        <Text style={styles.dateText}>
          {new Date(selectedDate).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </Text>
        <Text style={styles.dateHint}>Tap to select date</Text>
      </TouchableOpacity>

      {/* Calendar Modal */}
      <Modal isVisible={isCalendarVisible}>
        <View style={styles.calendarContainer}>
          <Calendar
            current={selectedDate}
            onDayPress={handleDateSelect}
            markedDates={{
              [selectedDate]: {selected: true, selectedColor: '#5edfff'}
            }}
            theme={{
              backgroundColor: '#031f2a',
              calendarBackground: '#031f2a',
              textSectionTitleColor: '#7d9ca5',
              selectedDayBackgroundColor: '#5edfff',
              selectedDayTextColor: '#031f2a',
              todayTextColor: '#5edfff',
              dayTextColor: '#fff',
              monthTextColor: '#5edfff',
              arrowColor: '#5edfff',
              textDisabledColor: '#4a4a4a',
            }}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsCalendarVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Spacer to move Expense Section down */}
      <View style={{ height: 20 }} />

      {/* Expense Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Expense LKR</Text>
        
        <View style={styles.row}>
          <View style={styles.item}>
            <Text style={styles.category}>Food & Drink</Text>
            <Text style={styles.amount}>LKR 15,000</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.category}>Transportation</Text>
            <Text style={styles.amount}>LKR 8,000</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.item}>
            <Text style={styles.category}>Fuel</Text>
            <Text style={styles.amount}>LKR 12,500</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.category}>Ticket Fees</Text>
            <Text style={styles.amount}>LKR 5,000</Text>
          </View>
        </View>
      </View>

      {/* Spacer to move Income Section down */}
      <View style={{ height: 20 }} />

      {/* Income Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Income LKR</Text>
        
        <View style={styles.row}>
          <View style={styles.item}>
            <Text style={styles.category}>Salary</Text>
            <Text style={styles.amount}>LKR 75,000</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.category}>Investments</Text>
            <Text style={styles.amount}>LKR 12,000</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#031f2a',
  },
  dateContainer: {
    backgroundColor: '#0a3a4a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    marginTop: 20, // Moves Date Picker Section down
  },
  dateText: {
    color: '#5edfff',
    fontSize: 18,
    fontWeight: '600'
  },
  dateHint: {
    color: '#7d9ca5',
    fontSize: 12,
    marginTop: 5
  },
  calendarContainer: {
    backgroundColor: '#031f2a',
    borderRadius: 10,
    padding: 15
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#5edfff',
    borderRadius: 5,
    alignItems: 'center'
  },
  closeButtonText: {
    color: '#031f2a',
    fontWeight: 'bold'
  },
  section: {
    marginBottom: 30,
    marginTop: 20, // Moves Sections down
  },
  sectionTitle: {
    color: '#5edfff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  item: {
    width: '48%',
    backgroundColor: '#0a3a4a',
    padding: 15,
    borderRadius: 10,
  },
  category: {
    color: '#7d9ca5',
    fontSize: 16,
    marginBottom: 5,
  },
  amount: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PlanScreen;
