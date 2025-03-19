import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

export default function PlanDisplay({ plan }) {
  // If no plan is provided, show a message
  if (!plan) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No plan generated yet. Create a trip to get started!</Text>
      </View>
    );
  }

  // Format the plan text by splitting it into sections
  const formatPlan = (planText) => {
    // Split the plan into sections by day
    const dayRegex = /Day \d+:/g;
    const sections = planText.split(dayRegex);
    
    // If there are no day sections, just return the text as is
    if (sections.length <= 1) {
      return [{ title: 'Your Trip Plan', content: planText }];
    }
    
    // Extract the intro (if any) and format the days
    const intro = sections[0].trim();
    const days = [];
    
    // Get day headings using regex
    const dayHeadings = planText.match(dayRegex) || [];
    
    // Combine the day headings with their content
    for (let i = 1; i < sections.length; i++) {
      const dayNumber = dayHeadings[i-1] || `Day ${i}:`;
      days.push({
        title: dayNumber,
        content: sections[i]
      });
    }
    
    // Return the formatted sections
    return [
      ...(intro ? [{ title: 'Overview', content: intro }] : []),
      ...days
    ];
  };
  
  const formattedSections = formatPlan(plan);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Trip Itinerary</Text>
      
      {formattedSections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.sectionContent}>{section.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 24,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  }
});