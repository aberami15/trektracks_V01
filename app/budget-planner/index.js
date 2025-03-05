import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { MaterialIcons, Feather } from '@expo/vector-icons';

const BudgetPlanner = () => {
  const router = useRouter();
  const handleBudgetOverview = () => {
    // Navigate to budget details page
    console.log("Navigating to budget planner");
    router.push('/budget-overview'); // Direct to the budget planner page
  };
  
  const handleAddTransation = () => {
    // Navigate to budget details page
    console.log("Navigating to budget planner");
    router.push('/add-transactions'); // Direct to the budget planner page
  };
  
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Budget Planner</Text>
        <Feather name="settings" size={24} color="#2cc3e5" />
      </View>

      {/* Budget Overview Card */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.iconItem} onPress={handleBudgetOverview}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="pie-chart" size={24} color="#2cc3e5" />
            <Text style={styles.cardTitle}>Budget Overview</Text>
          </View>
          <Text style={styles.subtitle}>Stay on Top of Your Budget with Ease</Text>
          
          {/* Progress Bars */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '65%' }]} />
            </View>
            <Text style={styles.progressText}>LKR 45,000 / LKR 70,000</Text>
          </View>
        </TouchableOpacity>
      </View>

      

      {/* Budget Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Budget Summary</Text>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Budget</Text>
            <Text style={styles.summaryValue}>LKR 150,000</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Spent</Text>
            <Text style={styles.summaryValue}>LKR 45,000</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Remaining</Text>
            <Text style={styles.summaryValue}>LKR 105,000</Text>
          </View>
        </View>
      </View>

      {/* Transactions Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Effortlessly Track Every Transaction</Text>
        
        {/* Transaction List */}
        <View style={styles.transactionList}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <Feather name="dollar-sign" size={20} color="#fff" />
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionTitle}>Food Delivery</Text>
                <Text style={styles.transactionDate}>2023-07-17</Text>
              </View>
              <Text style={styles.transactionAmount}>- LKR 1,500</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Money Moves */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Money Moves</Text>
        <View style={styles.buttonRow}>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleAddTransation}>
            <Feather name="plus" size={20} color="#fff" />
            <Text style={styles.buttonText}>Add Transactions</Text>
          </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    color: '#2cc3e5',
    fontSize: 28,
    fontWeight: 'bold',
  },
  card: {
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  cardTitle: {
    color: '#1a4a5a',
    fontSize: 20,
    fontWeight: '600',
  },
  subtitle: {
    color: '#658998',
    fontSize: 14,
    marginBottom: 15,
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
    color: '#1a4a5a',
    marginTop: 8,
    fontSize: 12,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#1a4a5a',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  summaryItem: {
    flex: 1,
    backgroundColor: '#f0f7fa',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  summaryLabel: {
    color: '#658998',
    fontSize: 14,
  },
  summaryValue: {
    color: '#1a4a5a',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  transactionList: {
    gap: 12,
    marginTop: 15,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f7fa',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  transactionIcon: {
    backgroundColor: '#2cc3e5',
    padding: 10,
    borderRadius: 8,
    marginRight: 15,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    color: '#1a4a5a',
    fontSize: 16,
  },
  transactionDate: {
    color: '#658998',
    fontSize: 12,
  },
  transactionAmount: {
    color: '#ff4444',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2cc3e5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  seeAll: {
    color: '#2cc3e5',
    fontWeight: '600',
  },
});

export default BudgetPlanner;
