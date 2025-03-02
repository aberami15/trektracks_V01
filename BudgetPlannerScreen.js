import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BudgetPlannerScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Budget Planer</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Budget Overview</Text>
        <Text style={styles.cardSubtitle}>Stay on Top of Your Budget with Ease</Text>
        
        <TouchableOpacity 
          style={styles.blueButton}
          onPress={() => navigation.navigate('BudgetOverview')}
        >
          <Text style={styles.blueButtonText}>Budget Summary</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Transactions</Text>
        <Text style={styles.cardSubtitle}>Effortlessly Track Every Transaction</Text>
        
        <TouchableOpacity style={styles.blueButton}>
          <Text style={styles.blueButtonText}>Money Moves</Text>
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
  screenTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  blueButton: {
    backgroundColor: '#79C7FF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 25,
  },
  blueButtonText: {
    color: '#333',
    fontWeight: '500',
  },
});

export default BudgetPlannerScreen;