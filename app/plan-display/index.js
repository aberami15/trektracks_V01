import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function PlanDisplay() {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    
    // Get plan from params or fetch from API
    if (params.plan) {
      try {
        const decodedPlan = JSON.parse(decodeURIComponent(params.plan));
        setPlan(decodedPlan);
      } catch (error) {
        console.error("Error parsing plan:", error);
      }
    } else if (params.planId) {
      fetchPlanById(params.planId);
    }
    
    setLoading(false);
  }, [params]);

  const fetchPlanById = async (planId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/ai-plan/${planId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch plan');
      
      const data = await response.json();
      setPlan(data.data.generatedPlan.content);
    } catch (error) {
      console.error("Error fetching plan:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3478F6" />
        <Text style={styles.loadingText}>Loading your travel plan...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Travel Plan</Text>
      </View>

      {/* Plan Content */}
      <ScrollView style={styles.content}>
        {plan ? (
          <View style={styles.planContainer}>
            <Text style={styles.planText}>{plan}</Text>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={80} color="#ccc" />
            <Text style={styles.emptyTitle}>No Plan Available</Text>
            <Text style={styles.emptyText}>
              There was an error loading your travel plan. Please try generating a new one.
            </Text>
            <TouchableOpacity 
              style={styles.createButton}
              onPress={() => router.push('/create-trip')}
            >
              <Text style={styles.createButtonText}>Create New Plan</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  planContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  planText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    marginTop: 50,
  },
  emptyTitle: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontFamily: 'outfit',
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  createButton: {
    backgroundColor: '#3478F6',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  createButtonText: {
    fontFamily: 'outfit-medium',
    color: 'white',
    fontSize: 16,
  },
});