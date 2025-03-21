import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';

// Sample travel history data
const travelHistoryData = [
  {
    id: '1',
    destination: 'Sigiriya Rock Fortress',
    location: 'Matale District, Central Province',
    image: require('../../assets/images/sigiriya.jpg'),
    date: 'Jan 10 - Jan 12, 2024',
    days: 3,
    travelerCategory: 'Family',
    tripType: 'Cultural',
    vehicleType: 'Private Car',
    rating: 4.8,
  },
  {
    id: '2',
    destination: 'Mirissa Beach',
    location: 'Southern Province',
    image: require('../../assets/images/mirissa.jpg'),
    date: 'Feb 15 - Feb 19, 2024',
    days: 5,
    travelerCategory: 'Couple',
    tripType: 'Relaxation',
    vehicleType: 'Rental Scooter',
    rating: 4.9,
  },
  {
    id: '3',
    destination: 'Temple of the Sacred Tooth Relic',
    location: 'Kandy, Central Province',
    image: require('../../assets/images/dalada.jpg'),
    date: 'Mar 5 - Mar 6, 2024',
    days: 2,
    travelerCategory: 'Solo',
    tripType: 'Devotional',
    vehicleType: 'Public Bus',
    rating: 4.7,
  },
  {
    id: '4',
    destination: 'Galle Fort',
    location: 'Galle, Southern Province',
    image: require('../../assets/images/gallefort.jpg'),
    date: 'Apr 20 - Apr 22, 2024',
    days: 3,
    travelerCategory: 'Friends',
    tripType: 'Historical',
    vehicleType: 'Train',
    rating: 4.6,
  },
];

// Icons for different categories
const getCategoryIcon = (category) => {
  switch (category.toLowerCase()) {
    case 'solo':
      return <Ionicons name="person" size={14} color="#FFF" />;
    case 'couple':
      return <Ionicons name="people" size={14} color="#FFF" />;
    case 'family':
      return <Ionicons name="people" size={14} color="#FFF" />;
    case 'friends':
      return <Ionicons name="people-outline" size={14} color="#FFF" />;
    default:
      return <Ionicons name="person" size={14} color="#FFF" />;
  }
};

const getTripTypeIcon = (type) => {
  switch (type.toLowerCase()) {
    case 'cultural':
      return <Ionicons name="theater-outline" size={14} color="#3478F6" />;
    case 'devotional':
      return <FontAwesome5 name="pray" size={12} color="#3478F6" />;
    case 'relaxation':
      return <Ionicons name="sunny-outline" size={14} color="#3478F6" />;
    case 'historical':
      return <FontAwesome5 name="landmark" size={12} color="#3478F6" />;
    default:
      return <Ionicons name="map-outline" size={14} color="#3478F6" />;
  }
};

const getVehicleIcon = (vehicle) => {
  if (vehicle.toLowerCase().includes('car')) {
    return <Ionicons name="car-outline" size={14} color="#3478F6" />;
  } else if (vehicle.toLowerCase().includes('bus')) {
    return <Ionicons name="bus-outline" size={14} color="#3478F6" />;
  } else if (vehicle.toLowerCase().includes('train')) {
    return <Ionicons name="train-outline" size={14} color="#3478F6" />;
  } else if (vehicle.toLowerCase().includes('scooter')) {
    return <FontAwesome5 name="motorcycle" size={12} color="#3478F6" />;
  } else {
    return <MaterialCommunityIcons name="car-multiple" size={14} color="#3478F6" />;
  }
};

const TripCard = ({ item }) => (
  <TouchableOpacity style={styles.tripCard}>
    <Image 
      source={item.image} 
      style={styles.tripImage} 
      resizeMode="cover"
    />
    
    {/* Trip Category Badge */}
    <View style={styles.categoryBadge}>
      {getCategoryIcon(item.travelerCategory)}
      <Text style={styles.categoryText}>{item.travelerCategory}</Text>
    </View>
    
    {/* Trip details */}
    <View style={styles.tripDetails}>
      <Text style={styles.destinationName}>{item.destination}</Text>
      <Text style={styles.locationText}>{item.location}</Text>
      
      <View style={styles.dateContainer}>
        <Ionicons name="calendar-outline" size={14} color="#666" />
        <Text style={styles.dateText}>{item.date}</Text>
        <View style={styles.daysContainer}>
          <Text style={styles.daysText}>{item.days} days</Text>
        </View>
      </View>
      
      <View style={styles.metaDataContainer}>
        <View style={styles.metaItem}>
          {getTripTypeIcon(item.tripType)}
          <Text style={styles.metaText}>{item.tripType}</Text>
        </View>
        
        <View style={styles.metaItem}>
          {getVehicleIcon(item.vehicleType)}
          <Text style={styles.metaText}>{item.vehicleType}</Text>
        </View>
        
        <View style={styles.ratingContainer}>
          <AntDesign name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default function TravelHistory() {
  const navigation = useNavigation();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    
    // Simulate data loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#3478F6" />
        <Text style={styles.loadingText}>Loading your travel memories...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.leftHeader}>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Travel History</Text>
        </View>
        
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#3478F6" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{travelHistoryData.length}</Text>
          <Text style={styles.statLabel}>Trips</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {travelHistoryData.reduce((sum, trip) => sum + trip.days, 0)}
          </Text>
          <Text style={styles.statLabel}>Days</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {(travelHistoryData.reduce((sum, trip) => sum + trip.rating, 0) / travelHistoryData.length).toFixed(1)}
          </Text>
          <Text style={styles.statLabel}>Avg. Rating</Text>
        </View>
      </View>

      {/* Travel History List */}
      <FlatList
        data={travelHistoryData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TripCard item={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="map-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No travel history found</Text>
            <Text style={styles.emptySubtext}>Your future adventures will appear here</Text>
          </View>
        }
      />
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
    marginTop: 10,
    fontSize: 16,
    color: '#333',
    fontFamily: 'outfit-medium',
  },
  headerContainer: {
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
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'outfit-bold',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 5,
  },
  filterText: {
    fontSize: 14,
    color: '#3478F6',
    fontFamily: 'outfit-medium',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    fontFamily: 'outfit-bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'outfit',
    marginTop: 4,
  },
  statDivider: {
    height: 30,
    width: 1,
    backgroundColor: '#e8e8e8',
  },
  listContainer: {
    padding: 20,
    paddingTop: 15,
  },
  tripCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  tripImage: {
    width: '100%',
    height: 180,
  },
  categoryBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(52, 120, 246, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'outfit-medium',
  },
  tripDetails: {
    padding: 15,
  },
  destinationName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    fontFamily: 'outfit-bold',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'outfit',
    marginBottom: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 6,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'outfit',
  },
  daysContainer: {
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginLeft: 8,
  },
  daysText: {
    fontSize: 12,
    color: '#3478F6',
    fontFamily: 'outfit-medium',
  },
  metaDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    fontSize: 13,
    color: '#666',
    fontFamily: 'outfit',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'outfit-medium',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'outfit-medium',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'outfit',
    marginTop: 5,
  },
});