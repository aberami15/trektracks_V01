import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';

export default function BudgetPlanner() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.leftHeader}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Budget Planner</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Budget Overview Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Budget Overview</Text>
          <Text style={styles.cardSubtitle}>Stay on Top of Your Budget with Ease</Text>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/budget-summary')}
          >
            <Text style={styles.actionButtonText}>Budget Summary</Text>
          </TouchableOpacity>
        </View>

        {/* Transactions Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Transactions</Text>
          <Text style={styles.cardSubtitle}>Effortlessly Track Every Transaction</Text>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/money-moves')}
          >
            <Text style={styles.actionButtonText}>Money Moves</Text>
          </TouchableOpacity>
        </View>

        {/* You can add more cards here following the same pattern */}
      </ScrollView>

      {/* Footer Navigation - Optional, based on your app's navigation pattern */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerItem} 
          onPress={() => router.push('/home')}
        >
          <Ionicons name="home" size={24} color="#777" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerItem}
          onPress={() => router.push('/trip-itinerary')}
        >
          <Ionicons name="calendar" size={24} color="#777" />
          <Text style={styles.footerText}>Itinerary</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerItem}
          onPress={() => router.push('/recent-trips')}
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
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'outfit-bold'
  },
  content: {
    padding: 20,
    paddingBottom: 80, // Extra space for footer
  },
  card: {
    backgroundColor: '#E0E0E0', // Light gray background for cards
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#3478F6', // Matches your app's primary blue color
    marginBottom: 20,
    textAlign: 'center',
  },
  actionButton: {
    backgroundColor: '#3478F6', // Primary blue from your app
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: 'white',
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