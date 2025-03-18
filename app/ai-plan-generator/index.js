import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';

export default function AIPlanGenerator() {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();

  // State variables
  const [loading, setLoading] = useState(true);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });

    // Simulate AI plan generation with a timeout
    const timer = setTimeout(() => {
      generatePlan();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Function to generate a plan based on itinerary parameters
  const generatePlan = () => {
    try {
      // Here you would normally call an AI API to generate a plan
      // For now, we'll create a mock plan
      
      // Mock data for a Nuwara Eliya 2-day trip
      const mockPlan = {
        destination: "Nuwara Eliya",
        days: 2,
        travelerCategory: "Couple",
        tripType: "Adventure",
        vehicle: "Car",
        budget: 20000,
        itinerary: [
          {
            day: 1,
            date: "Day 1",
            activities: [
              {
                time: "08:00 AM",
                activity: "Breakfast at hotel",
                description: "Start your day with a traditional Sri Lankan breakfast at your hotel.",
                cost: 2000
              },
              {
                time: "09:30 AM",
                activity: "Visit Victoria Park",
                description: "Explore the beautiful Victoria Park, known for its colorful flowers and bird watching opportunities.",
                cost: 300
              },
              {
                time: "12:00 PM",
                activity: "Lunch at Grand Indian Restaurant",
                description: "Enjoy authentic Indian cuisine in the heart of Nuwara Eliya.",
                cost: 2500
              },
              {
                time: "02:00 PM",
                activity: "Hakgala Botanical Gardens",
                description: "Visit one of the five botanical gardens in Sri Lanka with a variety of high-altitude plants.",
                cost: 1500
              },
              {
                time: "05:00 PM",
                activity: "Gregory Lake",
                description: "Enjoy boating or just relax by the picturesque Gregory Lake.",
                cost: 2000
              },
              {
                time: "07:30 PM",
                activity: "Dinner at The Pub",
                description: "Experience British colonial ambiance with pub-style dining.",
                cost: 3000
              }
            ]
          },
          {
            day: 2,
            date: "Day 2",
            activities: [
              {
                time: "07:00 AM",
                activity: "Horton Plains National Park",
                description: "Early morning trek to World's End and Baker's Falls in Horton Plains National Park.",
                cost: 4000
              },
              {
                time: "12:30 PM",
                activity: "Picnic lunch at Horton Plains",
                description: "Enjoy a packed lunch amidst stunning scenery.",
                cost: 1500
              },
              {
                time: "03:00 PM",
                activity: "Tea plantation visit",
                description: "Tour a tea factory and plantation to learn about Ceylon tea production.",
                cost: 1000
              },
              {
                time: "05:30 PM",
                activity: "Nuwara Eliya Golf Club",
                description: "Visit one of the oldest golf courses in Asia (established in 1889).",
                cost: 500
              },
              {
                time: "07:00 PM",
                activity: "Farewell dinner at Grand Hotel",
                description: "Experience fine dining at the historic Grand Hotel, a colonial-era building.",
                cost: 4000
              }
            ]
          }
        ]
      };

      setGeneratedPlan(mockPlan);
      setLoading(false);
    } catch (err) {
      console.error("Error generating plan:", err);
      setError("Failed to generate your trip plan. Please try again.");
      setLoading(false);
    }
  };

  const getTotalBudget = () => {
    if (!generatedPlan || !generatedPlan.itinerary) return 0;
    
    let total = 0;
    generatedPlan.itinerary.forEach(day => {
      day.activities.forEach(activity => {
        total += activity.cost || 0;
      });
    });
    
    return total;
  };

  const handleSavePlan = () => {
    // Here you would save the plan to the database
    // For now, just show a success message
    alert("Plan saved successfully!");
    router.push('/trip-itinerary');
  };
  
  const handleEditPlan = () => {
    // Navigate back to create itinerary form
    router.back();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.generatingText}>Generating Your Perfect Itinerary</Text>
        <ActivityIndicator size="large" color="#3478F6" style={styles.spinner} />
        <Text style={styles.loadingText}>
          Our AI is crafting a personalized adventure based on your preferences...
        </Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={60} color="#FF3B30" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.tryAgainButton} onPress={() => {
          setLoading(true);
          setError(null);
          generatePlan();
        }}>
          <Text style={styles.tryAgainText}>Try Again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Generated Plan</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Plan overview */}
      <View style={styles.planOverview}>
        <Text style={styles.destination}>{generatedPlan.destination}</Text>
        <View style={styles.planDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={18} color="#3478F6" />
            <Text style={styles.detailText}>{generatedPlan.days} Days</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="people-outline" size={18} color="#3478F6" />
            <Text style={styles.detailText}>{generatedPlan.travelerCategory}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="cash-outline" size={18} color="#3478F6" />
            <Text style={styles.detailText}>Budget: LKR {generatedPlan.budget}</Text>
          </View>
        </View>
        <View style={styles.budgetIndicator}>
          <View style={styles.budgetBar}>
            <View 
              style={[
                styles.budgetFill, 
                { width: `${Math.min((getTotalBudget() / generatedPlan.budget) * 100, 100)}%`,
                  backgroundColor: getTotalBudget() > generatedPlan.budget ? '#FF3B30' : '#4CD964' 
                }
              ]} 
            />
          </View>
          <Text style={styles.budgetText}>
            Estimated Cost: LKR {getTotalBudget()} {getTotalBudget() > generatedPlan.budget ? '(Over budget)' : ''}
          </Text>
        </View>
      </View>

      {/* Itinerary days */}
      <ScrollView style={styles.itineraryContainer} showsVerticalScrollIndicator={false}>
        {generatedPlan.itinerary.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayTitle}>Day {day.day}</Text>
              <View style={styles.dayLine} />
            </View>
            
            {day.activities.map((activity, actIndex) => (
              <View key={actIndex} style={styles.activityItem}>
                <View style={styles.timeContainer}>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.activity}</Text>
                  <Text style={styles.activityDescription}>{activity.description}</Text>
                  <Text style={styles.activityCost}>LKR {activity.cost}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.editButton} onPress={handleEditPlan}>
            <Text style={styles.editButtonText}>Edit Plan</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.saveButton} onPress={handleSavePlan}>
            <Text style={styles.saveButtonText}>Save Plan</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  generatingText: {
    fontFamily: 'outfit-bold',
    fontSize: 22,
    color: '#3478F6',
    marginBottom: 20,
    textAlign: 'center',
  },
  spinner: {
    marginVertical: 30,
  },
  loadingText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  tryAgainButton: {
    backgroundColor: '#3478F6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  tryAgainText: {
    fontFamily: 'outfit-medium',
    color: '#fff',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: '#333',
  },
  headerRight: {
    width: 40,
  },
  planOverview: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  destination: {
    fontFamily: 'outfit-bold',
    fontSize: 24,
    color: '#333',
    marginBottom: 12,
  },
  planDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 8,
  },
  detailText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  budgetIndicator: {
    marginTop: 5,
  },
  budgetBar: {
    height: 10,
    backgroundColor: '#e8e8e8',
    borderRadius: 5,
    marginBottom: 5,
  },
  budgetFill: {
    height: '100%',
    borderRadius: 5,
  },
  budgetText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#666',
  },
  itineraryContainer: {
    flex: 1,
  },
  dayContainer: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  dayTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: '#333',
    marginRight: 10,
  },
  dayLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timeContainer: {
    width: 80,
    paddingRight: 10,
  },
  activityTime: {
    fontFamily: 'outfit-medium',
    fontSize: 14,
    color: '#3478F6',
  },
  activityContent: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#3478F6',
  },
  activityTitle: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  activityDescription: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  activityCost: {
    fontFamily: 'outfit-medium',
    fontSize: 14,
    color: '#4CD964',
    alignSelf: 'flex-end',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  editButtonText: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#3478F6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  saveButtonText: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: '#fff',
  },
  footer: {
    height: 50,
  },
});