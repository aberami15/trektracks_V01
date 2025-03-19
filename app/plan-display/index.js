import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import PlanDisplay from '../../components/Plandisplay';

export default function PlanDisplayScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const [plan, setPlan] = useState('');
  
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    
    // Get the plan from localStorage
    const savedPlan = localStorage.getItem('generatedPlan');
    if (savedPlan) {
      setPlan(savedPlan);
    }
  }, []);
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Trip Plan</Text>
      </View>
      
      {/* Plan Display Component */}
      <View style={styles.planContainer}>
        <PlanDisplay plan={plan} />
      </View>
      
      {/* Bottom Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/budget-planner')}
        >
          <Text style={styles.actionButtonText}>Continue to Budget Planner</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 22,
    color: '#333',
  },
  planContainer: {
    flex: 1,
  },
  actionContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
  },
  actionButton: {
    backgroundColor: '#3478F6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontFamily: 'outfit-medium',
    fontSize: 16,
  }
});