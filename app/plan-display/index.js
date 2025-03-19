import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator,
  SafeAreaView 
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PlanDisplayScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    
    // Get the plan from AsyncStorage
    const fetchPlan = async () => {
      try {
        const savedPlan = await AsyncStorage.getItem('generatedPlan');
        if (savedPlan) {
          setPlan(savedPlan);
        }
      } catch (error) {
        console.error('Error fetching plan:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlan();
  }, []);
  
  // Format plan text by separating into days
  const formatPlan = (planText) => {
    if (!planText) return [];
    
    // Split the plan text into sections based on "Day" headers
    const dayRegex = /Day \d+:/g;
    const dayMatches = [...planText.matchAll(dayRegex)];
    
    let sections = [];
    
    // Check if we have any day sections
    if (dayMatches.length > 0) {
      // Get the intro content before the first day
      const introEnd = dayMatches[0].index;
      const introContent = planText.substring(0, introEnd).trim();
      
      if (introContent) {
        sections.push({
          title: 'Overview',
          content: introContent
        });
      }
      
      // Process each day section
      for (let i = 0; i < dayMatches.length; i++) {
        const start = dayMatches[i].index;
        const dayHeader = dayMatches[i][0];
        const end = (i < dayMatches.length - 1) ? dayMatches[i + 1].index : planText.length;
        
        const content = planText.substring(start, end).trim();
        sections.push({
          title: dayHeader,
          content: content
        });
      }
    } else {
      // If no day sections are found, just use the whole text
      sections.push({
        title: 'Your Trip Plan',
        content: planText
      });
    }
    
    return sections;
  };
  
  const planSections = formatPlan(plan);
  
  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#3478F6" />
        <Text style={styles.loadingText}>Loading your trip plan...</Text>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 22,
    color: '#333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyText: {
    marginTop: 20,
    fontFamily: 'outfit-medium',
    fontSize: 18,
    color: '#666',
  },
  emptySubtext: {
    marginTop: 10,
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
    padding: 15,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: '#3478F6',
    marginBottom: 10,
  },
  sectionContent: {
    fontFamily: 'outfit',
    fontSize: 15,
    lineHeight: 24,
    color: '#444',
  },
  spacer: {
    height: 80,
  },
  actionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
  },
  actionButton: {
    backgroundColor: '#3478F6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontFamily: 'outfit-medium',
    fontSize: 16,
  },
});
        <Text style={styles.headerTitle}>Your Trip Plan</Text>
      </View>
      
      {/* Plan Display */}
      {!plan ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={60} color="#ccc" />
          <Text style={styles.emptyText}>No plan generated yet!</Text>
          <Text style={styles.emptySubtext}>Create a trip to generate an AI travel plan.</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollContainer}>
          {planSections.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionContent}>{section.content}</Text>
            </View>
          ))}
          
          <View style={styles.spacer} />
        </ScrollView>
      )}
      
      {/* Bottom Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/budget-planner')}
        >
          <Text style={styles.actionButtonText}>Continue to Budget Planner</Text>
        </TouchableOpacity>