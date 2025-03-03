import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';

const BudgetOverview = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back(); // Navigate back to the previous screen (BudgetPlanner)
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#2cc3e5" />
        </TouchableOpacity>
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
            <MaterialCommunityIcons name="food" size={24} color="#2cc3e5" />
            <View style={styles.expenseDetails}>
              <Text style={styles.expenseCategory}>Food</Text>
              <Text style={styles.expenseAmount}>LKR 25,000</Text>
            </View>
          </View>

          {/* Accommodation */}
          <View style={styles.expenseItem}>
            <MaterialCommunityIcons name="home" size={24} color="#2cc3e5" />
            <View style={styles.expenseDetails}>
              <Text style={styles.expenseCategory}>Accommodation</Text>
              <Text style={styles.expenseAmount}>LKR 50,000</Text>
            </View>
          </View>

          {/* Fuel */}
          <View style={styles.expenseItem}>
            <MaterialCommunityIcons name="fuel" size={24} color="#2cc3e5" />
            <View style={styles.expenseDetails}>
              <Text style={styles.expenseCategory}>Fuel</Text>
              <Text style={styles.expenseAmount}>LKR 30,000</Text>
            </View>
          </View>

          {/* Tickets */}
          <View style={styles.expenseItem}>
            <MaterialCommunityIcons name="ticket" size={24} color="#2cc3e5" />
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
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    color: '#2cc3e5',
    fontSize: 28,
    fontWeight: 'bold',
  },
  budgetCard: {
    backgroundColor: '#f0f7fa',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    color: '#1a4a5a',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  budgetAmount: {
    color: '#1a4a5a',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#dbeef5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2cc3e5',
  },
  progressText: {
    color: '#658998',
    fontSize: 14,
    marginTop: 8,
  },
  section: {
    marginBottom: 30,
  },
  expensesContainer: {
    gap: 15,
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f7fa',
    padding: 15,
    borderRadius: 10,
    gap: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  expenseDetails: {
    flex: 1,
  },
  expenseCategory: {
    color: '#1a4a5a',
    fontSize: 16,
    fontWeight: '600',
  },
  expenseAmount: {
    color: '#658998',
    fontSize: 14,
  },
});

export default BudgetOverview;