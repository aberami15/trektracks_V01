import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const AIPlanDisplay = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [aiPlan, setAIPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the AI plan from the route params
    if (params.aiPlan) {
      try {
        const decodedPlan = JSON.parse(decodeURIComponent(params.aiPlan));
        setAIPlan(decodedPlan);
      } catch (error) {
        console.error("Error parsing AI plan:", error);
      }
    }
    setLoading(false);
  }, [params]);

  const handleSaveTrip = () => {
    // Navigate to create trip form with some pre-filled values
    router.push('/create-trip');
  };

  const handleBack = () => {
    router.back();
  };

  // Function to render sections of the AI-generated plan
  const renderPlanSection = (content) => {
    // Split the content by line breaks to handle various formatting
    const lines = content.split('\n');
    
    return lines.map((line, index) => {
      if (line.trim() === '') return null;
      
      // Check if this is a heading (starts with # or has all caps or ends with :)
      if (line.startsWith('#') || line.toUpperCase() === line || line.trim().endsWith(':')) {
        return (
          <Text key={index} style={styles.sectionHeading}>
            {line.replace(/^#+\s*/, '')} {/* Remove leading # characters if present */}
          </Text>
        );
      }
      
      // Check if this is a subheading (starts with ## or has strong formatting)
      if (line.startsWith('##') || line.includes('**')) {
        return (
          <Text key={index} style={styles.subHeading}>
            {line.replace(/^##+\s*/, '').replace(/\*\*/g, '')}
          </Text>
        );
      }
      
      // Check if this is a bullet point
      if (line.trim().startsWith('-') || line.trim().startsWith('•') || line.trim().startsWith('*')) {
        return (
          <View key={index} style={styles.bulletItem}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>
              {line.trim().replace(/^[-•*]\s*/, '')}
            </Text>
          </View>
        );
      }
      
      // Regular paragraph text
      return (
        <Text key={index} style={styles.paragraphText}>
          {line}
        </Text>
      );
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3478F6" />
        <Text style={styles.loadingText}>Loading your AI-generated trip plan...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Trip Plan</Text>
        <TouchableOpacity onPress={handleSaveTrip}>
          <MaterialIcons name="save" size={24} color="#3478F6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {aiPlan ? (
          <View style={styles.planContainer}>
            {renderPlanSection(aiPlan)}
          </View>
        ) : (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={60} color="#FF3B30" />
            <Text style={styles.errorText}>
              No AI plan found. Please go back and generate a new plan.
            </Text>
            <TouchableOpacity 
              style={styles.createButton}
              onPress={() => router.push('/create-itinerary')}
            >
              <Text style={styles.createButtonText}>Create New Plan</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Action buttons at the bottom */}
      {aiPlan && (
        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleSaveTrip}
          >
            <Text style={styles.actionButtonText}>Save as Trip</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() => router.push('/budget-planner')}
          >
            <Text style={styles.secondaryButtonText}>Go to Budget Planner</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingBottom: 80, // Extra padding for action buttons
  },
  planContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeading: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  subHeading: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: '#444',
    marginTop: 15,
    marginBottom: 5,
  },
  paragraphText: {
    fontFamily: 'outfit',
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 10,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 5,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3478F6',
    marginTop: 7,
    marginRight: 10,
  },
  bulletText: {
    flex: 1,
    fontFamily: 'outfit',
    fontSize: 15,
    color: '#555',
    lineHeight: 20,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    marginTop: 50,
  },
  errorText: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  createButton: {
    backgroundColor: '#3478F6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'outfit-medium',
  },
  actionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#3478F6',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  actionButtonText: {
    color: 'white',
    fontFamily: 'outfit-medium',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#3478F6',
    marginRight: 0,
  },
  secondaryButtonText: {
    color: '#3478F6',
    fontFamily: 'outfit-medium',
    fontSize: 16,
  }})