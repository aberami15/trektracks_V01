import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';

export default function GeneratedPlan() {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const planId = params.planId;
  
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    
    fetchPlan();
  }, [planId]);
  
  const fetchPlan = async () => {
    try {
      if (!planId) {
        setError('Plan ID is missing');
        setLoading(false);
        return;
      }
      
      const response = await fetch(`http://localhost:5000/api/ai-plan/${planId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch plan');
      }
      
      const data = await response.json();
      setPlan(data.data);
    } catch (error) {
      console.error('Error fetching plan:', error);
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  
  const renderDayPlan = (day, index) => {
    // This assumes a specific structure from the AI response
    // You may need to adjust based on actual response format
    return (
      <View key={index} style={styles.dayCard}>
        <Text style={styles.dayTitle}>Day {index + 1}</Text>
        
        {day.morning && (
          <View style={styles.activitySection}>
            <Text style={styles.activityTime}>Morning</Text>
            <Text style={styles.activityTitle}>{day.morning.activity}</Text>
            <Text style={styles.activityDescription}>{day.morning.description}</Text>
            {day.morning.cost && (
              <Text style={styles.activityCost}>Est. Cost: {day.morning.cost}</Text>
            )}
          </View>
        )}
        
        {day.lunch && (
          <View style={styles.mealSection}>
            <Text style={styles.mealTitle}>Lunch</Text>
            <Text style={styles.mealName}>{day.lunch.place}</Text>
            <Text style={styles.mealDescription}>{day.lunch.description}</Text>
            {day.lunch.cost && (
              <Text style={styles.mealCost}>Est. Cost: {day.lunch.cost}</Text>
            )}
          </View>
        )}
        
        {day.afternoon && (
          <View style={styles.activitySection}>
            <Text style={styles.activityTime}>Afternoon</Text>
            <Text style={styles.activityTitle}>{day.afternoon.activity}</Text>
            <Text style={styles.activityDescription}>{day.afternoon.description}</Text>
            {day.afternoon.cost && (
              <Text style={styles.activityCost}>Est. Cost: {day.afternoon.cost}</Text>
            )}
          </View>
        )}
        
        {day.dinner && (
          <View style={styles.mealSection}>
            <Text style={styles.mealTitle}>Dinner</Text>
            <Text style={styles.mealName}>{day.dinner.place}</Text>
            <Text style={styles.mealDescription}>{day.dinner.description}</Text>
            {day.dinner.cost && (
              <Text style={styles.mealCost}>Est. Cost: {day.dinner.cost}</Text>
            )}
          </View>
        )}
        
        {day.accommodation && (
          <View style={styles.accommodationSection}>
            <Text style={styles.accTitle}>Accommodation</Text>
            <Text style={styles.accName}>{day.accommodation.name}</Text>
            <Text style={styles.accDescription}>{day.accommodation.description}</Text>
            {day.accommodation.cost && (
              <Text style={styles.accCost}>Est. Cost: {day.accommodation.cost}</Text>
            )}
          </View>
        )}
        
        {day.tips && (
          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>Tips</Text>
            <Text style={styles.tipsText}>{day.tips}</Text>
          </View>
        )}
      </View>
    );
  };
  
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3478F6" />
        <Text style={styles.loadingText}>Loading your personalized itinerary...</Text>
      </SafeAreaView>
    );
  }
  
  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={60} color="#FF3B30" />
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/create-itinerary')}
        >
          <Text style={styles.backButtonText}>Try Again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  
  if (!plan || !plan.generatedPlan) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Ionicons name="document-outline" size={60} color="#FF9500" />
        <Text style={styles.errorTitle}>Plan Not Found</Text>
        <Text style={styles.errorText}>We couldn't find the requested itinerary.</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/create-itinerary')}
        >
          <Text style={styles.backButtonText}>Create New Plan</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBackButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Travel Plan</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="share-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Plan Summary */}
      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.destinationText}>{plan.userInput.destination}</Text>
          <Text style={styles.durationText}>{plan.userInput.days} days</Text>
          {plan.userInput.budget && (
            <Text style={styles.budgetText}>Budget: {plan.userInput.budget} LKR</Text>
          )}
        </View>
        
        {/* Render each day of the plan */}
        {plan.generatedPlan.parsingError ? (
          <View style={styles.rawPlanContainer}>
            <Text style={styles.rawPlanTitle}>Your Travel Plan</Text>
            <Text style={styles.rawPlanText}>{plan.rawResponse}</Text>
          </View>
        ) : (
          plan.generatedPlan.itinerary && 
          plan.generatedPlan.itinerary.map((day, index) => renderDayPlan(day, index))
        )}
        
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={() => {
              ToastAndroid.show('Plan saved to your trips!', ToastAndroid.SHORT);
              router.push('/trip-itinerary');
            }}
          >
            <Text style={styles.saveButtonText}>Save Itinerary</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.modifyButton}
            onPress={() => router.push('/create-itinerary')}
          >
            <Text style={styles.modifyButtonText}>Create New Plan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingTop: 50,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
    fontFamily: 'outfit',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingTop: 50,
    padding: 20,
  },
  errorTitle: {
    fontSize: 22,
    color: '#333',
    fontFamily: 'outfit-bold',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'outfit',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: '#3478F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'outfit-medium',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  headerBackButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'outfit-bold',
    color: '#333',
  },
  headerRight: {
    width: 30,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  destinationText: {
    fontSize: 24,
    fontFamily: 'outfit-bold',
    color: '#333',
    marginBottom: 5,
  },
  durationText: {
    fontSize: 16,
    fontFamily: 'outfit-medium',
    color: '#666',
    marginBottom: 8,
  },
  budgetText: {
    fontSize: 16,
    fontFamily: 'outfit',
    color: '#666',
  },
  dayCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dayTitle: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
    color: '#333',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
  },
  activitySection: {
    marginBottom: 15,
  },
  activityTime: {
    fontSize: 16,
    fontFamily: 'outfit-medium',
    color: '#3478F6',
    marginBottom: 5,
  },
  activityTitle: {
    fontSize: 16,
    fontFamily: 'outfit-medium',
    color: '#333',
    marginBottom: 5,
  },
  activityDescription: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: '#666',
    marginBottom: 5,
  },
  activityCost: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: '#4CAF50',
  },
  mealSection: {
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
  },
  mealTitle: {
    fontSize: 16,
    fontFamily: 'outfit-medium',
    color: '#FF9500',
    marginBottom: 5,
  },
  mealName: {
    fontSize: 16,
    fontFamily: 'outfit-medium',
    color: '#333',
    marginBottom: 5,
  },
  mealDescription: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: '#666',
    marginBottom: 5,
  },
  mealCost: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: '#4CAF50',
  },
  accommodationSection: {
    marginTop: 5,
    marginBottom: 15,
    backgroundColor: '#f0f7ff',
    padding: 12,
    borderRadius: 8,
  },
  accTitle: {
    fontSize: 16,
    fontFamily: 'outfit-medium',
    color: '#5856D6',
    marginBottom: 5,
  },
  accName: {
    fontSize: 16,
    fontFamily: 'outfit-medium',
    color: '#333',
    marginBottom: 5,
  },
  accDescription: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: '#666',
    marginBottom: 5,
  },
  accCost: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: '#4CAF50',
  },
  tipsSection: {
    marginTop: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#FF9500',
    paddingLeft: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontFamily: 'outfit-medium',
    color: '#FF9500',
    marginBottom: 5,
  },
  tipsText: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: '#666',
  },
  rawPlanContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
  },
  rawPlanTitle: {
    fontSize: 18,
    fontFamily: 'outfit-bold',
    color: '#333',
    marginBottom: 15,
  },
  rawPlanText: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: '#333',
    lineHeight: 20,
  },
  footer: {
    marginTop: 10,
    marginBottom: 40,
  },
  saveButton: {
    backgroundColor: '#3478F6',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'outfit-medium',
  },
  modifyButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#3478F6',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  modifyButtonText: {
    color: '#3478F6',
    fontSize: 16,
    fontFamily: 'outfit-medium',
  },
});