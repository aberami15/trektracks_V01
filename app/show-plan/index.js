import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../footer';
import Markdown from 'react-native-markdown-display';

export default function ShowPlan() {
  const navigation = useNavigation();
  const router = useRouter();
  
  // Static trip data
  const tripData = {
    tripId: "67dd7db3cc91b27728bb01c0",
    aiGeneratedPlan: "## Sri Lanka Travel Itinerary: Colombo to Sigiriya (March 10th - April 10th, 2025)\n\nThis itinerary focuses on food and prioritizes a relaxed pace, allowing for flexibility.  Note that prices are estimates and can vary depending on season and availability.  Always confirm prices before committing.\n\n**Note:**  Emergency contact details are highly variable and should be obtained locally upon arrival.  The information below provides a general idea of where to find them.\n\n\n### 1. Low Budget Plan (31 Days)\n\n**Transport:** Local buses and occasional three-wheeler taxis.\n\n**Accommodation:** Hostels and guesthouses.\n\n**Food:** Local eateries, street food.\n\n**Daily Budget:**  Approx. $50 per person per day (excluding transport).\n\n\n**(Detailed daily itinerary is omitted due to length.  The focus will be on a sample week and generalized locations.)**\n\n\n**Sample Week (adjust as needed):**\n\n* **Days 1-3: Colombo:** Explore Pettah Market, Galle Face Green, Gangaramaya Temple.  Eat at street food stalls and local restaurants. Stay in a hostel near Colombo Fort.\n* **Days 4-6: Kandy:** Take a bus to Kandy. Visit the Temple of the Tooth Relic, Kandy Lake, and a tea factory.  Enjoy Kottu Roti and other local delicacies. Stay in a budget guesthouse.\n* **Days 7-9: Ella:** Take a bus to Ella. Hike Little Adam's Peak, explore Ella Rock, and visit Nine Arch Bridge. Indulge in local Sri Lankan curries at budget-friendly restaurants. Stay in a budget guesthouse.\n* **Days 10-12:  Yala National Park:** Take a bus to Tissamaharama, near Yala. Consider a shared jeep safari (cheaper option) to spot wildlife. Enjoy simple meals near the park. Stay in a basic guesthouse.\n* **Days 13-14: Travel to Sigiriya:** Take a bus to Sigiriya. \n\n\nThe remaining days can be spent exploring other areas based on your interest, such as Polonnaruwa, Dambulla, or spending more time in a location you particularly enjoyed.\n\n### 2. Normal Budget Plan (31 Days)\n\n**Transport:**  Private van with driver (negotiate prices).\n\n**Accommodation:** 3-star hotels and guesthouses.\n\n**Food:** Mid-range restaurants and occasional fine dining.\n\n**Daily Budget:** Approx. $100-$150 per person per day (excluding transport).\n\n\n**(Detailed daily itinerary is omitted due to length. The focus will be on a sample week and generalized locations.)**\n\n\n**Sample Week (adjust as needed):**\n\n* **Days 1-3: Colombo:** Stay in a 3-star hotel. Explore Colombo's restaurants, visit museums, and enjoy the city life.\n* **Days 4-6: Kandy:** Hire a driver for the journey. Stay in a comfortable 3-star hotel. Explore Kandy's cultural sites and enjoy a cooking class.\n* **Days 7-9: Ella:**  Travel by van to Ella. Stay at a 3-star hotel. Enjoy the views and dine at mid-range restaurants.\n* **Days 10-12: Yala National Park:**  Travel by van to Yala. Stay in a comfortable hotel near the park. Enjoy a private jeep safari.\n* **Days 13-14: Travel to Sigiriya:** Travel by van to Sigiriya.\n\n\nThe remaining days can be tailored to your preferences.\n\n### 3. Expensive Plan (31 Days)\n\n**Transport:** Private luxury van with driver.\n\n**Accommodation:** 5-star luxury hotels and resorts.\n\n**Food:** Fine dining restaurants and private chefs.\n\n**Daily Budget:** Approx. $500-$1000+ per person per day (excluding transport).\n\n\n**(Detailed daily itinerary is omitted due to length.)**  This plan would involve staying in luxury hotels, enjoying private tours, and indulging in top-tier dining experiences across the island.\n\n\n### 4. Shopping Recommendations\n\n* **Pettah Market (Colombo):**  A bustling market with a wide variety of goods, from spices and textiles to clothing and electronics.  Bargaining is expected.\n* **Barefoot Garden Cafe (Colombo):** Upscale shopping with local crafts and design.\n* **Handloom centers in Kandy & Ella:** Find beautiful handcrafted textiles and clothing.\n* **Local markets in smaller towns:** Discover unique souvenirs and local products.\n\n### 5. Emergency Contacts\n\nObtaining reliable, up-to-the-minute emergency contact numbers should be prioritized upon arrival in Sri Lanka.  Look for posted numbers at your hotel or ask your driver/guide.  General numbers may be outdated quickly.\n\n\n### 6. Entry Tickets (Approximate Prices - Confirm before visit)\n\n* **Sigiriya Rock Fortress:**  Approx. $30 USD per person.\n* **Temple of the Tooth Relic (Kandy):**  Approx. $5-10 USD per person.\n* **Yala National Park (Safari):**  Prices vary greatly depending on the type of safari (shared vs. private). Expect to pay from $50-$150+ USD per person.\n* **Other historical sites:**  Prices typically range from $5-20 USD per person.\n\n\nThis itinerary provides a framework. You can customize it to better suit your interests and budget. Remember to book accommodations and transport in advance, especially during peak season. Enjoy your trip!"
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

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
        <View style={styles.itineraryContainer}>
          <Markdown style={markdownStyles}>
            {tripData.aiGeneratedPlan}
          </Markdown>
        </View>
        
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
  itineraryContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
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