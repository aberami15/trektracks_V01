import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const BudgetOverviewScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.budgetHeader}>
        <Text style={styles.screenTitle}>Budget overview</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>Rs.100,600</Text>
          <MaterialIcons name="edit" size={18} color="#fff" />
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.activeTab}>
          <Text style={styles.activeTabText}>BUDGET</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inactiveTab}>
          <Text style={styles.inactiveTabText}>EXPENSES</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chartCard}>
        <View style={styles.chart}>
          {/* In a real app, you would use a real chart component here */}
          <PieChartPlaceholder />
        </View>
      </View>

      <ScrollView style={styles.categoryList}>
        <CategoryItem icon="utensils" title="Food" />
        <CategoryItem icon="home" title="Accommodation" />
        <CategoryItem icon="gas-pump" title="Fuel" />
        <CategoryItem icon="ticket-alt" title="Tickets" />
      </ScrollView>
    </View>
  );
};

// Helper components
const PieChartPlaceholder = () => {
  // This is a placeholder for the pie chart
  // In a real app, you would use a charting library like react-native-chart-kit
  return (
    <View style={{
      width: 150,
      height: 150,
      borderRadius: 75,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F0F0F0',
      overflow: 'hidden',
    }}>
      <View style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 75,
      }}>
        <View style={{ position: 'absolute', width: '100%', height: '50%', backgroundColor: '#4169E1', top: 0 }} />
        <View style={{ position: 'absolute', width: '50%', height: '50%', backgroundColor: '#483D8B', bottom: 0, right: 0 }} />
        <View style={{ position: 'absolute', width: '50%', height: '50%', backgroundColor: '#4682B4', bottom: 0, left: 0 }} />
        <View style={{ position: 'absolute', width: '30%', height: '30%', backgroundColor: '#E9437A', top: '35%', right: '10%' }} />
      </View>
    </View>
  );
};

const CategoryItem = ({ icon, title }) => {
  return (
    <View style={styles.categoryItem}>
      <View style={styles.categoryIcon}>
        <FontAwesome5 name={icon} size={20} color="#4169E1" />
      </View>
      <Text style={styles.categoryName}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1621',
    padding: 20,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  screenTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    color: '#fff',
    fontSize: 16,
    marginRight: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  activeTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  inactiveTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inactiveTabText: {
    color: '#999',
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryList: {
    flex: 1,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default BudgetOverviewScreen;