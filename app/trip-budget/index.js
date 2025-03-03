import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import { auth, db } from '../../configs/FirebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function TripBudget() {
  const navigation = useNavigation();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    
    // Fetch budget data
    const fetchBudgetData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          // Example query - adjust based on your actual data structure
          const budgetRef = collection(db, "tripBudgets");
          const q = query(budgetRef, where("userId", "==", currentUser.uid));
          const querySnapshot = await getDocs(q);
          
          const budgets = [];
          querySnapshot.forEach((doc) => {
            budgets.push({
              id: doc.id,
              ...doc.data()
            });
          });
          
          setBudgetData(budgets);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching budget data:", error);
        setLoading(false);
      }
    };
    
    fetchBudgetData();
  }, []);

  // Function to render a single budget item
  const renderBudgetItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.budgetItem}
      onPress={() => router.push({
        pathname: '/trip-budget-detail',
        params: { id: item.id }
      })}
    >
      <View style={styles.budgetHeader}>
        <Text style={styles.tripName}>{item.tripName || 'Trip'}</Text>
        <Text style={styles.tripDate}>{item.tripDate || 'No date'}</Text>
      </View>
      
      <View style={styles.budgetDetails}>
        <View style={styles.budgetDetail}>
          <Text style={styles.detailLabel}>Total Budget:</Text>
          <Text style={styles.detailValue}>${item.totalBudget?.toFixed(2) || '0.00'}</Text>
        </View>
        
        <View style={styles.budgetDetail}>
          <Text style={styles.detailLabel}>Spent:</Text>
          <Text style={styles.detailValue}>${item.spent?.toFixed(2) || '0.00'}</Text>
        </View>
        
        <View style={styles.budgetDetail}>
          <Text style={styles.detailLabel}>Remaining:</Text>
          <Text style={[
            styles.detailValue, 
            { color: (item.totalBudget - item.spent) > 0 ? 'green' : 'red' }
          ]}>
            ${(item.totalBudget - item.spent)?.toFixed(2) || '0.00'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render empty state if no budget data
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="wallet-outline" size={80} color="#ccc" />
      <Text style={styles.emptyStateText}>No budget history found</Text>
      <Text style={styles.emptyStateSubText}>Your trip budget details will appear here</Text>
      
      <TouchableOpacity 
        style={styles.createBudgetButton}
        onPress={() => router.push('/create-trip-budget')}
      >
        <Text style={styles.createBudgetButtonText}>Budget Planner</Text>
      </TouchableOpacity>
    </View>
  );

  const navigateToHome = () => {
    router.push('/home');
  }

  const navigateToItinerary = () => {
    router.push('/trip-itinerary');
  }

  const navigateToRecentTrips = () => {
    router.push('/recent-trips');
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.leftHeader}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Trip Budget History</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/create-trip-budget')}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3478F6" />
          <Text style={styles.loadingText}>Loading budget data...</Text>
        </View>
      ) : (
        <FlatList
          data={budgetData}
          renderItem={renderBudgetItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={renderEmptyState}
        />
      )}

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerItem} 
          onPress={navigateToHome}
        >
          <Ionicons name="home" size={24} color="#777" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerItem}
          onPress={navigateToItinerary}
        >
          <Ionicons name="calendar" size={24} color="#777" />
          <Text style={styles.footerText}>Itinerary</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerItem}
          onPress={navigateToRecentTrips}
        >
          <Ionicons name="time" size={24} color="#777" />
          <Text style={styles.footerText}>Recent</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    paddingTop: 50, // Added to prevent content from being hidden under status bar
    backgroundColor: 'white',
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'outfit-bold'
  },
  addButton: {
    backgroundColor: '#3478F6',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
    fontFamily: 'outfit-medium',
  },
  listContainer: {
    padding: 15,
    paddingBottom: 80, // Extra padding for footer
  },
  budgetItem: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tripName: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'outfit-medium',
    color: '#333',
  },
  tripDate: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'outfit',
  },
  budgetDetails: {
    gap: 8,
  },
  budgetDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 15,
    color: '#666',
    fontFamily: 'outfit',
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'outfit-medium',
    color: '#333',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    marginTop: 50,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'outfit-medium',
    marginTop: 20,
  },
  emptyStateSubText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'outfit',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  createBudgetButton: {
    backgroundColor: '#3478F6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  createBudgetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'outfit-medium',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    paddingBottom: 5,
  },
  footerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  footerText: {
    fontFamily: 'outfit',
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
});