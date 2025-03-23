import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import Footer from '../footer';
import Config from '../../config';

const BudgetOverview = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = params.q;
  const [budgetData, setBudgetData] = useState({
    budget: 0,
    totalSpent: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBudgetDetails();
  }, []);

  const handleBack = () => {
    router.back(); // Navigate back to the previous screen (BudgetPlanner)
  };

  const fetchBudgetDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${Config.BASE_URL}/trips/category/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const responseData = await response.json();
      setBudgetData(responseData.data);
    }
    catch (error) {
      console.error('Error fetching budget details:', error);
      setError('Failed to load budget details');
      setBudgetData({
        budget: 0,
        totalSpent: 0
      });
    }
    finally {
      setLoading(false);
    }
  };

  // Get icon based on category
  const getCategoryIcon = (category) => {
    // Map category names to MaterialCommunityIcons
    const iconMap = {
      'food': 'food',
      'accommodation': 'home',
      'fuel': 'fuel',
      'tickets': 'ticket',
      'shopping': 'shopping',
      'transportation': 'car',
      'entertainment': 'movie-open',
      'sightseeing': 'camera',
      'other': 'cash'
      // Add more mappings as needed
    };

    // Default to 'cash' icon if category not found in the map
    return iconMap[category.toLowerCase()] || 'cash';
  };

  // Calculate percentage of budget spent
  const calculatePercentage = () => {
    if (!budgetData.budget || budgetData.budget === 0) return 0;
    const percentage = (budgetData.totalSpent / budgetData.budget) * 100;
    return Math.min(percentage, 100); // Cap at 100%
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return 'LKR 0';
    return `LKR ${amount.toLocaleString()}`;
  };

  // Get expense categories (filter out budget and totalSpent keys)
  const getExpenseCategories = () => {
    if (!budgetData) return [];
    
    return Object.entries(budgetData)
      .filter(([key]) => key !== 'budget' && key !== 'totalSpent')
      .map(([key, value]) => value);
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#2cc3e5" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Budget Overview</Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2cc3e5" />
            <Text style={styles.loadingText}>Loading budget details...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchBudgetDetails}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Budget Card */}
            <View style={styles.budgetCard}>
              <Text style={styles.sectionTitle}>BUDGET</Text>
              <Text style={styles.budgetAmount}>{formatCurrency(budgetData.budget)}</Text>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${calculatePercentage()}%`,
                        backgroundColor: calculatePercentage() > 90 ? '#FF6B6B' : '#2cc3e5'
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>
                  Spent: {formatCurrency(budgetData.totalSpent)} 
                  {budgetData.budget > 0 && ` (${calculatePercentage().toFixed(1)}%)`}
                </Text>
              </View>
            </View>

            {/* Expenses Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>EXPENSES</Text>
              
              {getExpenseCategories().length === 0 ? (
                <View style={styles.noExpensesContainer}>
                  <Text style={styles.noExpensesText}>No expenses recorded yet</Text>
                </View>
              ) : (
                <View style={styles.expensesContainer}>
                  {getExpenseCategories().map((categoryData, index) => (
                    <View key={index} style={styles.expenseItem}>
                      <MaterialCommunityIcons 
                        name={getCategoryIcon(categoryData.category)} 
                        size={24} 
                        color="#2cc3e5" 
                      />
                      <View style={styles.expenseDetails}>
                        <Text style={styles.expenseCategory}>
                          {categoryData.category.charAt(0).toUpperCase() + categoryData.category.slice(1)}
                        </Text>
                        <Text style={styles.expenseAmount}>
                          {formatCurrency(categoryData.totalAmount)}
                          <Text style={styles.expenseCount}> ({categoryData.count} item{categoryData.count !== 1 ? 's' : ''})</Text>
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>
      <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 30,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    color: '#2cc3e5',
    fontSize: 28,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    marginTop: 10,
    color: '#658998',
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: '#FFE8E6',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginVertical: 20,
  },
  errorText: {
    color: '#FF5A5F',
    fontSize: 16,
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#2cc3e5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
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
  noExpensesContainer: {
    backgroundColor: '#f0f7fa',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  noExpensesText: {
    color: '#658998',
    fontSize: 16,
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
  expenseCount: {
    color: '#95AFB8',
    fontSize: 12,
  }
});

export default BudgetOverview;