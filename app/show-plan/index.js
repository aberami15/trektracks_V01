import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../footer';
import Markdown from 'react-native-markdown-display';
import Config from '../../config';

export default function ShowPlan() {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = params.q;
  const [tripData, setTripData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    
    fetchTripDetail();
  }, []);

  const fetchTripDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${Config.BASE_URL}/trips/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        setError(`Unable to load trip details (${response.status})`);
        return;
      }
      
      const responseData = await response.json();
      console.log("Trip details:", responseData.data);
      
      if (responseData.data) {
        let tripData = { ...responseData.data };
        
        if (typeof tripData.startDate === 'string') {
          tripData.startDate = new Date(tripData.startDate);
        }
        
        if (typeof tripData.endDate === 'string') {
          tripData.endDate = new Date(tripData.endDate);
        }
        
        setTripData(tripData);
      } else {
        setError("No trip data available");
      }
    } catch (error) {
      console.error('Error fetching trip:', error);
      setError("Failed to load trip details");
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Markdown styles for the itinerary display
  const markdownStyles = {
    heading1: {
      fontSize: 24,
      fontFamily: 'outfit-bold',
      color: '#333',
      marginTop: 20,
      marginBottom: 10,
    },
    heading2: {
      fontSize: 22,
      fontFamily: 'outfit-bold',
      color: '#333',
      marginTop: 15,
      marginBottom: 10,
    },
    heading3: {
      fontSize: 20,
      fontFamily: 'outfit-bold',
      color: '#333',
      marginTop: 15,
      marginBottom: 10,
    },
    paragraph: {
      fontSize: 16,
      fontFamily: 'outfit',
      color: '#444',
      lineHeight: 24,
      marginBottom: 10,
    },
    list_item: {
      marginBottom: 8,
    },
    bullet_list: {
      marginBottom: 15,
    },
    strong: {
      fontFamily: 'outfit-bold',
    },
    em: {
      fontStyle: 'italic',
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#3478F6" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trip Itinerary</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3478F6" />
            <Text style={styles.loadingText}>Loading trip details...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={fetchTripDetail}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {tripData.name && (
              <View style={styles.tripHeaderContainer}>
                <Text style={styles.tripName}>{tripData.name}</Text>
                <View style={styles.tripDates}>
                  <Text style={styles.tripDatesText}>
                    {formatDate(tripData.startDate)} - {formatDate(tripData.endDate)}
                  </Text>
                </View>
              </View>
            )}
            
            <View style={styles.itineraryContainer}>
              {tripData.plan ? (
                <Markdown style={markdownStyles}>
                  {tripData.plan}
                </Markdown>
              ) : (
                <Text style={styles.noContentText}>No itinerary details available yet.</Text>
              )}
            </View>
          </>
        )}
        
        <View style={styles.spacer}></View>
      </ScrollView>
      
      {/* Actions Footer */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={20} color="white" />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="cloud-download-outline" size={20} color="white" />
          <Text style={styles.actionButtonText}>Download</Text>
        </TouchableOpacity>
      </View>
      
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#3478F6',
    marginLeft: 5,
    fontSize: 16,
    fontFamily: 'outfit-medium',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
    fontFamily: 'outfit-bold',
    marginRight: 40, // Offset for back button to center the title
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100, // Extra padding for footer
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
    fontFamily: 'outfit',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#fff0f0',
    borderRadius: 12,
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'outfit-medium',
  },
  retryButton: {
    backgroundColor: '#3478F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'outfit-medium',
  },
  tripHeaderContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tripName: {
    fontSize: 22,
    fontFamily: 'outfit-bold',
    color: '#333',
    marginBottom: 8,
  },
  tripDates: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripDatesText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'outfit',
  },
  itineraryContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    minHeight: 200,
  },
  noContentText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'outfit',
    textAlign: 'center',
    marginTop: 60,
  },
  spacer: {
    height: 80, // Space at the bottom for the actions footer
  },
  actionsContainer: {
    position: 'absolute',
    bottom: 70, // Above the footer
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
  },
  actionButton: {
    backgroundColor: '#3478F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    minWidth: 130,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'outfit-medium',
    marginLeft: 8,
  },
});