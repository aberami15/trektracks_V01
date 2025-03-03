import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

const BudgetOverview = () => {
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Budget Overview</Text>
      </View>

      {/* Budget Card */}
      <View style={styles.budgetCard}>
        <Text style={styles.sectionTitle}>BUDGET</Text>
        <Text style={styles.budgetAmount}>LKR 150,000</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '35%' }]} />
          </View>
          <Text style={styles.progressText}>Spent: LKR 52,500</Text>
        </View>
      </View>

      {/* Expenses Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EXPENSES</Text>
        
        <View style={styles.expensesContainer}>
          {/* Food */}
          <View style={styles.expenseItem}>
            <MaterialCommunityIcons name="food" size={24} color="#5edfff" />
            <View style={styles.expenseDetails}>
              <Text style={styles.expenseCategory}>Food</Text>
              <Text style={styles.expenseAmount}>LKR 25,000</Text>
            </View>
          </View>

          {/* Accommodation */}
          <View style={styles.expenseItem}>
            <MaterialCommunityIcons name="home" size={24} color="#5edfff" />
            <View style={styles.expenseDetails}>
              <Text style={styles.expenseCategory}>Accommodation</Text>
              <Text style={styles.expenseAmount}>LKR 50,000</Text>
            </View>
          </View>

          {/* Fuel */}
          <View style={styles.expenseItem}>
            <MaterialCommunityIcons name="fuel" size={24} color="#5edfff" />
            <View style={styles.expenseDetails}>
              <Text style={styles.expenseCategory}>Fuel</Text>
              <Text style={styles.expenseAmount}>LKR 30,000</Text>
            </View>
          </View>

          {/* Tickets */}
          <View style={styles.expenseItem}>
            <MaterialCommunityIcons name="ticket" size={24} color="#5edfff" />
            <View style={styles.expenseDetails}>
              <Text style={styles.expenseCategory}>Tickets</Text>
              <Text style={styles.expenseAmount}>LKR 15,000</Text>
            </View>
          </View>
        </View>
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
  header: {
    marginBottom: 30,
  },
  headerTitle: {
    color: '#5edfff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  budgetCard: {
    backgroundColor: '#0a3a4a',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    color: '#5edfff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  budgetAmount: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#1a4a5a',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#5edfff',
  },
  progressText: {
    color: '#7d9ca5',
    fontSize: 14,
    marginTop: 8,
  },
  expensesContainer: {
    gap: 15,
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a3a4a',
    padding: 15,
    borderRadius: 10,
    gap: 15,
  },
  expenseDetails: {
    flex: 1,
  },
  expenseCategory: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  expenseAmount: {
    color: '#7d9ca5',
    fontSize: 14,
  },
});

export default BudgetOverview;
